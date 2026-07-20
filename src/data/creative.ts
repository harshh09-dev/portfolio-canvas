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
];

export const creativeTeaser = {
  eyebrow: "Off the clock",
  headline: "Off the",
  headlineItalic: "clock.",
  copy: "Not everything I make lives in a terminal. Photographs, writing, small design experiments — the quiet work between shipping.",
  ctaLabel: "Enter the studio",
  ctaHref: "/creative",
};
