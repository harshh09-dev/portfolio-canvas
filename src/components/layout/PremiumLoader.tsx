import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import animeAsset from "@/assets/hi_anime.png.asset.json";
import { site } from "@/data/site";

/**
 * Premium first-load loader. Session-scoped. Slow, cinematic, editorial.
 * Anime character enters from the left, waves; the name types in via
 * a letter-reveal; a hairline progress bar reaches 100% before the
 * whole thing wipes upward.
 */
export default function PremiumLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("loader-shown-v2") === "1") {
        setVisible(false);
        return;
      }
    } catch {}

    if (reduce) {
      setProgress(1);
      setTimeout(() => setVisible(false), 200);
      try { sessionStorage.setItem("loader-shown-v2", "1"); } catch {}
      return;
    }

    const start = performance.now();
    const min = 2600;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / min);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        Promise.resolve((document as any).fonts?.ready).then(() => {
          setTimeout(() => setVisible(false), 550);
          try { sessionStorage.setItem("loader-shown-v2", "1"); } catch {}
        });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const pct = Math.round(progress * 100);
  const letters = site.displayName.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1.1, ease: [0.7, 0, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "var(--bg)" }}
        >
          {/* Ambient gradient wash */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background:
                "radial-gradient(900px 600px at 20% 110%, color-mix(in oklch, var(--accent-pink) 22%, transparent), transparent 60%), radial-gradient(700px 500px at 90% 0%, color-mix(in oklch, var(--accent-blue) 18%, transparent), transparent 60%), radial-gradient(500px 400px at 50% 50%, color-mix(in oklch, var(--accent-yellow) 12%, transparent), transparent 65%)",
            }}
          />
          <div className="absolute inset-0 noise-overlay pointer-events-none" />

          {/* Content grid: anime character on the left, name+progress on the right */}
          <div className="relative h-full w-full grid place-items-center px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 max-w-5xl w-full">
              {/* Character */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative shrink-0"
              >
                <motion.img
                  src={animeAsset.url}
                  alt="Anjali waving"
                  className="h-[280px] md:h-[420px] w-auto object-contain select-none pointer-events-none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  draggable={false}
                />
                {/* Soft ground glow */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-6 w-40 rounded-full blur-2xl opacity-60"
                  style={{ background: "var(--gradient-signature-soft)" }}
                />
              </motion.div>

              {/* Text side */}
              <div className="flex flex-col items-center md:items-start gap-8 md:gap-10">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-eyebrow"
                >
                  Say hi —
                </motion.p>
                <div className="flex items-baseline" style={{ gap: "0.03em" }}>
                  {letters.map((l, i) => (
                    <span
                      key={i}
                      style={{ display: "inline-block", overflow: "hidden", lineHeight: 0.86 }}
                    >
                      <motion.span
                        initial={{ y: "105%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 1.1,
                          delay: 0.4 + i * 0.09,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          display: "inline-block",
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(3.5rem, 12vw, 8.5rem)",
                          color: "var(--fg)",
                          letterSpacing: "-0.035em",
                          fontWeight: 300,
                          fontVariationSettings: '"SOFT" 100, "opsz" 144',
                        }}
                      >
                        {l}
                      </motion.span>
                    </span>
                  ))}
                </div>

                {/* Progress rail */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="flex items-center gap-4 w-full max-w-sm"
                >
                  <span className="text-eyebrow shrink-0">Loading</span>
                  <div className="h-px flex-1 bg-border overflow-hidden">
                    <motion.div
                      className="h-full origin-left"
                      style={{
                        background: "var(--gradient-signature)",
                        scaleX: progress,
                      }}
                    />
                  </div>
                  <span className="text-eyebrow tabular-nums w-8 text-right">{pct}</span>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-6 left-6 text-eyebrow"
          >
            {site.name}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 right-6 text-eyebrow"
          >
            Portfolio · v2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
