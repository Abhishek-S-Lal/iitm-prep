import { useEffect, useState, useCallback } from "react";
import { useNotificationSettings } from "../store/notificationStore";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const normalized = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(normalized);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function parseHour(time: string): number {
  const [h] = time.split(":");
  return Math.max(0, Math.min(23, Number(h) || 0));
}

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
  } catch {
    return "Asia/Kolkata";
  }
}

export type PushState =
  | { status: "unsupported"; reason: string }
  | { status: "not-configured"; reason: string }
  | { status: "no-permission" }
  | { status: "subscribed"; endpoint: string }
  | { status: "unsubscribed" };

export function useWebPush() {
  const [state, setState] = useState<PushState>({ status: "unsubscribed" });
  const [busy, setBusy] = useState(false);
  const settings = useNotificationSettings();

  const refresh = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState({ status: "unsupported", reason: "This browser doesn't support web push." });
      return;
    }
    if (!VAPID_PUBLIC_KEY) {
      setState({
        status: "not-configured",
        reason: "Server push isn't configured for this deployment.",
      });
      return;
    }
    if (typeof Notification !== "undefined" && Notification.permission === "denied") {
      setState({ status: "no-permission" });
      return;
    }
    try {
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      if (existing) {
        setState({ status: "subscribed", endpoint: existing.endpoint });
      } else {
        setState({ status: "unsubscribed" });
      }
    } catch {
      setState({ status: "unsubscribed" });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const subscribe = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    if (!VAPID_PUBLIC_KEY) return { ok: false, error: "Server push isn't configured." };
    if (typeof Notification === "undefined")
      return { ok: false, error: "Notifications not supported." };

    setBusy(true);
    try {
      if (Notification.permission !== "granted") {
        const perm = await Notification.requestPermission();
        if (perm !== "granted") return { ok: false, error: "Permission denied." };
      }

      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      const subscription = sub.toJSON();
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: {
            endpoint: subscription.endpoint,
            keys: subscription.keys,
          },
          morningHour: parseHour(settings.morningTime),
          eveningHour: parseHour(settings.eveningTime),
          timezone: detectTimezone(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { ok: false, error: `Server returned ${res.status}: ${text}` };
      }
      await refresh();
      settings.setEnabled(true);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    } finally {
      setBusy(false);
    }
  }, [refresh, settings]);

  const unsubscribe = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (!sub) {
        await refresh();
        return { ok: true };
      }
      const endpoint = sub.endpoint;
      await sub.unsubscribe();
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint }),
      }).catch(() => {});
      await refresh();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    } finally {
      setBusy(false);
    }
  }, [refresh]);

  const updateSchedule = useCallback(async () => {
    if (state.status !== "subscribed") return;
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    const json = sub.toJSON();
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscription: { endpoint: json.endpoint, keys: json.keys },
        morningHour: parseHour(settings.morningTime),
        eveningHour: parseHour(settings.eveningTime),
        timezone: detectTimezone(),
      }),
    });
  }, [state.status, settings.morningTime, settings.eveningTime]);

  return { state, busy, subscribe, unsubscribe, updateSchedule, refresh };
}
