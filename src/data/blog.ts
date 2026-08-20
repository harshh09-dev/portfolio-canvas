// ============================================================
// Blog — content architecture only.
// There are no published articles yet, so `posts` is intentionally
// empty and the /blog route renders an honest empty state.
// Add real entries here; no component change is required.
// ============================================================

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string. */
  date: string;
  /** Minutes — computed by the author, not fabricated. */
  readingTime: number;
  tags: string[];
  featured?: boolean;
  cover?: string;
  /** Markdown-ish body paragraphs. */
  body: string[];
};

export const blogMeta = {
  eyebrow: "Writing",
  title: "Blog",
  lead: "Notes on building products — architecture decisions, motion work and the things that only show up in production.",
  emptyTitle: "Nothing published yet.",
  emptyCopy:
    "I'm writing the first pieces now. Until they're ready, the work itself is the better read.",
  emptyCtaLabel: "See the projects",
  emptyCtaHref: "/projects",
};

export const posts: BlogPost[] = [];

export const blogTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
