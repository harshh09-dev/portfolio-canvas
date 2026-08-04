// ============================================================
// Projects — real project data (monochrome)
// ============================================================
// Per the sitewide monochrome rule there are no per-project
// accent colors or gradients. Every card renders with the
// neutral foreground/border/card tokens so no single project
// stands out in a color the others don't.
// ============================================================

export interface TechItem {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  features: string[];
  tech: TechItem[];
  images: {
    mobile1: string;
    mobile2: string;
    main: string;
  };
  mainImageFit?: "cover" | "fill";
  // Small caption text rendered under the device mockups
  desktopLabel?: string;
  mobileLabel1?: string;
  mobileLabel2?: string;
}

const tech = {
  react: { name: "React", icon: "/icons/React_dark.svg" },
  typescript: { name: "TypeScript", icon: "/icons/typescript.svg" },
  nextjs: { name: "Next.js", icon: "/icons/nextjs_icon_dark.svg" },
  tailwind: { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  framer: { name: "Framer Motion", icon: "/icons/Motion_dark.svg" },
  vercel: { name: "Vercel", icon: "/icons/Vercel_dark.svg" },
  nodejs: { name: "Node.js", icon: "/icons/nodejs.svg" },
};

// Images intentionally empty until real screenshots are supplied — the
// mockup components render a neutral placeholder frame instead.
const noImages = { mobile1: "", mobile2: "", main: "" };

export const projects: Project[] = [
  {
    id: "neurospeak",
    title: "NeuroSpeak",
    url: "https://neurospeak.app",
    description:
      "🚀 NeuroSpeak is an AI-powered assistive communication platform designed for individuals with speech and neurological disorders. It enables seamless communication, real-time caregiver collaboration, emergency assistance, and intelligent patient monitoring through a secure and accessible healthcare ecosystem.",
    features: [
      "AI-assisted communication with customizable phrase generation",
      "Real-time caregiver dashboard with live location tracking and SOS alerts",
      "Secure patient management powered by Supabase Realtime and cloud services",
    ],
    tech: [tech.react, tech.typescript, tech.tailwind, tech.nodejs, tech.framer, tech.vercel],
    images: { ...noImages },
    desktopLabel: "Caregiver · dashboard",
    mobileLabel1: "SOS",
    mobileLabel2: "Patients",
  },
  {
    id: "luxoree",
    title: "Luxoree",
    url: "https://luxoree.in",
    description:
      "🚀 Luxoree is a premium fragrance storefront crafted for a luxury perfume brand. Blending cinematic visuals with editorial design, it delivers an immersive shopping experience that helps customers discover signature fragrances through elegant product exploration and seamless ordering.",
    features: [
      "Luxury fragrance catalog with curated collections for men, women, and unisex perfumes",
      "Editorial shopping experience with responsive product discovery and filtering",
      "WhatsApp-powered ordering workflow optimized for speed and accessibility",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.framer, tech.vercel],
    images: { ...noImages },
    desktopLabel: "Luxury · storefront",
    mobileLabel1: "Catalog",
    mobileLabel2: "Shop",
  },
  {
    id: "fabro",
    title: "FABRO",
    url: "https://fabro.in",
    description:
      "🚀 FABRO is a handcrafted embroidery commerce platform built to showcase artisan craftsmanship through modern storytelling and intuitive shopping. Customers can explore curated collections, personalize embroidery requests, and connect directly with skilled creators through a seamless digital experience.",
    features: [
      "Multi-category catalog showcasing handcrafted embroidery collections",
      "Custom embroidery request flow with personalized quotation management",
      "Responsive storefront with modern product discovery and admin management",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.framer, tech.vercel],
    images: { ...noImages },
    desktopLabel: "Embroidery · studio",
    mobileLabel1: "Catalog",
    mobileLabel2: "Customize",
  },
  {
    id: "jmrc",
    title: "Jaipur Metro Rail Corporation",
    url: "",
    description:
      "🚀 An enterprise web application developed during my internship at Jaipur Metro Rail Corporation to modernize internal workflows and improve operational efficiency. The platform streamlines day-to-day management through responsive dashboards, reusable interfaces, and performance-focused engineering.",
    features: [
      "Responsive dashboards for enterprise workflow management",
      "Reusable UI components improving operational efficiency",
      "Production-ready development following industry best practices",
    ],
    tech: [tech.react, tech.typescript, tech.tailwind, tech.nodejs, tech.vercel],
    images: { ...noImages },
    desktopLabel: "Enterprise · dashboard",
    mobileLabel1: "Reports",
    mobileLabel2: "Operations",
  },
  {
    id: "snehra",
    title: "SNehra Solutions",
    url: "https://www.snehrasolutions.com",
    description:
      "🚀 SNehra Solutions is a premium placement consultancy helping early-career professionals launch successful careers through mentor-led training, industry certifications, and guaranteed placement programs. Built around outcomes rather than traditional courses, the platform streamlines the journey from learning to employment.",
    features: [
      "Outcome-driven placement programs with structured mentor guidance",
      "Career tracks for Sales Excellence and Customer Support with certification",
      "Conversion-focused experience designed for applications, onboarding, and lead generation",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.framer, tech.vercel],
    images: { ...noImages },
    desktopLabel: "Placement · consultancy",
    mobileLabel1: "Programs",
    mobileLabel2: "Apply",
  },
];
