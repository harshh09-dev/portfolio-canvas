import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { services, type DeviceKind, type Service } from "@/data/services";

// ————————————————————————————————————————————————
// Compact device frames — pure SVG-ish HTML, no external images
// Each intentionally emphasizes what design changes at that size.
// ————————————————————————————————————————————————

function GradientMock({ variant }: { variant: DeviceKind }) {
  const grid = {
    desktop: (
      <div className="w-full h-full p-3 grid grid-cols-6 grid-rows-4 gap-2">
        <div className="col-span-1 row-span-4 rounded-md bg-white/5 border border-white/10" />
        <div className="col-span-5 row-span-1 rounded-md bg-white/10 border border-white/10 flex items-center px-3 gap-1">
          <div className="h-2 w-2 rounded-full bg-white/40" />
          <div className="h-2 w-2 rounded-full bg-white/25" />
          <div className="h-2 w-2 rounded-full bg-white/15" />
          <div className="ml-3 h-2 w-24 rounded-full bg-white/20" />
        </div>
        <div className="col-span-2 row-span-2 rounded-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10" />
        <div className="col-span-3 row-span-3 rounded-md bg-white/[0.04] border border-white/10" />
        <div className="col-span-2 row-span-1 rounded-md bg-white/[0.06] border border-white/10" />
      </div>
    ),
    laptop: (
      <div className="w-full h-full p-3 flex flex-col gap-2">
        <div className="h-3 flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <div className="ml-auto h-2 w-16 rounded-full bg-white/15" />
        </div>
        <div className="h-8 rounded bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
        <div className="grid grid-cols-3 gap-2 flex-1">
          <div className="rounded bg-white/[0.06] border border-white/10" />
          <div className="rounded bg-white/[0.06] border border-white/10" />
          <div className="rounded bg-white/[0.06] border border-white/10" />
        </div>
        <div className="h-6 rounded bg-white/5 border border-white/10" />
      </div>
    ),
    tablet: (
      <div className="w-full h-full p-4 flex flex-col gap-3">
        <div className="h-2.5 w-24 rounded-full bg-white/40" />
        <div className="h-2 w-32 rounded-full bg-white/20" />
        <div className="mt-2 h-16 rounded-lg bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10" />
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-full rounded-full bg-white/15" />
          <div className="h-1.5 w-11/12 rounded-full bg-white/15" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
        </div>
      </div>
    ),
    mobile: (
      <div className="w-full h-full p-2.5 flex flex-col gap-2">
        <div className="mx-auto h-1 w-10 rounded-full bg-white/20" />
        <div className="h-2 w-16 rounded-full bg-white/40" />
        <div className="h-14 rounded-lg bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10" />
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-white/15" />
          <div className="h-1.5 w-10/12 rounded-full bg-white/15" />
        </div>
        <div className="mt-auto grid grid-cols-4 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 rounded-md bg-white/[0.06] border border-white/10" />
          ))}
        </div>
      </div>
    ),
  }[variant];

  return (
    <div
      className="w-full h-full"
      style={{
        background:
          "radial-gradient(120% 100% at 0% 0%, color-mix(in oklch, var(--accent-pink) 18%, transparent), transparent 60%), radial-gradient(120% 100% at 100% 100%, color-mix(in oklch, var(--accent-blue) 16%, transparent), transparent 60%), var(--bg-inset)",
      }}
    >
      {grid}
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
          <GradientMock variant="desktop" />
        </div>
        <div className="h-4 bg-surface border-x border-border" />
        <div className="mx-auto h-2 rounded-b-2xl bg-surface-2 border border-t-0 border-border" style={{ width: "80%" }} />
      </div>
    );
  }
  if (device === "laptop") {
    return (
      <div className="w-full mx-auto" style={{ maxWidth: "540px" }}>
        <div
          className="rounded-t-xl border border-b-0 border-border overflow-hidden bg-bg"
          style={{ aspectRatio: "16 / 10" }}
        >
          <GradientMock variant="laptop" />
        </div>
        <div
          className="mx-auto rounded-b-xl bg-surface border border-t-0 border-border"
          style={{ height: "10px", width: "110%", marginLeft: "-5%" }}
        />
      </div>
    );
  }
  if (device === "tablet") {
    return (
      <div className="w-full mx-auto" style={{ maxWidth: "300px" }}>
        <div
          className="rounded-[28px] border-[10px] border-surface-2 bg-bg overflow-hidden shadow-elegant"
          style={{ aspectRatio: "4 / 5.6" }}
        >
          <GradientMock variant="tablet" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto" style={{ maxWidth: "180px" }}>
      <div
        className="rounded-[36px] border-[8px] border-surface-2 bg-bg overflow-hidden shadow-elegant relative"
        style={{ aspectRatio: "9 / 19" }}
      >
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full bg-black/80 z-10" />
        <GradientMock variant="mobile" />
      </div>
    </div>
  );
}

function ServiceRow({ s, index }: { s: Service; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <Reveal>
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-16 lg:py-24 ${flipped ? "" : ""}`}
      >
        <div className={`lg:col-span-5 order-2 ${flipped ? "lg:order-2" : "lg:order-1"}`}>
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-eyebrow tabular-nums"
              style={{ color: "var(--fg-subtle)" }}
            >
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
        <div className={`lg:col-span-7 order-1 ${flipped ? "lg:order-1" : "lg:order-2"}`}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute inset-0 -m-10 blur-3xl opacity-30 pointer-events-none"
              style={{ background: "var(--gradient-signature-soft)" }}
            />
            <div className="relative">
              <DeviceFrame device={s.device} />
              <p
                className="text-center mt-6 text-eyebrow"
                style={{ color: "var(--fg-subtle)" }}
              >
                {s.medium}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}

export default function WhatIDo() {
  return (
    <section className="section relative overflow-hidden">
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
          {services.map((s, i) => (
            <ServiceRow key={s.num} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
