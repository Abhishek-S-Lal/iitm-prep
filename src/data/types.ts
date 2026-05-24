export type Subject =
  | "probability"
  | "linear-algebra"
  | "optimization"
  | "ml"
  | "revision";

export type Phase = 1 | 2 | 3 | 4 | 5;

export interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  tag: "core" | "supplement" | "practice";
}

export interface Formula {
  name: string;
  latex: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "msq" | "numerical";
  text: string;
  options: string[];
  answer: number | number[];
  explanation: string;
  topic?: Subject;
}

export interface Day {
  id: number;
  date: string;
  phase: Phase;
  subject: Subject;
  title: string;
  objectives: string[];
  videos: Video[];
  notes: string;
  formulas: Formula[];
  questions: QuizQuestion[];
  summary: string;
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  probability: "Probability & Statistics",
  "linear-algebra": "Linear Algebra",
  optimization: "Optimization",
  ml: "Machine Learning",
  revision: "Revision & Mocks",
};

// Calibrated against the official IITM CODE AI 2026 sample paper:
// 16 Prob/Stats, 14 Linear Algebra, 1 Optimization, 9 ML out of 40 questions.
export const SUBJECT_WEIGHTS: Record<Subject, number> = {
  probability: 0.4,
  "linear-algebra": 0.35,
  optimization: 0.025,
  ml: 0.225,
  revision: 0,
};

export const PHASE_INFO: Record<
  Phase,
  { label: string; subject: Subject; startDay: number; endDay: number }
> = {
  1: { label: "Phase 1 — Probability & Statistics", subject: "probability", startDay: 1, endDay: 14 },
  2: { label: "Phase 2 — Linear Algebra", subject: "linear-algebra", startDay: 15, endDay: 28 },
  3: { label: "Phase 3 — Optimization", subject: "optimization", startDay: 29, endDay: 35 },
  4: { label: "Phase 4 — Machine Learning", subject: "ml", startDay: 36, endDay: 49 },
  5: { label: "Phase 5 — Revision & Mocks", subject: "revision", startDay: 50, endDay: 60 },
};

export const COURSE_START_DATE = "2026-05-19";
export const EXAM_DATE = "2026-07-19";

// All date arithmetic happens in the user's LOCAL timezone, not UTC.
// (Mixing local-parsed Date with toISOString() would shift the date
// back by one day for positive-UTC-offset locales like IST.)
export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function dateForDay(dayId: number): string {
  return addDays(COURSE_START_DATE, dayId - 1);
}

export function todayLocalISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Format an ISO YYYY-MM-DD string for human display.
// Default style: "Sun, 25 May 2026" (browser locale, abbreviated weekday/month).
export function formatDateDisplay(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function todayDisplay(): string {
  return formatDateDisplay(todayLocalISO());
}
