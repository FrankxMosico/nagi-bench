// 水斗内水体的二维几何：凸多边形被水平面截取后的面积与形心。
export type P2 = [number, number];

/** 保留多边形中满足 p·n <= h 的部分（Sutherland–Hodgman 单平面裁剪） */
export function clipBelow(poly: P2[], nx: number, ny: number, h: number, out: P2[] = []): P2[] {
  out.length = 0;
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    const da = a[0] * nx + a[1] * ny - h;
    const db = b[0] * nx + b[1] * ny - h;
    if (da <= 0) out.push(a);
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      const t = da / (da - db);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
}

export function area(poly: P2[]): number {
  let s = 0;
  for (let i = 0, n = poly.length; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2;
}

export function centroid(poly: P2[]): P2 {
  let cx = 0, cy = 0, s = 0;
  for (let i = 0, n = poly.length; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    const c = a[0] * b[1] - b[0] * a[1];
    s += c;
    cx += (a[0] + b[0]) * c;
    cy += (a[1] + b[1]) * c;
  }
  if (Math.abs(s) < 1e-12) {
    let mx = 0, my = 0;
    for (const p of poly) { mx += p[0]; my += p[1]; }
    return [mx / Math.max(1, poly.length), my / Math.max(1, poly.length)];
  }
  return [cx / (3 * s), cy / (3 * s)];
}

const tmp: P2[] = [];
/** 给定截面积 A，求水面高度 h（沿 n 方向），二分法 */
export function levelForArea(poly: P2[], nx: number, ny: number, A: number): number {
  let lo = Infinity, hi = -Infinity;
  for (const p of poly) {
    const d = p[0] * nx + p[1] * ny;
    if (d < lo) lo = d;
    if (d > hi) hi = d;
  }
  if (A <= 0) return lo;
  for (let i = 0; i < 26; i++) {
    const mid = (lo + hi) / 2;
    if (area(clipBelow(poly, nx, ny, mid, tmp)) < A) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
