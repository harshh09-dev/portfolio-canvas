import thumb1 from "@/assets/ref/service-three-thumb1.png";
import thumb2 from "@/assets/ref/service-three-thumb2.png";
import thumb3 from "@/assets/ref/service-three-thumb3.png";
import thumb4 from "@/assets/ref/service-three-thumb4.png";

export type RefService = {
  number: string;
  title: string;
  tags: string[];
  thumb: string;
};

/** service-three rows — alternating left/right, numbered, tagged. */
export const refServices: RefService[] = [
  {
    number: "01",
    title: "Full Stack Web Development",
    tags: ["React", "Node.js", "TypeScript"],
    thumb: thumb1,
  },
  {
    number: "02",
    title: "App Development",
    tags: ["Next.js", "Responsive UI", "Progressive Web Apps"],
    thumb: thumb2,
  },
  {
    number: "03",
    title: "Backend & Database",
    tags: ["REST APIs", "PostgreSQL", "MongoDB"],
    thumb: thumb3,
  },
  {
    number: "04",
    title: "DevOps & Deployment",
    tags: ["CI/CD", "Docker", "Vercel"],
    thumb: thumb4,
  },
];
