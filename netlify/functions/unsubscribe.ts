import type { Config } from "@netlify/functions";
import { deleteSubscriptionByEndpoint } from "./_lib/store.js";

export default async (req: Request) => {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 });
  }

  let endpoint: string | undefined;
  try {
    const body = (await req.json()) as { endpoint?: string };
    endpoint = body.endpoint;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!endpoint) return new Response("Missing endpoint", { status: 400 });

  await deleteSubscriptionByEndpoint(endpoint);
  return Response.json({ ok: true });
};

export const config: Config = {
  path: "/api/unsubscribe",
};
