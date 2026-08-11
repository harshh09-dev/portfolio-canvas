import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import Magnetic from "@/components/motion/Magnetic";
import SplitReveal from "@/components/motion/SplitReveal";
import { hero } from "@/data/hero";
import { site } from "@/data/site";

/** Count-up numeral. Static when reduced motion is requested. */
function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/**
 * Hero — three-part editorial banner adapted from the reference layout:
 * an oversized wordmark, an intro + capability list on the left, the
 * positioning statement and CTAs in the centre, counters on the right.
 * Monochrome only; laid out per breakpoint rather than merely scaled.
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = wordRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(
      el,
      { yPercent: 22, opacity: 0, filter: "blur(16px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out",
        delay: 0.15,
      },
    );
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden bg-bg noise-overlay"
      style={{
        paddingTop: "max(7rem, 14vh)",
        paddingBottom: "clamp(3rem, 7vh, 5rem)",
      }}
    >
      <div className="relative z-10 container-wide">
        {/* Oversized wordmark */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-eyebrow mb-4"
          >
            {site.role} · {site.location}
          </motion.p>
          <h1
            ref={wordRef}
            className="select-none font-semibold leading-[0.82] tracking-[-0.04em] text-fg"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 15rem)",
              willChange: "transform, opacity, filter",
            }}
          >
            {hero.word}
          </h1>
        </div>

        {/* Three-part banner row */}
        <div className="mt-10 grid gap-8 border-t border-border/60 pt-8 md:mt-12 md:grid-cols-2 md:gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.7fr)] lg:items-end lg:gap-12">
          {/* Left — intro + capabilities */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className="text-base leading-relaxed text-fg md:text-lg">{hero.intro}</p>
            <ul className="mt-6 space-y-2.5">
              {hero.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-sm text-fg-muted md:text-base">
                  <Plus size={13} className="shrink-0 text-fg-subtle" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Centre — statement + CTAs */}
          <div className="lg:px-2 lg:text-center">
            <SplitReveal
              as="h2"
              className="text-serif-italic text-fg [font-size:clamp(1.4rem,2.6vw,2.25rem)]"
              delay={0.5}
              duration={1}
              stagger={0.04}
              split="words"
            >
              {hero.statement}
            </SplitReveal>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row lg:justify-center"
            >
              <Magnetic>
                <a
                  href={hero.primaryCta.href}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]"
                >
                  {hero.primaryCta.label}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:bg-surface"
                >
                  {hero.secondaryCta.label}
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right — counters */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="grid grid-cols-3 gap-4 md:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:gap-5"
          >
            {hero.counters.map((c) => (
              <div key={c.label} className="border-t border-border/60 pt-3 lg:border-t-0 lg:border-l lg:pl-4 lg:pt-0">
                <p className="text-2xl font-semibold leading-none text-fg md:text-4xl">
                  <Counter to={c.value} suffix={c.suffix} />
                </p>
                <p className="mt-1.5 text-xs text-fg-muted md:text-sm">{c.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
