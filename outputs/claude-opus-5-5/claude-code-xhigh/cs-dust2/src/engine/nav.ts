import type { Vec3 } from './math.ts';
import { vec3 } from './math.ts';
import type { CollisionWorld } from './physics.ts';

const NAV_STEP = 0.5; // max climb between neighbouring cells
const NAV_DROP = 1.0; // max drop between neighbouring cells
const BODY_RADIUS = 0.42;
const BODY_HEIGHT = 1.8;
const SQRT2 = Math.SQRT2;
const DIRS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

/**
 * 2.5D navigation grid sampled from the collision world, with A* + string-pulling.
 * Dust2's playable space has no overlapping floors, so one height per cell suffices.
 */
export class NavGrid {
  readonly cs = 0.5;
  readonly ox: number;
  readonly oz: number;
  readonly w: number;
  readonly h: number;
  readonly ground: Float32Array;
  readonly walk: Uint8Array;
  readonly clear: Uint8Array;
  private readonly g: Float32Array;
  private readonly parent: Int32Array;
  private readonly seen: Uint32Array;
  private readonly closed: Uint32Array;
  private gen = 0;
  private heapIdx: number[] = [];
  private heapF: number[] = [];
  /** Stats for profiling/tests. */
  lastExpanded = 0;

  /**
   * @param floorHint authored floor height at (x, z); ground is sampled at or just below it so
   *                  roofs (e.g. over the tunnels) are never mistaken for floors.
   */
  constructor(
    world: CollisionWorld,
    bounds: { x0: number; z0: number; x1: number; z1: number },
    seeds: Vec3[],
    floorHint: (x: number, z: number) => number,
  ) {
    this.ox = bounds.x0;
    this.oz = bounds.z0;
    this.w = Math.ceil((bounds.x1 - bounds.x0) / this.cs);
    this.h = Math.ceil((bounds.z1 - bounds.z0) / this.cs);
    const n = this.w * this.h;
    this.ground = new Float32Array(n);
    this.walk = new Uint8Array(n);
    this.clear = new Uint8Array(n);
    this.g = new Float32Array(n);
    this.parent = new Int32Array(n);
    this.seen = new Uint32Array(n);
    this.closed = new Uint32Array(n);

    for (let j = 0; j < this.h; j++) {
      for (let i = 0; i < this.w; i++) {
        const idx = j * this.w + i;
        const cx = this.ox + (i + 0.5) * this.cs;
        const cz = this.oz + (j + 0.5) * this.cs;
        const gy = world.supportHeight(cx, cz, 0.05, floorHint(cx, cz) + 0.5);
        if (gy === -Infinity) continue;
        if (world.isBlocked(cx, cz, BODY_RADIUS, gy, BODY_HEIGHT)) continue;
        this.ground[idx] = gy;
        this.walk[idx] = 1;
      }
    }

    // Keep only cells reachable from the spawns (removes wall tops, crate tops, etc.).
    const reach = new Uint8Array(n);
    const queue: number[] = [];
    for (const s of seeds) {
      const c = this.nearestWalkable(s.x, s.z, s.y);
      if (c >= 0 && !reach[c]) {
        reach[c] = 1;
        queue.push(c);
      }
    }
    for (let q = 0; q < queue.length; q++) {
      const c = queue[q];
      const ci = c % this.w;
      const cj = (c / this.w) | 0;
      for (const [di, dj] of DIRS) {
        const ni = ci + di;
        const nj = cj + dj;
        if (ni < 0 || nj < 0 || ni >= this.w || nj >= this.h) continue;
        const nIdx = nj * this.w + ni;
        if (reach[nIdx] || !this.walk[nIdx] || !this.canStep(c, nIdx)) continue;
        if (di !== 0 && dj !== 0 && !this.diagOk(ci, cj, di, dj)) continue;
        reach[nIdx] = 1;
        queue.push(nIdx);
      }
    }
    for (let i = 0; i < n; i++) if (!reach[i]) this.walk[i] = 0;

    // Clearance (Chebyshev distance to nearest blocked cell), capped.
    const dist = new Int32Array(n).fill(-1);
    const bq: number[] = [];
    for (let i = 0; i < n; i++) {
      if (!this.walk[i]) {
        dist[i] = 0;
        bq.push(i);
      }
    }
    for (let q = 0; q < bq.length; q++) {
      const c = bq[q];
      const ci = c % this.w;
      const cj = (c / this.w) | 0;
      for (const [di, dj] of DIRS) {
        const ni = ci + di;
        const nj = cj + dj;
        if (ni < 0 || nj < 0 || ni >= this.w || nj >= this.h) continue;
        const nIdx = nj * this.w + ni;
        if (dist[nIdx] >= 0) continue;
        dist[nIdx] = dist[c] + 1;
        bq.push(nIdx);
      }
    }
    for (let i = 0; i < n; i++) this.clear[i] = Math.min(15, Math.max(0, dist[i]));
  }

  cellIndex(x: number, z: number): number {
    const i = Math.floor((x - this.ox) / this.cs);
    const j = Math.floor((z - this.oz) / this.cs);
    if (i < 0 || j < 0 || i >= this.w || j >= this.h) return -1;
    return j * this.w + i;
  }

  cellCenter(idx: number, out: Vec3 = vec3()): Vec3 {
    const i = idx % this.w;
    const j = (idx / this.w) | 0;
    out.x = this.ox + (i + 0.5) * this.cs;
    out.z = this.oz + (j + 0.5) * this.cs;
    out.y = this.ground[idx];
    return out;
  }

  isWalkable(x: number, z: number): boolean {
    const c = this.cellIndex(x, z);
    return c >= 0 && this.walk[c] === 1;
  }

  canStep(a: number, b: number): boolean {
    const dh = this.ground[b] - this.ground[a];
    return dh <= NAV_STEP && dh >= -NAV_DROP;
  }

  private diagOk(ci: number, cj: number, di: number, dj: number): boolean {
    const a = cj * this.w + ci;
    const b1 = cj * this.w + ci + di;
    const b2 = (cj + dj) * this.w + ci;
    return this.walk[b1] === 1 && this.walk[b2] === 1 && this.canStep(a, b1) && this.canStep(a, b2);
  }

  /** Nearest walkable cell, preferring cells at a similar height to `y`. */
  nearestWalkable(x: number, z: number, y: number, maxRadius = 12): number {
    const ci = Math.floor((x - this.ox) / this.cs);
    const cj = Math.floor((z - this.oz) / this.cs);
    let best = -1;
    let bestScore = Infinity;
    for (let r = 0; r <= maxRadius; r++) {
      for (let dj = -r; dj <= r; dj++) {
        for (let di = -r; di <= r; di++) {
          if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
          const i = ci + di;
          const j = cj + dj;
          if (i < 0 || j < 0 || i >= this.w || j >= this.h) continue;
          const idx = j * this.w + i;
          if (!this.walk[idx]) continue;
          const score = Math.sqrt(di * di + dj * dj) * this.cs + Math.abs(this.ground[idx] - y) * 3;
          if (score < bestScore) {
            bestScore = score;
            best = idx;
          }
        }
      }
      if (best >= 0 && bestScore <= (r + 1) * this.cs) break;
    }
    return best;
  }

  private heapPush(idx: number, f: number): void {
    const hi = this.heapIdx;
    const hf = this.heapF;
    let i = hi.length;
    hi.push(idx);
    hf.push(f);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (hf[p] <= f) break;
      hi[i] = hi[p];
      hf[i] = hf[p];
      i = p;
    }
    hi[i] = idx;
    hf[i] = f;
  }

  private heapPop(): number {
    const hi = this.heapIdx;
    const hf = this.heapF;
    const top = hi[0];
    const lastI = hi.pop() as number;
    const lastF = hf.pop() as number;
    const n = hi.length;
    if (n > 0) {
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        if (l >= n) break;
        const r = l + 1;
        const c = r < n && hf[r] < hf[l] ? r : l;
        if (hf[c] >= lastF) break;
        hi[i] = hi[c];
        hf[i] = hf[c];
        i = c;
      }
      hi[i] = lastI;
      hf[i] = lastF;
    }
    return top;
  }

  private penalty(idx: number): number {
    const c = this.clear[idx];
    return c <= 1 ? 1.5 : c === 2 ? 0.6 : c === 3 ? 0.2 : 0;
  }

  /** A* from (sx,sz) to (tx,tz); returns a smoothed list of waypoints (excluding the start), or null. */
  findPath(from: Vec3, to: Vec3): Vec3[] | null {
    const s = this.nearestWalkable(from.x, from.z, from.y);
    const t = this.nearestWalkable(to.x, to.z, to.y);
    if (s < 0 || t < 0) return null;
    if (s === t) return [vec3(to.x, this.ground[t], to.z)];
    this.gen++;
    const gen = this.gen;
    this.heapIdx.length = 0;
    this.heapF.length = 0;
    const ti = t % this.w;
    const tj = (t / this.w) | 0;
    const heur = (idx: number) => {
      const dx = Math.abs((idx % this.w) - ti);
      const dz = Math.abs(((idx / this.w) | 0) - tj);
      return (dx + dz + (SQRT2 - 2) * Math.min(dx, dz));
    };
    this.g[s] = 0;
    this.seen[s] = gen;
    this.parent[s] = -1;
    this.heapPush(s, heur(s));
    let expanded = 0;
    let found = false;
    while (this.heapIdx.length > 0) {
      const cur = this.heapPop();
      if (this.closed[cur] === gen) continue;
      this.closed[cur] = gen;
      expanded++;
      if (cur === t) {
        found = true;
        break;
      }
      const ci = cur % this.w;
      const cj = (cur / this.w) | 0;
      const gc = this.g[cur];
      for (let d = 0; d < 8; d++) {
        const di = DIRS[d][0];
        const dj = DIRS[d][1];
        const ni = ci + di;
        const nj = cj + dj;
        if (ni < 0 || nj < 0 || ni >= this.w || nj >= this.h) continue;
        const nIdx = nj * this.w + ni;
        if (!this.walk[nIdx] || this.closed[nIdx] === gen) continue;
        if (!this.canStep(cur, nIdx)) continue;
        const diag = di !== 0 && dj !== 0;
        if (diag && !this.diagOk(ci, cj, di, dj)) continue;
        const ng = gc + (diag ? SQRT2 : 1) * (1 + this.penalty(nIdx));
        if (this.seen[nIdx] !== gen || ng < this.g[nIdx]) {
          this.seen[nIdx] = gen;
          this.g[nIdx] = ng;
          this.parent[nIdx] = cur;
          this.heapPush(nIdx, ng + heur(nIdx));
        }
      }
    }
    this.lastExpanded = expanded;
    if (!found) return null;

    const cells: number[] = [];
    for (let c = t; c !== -1; c = this.parent[c]) cells.push(c);
    cells.reverse();

    // String pulling: skip intermediate cells while the straight segment stays on good ground.
    const out: Vec3[] = [];
    let i = 0;
    while (i < cells.length - 1) {
      let j = i + 1;
      for (let k = i + 2; k < cells.length && k <= i + 60; k++) {
        if (this.segmentClear(cells[i], cells[k])) j = k;
        else break;
      }
      out.push(this.cellCenter(cells[j]));
      i = j;
    }
    // Use the exact goal position if it lies inside the goal cell's walkable area.
    const last = out[out.length - 1];
    if (this.cellIndex(to.x, to.z) === t) {
      last.x = to.x;
      last.z = to.z;
    }
    return out;
  }

  /** Straight-line walkability test between two cells (used for smoothing and direct moves). */
  segmentClear(a: number, b: number): boolean {
    const ax = this.ox + ((a % this.w) + 0.5) * this.cs;
    const az = this.oz + (((a / this.w) | 0) + 0.5) * this.cs;
    const bx = this.ox + ((b % this.w) + 0.5) * this.cs;
    const bz = this.oz + (((b / this.w) | 0) + 0.5) * this.cs;
    return this.lineClear(ax, az, bx, bz, a, b);
  }

  lineClear(ax: number, az: number, bx: number, bz: number, startCell = -1, endCell = -1): boolean {
    const dx = bx - ax;
    const dz = bz - az;
    const len = Math.sqrt(dx * dx + dz * dz);
    const steps = Math.max(1, Math.ceil(len / (this.cs * 0.4)));
    let prev = startCell >= 0 ? startCell : this.cellIndex(ax, az);
    if (prev < 0 || !this.walk[prev]) return false;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const c = this.cellIndex(ax + dx * t, az + dz * t);
      if (c < 0 || !this.walk[c]) return false;
      if (c === prev) continue;
      if (c !== endCell && this.clear[c] < 2) return false;
      if (!this.canStep(prev, c)) return false;
      prev = c;
    }
    return true;
  }
}
