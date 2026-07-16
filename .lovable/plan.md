# Portfolio Migration & Phase 1 Plan

## 0. Context

Your uploaded portfolio (`a-verse.zip`) is **Vite + React 18 + react-router-dom v6 + Tailwind v3 + shadcn**, using Supabase, Framer Motion, GSAP, Three.js/R3F, Swiper, and a custom Loader/PageTransition. It has **13 pages** and ~30 components.

This Lovable project is **TanStack Start (SSR) + React 19 + Tailwind v4 + shadcn (v4 tokens)**. All routing must live under `src/routes/` via `createFileRoute`. `src/pages/` is unreachable here.

The plan below is a **two-part deliverable**: (A) full migration blueprint (do not fear the scope — I'll execute it phase-by-phase, each ending in a green build) and (B) Phase 1 concrete work, which is what I'll implement immediately after your approval.

---

## A. Migration Blueprint (whole product)

### A1. Files that will be modified or created

**Routing (new files under `src/routes/`, replaces `src/App.tsx` + `src/pages/`):**

```
src/routes/__root.tsx         (replace: global shell, Navbar, Footer, Loader, providers, HeadContent)
src/routes/index.tsx          (rewrite placeholder → Home)
src/routes/about.tsx
src/routes/blog.tsx
src/routes/blog.$id.tsx
src/routes/contact.tsx
src/routes/creative.tsx
src/routes/creative.photography.tsx
src/routes/creative.writing.tsx
src/routes/creative.experiments.tsx
src/routes/projects.$id.tsx
src/routes/signature-book.tsx
src/routes/links.tsx
src/routes/sitemap[.]xml.ts
```

Each route gets its own `head()` (title, description, og:*, twitter:*). `__root.tsx` keeps global meta only; leaf routes own their og:image.

**Design system (new):**

```
src/styles/tokens.css         (color, spacing, radius, shadow, motion, z-index, breakpoint tokens)
src/styles/typography.css     (fluid type scale + font-face loaded via <link>)
src/styles.css                (imports tokens + typography; @theme inline mapping; @utility helpers)
src/lib/motion.ts             (shared easings, durations, GSAP defaults, reduced-motion helper)
src/hooks/useLenis.ts         (client-only smooth scroll)
src/hooks/useGsap.ts          (wraps @gsap/react useGSAP with ScrollTrigger safety + cleanup)
src/hooks/useReducedMotion.ts
src/hooks/useBreakpoint.ts    (replaces ad-hoc use-mobile logic)
src/components/primitives/    (Container, Section, Heading, Eyebrow, Prose, Grid — token consumers)
src/components/motion/        (Reveal, SplitText, Magnetic, ParallaxImage, PageTransition)
```

**Components (ported & refactored, not rewritten):**

- `Navbar.tsx`, `Footer.tsx`, `Loader.tsx`, `PageTransition.tsx` → adapted to TanStack Router links + SSR-safe (browser APIs in `useEffect` / `<ClientOnly>`).
- `sections/*` (Hero, About, Projects, Skills, Contact, Creative, WhatIDo, LyricsAndLogic) → refactored to consume tokens + primitives; content preserved verbatim.
- `projects/*` (project-card, sticky-info-panel, projects-section, mockups, projects-data) → kept; visual layer aligned to tokens; sticky-scroll experience preserved and upgraded.
- `RecentSignatures`, `SignatureCard`, `SpotifyCard`, `GithubCard`, `ScrollReveal` → SSR-safe versions; Supabase reads via TanStack Query.

**Data / integrations:**

- `src/lib/supabase.ts` → recreated as a browser publishable client (per Cloud rules); reads use `@tanstack/react-query`. Guestbook writes stay client-side against RLS-protected tables.
- `src/hooks/useGuestbook.ts` → migrated to React Query mutation.
- `src/hooks/use-toast.ts` → **removed**; migrate call sites to `sonner` (`toast()` from `sonner`, `<Toaster />` from `@/components/ui/sonner`) as required by this stack.

**Removed / not carried over:**

- `src/App.tsx`, `src/main.tsx`, `src/pages/`, `postcss.config.js` (Tailwind v4 uses Lightning CSS), `tailwind.config.js` if uploaded, `tailwindcss-animate` (v4 uses `tw-animate-css`, already available).
- `react-router-dom` dependency (replaced by `@tanstack/react-router`, already installed).

### A2. New dependencies

Only add if not already present in this project:

- `gsap`, `@gsap/react` — anchor animation stack
- `lenis` — smooth scroll (client-only, `useEffect`)
- `split-type` — text reveal
- `framer-motion` — page transitions + micro-interactions (already used in your code)
- `@supabase/supabase-js` — guestbook data
- `swiper` — only if the photography carousel is preserved as-is; otherwise replaced with a lighter custom scroller

I will **not** port: `three`, `@react-three/fiber`, `@react-three/drei` unless a specific section requires them (audit will confirm). If retained, they'll be dynamic-imported behind `<ClientOnly>` to keep SSR safe and bundle small.

### A3. Routing changes

- `BrowserRouter + Routes` → file-based `createFileRoute`.
- `useLocation`/`useNavigate` from `react-router-dom` → `@tanstack/react-router` equivalents.
- `<Link to={\`/projects/${id}}>`→`<Link to="/projects/$id" params={{ id }}>` (type-safe).
- `AnimatePresence` page transitions preserved via a `<PageTransition>` wrapper inside `__root.tsx` keyed on `useRouterState({ select: s => s.location.pathname })`.
- Every route gets `notFoundComponent` + `errorComponent`; `__root.tsx` gets a global `notFoundComponent`.

### A4. Design system changes (the core of Phase 1)

**Tokens (in `src/styles.css`, oklch):**

- Color: `--bg`, `--bg-elevated`, `--bg-inset`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--border-strong`, `--accent`, `--accent-fg`, `--ring`, plus semantic `--surface-*` for cards. Dark theme is the primary; light theme values authored in parallel behind `.light` (your current site is dark-first — preserved).
- Radius: `--radius-xs/sm/md/lg/xl/2xl` (2 / 6 / 10 / 14 / 20 / 28 px).
- Shadow: `--shadow-sm/md/lg/glow` with layered soft shadows (no default black drops).
- Motion: `--ease-out-expo`, `--ease-in-out-quart`, `--dur-fast`(150ms), `--dur-base`(300ms), `--dur-slow`(600ms), `--dur-scroll`(900ms).
- Z-index: `--z-nav`(50), `--z-modal`(60), `--z-toast`(70).
- Spacing: consume Tailwind's default 4px scale plus `--space-section-*` for section rhythm (`sm/md/lg/xl` → 64/96/128/160px).
- Breakpoints (real four, not three): `sm 480 / md 768 / lg 1080 / xl 1440`.

**Typography:**

- Fonts loaded via `<link>` in `__root.tsx` head (never `@import` a remote URL in v4). Pair: **Instrument Serif** (display/editorial, matches your existing "Signature" / "insights i share" script feel) + **Geist Sans** (UI/body) + **Geist Mono** (code/eyebrows). This preserves the editorial, serif-accented voice already visible in your screenshots.
- Fluid scale: `--fs-eyebrow`, `--fs-body`, `--fs-lead`, `--fs-h4/h3/h2/h1/display` with `clamp(...)`.
- Line-height & tracking tokens per role.
- `@utility text-display`, `text-h1`, `text-eyebrow`, `text-lead`, `text-body`, `text-mono` for consumption.

**Primitives:**

- `<Container>` — max-widths per breakpoint (mobile 100% - 32, tablet 704, laptop 1080, desktop 1280).
- `<Section spacing="lg|xl">` — vertical rhythm.
- `<Heading level="display|h1|h2|h3">`, `<Eyebrow />`, `<Prose />` — locks in hierarchy.
- `<Grid cols={12|6|4}>` — responsive editorial grid.

All components stop hardcoding `text-white`, `bg-black`, `bg-[#…]`, arbitrary Tailwind numeric font sizes; they consume tokens and utilities only. A codemod pass sweeps existing sections.

### A5. Motion architecture

- Global Lenis smooth scroll (mounted in `__root.tsx`, disabled when `prefers-reduced-motion: reduce`).
- Central `motion.ts` exports easings, durations, and a `withReducedMotion(config)` helper.
- Every ScrollTrigger is created inside `useGsap` (wrapping `@gsap/react`'s `useGSAP`) which auto-cleans on unmount and refreshes on route change.
- Rules I'll enforce project-wide:
  - Purposeful motion only — no default fade-up on every element.
  - Rhythm: hero (dramatic reveal) → about (calm) → projects (pinned sticky) → skills (spatial) → contact (magnetic).
  - `transform`/`opacity` only for 60fps.
  - `will-change` scoped, added on scroll-enter, removed on leave.

Cross-section reveals: `<Reveal>` (opacity/translate/blur), `<SplitText>` (line/word/char), `<ParallaxImage>`, `<Magnetic>` — one implementation each, tokenized.

### A6. Phase roadmap & risks


| Phase             | Deliverable                                                                                   | Risk                             | Mitigation                                                    |
| ----------------- | --------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| **1 (this turn)** | Audit, tokens, typography, spacing, colors, 4-breakpoint strategy, Hero redesign, build green | Tailwind v3 → v4 semantic drift  | Rebuild tokens from scratch; do not port `tailwind.config.js` |
| 2                 | About page                                                                                    | Portrait asset sourcing          | Use existing assets from your zip; generate only if missing   |
| 3                 | Projects (sticky-scroll showcase + `/projects/$id` detail)                                    | Sticky pin + Lenis interaction   | Central `useGsap` handles refresh + Lenis wheel sync          |
| 4                 | Skills + Contact + Creative Corner + subroutes                                                | Three.js payload                 | Dynamic import behind `<ClientOnly>` or drop if unused        |
| 5                 | Blog + BlogPost + Signature Book + Links                                                      | Supabase SSR                     | Client-side Query only; loaders stay static                   |
| 6                 | Motion polish, page transitions, magnetic/micro-interactions                                  | Route-change ScrollTrigger leaks | `useGsap` cleanup + `ScrollTrigger.refresh()` on nav          |
| 7                 | A11y + Lighthouse + SEO (per-route head, sitemap, robots) + final QA                          | Regressions                      | Playwright screenshot pass per breakpoint                     |


Every phase ends with `bun run build` green + zero TS/ESLint errors before I move on.

---

Before starting Phase 1:

- Keep the entire Home page functional. Do not hide or temporarily remove any existing Home sections. Redesign only the Hero in Phase 1.

- Use only the content, branding, project data, and assets from my uploaded portfolio. Do not introduce placeholder names, text, or template content.

- Do not replace fonts or change the visual identity without first auditing the existing design and explaining the reasoning.

- Do not remove any dependency or feature unless it is confirmed to be completely unused.

- After completing Phase 1, stop, present the result, and wait for my approval before continuing to Phase 2.  
  
B. Phase 1 — What I execute after your approval

### B1. Audit output (delivered as `AUDIT.md` at repo root)

Concrete inventory of inconsistencies across your uploaded code: mixed font families and sizes (Playfair vs. Instrument Serif vs. Inter), hardcoded hex/whites in ~40 spots, ad-hoc paddings (`py-24`, `py-32`, `py-40` used interchangeably), duplicated card styles across `AboutPreview`, `WhatIDo`, `SkillsSection`, inconsistent radii, dark-only assumptions in some CSS, `use-toast` vs. `sonner` overlap, `postcss.config.js` incompatible with v4, `tailwindcss-animate` incompatible, `react-router-dom` imports.

### B2. Concrete files created / modified in Phase 1

Created:

```
AUDIT.md
src/styles.css                        (rewritten: tokens + @theme inline + typography utilities)
src/lib/motion.ts
src/hooks/useReducedMotion.ts
src/hooks/useBreakpoint.ts
src/hooks/useLenis.ts                 (mounted in __root only; no-op if reduced motion)
src/components/primitives/Container.tsx
src/components/primitives/Section.tsx
src/components/primitives/Heading.tsx
src/components/primitives/Eyebrow.tsx
src/components/motion/Reveal.tsx
src/components/motion/SplitText.tsx
src/components/layout/Navbar.tsx      (ported, TanStack Router links, mobile drawer for <lg)
src/components/layout/Footer.tsx      (ported, tokenized)
src/components/sections/Hero.tsx      (redesigned — see B4)
src/routes/index.tsx                  (Home: renders only Hero in Phase 1; About/Projects/etc. stubs kept but hidden until Phase 2+ — home still builds and looks intentional)
```

Modified:

```
src/routes/__root.tsx                 (Navbar + Footer + Lenis + PageTransition + per-project title/desc/og:*)
```

Dependencies added if missing: `gsap`, `@gsap/react`, `lenis`, `split-type`, `framer-motion`.

### B3. Responsive strategy — four dedicated layouts (locked in Phase 1, honored by all later phases)

- **Mobile (≤ 479)**: portrait hero, stacked, thumb nav (bottom-anchored menu drawer), single-column, 24px gutters, 44×44 targets, no Lenis (native scroll), simplified motion (opacity only).
- **Tablet (480–767 → up to 1079)**: hybrid 2-column blocks, top nav with condensed labels, 32px gutters, full motion, no parallax on portrait images (retained on landscape).
- **Laptop (1080–1439)**: editorial 12-column, generous whitespace, full sticky-scroll showcase, standard Lenis multiplier.
- **Desktop (≥ 1440)**: magazine-scale display type, max container 1280, larger parallax range, oversized hero mark, Lenis with slightly slower lerp for luxury feel.

### B4. Hero redesign (Phase 1's only visual section)

Preserves your voice: "Creative Engineer · Building the Future", "I design and build products that deliver real impact", "Hello, I'm Parth Sharma", "Full-Stack Developer" pill, "Let's Connect" + email.

- **Desktop / Laptop**: full-viewport editorial hero. Left: eyebrow ("Creative Engineer"), display headline in Instrument Serif with the word *impact* italicized (matching your current design), name + role pill, two CTAs (primary "Let's Connect", ghost "See work"), status dot. Right: subtle horizon/gradient composition (using existing hero background if present in zip; otherwise a token-driven CSS gradient — no stock illustration). Scroll indicator + magnetic CTA.
- **Tablet**: stacked; display drops one step; portrait-friendly layout.
- **Mobile**: full-bleed, portrait composition, single CTA + inline secondary link, tap targets ≥44px, status pill + eyebrow above.
- Motion: SplitText line reveal (staggered, `--ease-out-expo`, 700ms), CTA magnetic hover on ≥lg, subtle blur→sharp on hero background, respects `prefers-reduced-motion` (opacity-only fallback).

### B5. Validation before I hand back

- `bun run build` green.
- `bun run lint` clean.
- Playwright screenshot at 375 / 768 / 1280 / 1600 widths of the Home route, attached in the reply.
- No hydration warnings in console.
- Report: files changed, tokens added, bundle delta, remaining roadmap.

---

## Approval

Reply **"go"** (or with tweaks) and I'll execute Phase 1 exactly as scoped above. I will not touch About / Projects / Skills / Contact / motion for those sections until Phase 1 lands green and you approve Phase 2.