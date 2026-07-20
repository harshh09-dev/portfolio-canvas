import { useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { skills, marqueeWords } from "@/data/skills";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="section relative overflow-hidden">
      <div className="container-editorial">
        <div className="section-header">
          <Reveal>
            <p className="text-eyebrow">The Toolkit</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            The magic{" "}
            <span className="work-text">behind.</span>
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead max-w-xl mx-auto">
              Tools I reach for daily. Not a resume — the actual stack behind the work you see.
            </p>
          </Reveal>
        </div>

        {/* Skill pills */}
        <div className="relative z-10 max-w-5xl mx-auto mb-16 md:mb-20">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {skills.map(({ name, icon: Icon }, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-border/60 text-xs md:text-sm uppercase tracking-[0.16em] text-fg-muted bg-surface/40 backdrop-blur-sm transition-colors hover:border-fg/40 hover:text-fg"
              >
                <Icon className="text-base shrink-0" />
                <span className="font-medium">{name}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Cross ribbon marquee — RED accent */}
      <div className="relative mt-20 md:mt-28 h-[200px] md:h-[240px] w-screen left-1/2 -translate-x-1/2 overflow-hidden">
        {/* Back ribbon */}
        <div
          className="absolute left-[-60%] top-[70px] md:top-[90px] w-[240%] -rotate-[3.5deg] opacity-30 z-10"
          style={{
            background: "color-mix(in oklch, var(--accent-red) 25%, transparent)",
          }}
        >
          <motion.div
            className="flex whitespace-nowrap py-4 md:py-5"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 55, ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 5 }).flatMap(() => marqueeWords).map((word, i) => (
              <div
                key={i}
                className="inline-flex items-center shrink-0 px-[3.5rem] font-serif italic text-white/40"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  fontWeight: 300,
                  fontVariationSettings: '"SOFT" 100',
                  letterSpacing: "-0.01em",
                }}
              >
                <span className="mr-8 text-lg not-italic font-sans">✦</span>
                {word}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Front ribbon */}
        <div
          className="absolute left-[-60%] top-[54px] md:top-[70px] w-[240%] rotate-[3.5deg] z-20"
          style={{
            background: "var(--accent-red)",
            boxShadow: "0 0 120px color-mix(in oklch, var(--accent-red) 25%, transparent)",
          }}
        >
          <motion.div
            className="flex whitespace-nowrap py-4 md:py-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 5 }).flatMap(() => marqueeWords).map((word, i) => (
              <div
                key={i}
                className="inline-flex items-center shrink-0 px-[3.5rem] text-white"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  fontWeight: 300,
                  fontVariationSettings: '"SOFT" 100',
                  letterSpacing: "-0.01em",
                }}
              >
                <span
                  className="mr-8 text-lg"
                  style={{ fontFamily: "var(--font-sans)", fontStyle: "normal" }}
                >
                  ✦
                </span>
                {word}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
