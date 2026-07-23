import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDo from "@/components/sections/WhatIDo";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import SkillsSection from "@/components/sections/SkillsSection";
import CreativeSide from "@/components/sections/CreativeSide";
import ContactCTA from "@/components/sections/ContactCTA";

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
      <WhatIDo />
      <div className="divider-hair container-editorial" />
      <div id="projects">
        <ProjectShowcase />
      </div>
      <div className="divider-hair container-editorial" />
      <CreativeSide />
      <div className="divider-hair container-editorial" />
      <SkillsSection />
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
