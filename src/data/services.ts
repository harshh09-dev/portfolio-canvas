// "What I Do" — four capability cards rendered as small browser-window
// mockups. Monochrome only: no accent colors anywhere.

export type CraftKind = "design" | "development" | "interactions" | "creative";

export interface Service {
  id: CraftKind;
  label: string;
  tagline: [string, string]; // rendered as two lines
  active?: boolean;
}

export const whatIDo = {
  eyebrow: "What I do",
  headline: "Design. Develop. Experience.",
};

export const services: Service[] = [
  {
    id: "design",
    label: "Web Design",
    tagline: ["Editorial layouts and interfaces", "built around the reader."],
  },
  {
    id: "development",
    label: "Web Development",
    tagline: ["Typed, tested front-ends with", "a considered backend."],
    active: true,
  },
  {
    id: "interactions",
    label: "Interactions",
    tagline: ["Micro-interactions and motion", "that explain, not decorate."],
  },
  {
    id: "creative",
    label: "Creative Coding",
    tagline: ["Generative visuals, canvas", "and scroll-driven experiments."],
  },
];
