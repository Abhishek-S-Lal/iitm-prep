import type { Config } from "@netlify/functions";
import { deleteSubscriptionByEndpoint } from "./_lib/store.js";
import {
  isAllowedOrigin,
  corsHeaders,
  forbidden,
  tooLarge,
  preflight,
  MAX_SUBSCRIBE_PAYLOAD_BYTES,
} from "./_lib/security.js";

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

  if (req.method !== "POST" && req.method !== "DELETE") {
    return text(req, "Method not allowed", 405);
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_SUBSCRIBE_PAYLOAD_BYTES) return tooLarge(req);

  const raw = await req.text();
  if (raw.length > MAX_SUBSCRIBE_PAYLOAD_BYTES) return tooLarge(req);

  let endpoint: string | undefined;
  try {
    const body = JSON.parse(raw) as { endpoint?: string };
    endpoint = body.endpoint;
  } catch {
    return text(req, "Invalid JSON", 400);
  }

  if (!endpoint || endpoint.length > 1024) {
    return text(req, "Missing or invalid endpoint", 400);
  }

  await deleteSubscriptionByEndpoint(endpoint);
  return json(req, { ok: true });
};

export const config: Config = {
  path: "/api/unsubscribe",
};
