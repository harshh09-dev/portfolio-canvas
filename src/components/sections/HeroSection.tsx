import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Layers, ArrowUpRight } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import Magnetic from "@/components/motion/Magnetic";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

/**
 * Hero — refined for laptop viewports (1280×720 / 1366×768). Vertically
 * centered, no filler line, wider usable content, editorial rhythm.
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = displayRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(
      el,
      { yPercent: 30, opacity: 0, filter: "blur(14px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0)", duration: 1.4, ease: "expo.out", delay: 0.15 },
    );
  }, []);

  useEffect(() => {
    if (reduce) return;
    const el = root.current;
    const g = glow.current;
    if (!el || !g) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      g.style.transform = `translate3d(${cx - 210}px, ${cy - 210}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden bg-bg noise-overlay grid place-items-center"
      style={{
        minHeight: "min(80svh, 720px)",
        paddingTop: "max(6rem, 12vh)",
        paddingBottom: "max(3rem, 6vh)",
      }}
    >
      {/* Small neutral vignette — sized to the hero centerpiece, not the viewport */}
      <div
        ref={glow}
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-full pointer-events-none opacity-0 lg:opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--fg) 10%, transparent), transparent 70%)",
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />

      <div className="relative z-10 w-full container-wide">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-eyebrow mb-5 md:mb-6"
          >
            {site.eyebrow}
          </motion.p>

          <h1
            ref={displayRef}
            className="text-display text-fg select-none"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {site.displayName}
          </h1>

          {/* Subtitle — monochrome serif italic. */}
          <div className="relative mt-2 md:mt-4" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)" }}>
            <SplitReveal
              as="p"
              className="text-serif-italic text-fg relative z-10"
              delay={0.5}
              duration={1}
              stagger={0.05}
              split="words"
            >
              {site.tagline}
            </SplitReveal>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-7 md:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Magnetic>
              <a
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 min-h-11 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]"
              >
                See selected work
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 min-h-11 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:bg-surface"
              >
                Let&apos;s connect
              </a>
            </Magnetic>
          </motion.div>

          {/* Meta strip — pulled up close to CTAs, shared hairline baseline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-6 md:mt-7 flex items-stretch gap-6 md:gap-10 w-full max-w-md pt-4 border-t border-border/50"
          >
            <div className="flex-1 flex flex-col gap-0.5 text-left">
              <span className="inline-flex items-center gap-1.5 text-eyebrow">
                <MapPin size={12} />
                Based in
              </span>
              <span className="text-sm md:text-base font-medium text-fg">{site.location}</span>
            </div>
            <div className="w-px bg-border/50" />
            <div className="flex-1 flex flex-col gap-0.5 text-right">
              <span className="inline-flex items-center gap-1.5 justify-end text-eyebrow">
                <Layers size={12} />
                Role
              </span>
              <span className="text-sm md:text-base font-medium text-fg">{site.role}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
