import type { Config } from "@netlify/functions";
import { saveSubscription } from "./_lib/store.js";

interface SubscribeBody {
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };
  morningHour: number;
  eveningHour: number;
  timezone: string;
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: SubscribeBody;
  try {
    body = (await req.json()) as SubscribeBody;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { subscription, morningHour, eveningHour, timezone } = body;
  if (
    !subscription?.endpoint ||
    !subscription?.keys?.p256dh ||
    !subscription?.keys?.auth ||
    typeof morningHour !== "number" ||
    typeof eveningHour !== "number" ||
    !timezone
  ) {
    return new Response("Missing fields", { status: 400 });
  }

  await saveSubscription({
    endpoint: subscription.endpoint,
    keys: subscription.keys,
    morningHour: Math.max(0, Math.min(23, Math.floor(morningHour))),
    eveningHour: Math.max(0, Math.min(23, Math.floor(eveningHour))),
    timezone,
    createdAt: new Date().toISOString(),
    lastMorningSent: null,
    lastEveningSent: null,
  });

  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/subscribe",
};
