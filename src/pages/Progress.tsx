import { useProgress } from "../store/progressStore";
import { curriculum } from "../data/curriculum";
import { PHASE_INFO, type Phase } from "../data/types";
import Heatmap from "../components/Heatmap";
import ProgressBar from "../components/ProgressBar";

export default function Progress() {
  const { completedDays, quizScores, mockScores, streak, resetAll } = useProgress();
  const completed = new Set(completedDays);
  const scores = Object.values(quizScores);
  const avg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  const phases: Phase[] = [1, 2, 3, 4, 5];

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-4 lg:p-8">
      <div className="card">
        <h1 className="text-2xl font-bold">Progress</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <StatBig label="Days complete" value={`${completedDays.length}/60`} />
        <StatBig label="Avg quiz score" value={`${avg}%`} />
        <StatBig label="Streak" value={`${streak} 🔥`} />
        <StatBig label="Mocks taken" value={`${mockScores.length}`} />
      </div>

      <div className="card">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          Last 60 days
        </div>
        <Heatmap />
      </div>

      <div className="card">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          Phase progress
        </div>
        <div className="space-y-3">
          {phases.map((p) => {
            const info = PHASE_INFO[p];
            const days = curriculum.filter((d) => d.phase === p);
            const done = days.filter((d) => completed.has(d.id)).length;
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

      {mockScores.length > 0 && (
        <div className="card">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Mock history
          </div>
          <div className="-mx-2 overflow-x-auto px-2">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="text-left text-xs text-slate-500">
              <tr>
                <th className="py-1">Date</th>
                <th className="py-1">Variant</th>
                <th className="py-1 text-right">Score</th>
                <th className="py-1 text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {mockScores.map((m, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-1 font-mono">{m.date}</td>
                  <td className="py-1">{m.variant}-mark</td>
                  <td className="py-1 text-right font-mono">
                    {m.score}/{m.total}
                  </td>
                  <td className="py-1 text-right font-mono">
                    {Math.round((m.score / m.total) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      <div className="card">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-danger">
          Danger zone
        </div>
        <button
          className="rounded-lg border border-danger/40 px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger/10"
          onClick={() => {
            if (confirm("Reset all progress? This cannot be undone.")) resetAll();
          }}
        >
          Reset all progress
        </button>
      </div>
    </div>
  );
}

function StatBig({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
