import { createFileRoute } from "@tanstack/react-router";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { site } from "@/data/site";

const groups = [
  {
    title: "Machine",
    items: [
      "MacBook Air M2 · 16GB — daily driver",
      'LG 27" 4K — second display, portrait for docs',
      "Keychron K3 Pro — low-profile brown switches",
      "Logitech MX Master 3S",
    ],
  },
  {
    title: "Editor & terminal",
    items: [
      "VS Code — Vesper theme, JetBrains Mono",
      "Warp + zsh with starship prompt",
      "GitHub Copilot for scaffolding, never for logic",
      "Raycast for everything launcher-shaped",
    ],
  },
  {
    title: "Design",
    items: [
      "Figma — layout, tokens, handoff",
      "Fraunces + Manrope — the typographic pair on this site",
      "Cleanshot X for captures and annotated bugs",
      "Rive for interaction prototypes",
    ],
  },
  {
    title: "Ship",
    items: [
      "React + TypeScript + Tailwind",
      "TanStack Router / Start for routing and SSR",
      "Supabase for auth, Postgres and realtime",
      "Vercel + GitHub Actions",
    ],
  },
];

export const Route = createFileRoute("/uses")({
  head: () => ({
    meta: [
      { title: `Uses — tools, gear and software · ${site.name}` },
      {
        name: "description",
        content:
          "The hardware, editor setup, design tools and stack Anjali Kamal uses day to day to design and ship products.",
      },
      { property: "og:title", content: `Uses — ${site.name}` },
      {
        property: "og:description",
        content: "Machine, editor, design tools and shipping stack.",
      },
      { property: "og:url", content: "/uses" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/uses" }],
  }),
  component: UsesPage,
});

function UsesPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="text-eyebrow">Uses</p>
          </Reveal>
          <SplitReveal as="h1" className="text-display mt-4" split="words">
            The tools behind the work.
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="text-lead mx-auto mt-8 max-w-2xl">
              Nothing exotic — a small set of things I know well enough to stop thinking
              about.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="divider-hair container-editorial" />
      <section className="section">
        <div className="container-editorial grid gap-12 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <h2 className="text-eyebrow">{g.title}</h2>
              <ul className="mt-5 divide-y divide-border border-t border-border">
                {g.items.map((item) => (
                  <li key={item} className="py-3.5 text-sm text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
