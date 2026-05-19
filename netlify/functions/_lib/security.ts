const ALLOWED_ORIGIN_SUFFIXES = [
  ".netlify.app",
  ".netlify.live",
  "iitm-code-ai.netlify.app",
];

const ALLOWED_DEV_HOSTS = ["localhost", "127.0.0.1"];

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const explicit = process.env.ALLOWED_ORIGIN;

  if (explicit) {
    if (origin === explicit) return true;
  }

  const source = origin ?? referer;
  if (!source) {
    return false;
  }

  try {
    const url = new URL(source);
    if (ALLOWED_DEV_HOSTS.includes(url.hostname)) return true;
    if (ALLOWED_ORIGIN_SUFFIXES.some((s) => url.hostname.endsWith(s))) return true;
    return false;
  } catch {
    return false;
  }
}

export function corsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function forbidden(req: Request): Response {
  return new Response("Forbidden", {
    status: 403,
    headers: corsHeaders(req),
  });
}

export function tooLarge(req: Request): Response {
  return new Response("Payload too large", {
    status: 413,
    headers: corsHeaders(req),
  });
}

export function preflight(req: Request): Response | null {
  if (req.method !== "OPTIONS") return null;
  if (!isAllowedOrigin(req)) return forbidden(req);
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}

export const MAX_SYNC_PAYLOAD_BYTES = 200 * 1024;
export const MAX_SUBSCRIBE_PAYLOAD_BYTES = 8 * 1024;
