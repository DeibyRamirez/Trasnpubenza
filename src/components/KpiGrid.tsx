import { useRef } from "react";
import { estimatedLabel, kpiItems, sectionCopy, trendLabels, type KpiItem } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { useCountUp } from "@/hooks/useCountUp";

const trendStyle = {
  up: { cls: "bg-brand-blue text-white", icon: "↗" },
  down: { cls: "border border-brand-blue bg-white text-brand-blue", icon: "↘" },
  neutral: { cls: "bg-brand-gray text-ink", icon: "→" },
} as const;

function KpiCard({ kpi, i }: { kpi: KpiItem; i: number }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  useCountUp(valueRef, kpi.value);
  const trend = kpi.trend ? trendStyle[kpi.trend] : null;

  return (
    <article
      data-reveal
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-400/50 bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgb(0_51_153/0.45)] md:p-7"
    >
      <div className="absolute left-0 top-0 h-full w-1.5 bg-brand-blue" aria-hidden="true" />
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-ink-muted">{kpi.label}</h3>
        <span className="font-mono text-xs text-ink-muted tabular" aria-hidden="true">
          {String(i + 1).padStart(2, "0")}
        </span>
      </header>
      <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
        <span className="sr-only">{kpi.value}</span>
        <span ref={valueRef} aria-hidden="true" className="tabular text-5xl font-bold tracking-tight text-brand-blue">
          {kpi.value}
        </span>
        {kpi.estimated ? <span className="text-xs font-medium text-ink-muted">{estimatedLabel}</span> : null}
      </p>
      {typeof kpi.percent === "number" ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-gray" aria-hidden="true">
          <div
            className="h-full origin-left rounded-full bg-brand-blue transition-transform duration-[1400ms] ease-[var(--ease-brand)]"
            style={{ transform: `scaleX(${kpi.percent / 100})` }}
          />
        </div>
      ) : null}
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{kpi.detail}</p>
      {trend && kpi.trend ? (
        <p className="mt-auto pt-5">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${trend.cls}`}>
            <span aria-hidden="true">{trend.icon}</span>
            {trendLabels[kpi.trend]}
          </span>
        </p>
      ) : null}
    </article>
  );
}

export function KpiGrid() {
  return (
    <Section
      id="metricas"
      index={sectionCopy.metrics.index}
      eyebrow={sectionCopy.metrics.eyebrow}
      title={sectionCopy.metrics.title}
      description={sectionCopy.metrics.description}
      className="bg-gray-100"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {kpiItems.map((kpi, i) => (
          <KpiCard key={kpi.id} kpi={kpi} i={i} />
        ))}
      </div>
    </Section>
  );
}
