import Reveal from "@/components/motion/Reveal";
import { ArrowUpRight } from "lucide-react";
import { refServices } from "@/data/refServices";

/**
 * Services — reproduction of `service-three-area`: pill-shaped rows on black,
 * alternating left/right, each with an index + arrow, title, tag pills and a
 * thumbnail. Hover paints the border, number and title in the accent.
 */
export default function ServicesList() {
  return (
    <section
      id="services"
      className="ref-ink-bg relative"
      style={{ paddingBlock: "clamp(4rem, 7.5vw, 7.5rem) clamp(2rem, 4vw, 3.75rem)" }}
    >
      <div className="ref-container">
        {refServices.map((s, i) => (
          <Reveal
            key={s.number}
            delay={0.1 * i}
            y={0}
            className={`ref-service-row mb-[clamp(1.5rem,3vw,3.75rem)] ${i % 2 === 1 ? "ml-auto" : ""}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-y-8">
              <div className="flex flex-wrap items-center gap-x-14 gap-y-6">
                <span className="ref-service-number inline-flex w-[86px] items-center gap-3 text-xl leading-none text-white transition-colors duration-300">
                  {s.number}
                  <ArrowUpRight size={20} aria-hidden />
                </span>
                <div>
                  <h2 className="ref-service-title mb-4 text-[clamp(1.5rem,3vw,3.5rem)] !text-white transition-colors duration-300">
                    {s.title}
                  </h2>
                  <ul className="flex flex-wrap gap-2.5">
                    {s.tags.map((t) => (
                      <li key={t}>
                        <span className="ref-pill !border-[var(--ref-hairline-inv)] text-white">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="max-lg:hidden">
                <img
                  src={s.thumb}
                  alt=""
                  width={552}
                  height={257}
                  loading="lazy"
                  className="h-auto w-[min(30vw,552px)] rounded-[var(--ref-radius-md)]"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
