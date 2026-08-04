export interface CreativePreview {
  title: string;
  subtitle: string;
  meta: string;
  image: string;
}

export const offTheClock: CreativePreview[] = [
  {
    title: "Photography",
    subtitle: "Golden hours",
    meta: "24 frames",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
  },
  {
    title: "Writing",
    subtitle: "Fragments",
    meta: "12 pieces",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80",
  },
  {
    title: "UI Experiments",
    subtitle: "Playgrounds",
    meta: "Lab",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80",
  },
  {
    title: "Music",
    subtitle: "On repeat",
    meta: "Playlists",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80",
  },
];

export const creativeTeaser = {
  eyebrow: "Off the clock",
  headlineLine1: "Where creativity",
  headlineLine2: "breathes freely.",
  copy: "A space for the unfiltered, the raw, the real. Thoughts, art, music, anime and everything in between.",
  ctaLabel: "Explore My World",
  ctaHref: "/off-the-clock",
};
