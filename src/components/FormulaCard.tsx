import type { Formula } from "../data/types";

export default function FormulaCard({ formula }: { formula: Formula }) {
  return (
    <div className="rounded-lg border border-iitm-100 bg-iitm-50/60 p-4 dark:border-iitm-800/60 dark:bg-iitm-900/20">
      <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
        {formula.name}
      </div>
      <div className="my-2 font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
        {formula.latex}
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-400">
        {formula.description}
      </div>
    </div>
  );
}
