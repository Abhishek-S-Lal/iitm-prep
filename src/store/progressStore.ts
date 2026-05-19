import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MockScore {
  date: string;
  score: number;
  total: number;
  variant: "50" | "100";
}

interface ProgressState {
  completedDays: number[];
  quizScores: Record<number, number>;
  studyLog: Record<string, boolean>;
  streak: number;
  lastStudiedDate: string | null;
  mockScores: MockScore[];
  theme: "light" | "dark";
  markDayComplete: (dayId: number) => void;
  markDayIncomplete: (dayId: number) => void;
  saveQuizScore: (dayId: number, score: number) => void;
  logStudySession: (date: string) => void;
  saveMockScore: (m: MockScore) => void;
  toggleTheme: () => void;
  resetAll: () => void;
}

function computeStreak(log: Record<string, boolean>): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (log[key]) {
      streak++;
    } else if (i === 0) {
      continue;
    } else {
      break;
    }
  }
  return streak;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedDays: [],
      quizScores: {},
      studyLog: {},
      streak: 0,
      lastStudiedDate: null,
      mockScores: [],
      theme: "dark",

      markDayComplete: (dayId) => {
        const completedDays = Array.from(new Set([...get().completedDays, dayId]));
        const today = new Date().toISOString().slice(0, 10);
        const log = { ...get().studyLog, [today]: true };
        set({
          completedDays,
          studyLog: log,
          lastStudiedDate: today,
          streak: computeStreak(log),
        });
      },

      markDayIncomplete: (dayId) =>
        set({ completedDays: get().completedDays.filter((d) => d !== dayId) }),

      saveQuizScore: (dayId, score) => {
        const today = new Date().toISOString().slice(0, 10);
        const log = { ...get().studyLog, [today]: true };
        set({
          quizScores: { ...get().quizScores, [dayId]: score },
          studyLog: log,
          lastStudiedDate: today,
          streak: computeStreak(log),
        });
      },

      logStudySession: (date) => {
        const log = { ...get().studyLog, [date]: true };
        set({ studyLog: log, lastStudiedDate: date, streak: computeStreak(log) });
      },

      saveMockScore: (m) => {
        set({ mockScores: [...get().mockScores, m] });
      },

      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),

      resetAll: () =>
        set({
          completedDays: [],
          quizScores: {},
          studyLog: {},
          streak: 0,
          lastStudiedDate: null,
          mockScores: [],
        }),
    }),
    {
      name: "iitm-prep-progress",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
