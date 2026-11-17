import {
  BufferGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
  Color,
} from "three";
import { HUBS, ROUTES } from "@/scene/routes";

const BLUE_TINT = new Color("#6685c2");
const GRAY = new Color("#e7e7e8");
const WHITE = new Color("#ffffff");

export type RouteSceneHandle = { start: () => void; stop: () => void; dispose: () => void };

/** Builds the WebGL route network. Caller controls start/stop (visibility) and DPR. */
export function createRouteScene(canvas: HTMLCanvasElement, maxDpr: number): RouteSceneHandle {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, -3.1, 3.2);
  camera.lookAt(0, 0.1, 0);

  const S = 2.2; // world scale
  // faint street grid
  const grid: number[] = [];
  for (let i = -10; i <= 10; i++) {
    const v = (i / 10) * S;
    grid.push(-S, v, 0, S, v, 0, v, -S, 0, v, S, 0);
  }
  const gridGeo = new BufferGeometry();
  gridGeo.setAttribute("position", new Float32BufferAttribute(grid, 3));
  const gridMat = new LineBasicMaterial({ color: BLUE_TINT, transparent: true, opacity: 0.14 });
  scene.add(new LineSegments(gridGeo, gridMat));

  // routes
  const curves = ROUTES.map(
    (r) => new CatmullRomCurve3(r.map(([x, y]) => new Vector3(x * S, y * S, 0)), false, "centripetal"),
  );
  const routeMat = new LineBasicMaterial({ color: GRAY, transparent: true, opacity: 0.4 });
  const routeGeos = curves.map((c) => new BufferGeometry().setFromPoints(c.getPoints(120)));
  routeGeos.forEach((g) => scene.add(new Line(g, routeMat)));

  // hubs
  const hubGeo = new BufferGeometry();
  hubGeo.setAttribute("position", new Float32BufferAttribute(HUBS.flatMap(([x, y]) => [x * S, y * S, 0.01]), 3));
  const hubMat = new PointsMaterial({ color: WHITE, size: 5, sizeAttenuation: false });
  scene.add(new Points(hubGeo, hubMat));

  // moving buses (3 per route)
  const perRoute = 3;
  const busCount = curves.length * perRoute;
  const busPos = new Float32Array(busCount * 3);
  const busGeo = new BufferGeometry();
  busGeo.setAttribute("position", new Float32BufferAttribute(busPos, 3));
  const busMat = new PointsMaterial({ color: WHITE, size: 4.5, sizeAttenuation: false, transparent: true, opacity: 0.95 });
  scene.add(new Points(busGeo, busMat));
  const offsets = Array.from({ length: busCount }, (_, i) => (i % perRoute) / perRoute + (i * 0.137) % 0.2);
  const speeds = Array.from({ length: busCount }, (_, i) => 0.018 + ((i * 7) % 5) * 0.004);
  const tmp = new Vector3();

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let raf = 0;
  let running = false;
  let last = performance.now();
  let t = 0;
  const frame = (now: number) => {
    const dt = Math.max(0, Math.min((now - last) / 1000, 0.05)) || 0;
    last = now;
    t += dt;
    const attr = busGeo.getAttribute("position") as Float32BufferAttribute;
    for (let i = 0; i < busCount; i++) {
      const c = curves[Math.floor(i / perRoute)];
      const raw = offsets[i] + t * speeds[i];
      if (!Number.isFinite(raw)) continue;
      const u = Math.min(Math.max(raw - Math.floor(raw), 0), 0.9999);
      c.getPointAt(u, tmp);
      attr.setXYZ(i, tmp.x, tmp.y, 0.02);
    }
    attr.needsUpdate = true;
    scene.rotation.z = Math.sin(t * 0.05) * 0.06;
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    dispose() {
      this.stop();
      ro.disconnect();
      [gridGeo, hubGeo, busGeo, ...routeGeos].forEach((g) => g.dispose());
      [gridMat, routeMat, hubMat, busMat].forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
