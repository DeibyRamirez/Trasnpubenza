import type { ReactNode } from "react";
import { Stripes } from "@/components/Stripes";

type SectionProps = {
  id: string;
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

export function Section({ id, index, eyebrow, title, description, children, className = "", dark = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`section-anchor-offset relative py-20 md:py-28 ${dark ? "bg-navy-950 text-white" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="mb-10 max-w-3xl md:mb-14" data-reveal>
          <p
            className={`mb-4 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] ${dark ? "text-blue-200" : "text-brand-blue"}`}
          >
            <Stripes className="h-3.5" count={3} />
            {index ? <span className="tabular">{index}</span> : null}
            {index && eyebrow ? <span aria-hidden="true">/</span> : null}
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-blue-200" : "text-ink-muted"}`}>{description}</p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
