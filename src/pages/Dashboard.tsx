import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { curriculum, dayById } from "../data/curriculum";
import { useProgress } from "../store/progressStore";
import { PHASE_INFO, EXAM_DATE, type Phase } from "../data/types";
import ProgressBar from "../components/ProgressBar";
import Heatmap from "../components/Heatmap";
import { todayDayId } from "../components/Sidebar";

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  const diff = new Date(target + "T09:00:00").getTime() - now;
  const sec = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  return { days, hours, minutes };
}

export default function Dashboard() {
  const { completedDays, quizScores, streak, mockScores } = useProgress();
  const today = todayDayId();
  const todayDay = dayById(today);
  const { days, hours, minutes } = useCountdown(EXAM_DATE);

  const completedSet = new Set(completedDays);
  const totalDone = completedDays.length;
  const allScores = Object.values(quizScores);
  const avgQuiz = allScores.length
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  const phases: Phase[] = [1, 2, 3, 4, 5];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 lg:p-8">
      {/* Hero countdown */}
      <div className="card overflow-hidden bg-gradient-to-br from-iitm-500 to-iitm-700 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-iitm-100">
              IIT Madras MTech AI · Qualifier
            </div>
            <div className="mt-1 text-2xl font-bold sm:text-3xl">Exam — July 19, 2026</div>
            <div className="mt-1 text-sm text-iitm-100">
              You are on Day {today} of 60
            </div>
          </div>
          <div className="flex gap-4 text-center sm:gap-3">
            <div>
              <div className="text-2xl font-bold sm:text-3xl">{days}</div>
              <div className="text-[10px] uppercase text-iitm-100 sm:text-xs">days</div>
            </div>
            <div>
              <div className="text-2xl font-bold sm:text-3xl">{hours}</div>
              <div className="text-[10px] uppercase text-iitm-100 sm:text-xs">hrs</div>
            </div>
            <div>
              <div className="text-2xl font-bold sm:text-3xl">{minutes}</div>
              <div className="text-[10px] uppercase text-iitm-100 sm:text-xs">min</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's lesson */}
        <div className="card lg:col-span-2">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Today's lesson · Day {today}
          </div>
          {todayDay ? (
            <>
              <div className="text-xl font-bold">{todayDay.title}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {PHASE_INFO[todayDay.phase].label}
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {todayDay.objectives.slice(0, 3).map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link to={`/day/${today}`} className="btn-primary">
                  Continue →
                </Link>
                <Link to="/mock?mini=1" className="btn-ghost">
                  Mini-mock (press M)
                </Link>
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-500">No lesson scheduled.</div>
          )}
        </div>

        {/* Quick stats */}
        <div className="card">
          <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Quick stats
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat label="Days done" value={`${totalDone}/60`} />
            <Stat label="Avg quiz" value={`${avgQuiz}%`} />
            <Stat label="Streak" value={`${streak}🔥`} />
            <Stat label="Mocks" value={`${mockScores.length}`} />
          </dl>
          {mockScores.length > 0 && (
            <div className="mt-3 text-xs text-slate-500">
              Last mock:{" "}
              <span className="font-mono text-slate-700 dark:text-slate-300">
                {mockScores[mockScores.length - 1].score}/
                {mockScores[mockScores.length - 1].total}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Phase progress */}
      <div className="card">
        <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          Phase progress
        </div>
        <div className="mt-3 space-y-3">
          {phases.map((p) => {
            const info = PHASE_INFO[p];
            const days = curriculum.filter((d) => d.phase === p);
            const done = days.filter((d) => completedSet.has(d.id)).length;
            return (
              <ProgressBar
                key={p}
                label={info.label}
                value={done}
                total={days.length}
              />
            );
          })}
        </div>
      </div>

      {/* Heatmap */}
      <div className="card">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          Last 60 days
        </div>
        <Heatmap />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
