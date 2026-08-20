import Reveal from "@/components/motion/Reveal";
import { techGroups, techHeading } from "@/data/technologies";

/**
 * Tech stack — reproduction of `brand-three-area`: centred heading, then
 * labelled groups of neumorphic chips in a 6-up responsive grid. Each chip
 * carries the technology's real brand mark, which lifts on hover.
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
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {g.items.map((t, i) => {
                const Icon = t.icon;
                const inner = (
                  <span className="group flex items-center gap-2.5">
                    <Icon
                      aria-hidden
                      className={`shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 ${
                        t.dark ? "text-white" : "text-[var(--ref-ink)]"
                      }`}
                      size={20}
                    />
                    <span
                      className={`truncate text-[0.9375rem] font-semibold ${
                        t.dark ? "text-white" : "text-[var(--ref-ink)]"
                      }`}
                    >
                      {t.name}
                    </span>
                  </span>
                );
                return (
                  <Reveal key={t.name} delay={0.03 * i} y={14}>
                    <div
                      className={`ref-chip min-w-0 transition-transform duration-300 hover:-translate-y-0.5 ${
                        t.dark ? "!bg-[var(--ref-ink)] shadow-[0_4px_4px_0_rgba(0,0,0,0.4)]" : ""
                      }`}
                    >
                      {t.url ? (
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="min-w-0">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
