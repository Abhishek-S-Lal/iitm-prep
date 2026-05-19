import { useProgress } from "../store/progressStore";

function intensity(date: string, log: Record<string, boolean>, completed: Set<number>, dayMap: Record<string, number>): number {
  if (!log[date]) return 0;
  const dayId = dayMap[date];
  if (dayId && completed.has(dayId)) return 3;
  return 2;
}

export default function Heatmap({ days = 60 }: { days?: number }) {
  const { studyLog, completedDays } = useProgress();
  const today = new Date();
  const cells: { date: string; level: number }[] = [];
  const dayMap: Record<string, number> = {};

  // Build a day-id lookup so we can color "completed" days darker
  // Course starts 2026-05-19; just walk a window backward from today
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: key, level: 0 });
  }

  const completed = new Set(completedDays);
  cells.forEach((c) => {
    c.level = intensity(c.date, studyLog, completed, dayMap);
  });

  // Each ramp step must contrast against its own canvas:
  // light card bg = #ffffff/paper-100, dark card bg = #161616/ink-700.
  // The dark ramp climbs through iitm blues that all sit visibly above #161616.
  const colors = [
    "bg-slate-200 dark:bg-slate-700",          // empty — neutral, just above card bg
    "bg-iitm-200 dark:bg-iitm-800",            // light activity
    "bg-iitm-400 dark:bg-iitm-600",            // moderate
    "bg-iitm-600 dark:bg-iitm-400",            // heavy — brightest in dark
  ];

  return (
    <div>
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {cells.map((c) => (
          <div
            key={c.date}
            title={`${c.date} — ${c.level === 0 ? "no activity" : c.level === 3 ? "lesson complete" : "studied"}`}
            className={`h-3 w-3 rounded-sm ${colors[c.level]}`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
