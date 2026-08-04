import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { services, whatIDo, type CraftKind } from "@/data/services";

/* ————————————————————————————————————————————————
   Abstract monochrome illustrations, one per category.
   No color: strokes and fills use currentColor / foreground.
   ———————————————————————————————————————————————— */

function Illustration({ kind }: { kind: CraftKind }) {
  const stroke = "currentColor";
  switch (kind) {
    case "design":
      return (
        <svg viewBox="0 0 120 72" className="h-full w-full text-foreground/70" aria-hidden>
          <line x1="16" y1="26" x2="86" y2="26" stroke={stroke} strokeWidth="1.5" />
          <line x1="16" y1="38" x2="60" y2="38" stroke={stroke} strokeWidth="1.5" opacity="0.45" />
          <path d="M74 40 L74 60 L80 54 L84 62 L88 60 L84 52 L92 52 Z" fill={stroke} opacity="0.85" />
        </svg>
      );
    case "development":
      return (
        <svg viewBox="0 0 120 72" className="h-full w-full text-foreground/70" aria-hidden>
          {[22, 32, 42, 52].map((y, i) => (
            <g key={y}>
              <line x1="18" y1={y} x2={18 + [10, 6, 14, 8][i]} y2={y} stroke={stroke} strokeWidth="2" opacity="0.4" />
              <line
                x1={34 + i * 4}
                y1={y}
                x2={34 + i * 4 + [50, 36, 44, 28][i]}
                y2={y}
                stroke={stroke}
                strokeWidth="2"
                opacity="0.75"
              />
            </g>
          ))}
        </svg>
      );
    case "interactions":
      return (
        <svg viewBox="0 0 120 72" className="h-full w-full text-foreground/70" aria-hidden>
          {[
            [22, 16],
            [64, 16],
            [22, 42],
            [64, 42],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="34"
              height="18"
              rx="3"
              fill={stroke}
              opacity={i === 0 ? 0.75 : 0.28}
            />
          ))}
        </svg>
      );
    case "creative":
      return (
        <svg viewBox="0 0 120 72" className="h-full w-full text-foreground/70" aria-hidden>
          <path
            d="M12 44 C28 14, 44 66, 60 36 S 92 14, 108 32"
            fill="none"
            stroke={stroke}
            strokeWidth="1.75"
          />
        </svg>
      );
  }
}

function CraftCard({ service, isActive }: { service: (typeof services)[number]; isActive: boolean }) {
  return (
    <div className="w-[78vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none">
      <div
        className={`rounded-2xl bg-card p-3 transition-colors duration-300 ${
          isActive ? "border-2 border-foreground" : "border border-border hover:border-border-strong"
        }`}
      >
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 px-1 pb-2.5">
          <span className="h-2 w-2 rounded-full bg-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
        </div>
        <div className="aspect-[5/3] w-full overflow-hidden rounded-lg border border-border bg-muted p-3">
          <Illustration kind={service.id} />
        </div>
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">{service.label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
        {service.tagline[0]}
        <br />
        {service.tagline[1]}
      </p>
    </div>
  );
}

export default function WhatIDo() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(services.findIndex((s) => s.active) ?? 0);

  const scrollBy = (dir: -1 | 1) => {
    const el = rowRef.current;
    const next = Math.min(services.length - 1, Math.max(0, page + dir));
    setPage(next);
    if (!el) return;
    const card = el.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="section">
      <div className="container-editorial">
        <div className="section-header">
          <Reveal>
            <p className="text-eyebrow">{whatIDo.eyebrow}</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            {whatIDo.headline}
          </SplitReveal>
        </div>

        <div className="relative">
          {/* Flanking arrows */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="absolute -left-1 top-[28%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-fg transition-colors hover:bg-foreground hover:text-background lg:-left-6"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="absolute -right-1 top-[28%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-fg transition-colors hover:bg-foreground hover:text-background lg:-right-6"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={rowRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-10"
          >
            {services.map((s, i) => (
              <CraftCard key={s.id} service={s} isActive={i === page} />
            ))}
          </div>
        </div>

        {/* Pagination pills */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to ${s.label}`}
              onClick={() => {
                setPage(i);
                const card = rowRef.current?.children[i] as HTMLElement | undefined;
                card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-7 bg-foreground" : "w-1.5 bg-foreground/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
