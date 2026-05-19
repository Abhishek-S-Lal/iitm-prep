import { EXAM_DATE } from "./types";

export interface ReminderContext {
  dayId: number;
  daysLeft: number;
  completedCount: number;
  streak: number;
  todayTitle: string | null;
  todayDone: boolean;
  kind: "morning" | "evening";
}

export function getReminderContext(opts: {
  dayId: number;
  completedCount: number;
  streak: number;
  todayTitle: string | null;
  todayDone: boolean;
  kind: "morning" | "evening";
}): ReminderContext {
  const now = new Date();
  const exam = new Date(EXAM_DATE + "T09:00:00").getTime();
  const daysLeft = Math.max(0, Math.ceil((exam - now.getTime()) / 86400000));
  return { ...opts, daysLeft };
}

interface Message {
  title: string;
  body: string;
}

type MessageFn = (c: ReminderContext) => Message;

const morningMessages: MessageFn[] = [
  (c) => ({
    title: `Day ${c.dayId} of 60 · let's go`,
    body: `${c.daysLeft} days to July 19. "${c.todayTitle ?? "Open today's lesson"}" is waiting.`,
  }),
  (c) => ({
    title: `Streak: ${c.streak} 🔥`,
    body: `Don't break it today. 25 minutes is all today asks of you.`,
  }),
  (c) => ({
    title: `Habit > motivation`,
    body: `Open Day ${c.dayId} now — before the inbox, before breakfast. Future-you will thank you.`,
  }),
  (c) => ({
    title: `${c.daysLeft} days to IITM`,
    body: `Two hours a day, sixty days. Cheapest trade you'll ever make for a seat at IITM AI.`,
  }),
  () => ({
    title: `Math doesn't get easier`,
    body: `You get better. Today is one more rep. Show up.`,
  }),
  (c) => ({
    title: `${c.completedCount}/60 done`,
    body: `You are someone who shows up daily. Keep being that person.`,
  }),
  (c) => ({
    title: `Future-you at IITM`,
    body: `…is rooting for current-you. Spend an hour. Day ${c.dayId}.`,
  }),
  (c) => ({
    title: `Day ${c.dayId}: ${c.todayTitle ?? "today's lesson"}`,
    body: `1 video · 5 questions · 25 minutes. Tap to start.`,
  }),
  () => ({
    title: `Wake-up call`,
    body: `The exam doesn't care about excuses. Show up anyway.`,
  }),
  (c) => ({
    title: `Day ${c.dayId} won't open itself`,
    body: `It's the first hour of study time. Make this hour count.`,
  }),
];

const eveningMessages: MessageFn[] = [
  (c) => ({
    title: `Day ${c.dayId} isn't done`,
    body: `30 minutes saves the streak (${c.streak} 🔥). 1 video + 5 questions. You've got this.`,
  }),
  (c) => ({
    title: `Don't end below your standard`,
    body: `${c.daysLeft} days left. Tomorrow's-you will resent today's-you if you skip.`,
  }),
  () => ({
    title: `Mini-mock takes 10 minutes`,
    body: `Tap M from any page. Beats ending the day at zero.`,
  }),
  (c) => ({
    title: `${c.daysLeft} days. Each one is a vote.`,
    body: `Cast yours. Open Day ${c.dayId} — even just the video counts.`,
  }),
  () => ({
    title: `Tired ≠ excuse`,
    body: `Read the notes. Watch one video at 1.5x. Sleep proud.`,
  }),
];

const streakBrokenMessages: MessageFn[] = [
  () => ({
    title: `Streak broken`,
    body: `Build a new one. Excellence is not a streak — it's the return. Start today.`,
  }),
  (c) => ({
    title: `Show up anyway`,
    body: `Day ${c.dayId}. The exam doesn't care that you missed yesterday. It cares about today.`,
  }),
];

const milestoneMessages: Record<number, MessageFn> = {
  7: (c) => ({
    title: `One week down 🎯`,
    body: `You've already done more than 80% of people who say they'll prep. ${60 - c.dayId} days to go.`,
  }),
  14: () => ({
    title: `Phase 1 complete — Probability fluent`,
    body: `Linear Algebra starts today. The math gets sharper. So do you.`,
  }),
  30: (c) => ({
    title: `Halfway there`,
    body: `${c.completedCount}/60 done. The next 30 are where rankers separate. Keep going.`,
  }),
  50: () => ({
    title: `Mocks begin`,
    body: `Last 10 days are about pace, not new material. Three full mocks this week.`,
  }),
};

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pickMessage(c: ReminderContext): Message {
  const milestone = milestoneMessages[c.dayId];
  if (milestone) return milestone(c);

  if (c.streak === 0 && c.completedCount > 0 && c.kind === "morning") {
    return rand(streakBrokenMessages)(c);
  }

  const pool = c.kind === "morning" ? morningMessages : eveningMessages;
  return rand(pool)(c);
}
