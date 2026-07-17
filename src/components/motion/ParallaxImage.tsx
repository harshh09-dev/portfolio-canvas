import { useEffect, useRef, type CSSProperties } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
};

/**
 * Wraps an image in an overflow container and parallax-shifts it as it
 * scrolls through the viewport. Combined with a scale-in reveal.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 60,
  style,
  loading = "lazy",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const imgEl = img.current;
    if (!wrapEl || !imgEl) return;
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    gsap.fromTo(
      imgEl,
      { yPercent: -amount / 6, scale: 1.12 },
      {
        yPercent: amount / 6,
        scale: 1.02,
        ease: "none",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );

    const reveal = gsap.fromTo(
      wrapEl,
      { clipPath: "inset(8% 8% 8% 8% round 22px)", opacity: 0.6 },
      {
        clipPath: "inset(0% 0% 0% 0% round 22px)",
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top 80%",
          once: true,
        },
      },
    );

    return () => {
      reveal.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapEl) st.kill();
      });
    };
  }, [amount]);

  return (
    <div ref={wrap} className={className} style={{ overflow: "hidden", borderRadius: "22px", ...style }}>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={loading}
        className={imgClassName}
        style={{ width: "100%", height: "100%", objectFit: "cover", willChange: "transform" }}
      />
    </div>
  );
}
