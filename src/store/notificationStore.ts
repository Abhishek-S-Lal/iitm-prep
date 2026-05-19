import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotificationState {
  enabled: boolean;
  morningTime: string;
  morningWindowMinutes: number;
  eveningTime: string;
  lastMorningDate: string | null;
  lastEveningDate: string | null;
  bannerDismissedDate: string | null;
  setEnabled: (v: boolean) => void;
  setMorningTime: (t: string) => void;
  setMorningWindow: (m: number) => void;
  setEveningTime: (t: string) => void;
  markFired: (kind: "morning" | "evening", date: string) => void;
  dismissBanner: (date: string) => void;
  reset: () => void;
}

const DEFAULTS = {
  enabled: false,
  morningTime: "06:00",
  morningWindowMinutes: 240,
  eveningTime: "21:00",
  lastMorningDate: null,
  lastEveningDate: null,
  bannerDismissedDate: null,
};

export const useNotificationSettings = create<NotificationState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setEnabled: (enabled) => set({ enabled }),
      setMorningTime: (morningTime) => set({ morningTime }),
      setMorningWindow: (morningWindowMinutes) => set({ morningWindowMinutes }),
      setEveningTime: (eveningTime) => set({ eveningTime }),
      markFired: (kind, date) =>
        set(
          kind === "morning" ? { lastMorningDate: date } : { lastEveningDate: date },
        ),
      dismissBanner: (date) => set({ bannerDismissedDate: date }),
      reset: () => set(DEFAULTS),
    }),
    {
      name: "iitm-prep-notifications",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
