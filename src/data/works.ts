import w1 from "@/assets/ref/portfolio-three-thumb1.jpg";
import w2 from "@/assets/ref/portfolio-three-thumb2.jpg";
import w3 from "@/assets/ref/portfolio-three-thumb3.jpg";
import w4 from "@/assets/ref/portfolio-three-thumb4.jpg";

export type RefWork = {
  title: string;
  href: string;
  tags: string[];
  thumb: string;
};

/** portfolio-three cards — staggered two-column masonry. */
export const refWorks: RefWork[] = [
  {
    title: "NeuroSpeak",
    href: "/projects",
    tags: ["React & Supabase", "Realtime & RLS"],
    thumb: w1,
  },
  {
    title: "Luxorée",
    href: "/projects",
    tags: ["TanStack Start", "Framer Motion & GSAP"],
    thumb: w2,
  },
  {
    title: "FABRO",
    href: "/projects",
    tags: ["Full Stack", "REST API"],
    thumb: w3,
  },
  {
    title: "SNehra Solutions",
    href: "/projects",
    tags: ["React & Prisma", "Payment Workflows"],
    thumb: w4,
  },
];
