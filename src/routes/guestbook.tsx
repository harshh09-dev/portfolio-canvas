import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { useGuestbook } from "@/hooks/useGuestbook";
import { site } from "@/data/site";

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    meta: [
      { title: `Guestbook — ${site.name}` },
      {
        name: "description",
        content: "Leave your signature. A shared wall of visitors, notes, and small hellos.",
      },
      { property: "og:title", content: `Guestbook — ${site.name}` },
      {
        property: "og:description",
        content: "Sign the wall.",
      },
    ],
  }),
  component: GuestbookPage,
});

function GuestbookPage() {
  const { data, isLoading, error } = useGuestbook();

  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Guestbook</p></Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Leave your signature.
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 mx-auto max-w-2xl">
              A shared wall. Sign in, drop a note, and become part of the visitor archive.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider-hair container-editorial" />

      <section className="section pt-8">
        <div className="container-editorial">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card/40 p-8 mb-16 text-center">
            <p className="text-eyebrow">Sign the wall</p>
            <h2 className="text-h3 text-fg mt-2">Sign in to leave a note</h2>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Auth is coming — for now, entries are curated. Say hello over email:
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
            >
              {site.email}
            </a>
          </div>

          {isLoading && <p className="text-center text-muted-foreground">Loading signatures…</p>}
          {error && (
            <p className="text-center text-muted-foreground">
              The wall is quiet — be the first to sign it.
            </p>
          )}

          {!isLoading && !error && data.length === 0 && (
            <p className="text-center text-muted-foreground">
              The wall is empty. Yours could be the first signature.
            </p>
          )}

          {data.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((entry, i) => (
                <Reveal key={entry.id} delay={i * 0.04}>
                  <article className="rounded-2xl border border-border bg-card/40 p-6 h-full">
                    <div className="flex items-center gap-3">
                      {entry.avatar ? (
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="h-10 w-10 rounded-full border border-border"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full border border-border grid place-items-center text-sm">
                          {entry.name.charAt(0)}
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
          )}
        </div>
      </section>
    </>
  );
}
