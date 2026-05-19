import { useEffect } from "react";

interface LockableOrientation extends ScreenOrientation {
  lock?: (orientation: OrientationLockType) => Promise<void>;
}

type OrientationLockType =
  | "any"
  | "natural"
  | "landscape"
  | "portrait"
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

export function useVideoOrientation() {
  useEffect(() => {
    const orientation = window.screen?.orientation as LockableOrientation | undefined;
    if (!orientation) return;

    const onFullscreenChange = () => {
      const inFullscreen = !!document.fullscreenElement;
      try {
        if (inFullscreen) {
          orientation.unlock?.();
        } else {
          orientation.lock?.("portrait-primary").catch(() => {});
        }
      } catch {
        // older browsers without lock/unlock — fall back to manifest default
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
}
