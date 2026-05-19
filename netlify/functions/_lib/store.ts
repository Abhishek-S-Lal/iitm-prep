import { getStore } from "@netlify/blobs";

export interface StoredSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  morningHour: number;
  eveningHour: number;
  timezone: string;
  createdAt: string;
  lastMorningSent: string | null;
  lastEveningSent: string | null;
}

const STORE_NAME = "iitm-push-subscriptions";

function subscriptionKey(endpoint: string): string {
  let h = 0;
  for (let i = 0; i < endpoint.length; i++) {
    h = (h * 31 + endpoint.charCodeAt(i)) | 0;
  }
  return `sub_${Math.abs(h).toString(36)}_${endpoint.length}`;
}

export function getSubscriptionStore() {
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

export async function saveSubscription(sub: StoredSubscription): Promise<string> {
  const store = getSubscriptionStore();
  const key = subscriptionKey(sub.endpoint);
  await store.setJSON(key, sub);
  return key;
}

export async function deleteSubscriptionByEndpoint(endpoint: string): Promise<void> {
  const store = getSubscriptionStore();
  await store.delete(subscriptionKey(endpoint));
}

export async function listSubscriptions(): Promise<StoredSubscription[]> {
  const store = getSubscriptionStore();
  const { blobs } = await store.list();
  const subs = await Promise.all(
    blobs.map((b) => store.get(b.key, { type: "json" }) as Promise<StoredSubscription | null>),
  );
  return subs.filter((s): s is StoredSubscription => !!s);
}

export async function updateSubscription(
  endpoint: string,
  patch: Partial<StoredSubscription>,
): Promise<void> {
  const store = getSubscriptionStore();
  const key = subscriptionKey(endpoint);
  const existing = (await store.get(key, { type: "json" })) as StoredSubscription | null;
  if (!existing) return;
  await store.setJSON(key, { ...existing, ...patch });
}
