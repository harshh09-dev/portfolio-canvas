import { useEffect, useRef, useState } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { Link } from "@tanstack/react-router";
import { hero } from "@/data/hero";
import manImg from "@/assets/ref/banner-three-man.png";
import lineShape from "@/assets/ref/banner-three-shape.png";

/** purecounter equivalent — counts up once the hero enters. */
function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 2000;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

/**
 * Hero — reproduction of the reference `banner-three-area`:
 * illustration centred behind an oversized lowercase wordmark, then a
 * three-part end-aligned row (neumorphic intro card / stroked statement +
 * CTA / stacked counter cards), with the horizontal line shape and its
 * pulsing circle beneath.
 */
export default function HeroSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from(".ref-hero-title", {
        yPercent: 18,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.1,
      });
      gsap.from(".ref-hero-man", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.25,
      });
      gsap.from(".ref-hero-fade", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "ease" in gsap ? "power3.out" : "power3.out",
        stagger: 0.1,
        delay: 0.4,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="ref-scope relative w-full overflow-hidden"
      style={{ paddingBlock: "clamp(7rem, 12vw, 12.5rem) clamp(4rem, 6vw, 6.25rem)" }}
    >
      <div className="ref-container">
        <div className="relative z-10">
          {/* Illustration sits behind the wordmark, bottom-anchored */}
          <div className="ref-hero-man pointer-events-none absolute bottom-[27%] left-1/2 z-0 -translate-x-1/2 max-md:bottom-[38%]">
            <img
              src={manImg}
              alt=""
              width={667}
              height={970}
              loading="eager"
              className="h-auto w-[min(42vw,667px)] max-md:w-[58vw]"
            />
          </div>

          <h1 className="ref-hero-title ref-banner-title relative z-[1] mb-4 select-none text-center lg:text-left">
            {hero.word}
          </h1>

          {/* banner-three-wrap — three parts, bottom aligned */}
          <div className="relative z-[1] flex flex-wrap items-end justify-between gap-8 lg:flex-nowrap">
            {/* Left — intro + capability list */}
            <div
              className="ref-hero-fade ref-card hidden w-full max-w-[260px] rounded-[var(--ref-radius-lg)] px-5 py-[35px] sm:block lg:max-w-[350px] lg:px-[35px] xl:max-w-[410px] lg:mb-[160px]"
            >
              <h2 className="mb-6 text-[clamp(1.25rem,1.5vw,1.6rem)] leading-[1.4]">
                {hero.introLead} <br />
                {hero.intro}
              </h2>
              <ul className="w-full max-w-[280px]">
                {hero.capabilities.map((c) => (
                  <li
                    key={c}
                    className="mb-4 flex items-center gap-2 text-[1.0625rem] font-medium text-[var(--ref-ink)]"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-3 w-3 shrink-0 bg-[var(--ref-accent)]"
                      style={{
                        clipPath:
                          "polygon(42% 0,58% 0,58% 42%,100% 42%,100% 58%,58% 58%,58% 100%,42% 100%,42% 58%,0 58%,0 42%,42% 42%)",
                      }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Centre — stroked statement + primary CTA */}
            <div className="ref-hero-fade order-first mx-auto mt-[42vw] w-full text-center sm:mt-0 lg:order-none lg:max-w-[575px]">
              <h3 className="ref-stroke-heading mx-auto mb-5 w-full max-w-[575px] !text-white [-webkit-text-stroke:1px_var(--ref-ink)]">
                {hero.statement}
              </h3>
              <Link
                to={hero.primaryCta.href}
                className="ref-btn bg-[var(--ref-ink)] text-white"
              >
                {hero.primaryCta.label}
                <span className="ref-btn-dot" aria-hidden />
              </Link>
            </div>

            {/* Right — counter cards + stack avatars */}
            <div className="ref-hero-fade ref-card hidden w-full max-w-[260px] rounded-[var(--ref-radius-lg)] p-5 sm:block lg:max-w-[350px] lg:p-[35px] xl:max-w-[410px] lg:mb-[160px]">
              {hero.counters.map((c, i) => (
                <div
                  key={c.label}
                  className={`ref-card relative mb-4 w-full max-w-[284px] rounded-[var(--ref-radius-md)] p-5 ${
                    i === 1 ? "ml-auto !bg-[var(--ref-ink)]" : ""
                  } ${i === 1 ? "-mt-5" : ""}`}
                >
                  <h4
                    className={`mb-2 text-[clamp(2.25rem,3.4vw,4rem)] font-semibold leading-none ${
                      c.invert ? "!text-white" : ""
                    }`}
                  >
                    <Counter to={c.value} />
                    {c.suffix}
                  </h4>
                  <p
                    className={`text-[1.0625rem] font-medium ${
                      c.invert ? "text-white" : "text-[var(--ref-ink)]"
                    }`}
                  >
                    {c.label}
                  </p>
                </div>
              ))}

              <div className="mb-3 mt-6 flex items-center">
                {hero.stack.map((t, i) => (
                  <span
                    key={t}
                    title={t}
                    className="relative z-[1] grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 border-white bg-white text-[0.6875rem] font-bold uppercase text-[var(--ref-ink)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
                    style={{ marginInlineStart: i === 0 ? 0 : "-16px" }}
                  >
                    {t.slice(0, 2)}
                  </span>
                ))}
              </div>
              <h4 className="mb-2 text-[clamp(1.5rem,2vw,2rem)] font-semibold">
                {hero.stackTitle}
              </h4>
              <p className="text-[1.0625rem] font-medium text-[var(--ref-ink)]">
                {hero.stackLabel}
              </p>
            </div>
          </div>

          {/* Line shape + pulsing circle */}
          <div className="pointer-events-none absolute bottom-[6%] left-1/2 z-0 hidden -translate-x-1/2 lg:block">
            <img src={lineShape} alt="" width={1770} height={180} loading="lazy" />
            <div className="ref-card absolute -top-6 left-1/2 grid h-[50px] w-[50px] -translate-x-1/2 place-items-center rounded-full border border-[var(--ref-hairline)] !shadow-none">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white">
                <span className="relative block h-3 w-3 rounded-full bg-[var(--ref-accent)]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--ref-accent)]/40" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
