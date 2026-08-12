import { motion, useReducedMotion } from "framer-motion";

const TEXT = "What I Build";

/**
 * Marquee — reproduction of the reference `.marquee` strip: alternating solid
 * and outlined uppercase repeats scrolling left over black.
 */
export default function BuildMarquee() {
  const reduce = useReducedMotion();
  const items = Array.from({ length: 6 });

  return (
    <div className="ref-ink-bg overflow-hidden pt-[clamp(2rem,4vw,4.25rem)]">
      <div className="flex items-center overflow-hidden py-4">
        <motion.div
          className="flex min-w-max items-center gap-16"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        >
          {items.map((_, i) => (
            <h2
              key={i}
              className={`ref-marquee-title uppercase ${i % 2 === 1 ? "ref-marquee-stroke" : ""}`}
            >
              {TEXT} <span className="text-white">-</span>
            </h2>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
