import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { services, type DeviceKind, type Service } from "@/data/services";

/* ————————————————————————————————————————————————
   Realistic mock content per device — no abstract placeholders.
   Desktop = analytics dashboard, Laptop = marketing page,
   Tablet = long-form reader, Mobile = feed app.
   ———————————————————————————————————————————————— */

function DesktopUI() {
  return (
    <div className="w-full h-full flex text-[10px]" style={{ background: "oklch(0.14 0 0)", color: "oklch(0.85 0 0)" }}>
      {/* sidebar */}
      <div className="w-[18%] h-full border-r border-white/10 p-2 flex flex-col gap-1.5">
        <div className="h-2 w-10 rounded-full bg-white/50" />
        {["Overview", "Users", "Revenue", "Alerts"].map((t, i) => (
          <div key={t} className={`px-2 py-1 rounded ${i === 1 ? "bg-white/10 text-white" : "text-white/60"}`}>
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-5 border-b border-white/10 flex items-center px-3 gap-2">
          <div className="h-1.5 w-16 rounded-full bg-white/30" />
          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <div className="h-1.5 w-10 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2 p-3">
          {[
            { k: "MRR", v: "$42.8k", t: "+12.4%" },
            { k: "Users", v: "8,204", t: "+3.1%" },
            { k: "Churn", v: "1.9%", t: "-0.3%" },
          ].map((s) => (
            <div key={s.k} className="rounded border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-0.5">
              <div className="text-[8px] uppercase tracking-wider text-white/50">{s.k}</div>
              <div className="text-sm font-medium text-white">{s.v}</div>
              <div className="text-[8px] text-emerald-300">{s.t}</div>
            </div>
          ))}
          <div className="col-span-2 row-span-2 rounded border border-white/10 bg-white/[0.03] p-2">
            <div className="h-1.5 w-14 rounded-full bg-white/25 mb-2" />
            <svg viewBox="0 0 100 40" className="w-full h-[calc(100%-12px)]">
              <polyline
                points="0,32 12,26 22,28 34,18 46,20 58,10 70,14 82,6 100,8"
                fill="none"
                stroke="oklch(0.88 0.06 12)"
                strokeWidth="1"
              />
              <polyline
                points="0,36 12,32 22,34 34,28 46,30 58,22 70,24 82,20 100,18"
                fill="none"
                stroke="oklch(0.82 0.06 230)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </svg>
          </div>
          <div className="rounded border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-1">
            <div className="h-1 w-full rounded-full bg-white/20" />
            <div className="h-1 w-4/5 rounded-full bg-white/15" />
            <div className="h-1 w-3/5 rounded-full bg-white/15" />
            <div className="h-1 w-2/5 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LaptopUI() {
  return (
    <div className="w-full h-full flex flex-col text-[10px]" style={{ background: "oklch(0.98 0 0)", color: "oklch(0.15 0 0)" }}>
      <div className="h-6 border-b border-black/10 flex items-center px-3 gap-3">
        <div className="h-2 w-2 rounded-full bg-black/50" />
        <div className="h-1.5 w-10 rounded-full bg-black/70" />
        <div className="ml-auto flex gap-2">
          {["Work", "About", "Contact"].map((t) => (
            <div key={t} className="text-[8px] text-black/60">
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="text-[7px] tracking-[0.24em] uppercase text-black/40">Founder site</div>
        <div className="text-lg font-serif font-light leading-tight tracking-tight text-black/90">
          Build a company<br />people remember.
        </div>
        <div className="mt-1 h-1 w-1/2 rounded-full bg-black/15" />
        <div className="h-1 w-2/5 rounded-full bg-black/10" />
        <div className="mt-auto grid grid-cols-3 gap-2">
          <div className="aspect-video rounded bg-black/8 border border-black/10" />
          <div className="aspect-video rounded bg-black/6 border border-black/10" />
          <div className="aspect-video rounded bg-black/8 border border-black/10" />
        </div>
      </div>
    </div>
  );
}

function TabletUI() {
  return (
    <div className="w-full h-full flex flex-col text-[10px] p-4 gap-2" style={{ background: "oklch(0.14 0 0)", color: "oklch(0.85 0 0)" }}>
      <div className="text-[7px] tracking-[0.24em] uppercase text-white/40">Reading · Essay</div>
      <div className="font-serif text-base leading-tight tracking-tight text-white">
        The quiet architecture of a good page.
      </div>
      <div className="h-px bg-white/15 my-1" />
      <div className="flex flex-col gap-1">
        {[95, 90, 88, 82, 92, 86, 80, 60].map((w, i) => (
          <div key={i} className="h-1 rounded-full bg-white/15" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="text-[8px] italic text-white/60 mt-1">— on typography, patience, and the reader's rhythm</div>
    </div>
  );
}

function MobileUI() {
  return (
    <div className="w-full h-full flex flex-col text-[9px]" style={{ background: "oklch(0.14 0 0)", color: "oklch(0.85 0 0)" }}>
      <div className="pt-4 px-2.5 pb-2 flex items-center gap-1.5">
        <div className="text-[9px] font-medium text-white">Pocket</div>
        <div className="ml-auto h-4 w-4 rounded-full bg-white/15" />
      </div>
      <div className="flex-1 flex flex-col gap-1.5 px-2">
        {[
          { t: "Anjali replied to your commit", s: "2m" },
          { t: "New follower on GitHub", s: "12m" },
          { t: "Vercel deployment succeeded", s: "1h" },
        ].map((n, i) => (
          <div key={i} className="rounded-md bg-white/[0.06] border border-white/10 p-1.5 flex gap-1.5">
            <div className="h-4 w-4 rounded-full bg-white/25 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[8px] leading-tight text-white truncate">{n.t}</div>
              <div className="text-[7px] text-white/50">{n.s} ago</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1 p-1.5 border-t border-white/10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-4 rounded ${i === 0 ? "bg-white/25" : "bg-white/8"}`} />
        ))}
      </div>
    </div>
  );
}

function DeviceFrame({ device }: { device: DeviceKind }) {
  if (device === "desktop") {
    return (
      <div className="w-full mx-auto" style={{ maxWidth: "620px" }}>
        <div
          className="rounded-t-xl border border-b-0 border-border overflow-hidden bg-bg"
          style={{ aspectRatio: "16 / 10" }}
        >
          <DesktopUI />
        </div>
        <div className="h-4 bg-surface border-x border-border" />
        <div className="mx-auto h-2 rounded-b-2xl bg-surface-2 border border-t-0 border-border" style={{ width: "80%" }} />
      </div>
    );
  }
  if (device === "laptop") {
    return (
      <div className="w-full" style={{ maxWidth: "560px" }}>
        <div
          className="rounded-t-xl border border-b-0 border-border overflow-hidden bg-bg"
          style={{ aspectRatio: "16 / 10" }}
        >
          <LaptopUI />
        </div>
        <div
          className="rounded-b-xl bg-surface border border-t-0 border-border"
          style={{ height: "10px", width: "110%", marginLeft: "-5%" }}
        />
      </div>
    );
  }
  if (device === "tablet") {
    return (
      <div className="w-full mx-auto" style={{ maxWidth: "260px" }}>
        <div
          className="rounded-[28px] border-[10px] border-surface-2 bg-bg overflow-hidden shadow-elegant"
          style={{ aspectRatio: "4 / 5.6" }}
        >
          <TabletUI />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full" style={{ maxWidth: "150px", marginLeft: "auto", marginRight: 0 }}>
      <div
        className="rounded-[32px] border-[7px] border-surface-2 bg-bg overflow-hidden shadow-elegant relative"
        style={{ aspectRatio: "9 / 19" }}
      >
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-black/80 z-10" />
        <MobileUI />
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————
   Per-device composition — each block is deliberately different.
   ———————————————————————————————————————————————— */

function ServiceCopy({ s }: { s: Service }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-eyebrow tabular-nums" style={{ color: "var(--fg-subtle)" }}>
          {s.num}
        </span>
        <div className="h-px w-10 bg-border" />
        <span className="text-eyebrow">{s.device}</span>
      </div>
      <h3
        className="text-fg mb-3"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1.02,
          fontVariationSettings: '"SOFT" 100',
        }}
      >
        {s.title}
      </h3>
      <p className="accent-quiet mb-5" style={{ fontSize: "1.25rem" }}>
        {s.tagline}
      </p>
      <p className="text-lead mb-6 max-w-md">{s.description}</p>
      <div className="flex flex-wrap gap-2">
        {s.tools.map((t) => (
          <span
            key={t}
            className="text-xs uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-border text-fg-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ s }: { s: Service }) {
  const framed = (children: React.ReactNode) => (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {children}
      <p className="text-center mt-6 text-eyebrow" style={{ color: "var(--fg-subtle)" }}>
        {s.medium}
      </p>
    </motion.div>
  );

  // 01 Desktop — wide bleed, copy L, mockup dominant R
  if (s.device === "desktop") {
    return (
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-16 lg:py-24">
          <div className="lg:col-span-4"><ServiceCopy s={s} /></div>
          <div className="lg:col-span-8">{framed(<DeviceFrame device="desktop" />)}</div>
        </div>
      </Reveal>
    );
  }

  // 02 Laptop — mockup bleeds off left edge
  if (s.device === "laptop") {
    return (
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-16 lg:py-24">
          <div className="lg:col-span-7 order-1 lg:-ml-16 lg:pr-4">
            {framed(<DeviceFrame device="laptop" />)}
          </div>
          <div className="lg:col-span-5 order-2"><ServiceCopy s={s} /></div>
        </div>
      </Reveal>
    );
  }

  // 03 Tablet — centered stack, generous negative space
  if (s.device === "tablet") {
    return (
      <Reveal>
        <div className="flex flex-col items-center text-center py-20 lg:py-32 max-w-3xl mx-auto">
          <div className="mb-14">{framed(<DeviceFrame device="tablet" />)}</div>
          <div className="max-w-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-eyebrow tabular-nums" style={{ color: "var(--fg-subtle)" }}>
                {s.num}
              </span>
              <div className="h-px w-10 bg-border" />
              <span className="text-eyebrow">{s.device}</span>
            </div>
            <h3
              className="text-fg mb-3"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                fontVariationSettings: '"SOFT" 100',
              }}
            >
              {s.title}
            </h3>
            <p className="accent-quiet mb-5" style={{ fontSize: "1.25rem" }}>{s.tagline}</p>
            <p className="text-lead mb-6 mx-auto">{s.description}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {s.tools.map((t) => (
                <span key={t} className="text-xs uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-border text-fg-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    );
  }

  // 04 Mobile — compact, mockup smaller and right/bottom-anchored
  return (
    <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end py-14 lg:py-20">
        <div className="lg:col-span-7"><ServiceCopy s={s} /></div>
        <div className="lg:col-span-5 flex justify-end">
          {framed(<DeviceFrame device="mobile" />)}
        </div>
      </div>
    </Reveal>
  );
}

export default function WhatIDo() {
  return (
    <section className="section relative overflow-hidden" style={{ scrollMarginTop: "6rem" }}>
      <div className="container-editorial">
        <div className="section-header">
          <Reveal>
            <p className="text-eyebrow">What I do</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            Designed for the screen it lives on.
          </SplitReveal>
          <Reveal delay={0.2}>
            <p className="text-lead max-w-xl mx-auto">
              Not responsive theatre — four disciplines, four canvases, each with its
              own rhythm, ergonomics, and expectations.
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-border/50">
          {services.map((s) => (
            <ServiceRow key={s.num} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
