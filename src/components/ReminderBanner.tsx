import { Link } from "react-router-dom";
import { useReminderBanner } from "../hooks/useNotifications";
import { todayDayId } from "./Sidebar";

export default function ReminderBanner() {
  const { message, bucket, dismiss } = useReminderBanner();
  if (!message) return null;

  const isEvening = bucket === "evening";
  const dayId = todayDayId();

  return (
    <div
      className={`mx-auto mb-3 max-w-6xl rounded-xl border p-4 ${
        isEvening
          ? "border-amber-300 bg-amber-50 dark:border-amber-700/50 dark:bg-amber-900/20"
          : "border-iitm-200 bg-iitm-50 dark:border-iitm-700/50 dark:bg-iitm-900/20"
      }`}
      role="status"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl" aria-hidden>
          {isEvening ? "🌙" : "☀️"}
        </div>
        <div className="flex-1 text-sm">
          <div className="font-semibold">{message.title}</div>
          <div className="mt-0.5 text-slate-700 dark:text-slate-200">{message.body}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Link to={`/day/${dayId}`} className="btn-primary text-xs">
              Open Day {dayId}
            </Link>
            {isEvening && (
              <Link to="/mock?mini=1" className="btn-ghost text-xs">
                10-min mini-mock
              </Link>
            )}
            <button
              onClick={dismiss}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
