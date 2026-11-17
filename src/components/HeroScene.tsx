import { useEffect, useRef, useState } from "react";
import { isLowEndDevice, isMobileViewport, prefersReducedMotion } from "@/lib/motion";
import { RoutePoster } from "@/components/RoutePoster";

/**
 * Three.js route network, lazy-loaded via dynamic import after the page is idle.
 * - Skipped with prefers-reduced-motion or on low-end devices (poster only).
 * - Paused when offscreen (IntersectionObserver) or when the tab is hidden.
 * - DPR capped at 1.5 on mobile, 2 on desktop.
 */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion() || isLowEndDevice()) return;

    let disposed = false;
    let handle: import("@/scene/RouteScene").RouteSceneHandle | undefined;
    let io: IntersectionObserver | undefined;
    let visible = true;
    const onVis = () => (document.hidden || !visible ? handle?.stop() : handle?.start());

    const boot = async () => {
      const { createRouteScene } = await import("@/scene/RouteScene");
      if (disposed) return;
      handle = createRouteScene(canvas, isMobileViewport() ? 1.5 : 2);
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        onVis();
      });
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVis);
      setReady(true);
    };

    // wait for load + idle so WebGL never competes with LCP
    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback;
      const run = () => void boot();
      setTimeout(() => (ric ? ric(run, { timeout: 2500 }) : run()), 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      disposed = true;
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      handle?.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <RoutePoster
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
