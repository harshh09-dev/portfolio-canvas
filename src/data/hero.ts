// Hero content — mirrors the reference banner-three composition.
// Components read from here; never hardcode hero copy in JSX.

export const hero = {
  word: "developer",
  introLead: "Hi! I'm Anjali",
  intro:
    "a software developer who enjoys turning ideas into products people can actually use.",
  capabilities: [
    "Full Stack Development",
    "Frontend Engineering",
    "Backend Development",
    "Database Design",
    "UI/UX Design",
  ],
  statement: "Clean code, solid architecture, products that ship.",
  primaryCta: { label: "view projects", href: "/projects" },
  counters: [
    { value: 2, suffix: "+", label: "Internships", invert: false },
    { value: 5, suffix: "+", label: "Projects Shipped", invert: true },
  ],
  stack: ["React", "Node.js", "MongoDB", "TypeScript"],
  stackTitle: "End-to-End",
  stackLabel: "Development",
};
