export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/** Heuristic for skipping heavy WebGL work. */
export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return true;
  if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return true;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return true;
  return false;
}

export function isMobileViewport(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}
