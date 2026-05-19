# IITM MTech AI — 60-Day Entrance Prep

A self-contained, offline-capable React app that walks through a 60-day study plan for the IIT Madras CODE Web-Enabled MTech in AI entrance / qualifier exam (target date: July 19, 2026). All progress is stored in `localStorage` — no backend.

## Features

- 60 daily lessons spanning Probability & Statistics, Linear Algebra, Optimization, and Basic ML
- Primary videos from the official IITM NPTEL "Data Science for Engineers" course (Prof. Raghunathan Rengaswamy), with StatQuest / 3Blue1Brown supplements
- 300 practice questions tagged by subject
- Three mock-test variants (mini, 50-mark, 100-mark) drawn weighted by the actual exam topic proportions
- Exam-day countdown, study streak heatmap, per-phase progress bars
- Light (warm cream) and dark (Vercel-style) themes; mobile responsive

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Netlify

The repo includes [`netlify.toml`](./netlify.toml) with the build command, publish directory, and SPA-fallback redirect (so deep links like `/day/5` and `/mock` resolve correctly).

**One-time setup:**

1. Push this folder to a GitHub repo.
2. On [app.netlify.com](https://app.netlify.com), click **Add new site → Import an existing project → GitHub** and pick the repo.
3. Netlify will auto-detect `netlify.toml`; no manual build settings needed. Confirm:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**. First build takes ~60 seconds.
5. (Optional) **Site settings → Domain management → Options → Change site name** to claim a friendlier subdomain like `iitm-prep.netlify.app`.

**After setup:** every `git push` to the default branch redeploys automatically. Pull-request previews are enabled by default.

## Tech stack

- React 18 + TypeScript + Vite 5
- React Router v6 (BrowserRouter)
- Tailwind CSS v3 (custom palette: `iitm`, `paper`, `ink`)
- Zustand for state + `localStorage` persistence
- Zero backend, zero auth, zero analytics

## Folder structure

```
src/
  data/
    types.ts         types, subject metadata, exam-date helpers
    curriculum.ts    all 60 days (objectives, videos, notes, formulas, summary)
    questions.ts     300 questions (5 per day), tagged by subject
  store/
    progressStore.ts Zustand store with localStorage persistence
  components/
    Layout.tsx       header, sidebar, mobile drawer, theme toggle
    Sidebar.tsx      phase-grouped day navigation
    VideoPlayer.tsx  lazy-mounted YouTube embed
    QuizCard.tsx     MCQ / MSQ / numerical question
    Heatmap.tsx      GitHub-style 60-day study heatmap
    FormulaCard.tsx, FlashCard.tsx, ProgressBar.tsx, LessonContent.tsx
  pages/
    Dashboard.tsx    countdown, today's lesson, phase progress
    DayLesson.tsx    full lesson page: video → notes → formulas → quiz
    SubjectView.tsx  list view for a single subject
    MockTest.tsx     timed mock with weighted draw and result review
    Progress.tsx     streak, heatmap, per-phase, mock history
```

## Acknowledgements

- IIT Madras NPTEL — *Data Science for Engineers*, Prof. Raghunathan Rengaswamy
- 3Blue1Brown — *Essence of Linear Algebra* / *Bayes theorem*
- StatQuest with Josh Starmer — statistics & ML series
- CODE IIT Madras — Web-Enabled MTech in AI brochure ([source](https://code.iitm.ac.in/webmtech))
- IITM Zanzibar 2023 sample paper — same four-topic AI syllabus, used for exam-style question patterns
