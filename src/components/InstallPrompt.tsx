import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "iitm-install-dismissed";

export default function InstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || !event) return null;

  const handleInstall = async () => {
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === "accepted" || outcome === "dismissed") {
      setVisible(false);
      setEvent(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-iitm-500 font-bold text-white">
          M
        </div>
        <div className="flex-1 text-sm">
          <div className="font-semibold">Install IITM AI Prep</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Add to your home screen for offline study.
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <button onClick={handleInstall} className="btn-primary text-xs">
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
