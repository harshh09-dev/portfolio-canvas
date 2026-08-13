// Centralized content — components read from here, never hardcode.

export const brand = {
  shortName: "AK",
  fullName: "Anjali Kamal",
};

export const site = {
  name: "Anjali Kamal",
  /** Wordmark shown in navbar, mobile menu, footer and loaders. */
  initials: brand.shortName,
  role: "Full Stack Dev & AI Engineer",
  location: "Jaipur, India",
  email: "anjalikamal3105@gmail.com",
  tagline: "solve real-world problems.",
  eyebrow: "I design and build scalable systems that",
  displayName: "Anjali",
};

export const nav = {
  primary: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Guestbook", href: "/guestbook" },
    { name: "Contact", href: "/contact" },
  ],
  more: [
    { name: "Off The Clock", desc: "Photography, writing, experiments", href: "/off-the-clock" },
    { name: "Uses", desc: "Gear, editor and stack", href: "/uses" },
  ] as { name: string; desc: string; href: string }[],
};

export const legal = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
];

export const socials = [
  { name: "GitHub", url: "https://github.com/A-verse" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/anjalikamal-ak3105/" },
  { name: "Instagram", url: "https://instagram.com/anjalikamal3105" },
  { name: "X", url: "https://twitter.com/A-verse" },
];


export const stats = [
  { value: "10+", label: "Projects delivered" },
  { value: "4+", label: "Professional roles" },
  { value: "2+", label: "Years of experience" },
];
