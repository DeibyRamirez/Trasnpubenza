# Transpubenza — Sitio de métricas y Power BI

Sitio single-page para la empresa de transporte público **Transpubenza**, con análisis narrativo, KPI editables e integración del informe Power BI.

## Requisitos

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/)

## Instalación

```bash
pnpm install
```

## Configuración Power BI

1. Copie `.env.example` a `.env`.
2. Pegue la URL de **Publicar en web** de su informe:

```env
VITE_POWERBI_EMBED_URL=https://app.powerbi.com/view?r=...
```

## Desarrollo

```bash
pnpm dev
```

Abra la URL que muestra Vite (por defecto `http://localhost:5173`).

## Producción

```bash
pnpm build
pnpm preview
```

## Contenido editable

- Textos, KPI y bloques de análisis: [`src/content/siteContent.ts`](src/content/siteContent.ts)
- Imágenes: [`public/recursos/`](public/recursos/) (origen en [`Recursos/`](Recursos/))

## Stack

React, TypeScript, Vite, Tailwind CSS v4, Anime.js, pnpm.
