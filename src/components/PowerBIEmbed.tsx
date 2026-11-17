import { reportSection, sectionCopy } from "@/content/siteContent";
import { Section } from "@/components/Section";

const embedUrl = import.meta.env.VITE_POWERBI_EMBED_URL?.trim();

export function PowerBIEmbed() {
  const hasUrl = Boolean(embedUrl);

  return (
    <Section
      id="informe"
      index={sectionCopy.report.index}
      eyebrow={sectionCopy.report.eyebrow}
      title={reportSection.heading}
      description={reportSection.description}
      dark
      className="grid-lines"
    >
      {/* Device-style frame (Linear-like precision) — iframe logic unchanged */}
      <div data-reveal className="overflow-hidden rounded-xl border border-white/15 bg-navy-900 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-3 truncate font-mono text-xs text-blue-200">app.powerbi.com · Transpubenza</span>
        </div>
        <div className="bg-white text-ink">
          {hasUrl ? (
            <iframe
              title="Informe Power BI — Transpubenza"
              src={embedUrl}
              className="min-h-[480px] w-full border-0 md:min-h-[640px] lg:min-h-[720px]"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <p className="max-w-lg text-lg font-bold text-ink">Configure la URL del informe para visualizarlo aquí.</p>
              <p className="max-w-xl text-sm text-ink-muted">
                Cree un archivo <code className="rounded bg-brand-gray px-1.5 py-0.5">.env</code> en la raíz del proyecto
                con <code className="rounded bg-brand-gray px-1.5 py-0.5">VITE_POWERBI_EMBED_URL</code> (modo Publicar en web
                de Power BI). Consulte{" "}
                <a
                  href="https://learn.microsoft.com/power-bi/collaborate-share/service-publish-to-web"
                  className="font-bold text-brand-blue underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  la documentación de Microsoft
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
