import { HUBS, ROUTES } from "@/scene/routes";

const toSvg = ([x, y]: [number, number]) => `${(x * 50 + 50).toFixed(2)},${(50 - y * 50).toFixed(2)}`;

/** Static SVG fallback/poster of the route network (shown before / instead of WebGL). */
export function RoutePoster({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#e7e7e8" strokeOpacity="0.35" fill="none" strokeWidth="0.35" strokeLinejoin="round">
        {ROUTES.map((r, i) => (
          <polyline key={i} points={r.map(toSvg).join(" ")} />
        ))}
      </g>
      <g fill="#ffffff" fillOpacity="0.7">
        {HUBS.map((h, i) => {
          const [cx, cy] = toSvg(h).split(",");
          return <circle key={i} cx={cx} cy={cy} r="0.8" />;
        })}
      </g>
    </svg>
  );
}
