import { Link, useParams } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { useProgress } from "../store/progressStore";
import { SUBJECT_LABELS, type Subject } from "../data/types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function SubjectView() {
  const { slug } = useParams<{ slug: string }>();
  const subject = slug as Subject;
  const { completedDays, quizScores } = useProgress();
  const completed = new Set(completedDays);
  const days = curriculum.filter((d) => d.subject === subject);

  useDocumentMeta({
    title: SUBJECT_LABELS[subject]
      ? `${SUBJECT_LABELS[subject]} — IITM MTech AI Prep`
      : "Subject",
    description: SUBJECT_LABELS[subject]
      ? `All ${days.length} ${SUBJECT_LABELS[subject]} lessons in the 60-day IIT Madras CODE MTech AI entrance prep — daily lessons, NPTEL videos, formulas, and practice questions.`
      : undefined,
    path: `/subject/${slug}`,
  });

  if (!days.length) {
    return (
      <div className="p-8">
        <div className="card">Subject not found.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 lg:p-8">
      <div className="card">
        <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          Subject
        </div>
        <h1 className="mt-1 text-2xl font-bold">{SUBJECT_LABELS[subject]}</h1>
        <div className="mt-1 text-sm text-slate-500">
          {days.length} days · {days.filter((d) => completed.has(d.id)).length} completed
        </div>
      </div>
      <div className="space-y-2">
        {days.map((d) => (
          <Link
            key={d.id}
            to={`/day/${d.id}`}
            className="card flex items-center justify-between transition hover:border-iitm-300"
          >
            <div>
              <div className="text-xs text-slate-500">
                Day {d.id} · {d.date}
              </div>
              <div className="font-semibold">{d.title}</div>
            </div>
            <div className="text-right">
              {completed.has(d.id) && (
                <div className="text-sm font-semibold text-success">✓ Done</div>
              )}
              {quizScores[d.id] != null && (
                <div className="text-xs font-mono text-slate-400">
                  {quizScores[d.id]}%
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
