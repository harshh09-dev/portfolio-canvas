import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Cookie Policy — ${site.name}` },
      {
        name: "description",
        content:
          "Which cookies and local storage keys this site uses, and what each one is for.",
      },
      { property: "og:title", content: `Cookie Policy — ${site.name}` },
      { property: "og:description", content: "Cookies and local storage on this site." },
      { property: "og:url", content: "/cookies" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">Legal</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Cookie Policy
          </SplitReveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-fg-muted">
          <p>Last updated: August 2026. Placeholder copy pending legal review.</p>
          <h2 className="text-h3 text-fg">Strictly necessary</h2>
          <p>
            A <code className="text-fg">theme</code> key in local storage remembers whether
            you prefer the light or dark rendering. A session cookie is set only if you sign
            in to the guestbook.
          </p>
          <h2 className="text-h3 text-fg">No advertising cookies</h2>
          <p>
            This site sets no advertising, retargeting or third-party profiling cookies.
          </p>
          <h2 className="text-h3 text-fg">Clearing them</h2>
          <p>
            Clearing site data in your browser removes every key this site has stored; the
            site continues to work with defaults.
          </p>
        </div>
      </section>
    </>
  );
}
