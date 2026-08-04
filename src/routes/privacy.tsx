import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${site.name}` },
      {
        name: "description",
        content:
          "How this site handles personal data, analytics and guestbook sign-ins.",
      },
      { property: "og:title", content: `Privacy Policy — ${site.name}` },
      { property: "og:description", content: "Data handling on anjalikamal.dev." },
      { property: "og:url", content: "/privacy" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">Legal</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Privacy Policy
          </SplitReveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-fg-muted">
          <p>Last updated: August 2026. Placeholder copy pending legal review.</p>
          <h2 className="text-h3 text-fg">What is collected</h2>
          <p>
            This site collects no personal data by default. If you sign the guestbook, the
            display name, avatar URL and email address supplied by your chosen sign-in
            provider are stored so your entry can be attributed and moderated.
          </p>
          <h2 className="text-h3 text-fg">Analytics</h2>
          <p>
            Aggregate, non-identifying page-view counts may be recorded to understand which
            work resonates. No cross-site tracking or advertising profiles are built.
          </p>
          <h2 className="text-h3 text-fg">Your choices</h2>
          <p>
            You can request deletion of a guestbook entry and the account data behind it at
            any time by emailing{" "}
            <a href={`mailto:${site.email}`} className="text-fg underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
