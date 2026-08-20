import { useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { refWorks } from "@/data/works";

/**
 * Works — reproduction of `portfolio-three-area`: the giant hollow "works"
 * word drifts with scroll behind a staggered two-column set of neumorphic
 * project cards. On pointer devices a per-project preview follows the cursor;
 * on touch, tapping a card simply opens its case study.
 */
export default function WorksSection() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Scroll-linked hollow background word
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const wordX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const wordScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  // Cursor-follow preview (motion values → no re-render on mousemove)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 260, damping: 30, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 260, damping: 30, mass: 0.5 });

  const fine =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: fine)").matches === true;

  const onMove = (e: React.PointerEvent) => {
    if (!fine || reduce) return;
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(e.clientX - rect.left);
    py.set(e.clientY - rect.top);
  };

  const preview = refWorks.find((w) => w.slug === active);

  return (
    <section
      id="portfolio"
      ref={root}
      onPointerMove={onMove}
      onPointerLeave={() => setActive(null)}
      className="ref-scope relative z-[1] overflow-hidden"
      style={{ paddingBlock: "clamp(4rem, 7.5vw, 7.5rem)" }}
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: wordX, scale: wordScale }}
        className="pointer-events-none absolute top-0 left-0 z-0 w-full select-none text-center"
      >
        <h3 className="ref-shape-title">works</h3>
      </motion.div>

      {/* Cursor-follow preview — unique image per project */}
      {fine && preview && !reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          className="pointer-events-none absolute top-0 left-0 z-[5] hidden h-[220px] w-[320px] overflow-hidden rounded-[var(--ref-radius-md)] shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:block"
        >
          <img
            src={preview.hoverImage}
            alt=""
            className="h-full w-full scale-[1.06] object-cover"
          />
        </motion.div>
      )}

      <div className="ref-container">
        <div className="relative z-[1] flex flex-wrap items-start justify-between">
          {refWorks.map((w, i) => (
            <div
              key={w.slug}
              className={`w-full lg:max-w-[calc(50%-1.5rem)] ${
                i % 2 === 1 ? "lg:mt-[clamp(0px,30vw,617px)]" : ""
              }`}
            >
              <Reveal
                delay={0.05 * i}
                className={`ref-card group mb-[clamp(1.25rem,2.5vw,4.375rem)] rounded-[var(--ref-radius-lg)] p-[30px] pt-[38px] transition-all duration-500 hover:-translate-y-1.5 ${
                  active && active !== w.slug ? "opacity-55" : "opacity-100"
                }`}
              >
                <div
                  onPointerEnter={() => setActive(w.slug)}
                  onFocus={() => setActive(w.slug)}
                  onBlur={() => setActive(null)}
                >
                  <div className="mb-[30px] flex flex-wrap items-start justify-between gap-4">
                    <div className="mb-6 min-w-0">
                      <h2 className="mb-4 text-[clamp(1.5rem,2.6vw,3.5rem)] font-medium">
                        <Link
                          to="/projects/$slug"
                          params={{ slug: w.slug }}
                          className="inline-block transition-transform duration-500 group-hover:translate-x-2 hover:text-[var(--ref-accent)]"
                        >
                          {w.title}
                        </Link>
                      </h2>
                      <ul className="flex flex-wrap gap-2.5">
                        {w.tags.map((t) => (
                          <li key={t}>
                            <span className="ref-pill text-[var(--ref-ink)]">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: w.slug }}
                      aria-label={`Read the ${w.title} case study`}
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--ref-hairline)] bg-[var(--ref-shape)] text-[var(--ref-ink)] transition-all duration-500 group-hover:rotate-45 hover:bg-[var(--ref-ink)] hover:text-[var(--ref-bg)]"
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: w.slug }}
                    className="block overflow-hidden rounded-[var(--ref-radius-lg)]"
                  >
                    <img
                      src={w.thumb}
                      alt={w.title}
                      loading="lazy"
                      className="w-full rounded-[var(--ref-radius-lg)] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-start">
          <Link
            to="/projects"
            className="ref-circle-btn ref-card h-[clamp(180px,20vw,282px)] w-[clamp(180px,20vw,282px)]"
          >
            <span className="flex flex-col items-center justify-center">
              <span className="text-[clamp(1rem,1.4vw,1.5rem)] font-bold text-[var(--ref-ink)] transition-colors duration-300">
                Explore <br /> My Projects
              </span>
            </span>
            <i className="ref-circle-dot" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
