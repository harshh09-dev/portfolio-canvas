// Data layer for the guestbook. UI/hooks never talk to storage directly, so a
// hosted backend can replace the body of these two functions with no UI change.

import { guestbookSeed, type GuestbookEntry } from "@/data/guestbook";

const STORAGE_KEY = "guestbook:entries";

function readLocal(): GuestbookEntry[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GuestbookEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(entries: GuestbookEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* storage unavailable — entry stays in memory for this session */
  }
}

function byNewest(a: GuestbookEntry, b: GuestbookEntry) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export async function listEntries(): Promise<GuestbookEntry[]> {
  return [...readLocal(), ...guestbookSeed].sort(byNewest);
}

export async function createEntry(input: {
  name: string;
  message: string;
}): Promise<GuestbookEntry> {
  const entry: GuestbookEntry = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `local-${Date.now()}`,
    name: input.name.trim(),
    message: input.message.trim(),
    avatar: null,
    created_at: new Date().toISOString(),
  };
  writeLocal([entry, ...readLocal()]);
  return entry;
}
