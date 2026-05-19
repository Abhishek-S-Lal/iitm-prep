const COURSE_START = "2026-05-19";
const EXAM_DATE = "2026-07-19";

function todayDayId(now: Date): number {
  const start = new Date(COURSE_START + "T00:00:00").getTime();
  const today = new Date(now.toISOString().slice(0, 10) + "T00:00:00").getTime();
  const diff = Math.floor((today - start) / 86400000) + 1;
  return Math.max(1, Math.min(60, diff));
}

function daysToExam(now: Date): number {
  const exam = new Date(EXAM_DATE + "T09:00:00").getTime();
  return Math.max(0, Math.ceil((exam - now.getTime()) / 86400000));
}

const MORNING: ((d: number, left: number) => { title: string; body: string })[] = [
  (d, left) => ({
    title: `Day ${d} of 60 · let's go`,
    body: `${left} days to July 19. Today's lesson is waiting.`,
  }),
  (d, left) => ({
    title: `${left} days to IITM`,
    body: `Two hours a day, sixty days. Cheapest trade you'll make for a seat.`,
  }),
  (d) => ({
    title: `Habit > motivation`,
    body: `Open Day ${d} now — before the inbox. Future-you will thank you.`,
  }),
  () => ({
    title: `Math doesn't get easier`,
    body: `You get better. Today is one more rep. Show up.`,
  }),
  (d) => ({
    title: `Day ${d} won't open itself`,
    body: `It's the first hour of study time. Make this hour count.`,
  }),
  (d, left) => ({
    title: `Future-you at IITM is rooting for you`,
    body: `Day ${d}. ${left} to go. Spend the hour.`,
  }),
  () => ({
    title: `Wake-up call`,
    body: `The exam doesn't care about excuses. Show up anyway.`,
  }),
];

const EVENING: ((d: number, left: number) => { title: string; body: string })[] = [
  (d) => ({
    title: `Day ${d} isn't done`,
    body: `30 minutes saves the streak. 1 video + 5 questions.`,
  }),
  (_d, left) => ({
    title: `${left} days. Each one is a vote.`,
    body: `Tomorrow's-you will resent today's-you if you skip. Mini-mock takes 10 min.`,
  }),
  () => ({
    title: `Don't end below your standard`,
    body: `Read the notes. Watch one video at 1.5x. Sleep proud.`,
  }),
  () => ({
    title: `Tired ≠ excuse`,
    body: `10-minute mini-mock. Better than zero. Tap to start.`,
  }),
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function morningPayload(now: Date): { title: string; body: string; url: string } {
  const d = todayDayId(now);
  const left = daysToExam(now);
  const msg = rand(MORNING)(d, left);
  return { ...msg, url: `/day/${d}` };
}

export function eveningPayload(now: Date): { title: string; body: string; url: string } {
  const d = todayDayId(now);
  const left = daysToExam(now);
  const msg = rand(EVENING)(d, left);
  return { ...msg, url: `/day/${d}` };
}
