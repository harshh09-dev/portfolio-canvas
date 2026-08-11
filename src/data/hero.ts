// Hero content — merged from the reference banner composition.
// Components read from here; never hardcode hero copy in JSX.

export const hero = {
  word: "developer",
  intro:
    "Hi! I'm Anjali — a software developer who enjoys turning ideas into products people can actually use.",
  capabilities: [
    "Full Stack Development",
    "Frontend Engineering",
    "Backend Development",
    "Database Design",
    "UI / UX Design",
  ],
  statement: "Clean code, solid architecture, products that ship.",
  primaryCta: { label: "View projects", href: "/projects" },
  secondaryCta: { label: "Let's connect", href: "/contact" },
  counters: [
    { value: 2, suffix: "+", label: "Internships" },
    { value: 10, suffix: "+", label: "Projects shipped" },
    { value: 2, suffix: "+", label: "Years building" },
  ],
};
