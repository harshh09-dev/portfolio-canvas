import { createFileRoute } from "@tanstack/react-router";
import LyricsAndLogic from "@/components/sections/LyricsAndLogic";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/lyrics-and-logic")({
  head: () => ({
    meta: [
      { title: `Lyrics & Logic — ${site.name}` },
      {
        name: "description",
        content: "The music that runs behind the code, and the code that runs behind the music.",
      },
      { property: "og:title", content: `Lyrics & Logic — ${site.name}` },
      {
        property: "og:description",
        content: "Spotify, GitHub, and the rhythm between them.",
      },
    ],
  }),
  component: LyricsPage,
});

function LyricsPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Lyrics & Logic</p></Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Sound of the shipping.
          </SplitReveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <LyricsAndLogic />
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
