// ============================================================
// Projects — data + accent rotation
// ============================================================
// Accent palette follows a documented rotating order tied to
// project index. NOT random. The order is set by role in the
// storytelling sequence rather than by hue:
//
//   0. rune           → red    (flagship, its actual brand color)
//   1. runehub        → blue   (education/learning register)
//   2. runelearn      → amber  (study/warm register)
//   3. runecareer     → rose   (career/human register)
//   4. runeai         → slate  (AI infra/neutral register)
//   5. old-portfolio  → orange (archival register)
//
// If a project is added or reordered, keep the accent tied to
// the project itself (its own brand), not the slot.
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
  gradient: string;
  accent: {
    dash: string;
    fill: string;
    text: string;
    bg: string;
  };
  images: {
    mobile1: string;
    mobile2: string;
    main: string;
  };
  mainImageFit?: "cover" | "fill";
  // Short human labels for branded mockup fallback screens
  desktopLabel?: string;
  mobileLabel1?: string;
  mobileLabel2?: string;
}

const tech = {
  react: { name: "React", icon: "/icons/React_dark.svg" },
  typescript: { name: "TypeScript", icon: "/icons/typescript.svg" },
  nextjs: { name: "Next.js", icon: "/icons/nextjs_icon_dark.svg" },
  tailwind: { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  runeai: { name: "RuneAI", icon: "/icons/RuneLogo.svg" },
  framer: { name: "Framer Motion", icon: "/icons/Motion_dark.svg" },
  prism: { name: "Prism.js", icon: "/icons/RuneLogo.svg" },
  vercel: { name: "Vercel", icon: "/icons/Vercel_dark.svg" },
  langgraph: { name: "LangGraph", icon: "/icons/langgraph.svg" },
  tavily: { name: "Tavily", icon: "/icons/tavily.svg" },
  appwrite: { name: "Appwrite", icon: "/icons/appwrite.svg" },
  nodejs: { name: "Node.js", icon: "/icons/nodejs.svg" },
  gsap: { name: "GSAP", icon: "/icons/gsap.svg" },
  prisma: { name: "Prisma", icon: "/icons/Prisma_dark.svg" },
};

// NOTE: image paths intentionally blank. Each mockup component
// renders a branded fallback (accent gradient + project title +
// short label) instead of a broken-image icon. Drop real PNGs
// into public/images/projects/ using the paths documented below
// and they will replace the fallbacks automatically.

export const projects: Project[] = [
  {
    id: "rune",
    title: "Rune",
    url: "https://rune.codes",
    description:
      "🚀 Rune is your all-in-one productivity toolkit featuring 145+ powerful tools for learning, creating, and working smarter. From text & writing tools, PDF management, image editing, video processing, to developer utilities, calculators, and AI-powered assistants—Rune empowers students, professionals, and creators with free 24/7 access to streamline their workflow.",
    features: [
      "145+ free tools including text editors, PDF converters, and image processors",
      "AI-powered tools for writing, summarizing, and content creation",
      "Developer utilities with JSON formatter, regex tester, and code tools",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.runeai, tech.framer],
    gradient:
      "linear-gradient(135deg, oklch(0.30 0.14 25) 0%, oklch(0.42 0.18 22) 55%, oklch(0.55 0.20 22) 100%)",
    accent: {
      dash: "bg-red-600",
      fill: "fill-red-600",
      text: "text-red-400",
      bg: "bg-red-600/20",
    },
    images: { mobile1: "", mobile2: "", main: "" },
    desktopLabel: "145+ tools · dashboard",
    mobileLabel1: "Toolkit",
    mobileLabel2: "AI assist",
  },
  {
    id: "runehub",
    title: "RuneHub",
    url: "https://rune.codes/hub",
    description:
      "🚀 RuneHub is a comprehensive programming education platform featuring extensive tutorials and articles on different programming languages, frameworks, and technologies. It includes a dedicated tech trends section with the latest industry news and insights, now powered by its own powerful custom CMS.",
    features: [
      "62+ topics to study across different programming languages and technologies",
      "RuneAI powered key insights for accelerated learning",
      "Developer focused UX with its own powerful custom CMS",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.runeai, tech.prism],
    gradient:
      "linear-gradient(135deg, oklch(0.28 0.10 250) 0%, oklch(0.38 0.14 250) 55%, oklch(0.55 0.14 240) 100%)",
    accent: {
      dash: "bg-blue-600",
      fill: "fill-blue-600",
      text: "text-blue-400",
      bg: "bg-blue-600/20",
    },
    images: { mobile1: "", mobile2: "", main: "" },
    desktopLabel: "62+ topics · library",
    mobileLabel1: "Read",
    mobileLabel2: "Trends",
  },
  {
    id: "runelearn",
    title: "RuneLearn",
    url: "https://rune.codes/learn",
    description:
      "🚀 RuneLearn is an ultimate AI-powered study companion that dynamically generates quizzes, intelligent flashcards, personalized roadmaps, and instantly resolves doubts with its deep-context advanced doubt solver. Designed to turbocharge long-term memory and retention effortlessly.",
    features: [
      "Interactive Quizzes and Flashcards dynamically generated by AI",
      "Personalized Learning Roadmaps tailored to your study goals",
      "Advanced Doubt Solver providing in-depth explanations instantly",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.runeai, tech.vercel],
    gradient:
      "linear-gradient(135deg, oklch(0.32 0.10 60) 0%, oklch(0.44 0.14 65) 55%, oklch(0.60 0.16 75) 100%)",
    accent: {
      dash: "bg-amber-600",
      fill: "fill-amber-600",
      text: "text-amber-400",
      bg: "bg-amber-600/20",
    },
    images: { mobile1: "", mobile2: "", main: "" },
    desktopLabel: "Roadmap · study",
    mobileLabel1: "Quiz",
    mobileLabel2: "Flashcards",
  },
  {
    id: "runecareer",
    title: "RuneCareer",
    url: "https://rune.codes/career",
    description:
      "🚀 RuneCareer is a complete career suite with a resume builder, LaTeX editor, ATS checker, and AI-guided cover and resignation letters. Pro templates and Rune AI suggestions help you ship polished applications fast.",
    features: [
      "Resume builder with pro templates and one-click formatting",
      "LaTeX editor with live preview for academic CVs",
      "ATS checker plus AI-assisted cover and resignation letters",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.tailwind, tech.runeai, tech.framer],
    gradient:
      "linear-gradient(135deg, oklch(0.30 0.12 12) 0%, oklch(0.42 0.16 10) 55%, oklch(0.58 0.16 10) 100%)",
    accent: {
      dash: "bg-rose-500",
      fill: "fill-rose-500",
      text: "text-rose-300",
      bg: "bg-rose-500/20",
    },
    images: { mobile1: "", mobile2: "", main: "" },
    desktopLabel: "Resume · builder",
    mobileLabel1: "CV",
    mobileLabel2: "Letters",
  },
  {
    id: "runeai",
    title: "RuneAI",
    url: "https://ai.rune.codes",
    description:
      "🚀 Rune AI featuring a powerful RAG system, three specialized models (Fast, Thinking, Pro), and a massive 500K context limit. Includes advanced Web Search capable of deep research and intelligent Tool Calling automation.",
    features: [
      "Powered by its own dedicated server for AI models hosted on Digital Ocean",
      "Massive 500K context limit for deep document analysis",
      "Advanced Web Search and intelligent automated Tool Calling",
    ],
    tech: [tech.runeai, tech.langgraph, tech.tavily, tech.appwrite, tech.nextjs, tech.vercel],
    gradient:
      "linear-gradient(135deg, oklch(0.22 0.01 260) 0%, oklch(0.32 0.02 260) 55%, oklch(0.48 0.02 260) 100%)",
    accent: {
      dash: "bg-slate-500",
      fill: "fill-slate-500",
      text: "text-slate-300",
      bg: "bg-slate-500/20",
    },
    images: { mobile1: "", mobile2: "", main: "" },
    mainImageFit: "fill",
    desktopLabel: "Chat · 500K ctx",
    mobileLabel1: "Ask",
    mobileLabel2: "Tools",
  },
  {
    id: "old-portfolio",
    title: "Old Portfolio",
    url: "https://parthsharma.me",
    description:
      "🚀 A premium, high-performance portfolio crafted for the modern web. Featuring fluid GSAP animations, physics-based interactions, and a polished aesthetic, this template sets a new standard for creative developers. Built with a robust stack including Next.js, Prisma, and Zustand, it offers a seamless blend of design excellence and engineering precision.",
    features: [
      "Premium, high-performance design with fluid GSAP animations",
      "Physics-based interactions and advanced state management",
      "Robust full-stack architecture with Prisma and Node.js",
    ],
    tech: [tech.react, tech.typescript, tech.nextjs, tech.nodejs, tech.tailwind, tech.gsap],
    gradient:
      "linear-gradient(135deg, oklch(0.32 0.14 40) 0%, oklch(0.44 0.18 45) 55%, oklch(0.60 0.18 55) 100%)",
    accent: {
      dash: "bg-orange-500",
      fill: "fill-orange-500",
      text: "text-orange-300",
      bg: "bg-orange-500/20",
    },
    images: { mobile1: "", mobile2: "", main: "" },
    desktopLabel: "Case · portfolio",
    mobileLabel1: "Home",
    mobileLabel2: "Case",
  },
];
