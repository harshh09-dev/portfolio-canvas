import Reveal from "@/components/motion/Reveal";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { refWorks } from "@/data/works";

/**
 * Works — reproduction of `portfolio-three-area`: the giant "works" word
 * behind a staggered two-column set of neumorphic project cards, with the
 * circular "Explore My Projects" badge anchored bottom-left.
 */
export default function WorksSection() {
  return (
    <section
      id="portfolio"
      className="ref-scope relative z-[1] overflow-hidden"
      style={{ paddingBlock: "clamp(4rem, 7.5vw, 7.5rem)" }}
    >
      <div className="pointer-events-none absolute top-0 left-0 z-0 w-full select-none text-center">
        <h3 className="ref-shape-title">works</h3>
      </div>

      <div className="ref-container">
        <div className="relative z-[1] flex flex-wrap items-start justify-between">
          {refWorks.map((w, i) => (
            <div
              key={w.title}
              className={`w-full lg:max-w-[calc(50%-1.5rem)] ${
                i % 2 === 1 ? "lg:mt-[clamp(0px,30vw,617px)]" : ""
              }`}
            >
              <Reveal
                delay={0.05 * i}
                className="ref-card mb-[clamp(1.25rem,2.5vw,4.375rem)] rounded-[var(--ref-radius-lg)] p-[30px] pt-[38px] transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="mb-[30px] flex flex-wrap items-start justify-between gap-4">
                  <div className="mb-6">
                    <h2 className="mb-4 text-[clamp(1.5rem,2.6vw,3.5rem)] font-medium">
                      <Link to={w.href} className="transition-colors hover:text-[var(--ref-accent)]">
                        {w.title}
                      </Link>
                    </h2>
                    <ul className="flex flex-wrap gap-2.5">
                      {w.tags.map((t) => (
                        <li key={t}>
                          <span className="ref-pill text-[var(--ref-ink)]">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={w.href}
                    aria-label={`Open ${w.title}`}
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e4e4e4] text-[var(--ref-ink)] transition-colors hover:bg-[var(--ref-accent)] hover:text-white"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
                <Link to={w.href} className="block overflow-hidden rounded-[var(--ref-radius-lg)]">
                  <img
                    src={w.thumb}
                    alt={w.title}
                    loading="lazy"
                    className="w-full rounded-[var(--ref-radius-lg)] transition-transform duration-700 hover:scale-[1.03]"
                  />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-start">
          <Link
            to="/projects"
            className="ref-circle-btn ref-card h-[clamp(180px,20vw,282px)] w-[clamp(180px,20vw,282px)]"
          >
            <span className="flex flex-col items-center justify-center">
              <span className="text-[clamp(1rem,1.4vw,1.5rem)] font-bold text-[var(--ref-ink)] transition-colors duration-300">
                Explore <br /> My Projects
              </span>
            </span>
            <i className="ref-circle-dot" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
