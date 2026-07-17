
# Phase 1 Refinement Plan

Goal: elevate the migrated portfolio from "working" to "handcrafted premium." No new routes yet — Home only. When this bar is met, we move to Phase 2.

## 1. Design System — make it visible

**src/styles.css** — single source of truth, applied everywhere.

- Rhythm tokens: `--section-y` (clamp 96–160px), `--section-y-tight` (64–96px), `--container-max: 1280px`, `--container-pad` (clamp 20–48px), `--stack-lg/md/sm`.
- Typography scale (fluid clamp, one system):
  - `--fs-display`: clamp(4rem, 12vw, 12rem) — Instrument Serif, display only
  - `--fs-h1`: clamp(2.5rem, 5vw, 4.5rem)
  - `--fs-h2`: clamp(2rem, 4vw, 3.25rem)
  - `--fs-h3`: clamp(1.5rem, 2.5vw, 2rem)
  - `--fs-body`: 1rem–1.125rem, `--fs-eyebrow`: 0.75rem tracking .16em uppercase
- Font families: Instrument Serif (display), Outfit (sans body/headings), JetBrains Mono (eyebrow/labels). Loaded via `<link>` in `__root.tsx`.
- Colors (oklch): `--bg`, `--surface`, `--surface-2`, `--fg`, `--fg-muted`, `--border`, `--border-strong`, `--accent-signature` (ember), `--accent-mint`, `--accent-pink`, `--accent-cool`.
- Utility classes: `.section` (padding-block: var(--section-y)), `.container-editorial` (max-width + pad), `.eyebrow`, `.display`, `.h1/h2/h3`, `.prose-editorial`, `.divider-hair`.
- Shadcn HSL bridge kept intact.

Every section refactored to use `<section className="section"><div className="container-editorial">`. No more ad-hoc py-* / max-w-* / px-*.

## 2. Hero — refined

- Height: `min-h-[88svh]` on laptop (was 100svh), `min-h-[100svh]` mobile only. Content vertically centered via `place-items-center` grid, not space-between.
- Remove "Available for select engagements — 2026" line.
- CTA group: primary + secondary, right-aligned baseline, magnetic hover on ≥lg.
- Meta strip (location/role) sits inside container, not pinned to bottom edge — compresses hero.
- Signature ember glow retained, tightened radius.
- Motion: SplitText line reveal on headline via GSAP, stagger .06s, ease `expo.out`, 0.9s. Serif tagline fades in +0.2s. CTAs .1s later.

## 3. Motion architecture

New: `src/lib/motion.ts` — shared eases, durations, GSAP registration guard.
New: `src/hooks/useReveal.ts` — GSAP ScrollTrigger reveal (fade+y, stagger children if requested).
New: `src/hooks/useMagnetic.ts` — pointer-follow transform for buttons (desktop only, respects reduced motion).
New: `src/components/motion/Reveal.tsx` — wraps children, uses GSAP+ScrollTrigger (replaces framer-motion `whileInView` for consistency).
New: `src/components/motion/SplitReveal.tsx` — split-type + GSAP line/word reveal.
New: `src/components/motion/Magnetic.tsx` — magnetic hover wrapper.
New: `src/components/motion/ParallaxImage.tsx` — GSAP y parallax on scroll.

Every section: heading gets SplitReveal, body copy gets Reveal (stagger .08), images get ParallaxImage or scale/mask reveal. All respect `prefers-reduced-motion`.

## 4. Project Showcase — redesigned

Rewrite `projects-section.tsx` as premium case-study layout:

- Sticky left column (≥lg): active project's title, index (01 / 05), description, feature list, tech chips, live/repo CTAs. Animated crossfade between projects (framer-motion AnimatePresence).
- Right column: large editorial screenshots — replace phone+laptop mockup grid with a single hero screenshot per card (aspect 16/10, rounded-2xl, border, subtle shadow-elegant, scale-in on scroll).
- Card spacing: `gap-y-[clamp(120px,15vh,200px)]`.
- ScrollTrigger drives which project is active (center-nearest heuristic — keep existing logic).
- Progress rail: keep, restyle to hair-line with ember gradient fill; avatar marker retained but only on ≥xl.
- Mobile: full-width screenshot + inline info block (no sticky).
- Card hover: subtle scale(1.01) + shadow lift.

## 5. About preview

- Restore split layout: image on one side (parallax, rounded-2xl, aspect-[4/5]), copy on the other.
- Serif quote pull-out.
- Stats row (years / projects / stack).
- Image slot uses a themed gradient placeholder if asset missing (documented) — do NOT block on assets.

## 6. Loader + page transition

- New `src/components/layout/PremiumLoader.tsx`: full-viewport, dark bg, animated logo mark (name letters split reveal), progress bar (0→100 tied to document.readyState + fonts.ready), exit anim (mask wipe up). Mount in `__root.tsx`, unmount after 1.2s min.
- PageTransition already exists — refine to mask-wipe using framer-motion.

## 7. Navbar — theme toggle fix

- Read/write `localStorage.theme`, toggle `.dark` on `<html>`.
- Use `useEffect` after mount to avoid hydration mismatch; icon swaps via framer-motion.
- Keep sticky glass nav; refine blur + border tokens.

## 8. Sections to unify (spacing + motion + tokens)

WhatIDo, AboutPreview, SkillsSection, CreativeSide, LyricsAndLogic (Spotify card + interactive cards must be preserved and polished), ContactCTA. Each: `.section` wrapper, `.container-editorial`, eyebrow + h2 (SplitReveal), Reveal-wrapped children, consistent divider-hair between sections.

## 9. Files touched (approx)

**Create:** src/lib/motion.ts, src/hooks/useReveal.ts, src/hooks/useMagnetic.ts, src/components/motion/{Reveal,SplitReveal,Magnetic,ParallaxImage}.tsx, src/components/layout/PremiumLoader.tsx.

**Rewrite:** src/styles.css, HeroSection, projects-section, project-card, sticky-info-panel, AboutPreview, LyricsAndLogic, CreativeSide, SkillsSection, WhatIDo, ContactCTA, Navbar, __root.tsx, PageTransition.

**Deps to add:** `split-type` (already planned), `gsap` + `@gsap/react` (verify installed).

## 10. Validation

- `bun run build` green.
- Manual Playwright screenshot at 375 / 768 / 1280 / 1600. Verify hero fits 1280×720 without scroll. Verify project showcase sticky panel on ≥1024.
- Verify theme toggle flips `.dark` on html and persists.
- Reduced-motion: all animations disabled/instant.

## Risks

- GSAP + framer-motion coexisting: keep GSAP for scroll-driven, framer for enter/exit — no overlap on same element.
- Missing images: gradient placeholders documented; not a blocker.
- Bundle size grows ~30kb (gsap+split-type); acceptable for premium.

Reply `go` to execute.
