import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SyncStatus = "idle" | "syncing" | "synced" | "error";

interface SyncState {
  email: string | null;
  lastSyncedAt: string | null;
  status: SyncStatus;
  errorMessage: string | null;
  setEmail: (email: string | null) => void;
  setStatus: (status: SyncStatus, errorMessage?: string | null) => void;
  setLastSyncedAt: (t: string) => void;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      email: null,
      lastSyncedAt: null,
      status: "idle",
      errorMessage: null,
      setEmail: (email) => set({ email, status: "idle", errorMessage: null }),
      setStatus: (status, errorMessage = null) => set({ status, errorMessage }),
      setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),
    }),
    {
      name: "iitm-prep-sync",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ email: state.email, lastSyncedAt: state.lastSyncedAt }),
    },
  ),
);
