
# A-Verse Art Direction Pass

This is executed in the exact order you specified. No new pages, no new routes, no new components — only variants and usage/hierarchy changes on what already exists.

## Part 0 — Structural Fixes (bugs, done first)

### 0.1 Projects section
- Audit `src/components/projects/projects-data.ts`: confirm each project's `images.main`, `images.mobile1`, `images.mobile2` point to real, correct screenshots for that project (fix any RuneCareer/RuneAI/RuneLearn/RuneHub/Old Portfolio cross-wiring).
- Replace any missing/broken image references with valid asset paths (or upload via `lovable-assets` if source screenshots exist in project).
- Replace the "random-feeling" accent palette with a deliberate rotating order documented in a comment at the top of `projects-data.ts` (e.g. red → slate → maroon → amber → blue, cycled in a fixed sequence tied to project index).
- Fix z-index/stacking on the "Venture Showcase" background marquee text in `projects-section.tsx` so it renders behind content and never bleeds through the sticky navbar (navbar `z-50`; marquee text `z-0`/negative, or clip to section with `overflow-hidden` + isolate).

### 0.2 What I Do
- Populate each of the four device frames (Desktop/Laptop/Tablet/Mobile) in `WhatIDo.tsx` with real representative UI content — reuse cropped project screenshots from `projects-data`, not abstract SVG placeholders.
- Fix Mobile block heading clipping under the sticky nav (add proper `scroll-mt` / section top padding).

## Part 1 — Art Direction (in the exact order you gave)

3. **Gradient discipline (Section 8)** — highest leverage, done early. Remove gradient italic from: Lyrics & Logic's "logic", Guestbook card's "signature", What I Do's "screen it lives on", About's "interaction". Keep on Hero tagline + Contact's "something real" + Off The Clock's "clock." + one About moment. Render removed accents in solid `text.primary`.

4. **Navbar active state (Section 1)** — soften solid-black active pill to a low-opacity fill or a text-weight + dot indicator. Leave spacing/transparency untouched.

5. **Hero (Section 9)** — restore subtitle legibility (drop gradient or add subtle scrim), tighten name↔subtitle gap, pull Location/Role up closer to CTAs with a shared hairline baseline.

6. **Card language (Section 5)**:
   - About stats: strip card/shadow/border → three large numerals + labels on section background, separated by hairline dividers.
   - Lyrics & Logic cards: lighter 1px border, no shadow, quieter fill — read as one family, not three competing cards.
   - Project cards: leave as the heaviest card type (after 0.1 fix).

7. **Button hierarchy (Section 6)** — define 4 variants and apply globally:
   - Primary (filled): Hero "See selected work", Contact email CTA only.
   - Secondary (outlined): Hero "Let's connect" and true second-actions.
   - Editorial (text + arrow): every `<ViewMore>` — restyle the shared component so all preview links match.
   - Minimal (underline only): inline body links.
   - Deduplicate About preview: keep one of "More about me" / "Read my full story" as Editorial.

8. **Background rhythm + vertical spacing (Sections 2 + 11)** — alternate section backgrounds Hero(cream) → What I Do(near-white) → About(warm tint) → Projects(near-white) → Off The Clock(richer tint) → Lyrics & Logic(near-white) → Contact(soft tint). Adjust divider/spacing between sections per your uneven rhythm (Hero→What I Do generous, About→Skills tight, etc.).

9. **What I Do composition (Section 3)** — differentiate the four blocks:
   - 01 Desktop: wide bleed, left copy / right dominant frame.
   - 02 Laptop: horizontal scroll frame bleeding off left edge.
   - 03 Tablet: centered portrait, generous negative space.
   - 04 Mobile: smaller, right/bottom-anchored, less ceremony.

10. **Off The Clock (Section 4)** — remove the duplicate "Enter the studio" CTA; make Photography visibly taller than Writing.

11. **Projects pacing (Section 10)** — first featured project renders confidently larger than the rest; remove redundant per-card "View Case Study" buttons (whole card remains the link); vary vertical rhythm between projects.

12. **Final pass** — verify against Acceptance Criteria: no broken images, gradient count ≤ 30% of headings, no duplicate CTAs, no two consecutive sections sharing background treatment, About stats un-carded, Hero subtitle legible, no new components/routes/colors introduced.

## Technical notes

- All color changes pull from existing tokens in `src/styles.css`. No new hex/oklch values invented.
- Background rhythm implemented via a small set of section-background utility classes in `styles.css`, applied on the section elements in `src/routes/index.tsx`.
- Editorial button variant added as a variant of the existing `ViewMore` component, not a new component.
- Screenshots at 1280×720 and 375×812 via Playwright after each major step for verification.

## Out of scope

- No new pages, routes, or components.
- No migration work, no new libraries.
- No changes to Guestbook auth wiring or Supabase logic.
- No changes to Lyrics & Logic section's page-level presence (stays homepage-only).

This is a lot of surface area. I'll work through steps 0.1 → 12 sequentially and verify after each cluster.
