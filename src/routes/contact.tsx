import { createFileRoute } from "@tanstack/react-router";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site, socials } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      {
        name: "description",
        content: "Freelance, full-time, or just to say hello — the inbox is open.",
      },
      { property: "og:title", content: `Contact — ${site.name}` },
      {
        property: "og:description",
        content: "Say hello.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Contact</p></Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Let&apos;s build something.
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 mx-auto max-w-xl">
              Freelance, full-time, or just to say hello — the inbox is open.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
              >
                {site.email}
              </a>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-strong px-4 py-3 text-sm font-medium text-fg hover:bg-surface"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
