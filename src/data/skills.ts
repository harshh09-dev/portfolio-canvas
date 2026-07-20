import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGraphql,
  SiGit,
  SiDocker,
  SiVercel,
  SiLinux,
  SiFigma,
  SiPython,
  SiCplusplus,
} from "react-icons/si";
import type { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
}

export const skills: Skill[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma", icon: SiPrisma },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Git", icon: SiGit },
  { name: "Docker", icon: SiDocker },
  { name: "Vercel", icon: SiVercel },
  { name: "Linux", icon: SiLinux },
  { name: "Figma", icon: SiFigma },
  { name: "Python", icon: SiPython },
  { name: "C++", icon: SiCplusplus },
];

export const marqueeWords = [
  "Future-proof",
  "Handcrafted",
  "Immersive",
  "Resilient",
  "Dependable",
  "Cinematic",
  "Responsive",
  "Accessible",
];
