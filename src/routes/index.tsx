import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/sections/HeroSection";
import AboutReference from "@/components/sections/AboutReference";
import BuildMarquee from "@/components/sections/BuildMarquee";
import ServicesList from "@/components/sections/ServicesList";
import WorksSection from "@/components/sections/WorksSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TechStackSection from "@/components/sections/TechStackSection";
import LyricsAndLogic from "@/components/sections/LyricsAndLogic";
import ContactCTA from "@/components/sections/ContactCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjali Kamal — Full Stack Developer" },
      {
        name: "description",
        content:
          "Anjali Kamal — full stack developer building web applications with React, Node.js and PostgreSQL. Selected work, services and experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Anjali Kamal — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Full stack developer building web applications with React, Node.js and PostgreSQL.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Anjali Kamal — Full Stack Developer" },
      {
        name: "twitter:description",
        content: "Selected work, services, experience and creative side projects.",
      },
    ],
  }),
  component: Home,
});

/**
 * Home — section order taken directly from the reference index.html:
 *   Hero → About → "What I Build" marquee → Services → Works → Experience
 *   → Tech stack → (project-unique: Off The Clock, Lyrics & Logic) → Contact.
 */
function Home() {
  return (
    <>
      <HeroSection />
      <AboutReference />
      <BuildMarquee />
      <ServicesList />
      <WorksSection />
      <ExperienceSection />
      <TechStackSection />

      {/* Unique to this project — preserved and placed after the reference flow */}
      <div className="section-bg-quiet">
        <section
          id="lyrics-and-logic"
          style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}
        >
          <LyricsAndLogic />
        </section>
      </div>

      <div className="section-bg-warm">
        <ContactCTA />
      </div>
    </>
  );
}
