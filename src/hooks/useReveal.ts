import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * GSAP ScrollTrigger batch reveal for every [data-reveal] element.
 * Animates transform + opacity only. With reduced motion the CSS never hides them.
 */
export function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
        // Parallax on decorative stripe bands (transform only)
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            xPercent: Number(el.dataset.parallax ?? -10),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
