import { FLOOR_RECTS, MAP_BOUNDS } from '../data/mapLayout';
import { PhysicsWorld } from './PhysicsWorld';

interface AStarNode {
  index: number;
  f: number;
}

/**
 * Coarse occupancy grid + A*. The map's floor rectangles define the walkable
 * universe, then static colliders inflate out by the agent radius. This gives
 * the bots a stable network through every doorway and lane.
 */
export class NavGrid {
  readonly cellSize = 0.75;
  readonly cols: number;
  readonly rows: number;
  readonly minX: number;
  readonly minZ: number;
  readonly walkable: Uint8Array;
  private readonly gScore: Float32Array;
  private readonly fScore: Float32Array;
  private readonly cameFrom: Int32Array;
  private readonly closed: Uint8Array;
  private readonly stamp: Uint32Array;
  private currentStamp = 0;
  private readonly heap: AStarNode[] = [];

  constructor(private readonly physics: PhysicsWorld) {
    this.minX = MAP_BOUNDS.minX;
    this.minZ = MAP_BOUNDS.minZ;
    this.cols = Math.ceil((MAP_BOUNDS.maxX - MAP_BOUNDS.minX) / this.cellSize);
    this.rows = Math.ceil((MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ) / this.cellSize);
    const count = this.cols * this.rows;
    this.walkable = new Uint8Array(count);
    this.gScore = new Float32Array(count);
    this.fScore = new Float32Array(count);
    this.cameFrom = new Int32Array(count);
    this.closed = new Uint8Array(count);
    this.stamp = new Uint32Array(count);
    this.rebuild();
  }

  private rebuild(): void {
    const agentRadius = 0.4;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const { x, z } = this.cellCenter(col, row);
        let insideFloor = false;
        for (const rect of FLOOR_RECTS) {
          if (x >= rect.x1 && x <= rect.x2 && z >= rect.z1 && z <= rect.z2) {
            insideFloor = true;
            break;
          }
        }
        if (!insideFloor || this.physics.navBlocked(x, z, agentRadius)) continue;
        this.walkable[row * this.cols + col] = 1;
      }
    }
  }

  private cellCenter(col: number, row: number): { x: number; z: number } {
    return {
      x: this.minX + (col + 0.5) * this.cellSize,
      z: this.minZ + (row + 0.5) * this.cellSize,
    };
  }

  private worldToGrid(x: number, z: number): { col: number; row: number } {
    return {
      col: Math.floor((x - this.minX) / this.cellSize),
      row: Math.floor((z - this.minZ) / this.cellSize),
    };
  }

  isWalkable(x: number, z: number): boolean {
    const { col, row } = this.worldToGrid(x, z);
    if (col < 0 || row < 0 || col >= this.cols || row >= this.rows) return false;
    return this.walkable[row * this.cols + col] === 1;
  }

  isWorldWalkable(x: number, z: number): boolean {
    // A slightly finer test than the coarse A* grid, used for smoothing.
    if (!this.isWalkable(x, z)) return false;
    return !this.physics.navBlocked(x, z, 0.37);
  }

  nearestWalkable(x: number, z: number): { x: number; z: number } | null {
    if (this.isWalkable(x, z)) return { x, z };
    const origin = this.worldToGrid(x, z);
    for (let radius = 1; radius <= 10; radius++) {
      for (let dz = -radius; dz <= radius; dz++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dz) !== radius) continue;
          const col = origin.col + dx;
          const row = origin.row + dz;
          if (
            col >= 0 &&
            row >= 0 &&
            col < this.cols &&
            row < this.rows &&
            this.walkable[row * this.cols + col]
          ) {
            return this.cellCenter(col, row);
          }
        }
      }
    }
    return null;
  }

  findPath(
    startX: number,
    startZ: number,
    goalX: number,
    goalZ: number,
    maxIterations = 16000,
  ): { x: number; z: number }[] {
    const startSnap = this.nearestWalkable(startX, startZ);
    const goalSnap = this.nearestWalkable(goalX, goalZ);
    if (!startSnap || !goalSnap) return [];

    const start = this.worldToGrid(startSnap.x, startSnap.z);
    const goal = this.worldToGrid(goalSnap.x, goalSnap.z);
    const startIndex = start.row * this.cols + start.col;
    const goalIndex = goal.row * this.cols + goal.col;
    if (startIndex === goalIndex) {
      return [{ x: goalX, z: goalZ }];
    }

    this.currentStamp++;
    const stamp = this.currentStamp;
    this.heap.length = 0;
    this.gScore[startIndex] = 0;
    this.fScore[startIndex] = this.heuristic(start.col, start.row, goal.col, goal.row);
    this.cameFrom[startIndex] = -1;
    this.closed[startIndex] = 0;
    this.stamp[startIndex] = stamp;
    this.heapPush({ index: startIndex, f: this.fScore[startIndex] });
    let iterations = 0;
    let found = false;

    while (this.heap.length > 0 && iterations++ < maxIterations) {
      const current = this.heapPop();
      if (!current) break;
      const idx = current.index;
      if (idx === goalIndex) {
        found = true;
        break;
      }
      if (this.closed[idx] === 1) continue;
      this.closed[idx] = 1;
      const col = idx % this.cols;
      const row = Math.floor(idx / this.cols);
      const cg = this.gScore[idx];

      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dz === 0) continue;
          const nc = col + dx;
          const nr = row + dz;
          if (nc < 0 || nr < 0 || nc >= this.cols || nr >= this.rows) continue;
          const nIndex = nr * this.cols + nc;
          if (!this.walkable[nIndex]) continue;
          if (dx !== 0 && dz !== 0) {
            const sideA = row * this.cols + nc;
            const sideB = nr * this.cols + col;
            if (!this.walkable[sideA] || !this.walkable[sideB]) continue;
          }
          // Initialise per-search state *before* consulting `closed`.
          if (this.stamp[nIndex] !== stamp) {
            this.stamp[nIndex] = stamp;
            this.gScore[nIndex] = Number.POSITIVE_INFINITY;
            this.cameFrom[nIndex] = -1;
            this.closed[nIndex] = 0;
          }
          if (this.closed[nIndex]) continue;
          const step = dx !== 0 && dz !== 0 ? 1.41421356 : 1;
          const tentative = cg + step;
          if (tentative < this.gScore[nIndex]) {
            this.gScore[nIndex] = tentative;
            this.cameFrom[nIndex] = idx;
            const h = this.heuristic(nc, nr, goal.col, goal.row);
            this.fScore[nIndex] = tentative + h;
            this.heapPush({ index: nIndex, f: this.fScore[nIndex] });
          }
        }
      }
    }

    if (!found) return [];
    const path: { x: number; z: number }[] = [];
    let cursor = goalIndex;
    let guard = 0;
    while (cursor !== -1 && guard++ < 5000) {
      const col = cursor % this.cols;
      const row = Math.floor(cursor / this.cols);
      path.push(this.cellCenter(col, row));
      if (cursor === startIndex) break;
      cursor = this.cameFrom[cursor];
    }
    path.reverse();
    if (path.length === 0) return [];
    // Aim exactly at the requested destination when it is reachable.
    path[path.length - 1] = { x: goalX, z: goalZ };

    // Greedy string-pulling: skip nodes when the straight segment is clear.
    const smoothed: { x: number; z: number }[] = [];
    let anchor = 0;
    smoothed.push(path[0]);
    while (anchor < path.length - 1) {
      let far = anchor + 1;
      for (let probe = path.length - 1; probe > anchor; probe--) {
        if (this.hasClearSegment(path[anchor], path[probe])) {
          far = probe;
          break;
        }
      }
      smoothed.push(path[far]);
      anchor = far;
    }
    // Remove the initial cell-center waypoint if we can walk directly toward
    // the next point without clipping geometry.
    if (smoothed.length > 1 && this.hasClearSegment({ x: startX, z: startZ }, smoothed[1])) {
      smoothed.shift();
    }
    if (smoothed.length === 0) smoothed.push({ x: goalX, z: goalZ });
    return smoothed;
  }

  hasClearSegment(a: { x: number; z: number }, b: { x: number; z: number }): boolean {
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const distance = Math.hypot(dx, dz);
    const steps = Math.max(1, Math.ceil(distance / 0.32));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      if (!this.isWorldWalkable(a.x + dx * t, a.z + dz * t)) return false;
    }
    return true;
  }

  private heuristic(col: number, row: number, goalCol: number, goalRow: number): number {
    const dx = Math.abs(col - goalCol);
    const dz = Math.abs(row - goalRow);
    return Math.max(dx, dz) + 0.41421356 * Math.min(dx, dz);
  }

  private heapPush(node: AStarNode): void {
    this.heap.push(node);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent].f <= this.heap[i].f) break;
      const tmp = this.heap[parent];
      this.heap[parent] = this.heap[i];
      this.heap[i] = tmp;
      i = parent;
    }
  }

  private heapPop(): AStarNode | undefined {
    if (this.heap.length === 0) return undefined;
    const result = this.heap[0];
    const last = this.heap.pop();
    if (last && this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        const left = i * 2 + 1;
        const right = left + 1;
        let smallest = i;
        if (left < this.heap.length && this.heap[left].f < this.heap[smallest].f) smallest = left;
        if (right < this.heap.length && this.heap[right].f < this.heap[smallest].f) smallest = right;
        if (smallest === i) break;
        const tmp = this.heap[i];
        this.heap[i] = this.heap[smallest];
        this.heap[smallest] = tmp;
        i = smallest;
      }
    }
    return result;
  }

  findRandomNearbyWalkablePoint(x: number, z: number, radius: number, random = Math.random): { x: number; z: number } {
    for (let i = 0; i < 30; i++) {
      const angle = random() * Math.PI * 2;
      const r = Math.sqrt(random()) * radius;
      const tx = x + Math.cos(angle) * r;
      const tz = z + Math.sin(angle) * r;
      if (this.isWorldWalkable(tx, tz)) return { x: tx, z: tz };
    }
    return this.nearestWalkable(x, z) ?? { x, z };
  }
}
