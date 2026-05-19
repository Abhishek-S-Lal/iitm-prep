import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar, { todayDayId } from "./Sidebar";
import { useProgress } from "../store/progressStore";
import InstallPrompt from "./InstallPrompt";
import Footer from "./Footer";
import { useVideoOrientation } from "../hooks/useVideoOrientation";

export default function Layout() {
  useVideoOrientation();
  const { theme, toggleTheme } = useProgress();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "m" || e.key === "M") {
        navigate("/mock?mini=1");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-iitm-500 font-bold text-white">
              M
            </div>
            <div>
              <div className="text-sm font-bold">IITM MTech AI</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">
                60-Day Prep · Day {todayDayId()}/60
              </div>
            </div>
          </Link>
        </div>
        <div className="h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
              <div className="text-sm font-bold">IITM MTech AI</div>
              <button onClick={() => setMobileOpen(false)} className="text-2xl">×</button>
            </div>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden text-xs text-slate-500 sm:block">
            Press <kbd className="rounded border border-slate-300 px-1 font-mono text-[10px] dark:border-slate-700">M</kbd> for a mini-mock
          </div>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-200 sm:hidden">
            IITM MTech AI
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
          <Footer />
        </div>
      </main>
      <InstallPrompt />
    </div>
  );
}
