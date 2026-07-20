import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";
import { site, socials } from "@/data/site";

export default function ContactCTA() {
  return (
    <section className="section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px 400px at 20% 100%, color-mix(in oklch, var(--accent-pink) 14%, transparent), transparent 60%), radial-gradient(700px 400px at 80% 0%, color-mix(in oklch, var(--accent-blue) 12%, transparent), transparent 60%)",
        }}
      />

      <div className="container-editorial relative">
        <div className="section-header">
          <Reveal>
            <p className="text-eyebrow">Contact</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            Let&apos;s create{" "}
            <span className="work-text">something real.</span>
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="text-lead max-w-xl mx-auto">
              I&apos;m open to select engagements — product design, founding
              engineering, and creative collaborations.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-4 flex flex-col items-center gap-6">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-base font-medium text-black transition-transform hover:scale-[1.02]"
                style={{ background: "var(--gradient-signature)" }}
              >
                <Mail size={16} />
                {site.email}
                <span className="grid place-items-center h-11 w-11 rounded-full bg-black/90 text-white">
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Magnetic>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 text-eyebrow"
            >
              {socials.map((s, i) => (
                <span key={s.name} className="flex items-center gap-4">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-fg transition-colors"
                  >
                    {s.name}
                  </a>
                  {i < socials.length - 1 && (
                    <span className="text-fg-subtle">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
