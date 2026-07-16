# Portfolio Migration — Phase 1 Audit

## Snapshot
Uploaded portfolio: **Vite + React 18 + react-router-dom v6 + Tailwind v3**, 13 pages, ~30 components. Owner: **Anjali Kamal** (Jaipur, Full Stack Dev & AI Engineer).
Target: **TanStack Start (SSR) + React 19 + Tailwind v4**.

## Inconsistencies found in your codebase

### Typography
- Three font families loaded (Inter, Playfair Display, Space Grotesk) but usage is inconsistent — sections mix `font-sans`, `font-serif`, `font-display` with raw pixel sizes (`text-[3.6rem]`, `text-[5rem]`, `text-[8rem]`, `text-[10rem]`) instead of a scale.
- Heading tags override family via `h1..h6 { font-family: 'Inter' }` in `index.css`, defeating Playfair usage where intended.
- Eyebrow/label style repeated ad-hoc in 7 places with slightly different letter-spacing.

### Spacing
- Section vertical padding uses `py-16`, `py-20`, `py-24`, `py-32`, `md:py-32` interchangeably across sections — no rhythm.
- Container widths vary: `max-w-5xl`, `max-w-7xl`, `max-w-[1400px]`, no shared container primitive.
- Horizontal padding: `px-5 md:px-8 lg:px-12` in one section, `px-6` in another, `px-4 sm:px-6` elsewhere.

### Color
- Hard-coded gradients across sections (`from-violet-500/10 via-pink-400/10`, `from-purple-400 via-pink-400 to-yellow-400`) with no semantic accent tokens.
- `hsl(24 80% 55% / 0.3)` selection color hard-coded; not part of the token set.
- Border color inconsistency: `border-border`, `border-white/10`, `border-border/10`, `border-border/20`.

### Components
- `AboutPreview`, `WhatIDo`, `SkillsSection` each define their own card styling (radii range 3xl / 2xl / xl, different padding, different hover behavior).
- Navbar had a hydration-flicker bug: `useState(false)` for `isMobile` + `useEffect` swap caused desktop navbar to flash at mobile widths.
- `use-toast` shipped in code but never consumed (sonner is now the single toast surface).
- `chart.tsx` and `calendar.tsx` shadcn primitives were incompatible with the pinned versions of `recharts` / `react-day-picker` — removed (unused on Home).

### Motion
- No shared easing / duration tokens. Custom `[0.22, 1, 0.36, 1]`, `[0.16, 1, 0.3, 1]`, `[0.2, 0.8, 0.2, 1]` repeated 12+ times.
- Every section uses its own opacity+y fade-in — no rhythm, no purposeful moments.

### Stack incompatibilities (fixed in Phase 1)
- `react-router-dom` → migrated to `@tanstack/react-router`. Links inside sections converted to anchors temporarily so typechecks pass without stub routes for `/uses`, `/guestbook`, etc. (These routes will be recreated in Phase 5.)
- `postcss.config.js` + `tailwindcss-animate` — obsolete under Tailwind v4 (v4 uses Lightning CSS + `tw-animate-css`, already available).
- `motion/react` and `next/image` imports in `LyricsAndLogic.tsx` — swapped to `framer-motion` and plain `<img>`.
- `import Image from 'next/image'` — swapped to `<img>` (would never have worked in Vite).
- Removed empty file `sections/page.tsx` and unused `sections/creative.tsx` (used `@/lib/data` which didn't exist).
- Assets (`about.jpg`, `img1..3`, `steel-flower.png`, `logo.png`, `/images/album-art.png`, `/images/avatar.jpeg`) were referenced but **not present in the uploaded zip**. Replaced with inline gradient placeholders so the build ships; will be filled from your assets in Phase 2/3/4.

---

## Phase 1 deliverables

### Design system (`src/styles.css`)
Centralized tokens in oklch, mapped through `@theme inline` for utility generation, with the shadcn HSL bridge preserved so every existing shadcn primitive still works.

- **Color**: `--bg`, `--bg-elevated`, `--bg-inset`, `--surface`, `--surface-2`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--border-strong`, `--ring`, plus editorial accents `--accent-warm`, `--accent-cool`, `--accent-signature`, `--accent-mint`, `--accent-pink`. Dark theme primary, light theme authored in parallel behind `.light`.
- **Radius**: `--radius-xs..2xl` (2/6/10/14/20/28 px).
- **Shadow**: `--shadow-sm/md/lg/glow` (layered soft, no default black drops).
- **Motion**: `--ease-out-expo`, `--ease-in-out-quart`, `--ease-signature`; `--dur-fast/base/slow/scroll` (150/300/600/900 ms).
- **Section rhythm**: `--space-section-sm/md/lg/xl` (64/96/128/160 px), applied via `section-y-md` / `section-y-lg` utilities.
- **Container**: `container-editorial` utility, four responsive max-widths (100% / 44rem / 67.5rem / 80rem).
- **Typography utilities**: `text-eyebrow`, `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-serif-italic`. All fluid via `clamp()`.
- **Fonts preserved**: Inter (UI/body), Playfair Display (display/italic — matches your existing "solve real-world problems" serif treatment), Space Grotesk (eyebrows/labels). Loaded via `<link rel="stylesheet">` in `__root.tsx` head as required by Tailwind v4.
- **Motion accessibility**: global `prefers-reduced-motion` guard.

### Responsive strategy — 4 dedicated breakpoints
- **Mobile (≤ 479)**: portrait, single-column, 24 px gutters, dedicated mobile navbar (CSS-gated `md:hidden`, no hydration flash), 44×44 tap targets.
- **Tablet (480–767 → 1079)**: hybrid two-column, 32 px gutters.
- **Laptop (1080–1439)**: editorial 12-column, generous whitespace, `container-editorial` at 67.5rem.
- **Desktop (≥ 1440)**: magazine scale, container at 80rem, oversized display type.

### Hero redesign (`src/components/sections/HeroSection.tsx`)
Preserves your voice verbatim — "I design and build scalable systems that / **ANJALI** / solve real-world problems." — and reframes it as an editorial, viewport-filling composition.

- Three-band vertical layout: status eyebrow (top) → display + serif tagline + CTAs (center) → location / scroll-cue / role meta (bottom).
- Cursor-following signature-ember glow on `≥ lg`, disabled on touch and on `prefers-reduced-motion`.
- Ambient gradient composition using two token-driven radial gradients (`--accent-signature`, `--accent-cool`).
- Two CTAs: primary "See selected work" (arrow micro-interaction), secondary "Let's connect" (mailto).
- All motion goes through a single easing curve; every animation respects `prefers-reduced-motion`.

### Root layout (`src/routes/__root.tsx`)
- Loads three fonts via `<link>` (required in v4).
- Applies dark class before hydration to prevent theme flash.
- Mounts Navbar, Footer, sonner Toaster, wraps content in an `AnimatePresence` page-transition keyed on pathname.
- Route-level SEO with title / description / og:* / twitter:card / author.

---

## Files changed

**Created**
- `src/routes/index.tsx` (Home composition — all existing home sections preserved)
- `AUDIT.md`
- `src/components/ScrollReveal.tsx` (SSR-safe framer-motion wrapper)
- `src/components/layout/{Navbar,Footer,Loader}.tsx`
- `src/components/sections/{HeroSection,WhatIDo,AboutPreview,ProjectShowcase,SkillsSection,CreativeSide,LyricsAndLogic,ContactCTA}.tsx`
- `src/components/projects/*` (project data + cards + mockups)
- `src/components/PageTransition.tsx`
- `src/hooks/useGuestbook.ts`
- `src/lib/{Supabase,api}.ts`

**Modified**
- `src/routes/__root.tsx` — global chrome + head + fonts + transitions
- `src/styles.css` — completely rewritten as v4 token system

**Removed (Phase 1)**
- `src/components/ui/chart.tsx`, `src/components/ui/calendar.tsx` — incompatible with pinned dep versions; unused on Home. Restore in Phase 5 when they're needed.
- `src/components/sections/{creative,page}.tsx` — dead code (`page.tsx` empty, `creative.tsx` imported missing `@/lib/data`, next/image, motion/react).

**Not yet ported (Phase 2+)**
- `src/pages/*` — 13 legacy pages (About, Blog, BlogPost, Contact, CreativeCorner, Experiments, Links, NotFound, Photography, ProjectDetail, SignatureBook, Writing, Index). These need to become `src/routes/*` in later phases and are currently unreachable — Nav links to them via anchor tags will 404 until then. Home page (`/`) is the only route active.
- `RecentSignatures`, `SignatureCard`, `GithubCard`, `SpotifyCard` — used only on `/signature-book`; will land in Phase 5 with Supabase wiring.

---

## Build validation

- `bun run build` — ✅ passes
- `bunx tsgo --noEmit` — ✅ clean
- Playwright screenshots captured at 390 / 800 / 1280 / 1600 — all render, hero composition is layout-correct at each breakpoint.

---

## Roadmap forward

| Phase | Deliverable                                                                                     |
| ----- | ----------------------------------------------------------------------------------------------- |
| 2     | About section polish + assets (real portrait, image trio)                                       |
| 3     | Projects redesign — sticky-scroll showcase + `/projects/$id` detail route                       |
| 4     | Skills + Contact + Creative Corner + subroutes                                                  |
| 5     | Blog + BlogPost + Signature Book + Links + Supabase (Cloud enable) + RecentSignatures/Github/Spotify |
| 6     | GSAP + ScrollTrigger + Lenis + magnetic/micro-interactions                                      |
| 7     | Full A11y pass, Lighthouse, sitemap, robots, final QA                                           |

**Awaiting approval to proceed to Phase 2.**
