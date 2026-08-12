import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import { about } from "@/data/about";
import { Link } from "@tanstack/react-router";
import aboutThumb from "@/assets/ref/about-three-thumb.png";
import aboutShape from "@/assets/ref/about-three-shape.png";

/**
 * About — reproduction of `about-three-area`: centred heading, two-column
 * portrait/text split with the circular years-of-experience badge, and the
 * pair of neumorphic info cards overlapping the section edge.
 */
export default function AboutReference() {
  return (
    <section
      id="about"
      className="ref-scope relative z-[1] overflow-hidden"
      style={{ paddingBlock: "clamp(4rem, 7.5vw, 7.5rem)" }}
    >
      <div className="ref-container">
        <div className="relative z-[1]">
          <div className="mx-auto mb-[clamp(3rem,5vw,5.25rem)] max-w-[75%] text-center max-lg:max-w-full">
            <SplitReveal
              as="h2"
              className="text-[clamp(2rem,5vw,5.5rem)] leading-[1.05]"
              split="words"
              stagger={0.05}
            >
              {about.heading}
            </SplitReveal>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="w-full lg:max-w-[725px]">
              <img
                src={aboutThumb}
                alt="Anjali Kamal working at a laptop"
                width={1086}
                height={1448}
                loading="lazy"
                className="w-full rounded-[var(--ref-radius-lg)]"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-8 text-[clamp(1rem,1.15vw,1.25rem)] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              <div className="inline-block">
                <Link
                  to={about.experienceBadge.href}
                  className="ref-circle-btn ref-card h-[clamp(220px,26vw,412px)] w-[clamp(220px,26vw,412px)] flex-col"
                >
                  <span className="flex flex-col items-center justify-center">
                    <span className="font-[family-name:var(--ref-font-heading)] text-[clamp(4rem,11vw,12.5rem)] font-medium leading-none text-[var(--ref-ink)] transition-colors duration-300">
                      {about.experienceBadge.value}
                    </span>
                    <span className="text-center text-[clamp(1rem,1.4vw,1.5rem)] font-bold text-[var(--ref-ink)] transition-colors duration-300">
                      {about.experienceBadge.label}
                    </span>
                  </span>
                  <i className="ref-circle-dot" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* about-three-wrap-shape — info cards straddling the section edge */}
          <div className="mt-10 flex flex-wrap justify-between gap-5">
            {about.cards.map((c) => (
              <Reveal
                key={c.title}
                className="ref-card relative w-full max-w-[284px] rounded-[var(--ref-radius-md)] p-5 max-sm:max-w-full"
              >
                <h2 className="mb-2 text-[clamp(1.25rem,1.6vw,2rem)] font-semibold leading-none">
                  {c.title}
                </h2>
                <p className="text-[1.0625rem] font-medium text-[var(--ref-ink)]">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <img
        src={aboutShape}
        alt=""
        width={1920}
        height={183}
        loading="lazy"
        className="pointer-events-none absolute -top-[clamp(33px,5vw,100px)] left-0 w-full"
      />
    </section>
  );
}
