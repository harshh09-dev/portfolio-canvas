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

        {/* Preview strip — asymmetric editorial layout */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {/* Large */}
          <Reveal className="col-span-12 md:col-span-7">
            <motion.a
              href={creativeTeaser.ctaHref}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              className="group block relative overflow-hidden rounded-2xl border border-border/60"
              style={{ aspectRatio: "16 / 11" }}
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

          {/* Two stacked */}
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

        {/* Single premium CTA */}
        <Reveal delay={0.3}>
          <div className="mt-12 md:mt-16 flex justify-center">
            <Magnetic>
              <a
                href={creativeTeaser.ctaHref}
                className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-surface/40 backdrop-blur-md pl-6 pr-2 py-2 text-sm font-medium text-fg transition-transform hover:scale-[1.02]"
              >
                {creativeTeaser.ctaLabel}
                <span
                  className="grid place-items-center h-10 w-10 rounded-full"
                  style={{ background: "var(--gradient-signature)" }}
                >
                  <ArrowUpRight size={16} className="text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
