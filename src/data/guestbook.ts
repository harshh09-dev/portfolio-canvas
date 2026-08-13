// Guestbook content + types. UI never hardcodes entries.

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  avatar: string | null;
  created_at: string;
}

export const guestbookCopy = {
  eyebrow: "Guestbook",
  heading: "Leave your signature.",
  intro:
    "A shared wall. Drop a note, a hello, or a line of advice — it stays here for everyone who scrolls by.",
  formTitle: "Sign the wall",
  formHint: "Two fields, no account. Be kind, be brief.",
  submitLabel: "Sign the wall",
  emptyTitle: "The wall is empty.",
  emptyBody: "Yours could be the first signature.",
  loading: "Loading signatures…",
};

export const guestbookLimits = {
  nameMax: 40,
  messageMax: 180,
} as const;

/** Seed signatures shown before anyone signs locally. */
export const guestbookSeed: GuestbookEntry[] = [
  {
    id: "seed-1",
    name: "Riya Sharma",
    message: "Found this at 2am and stayed way longer than planned. Beautiful work.",
    avatar: null,
    created_at: "2026-05-12T18:20:00.000Z",
  },
  {
    id: "seed-2",
    name: "Dev Mehta",
    message: "The hero typography alone deserves a standing ovation.",
    avatar: null,
    created_at: "2026-05-28T09:05:00.000Z",
  },
  {
    id: "seed-3",
    name: "Aarav K.",
    message: "Clean code, solid architecture — you actually live the tagline.",
    avatar: null,
    created_at: "2026-06-14T14:45:00.000Z",
  },
];
