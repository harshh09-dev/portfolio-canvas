import { createFileRoute } from "@tanstack/react-router";
import AboutPreview from "@/components/sections/AboutPreview";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactCTA from "@/components/sections/ContactCTA";
import CreativeSide from "@/components/sections/CreativeSide";
import ViewMore from "@/components/ViewMore";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { journey, philosophy, interests } from "@/data/journey";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${site.name}` },
      {
        name: "description",
        content:
          "The story, the journey, the tools, and the taste that shape how I build.",
      },
      { property: "og:title", content: `About — ${site.name}` },
      {
        property: "og:description",
        content: "Journey timeline, technologies, philosophy and personal interests.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero intro */}
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">About</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            The person behind the pixels.
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 mx-auto max-w-2xl">
              I&apos;m {site.name} — full-stack developer, AI engineer, and quiet obsessive
              about the details most people scroll past. This page is the long version.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider-hair container-editorial" />
      <AboutPreview />

      <div className="divider-hair container-editorial" />
      <SkillsSection />

      {/* Journey */}
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial">
          <div className="section-header text-center">
            <Reveal><p className="text-eyebrow">The journey</p></Reveal>
            <SplitReveal as="h2" className="section-heading" split="words">
              A timeline, not a resume.
            </SplitReveal>
          </div>
          <ol className="relative mx-auto max-w-3xl border-l border-border pl-8">
            {journey.map((m, i) => (
              <Reveal key={m.year + i} delay={i * 0.05}>
                <li className="mb-12 last:mb-0">
                  <span className="absolute -left-[7px] mt-2 h-3 w-3 rounded-full" style={{ background: "var(--gradient-signature)" }} />
                  <p className="text-eyebrow">{m.year}</p>
                  <h3 className="text-h3 text-fg mt-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.org}</p>
                  <p className="text-lead mt-3">{m.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* GitHub contributions (visual embed) */}
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Public work</p></Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            A year in commits.
          </SplitReveal>
          <Reveal delay={0.15}>
            <div className="mt-10 mx-auto max-w-4xl rounded-2xl border border-border bg-card/40 p-6 overflow-hidden">
              <img
                src="https://ghchart.rshah.org/A-verse"
                alt="GitHub contribution graph"
                className="w-full h-auto opacity-90"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial">
          <div className="section-header text-center">
            <Reveal><p className="text-eyebrow">Philosophy</p></Reveal>
            <SplitReveal as="h2" className="section-heading" split="words">
              How I think about the work.
            </SplitReveal>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card/40 p-8 h-full">
                  <h3 className="text-h3 text-fg">{p.title}</h3>
                  <p className="text-lead mt-4">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Off The Clock — moved here from the Home page */}
      <div className="divider-hair container-editorial" />
      <section id="off-the-clock" className="section-bg-warm-rich scroll-mt-28">
        <CreativeSide />
        <ViewMore href="/off-the-clock" label="Enter the studio" />
      </section>

      {/* Interests */}
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Off screen</p></Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            Small obsessions.
          </SplitReveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {interests.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-4 py-2 text-sm text-fg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
