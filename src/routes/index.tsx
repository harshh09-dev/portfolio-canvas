import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDo from "@/components/sections/WhatIDo";
import AboutPreview from "@/components/sections/AboutPreview";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import CreativeSide from "@/components/sections/CreativeSide";
import LyricsAndLogic from "@/components/sections/LyricsAndLogic";
import ContactCTA from "@/components/sections/ContactCTA";
import ViewMore from "@/components/ViewMore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjali Kamal — Full Stack Dev & AI Engineer" },
      {
        name: "description",
        content:
          "Editorial portfolio of Anjali Kamal — full stack developer and AI engineer designing scalable, human-centered products.",
      },
      { property: "og:title", content: "Anjali Kamal — Portfolio" },
      {
        property: "og:description",
        content: "Selected work, creative writing, and side experiments.",
      },
    ],
  }),
  component: Home,
});

/**
 * Homepage rhythm — no two consecutive sections share a background.
 *  Hero(cream) → What I Do(quiet) → About(warm) → Skills(quiet,tight-with-About)
 *  → Projects(quiet) → Off The Clock(warm-rich) → Lyrics(quiet,tight)
 *  → Contact(warm).
 * Vertical spacing intentionally uneven per brief.
 * AboutPreview owns its own "More about me" CTA, so no ViewMore under it.
 */
function Home() {
  return (
    <>
      <div className="section-bg-cream">
        <HeroSection />
      </div>

      {/* Hero → What I Do: generous */}
      <div className="section-bg-quiet" style={{ scrollMarginTop: "5rem" }}>
        <section id="what-i-do" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
          <WhatIDo />
          <ViewMore href="/about" label="More about how I work" />
        </section>
      </div>

      {/* What I Do → About: moderate */}
      <div className="section-bg-warm">
        <section id="about" style={{ paddingTop: "clamp(2rem, 4vw, 3.5rem)" }}>
          <AboutPreview />
        </section>

        {/* About → Skills: tight (same "about me" thought) */}
        <section id="skills" style={{ paddingTop: 0 }}>
          <SkillsSection />
          <ViewMore href="/about" label="See the full toolkit" />
        </section>
      </div>

      {/* Skills → Projects: generous (new chapter) */}
      <div className="section-bg-quiet">
        <section id="projects" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
          <ProjectShowcase />
          <ViewMore href="/projects" label="Browse every project" />
        </section>
      </div>

      {/* Projects → Off The Clock: generous (tonal shift) */}
      <div className="section-bg-warm-rich">
        <section id="off-the-clock" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
          <CreativeSide />
          <ViewMore href="/off-the-clock" label="Enter the studio" />
        </section>
      </div>

      {/* Off The Clock → Lyrics & Logic: tight (both personal) */}
      <div className="section-bg-quiet">
        <section id="lyrics-and-logic" style={{ paddingTop: 0 }}>
          <LyricsAndLogic />
        </section>
      </div>

      {/* Lyrics & Logic → Contact: generous (final pause) */}
      <div className="section-bg-warm">
        <ContactCTA />
      </div>
    </>
  );
}
