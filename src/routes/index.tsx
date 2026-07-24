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

function Home() {
  return (
    <>
      <HeroSection />
      <div className="divider-hair container-editorial" />

      <section id="what-i-do">
        <WhatIDo />
        <ViewMore href="/about" label="More about how I work" />
      </section>

      <div className="divider-hair container-editorial" />

      <section id="about">
        <AboutPreview />
        <ViewMore href="/about" label="Read my full story" />
      </section>

      <div className="divider-hair container-editorial" />

      <section id="skills">
        <SkillsSection />
        <ViewMore href="/about" label="See the full toolkit" />
      </section>

      <div className="divider-hair container-editorial" />

      <section id="projects">
        <ProjectShowcase />
        <ViewMore href="/projects" label="Browse every project" />
      </section>

      <div className="divider-hair container-editorial" />

      <section id="off-the-clock">
        <CreativeSide />
        <ViewMore href="/creative" label="Enter the studio" />
      </section>

      <div className="divider-hair container-editorial" />

      <section id="lyrics-and-logic">
        <LyricsAndLogic />
      </section>

      <div className="divider-hair container-editorial" />

      <ContactCTA />
    </>
  );
}
