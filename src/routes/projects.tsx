import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/projects/projects-section";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects — ${site.name}` },
      {
        name: "description",
        content:
          "Every project — overview, challenge, solution, process, outcome, gallery, tech and links.",
      },
      { property: "og:title", content: `Projects — ${site.name}` },
      {
        property: "og:description",
        content: "The full case studies. Sticky-scroll storytelling.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Selected work · 2022 — 2026</p></Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Every project, in full.
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 mx-auto max-w-2xl">
              The homepage shows the highlights. This is the long-form gallery — each
              project as a case study.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <ProjectsSection />
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
