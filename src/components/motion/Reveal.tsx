import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  start?: string;
};

/**
 * GSAP + ScrollTrigger reveal. Fades and slides children in when their
 * container enters the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  stagger = 0,
  once = true,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const targets = stagger
      ? (el.children as unknown as HTMLElement[])
      : el;

    gsap.set(targets, { opacity: 0, y });
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          ease: "expo.out",
          delay,
          stagger,
        });
      },
      onLeaveBack: once
        ? undefined
        : () => gsap.to(targets, { opacity: 0, y, duration: 0.4 }),
    });
    return () => {
      st.kill();
    };
  }, [delay, y, duration, stagger, once, start]);

  const Comp = Tag as ElementType;
  return (
    <Comp ref={ref as any} className={className}>
      {children}
    </Comp>
  );
}
