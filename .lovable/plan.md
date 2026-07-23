# Phase 1.2 — Preserve & Enhance (not Redesign)

Your uploaded portfolio is the source of truth. I will stop introducing new visual identity and instead reconcile the current implementation back toward the original, then enhance only the sections you called out.

## Guiding rule
For every section, diff current vs. original portfolio. If the current version isn't objectively better, revert to the original and enhance in place.

## Scope of changes

### 1. Homepage — restore minimal editorial preview
- Keep sections: Hero → What I Do → Selected Projects (featured only) → OFF THE CLOCK → Skills/Tools → Contact CTA.
- Remove from homepage: Journey timeline, GitHub contribution graph, full skills grid, full project list. These live on their dedicated pages.
- Ensure homepage reads as a preview that funnels to About / Projects / Creative / Guestbook.

### 2. Loader — restore original
- Restore original portfolio loader (cinematic, one-time on entry).
- Session-scoped: `sessionStorage` flag so internal navigation never re-triggers it.
- Slightly longer duration, smooth exit, integrate `hi_anime.png` artwork.

### 3. What I Do — enhance, don't replace
- Keep existing section structure and copy.
- Add device-specific mockup compositions (desktop, laptop, tablet, mobile) — each with its own framing, not one layout resized.
- Keep it compact; no long scroll.

### 4. OFF THE CLOCK — enhance in place
- Already renamed. Improve image presentation, composition, spacing, hierarchy inspired by references.
- Single premium CTA → `/creative`.
- Keep existing storytelling copy.

### 5. About page — becomes the storytelling hub
Assemble: Hero intro → Personal intro → Skills overview → Journey timeline → GitHub contribution graph → Technologies → Philosophy → Personal interests → CTA. Move Journey + GitHub off homepage into here.

### 6. Projects
- Homepage: featured projects only (small curated set).
- `/projects`: every project, each with Overview / Challenge / Solution / Process / Outcome / Gallery / Tech / Links. Sticky-scroll storytelling lives here, not on home.

### 7. Guestbook — merge
- Single `/guestbook` route combining Guest Book + Signature Book flows (sign-in + signature grid on one page).
- Remove any duplicate route.

### 8. Complete every nav route
Home, About, Projects, OFF THE CLOCK (`/creative`), Lyrics & Logic, Guestbook, Contact — all real pages, no placeholders.

### 9. Motion — dial back
Keep only: text/image reveal, subtle parallax, stagger, magnetic buttons, page transitions. Remove decorative animation that distracts.

### 10. Architecture — data files
All copy, nav, projects, timeline, skills, tech, creative previews, socials, contact into `src/data/*.ts`. Components import; no hardcoded content.

## Technical notes
- Loader: `sessionStorage.getItem('averse:loaded')` gate in `PremiumLoader`; render null when set.
- Guestbook merge: keep `/guestbook`, delete `/signature-book` route file (if present), consolidate hook usage.
- About page: split current `AboutPreview` into a lean homepage teaser + full `/about` page composed of dedicated section components (`JourneyTimeline`, `GithubContributions`, `Philosophy`, `Interests`).
- Projects page: extend `projects-data.ts` schema with `challenge`, `solution`, `process`, `outcome`, `gallery`, `links` fields; render sticky case-study layout only on `/projects`.
- Data files to add/verify: `src/data/{site,nav,hero,skills,tech,projects,journey,creative,socials,contact}.ts`.

## Order of execution
1. Restore loader + session gate.
2. Audit homepage; strip Journey/GitHub/overflow sections.
3. Build/complete About, Projects, Creative, Lyrics & Logic, Guestbook, Contact pages.
4. Enhance What I Do with distinct device mockups.
5. Polish OFF THE CLOCK composition.
6. Move remaining hardcoded strings into `src/data/*.ts`.
7. Build + multi-viewport visual verification.

## Out of scope this pass
No new visual identity, no palette changes, no typography overhaul. Preserve current tokens; only revert where they drifted from the original.
