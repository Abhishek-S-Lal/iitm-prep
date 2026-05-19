import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { allQuestions } from "../data/questions";
import { useProgress } from "../store/progressStore";
import {
  SUBJECT_LABELS,
  SUBJECT_WEIGHTS,
  type QuizQuestion,
  type Subject,
} from "../data/types";

type Variant = "50" | "100" | "mini";

const VARIANT_INFO: Record<
  Variant,
  { label: string; questions: number; minutes: number; description: string }
> = {
  "50": {
    label: "50-mark paper",
    questions: 25,
    minutes: 120,
    description: "Half-length practice paper — 2 hours, 25 questions.",
  },
  "100": {
    label: "100-mark paper",
    questions: 50,
    minutes: 120,
    description: "Full exam simulation — 2 hours, 50 questions.",
  },
  mini: {
    label: "Mini-mock (M key)",
    questions: 10,
    minutes: 15,
    description: "Quick 10-question, 15-minute warm-up.",
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawWeighted(n: number, topicFilter?: Subject): QuizQuestion[] {
  const pool = allQuestions();
  if (topicFilter) {
    return shuffle(pool.filter((q) => q.topic === topicFilter)).slice(0, n);
  }
  const byTopic: Record<Subject, QuizQuestion[]> = {
    probability: [],
    "linear-algebra": [],
    optimization: [],
    ml: [],
    revision: [],
  };
  for (const q of pool) {
    if (q.topic && byTopic[q.topic]) byTopic[q.topic].push(q);
  }
  const weights: [Subject, number][] = [
    ["probability", SUBJECT_WEIGHTS.probability],
    ["linear-algebra", SUBJECT_WEIGHTS["linear-algebra"]],
    ["optimization", SUBJECT_WEIGHTS.optimization],
    ["ml", SUBJECT_WEIGHTS.ml],
  ];
  const out: QuizQuestion[] = [];
  for (const [topic, w] of weights) {
    const count = Math.max(1, Math.round(n * w));
    out.push(...shuffle(byTopic[topic]).slice(0, count));
  }
  return shuffle(out).slice(0, n);
}

export default function MockTest() {
  const [searchParams] = useSearchParams();
  const initialMini = searchParams.get("mini") === "1";

  const [variant, setVariant] = useState<Variant | null>(initialMini ? "mini" : null);
  const [topicFilter, setTopicFilter] = useState<Subject | "">("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, Set<number>>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const { saveMockScore } = useProgress();

  useEffect(() => {
    if (initialMini && !startedAt && variant === "mini") {
      startMock("mini");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!startedAt || finished) return;
    const id = setInterval(() => {
      const passed = Math.floor((Date.now() - startedAt) / 1000);
      const total = VARIANT_INFO[variant!].minutes * 60;
      const left = total - passed;
      if (left <= 0) {
        setSecondsLeft(0);
        finishMock();
        clearInterval(id);
      } else {
        setSecondsLeft(left);
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedAt, variant, finished]);

  function startMock(v: Variant) {
    const n = VARIANT_INFO[v].questions;
    const qs = drawWeighted(n, topicFilter || undefined);
    setVariant(v);
    setQuestions(qs);
    setAnswers({});
    setStartedAt(Date.now());
    setSecondsLeft(VARIANT_INFO[v].minutes * 60);
    setFinished(false);
  }

  function toggleAnswer(q: QuizQuestion, i: number) {
    if (finished) return;
    setAnswers((prev) => {
      const next = { ...prev };
      const cur = new Set(prev[q.id] ?? []);
      if (q.type === "msq") {
        cur.has(i) ? cur.delete(i) : cur.add(i);
      } else {
        cur.clear();
        cur.add(i);
      }
      next[q.id] = cur;
      return next;
    });
  }

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) {
      const sel = answers[q.id];
      if (!sel) continue;
      const correct = new Set(Array.isArray(q.answer) ? q.answer : [q.answer]);
      const match =
        sel.size === correct.size && [...sel].every((v) => correct.has(v));
      if (match) s++;
    }
    return s;
  }, [answers, questions]);

  const topicBreakdown = useMemo(() => {
    const acc: Record<string, { right: number; total: number }> = {};
    for (const q of questions) {
      const t = q.topic ?? "other";
      if (!acc[t]) acc[t] = { right: 0, total: 0 };
      acc[t].total++;
      const sel = answers[q.id];
      if (sel) {
        const correct = new Set(Array.isArray(q.answer) ? q.answer : [q.answer]);
        const match =
          sel.size === correct.size && [...sel].every((v) => correct.has(v));
        if (match) acc[t].right++;
      }
    }
    return acc;
  }, [answers, questions]);

  function finishMock() {
    if (!variant) return;
    setFinished(true);
    saveMockScore({
      date: new Date().toISOString().slice(0, 10),
      score,
      total: questions.length,
      variant: variant === "mini" ? "50" : variant,
    });
  }

  function resetMock() {
    setVariant(null);
    setQuestions([]);
    setAnswers({});
    setStartedAt(null);
    setSecondsLeft(0);
    setFinished(false);
  }

  // ─── Setup screen ───────────────────────────────────────────────────
  if (!variant || !startedAt) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-4 lg:p-8">
        <div className="card">
          <h1 className="text-2xl font-bold">Mock Tests</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Practise under timed exam conditions. Questions are weighted by exam topic proportions: Stats 38%, LA 27%, Opt 15%, ML 20%.
          </p>
        </div>

        <div className="card">
          <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Topic filter (optional)
          </div>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value as Subject)}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">All topics (weighted by exam)</option>
            {(Object.keys(SUBJECT_LABELS) as Subject[])
              .filter((s) => s !== "revision")
              .map((s) => (
                <option key={s} value={s}>
                  {SUBJECT_LABELS[s]}
                </option>
              ))}
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {(Object.keys(VARIANT_INFO) as Variant[]).map((v) => (
            <button
              key={v}
              onClick={() => startMock(v)}
              className="card text-left transition hover:border-iitm-300"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
                {VARIANT_INFO[v].label}
              </div>
              <div className="mt-1 text-xl font-bold">
                {VARIANT_INFO[v].questions} Qs
              </div>
              <div className="text-xs text-slate-500">
                {VARIANT_INFO[v].minutes} min
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {VARIANT_INFO[v].description}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Results screen ────────────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score / Math.max(1, questions.length)) * 100);
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-4 lg:p-8">
        <div className="card bg-gradient-to-br from-iitm-500 to-iitm-700 text-white">
          <div className="text-xs uppercase tracking-wider text-iitm-100">
            Mock complete
          </div>
          <div className="mt-2 text-4xl font-bold">
            {score} / {questions.length}
          </div>
          <div className="text-lg">{pct}%</div>
        </div>

        <div className="card">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Topic breakdown
          </div>
          <div className="-mx-2 overflow-x-auto px-2">
            <table className="w-full min-w-[320px] text-sm">
              <tbody>
                {Object.entries(topicBreakdown).map(([t, v]) => (
                  <tr key={t} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                    <td className="py-2 pr-3">{SUBJECT_LABELS[t as Subject] ?? t}</td>
                    <td className="py-2 text-right font-mono">
                      {v.right}/{v.total} · {Math.round((v.right / Math.max(1, v.total)) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            Review
          </div>
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const sel = answers[q.id] ?? new Set<number>();
              const correctSet = new Set(
                Array.isArray(q.answer) ? q.answer : [q.answer],
              );
              const right =
                sel.size === correctSet.size &&
                [...sel].every((v) => correctSet.has(v));
              return (
                <div
                  key={q.id}
                  className={`rounded-lg border p-3 text-sm ${
                    right
                      ? "border-success/40 bg-green-50 dark:bg-green-900/10"
                      : "border-danger/40 bg-red-50 dark:bg-red-900/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium">
                      Q{idx + 1}. {q.text}
                    </div>
                    <div className="shrink-0 font-semibold">{right ? "✓" : "✗"}</div>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Correct: {[...correctSet].map((i) => q.options[i]).join(" | ")}
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={resetMock} className="btn-primary">
          New mock
        </button>
      </div>
    );
  }

  // ─── In-progress screen ────────────────────────────────────────────
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const answered = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 lg:p-8">
      <div className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 lg:-mx-8 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[10px] font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300 sm:text-xs">
              {VARIANT_INFO[variant].label}
            </div>
            <div className="text-xs text-slate-500">
              {answered}/{questions.length} answered
            </div>
          </div>
          <div
            className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-base font-bold sm:px-3 sm:text-lg ${
              secondsLeft < 300 ? "bg-danger/10 text-danger" : "bg-slate-100 dark:bg-slate-800"
            }`}
          >
            {mm}:{ss}
          </div>
          <button onClick={finishMock} className="btn-primary shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm">
            Submit
          </button>
        </div>
      </div>

      {questions.map((q, idx) => {
        const sel = answers[q.id] ?? new Set<number>();
        return (
          <div key={q.id} className="card">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
              Q{idx + 1} · {q.type.toUpperCase()}
              {q.topic && (
                <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800">
                  {SUBJECT_LABELS[q.topic]}
                </span>
              )}
            </div>
            <div className="font-medium">{q.text}</div>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, i) => {
                const isSelected = sel.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleAnswer(q, i)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${
                      isSelected
                        ? "border-iitm-500 bg-iitm-50 dark:bg-iitm-900/30"
                        : "border-slate-200 hover:border-iitm-300 dark:border-slate-800 dark:hover:border-iitm-700"
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold dark:border-slate-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-slate-800 dark:text-slate-200">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <button onClick={finishMock} className="btn-primary">
        Submit mock
      </button>
    </div>
  );
}
