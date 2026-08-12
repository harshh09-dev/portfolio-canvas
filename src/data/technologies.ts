export type TechGroup = { label: string; items: { name: string; dark?: boolean }[] };

/** brand-three / tech chip grid. */
export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "TanStack" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express", dark: true },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Supabase" },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub", dark: true },
      { name: "Vercel", dark: true },
    ],
  },
];

export const techHeading = "Tools & Technologies";
