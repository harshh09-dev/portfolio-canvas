
# Phase 1.3 — Preserve, Enhance, Don't Replace

The uploaded portfolio stays the source of truth. This pass reconciles the current build with the new brief: single-scroll home, tighter navigation, calmer palette, and Lyrics & Logic demoted to a homepage preview.

## 1. Palette recalibration (subtle, not flashy)
- Keep deep matte black canvas.
- Reduce the pink → yellow → blue gradient to accent-only usage: hover states, CTA glow, artwork rims, small highlights. No large gradient washes.
- Introduce a warm-white / muted-silver / subtle-blue neutral system for text and surfaces so gradients feel like jewelry, not wallpaper.
- Audit `styles.css` and every section: strip large gradient backgrounds (hero wash, section overlays) and replace with matte black + hairline dividers.

## 2. Navigation
Navbar becomes exactly: Home · About · Projects · OFF THE CLOCK · Guestbook · Contact.
- Remove Lyrics & Logic from primary and secondary nav.
- Remove the `/lyrics-and-logic` route file (delete). Redirect any lingering link to `/#lyrics-and-logic` anchor on home.

## 3. Homepage — single scroll, preview-only
Order:
1. Hero
2. What I Do (preview) → View More → `/about` (services also surfaced on About)
3. About Me (preview) → View More → `/about`
4. Skills & Technologies (preview) → View More → `/about`
5. Featured Projects (preview) → View More → `/projects`
6. OFF THE CLOCK (preview) → View More → `/creative`
7. Lyrics & Logic (Spotify / GitHub / Guestbook cards, homepage-only)
8. Contact CTA → `/contact`

Every preview ends with a single small "View More →" affordance in a consistent style.

## 4. Section-specific refinements
- **Hero**: keep current composition; remove any residual gradient background; keep magnetic CTAs; verify laptop 1280/1366 fit.
- **What I Do**: keep 4 device mockups (desktop/laptop/tablet/mobile) with distinct compositions; compact, no long scroll.
- **About preview**: short editorial intro + portrait/quote. Full Journey timeline + GitHub graph live only on `/about`.
- **Skills preview**: red-accent marquee + a small tools grid; "View More" to About.
- **Featured Projects**: 3 featured entries from `projects-data.ts`; full sticky case-study only on `/projects`.
- **OFF THE CLOCK preview**: enhance current composition (asymmetric editorial), single premium CTA to `/creative`.
- **Lyrics & Logic**: three cards on home — Spotify (live API card), GitHub (live API card), Guestbook (link card). Preserve the premium card components from the original upload; no simplified replacements.
- **Contact CTA**: keep current; ensure it points to `/contact`.

## 5. About page
Hero → My Story → Journey Timeline → GitHub Contribution Graph → Contact CTA. Skills/tech/philosophy/interests fold into "My Story" and remain here (not on home in detail).

## 6. Projects page
Featured Projects → full Project Showcase (sticky case-study) → GitHub section.

## 7. OFF THE CLOCK page
Photography · Writing · UI Components. Editorial layouts, large imagery, no CTAs stacked — one primary contact CTA at the bottom.

## 8. Guestbook page
Single merged experience: hero, visitor messages grid, "leave a message" form. Google + GitHub OAuth via Supabase Auth. Anyone reads, only signed-in posts. Realtime subscription for new messages.

## 9. Contact page
Simple editorial page: email, socials, short note. No form necessity.

## 10. Loader
Keep the current session-gated cinematic loader with anime artwork. Only tweaks: slightly longer exit, ensure it never re-triggers on internal navigation.

## 11. Adaptive UI (four experiences)
For each section, define distinct compositions at mobile / tablet / laptop / desktop — not one layout resized. Priorities:
- Mobile: single column, compact spacing, reduced motion, smaller imagery.
- Tablet: 2-col where appropriate, dedicated crops.
- Laptop: primary design target (already tuned).
- Desktop: more negative space, asymmetric layouts, larger storytelling.

## 12. Motion
Keep: text reveal, image reveal, subtle parallax, stagger, magnetic buttons, page transitions. Remove any decorative animation that doesn't earn its place. Mobile trims to reveals + fades only.

## 13. Data architecture
All content in `src/data/*.ts`:
- `site.ts` (nav updated: remove Lyrics & Logic)
- `services.ts`, `skills.ts`, `projects-data.ts`, `journey.ts`, `creative.ts`
- Add `lyricsLogic.ts` for the three-card config on home
- Add `contact.ts` for email/socials/note

## 14. Cleanup / deletions
- Delete `src/routes/lyrics-and-logic.tsx`.
- Delete unused imports/components that duplicated Lyrics & Logic page content.
- Remove homepage "About/Journey/GitHub" detailed variants if any linger.

## Order of execution
1. Palette pass in `styles.css` (kill large gradient washes, introduce warm-white/silver/subtle-blue neutrals).
2. Nav update in `data/site.ts`; delete `lyrics-and-logic` route.
3. Rebuild homepage as single-scroll with all 8 previews + "View More" affordances.
4. Move Lyrics & Logic components onto the homepage; preserve premium Spotify / GitHub / Guestbook cards from the original upload.
5. Reduce About/Projects/Creative pages to their briefed structures.
6. Guestbook: merge, wire Google + GitHub OAuth via Supabase, realtime messages.
7. Adaptive audit at 390 / 800 / 1280 / 1600 with Playwright screenshots.

## Out of scope
- No new visual identity beyond the palette tone-down.
- No typography overhaul (Fraunces + Manrope stays).
- No new business logic outside the Guestbook Supabase wiring.

Approve and I'll ship it in this order.
