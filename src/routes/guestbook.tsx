import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import GuestbookForm from "@/features/guestbook/components/GuestbookForm";
import GuestbookGrid from "@/features/guestbook/components/GuestbookGrid";
import { useGuestbook } from "@/features/guestbook/hooks/useGuestbook";
import { guestbookCopy } from "@/data/guestbook";
import { site } from "@/data/site";

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    meta: [
      { title: `Guestbook — ${site.name}` },
      {
        name: "description",
        content:
          "Leave your signature. A shared wall of visitors, notes, and small hellos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: `Guestbook — ${site.name}` },
      { property: "og:description", content: "Sign the wall." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Guestbook — ${site.name}` },
      { name: "twitter:description", content: "Sign the wall." },
    ],
  }),
  component: GuestbookPage,
});

function GuestbookPage() {
  const { data, isLoading, isSubmitting, sign } = useGuestbook();

  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">{guestbookCopy.eyebrow}</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            {guestbookCopy.heading}
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 mx-auto max-w-2xl">{guestbookCopy.intro}</p>
          </Reveal>
        </div>
      </section>

      <div className="divider-hair container-editorial" />

      <section className="section pt-8">
        <div className="container-editorial">
          <div className="mb-16">
            <GuestbookForm onSign={sign} isSubmitting={isSubmitting} />
          </div>

          {isLoading && (
            <p className="text-center text-muted-foreground">{guestbookCopy.loading}</p>
          )}

          {!isLoading && data.length === 0 && (
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card/40 p-10 text-center">
              <h2 className="text-h3 text-fg">{guestbookCopy.emptyTitle}</h2>
              <p className="text-lead mt-3">{guestbookCopy.emptyBody}</p>
            </div>
          )}

          {!isLoading && data.length > 0 && <GuestbookGrid entries={data} />}
        </div>
      </section>
    </>
  );
}
