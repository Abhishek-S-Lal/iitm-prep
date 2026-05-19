import { useEffect, useRef } from "react";
import { useProgress } from "../store/progressStore";
import { useSyncStore } from "../store/syncStore";

interface ProgressPayload {
  completedDays: number[];
  quizScores: Record<number, number>;
  studyLog: Record<string, boolean>;
  streak: number;
  lastStudiedDate: string | null;
  mockScores: ReturnType<typeof getProgressPayload>["mockScores"];
}

function getProgressPayload() {
  const s = useProgress.getState();
  return {
    completedDays: s.completedDays,
    quizScores: s.quizScores,
    studyLog: s.studyLog,
    streak: s.streak,
    lastStudiedDate: s.lastStudiedDate,
    mockScores: s.mockScores,
  };
}

function applyProgressPayload(data: ProgressPayload) {
  useProgress.setState({
    completedDays: data.completedDays ?? [],
    quizScores: data.quizScores ?? {},
    studyLog: data.studyLog ?? {},
    streak: data.streak ?? 0,
    lastStudiedDate: data.lastStudiedDate ?? null,
    mockScores: data.mockScores ?? [],
  });
}

export async function pullFromCloud(email: string): Promise<
  { ok: true; replaced: boolean; updatedAt?: string }
  | { ok: false; error: string }
> {
  const sync = useSyncStore.getState();
  sync.setStatus("syncing");
  try {
    const res = await fetch(`/api/sync?email=${encodeURIComponent(email)}`);
    if (res.status === 404) {
      sync.setStatus("synced");
      return { ok: true, replaced: false };
    }
    if (!res.ok) {
      const msg = `Server returned ${res.status}`;
      sync.setStatus("error", msg);
      return { ok: false, error: msg };
    }
    const body = (await res.json()) as { data: ProgressPayload; updatedAt: string };
    applyProgressPayload(body.data);
    sync.setLastSyncedAt(body.updatedAt);
    sync.setStatus("synced");
    return { ok: true, replaced: true, updatedAt: body.updatedAt };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    sync.setStatus("error", msg);
    return { ok: false, error: msg };
  }
}

export async function pushToCloud(email: string): Promise<
  { ok: true; updatedAt: string } | { ok: false; error: string }
> {
  const sync = useSyncStore.getState();
  sync.setStatus("syncing");
  try {
    const payload = getProgressPayload();
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, data: payload }),
    });
    if (!res.ok) {
      const msg = `Server returned ${res.status}`;
      sync.setStatus("error", msg);
      return { ok: false, error: msg };
    }
    const body = (await res.json()) as { updatedAt: string };
    sync.setLastSyncedAt(body.updatedAt);
    sync.setStatus("synced");
    return { ok: true, updatedAt: body.updatedAt };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    sync.setStatus("error", msg);
    return { ok: false, error: msg };
  }
}

export async function disconnectCloud(email: string | null) {
  if (email) {
    await fetch(`/api/sync?email=${encodeURIComponent(email)}`, {
      method: "DELETE",
    }).catch(() => {});
  }
  useSyncStore.getState().setEmail(null);
  useSyncStore.getState().setLastSyncedAt("");
}

export async function connect(email: string): Promise<
  { ok: true; pulled: boolean } | { ok: false; error: string }
> {
  useSyncStore.getState().setEmail(email);
  const pullRes = await pullFromCloud(email);
  if (!pullRes.ok) return { ok: false, error: pullRes.error };
  if (!pullRes.replaced) {
    const pushRes = await pushToCloud(email);
    if (!pushRes.ok) return { ok: false, error: pushRes.error };
    return { ok: true, pulled: false };
  }
  return { ok: true, pulled: true };
}

export function useCloudSync() {
  const email = useSyncStore((s) => s.email);
  const completedDays = useProgress((s) => s.completedDays);
  const quizScores = useProgress((s) => s.quizScores);
  const studyLog = useProgress((s) => s.studyLog);
  const mockScores = useProgress((s) => s.mockScores);

  const initialPullDone = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextPush = useRef(false);

  useEffect(() => {
    if (!email) {
      initialPullDone.current = false;
      return;
    }
    if (initialPullDone.current) return;
    initialPullDone.current = true;
    skipNextPush.current = true;
    pullFromCloud(email).then((res) => {
      if (res.ok && !("replaced" in res ? res.replaced : false)) {
        skipNextPush.current = false;
      }
    });
  }, [email]);

  useEffect(() => {
    if (!email) return;
    if (skipNextPush.current) {
      skipNextPush.current = false;
      return;
    }
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      pushToCloud(email);
    }, 1500);
    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [email, completedDays, quizScores, studyLog, mockScores]);
}
