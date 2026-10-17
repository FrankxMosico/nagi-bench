import type { MapSolid } from './map';
import { circleRectOverlap, segmentClear2D } from './math';
import type { Rect, Vec2 } from './types';

interface Node {
  idx: number;
  g: number;
  f: number;
}

class MinHeap {
  private heap: Node[] = [];
  push(n: Node) {
    this.heap.push(n);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[p].f <= this.heap[i].f) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  pop(): Node | null {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        if (l < this.heap.length && this.heap[l].f < this.heap[m].f) m = l;
        if (r < this.heap.length && this.heap[r].f < this.heap[m].f) m = r;
        if (m === i) break;
        [this.heap[m], this.heap[i]] = [this.heap[i], this.heap[m]];
        i = m;
      }
    }
    return top;
  }
  get size() {
    return this.heap.length;
  }
}

export class Navigation {
  readonly step = 1;
  readonly minX = -56;
  readonly maxX = 56;
  readonly minZ = -48;
  readonly maxZ = 48;
  readonly cols: number;
  readonly rows: number;
  private blocked: Uint8Array;
  private readonly clearance = 0.56;
  private blockers: Rect[];
  private solids: MapSolid[];

  constructor(solids: MapSolid[]) {
    this.solids = solids;
    this.cols = Math.round((this.maxX - this.minX) / this.step) + 1;
    this.rows = Math.round((this.maxZ - this.minZ) / this.step) + 1;
    this.blocked = new Uint8Array(this.cols * this.rows);
    this.blockers = solids.map((s) => s.rect);

    for (let iz = 0; iz < this.rows; iz++) {
      const z = this.minZ + iz * this.step;
      for (let ix = 0; ix < this.cols; ix++) {
        const x = this.minX + ix * this.step;
        let hit = false;
        for (const s of solids) {
          if (s.maxY < 0.25) continue;
          if (circleRectOverlap(x, z, this.clearance, s.rect)) {
            hit = true;
            break;
          }
        }
        if (hit) this.blocked[iz * this.cols + ix] = 1;
      }
    }
  }

  private idx(ix: number, iz: number) {
    return iz * this.cols + ix;
  }

  private isFree(ix: number, iz: number): boolean {
    return ix >= 0 && ix < this.cols && iz >= 0 && iz < this.rows && this.blocked[this.idx(ix, iz)] === 0;
  }

  private cellToWorld(ix: number, iz: number): Vec2 {
    return { x: this.minX + ix * this.step, z: this.minZ + iz * this.step };
  }

  private worldToCell(p: Vec2): { ix: number; iz: number } {
    return {
      ix: Math.max(0, Math.min(this.cols - 1, Math.round((p.x - this.minX) / this.step))),
      iz: Math.max(0, Math.min(this.rows - 1, Math.round((p.z - this.minZ) / this.step))),
    };
  }

  isWalkable(x: number, z: number, extraPad = 0): boolean {
    for (const s of this.solids) {
      if (s.maxY < 0.25) continue;
      if (circleRectOverlap(x, z, this.clearance - 0.1 + extraPad, s.rect)) return false;
    }
    return x > this.minX + 0.3 && x < this.maxX - 0.3 && z > this.minZ + 0.3 && z < this.maxZ - 0.3;
  }

  private nearestFree(ix: number, iz: number): { ix: number; iz: number } | null {
    if (this.isFree(ix, iz)) return { ix, iz };
    for (let r = 1; r <= 7; r++) {
      let best: { ix: number; iz: number; d: number } | null = null;
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
          const nx = ix + dx;
          const nz = iz + dz;
          if (!this.isFree(nx, nz)) continue;
          const d = dx * dx + dz * dz;
          if (!best || d < best.d) best = { ix: nx, iz: nz, d };
        }
      }
      if (best) return { ix: best.ix, iz: best.iz };
    }
    return null;
  }

  private heuristic(ax: number, az: number, bx: number, bz: number): number {
    const dx = Math.abs(ax - bx);
    const dz = Math.abs(az - bz);
    return Math.max(dx, dz) + (Math.SQRT2 - 1) * Math.min(dx, dz);
  }

  /** A* over an occupancy grid with octile movement and corner-cut prevention. */
  findPath(start: Vec2, goal: Vec2): Vec2[] {
    let s = this.worldToCell(start);
    let g = this.worldToCell(goal);
    const sFree = this.nearestFree(s.ix, s.iz);
    const gFree = this.nearestFree(g.ix, g.iz);
    if (!sFree || !gFree) return [];
    s = sFree;
    g = gFree;
    const startIdx = this.idx(s.ix, s.iz);
    const goalIdx = this.idx(g.ix, g.iz);
    const total = this.cols * this.rows;
    const gScore = new Float32Array(total);
    gScore.fill(Infinity);
    const came = new Int32Array(total);
    came.fill(-1);
    const closed = new Uint8Array(total);
    const open = new MinHeap();
    gScore[startIdx] = 0;
    open.push({ idx: startIdx, g: 0, f: this.heuristic(s.ix, s.iz, g.ix, g.iz) });
    const dirs = [
      [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
      [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2],
    ] as const;
    let found = false;
    let iterations = 0;
    while (open.size > 0 && iterations++ < 18000) {
      const cur = open.pop()!;
      if (closed[cur.idx]) continue;
      closed[cur.idx] = 1;
      if (cur.idx === goalIdx) {
        found = true;
        break;
      }
      const cx = cur.idx % this.cols;
      const cz = Math.floor(cur.idx / this.cols);
      for (const [dx, dz, cost] of dirs) {
        const nx = cx + dx;
        const nz = cz + dz;
        if (!this.isFree(nx, nz)) continue;
        if (dx !== 0 && dz !== 0) {
          if (!this.isFree(cx + dx, cz) || !this.isFree(cx, cz + dz)) continue;
        }
        const ni = this.idx(nx, nz);
        if (closed[ni]) continue;
        const ng = cur.g + cost;
        if (ng >= gScore[ni]) continue;
        gScore[ni] = ng;
        came[ni] = cur.idx;
        open.push({ idx: ni, g: ng, f: ng + this.heuristic(nx, nz, g.ix, g.iz) });
      }
    }
    if (!found) return [];
    const cells: Vec2[] = [];
    let at = goalIdx;
    let guard = 0;
    while (at !== -1 && guard++ < total) {
      const ix = at % this.cols;
      const iz = Math.floor(at / this.cols);
      cells.push(this.cellToWorld(ix, iz));
      if (at === startIdx) break;
      at = came[at];
    }
    cells.reverse();
    const raw = cells;
    // Replace the first point with the true start when it is safe, and the last with goal when clear.
    if (raw.length > 0) raw[0] = { x: start.x, z: start.z };
    if (raw.length > 1 && this.isWalkable(goal.x, goal.z, 0.1)) raw[raw.length - 1] = { x: goal.x, z: goal.z };
    return this.smooth(raw);
  }

  private smooth(points: Vec2[]): Vec2[] {
    if (points.length <= 2) return points;
    const out: Vec2[] = [points[0]];
    let anchor = 0;
    for (let i = 2; i < points.length; i++) {
      if (!segmentClear2D(points[anchor].x, points[anchor].z, points[i].x, points[i].z, this.blockers, 0.5)) {
        out.push(points[i - 1]);
        anchor = i - 1;
      }
    }
    out.push(points[points.length - 1]);
    return out;
  }

  randomNearbyWalkable(center: Vec2, radius: number): Vec2 {
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const x = center.x + Math.cos(a) * r;
      const z = center.z + Math.sin(a) * r;
      if (this.isWalkable(x, z, 0.1)) return { x, z };
    }
    return center;
  }
}
