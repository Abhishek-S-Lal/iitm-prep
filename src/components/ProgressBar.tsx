interface Props {
  value: number;
  total: number;
  label?: string;
  color?: string;
}

export default function ProgressBar({ value, total, label, color = "bg-iitm-500" }: Props) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
          <span className="font-mono text-slate-500">
            {value}/{total} · {pct}%
          </span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
