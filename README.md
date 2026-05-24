# IITM MTech AI — 60-Day Entrance Prep

A self-paced React PWA for the IIT Madras CODE Web-Enabled MTech in AI entrance exam (target date: July 19, 2026). Daily NPTEL-aligned lessons, 380+ practice questions (incl. the official IITM 2026 sample paper), four mock-test variants, daily push reminders, and cross-device sync — all on Netlify's free tier.

🔗 **Live**: https://iitm-code-ai.netlify.app/

## Features

### Study content
- **60 daily lessons** spanning Probability & Statistics, Linear Algebra, Optimization, and Basic ML
- Primary videos from the official IITM NPTEL *Data Science for Engineers* course (Prof. Raghunathan Rengaswamy), with StatQuest / 3Blue1Brown supplements
- **380+ practice questions** tagged by subject (5+ per day; content-heavy days reach 11–13 after official-paper injections), including all 32 syllabus-relevant questions from the 2023 and 2025 IITM Zanzibar sample papers AND all 40 questions from the **official IITM CODE AI 2026 sample paper** shared with admitted candidates (every official question is also injected into the topically-aligned day so it shows up in the daily quiz pool)
- **Four mock-test variants** — *Official 2026 paper* (all 40 questions in original order), 100-mark, 50-mark, and mini — the random-draw variants are weighted by the actual exam topic mix calibrated from the official sample (Stats 40%, LA 35%, ML 22.5%, Optimization 2.5%)
- Exam-day countdown, study-streak heatmap, per-phase progress bars
- Light (warm cream) and dark (Vercel-style) themes; mobile responsive

### Installable PWA
- Add to home screen on Android, iOS, and desktop
- Branded "M" icon on iitm-blue rounded square (matches the in-app brand mark)
- Custom service worker with Workbox precache → **works offline** after first load
- Auto-updating: new deploys roll out without prompting
- Manifest locks orientation to **portrait-primary**, but unlocks landscape automatically when a video enters fullscreen (Screen Orientation API)
- Custom install prompt (`InstallPrompt.tsx`) surfaces the `beforeinstallprompt` event with a dismissable banner

### Notifications
Two layers, both motivational and psychology-backed (identity, loss aversion, implementation intentions, future-self framing, days-left anchoring):

1. **Local reminders** (`useNotifications` hook) — fire when you open the app within your study window. Morning notification at your set start time (default 06:00, 4-hour window); evening fallback at your set time (default 21:00) **only** if you haven't checked in that day. Each bucket fires at most once per day.
2. **Background push** (Netlify Function on `@hourly` schedule) — sends real Web Push notifications **even when the app is closed**. Requires VAPID keys (see *Configuration* below). Server fans out morning + evening pushes based on each subscription's stored timezone and chosen hours. iOS only delivers push to installed home-screen apps (iOS 16.4+).

Subscribers manage everything in-app at **⚙️ Settings**.

### Cross-device sync
- Email-only sync of progress (completed days, quiz scores, mock history, streak, study log) to **Netlify Blobs**
- Auto-pushes on any progress change with a 1.5s debounce; pulls on first connect
- Manual **Push now / Pull from cloud / Delete cloud copy** controls in Settings
- Unauthenticated by design (the UI warns users that anyone with their email can read/overwrite). Upgrade path: magic-link auth via Resend — sketched in the [follow-ups](#follow-ups) section.

### SEO
Standard PWA SEO — full meta tags, OG / Twitter Card, JSON-LD (`WebSite` + `Course`), per-page title/canonical via `useDocumentMeta`, `robots.txt`, `sitemap.xml`, and `<noscript>` fallback content.

### Security
- API endpoints reject cross-origin browser requests (same-origin Origin check + 403 on mismatch)
- Body size limits: 200 KB on `/api/sync`, 8 KB on `/api/subscribe` and `/api/unsubscribe` (`413` above limit)
- Strict input validation on email, timezone, endpoint length
- Security response headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/payment denied), `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Cache-Control: immutable` for hashed assets; `no-cache` for `/sw.js` so service-worker updates roll out instantly
- `.gitignore` covers `.env*` (allowlists `.env.example`); no secrets ever committed to git history

## Tech stack

- **Frontend** — React 18, TypeScript, Vite 5, React Router v6, Tailwind CSS v3 (custom `iitm` / `paper` / `ink` palette)
- **State** — Zustand with `localStorage` persistence (`progressStore`, `notificationStore`, `syncStore`)
- **PWA** — `vite-plugin-pwa` (injectManifest strategy) + Workbox + a hand-written service worker in `src/sw.ts` for push and notification-click handling
- **Backend** — Netlify Functions (TypeScript, ESM) + Netlify Blobs for storage + `web-push` for VAPID-signed pushes
- **Scheduled work** — Netlify Scheduled Functions (`@hourly`)

Everything stays inside the Netlify free tier at this app's scale; see `Free-tier audit` further down.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> **Note**: Push notifications and cloud sync need the Netlify Functions to be running. For local dev with functions, use `netlify dev` (install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) first). Without it, the UI works but cloud features won't.

## Build

```bash
npm run build
```

Output goes to `dist/` (Vite build) plus the service worker `dist/sw.js`.

## Configuration

The app builds and runs with zero config — but push notifications need a few env vars set in Netlify.

Copy `.env.example` to see the full list. Set these in **Site settings → Build & deploy → Environment → Environment variables**:

| Variable | Purpose | How to get |
|---|---|---|
| `VAPID_PUBLIC_KEY` | Web Push VAPID public key (server) | `npx web-push generate-vapid-keys --json` |
| `VAPID_PRIVATE_KEY` | Web Push VAPID private key (**server-only**, never exposed to client) | Same command as above |
| `VAPID_SUBJECT` | Contact mailto: for push provider (FCM/Mozilla) reports abuse to you | `mailto:you@example.com` |
| `VITE_VAPID_PUBLIC_KEY` | Same value as `VAPID_PUBLIC_KEY`, exposed to the client build (Vite only inlines `VITE_*` vars) | Copy of public key |
| `ALLOWED_ORIGIN` *(optional)* | Override the auto-allowed origin for the CORS check on API endpoints | e.g. `https://your-custom-domain.com` |

After changing env vars, **Trigger deploy → Deploy site** — env-var changes don't auto-rebuild.

## Deploy to Netlify

The repo includes [`netlify.toml`](./netlify.toml) with build settings, function directory, `/api/*` redirects, scheduled functions, and security headers.

**One-time setup:**

1. Push to a GitHub repo.
2. At [app.netlify.com](https://app.netlify.com), **Add new site → Import from GitHub** → pick the repo.
3. Netlify auto-detects `netlify.toml`. Confirm:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions` (already set in toml)
4. Add the env vars from the [Configuration](#configuration) section above.
5. Deploy.
6. *(Optional)* **Site settings → Domain management** to claim a friendlier subdomain or attach a custom domain.

After setup, every `git push` to `main` redeploys automatically.

## Folder structure

```
INDEX.md              concept-to-day reverse lookup; phase tables; official-sample Q→day map (use this to navigate without opening curriculum.ts/questions.ts)

src/
  data/
    types.ts            types, subject metadata, exam-date helpers
    curriculum.ts       all 60 days (objectives, videos, notes, formulas, summary)
    questions.ts        ~380 questions tagged by subject (inline per-day pool + officialSample2026 array)
    motivations.ts      psychology-backed message pool for daily reminders
  store/
    progressStore.ts    Zustand: completed days, quiz scores, streak, mocks, theme
    notificationStore.ts Zustand: reminder times, last-fired tracking
    syncStore.ts        Zustand: email + last-synced timestamp
  hooks/
    useDocumentMeta.ts  per-page title / description / canonical
    useNotifications.ts local notification firing logic + decision testable as pure fn
    useWebPush.ts       Push API subscribe / unsubscribe / status state machine
    useCloudSync.ts     initial pull + debounced push to /api/sync
    useVideoOrientation.ts unlocks portrait lock when video enters fullscreen
  components/
    Layout.tsx          sidebar, mobile drawer + floating hamburger, scroll-position restore, theme toggle + GitHub link, install prompt, footer
    Sidebar.tsx         phase-grouped day navigation
    VideoPlayer.tsx     lazy-mounted YouTube embed
    QuizCard.tsx        MCQ / MSQ / numerical question
    Heatmap.tsx         GitHub-style 60-day study heatmap
    InstallPrompt.tsx   beforeinstallprompt-driven banner
    ReminderBanner.tsx  in-app fallback when push permissions are blocked
    Footer.tsx          author attribution + social links
    FormulaCard.tsx, FlashCard.tsx, ProgressBar.tsx, LessonContent.tsx
  pages/
    Dashboard.tsx       countdown, today's lesson, phase progress, reminder banner
    DayLesson.tsx       video → notes → formulas → quiz
    SubjectView.tsx     all days for one subject
    MockTest.tsx        timed mock with weighted draw and result review
    Progress.tsx        streak, heatmap, per-phase, mock history
    Settings.tsx        reminders, push subscription, cross-device sync, study window
  sw.ts                 custom service worker (Workbox precache + push + notificationclick)

netlify/
  functions/
    subscribe.ts        POST /api/subscribe — stores push subscription in Blobs
    unsubscribe.ts      POST /api/unsubscribe — removes by endpoint
    send-reminders.ts   scheduled @hourly — fans out morning + evening pushes
    sync.ts             GET/POST/DELETE /api/sync — cross-device progress sync
    _lib/
      store.ts          Netlify Blobs CRUD for subscriptions
      messages.ts       server-side motivational message pool
      security.ts       origin allowlist, CORS helpers, size limits
```

## Free-tier audit

Mapped against Netlify's free-tier limits:

| Resource | Limit | Realistic use | Headroom |
|---|---|---|---|
| Static bandwidth | 100 GB/mo | 1.4 GB for 10k page views | 70× under |
| Build minutes | 300 min/mo | ~30 min for 60 commits | 10× under |
| Function invocations | 125,000/mo | 720 cron + sync activity | See note |
| Function runtime | 100 hrs/mo | <4 hrs at 50k calls | 25× under |
| Netlify Blobs | Included | ~6 KB per user | Negligible |

**Function invocations note**: comfortably free for <50 daily active users. Around ~100 DAU you'd approach the 125k limit (mostly from auto-push sync calls). Levers if it ever grows: raise the sync debounce from 1.5s to 10s+, or upgrade to Netlify Pro ($19/mo includes 2M invocations). No surprise bills — Netlify pauses on free-tier exhaustion rather than auto-charging.

## Follow-ups

Things deliberately left out, in case the app grows:

- **Magic-link auth** for `/api/sync` (Resend has a free 3k/mo tier; ~2 hrs to wire up) — would replace the email-only model and eliminate the "anyone with your email can overwrite your progress" caveat
- **Rate limiting** on API endpoints (per-IP token bucket via Blobs)
- **Pre-rendering** the static lesson pages so non-JS crawlers index full curriculum content (currently only `<noscript>` fallback is indexed)
- **Resend or Plunk** for non-push email reminders as an alternative channel for users on browsers without web push

## Acknowledgements

- IIT Madras NPTEL — *Data Science for Engineers*, Prof. Raghunathan Rengaswamy
- 3Blue1Brown — *Essence of Linear Algebra* / *Bayes theorem*
- StatQuest with Josh Starmer — statistics & ML series
- CODE IIT Madras — Web-Enabled MTech in AI brochure ([source](https://code.iitm.ac.in/webmtech))
- IITM CODE AI 2026 official sample paper — the actual reference paper shared by IIT Madras with admitted candidates. All 40 questions integrated into the daily quiz pool AND surfaced as a standalone *Official 2026 paper* mock variant
- IITM Zanzibar 2023 and 2025 sample papers — same four-topic AI syllabus, integrated into the daily quiz pool (questions tagged with their paper of origin in the explanation)

## Author

Built by **Abhishek S Lal** — [website](https://abhishekslal.dev/) · [LinkedIn](https://www.linkedin.com/in/abhishekslal/) · [X](https://x.com/abhishek_s_lal) · [Instagram](https://www.instagram.com/abhishekslal/)
