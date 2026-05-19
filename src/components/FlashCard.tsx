import { useEffect, useState } from "react";
import type { Formula } from "../data/types";

export default function FlashCard({ formulas }: { formulas: Formula[] }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIdx((i) => Math.min(formulas.length - 1, i + 1));
        setFlipped(false);
      } else if (e.key === "ArrowLeft") {
        setIdx((i) => Math.max(0, i - 1));
        setFlipped(false);
      } else if (e.key === " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formulas.length]);

  if (!formulas.length)
    return (
      <div className="text-sm text-slate-500">No formulas for this day.</div>
    );

  const f = formulas[idx];

  return (
    <div>
      <div
        onClick={() => setFlipped((v) => !v)}
        className="flex min-h-[180px] cursor-pointer items-center justify-center rounded-xl border border-iitm-200 bg-gradient-to-br from-iitm-50 to-white p-8 text-center shadow-sm transition hover:shadow-md dark:border-iitm-800 dark:from-iitm-900/40 dark:to-slate-900"
      >
        {!flipped ? (
          <div>
            <div className="text-xs uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
              {f.name}
            </div>
            <div className="mt-3 font-mono text-lg font-medium">{f.latex}</div>
            <div className="mt-4 text-xs text-slate-500">Click / Space to flip</div>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {f.description}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          className="btn-ghost"
          disabled={idx === 0}
          onClick={() => {
            setIdx(idx - 1);
            setFlipped(false);
          }}
        >
          ← Prev
        </button>
        <div className="text-xs text-slate-500">
          {idx + 1} / {formulas.length} · ← → to navigate · Space to flip
        </div>
        <button
          className="btn-ghost"
          disabled={idx === formulas.length - 1}
          onClick={() => {
            setIdx(idx + 1);
            setFlipped(false);
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
