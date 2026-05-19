import { useEffect, useState } from "react";
import { useNotificationSettings } from "../store/notificationStore";
import { fireTestNotification } from "../hooks/useNotifications";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

type PermState = "default" | "granted" | "denied" | "unsupported";

function getPermission(): PermState {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission as PermState;
}

export default function Settings() {
  useDocumentMeta({
    title: "Settings",
    description: "Configure daily study reminders, study window, and evening fallback.",
    path: "/settings",
  });

  const s = useNotificationSettings();
  const [perm, setPerm] = useState<PermState>(getPermission());
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setPerm(getPermission());
  }, []);

  const requestPermission = async () => {
    if (typeof Notification === "undefined") {
      setPerm("unsupported");
      return;
    }
    const result = await Notification.requestPermission();
    setPerm(result as PermState);
    if (result === "granted") {
      s.setEnabled(true);
      setFeedback("✓ Permission granted. Daily reminders are on.");
    } else {
      setFeedback("Permission was not granted.");
    }
  };

  const toggleEnabled = async (next: boolean) => {
    if (next && perm !== "granted") {
      await requestPermission();
      return;
    }
    s.setEnabled(next);
    setFeedback(next ? "Reminders enabled." : "Reminders disabled.");
  };

  const sendTest = async () => {
    const res = await fireTestNotification(
      "Test reminder",
      "Reminders are working. Day-of, you'll get something better than this.",
    );
    setFeedback(res.ok ? "✓ Sent — check your notifications." : res.reason || "Failed.");
    setPerm(getPermission());
  };

  const permLabel: Record<PermState, string> = {
    default: "Not yet asked",
    granted: "Granted ✓",
    denied: "Blocked",
    unsupported: "Not supported in this browser",
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 lg:p-8">
      <div className="card">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Configure daily study reminders.
        </p>
      </div>

      <section className="card space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold">Daily reminders</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              A motivating notification each morning, and an evening nudge if you
              haven't studied yet.
            </div>
          </div>
          <button
            onClick={() => toggleEnabled(!s.enabled)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              s.enabled ? "bg-iitm-500" : "bg-slate-300 dark:bg-slate-700"
            }`}
            aria-pressed={s.enabled}
            aria-label="Toggle reminders"
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                s.enabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Permission status</span>
            <span className="font-mono font-semibold">{permLabel[perm]}</span>
          </div>
          {perm === "denied" && (
            <div className="mt-2 text-slate-500">
              You blocked notifications. Re-enable for this site in your browser
              settings (lock icon → Notifications → Allow).
            </div>
          )}
          {perm === "default" && (
            <button onClick={requestPermission} className="btn-primary mt-2 text-xs">
              Grant permission
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Study start time
            </span>
            <input
              type="time"
              value={s.morningTime}
              onChange={(e) => s.setMorningTime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <span className="mt-1 block text-xs text-slate-500">
              Morning reminder fires at this time when you open the app.
            </span>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Study window
            </span>
            <select
              value={s.morningWindowMinutes}
              onChange={(e) => s.setMorningWindow(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value={120}>2 hours</option>
              <option value={180}>3 hours</option>
              <option value={240}>4 hours (default)</option>
              <option value={360}>6 hours</option>
            </select>
            <span className="mt-1 block text-xs text-slate-500">
              How long the morning window stays "open" for a fire.
            </span>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Evening fallback time
            </span>
            <input
              type="time"
              value={s.eveningTime}
              onChange={(e) => s.setEveningTime(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <span className="mt-1 block text-xs text-slate-500">
              If you haven't checked in today, you'll get a nudge after this time.
            </span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={sendTest} className="btn-ghost text-xs">
            Send test notification
          </button>
          {feedback && (
            <span className="text-xs text-slate-500 dark:text-slate-400">{feedback}</span>
          )}
        </div>
      </section>

      <section className="card text-xs text-slate-500 dark:text-slate-400">
        <div className="mb-2 font-semibold uppercase tracking-wider">How this works</div>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Reminders fire when you open the app or PWA within the configured
            window. They don't yet wake your phone if the app is fully closed —
            that requires a backend with web-push (planned).
          </li>
          <li>
            Installing the app to your home screen (Settings → Install on Android,
            Share → Add to Home Screen on iOS) keeps the service worker warmer and
            improves reliability.
          </li>
          <li>
            Each day fires at most one morning reminder and one evening reminder.
            The evening one only fires if you haven't marked any progress that day.
          </li>
        </ul>
      </section>
    </div>
  );
}
