// "What I Do" — device-oriented storytelling.
// Each service is intentionally paired with the device it lives on.

export type DeviceKind = "desktop" | "laptop" | "tablet" | "mobile";

export interface Service {
  num: string;
  title: string;
  tagline: string;
  description: string;
  device: DeviceKind;
  medium: string; // small caption under device
  tools: string[];
}

export const services: Service[] = [
  {
    num: "01",
    title: "Product Engineering",
    tagline: "For teams and dashboards",
    description:
      "Data-dense workspaces where engineers, ops and analysts live. I design for wide viewports first — density that stays scannable, keyboard-first flows, and interfaces that reward the pixel-perfect eye.",
    device: "desktop",
    medium: "27\" · 2560 × 1440",
    tools: ["React", "Next.js", "Node", "Postgres"],
  },
  {
    num: "02",
    title: "Founder Websites",
    tagline: "Marketing sites that feel authored",
    description:
      "Portfolios, storefronts, and landing pages you actually want to read. Editorial rhythm on the laptop, no filler sections, motion that carries the story rather than decorating it.",
    device: "laptop",
    medium: "14\" · retina",
    tools: ["React", "GSAP", "Framer", "Tailwind"],
  },
  {
    num: "03",
    title: "Reading Experiences",
    tagline: "Longform, docs, and blogs",
    description:
      "Content that survives the split between couch and desk. Fluid typography, generous margins, dark-first — designed on the tablet so the reader is always the center of gravity.",
    device: "tablet",
    medium: "iPad · 11\"",
    tools: ["MDX", "Prisma", "Fraunces", "Editorial"],
  },
  {
    num: "04",
    title: "Apps in the Pocket",
    tagline: "Thumbs-first product surfaces",
    description:
      "Consumer apps designed at 390 px before they exist anywhere else. Thumb-reach, one-hand flows, gesture-native interactions — mobile is the constraint, not the afterthought.",
    device: "mobile",
    medium: "iPhone · 6.1\"",
    tools: ["React Native", "Expo", "Reanimated", "Zustand"],
  },
];
