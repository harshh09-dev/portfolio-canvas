import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Premium first-load website loader. Mounted once at root. Auto-dismisses
 * after fonts + initial paint. Full-viewport ember gradient with a split
 * name reveal and a hairline progress bar. Session-scoped: only appears
 * on first visit within a session.
 */
export default function PremiumLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show once per session; after first load, skip.
    try {
      if (sessionStorage.getItem("loader-shown") === "1") {
        setVisible(false);
        return;
      }
    } catch {}

    if (reduce) {
      setProgress(1);
      setTimeout(() => setVisible(false), 200);
      try { sessionStorage.setItem("loader-shown", "1"); } catch {}
      return;
    }

    const start = performance.now();
    const min = 1400;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / min);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        Promise.resolve((document as any).fonts?.ready).then(() => {
          setTimeout(() => setVisible(false), 350);
          try { sessionStorage.setItem("loader-shown", "1"); } catch {}
        });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const pct = Math.round(progress * 100);
  const letters = ["A", "N", "J", "A", "L", "I"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.7, 0, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, color-mix(in oklch, var(--accent-signature) 25%, var(--bg)) 0%, var(--bg) 60%)",
          }}
        >
          <div className="absolute inset-0 noise-overlay pointer-events-none" />

          <div className="relative flex flex-col items-center gap-10 px-6">
            {/* Split name */}
            <div className="flex items-baseline" style={{ gap: "0.05em" }}>
              {letters.map((l, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: 0.85 }}>
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(3.5rem, 12vw, 9rem)",
                      color: "var(--fg)",
                      letterSpacing: "-0.03em",
                      fontWeight: 400,
                    }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Progress rail */}
            <div className="flex items-center gap-4">
              <span className="text-eyebrow">Loading</span>
              <div className="h-px w-40 md:w-64 bg-border overflow-hidden">
                <motion.div
                  className="h-full origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent-signature), var(--fg))",
                    scaleX: progress,
                  }}
                />
              </div>
              <span className="text-eyebrow tabular-nums w-8 text-right">{pct}</span>
            </div>
          </div>

          {/* Corner brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-6 left-6 text-eyebrow"
          >
            Anjali Kamal
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 right-6 text-eyebrow"
          >
            Portfolio · v2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
