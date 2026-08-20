import w1 from "@/assets/ref/portfolio-three-thumb1.jpg";
import w2 from "@/assets/ref/portfolio-three-thumb2.jpg";
import w3 from "@/assets/ref/portfolio-three-thumb3.jpg";
import w4 from "@/assets/ref/portfolio-three-thumb4.jpg";

export type RefWork = {
  /** Case-study slug — resolves to /projects/$slug. */
  slug: string;
  title: string;
  tags: string[];
  /** Card thumbnail. */
  thumb: string;
  /** Cursor-follow preview image — unique per project. */
  hoverImage: string;
};

/** portfolio-three cards — staggered two-column masonry. */
export const refWorks: RefWork[] = [
  {
    slug: "neurospeak",
    title: "NeuroSpeak",
    tags: ["React & Supabase", "Realtime & RLS"],
    thumb: w1,
    hoverImage: w1,
  },
  {
    slug: "luxoree",
    title: "Luxorée",
    tags: ["TanStack Start", "Framer Motion & GSAP"],
    thumb: w2,
    hoverImage: w2,
  },
  {
    slug: "fabro",
    title: "FABRO",
    tags: ["Full Stack", "REST API"],
    thumb: w3,
    hoverImage: w3,
  },
  {
    slug: "snehra-solutions",
    title: "SNehra Solutions",
    tags: ["React & Prisma", "Payment Workflows"],
    thumb: w4,
    hoverImage: w4,
  },
];
