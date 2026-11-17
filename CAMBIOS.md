# CAMBIOS — Rediseño frontend Transpubenza

## Resumen
Rediseño completo del frontend manteniendo **todo el contenido** de `src/content/siteContent.ts` (solo se añadieron campos/exportaciones nuevas) y la **lógica exacta del iframe de Power BI** (`VITE_POWERBI_EMBED_URL`, mismo `title`, `allowFullScreen`, `loading="lazy"`, mismas alturas mínimas y mismo mensaje de respaldo).

## Paleta (muestreada de `public/recursos/Icono.png`)
| Token | Hex | Origen |
|---|---|---|
| `brand-blue` | `#003399` | Paralelogramo y parte superior de la "P" |
| `brand-gray` | `#E7E7E8` | La "P" y las franjas diagonales |
| `brand-white` | `#FFFFFF` | Contornos |
| Derivados | `navy-950 #000F2E`, `navy-900 #001A4D`, `navy-800 #00266F`, `blue-600 #1A47A3`, `blue-400 #6685C2`, `blue-200 #B3C2E0`, `blue-50 #F2F5FA`, `gray-100 #F3F3F4`, `gray-400 #A9A9AB`, `ink #0B1630`, `ink-muted #44506A` | Mezclas del azul/gris con negro o blanco |

Contraste (WCAG AA ✔): blanco/#003399 10.9:1 · #E7E7E8/#003399 8.8:1 · #B3C2E0/#000F2E 10.6:1 · #44506A/#FFFFFF 8.1:1 · #44506A/#F3F3F4 7.3:1.

Motivos del logo: **paralelogramo** (marcos de fotos con `clip-path`, bloques sesgados, footer) y **franjas diagonales** (componente `Stripes` en encabezados, hero y footer).

## Cambios principales
- **Hero oscuro** (`navy-950`) con rejilla fina, título grande, 2 CTA, foto del bus en paralelogramo con contorno blanco (visible también en móvil) y franja de KPI destacados.
- **Three.js**: red de rutas ilustrativa sobre una Popayán estilizada (calles en rejilla, corredores, nodos y "buses" en movimiento). Cargado con `import()` dinámico tras `load` + `requestIdleCallback`, pausado fuera de pantalla (IntersectionObserver) y con pestaña oculta, DPR ≤ 1.5 en móvil, póster SVG estático como respaldo; se omite con `prefers-reduced-motion` o en equipos de gama baja (`saveData`, 2G, <4 GB RAM, <4 núcleos).
- **GSAP + ScrollTrigger**: revelado por lotes (`[data-reveal]`), índice sticky del análisis que resalta la sección activa.
- **Lenis**: scroll suave sincronizado con el ticker de GSAP, anclas con offset del navbar. Desactivado con movimiento reducido.
- **Anime.js**: intro del hero y contadores numéricos de KPI (el valor real siempre está en el HTML y en texto `sr-only`).
- **KPI tipo dashboard**: cifras tabulares grandes, barra de progreso para porcentajes, badge de tendencia con ícono + texto, etiqueta **"(estimado)"** en todos los valores (son marcadores hasta tener el informe final).
- **Contexto**: pregunta central destacada en bloque azul; foto en paralelogramo.
- **Informe Power BI** en marco tipo "pantalla" sobre fondo oscuro.
- **Footer** con navegación, logo y franjas.
- **Imágenes**: AVIF/WebP responsivas (`public/recursos/opt/`, generadas con `scripts/optimize-images.mjs`), `width/height` explícitos, `<link rel="preload" fetchpriority="high">` + `fetchpriority="high"` en la imagen LCP (Bus2). Icono 96 px WebP (1.5 KB) en lugar del PNG de 29 KB.
- **Accesibilidad/SEO**: enlace "Saltar al contenido", `aria-labelledby` por sección, `aria-current` en índice, menú móvil con Escape y botones de 44 px, `theme-color`, Open Graph, `robots.txt`.
- **Movimiento**: solo `transform`/`opacity`; con `prefers-reduced-motion` no se oculta ni anima nada.

## Referencias y cómo se aplican
1. **Via** (movilidad) → banda de cifras destacadas bajo el hero y CTA dobles claros.
2. **Flixbus** (transporte) → color de marca plano a sangre (`#003399`) en bloques y footer; foto de flota protagonista.
3. **Linear** (precisión oscura) → hero/informe en azul casi negro, bordes de 1 px translúcidos, etiquetas mono "01 / …", "Fig. 01".
4. **Ramp / Stripe** (dashboards de KPI) → números tabulares, contadores, micro-barras y badges de tendencia.
5. **Our World in Data** (narrativa de datos) → pregunta central explícita y valores marcados "(estimado)".
6. **The Pudding** (scrollytelling) → índice sticky + revelado progresivo por bloque.
Solo inspiración de patrones; no se copió contenido ni marca.

## Lighthouse móvil (localhost, `vite preview`)
| | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | FCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Antes | 93 | 100 | 100 | 92 | 3.0 s | 2.0 s | 0 ms | 0.01 |
| Después | 95 | 100 | 100 | 100 | 2.6 s | 2.0 s | 100 ms | 0 |

## Cómo ejecutar
```bash
pnpm install
cp .env.example .env   # y pegar la URL "Publicar en web" de Power BI en VITE_POWERBI_EMBED_URL
pnpm dev               # desarrollo
pnpm build && pnpm preview
# opcional: regenerar imágenes optimizadas
node scripts/optimize-images.mjs
```
