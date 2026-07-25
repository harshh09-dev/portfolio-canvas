/*
import { motion } from "framer-motion";
import GithubCard from "../GithubCard";
import SignatureCard from "../SignatureCard";
import SpotifyCard from "../SpotifyCard";

const BehindCurtainsSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <p className="section-label">Behind the curtains</p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-3
            text-4xl
            md:text-6xl
            font-bold
            tracking-tight
            text-foreground
          "
        >
          Decoding logic
          <span
            className="
              font-display
              italic
              bg-gradient-to-r
              from-purple-400
              via-pink-400
              to-yellow-400
              bg-clip-text
              text-transparent
            "
          >
            {" "}
            && the lyrics
          </span>
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <GithubCard />
          <SignatureCard />
          <SpotifyCard />
        </div>
      </div>
    </section>
  );
};

export default BehindCurtainsSection;

*/

"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  GitCommitHorizontal,
  Linkedin,
  Twitter,
} from "lucide-react";
import Reveal from "@/components/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      whileHover={{ y: -3 }}
      className="flex flex-col rounded-3xl border border-border/50 bg-transparent p-7 transition-colors duration-300 hover:border-border"
    >
      {children}
    </motion.div>
  );
}

export function BehindScenes() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-24 md:py-32">
      <div className="mb-14">
        <p className="eyebrow mb-5">Behind the curtains</p>
        <h2 className="font-serif text-5xl leading-tight text-balance sm:text-6xl text-fg">
          Decoding logic &amp;&amp; the lyrics
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* GitHub */}
        <Card>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-border bg-secondary">
              <Github className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Anjali&apos;s GitHub</p>
              <p className="text-xs uppercase tracking-widest text-subtle">
                Latest push
              </p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-400" /> 40m ago
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
            <GitCommitHorizontal className="mt-0.5 size-4 shrink-0 text-brand-2" />
            <div>
              <p className="text-sm">
                &quot;Refine motion system && ship v2026&quot;
              </p>
              <p className="mt-2 text-xs text-subtle">
                Repo: <span className="font-mono text-brand-2">a-versee</span>
              </p>
            </div>
          </div>
          <div className="mt-auto flex gap-2 pt-6">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-brand-2 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </Card>

        {/* Guestbook */}
        <Card delay={0.08}>
          <p className="eyebrow mb-4">Visitors</p>
          <h3 className="font-serif text-4xl leading-none text-fg">
            Leave your signature
          </h3>
          <p className="mt-4 text-muted-foreground">
            Let me know you were here.
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  "from-fuchsia-500 to-purple-500",
                  "from-pink-500 to-rose-500",
                  "from-violet-500 to-fuchsia-500",
                ].map((g, i) => (
                  <span
                    key={i}
                    className={`size-9 rounded-full border-2 border-card bg-gradient-to-br ${g}`}
                  />
                ))}
              </div>
              <span className="text-xs text-subtle">Join others</span>
            </div>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm transition-all hover:border-border-strong"
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
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{ height: h * 3 }}
                  className="w-1 origin-bottom rounded-full bg-brand-2"
                />
              ))}
            </span>
            <p className="text-sm font-semibold">Last Played</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-3">
            <img
              src="/images/album-art.png"
              alt="Album art for Kaise Hua"
              width={72}
              height={72}
              className="size-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Kaise Hua</p>
              <p className="truncate text-xs text-muted-foreground">
                Vishal Mishra · Kabir Singh
              </p>
            </div>
          </div>
          <Reveal
            delay={0.1}
            className="mt-4 text-sm leading-relaxed text-muted-foreground"
          >
            The soundtrack to late-night commits and quiet golden hours.
          </Reveal>
        </Card>
      </div>
    </section>
  );
}

export default BehindScenes;
