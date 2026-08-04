import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/projects/projects-section";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects — case studies by ${site.name}` },
      {
        name: "description",
        content:
          "Five shipped products — NeuroSpeak, Luxoree, FABRO, Jaipur Metro Rail Corporation and SNehra Solutions — as long-form case studies.",
      },
      { property: "og:title", content: `Projects — ${site.name}` },
      {
        property: "og:description",
        content: "The full case studies, told through sticky-scroll storytelling.",
      },
      { property: "og:url", content: "/projects" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">Selected work · 2022 — 2026</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Every project, in full.
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead mx-auto mt-8 max-w-2xl">
              The homepage shows the highlights. This is the long-form gallery — each
              project as a case study, with the problem, the build and the outcome.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <ProjectsSection />
      <div className="divider-hair container-editorial" />

      {/* GitHub activity */}
      <section className="section">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">GitHub activity</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            Shipped in the open.
          </SplitReveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-6">
              <img
                src="https://ghchart.rshah.org/A-verse"
                alt="GitHub contribution graph for the past year"
                className="photo-mono h-auto w-full opacity-90"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
