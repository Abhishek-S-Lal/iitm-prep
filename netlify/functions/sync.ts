import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "iitm-progress";

function emailKey(emailRaw: string): string | null {
  const email = emailRaw.toLowerCase().trim();
  if (!email.includes("@") || email.length > 254) return null;
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

export default async (req: Request) => {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  if (req.method === "GET") {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) return new Response("Missing email", { status: 400 });
    const key = emailKey(email);
    if (!key) return new Response("Invalid email", { status: 400 });

    const stored = (await store.get(key, { type: "json" })) as StoredProgress | null;
    if (!stored) return new Response("Not found", { status: 404 });
    return Response.json(stored);
  }

  if (req.method === "POST") {
    let body: { email?: string; data?: ProgressPayload };
    try {
      body = await req.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }
    if (!body.email || !body.data) return new Response("Missing fields", { status: 400 });
    const key = emailKey(body.email);
    if (!key) return new Response("Invalid email", { status: 400 });

    const stored: StoredProgress = {
      data: body.data,
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(key, stored);
    return Response.json({ ok: true, updatedAt: stored.updatedAt });
  }

  if (req.method === "DELETE") {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) return new Response("Missing email", { status: 400 });
    const key = emailKey(email);
    if (!key) return new Response("Invalid email", { status: 400 });
    await store.delete(key);
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/sync",
};
