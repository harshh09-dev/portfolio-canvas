import Reveal from "@/components/motion/Reveal";
import { techGroups, techHeading } from "@/data/technologies";

/**
 * Tech stack — reproduction of `brand-three-area`: centred heading, then
 * labelled groups of neumorphic chips in a 6-up responsive grid.
 */
export default function TechStackSection() {
  return (
    <section
      id="stack"
      className="ref-scope"
      style={{ paddingBlock: "clamp(3rem, 6vw, 6rem) clamp(4rem, 7.5vw, 7.5rem)" }}
    >
      <div className="ref-container">
        <div className="mb-[clamp(2rem,3.75vw,3.75rem)] text-center">
          <h2 className="text-[clamp(1.5rem,2.4vw,2.5rem)]">{techHeading}</h2>
        </div>

        {techGroups.map((g) => (
          <div key={g.label} className="mb-6">
            <div className="mb-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.08em] opacity-55">
              {g.label}
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
              {g.items.map((t, i) => (
                <Reveal key={t.name} delay={0.03 * i} y={14}>
                  <div
                    className={`ref-chip ${t.dark ? "!bg-[var(--ref-ink)] shadow-[0_4px_4px_0_rgba(0,0,0,0.4)]" : ""}`}
                  >
                    <span
                      className={`text-[0.9375rem] font-semibold ${t.dark ? "text-white" : "text-[var(--ref-ink)]"}`}
                    >
                      {t.name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
