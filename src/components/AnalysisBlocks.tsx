import { useEffect, useState } from "react";
import { analysisBlocks, sectionCopy } from "@/content/siteContent";
import { Section } from "@/components/Section";

/** Scrollytelling (The Pudding-style): sticky index highlights the block in view via ScrollTrigger. */
export function AnalysisBlocks() {
  const [active, setActive] = useState(analysisBlocks[0]?.id);

  useEffect(() => {
    let triggers: { kill: () => void }[] = [];
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      triggers = analysisBlocks.map((b) =>
        ScrollTrigger.create({
          trigger: `#bloque-${b.id}`,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(b.id),
        }),
      );
    })();
    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section
      id="analisis"
      index={sectionCopy.analysis.index}
      eyebrow={sectionCopy.analysis.eyebrow}
      title={sectionCopy.analysis.title}
      description={sectionCopy.analysis.description}
    >
      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label={sectionCopy.analysis.tocLabel} className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">{sectionCopy.analysis.tocLabel}</p>
            <ol className="space-y-1 border-l border-gray-400/60">
              {analysisBlocks.map((b, i) => {
                const on = b.id === active;
                return (
                  <li key={b.id}>
                    <a
                      href={`#bloque-${b.id}`}
                      aria-current={on ? "true" : undefined}
                      className={`-ml-px flex gap-3 border-l-2 py-2 pl-4 text-sm transition-colors ${
                        on ? "border-brand-blue font-bold text-brand-blue" : "border-transparent text-ink-muted hover:text-ink"
                      }`}
                    >
                      <span className="font-mono tabular">{String(i + 1).padStart(2, "0")}</span>
                      {b.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        <div className="space-y-5">
          {analysisBlocks.map((block, i) => (
            <article
              key={block.id}
              id={`bloque-${block.id}`}
              data-reveal
              className="section-anchor-offset relative overflow-hidden rounded-2xl border border-gray-400/50 bg-white p-6 md:p-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-medium text-brand-blue tabular" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{block.title}</h3>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">{block.body}</p>
              {block.bullets?.length ? (
                <ul className="mt-6 grid gap-3 md:grid-cols-3">
                  {block.bullets.map((item) => (
                    <li key={item} className="relative rounded-lg bg-gray-100 p-4 pl-6 text-sm leading-relaxed text-ink">
                      <span className="absolute left-2.5 top-4 h-4 w-1 skew-brand bg-brand-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
