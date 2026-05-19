import { useState } from "react";
import type { QuizQuestion } from "../data/types";

interface Props {
  question: QuizQuestion;
  index: number;
  onAnswered?: (correct: boolean) => void;
}

export default function QuizCard({ question, index, onAnswered }: Props) {
  const isMulti = question.type === "msq";
  const correctSet = new Set(
    Array.isArray(question.answer) ? question.answer : [question.answer],
  );

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i: number) => {
    if (submitted) return;
    if (isMulti) {
      const next = new Set(selected);
      next.has(i) ? next.delete(i) : next.add(i);
      setSelected(next);
    } else {
      setSelected(new Set([i]));
    }
  };

  const submit = () => {
    if (selected.size === 0) return;
    setSubmitted(true);
    const arraysEqual =
      selected.size === correctSet.size &&
      [...selected].every((s) => correctSet.has(s));
    onAnswered?.(arraysEqual);
  };

  return (
    <div className="card">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Q{index + 1} · {question.type.toUpperCase()}
          </div>
          <div className="mt-1 font-medium text-slate-900 dark:text-slate-100">
            {question.text}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selected.has(i);
          const isCorrect = correctSet.has(i);
          let cls =
            "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition";
          if (!submitted) {
            cls += isSelected
              ? " border-iitm-500 bg-iitm-50 dark:bg-iitm-900/30"
              : " border-slate-200 hover:border-iitm-300 dark:border-slate-800 dark:hover:border-iitm-700";
          } else {
            if (isCorrect) cls += " border-success bg-green-50 dark:bg-green-900/20";
            else if (isSelected && !isCorrect) cls += " border-danger bg-red-50 dark:bg-red-900/20";
            else cls += " border-slate-200 dark:border-slate-800 opacity-70";
          }
          return (
            <button key={i} className={cls} onClick={() => toggle(i)} disabled={submitted}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold dark:border-slate-700">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-slate-800 dark:text-slate-200">{opt}</span>
              {submitted && isCorrect && <span className="text-success">✓</span>}
              {submitted && isSelected && !isCorrect && <span className="text-danger">✗</span>}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          className="btn-primary mt-3"
          onClick={submit}
          disabled={selected.size === 0}
        >
          Submit
        </button>
      )}

      {submitted && (
        <div className="mt-3 rounded-lg border border-iitm-100 bg-iitm-50 p-3 text-sm dark:border-iitm-800/60 dark:bg-iitm-900/20">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Explanation
          </div>
          <div className="text-slate-700 dark:text-slate-300">{question.explanation}</div>
        </div>
      )}
    </div>
  );
}
