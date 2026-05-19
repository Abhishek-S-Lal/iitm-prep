import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { useProgress } from "../store/progressStore";
import { PHASE_INFO, dateForDay, COURSE_START_DATE, type Phase } from "../data/types";

function todayDayId(): number {
  const today = new Date().toISOString().slice(0, 10);
  const start = new Date(COURSE_START_DATE + "T00:00:00").getTime();
  const now = new Date(today + "T00:00:00").getTime();
  const diff = Math.floor((now - start) / 86400000) + 1;
  return Math.max(1, Math.min(60, diff));
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { completedDays, quizScores } = useProgress();
  const completed = useMemo(() => new Set(completedDays), [completedDays]);
  const today = todayDayId();

  const initialPhase = curriculum.find((d) => d.id === today)?.phase ?? 1;
  const [openPhases, setOpenPhases] = useState<Set<Phase>>(
    new Set([initialPhase as Phase]),
  );

  const togglePhase = (p: Phase) => {
    const next = new Set(openPhases);
    next.has(p) ? next.delete(p) : next.add(p);
    setOpenPhases(next);
  };

  const phases: Phase[] = [1, 2, 3, 4, 5];

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3 text-sm">
      <Link
        to="/"
        onClick={onNavigate}
        className={`rounded-lg px-3 py-2 font-semibold transition ${
          location.pathname === "/"
            ? "bg-iitm-500 text-white"
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        }`}
      >
        🏠 Dashboard
      </Link>
      <Link
        to="/mock"
        onClick={onNavigate}
        className={`rounded-lg px-3 py-2 font-semibold transition ${
          location.pathname.startsWith("/mock")
            ? "bg-iitm-500 text-white"
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        }`}
      >
        🧪 Mock Tests
      </Link>
      <Link
        to="/progress"
        onClick={onNavigate}
        className={`rounded-lg px-3 py-2 font-semibold transition ${
          location.pathname === "/progress"
            ? "bg-iitm-500 text-white"
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        }`}
      >
        📊 Progress
      </Link>

      <div className="mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Curriculum
      </div>

      {phases.map((p) => {
        const info = PHASE_INFO[p];
        const phaseDays = curriculum.filter((d) => d.phase === p);
        const phaseCompleted = phaseDays.filter((d) => completed.has(d.id)).length;
        const isOpen = openPhases.has(p);

        return (
          <div key={p} className="mt-1">
            <button
              onClick={() => togglePhase(p)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs font-semibold uppercase text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span className="truncate">{info.label}</span>
              <span className="ml-2 shrink-0 font-mono text-slate-400">
                {phaseCompleted}/{phaseDays.length} {isOpen ? "▾" : "▸"}
              </span>
            </button>
            {isOpen &&
              phaseDays.map((d) => {
                const isToday = d.id === today;
                const isFuture = d.id > today;
                const isComplete = completed.has(d.id);
                const score = quizScores[d.id];
                const active = location.pathname === `/day/${d.id}`;
                return (
                  <Link
                    key={d.id}
                    to={`/day/${d.id}`}
                    onClick={onNavigate}
                    className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs transition ${
                      active
                        ? "bg-iitm-100 font-semibold text-iitm-700 dark:bg-iitm-900/50 dark:text-iitm-100"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    } ${isFuture ? "opacity-60" : ""}`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="w-8 shrink-0 font-mono text-slate-400">D{d.id}</span>
                      <span className="truncate">{d.title}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      {isToday && (
                        <span className="rounded bg-iitm-500 px-1 text-[10px] font-bold text-white">
                          TODAY
                        </span>
                      )}
                      {isComplete && <span className="text-success">✓</span>}
                      {score != null && (
                        <span className="font-mono text-[10px] text-slate-400">{score}%</span>
                      )}
                    </span>
                  </Link>
                );
              })}
          </div>
        );
      })}
      <div className="mt-3 px-3 pb-3 text-[10px] text-slate-400">
        Today: {dateForDay(today)} · Day {today}/60
      </div>
    </nav>
  );
}

export { todayDayId };
