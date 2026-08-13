import { useCallback, useEffect, useState } from "react";
import type { GuestbookEntry } from "@/data/guestbook";
import { guestbookLimits } from "@/data/guestbook";
import { createEntry, listEntries } from "../services/guestbookService";

export function validateEntry(name: string, message: string) {
  const errors: { name?: string; message?: string } = {};
  if (!name.trim()) errors.name = "Please add a name.";
  else if (name.trim().length > guestbookLimits.nameMax)
    errors.name = `Keep it under ${guestbookLimits.nameMax} characters.`;
  if (!message.trim()) errors.message = "A note can't be empty.";
  else if (message.trim().length > guestbookLimits.messageMax)
    errors.message = `Keep it under ${guestbookLimits.messageMax} characters.`;
  return errors;
}

export function useGuestbook() {
  const [data, setData] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    listEntries()
      .then((entries) => alive && setData(entries))
      .finally(() => alive && setIsLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const sign = useCallback(async (name: string, message: string) => {
    setIsSubmitting(true);
    try {
      const entry = await createEntry({ name, message });
      setData((prev) => [entry, ...prev]);
      return entry;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { data, isLoading, isSubmitting, sign };
}
