import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, Layers, MapPin, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — Phase 1 redesign.
 * Preserves brand: Anjali Kamal, Jaipur, Full Stack Dev & AI Engineer,
 * "I design and build scalable systems that solve real-world problems."
 * Editorial, dark, premium — four dedicated layouts (mobile/tablet/laptop/desktop).
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.matchMedia("(min-width: 1080px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cursor-following glow (desktop/laptop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(mx, { stiffness: 60, damping: 24 });
  const glowY = useSpring(my, { stiffness: 60, damping: 24 });

  useEffect(() => {
    if (!isDesktop || reduce) return;
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left - 220);
      my.set(e.clientY - r.top - 220);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isDesktop, reduce, mx, my]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-bg noise-overlay"
    >
      {/* Ambient composition */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 110%, color-mix(in oklch, var(--accent-signature) 12%, transparent), transparent 60%), radial-gradient(800px 400px at 15% 0%, color-mix(in oklch, var(--accent-cool) 10%, transparent), transparent 60%)",
        }}
      />
      {isDesktop && !reduce && (
        <motion.div
          aria-hidden
          style={{ x: glowX, y: glowY }}
          className="absolute h-[440px] w-[440px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.2 }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklch, var(--accent-signature) 22%, transparent), transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      )}

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 45%, var(--bg) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-editorial flex min-h-[100svh] flex-col justify-between pt-28 pb-10 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20">
        {/* Top — eyebrow status */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-center gap-3 text-eyebrow"
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent-mint"
            style={{ boxShadow: "0 0 12px var(--accent-mint)" }}
          />
          <span>Available for select engagements — 2026</span>
        </motion.div>

        {/* Center — display headline */}
        <div className="flex flex-1 flex-col items-center justify-center text-center py-10 md:py-14">
          {/* Eyebrow line */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="text-eyebrow mb-6 md:mb-8"
          >
            I design and build scalable systems that
          </motion.p>

          {/* Display name */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-display text-fg select-none"
            style={{ fontFeatureSettings: "'ss01'" }}
          >
            ANJALI
          </motion.h1>

          {/* Serif tagline */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="text-serif-italic mt-4 md:mt-6 text-fg"
            style={{
              fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)",
            }}
          >
            solve real-world problems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 min-h-11 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.02]"
            >
              See selected work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="mailto:anjalikamal3105@gmail.com"
              className="inline-flex items-center justify-center gap-2 min-h-11 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-fg transition-colors duration-300 hover:bg-surface"
            >
              Let&apos;s connect
            </a>
          </motion.div>
        </div>

        {/* Bottom — meta strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-3 items-end gap-6 md:gap-10"
        >
          {/* Location */}
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-eyebrow">
              <MapPin size={12} className="text-accent-mint" />
              Based in
            </span>
            <span className="text-sm md:text-base font-medium text-fg">
              Jaipur, India
            </span>
          </div>

          {/* Scroll cue — centered on md+ */}
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

          {/* Role */}
          <div className="flex flex-col gap-1 text-right md:text-right">
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
    </section>
  );
}
