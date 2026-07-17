import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const EASE = {
  outExpo: "expo.out",
  outQuart: "quart.out",
  signature: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const EASE_ARR = [0.22, 1, 0.36, 1] as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
