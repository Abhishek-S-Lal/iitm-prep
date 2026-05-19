import { useEffect } from "react";
import { useNotificationSettings } from "../store/notificationStore";
import { useProgress } from "../store/progressStore";
import { dayById } from "../data/curriculum";
import { getReminderContext, pickMessage } from "../data/motivations";
import { todayDayId } from "../components/Sidebar";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function nowMinutes(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

export type ReminderDecision =
  | { kind: "none"; reason: string }
  | {
      kind: "fire";
      bucket: "morning" | "evening";
      title: string;
      body: string;
    };

export function decideReminder(opts: {
  enabled: boolean;
  morningTime: string;
  morningWindowMinutes: number;
  eveningTime: string;
  lastMorningDate: string | null;
  lastEveningDate: string | null;
  studiedToday: boolean;
  completedCount: number;
  streak: number;
  dayId: number;
  todayTitle: string | null;
  now: Date;
}): ReminderDecision {
  if (!opts.enabled) return { kind: "none", reason: "disabled" };

  const today = opts.now.toISOString().slice(0, 10);
  const minutes = opts.now.getHours() * 60 + opts.now.getMinutes();
  const morningStart = timeToMinutes(opts.morningTime);
  const morningEnd = morningStart + opts.morningWindowMinutes;
  const eveningStart = timeToMinutes(opts.eveningTime);

  if (
    minutes >= morningStart &&
    minutes < morningEnd &&
    opts.lastMorningDate !== today
  ) {
    const ctx = getReminderContext({
      dayId: opts.dayId,
      completedCount: opts.completedCount,
      streak: opts.streak,
      todayTitle: opts.todayTitle,
      todayDone: opts.studiedToday,
      kind: "morning",
    });
    const msg = pickMessage(ctx);
    return { kind: "fire", bucket: "morning", title: msg.title, body: msg.body };
  }

  if (
    minutes >= eveningStart &&
    !opts.studiedToday &&
    opts.lastEveningDate !== today
  ) {
    const ctx = getReminderContext({
      dayId: opts.dayId,
      completedCount: opts.completedCount,
      streak: opts.streak,
      todayTitle: opts.todayTitle,
      todayDone: opts.studiedToday,
      kind: "evening",
    });
    const msg = pickMessage(ctx);
    return { kind: "fire", bucket: "evening", title: msg.title, body: msg.body };
  }

  return { kind: "none", reason: "outside-window" };
}

async function showNotification(title: string, body: string) {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission !== "granted") return false;

  const data = {
    body,
    icon: "/pwa-192x192.png",
    badge: "/pwa-64x64.png",
    tag: "iitm-daily-reminder",
    renotify: true,
  };

  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, data);
      return true;
    }
    new Notification(title, data);
    return true;
  } catch {
    return false;
  }
}

export async function fireTestNotification(title: string, body: string) {
  if (typeof Notification === "undefined") {
    return { ok: false, reason: "Notifications not supported in this browser." };
  }
  if (Notification.permission === "denied") {
    return {
      ok: false,
      reason: "Permission denied. Enable in your browser site settings.",
    };
  }
  if (Notification.permission !== "granted") {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return { ok: false, reason: "Permission not granted." };
  }
  const sent = await showNotification(title, body);
  return sent ? { ok: true } : { ok: false, reason: "Failed to dispatch notification." };
}

export function useNotifications() {
  const settings = useNotificationSettings();
  const { studyLog, completedDays, streak } = useProgress();

  useEffect(() => {
    if (!settings.enabled) return;
    if (typeof Notification === "undefined") return;
    if (Notification.permission !== "granted") return;

    const today = todayKey();
    const dayId = todayDayId();
    const day = dayById(dayId);
    const studiedToday = !!studyLog[today];

    const decision = decideReminder({
      enabled: settings.enabled,
      morningTime: settings.morningTime,
      morningWindowMinutes: settings.morningWindowMinutes,
      eveningTime: settings.eveningTime,
      lastMorningDate: settings.lastMorningDate,
      lastEveningDate: settings.lastEveningDate,
      studiedToday,
      completedCount: completedDays.length,
      streak,
      dayId,
      todayTitle: day?.title ?? null,
      now: new Date(),
    });

    if (decision.kind === "fire") {
      showNotification(decision.title, decision.body).then((ok) => {
        if (ok) settings.markFired(decision.bucket, today);
      });
    }
  }, [
    settings.enabled,
    settings.morningTime,
    settings.morningWindowMinutes,
    settings.eveningTime,
    settings.lastMorningDate,
    settings.lastEveningDate,
    completedDays.length,
    streak,
    studyLog,
  ]);
}

export function useReminderBanner(): {
  message: { title: string; body: string } | null;
  bucket: "morning" | "evening" | null;
  dismiss: () => void;
} {
  const settings = useNotificationSettings();
  const { studyLog, completedDays, streak } = useProgress();

  const today = todayKey();
  const dayId = todayDayId();
  const day = dayById(dayId);
  const studiedToday = !!studyLog[today];

  if (!settings.enabled) return { message: null, bucket: null, dismiss: () => {} };
  if (settings.bannerDismissedDate === today)
    return { message: null, bucket: null, dismiss: () => {} };

  const decision = decideReminder({
    enabled: settings.enabled,
    morningTime: settings.morningTime,
    morningWindowMinutes: settings.morningWindowMinutes,
    eveningTime: settings.eveningTime,
    lastMorningDate: null,
    lastEveningDate: null,
    studiedToday,
    completedCount: completedDays.length,
    streak,
    dayId,
    todayTitle: day?.title ?? null,
    now: new Date(),
  });

  if (decision.kind !== "fire") return { message: null, bucket: null, dismiss: () => {} };

  return {
    message: { title: decision.title, body: decision.body },
    bucket: decision.bucket,
    dismiss: () => settings.dismissBanner(today),
  };
}

export function nowMinutesForTest() {
  return nowMinutes();
}
