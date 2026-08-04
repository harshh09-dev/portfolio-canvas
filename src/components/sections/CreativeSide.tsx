import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { offTheClock, creativeTeaser } from "@/data/creative";

/**
 * Off The Clock — homepage preview.
 * Left: scattered grayscale polaroid collage. Right: editorial copy + CTA.
 * Monochrome only; photography rendered greyscale so it can't reintroduce color.
 */
const collageTransforms = [
  { rotate: -7, x: 0, y: 10 },
  { rotate: 4, x: 26, y: 0 },
  { rotate: -3, x: 52, y: 22 },
  { rotate: 8, x: 78, y: 8 },
];

export default function CreativeSide() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-editorial">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Collage */}
          <Reveal>
            <div className="relative mx-auto h-[300px] w-full max-w-[420px] sm:h-[360px]">
              {offTheClock.slice(0, 4).map((c, i) => {
                const t = collageTransforms[i];
                return (
                  <motion.figure
                    key={c.title}
                    whileHover={{ rotate: 0, y: t.y - 8, zIndex: 10 }}
                    transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                    className="absolute overflow-hidden rounded-sm border border-border bg-card p-1.5"
                    style={{
                      left: `${t.x / 1.35}%`,
                      top: `${t.y}%`,
                      rotate: `${t.rotate}deg`,
                      width: "clamp(120px, 42%, 180px)",
                      zIndex: i,
                    }}
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="photo-mono aspect-[4/5] w-full object-cover"
                    />
                  </motion.figure>
                );
              })}
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="text-eyebrow">{creativeTeaser.eyebrow}</p>
            </Reveal>
            <SplitReveal
              as="h2"
              className="section-heading mt-4 !text-left"
              split="words"
            >
              {`${creativeTeaser.headlineLine1} ${creativeTeaser.headlineLine2}`}
            </SplitReveal>
            <Reveal delay={0.12}>
              <div className="mt-6 h-px w-16 bg-foreground" />
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lead mt-6 max-w-md">{creativeTeaser.copy}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <a
                href={creativeTeaser.ctaHref}
                className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                {creativeTeaser.ctaLabel}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
