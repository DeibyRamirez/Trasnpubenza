/**
 * Stylized, illustrative route network over Popayán's grid (historic centre + corridors).
 * Coordinates are normalized to [-1, 1]. NOT real route geometry.
 */
export type Pt = [number, number];

export const ROUTES: Pt[][] = [
  // north–south corridor (Panamericana-like)
  [[-0.15, -1], [-0.12, -0.55], [-0.02, -0.2], [0.02, 0.1], [0.1, 0.45], [0.18, 1]],
  // east–west corridor
  [[-1, 0.05], [-0.6, 0.02], [-0.25, -0.05], [0.05, 0.02], [0.45, 0.12], [1, 0.2]],
  // north-west to south-east
  [[-0.9, 0.75], [-0.55, 0.45], [-0.25, 0.25], [0.02, 0.1], [0.35, -0.25], [0.7, -0.55], [0.95, -0.9]],
  // southern loop
  [[-0.85, -0.6], [-0.5, -0.45], [-0.12, -0.55], [0.25, -0.45], [0.55, -0.15], [0.85, -0.05]],
  // northern arc
  [[-0.4, 1], [-0.3, 0.7], [0.0, 0.55], [0.35, 0.6], [0.65, 0.4], [1, 0.55]],
];

/** Hubs (route intersections / terminals) */
export const HUBS: Pt[] = [
  [0.02, 0.1],
  [-0.25, -0.05],
  [-0.12, -0.55],
  [0.35, -0.25],
  [0.0, 0.55],
  [-0.55, 0.45],
  [0.45, 0.12],
];
