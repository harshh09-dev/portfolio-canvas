// ============================================================
// Case studies — the per-project long-form layer.
// Content is derived from the existing `projects` data so there is
// only ONE source of truth for project facts. Nothing here is
// fabricated: fields with no real content are simply omitted.
// ============================================================

import { projects, type Project } from "@/components/projects/projects-data";

export type CaseStudy = {
  slug: string;
  project: Project;
  /** Short label used in hero eyebrows and index rows. */
  category: string;
};

/** id (projects-data) → public case-study slug */
const slugById: Record<string, string> = {
  neurospeak: "neurospeak",
  luxoree: "luxoree",
  fabro: "fabro",
  jmrc: "jaipur-metro",
  snehra: "snehra-solutions",
};

const categoryById: Record<string, string> = {
  neurospeak: "Assistive healthcare platform",
  luxoree: "Luxury commerce",
  fabro: "Artisan commerce",
  jmrc: "Enterprise internal tooling",
  snehra: "Placement consultancy",
};

export const caseStudies: CaseStudy[] = projects.map((project) => ({
  slug: slugById[project.id] ?? project.id,
  project,
  category: categoryById[project.id] ?? "Product",
}));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? caseStudies[i - 1] : caseStudies[caseStudies.length - 1],
    next: i < caseStudies.length - 1 ? caseStudies[i + 1] : caseStudies[0],
  };
}
