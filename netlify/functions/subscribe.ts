import type { Config } from "@netlify/functions";
import { saveSubscription } from "./_lib/store.js";
import {
  isAllowedOrigin,
  corsHeaders,
  forbidden,
  tooLarge,
  preflight,
  MAX_SUBSCRIBE_PAYLOAD_BYTES,
} from "./_lib/security.js";

interface SubscribeBody {
  subscription: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };
  morningHour: number;
  eveningHour: number;
  timezone: string;
}

function json(req: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json" },
  });
}

function text(req: Request, body: string, status: number): Response {
  return new Response(body, { status, headers: corsHeaders(req) });
}

export default async (req: Request) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (!isAllowedOrigin(req)) return forbidden(req);

  if (req.method !== "POST") return text(req, "Method not allowed", 405);

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_SUBSCRIBE_PAYLOAD_BYTES) return tooLarge(req);

  const raw = await req.text();
  if (raw.length > MAX_SUBSCRIBE_PAYLOAD_BYTES) return tooLarge(req);

  let body: SubscribeBody;
  try {
    body = JSON.parse(raw) as SubscribeBody;
  } catch {
    return text(req, "Invalid JSON", 400);
  }

  const { subscription, morningHour, eveningHour, timezone } = body;
  if (
    !subscription?.endpoint ||
    !subscription?.keys?.p256dh ||
    !subscription?.keys?.auth ||
    typeof morningHour !== "number" ||
    typeof eveningHour !== "number" ||
    !timezone ||
    timezone.length > 64 ||
    subscription.endpoint.length > 1024
  ) {
    return text(req, "Missing or invalid fields", 400);
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

  return json(req, { ok: true });
};

export const config: Config = {
  path: "/api/subscribe",
};
