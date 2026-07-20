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
      g.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
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
      {/* Ambient soft-gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 110%, color-mix(in oklch, var(--accent-pink) 12%, transparent), transparent 60%), radial-gradient(700px 500px at 90% -10%, color-mix(in oklch, var(--accent-blue) 10%, transparent), transparent 60%), radial-gradient(600px 400px at 50% 60%, color-mix(in oklch, var(--accent-yellow) 8%, transparent), transparent 65%)",
        }}
      />
      <div
        ref={glow}
        aria-hidden
        className="absolute h-[640px] w-[640px] rounded-full pointer-events-none opacity-0 lg:opacity-50"
        style={{
          background: "var(--gradient-signature-soft)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, transparent 35%, var(--bg) 100%)",
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

          <SplitReveal
            as="p"
            className="text-serif-italic gradient-text mt-1 md:mt-3"
            delay={0.5}
            duration={1}
            stagger={0.05}
            split="words"
          >
            {site.tagline}
          </SplitReveal>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
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

          {/* Meta strip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-10 md:mt-12 grid grid-cols-2 items-center gap-8 md:gap-16 w-full max-w-lg"
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="inline-flex items-center gap-1.5 text-eyebrow">
                <MapPin size={12} style={{ color: "var(--accent-pink)" }} />
                Based in
              </span>
              <span className="text-sm md:text-base font-medium text-fg">{site.location}</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="inline-flex items-center gap-1.5 justify-end text-eyebrow">
                <Layers size={12} style={{ color: "var(--accent-blue)" }} />
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
