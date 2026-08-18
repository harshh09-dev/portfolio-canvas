// ============================================================
// Navigation — single source of truth for every nav surface
// (desktop pill, More panel, mobile drawer, footer).
// Components render this data; they never hardcode labels.
// ============================================================

export type NavItem = {
  name: string;
  href: string;
  /** Short supporting line, shown in the More panel + mobile drawer. */
  desc?: string;
  /** Icon key resolved to a component in the navbar. */
  icon?: "user" | "camera" | "pen" | "book" | "folder" | "mail" | "home";
  /** Optional grouping label used by the More panel. */
  group?: string;
};

/** Primary navbar links — intentionally short so the bar never crowds. */
export const primaryNav: NavItem[] = [
  { name: "Home", href: "/", icon: "home" },
  { name: "About", href: "/about", desc: "A little more about me", icon: "user" },
  { name: "Projects", href: "/projects", desc: "Case studies & shipped work", icon: "folder" },
  { name: "Contact", href: "/contact", desc: "Start a conversation", icon: "mail" },
];

/** Everything else lives behind the designed More panel. */
export const moreNav: NavItem[] = [
  {
    name: "Off The Clock",
    href: "/off-the-clock",
    desc: "Things I enjoy outside code",
    icon: "camera",
    group: "Beyond the work",
  },
  {
    name: "Guestbook",
    href: "/guestbook",
    desc: "Leave a note",
    icon: "pen",
    group: "Beyond the work",
  },
  {
    name: "Blog",
    href: "/blog",
    desc: "Writing, experiments & thoughts",
    icon: "book",
    group: "Words",
  },
];

/** Small print inside the More panel footer. */
export const moreNavMeta = {
  label: "More",
  heading: "Explore the rest",
  note: "Everything that doesn't fit the main bar — still worth the click.",
};

/** Primary navbar CTA. */
export const navCta = {
  label: "Resume",
  /** Real static file served from /public — not a route. */
  href: "/anjali-kamal-resume.pdf",
  download: true,
};

export const legalNav: NavItem[] = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
];
