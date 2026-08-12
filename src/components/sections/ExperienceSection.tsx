import { useRef } from "react";
import { experience } from "@/data/experience";

/**
 * Experience — reproduction of `feature-three-area`: hairline-divided rows on
 * near-black, each revealing a cursor-following thumbnail on hover.
 */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-[1] bg-[#010406]"
      style={{ paddingBlock: "clamp(4rem, 7.5vw, 7.5rem)" }}
    >
      <div className="ref-container">
        {experience.map((row) => (
          <Row key={row.number} row={row} />
        ))}
      </div>
    </section>
  );
}

function Row({ row }: { row: (typeof experience)[number] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    const img = reveal.current;
    if (!el || !img) return;
    const rect = el.getBoundingClientRect();
    img.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
  };

  return (
    <div
      ref={wrap}
      onMouseMove={onMove}
      className="ref-exp-row group last:border-b last:border-[var(--ref-hairline-inv)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div className="flex flex-wrap items-center gap-x-[clamp(0px,10vw,227px)] gap-y-2">
          <span className="inline-block w-20 text-[clamp(1.25rem,2.6vw,3.5rem)] font-medium text-white transition-colors duration-300 group-hover:text-[var(--ref-accent)]">
            {row.number}
          </span>
          <span className="inline-block w-[clamp(0px,20vw,320px)] text-[clamp(1.25rem,2.6vw,3.5rem)] font-medium text-white max-md:w-auto">
            {row.org}
          </span>
          <span className="inline-block text-[clamp(1rem,2vw,2.25rem)] font-medium text-white/80">
            {row.role}
          </span>
        </div>
        <span className="inline-block text-[clamp(1.25rem,2.6vw,3.5rem)] font-medium text-white">
          {row.year}
        </span>
      </div>

      <div
        ref={reveal}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-[5] -mt-[150px] -ml-[150px] h-[374px] w-[290px] rounded-[10px] bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:hidden"
        style={{ backgroundImage: `url(${row.thumb})` }}
      />
    </div>
  );
}
