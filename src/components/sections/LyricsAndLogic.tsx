"use client";

import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  GitCommitHorizontal,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import Reveal from "@/components/ScrollReveal";
import { getGithubActivity } from "@/lib/github.functions";
import { socials } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      whileHover={{ y: -3 }}
      className="flex flex-col rounded-3xl border border-border/60 bg-transparent p-7 transition-colors duration-300 hover:border-border-strong"
    >
      {children}
    </motion.div>
  );
}

const socialIcons = [
  { Icon: Github, name: "GitHub" },
  { Icon: Linkedin, name: "LinkedIn" },
  { Icon: Instagram, name: "Instagram" },
  { Icon: Twitter, name: "X" },
];

export function BehindScenes() {
  const fetchActivity = useServerFn(getGithubActivity);
  const { data: activity } = useQuery({
    queryKey: ["github-activity"],
    queryFn: () => fetchActivity(),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-24 md:py-32">
      <div className="mb-14">
        <p className="text-eyebrow mb-5">Behind the curtains</p>
        <h2 className="text-balance font-serif text-5xl leading-tight text-fg sm:text-6xl">
          Decoding logic &amp;&amp; the lyrics
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* GitHub — live activity */}
        <Card>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-border bg-surface">
              <Github className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-fg">Anjali&apos;s GitHub</p>
              <p className="text-xs uppercase tracking-widest text-fg-subtle">Latest push</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs text-fg-muted">
              <span className="size-1.5 rounded-full bg-fg/60" />
              {activity?.relativeTime ?? "loading"}
            </span>
          </div>
          <a
            href={activity?.url ?? "https://github.com/A-verse"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <GitCommitHorizontal className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
            <div>
              <p className="text-sm text-fg">
                {activity ? `“${activity.message}”` : "Fetching latest commit…"}
              </p>
              <p className="mt-2 text-xs text-fg-subtle">
                Repo: <span className="font-mono text-fg-muted">{activity?.repo ?? "—"}</span>
              </p>
            </div>
          </a>
          <div className="mt-auto flex gap-2 pt-6">
            {socialIcons.map(({ Icon, name }) => {
              const match = socials.find((s) => s.name === name);
              return (
                <a
                  key={name}
                  href={match?.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid size-10 place-items-center rounded-full border border-border text-fg-muted transition-all hover:-translate-y-1 hover:border-border-strong hover:text-fg"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </Card>

        {/* Guestbook */}
        <Card delay={0.08}>
          <p className="text-eyebrow mb-4">Visitors</p>
          <h3 className="font-serif text-4xl leading-none text-fg">Leave your signature</h3>
          <p className="mt-4 text-fg-muted">Let me know you were here.</p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[0.28, 0.2, 0.14].map((o, i) => (
                  <span
                    key={i}
                    style={{ background: `color-mix(in oklch, var(--fg) ${o * 100}%, transparent)` }}
                    className="size-9 rounded-full border-2 border-bg"
                  />
                ))}
              </div>
              <span className="text-xs text-fg-subtle">Join others</span>
            </div>
            <a
              href="/guestbook"
              className="group flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-fg transition-all hover:border-border-strong"
            >
              Sign
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Card>

        {/* Now playing */}
        <Card delay={0.16}>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex items-end gap-0.5">
              {[3, 5, 2, 6].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                  style={{ height: h * 3 }}
                  className="w-1 origin-bottom rounded-full bg-fg/70"
                />
              ))}
            </span>
            <p className="text-sm font-semibold text-fg">Last Played</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-3">
            <img
              src="/images/album-art.png"
              alt="Album art for Kaise Hua"
              width={72}
              height={72}
              loading="lazy"
              className="photo-mono size-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-fg">Kaise Hua</p>
              <p className="truncate text-xs text-fg-muted">Vishal Mishra · Kabir Singh</p>
            </div>
          </div>
          <Reveal delay={0.1} className="mt-4 text-sm leading-relaxed text-fg-muted">
            The soundtrack to late-night commits and quiet golden hours.
          </Reveal>
        </Card>
      </div>
    </section>
  );
}

export default BehindScenes;
