const LINKS = [
  {
    href: "https://abhishekslal.dev/",
    label: "Website",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/abhishekslal/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 7v7.44h-4.56v-6.6c0-1.58-.03-3.61-2.2-3.61-2.21 0-2.55 1.72-2.55 3.5V22H7.72V8z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/abhishek_s_lal",
    label: "X (Twitter)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/abhishekslal/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <div className="text-center sm:text-left">
          Built by{" "}
          <a
            href="https://abhishekslal.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-iitm-600 hover:underline dark:text-iitm-300"
          >
            Abhishek S Lal
          </a>{" "}
          · Free for everyone preparing for the IITM CODE MTech AI exam
        </div>
        <nav className="flex items-center gap-1" aria-label="Social links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              title={l.label}
              className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-iitm-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-iitm-300"
            >
              {l.icon}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
