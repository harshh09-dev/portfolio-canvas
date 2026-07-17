import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Layers, ArrowUpRight, ChevronDown } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import Magnetic from "@/components/motion/Magnetic";
import SplitReveal from "@/components/motion/SplitReveal";

/**
 * Hero — refined for laptop viewports (1280×720+). Vertically centered,
 * editorial rhythm, magnetic CTAs, one type system, GSAP-driven reveal.
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLHeadingElement>(null);

  // GSAP display headline reveal — replaces framer initial for perfect timing
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = displayRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(
      el,
      { yPercent: 40, opacity: 0, filter: "blur(14px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0)", duration: 1.4, ease: "expo.out", delay: 0.15 },
    );
  }, []);

  // Cursor-following ember glow
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
      g.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`;
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
        minHeight: "min(100svh, 820px)",
      }}
    >
      {/* Ambient layers */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1000px 500px at 50% 105%, color-mix(in oklch, var(--accent-signature) 14%, transparent), transparent 60%), radial-gradient(700px 400px at 8% -10%, color-mix(in oklch, var(--accent-cool) 10%, transparent), transparent 60%)",
        }}
      />
      <div
        ref={glow}
        aria-hidden
        className="absolute h-[520px] w-[520px] rounded-full pointer-events-none opacity-0 lg:opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--accent-signature) 26%, transparent), transparent 70%)",
          filter: "blur(90px)",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, transparent 40%, var(--bg) 100%)",
        }}
      />

      {/* Content — grid center, top-padded for nav */}
      <div className="relative z-10 container-editorial w-full pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-eyebrow mb-5 md:mb-6"
          >
            I design and build scalable systems that
          </motion.p>

          {/* Display name — GSAP animated */}
          <h1
            ref={displayRef}
            className="text-display text-fg select-none"
            style={{ willChange: "transform, opacity, filter" }}
          >
            Anjali
          </h1>

          {/* Serif tagline */}
          <SplitReveal
            as="p"
            className="text-serif-italic text-fg mt-2 md:mt-4"
            delay={0.5}
            duration={1}
            stagger={0.05}
            split="words"
          >
            solve real-world problems.
          </SplitReveal>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
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
                href="mailto:anjalikamal3105@gmail.com"
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
            className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-3 items-center gap-6 md:gap-10 w-full max-w-2xl"
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="inline-flex items-center gap-1.5 text-eyebrow">
                <MapPin size={12} className="text-accent-mint" />
                Based in
              </span>
              <span className="text-sm md:text-base font-medium text-fg">Jaipur, India</span>
            </div>

            <div className="hidden md:flex flex-col items-center gap-2 text-eyebrow">
              <span>Scroll</span>
              <motion.span
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-fg-muted"
              >
                <ChevronDown size={16} />
              </motion.span>
            </div>

            <div className="flex flex-col gap-1 text-right">
              <span className="inline-flex items-center gap-1.5 justify-end text-eyebrow">
                <Layers size={12} className="text-accent-pink" />
                Role
              </span>
              <span className="text-sm md:text-base font-medium text-fg">
                Full Stack Dev & AI Engineer
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
