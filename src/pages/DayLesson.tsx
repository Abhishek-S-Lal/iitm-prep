import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dayById, curriculum } from "../data/curriculum";
import { useProgress } from "../store/progressStore";
import { PHASE_INFO, SUBJECT_LABELS } from "../data/types";
import VideoPlayer from "../components/VideoPlayer";
import LessonContent from "../components/LessonContent";
import FormulaCard from "../components/FormulaCard";
import FlashCard from "../components/FlashCard";
import QuizCard from "../components/QuizCard";

export default function DayLesson() {
  const { dayId } = useParams<{ dayId: string }>();
  const id = Number(dayId);
  const day = dayById(id);
  const {
    completedDays,
    markDayComplete,
    markDayIncomplete,
    saveQuizScore,
    quizScores,
  } = useProgress();

  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<"formulas" | "flashcards">("formulas");

  useEffect(() => {
    setQuizAnswers({});
    window.scrollTo(0, 0);
  }, [id]);

  const completed = completedDays.includes(id);
  const attempted = useMemo(
    () => day && Object.keys(quizAnswers).length === day.questions.length,
    [quizAnswers, day],
  );
  const score = useMemo(() => {
    const vals = Object.values(quizAnswers);
    return vals.length ? Math.round((vals.filter(Boolean).length / vals.length) * 100) : 0;
  }, [quizAnswers]);

  if (!day) {
    return (
      <div className="p-8">
        <div className="card">
          <div className="text-lg font-semibold">Day not found</div>
          <Link to="/" className="mt-3 inline-block btn-primary">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswered = (qid: string, ok: boolean) => {
    setQuizAnswers((prev) => ({ ...prev, [qid]: ok }));
  };

  const handleComplete = () => {
    saveQuizScore(id, score);
    markDayComplete(id);
  };

  const primaryVideo = day.videos.find((v) => v.tag === "core") ?? day.videos[0];
  const otherVideos = day.videos.filter((v) => v !== primaryVideo);

  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < curriculum.length ? id + 1 : null;

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-4 lg:p-8">
      <header className="card">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded bg-iitm-100 px-2 py-0.5 font-semibold text-iitm-700 dark:bg-iitm-900/50 dark:text-iitm-200">
            Day {day.id}
          </span>
          <span>·</span>
          <span>{PHASE_INFO[day.phase].label}</span>
          <span>·</span>
          <span>{SUBJECT_LABELS[day.subject]}</span>
          <span>·</span>
          <span className="font-mono">{day.date}</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold lg:text-3xl">{day.title}</h1>
        {day.objectives.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
              Learning objectives
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
              {day.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {primaryVideo && (
        <section className="card">
          <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            📹 Primary video
          </div>
          <VideoPlayer
            videoId={primaryVideo.id}
            title={primaryVideo.title}
            channel={primaryVideo.channel}
            duration={primaryVideo.duration}
          />
        </section>
      )}

      <section className="card">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          📝 Lesson notes
        </div>
        <LessonContent html={day.notes} />
      </section>

      {day.formulas.length > 0 && (
        <section className="card">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
              📐 Key formulas
            </div>
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
              <button
                onClick={() => setMode("formulas")}
                className={`rounded px-2 py-1 text-xs font-semibold transition ${
                  mode === "formulas"
                    ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-100"
                    : "text-slate-500"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setMode("flashcards")}
                className={`rounded px-2 py-1 text-xs font-semibold transition ${
                  mode === "flashcards"
                    ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-100"
                    : "text-slate-500"
                }`}
              >
                Flashcards
              </button>
            </div>
          </div>
          {mode === "formulas" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {day.formulas.map((f, i) => (
                <FormulaCard key={i} formula={f} />
              ))}
            </div>
          ) : (
            <FlashCard formulas={day.formulas} />
          )}
        </section>
      )}

      {otherVideos.length > 0 && (
        <section className="card">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
            📹 Supplementary videos
          </div>
          <div className="space-y-3">
            {otherVideos.map((v) => (
              <VideoPlayer
                key={v.id}
                videoId={v.id}
                title={v.title}
                channel={v.channel}
                duration={v.duration}
              />
            ))}
          </div>
        </section>
      )}

      {day.questions.length > 0 && (
        <section className="space-y-3">
          <div className="card">
            <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
              ✅ Practice questions
            </div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Attempt all {day.questions.length}; you must finish them to mark this day complete.
            </div>
            {attempted && (
              <div className="mt-3 rounded-lg border border-success/40 bg-green-50 px-4 py-2 text-sm font-semibold text-success dark:bg-green-900/20">
                Score: {score}% ({Object.values(quizAnswers).filter(Boolean).length}/{day.questions.length})
              </div>
            )}
          </div>
          {day.questions.map((q, i) => (
            <QuizCard
              key={q.id}
              question={q}
              index={i}
              onAnswered={(ok) => handleAnswered(q.id, ok)}
            />
          ))}
        </section>
      )}

      <section className="card border-iitm-200 bg-iitm-50/40 dark:border-iitm-800 dark:bg-iitm-900/10">
        <div className="text-xs font-semibold uppercase tracking-wider text-iitm-600 dark:text-iitm-300">
          📌 Summary
        </div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{day.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!completed ? (
            <button
              onClick={handleComplete}
              disabled={day.questions.length > 0 && !attempted}
              className="btn-primary"
            >
              Mark Day {day.id} Complete
            </button>
          ) : (
            <>
              <span className="rounded-lg bg-success/10 px-3 py-2 text-sm font-semibold text-success">
                ✓ Completed — {quizScores[day.id] ?? score}%
              </span>
              <button onClick={() => markDayIncomplete(id)} className="btn-ghost">
                Unmark
              </button>
            </>
          )}
        </div>
      </section>

      <nav className="flex items-center justify-between">
        {prevId ? (
          <Link to={`/day/${prevId}`} className="btn-ghost">
            ← Day {prevId}
          </Link>
        ) : (
          <span />
        )}
        {nextId ? (
          <Link to={`/day/${nextId}`} className="btn-ghost">
            Day {nextId} →
          </Link>
        ) : (
          <Link to="/" className="btn-ghost">
            Dashboard
          </Link>
        )}
      </nav>
    </div>
  );
}
