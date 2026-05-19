import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import {
  isAllowedOrigin,
  corsHeaders,
  forbidden,
  tooLarge,
  preflight,
  MAX_SYNC_PAYLOAD_BYTES,
} from "./_lib/security.js";

const STORE_NAME = "iitm-progress";

function emailKey(emailRaw: string): string | null {
  const email = emailRaw.toLowerCase().trim();
  if (!email.includes("@") || email.length > 254 || email.length < 5) return null;
  return Buffer.from(email).toString("base64url");
}

interface ProgressPayload {
  completedDays: number[];
  quizScores: Record<number, number>;
  studyLog: Record<string, boolean>;
  streak: number;
  lastStudiedDate: string | null;
  mockScores: Array<{ date: string; score: number; total: number; variant: string }>;
}

interface StoredProgress {
  data: ProgressPayload;
  updatedAt: string;
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

  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  if (req.method === "GET") {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) return text(req, "Missing email", 400);
    const key = emailKey(email);
    if (!key) return text(req, "Invalid email", 400);
    const stored = (await store.get(key, { type: "json" })) as StoredProgress | null;
    if (!stored) return text(req, "Not found", 404);
    return json(req, stored);
  }

  if (req.method === "POST") {
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > MAX_SYNC_PAYLOAD_BYTES) return tooLarge(req);

    const raw = await req.text();
    if (raw.length > MAX_SYNC_PAYLOAD_BYTES) return tooLarge(req);

    let body: { email?: string; data?: ProgressPayload };
    try {
      body = JSON.parse(raw);
    } catch {
      return text(req, "Invalid JSON", 400);
    }
    if (!body.email || !body.data) return text(req, "Missing fields", 400);
    const key = emailKey(body.email);
    if (!key) return text(req, "Invalid email", 400);

    const stored: StoredProgress = {
      data: body.data,
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(key, stored);
    return json(req, { ok: true, updatedAt: stored.updatedAt });
  }

  if (req.method === "DELETE") {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) return text(req, "Missing email", 400);
    const key = emailKey(email);
    if (!key) return text(req, "Invalid email", 400);
    await store.delete(key);
    return json(req, { ok: true });
  }

  return text(req, "Method not allowed", 405);
};

export const config: Config = {
  path: "/api/sync",
};
