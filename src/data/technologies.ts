import type { ComponentType } from "react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiReactquery,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiDocker,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";

export type TechItem = {
  name: string;
  /** Real brand icon — never a placeholder. */
  icon: ComponentType<{ className?: string; size?: number }>;
  url?: string;
  dark?: boolean;
};

export type TechGroup = { label: string; items: TechItem[] };

/** brand-three / tech chip grid. */
export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: SiReact, url: "https://react.dev" },
      { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org" },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TanStack", icon: SiReactquery, url: "https://tanstack.com" },
      { name: "Tailwind CSS", icon: SiTailwindcss, url: "https://tailwindcss.com" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, url: "https://nodejs.org" },
      { name: "Express", icon: SiExpress, dark: true, url: "https://expressjs.com" },
      { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org" },
      { name: "MongoDB", icon: SiMongodb, url: "https://www.mongodb.com" },
      { name: "Supabase", icon: SiSupabase, url: "https://supabase.com" },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker", icon: SiDocker, url: "https://www.docker.com" },
      { name: "Git", icon: SiGit, url: "https://git-scm.com" },
      { name: "GitHub", icon: SiGithub, dark: true, url: "https://github.com" },
      { name: "Vercel", icon: SiVercel, dark: true, url: "https://vercel.com" },
    ],
  },
];

export const techHeading = "Tools & Technologies";
