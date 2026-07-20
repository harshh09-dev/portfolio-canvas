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
      <div className="divider-hair container-editorial" />
      <WhatIDo />
      <div className="divider-hair container-editorial" />
      <AboutPreview />
      <div className="divider-hair container-editorial" />
      <div id="projects">
        <ProjectShowcase />
      </div>
      <div className="divider-hair container-editorial" />
      <SkillsSection />
      <div className="divider-hair container-editorial" />
      <CreativeSide />
      <div className="divider-hair container-editorial" />
      <LyricsAndLogic />
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
