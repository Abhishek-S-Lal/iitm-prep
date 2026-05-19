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

export const SUBJECT_WEIGHTS: Record<Subject, number> = {
  probability: 0.38,
  "linear-algebra": 0.27,
  optimization: 0.15,
  ml: 0.2,
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

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function dateForDay(dayId: number): string {
  return addDays(COURSE_START_DATE, dayId - 1);
}
