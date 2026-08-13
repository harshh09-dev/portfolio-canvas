import { useState } from "react";
import { motion } from "framer-motion";
import { guestbookCopy, guestbookLimits } from "@/data/guestbook";
import { useGuestbook, validateEntry } from "../hooks/useGuestbook";

export default function GuestbookForm({
  onSign,
  isSubmitting,
}: {
  onSign: ReturnType<typeof useGuestbook>["sign"];
  isSubmitting: boolean;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [signed, setSigned] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validateEntry(name, message);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    await onSign(name, message);
    setName("");
    setMessage("");
    setSigned(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-xl rounded-2xl border border-border bg-card/40 p-8"
    >
      <p className="text-eyebrow">{guestbookCopy.formTitle}</p>
      <p className="mt-2 text-sm text-muted-foreground">{guestbookCopy.formHint}</p>

      <div className="mt-6">
        <label htmlFor="gb-name" className="block text-sm text-fg">
          Name
        </label>
        <input
          id="gb-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={guestbookLimits.nameMax}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "gb-name-error" : undefined}
          className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-fg outline-none transition-colors focus-visible:border-foreground"
        />
        {errors.name && (
          <p id="gb-name-error" role="alert" className="mt-2 text-xs text-muted-foreground">
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="gb-message" className="block text-sm text-fg">
            Note
          </label>
          <span className="text-xs tabular-nums text-muted-foreground">
            {message.length}/{guestbookLimits.messageMax}
          </span>
        </div>
        <textarea
          id="gb-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={guestbookLimits.messageMax}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "gb-message-error" : undefined}
          className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-fg outline-none transition-colors focus-visible:border-foreground"
        />
        {errors.message && (
          <p id="gb-message-error" role="alert" className="mt-2 text-xs text-muted-foreground">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? "Signing…" : guestbookCopy.submitLabel}
      </button>

      {signed && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="mt-4 text-center text-xs text-muted-foreground"
        >
          Signed. Thanks for stopping by.
        </motion.p>
      )}
    </form>
  );
}
