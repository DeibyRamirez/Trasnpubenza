export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#contexto", label: "Contexto" },
  { href: "#metricas", label: "Métricas" },
  { href: "#analisis", label: "Análisis" },
  { href: "#informe", label: "Informe" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const heroContent = {
  title: "Transpubenza",
  subtitle:
    "Transporte público con decisiones basadas en datos. Explora el estado actual de la operación y las métricas clave de la empresa.",
  cta: "Ver informe Power BI",
  ctaHref: "#informe",
};

export const contextContent = {
  heading: "Contexto del proyecto",
  paragraphs: [
    "Transpubenza es una empresa de transporte público comprometida con la movilidad segura y eficiente de sus usuarios. Este sitio presenta un informe interactivo desarrollado en Power BI que consolida indicadores operativos, financieros y de servicio.",
    "El análisis responde a la pregunta central del proyecto de Electiva III — Análisis de Datos: ¿cómo está la operación hoy y qué capacidades tiene la organización hasta el momento?",
    "Los valores mostrados en las tarjetas resumen pueden ajustarse en este archivo para alinearlos con las cifras definitivas del dashboard.",
  ],
};

export type KpiItem = {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend?: "up" | "down" | "neutral";
  /** true when the figure is a placeholder pending the final Power BI report */
  estimated?: boolean;
  /** 0–100, only for percentage KPIs; drives the progress bar */
  percent?: number;
};

export const kpiItems: KpiItem[] = [
  {
    id: "flota",
    estimated: true,
    label: "Unidades en operación",
    value: "42",
    detail: "Buses activos en rutas urbanas e intermunicipales.",
    trend: "neutral",
  },
  {
    id: "rutas",
    estimated: true,
    label: "Rutas activas",
    value: "18",
    detail: "Líneas con servicio regular de lunes a sábado.",
    trend: "up",
  },
  {
    id: "pasajeros",
    estimated: true,
    label: "Pasajeros / mes",
    value: "128 K",
    detail: "Estimación consolidada del último periodo reportado.",
    trend: "up",
  },
  {
    id: "ingresos",
    estimated: true,
    label: "Ingresos operativos",
    value: "$2.4 M",
    detail: "Recaudo asociado a tarifas y convenios.",
    trend: "neutral",
  },
  {
    id: "puntualidad",
    estimated: true,
    label: "Puntualidad",
    value: "87 %",
    percent: 87,
    detail: "Salidas dentro de la ventana programada ±5 min.",
    trend: "up",
  },
  {
    id: "ocupacion",
    estimated: true,
    label: "Ocupación promedio",
    value: "72 %",
    percent: 72,
    detail: "Capacidad utilizada en horas pico.",
    trend: "down",
  },
];

export type AnalysisBlock = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
};

export const analysisBlocks: AnalysisBlock[] = [
  {
    id: "situacion",
    title: "Situación actual",
    body: "La operación muestra estabilidad en cobertura de rutas y demanda sostenida en corredores principales. El informe Power BI concentra ventas, costos, mantenimiento y desempeño por ruta, lo que permite comparar periodos y detectar desviaciones tempranas.",
    bullets: [
      "Demanda concentrada en franjas matutinas y vespertinas.",
      "Flota en rango de edad media que incrementa costos de mantenimiento.",
      "Recaudo alineado con metas parciales del trimestre.",
    ],
  },
  {
    id: "fortalezas",
    title: "Fortalezas",
    body: "Transpubenza cuenta con datos estructurados y visualizaciones que facilitan la conversación entre operaciones, mantenimiento y dirección.",
    bullets: [
      "Dashboard unificado con filtros por ruta, fecha y tipo de servicio.",
      "Indicadores de puntualidad y ocupación visibles para seguimiento diario.",
      "Imagen corporativa reconocible y equipo operativo experimentado.",
    ],
  },
  {
    id: "debilidades",
    title: "Debilidades y riesgos",
    body: "Persisten variaciones en puntualidad en rutas periféricas y picos de ocupación que superan la capacidad en horas valle invertidas.",
    bullets: [
      "Dependencia de rutas con baja rentabilidad para cobertura social.",
      "Retrasos por tráfico y tiempos de ciclo no actualizados.",
      "Brechas en calidad de dato en fuentes manuales (ajustar en el informe real).",
    ],
  },
  {
    id: "oportunidades",
    title: "Oportunidades",
    body: "El análisis habilita escenarios de optimización: reasignación de flota, ajuste de frecuencias y priorización de mantenimiento predictivo.",
    bullets: [
      "Redistribuir buses hacia rutas con mayor índice de ocupación.",
      "Automatizar alertas cuando la puntualidad caiga bajo umbral.",
      "Comunicar resultados a usuarios mediante tableros públicos como este.",
    ],
  },
  {
    id: "conclusiones",
    title: "Conclusiones y próximos pasos",
    body: "Hasta el momento, Transpubenza dispone de una base sólida de métricas para tomar decisiones. El siguiente paso es validar cifras con el informe definitivo, documentar fuentes en Power BI y definir metas trimestrales medibles.",
    bullets: [
      "Actualizar KPI en siteContent.ts con datos del informe final.",
      "Revisar mensualmente desviaciones de ingresos vs. costos.",
      "Presentar hallazgos al comité académico con capturas del dashboard.",
    ],
  },
];

export const reportSection = {
  heading: "Informe Power BI",
  description:
    "Tablero interactivo con métricas claras de la empresa. Use filtros dentro del informe para profundizar por periodo, ruta o categoría.",
};

export const footerContent = {
  company: "Transpubenza",
  project: "Electiva III — Análisis de Datos",
  team: "Equipo académico (actualizar nombres)",
  year: new Date().getFullYear(),
};

/* ------------------------------------------------------------------ */
/* Additional UI copy used by the redesign (existing content above is */
/* kept unchanged).                                                    */
/* ------------------------------------------------------------------ */

export const estimatedLabel = "(estimado)";

export const heroExtras = {
  eyebrow: "Popayán, Cauca · Proyecto de análisis de datos",
  secondaryCta: "Ver métricas clave",
  secondaryCtaHref: "#metricas",
  imageAlt: "Bus de transporte público Transpubenza",
  /** KPI ids highlighted in the hero strip */
  highlightKpis: ["flota", "rutas", "pasajeros"] as const,
  sceneCaption: "Red de rutas ilustrativa sobre Popayán (no representa trazados reales)",
};

export const sectionCopy = {
  context: { index: "01", eyebrow: "Contexto" },
  metrics: {
    index: "02",
    eyebrow: "Indicadores",
    title: "Métricas clave",
    description:
      "Indicadores resumidos alineados al informe Power BI. Actualice valores en src/content/siteContent.ts.",
  },
  analysis: {
    index: "03",
    eyebrow: "Historia de los datos",
    title: "Análisis detallado",
    description:
      "Evaluación narrativa del estado actual de Transpubenza y las capacidades disponibles hasta el momento.",
    tocLabel: "En esta sección",
  },
  report: { index: "04", eyebrow: "Dashboard interactivo" },
};

export const researchQuestion = {
  label: "Pregunta central",
  text: "¿Cómo está la operación hoy y qué capacidades tiene la organización hasta el momento?",
};

export const trendLabels = {
  up: "Tendencia favorable",
  down: "Requiere atención",
  neutral: "Estable",
} as const;

export const imageAlts = {
  context: "Flota de buses en servicio",
};
