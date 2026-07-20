import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { stats, socials } from "@/data/site";

const cards = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
  "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=900&q=80",
];

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  X: FaXTwitter,
};

export default function AboutPreview() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-editorial">
        <div className="section-header">
          <Reveal>
            <p className="text-eyebrow">A little about me</p>
          </Reveal>
          <SplitReveal as="h2" className="section-heading" split="words">
            Turning imagination into{" "}
            <span className="work-text">interaction.</span>
          </SplitReveal>
        </div>

        <div className="grid items-center gap-14 lg:gap-20 lg:grid-cols-2">
          {/* Left — copy */}
          <Reveal>
            <p className="text-lead mb-6">
              I&apos;m Anjali Kamal — a B.Tech student at IIIT Jabalpur, full-stack
              developer, and creative thinker who believes technology should feel
              human. I build systems that are scalable, reliable, and beautiful.
            </p>
            <p className="text-lead mb-8">
              From embedded IoT systems to modern web platforms, my work bridges
              engineering precision with design sensibility.
            </p>

            {/* Pull quote */}
            <blockquote
              className="mb-10 border-l pl-6 py-1"
              style={{ borderColor: "color-mix(in oklch, var(--accent-pink) 60%, transparent)" }}
            >
              <p
                className="text-fg"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  lineHeight: 1.3,
                  fontVariationSettings: '"SOFT" 100',
                }}
              >
                &ldquo;Technology should feel handcrafted, not manufactured.&rdquo;
              </p>
            </blockquote>

            <div className="mb-8 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.name] || FaGithub;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="glass-card rounded-full p-3 transition-transform duration-300 hover:scale-110 hover:text-fg"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface"
            >
              More about me <ArrowRight size={14} />
            </a>
          </Reveal>

          {/* Right — carousel + stats */}
          <Reveal delay={0.15}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-6 blur-3xl opacity-40 pointer-events-none"
                  style={{ background: "var(--gradient-signature-soft)" }}
                />
                <Swiper
                  effect="coverflow"
                  centeredSlides
                  slidesPerView={"auto"}
                  loop
                  speed={1400}
                  grabCursor
                  autoplay={{ delay: 2800, disableOnInteraction: false }}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 260,
                    modifier: 2,
                    scale: 0.88,
                    slideShadows: false,
                  }}
                  modules={[EffectCoverflow, Autoplay]}
                  className="w-full relative"
                >
                  {cards.map((src, i) => (
                    <SwiperSlide
                      key={i}
                      className="!w-[260px] overflow-hidden rounded-3xl border border-border bg-surface"
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-[420px] w-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card rounded-2xl p-5 text-center"
                  >
                    <h3
                      className="gradient-text"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.75rem",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        fontVariationSettings: '"SOFT" 100',
                      }}
                    >
                      {stat.value}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-fg-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
