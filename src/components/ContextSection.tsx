import { contextContent, imageAlts, researchQuestion, sectionCopy } from "@/content/siteContent";
import { Section } from "@/components/Section";
import { Picture } from "@/components/Picture";
import { Stripes } from "@/components/Stripes";

export function ContextSection() {
  return (
    <Section
      id="contexto"
      index={sectionCopy.context.index}
      eyebrow={sectionCopy.context.eyebrow}
      title={contextContent.heading}
    >
      {/* Research question (Our World in Data style) */}
      <figure data-reveal className="relative mb-12 overflow-hidden rounded-2xl bg-brand-blue p-7 text-white md:mb-16 md:p-12">
        <div className="absolute -right-10 top-0 h-full w-48 skew-brand bg-white/5" aria-hidden="true" />
        <figcaption className="relative mb-4 font-mono text-xs uppercase tracking-[0.18em] text-blue-200">
          {researchQuestion.label}
        </figcaption>
        <blockquote className="relative max-w-3xl text-[clamp(1.4rem,3.4vw,2.25rem)] font-bold leading-tight tracking-tight">
          {researchQuestion.text}
        </blockquote>
      </figure>

      <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-start md:gap-14">
        <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
          {contextContent.paragraphs.map((paragraph, i) => (
            <p key={paragraph.slice(0, 32)} data-reveal className={i === 0 ? "text-xl text-ink" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
        <div data-reveal className="relative">
          <div className="clip-para overflow-hidden bg-brand-gray">
            <Picture
              name="Bus3"
              widths={[480, 800]}
              width={800}
              height={800}
              sizes="(min-width: 768px) 520px, 90vw"
              alt={imageAlts.context}
              className="aspect-[5/4] h-auto w-full object-cover"
            />
          </div>
          <Stripes className="absolute -top-5 right-6 h-10 text-brand-blue" count={4} />
        </div>
      </div>
    </Section>
  );
}
