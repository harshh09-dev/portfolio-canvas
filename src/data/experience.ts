import expThumb from "@/assets/ref/feature-three-thumb1.jpg";

export type ExperienceRow = {
  number: string;
  org: string;
  role: string;
  year: string;
  thumb: string;
};

/** feature-three rows — hover reveals a floating thumbnail. */
export const experience: ExperienceRow[] = [
  {
    number: "01",
    org: "SNehra Solutions",
    role: "Web Developer",
    year: "2026",
    thumb: expThumb,
  },
  {
    number: "02",
    org: "Luxorée",
    role: "Freelance Full Stack Developer",
    year: "2025",
    thumb: expThumb,
  },
  {
    number: "03",
    org: "Jaipur Metro Rail Corporation",
    role: "Web Developer Intern",
    year: "2025",
    thumb: expThumb,
  },
  {
    number: "04",
    org: "GirlScript Summer of Code",
    role: "Open Source Contributor",
    year: "2024",
    thumb: expThumb,
  },
];
