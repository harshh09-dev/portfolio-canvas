import Reveal from "@/components/motion/Reveal";
import type { GuestbookEntry } from "@/data/guestbook";

export default function GuestbookGrid({ entries }: { entries: GuestbookEntry[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry, i) => (
        <Reveal key={entry.id} delay={Math.min(i, 6) * 0.04}>
          <article className="group h-full rounded-2xl border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-foreground/40">
            <div className="flex items-center gap-3">
              {entry.avatar ? (
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="h-10 w-10 rounded-full border border-border"
                />
              ) : (
                <div className="grid h-10 w-10 place-items-center rounded-full border border-border text-sm text-fg">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-fg">{entry.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(entry.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p
              className="mt-4 text-fg"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              &ldquo;{entry.message}&rdquo;
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
