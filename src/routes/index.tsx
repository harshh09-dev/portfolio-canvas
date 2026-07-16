import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDo from "@/components/sections/WhatIDo";
import AboutPreview from "@/components/sections/AboutPreview";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import SkillsSection from "@/components/sections/SkillsSection";
import CreativeSide from "@/components/sections/CreativeSide";
import LyricsAndLogic from "@/components/sections/LyricsAndLogic";
import ContactCTA from "@/components/sections/ContactCTA";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <div className="divider-line" />
      <WhatIDo />
      <div className="divider-line" />
      <AboutPreview />
      <div className="divider-line" />
      <div id="projects">
        <ProjectShowcase />
      </div>
      <div className="divider-line" />
      <SkillsSection />
      <div className="divider-line" />
      <CreativeSide />
      <div className="divider-line" />
      <LyricsAndLogic />
      <div className="divider-line" />
      <ContactCTA />
    </>
  );
}
