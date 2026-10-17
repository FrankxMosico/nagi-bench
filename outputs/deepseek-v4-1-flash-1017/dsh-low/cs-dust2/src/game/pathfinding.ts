import type { Collider } from './types';

interface HeapNode {
  idx: number;
  f: number;
}

class MinHeap {
  private data: HeapNode[] = [];
  get size() { return this.data.length; }
  push(node: HeapNode) {
    const a = this.data;
    a.push(node);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].f <= a[i].f) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop(): HeapNode | undefined {
    const a = this.data;
    if (a.length === 0) return undefined;
    const out = a[0];
    const last = a.pop()!;
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && a[l].f < a[m].f) m = l;
        if (r < a.length && a[r].f < a[m].f) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return out;
  }
}

export class NavGrid {
  readonly cell = 0.9;
  readonly minX = -57;
  readonly maxX = 57;
  readonly minZ = -61;
  readonly maxZ = 51;
  readonly cols: number;
  readonly rows: number;
  readonly walkable: Uint8Array;
  private readonly radius: number;

  constructor(colliders: Collider[], agentRadius = 0.46) {
    this.cols = Math.ceil((this.maxX - this.minX) / this.cell);
    this.rows = Math.ceil((this.maxZ - this.minZ) / this.cell);
    this.walkable = new Uint8Array(this.cols * this.rows);
    this.radius = agentRadius;
    const blocked = new Uint8Array(this.cols * this.rows);

    for (const c of colliders) {
      // Actors can technically stand on low crates after a jump, but A* should route around all solids.
      const minX = c.minX - this.radius;
      const maxX = c.maxX + this.radius;
      const minZ = c.minZ - this.radius;
      const maxZ = c.maxZ + this.radius;
      const x0 = Math.max(0, Math.floor((minX - this.minX) / this.cell));
      const x1 = Math.min(this.cols - 1, Math.ceil((maxX - this.minX) / this.cell));
      const z0 = Math.max(0, Math.floor((minZ - this.minZ) / this.cell));
      const z1 = Math.min(this.rows - 1, Math.ceil((maxZ - this.minZ) / this.cell));
      for (let z = z0; z <= z1; z++) {
        for (let x = x0; x <= x1; x++) {
          const wx = this.minX + (x + 0.5) * this.cell;
          const wz = this.minZ + (z + 0.5) * this.cell;
          if (wx >= minX && wx <= maxX && wz >= minZ && wz <= maxZ) blocked[z * this.cols + x] = 1;
        }
      }
    }
    // Avoid the outer wall border for extra safety.
    for (let z = 0; z < this.rows; z++) {
      for (let x = 0; x < this.cols; x++) {
        const wx = this.minX + (x + 0.5) * this.cell;
        const wz = this.minZ + (z + 0.5) * this.cell;
        const inside = wx > this.minX + this.cell * 0.5 && wx < this.maxX - this.cell * 0.5 &&
          wz > this.minZ + this.cell * 0.5 && wz < this.maxZ - this.cell * 0.5;
        if (inside && !blocked[z * this.cols + x]) this.walkable[z * this.cols + x] = 1;
      }
    }
  }

  worldToCell(x: number, z: number): { x: number; z: number } {
    return {
      x: Math.max(0, Math.min(this.cols - 1, Math.floor((x - this.minX) / this.cell))),
      z: Math.max(0, Math.min(this.rows - 1, Math.floor((z - this.minZ) / this.cell))),
    };
  }

  cellToWorld(x: number, z: number): { x: number; z: number } {
    return { x: this.minX + (x + 0.5) * this.cell, z: this.minZ + (z + 0.5) * this.cell };
  }

  isWalkable(x: number, z: number): boolean {
    const c = this.worldToCell(x, z);
    return this.walkable[c.z * this.cols + c.x] === 1;
  }

  private nearestWalkable(cx: number, cz: number, maxR = 10): number | null {
    if (cx >= 0 && cx < this.cols && cz >= 0 && cz < this.rows) {
      const idx = cz * this.cols + cx;
      if (this.walkable[idx]) return idx;
    }
    for (let r = 1; r <= maxR; r++) {
      for (let dz = -r; dz <= r; dz++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue;
          const x = cx + dx;
          const z = cz + dz;
          if (x < 0 || z < 0 || x >= this.cols || z >= this.rows) continue;
          const idx = z * this.cols + x;
          if (this.walkable[idx]) return idx;
        }
      }
    }
    return null;
  }

  findPath(sx: number, sz: number, tx: number, tz: number): { x: number; z: number }[] {
    const sc = this.worldToCell(sx, sz);
    const ec = this.worldToCell(tx, tz);
    const startCell = this.nearestWalkable(sc.x, sc.z);
    const endCell = this.nearestWalkable(ec.x, ec.z);
    if (startCell == null || endCell == null) return [];
    if (startCell === endCell) return [{ x: tx, z: tz }];

    const total = this.cols * this.rows;
    const gScore = new Float32Array(total);
    gScore.fill(Infinity);
    const cameFrom = new Int32Array(total);
    cameFrom.fill(-1);
    const closed = new Uint8Array(total);
    const startX = startCell % this.cols;
    const startZ = Math.floor(startCell / this.cols);
    const endX = endCell % this.cols;
    const endZ = Math.floor(endCell / this.cols);
    const heuristic = (x: number, z: number) => {
      const dx = Math.abs(x - endX);
      const dz = Math.abs(z - endZ);
      return (dx + dz) + (Math.SQRT2 - 2) * Math.min(dx, dz);
    };
    const heap = new MinHeap();
    gScore[startCell] = 0;
    heap.push({ idx: startCell, f: heuristic(startX, startZ) });
    const dirs = [
      [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
      [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2],
    ];
    let found = false;
    let guard = 0;
    while (heap.size > 0 && guard++ < total * 3) {
      const node = heap.pop()!;
      if (closed[node.idx]) continue;
      closed[node.idx] = 1;
      if (node.idx === endCell) { found = true; break; }
      const cx = node.idx % this.cols;
      const cz = Math.floor(node.idx / this.cols);
      for (const [dx, dz, cost] of dirs) {
        const nx = cx + dx;
        const nz = cz + dz;
        if (nx < 0 || nz < 0 || nx >= this.cols || nz >= this.rows) continue;
        const ni = nz * this.cols + nx;
        if (!this.walkable[ni] || closed[ni]) continue;
        if (dx !== 0 && dz !== 0) {
          if (!this.walkable[cz * this.cols + nx] || !this.walkable[nz * this.cols + cx]) continue;
        }
        const tentative = gScore[node.idx] + cost;
        if (tentative < gScore[ni]) {
          gScore[ni] = tentative;
          cameFrom[ni] = node.idx;
          heap.push({ idx: ni, f: tentative + heuristic(nx, nz) });
        }
      }
    }
    if (!found) return [];
    const cells: number[] = [];
    let cur = endCell;
    while (cur !== -1) {
      cells.push(cur);
      if (cur === startCell) break;
      cur = cameFrom[cur];
    }
    cells.reverse();
    const raw = cells.map((idx) => this.cellToWorld(idx % this.cols, Math.floor(idx / this.cols)));
    if (raw.length > 0) raw[raw.length - 1] = { x: tx, z: tz };

    // String-pull the path using the nav grid so bots take natural diagonals.
    const smooth: { x: number; z: number }[] = [];
    let anchor = { x: sx, z: sz };
    let i = 0;
    while (i < raw.length - 1) {
      let furthest = i;
      for (let j = raw.length - 1; j > i; j--) {
        if (this.hasLineOfSight(anchor.x, anchor.z, raw[j].x, raw[j].z)) {
          furthest = j;
          break;
        }
      }
      smooth.push(raw[furthest]);
      anchor = raw[furthest];
      i = furthest + 1;
    }
    return smooth;
  }

  hasLineOfSight(x1: number, z1: number, x2: number, z2: number): boolean {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const dist = Math.hypot(dx, dz);
    const steps = Math.ceil(dist / (this.cell * 0.5));
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      const x = x1 + dx * t;
      const z = z1 + dz * t;
      const c = this.worldToCell(x, z);
      if (!this.walkable[c.z * this.cols + c.x]) return false;
    }
    return true;
  }

  randomPointNear(x: number, z: number, radius: number): { x: number; z: number } | null {
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const px = x + Math.cos(a) * r;
      const pz = z + Math.sin(a) * r;
      if (this.isWalkable(px, pz)) return { x: px, z: pz };
    }
    return null;
  }
}
