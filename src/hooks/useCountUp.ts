import { useEffect, type RefObject } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Anime.js counter: animates the numeric part of a formatted value ("128 K", "$2.4 M", "87 %")
 * the first time the element enters the viewport. Text content is final in the HTML,
 * so no-JS / reduced-motion users always see the real value.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, value: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num.replace(",", "."));
    const decimals = (num.split(".")[1] ?? "").length;
    if (Number.isNaN(target)) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const state = { n: 0 };
        animate(state, {
          n: target,
          duration: 1400,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = `${prefix}${state.n.toFixed(decimals)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = value;
          },
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, value]);
}
