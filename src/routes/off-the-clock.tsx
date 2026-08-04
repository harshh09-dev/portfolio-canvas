import { createFileRoute } from "@tanstack/react-router";
import CreativeSide from "@/components/sections/CreativeSide";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { offTheClock } from "@/data/creative";
import { site } from "@/data/site";

export const Route = createFileRoute("/off-the-clock")({
  head: () => ({
    meta: [
      { title: `Off The Clock — ${site.name}` },
      {
        name: "description",
        content: "Photography, writing, and small design experiments — the quiet work between shipping.",
      },
      { property: "og:title", content: `Off The Clock — ${site.name}` },
      {
        property: "og:description",
        content: "Creative side — the unfiltered, the raw, the real.",
      },
    ],
  }),
  component: CreativePage,
});

function CreativePage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal><p className="text-eyebrow">Off The Clock</p></Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            Where creativity breathes.
          </SplitReveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <CreativeSide />
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-3">
            {offTheClock.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <figure className="group overflow-hidden rounded-2xl border border-border">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <figcaption className="p-5 bg-card/40">
                    <p className="text-eyebrow">{c.meta}</p>
                    <h3 className="text-h3 text-fg mt-1">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.subtitle}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <ContactCTA />
    </>
  );
}
