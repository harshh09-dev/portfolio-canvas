import { useEffect, useRef, type ElementType } from "react";
import SplitType from "split-type";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  split?: "chars" | "words" | "lines";
  start?: string;
};

/**
 * Line/word/char reveal using SplitType + GSAP ScrollTrigger.
 * Wraps a single string child; renders as the tag you pass.
 */
export default function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  duration = 1,
  stagger = 0.06,
  split = "lines",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const splitInstance = new SplitType(el as HTMLElement, {
      types: split,
      lineClass: "split-line-item",
    });
    const targets =
      split === "lines"
        ? (splitInstance.lines as HTMLElement[])
        : split === "words"
          ? (splitInstance.words as HTMLElement[])
          : (splitInstance.chars as HTMLElement[]);

    if (!targets || !targets.length) return;

    // Wrap each line in an overflow-hidden mask
    if (split === "lines") {
      targets.forEach((line) => {
        line.style.overflow = "hidden";
        line.style.display = "block";
        const inner = document.createElement("span");
        inner.style.display = "block";
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
      });
    }

    const innerTargets =
      split === "lines"
        ? targets.map((l) => l.firstElementChild as HTMLElement).filter(Boolean)
        : targets;

    gsap.set(innerTargets, { yPercent: 110, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(innerTargets, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease: "expo.out",
          stagger,
          delay,
        });
      },
    });

    return () => {
      st.kill();
      splitInstance.revert();
    };
  }, [children, delay, duration, stagger, split, start]);

  const Comp = Tag as ElementType;
  return (
    <Comp ref={ref as any} className={className}>
      {children}
    </Comp>
  );
}
