import { footerContent, navLinks } from "@/content/siteContent";
import { Stripes } from "@/components/Stripes";

export function Footer() {
  return (
    <footer id="contacto" className="section-anchor-offset relative overflow-hidden bg-brand-blue text-white">
      <div className="pointer-events-none absolute -right-24 bottom-0 top-0 w-80 skew-brand border-l-2 border-white/30 bg-white/5" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <img src="/recursos/opt/Icono-96.webp" alt="" width={44} height={44} className="h-11 w-11" loading="lazy" />
            <p className="text-2xl font-bold tracking-tight">{footerContent.company}</p>
          </div>
          <p className="mt-4 text-brand-gray">{footerContent.project}</p>
          <p className="mt-1 text-sm text-blue-200">{footerContent.team}</p>
          <Stripes className="mt-8 h-8 text-brand-gray" count={6} />
        </div>
        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-2 text-sm">
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
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-blue-200 sm:px-6">© {footerContent.year} Transpubenza</p>
      </div>
    </footer>
  );
}
