import { useEffect, useState } from "react";
import { useNotificationSettings } from "../store/notificationStore";
import { fireTestNotification } from "../hooks/useNotifications";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useWebPush } from "../hooks/useWebPush";

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
  const push = useWebPush();
  const [perm, setPerm] = useState<PermState>(getPermission());
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pushFeedback, setPushFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (push.state.status === "subscribed") {
      push.updateSchedule();
    }
  }, [s.morningTime, s.eveningTime, push.state.status]);

  const handleSubscribe = async () => {
    setPushFeedback("Subscribing…");
    const res = await push.subscribe();
    setPushFeedback(res.ok ? "✓ Subscribed. You'll get pushes even when the app is closed." : res.error || "Failed.");
    setPerm(getPermission());
  };

  const handleUnsubscribe = async () => {
    setPushFeedback("Unsubscribing…");
    const res = await push.unsubscribe();
    setPushFeedback(res.ok ? "Unsubscribed." : res.error || "Failed.");
  };

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

      <section className="card space-y-3">
        <div>
          <div className="font-semibold">Background push (works when app is closed)</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            A small server sends a push at your scheduled times every day, even if
            the app isn't open. Install the app to your home screen first for best
            reliability — required on iOS.
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Push subscription</span>
            <span className="font-mono font-semibold">
              {push.state.status === "subscribed"
                ? "Active ✓"
                : push.state.status === "unsupported"
                  ? "Not supported"
                  : push.state.status === "not-configured"
                    ? "Not configured"
                    : push.state.status === "no-permission"
                      ? "Permission blocked"
                      : "Inactive"}
            </span>
          </div>
          {(push.state.status === "unsupported" ||
            push.state.status === "not-configured") && (
            <div className="mt-1 text-slate-500">
              {"reason" in push.state ? push.state.reason : ""}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {push.state.status === "subscribed" ? (
            <button onClick={handleUnsubscribe} disabled={push.busy} className="btn-ghost text-xs">
              Disable background push
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={
                push.busy ||
                push.state.status === "unsupported" ||
                push.state.status === "not-configured"
              }
              className="btn-primary text-xs"
            >
              Enable background push
            </button>
          )}
          {pushFeedback && (
            <span className="text-xs text-slate-500 dark:text-slate-400">{pushFeedback}</span>
          )}
        </div>
      </section>

      <section className="card text-xs text-slate-500 dark:text-slate-400">
        <div className="mb-2 font-semibold uppercase tracking-wider">How this works</div>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Background push (above)</strong> uses a scheduled function on
            the server. After subscribing once, you'll get reminders at your
            chosen times every day even with the app closed.
          </li>
          <li>
            <strong>Local reminders</strong> fire when you open the app within
            your study window. They're the fallback when push isn't available
            (e.g. browsers without web push, or before you subscribe).
          </li>
          <li>
            Each day fires at most one morning reminder and one evening reminder.
            The local evening one only fires if you haven't checked in that day.
          </li>
          <li>
            iOS only delivers push to installed home-screen apps (iOS 16.4+).
            Android Chrome works in both browser and PWA mode.
          </li>
        </ul>
      </section>
    </div>
  );
}
