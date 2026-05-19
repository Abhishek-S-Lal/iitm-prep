import type { Config } from "@netlify/functions";
import webpush from "web-push";
import {
  listSubscriptions,
  deleteSubscriptionByEndpoint,
  updateSubscription,
  type StoredSubscription,
} from "./_lib/store.js";
import { morningPayload, eveningPayload } from "./_lib/messages.js";

function configureWebPush() {
  const subject = process.env.VAPID_SUBJECT ?? "mailto:abhishek@usebruno.com";
  const pub = process.env.VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) throw new Error("VAPID keys are not configured");
  webpush.setVapidDetails(subject, pub, priv);
}

function localDate(timezone: string, now: Date): { hour: number; ymd: string } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const hour = Number(map.hour);
  const ymd = `${map.year}-${map.month}-${map.day}`;
  return { hour, ymd };
}

async function send(sub: StoredSubscription, payload: object): Promise<"ok" | "gone" | "error"> {
  try {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: sub.keys,
      },
      JSON.stringify(payload),
      { TTL: 24 * 60 * 60 },
    );
    return "ok";
  } catch (err: unknown) {
    const status = (err as { statusCode?: number })?.statusCode;
    if (status === 404 || status === 410) return "gone";
    return "error";
  }
}

export default async () => {
  configureWebPush();
  const now = new Date();
  const subs = await listSubscriptions();
  const summary = { total: subs.length, morning: 0, evening: 0, removed: 0, errors: 0 };

  for (const sub of subs) {
    let local;
    try {
      local = localDate(sub.timezone, now);
    } catch {
      continue;
    }

    if (local.hour === sub.morningHour && sub.lastMorningSent !== local.ymd) {
      const result = await send(sub, morningPayload(now));
      if (result === "ok") {
        await updateSubscription(sub.endpoint, { lastMorningSent: local.ymd });
        summary.morning++;
      } else if (result === "gone") {
        await deleteSubscriptionByEndpoint(sub.endpoint);
        summary.removed++;
      } else {
        summary.errors++;
      }
      continue;
    }

    if (local.hour === sub.eveningHour && sub.lastEveningSent !== local.ymd) {
      const result = await send(sub, eveningPayload(now));
      if (result === "ok") {
        await updateSubscription(sub.endpoint, { lastEveningSent: local.ymd });
        summary.evening++;
      } else if (result === "gone") {
        await deleteSubscriptionByEndpoint(sub.endpoint);
        summary.removed++;
      } else {
        summary.errors++;
      }
    }
  }

  return Response.json({ at: now.toISOString(), ...summary });
};

export const config: Config = {
  schedule: "@hourly",
};
