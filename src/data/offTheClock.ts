// ============================================================
// Off The Clock — the non-work side, part of the About experience.
// Honest content only: no fabricated counts, no invented archives.
// Items marked `ready: false` render as an intentional
// "in progress" state instead of a fake statistic.
// ============================================================

export type OffTheClockItem = {
  id: string;
  title: string;
  subtitle: string;
  /** Optional real metric. Omit when there is nothing real to count. */
  meta?: string;
  image: string;
  /** False until real content exists behind the item. */
  ready: boolean;
  href?: string;
};

export const offTheClockMeta = {
  eyebrow: "Off the clock",
  headlineLine1: "Where creativity",
  headlineLine2: "breathes freely.",
  copy: "A space for the unfiltered — photos, half-finished writing, interface experiments and whatever is on repeat.",
  ctaLabel: "Explore My World",
  ctaHref: "/off-the-clock",
  pendingLabel: "In progress",
};

export const offTheClock: OffTheClockItem[] = [
  {
    id: "photography",
    title: "Photography",
    subtitle: "Golden hours, mostly on the phone",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
    ready: false,
  },
  {
    id: "writing",
    title: "Writing",
    subtitle: "Fragments that may become posts",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80",
    ready: false,
    href: "/blog",
  },
  {
    id: "experiments",
    title: "UI Experiments",
    subtitle: "Motion and layout playgrounds",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80",
    ready: false,
  },
  {
    id: "music",
    title: "Music",
    subtitle: "What's on repeat while building",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80",
    ready: false,
  },
];
