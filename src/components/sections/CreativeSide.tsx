import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";
import { offTheClock, creativeTeaser } from "@/data/creative";

export default function CreativeSide() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-editorial">
        <div className="section-header">
          <Reveal>
            <p className="text-eyebrow">{creativeTeaser.eyebrow}</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            {creativeTeaser.headline}{" "}
            <span className="work-text">{creativeTeaser.headlineItalic}</span>
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead max-w-xl mx-auto">{creativeTeaser.copy}</p>
          </Reveal>
        </div>

        {/* Asymmetric editorial layout — Photography taller than Writing */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {/* Photography — visibly taller (cinematic) */}
          <Reveal className="col-span-12 md:col-span-7">
            <motion.a
              href={creativeTeaser.ctaHref}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              className="group block relative overflow-hidden rounded-2xl border border-border/60"
              style={{ aspectRatio: "5 / 6" }}
            >
              <motion.img
                src={offTheClock[0].image}
                alt={offTheClock[0].title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="text-eyebrow mb-2">{offTheClock[0].subtitle}</span>
                <h3
                  className="text-fg leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    letterSpacing: "-0.02em",
                    fontVariationSettings: '"SOFT" 100',
                  }}
                >
                  {offTheClock[0].title}
                </h3>
              </div>
            </motion.a>
          </Reveal>

          {/* Writing + Playgrounds stacked, shorter */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-3 md:gap-5">
            {offTheClock.slice(1).map((card, i) => (
              <Reveal key={card.title} delay={0.1 + i * 0.1}>
                <motion.a
                  href={creativeTeaser.ctaHref}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                  className="group block relative overflow-hidden rounded-2xl border border-border/60"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                    <span className="text-eyebrow mb-1.5">{card.subtitle}</span>
                    <h3
                      className="text-fg leading-none"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 300,
                        fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                        letterSpacing: "-0.02em",
                        fontVariationSettings: '"SOFT" 100',
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* NOTE: the single CTA lives in index.tsx via <ViewMore>,
            so this section no longer emits its own. */}
