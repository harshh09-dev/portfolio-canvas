import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms of Use — ${site.name}` },
      {
        name: "description",
        content:
          "Terms governing use of this portfolio site, its content and the guestbook.",
      },
      { property: "og:title", content: `Terms of Use — ${site.name}` },
      { property: "og:description", content: "Content ownership and acceptable use." },
      { property: "og:url", content: "/terms" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">Legal</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Terms of Use
          </SplitReveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-fg-muted">
          <p>Last updated: August 2026. Placeholder copy pending legal review.</p>
          <h2 className="text-h3 text-fg">Content</h2>
          <p>
            All writing, imagery, case-study copy and source code presented here belong to{" "}
            {site.name} unless credited otherwise. You may quote and link with attribution;
            wholesale reproduction requires permission.
          </p>
          <h2 className="text-h3 text-fg">Guestbook conduct</h2>
          <p>
            Entries that are abusive, discriminatory, spam, or contain other people&apos;s
            private information may be removed without notice.
          </p>
          <h2 className="text-h3 text-fg">No warranty</h2>
          <p>
            Content is provided as-is for informational purposes and does not constitute
            professional advice.
          </p>
        </div>
      </section>
    </>
  );
}
