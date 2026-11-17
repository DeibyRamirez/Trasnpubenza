import { developers, footerContent, navLinks } from "@/content/siteContent";
import { Stripes } from "@/components/Stripes";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.61-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="section-anchor-offset relative overflow-hidden bg-brand-blue text-white">
      <div className="pointer-events-none absolute -right-24 bottom-0 top-0 w-80 skew-brand border-l-2 border-white/30 bg-white/5" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-3 md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <img src="/recursos/opt/Icono-96.webp" alt="" width={44} height={44} className="h-11 w-11" loading="lazy" />
            <p className="text-2xl font-bold tracking-tight">{footerContent.company}</p>
          </div>
          <p className="mt-4 text-brand-gray">{footerContent.project}</p>
          <p className="mt-1 text-sm text-blue-200">{footerContent.team}</p>
          <Stripes className="mt-8 h-8 text-brand-gray" count={6} />
        </div>

        <section aria-labelledby="footer-developers">
          <h2 id="footer-developers" className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
            Desarrolladores
          </h2>
          <ul className="mt-4 space-y-4">
            {developers.map((dev) => (
              <li key={dev.email}>
                <p className="text-sm font-semibold text-white">{dev.name}</p>
                <div className="mt-1.5 flex flex-col gap-1 text-sm">
                  <a
                    href={`mailto:${dev.email}`}
                    className="inline-flex items-center gap-2 break-all text-brand-gray underline-offset-4 hover:text-white hover:underline"
                  >
                    <MailIcon />
                    {dev.email}
                  </a>
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-brand-gray underline-offset-4 hover:text-white hover:underline"
                  >
                    <GithubIcon />
                    {dev.githubHandle}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Pie de página">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Navegación</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1.5 text-brand-gray underline-offset-4 hover:text-white hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative border-t border-white/20">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-blue-200 sm:px-6">
          © {footerContent.year} Transpubenza · Proyecto desarrollado por Deiby Ramírez y David Urrutia
        </p>
      </div>
    </footer>
  );
}
