import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { estimatedLabel, heroContent, heroExtras, kpiItems } from "@/content/siteContent";
import { prefersReducedMotion } from "@/lib/motion";
import { HeroScene } from "@/components/HeroScene";
import { Picture } from "@/components/Picture";
import { Stripes } from "@/components/Stripes";

const highlights = heroExtras.highlightKpis
  .map((id) => kpiItems.find((k) => k.id === id))
  .filter((k): k is (typeof kpiItems)[number] => Boolean(k));

export function Hero() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Anime.js intro — secondary items only (h1 + LCP image are never hidden)
    animate("[data-hero-item]", {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 900,
      delay: stagger(90, { start: 100 }),
      ease: "outCubic",
    });
    animate("[data-hero-frame]", {
      translateX: [24, 0],
      duration: 1100,
      ease: "outExpo",
    });
  }, []);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="section-anchor-offset relative isolate overflow-hidden bg-navy-950 pt-16 text-white"
    >
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 opacity-90 [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_75%)]">
        <HeroScene />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p
            data-hero-item
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-gray"
          >
            <Stripes className="h-3 text-blue-400" count={3} />
            {heroExtras.eyebrow}
          </p>
          <h1 id="hero-title" className="text-[clamp(2.75rem,10vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            {heroContent.title}
            <span className="sr-only"> — </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-200 md:text-xl">{heroContent.subtitle}</p>

          <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={heroContent.ctaHref}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold text-brand-blue transition-transform duration-300 hover:-translate-y-0.5"
            >
              {heroContent.cta}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={heroExtras.secondaryCtaHref}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              {heroExtras.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div data-hero-frame className="relative">
            {/* parallelogram frame with white outline, like the logo */}
            <div className="clip-para bg-white p-[3px]">
              <div className="clip-para bg-brand-blue">
                <Picture
                  name="Bus2"
                  widths={[400, 516]}
                  width={516}
                  height={387}
                  sizes="(min-width: 1024px) 480px, 86vw"
                  alt={heroExtras.imageAlt}
                  className="aspect-[4/3] h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
            <Stripes className="absolute -bottom-6 left-2 h-10 text-brand-gray" count={5} />
          </div>
          <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-blue-200">
            Fig. 01 — {heroExtras.sceneCaption}
          </p>
        </div>
      </div>

      {/* KPI strip (Via / Ramp-style headline figures) */}
      <div className="relative border-t border-white/10 bg-navy-900/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10 px-0 sm:px-6">
          {highlights.map((k) => (
            <div key={k.id} data-hero-item className="px-4 py-5 sm:px-6 md:py-7">
              <dt className="text-xs font-medium text-blue-200 sm:text-sm">{k.label}</dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2">
                <span className="tabular text-2xl font-bold tracking-tight sm:text-4xl">{k.value}</span>
                {k.estimated ? <span className="text-[0.65rem] text-blue-200 sm:text-xs">{estimatedLabel}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
