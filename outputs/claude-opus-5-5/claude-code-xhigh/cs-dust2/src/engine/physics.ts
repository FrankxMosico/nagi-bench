import type { Vec3 } from './math.ts';
import type { Ramp, StaticBox } from './map/types.ts';

export const GRAVITY = 20;
export const STEP_HEIGHT = 0.45;
export const STEP_DOWN = 0.5;
const EPS = 1e-4;

export interface PhysBody {
  pos: Vec3;
  vel: Vec3;
  radius: number;
  height: number;
  onGround: boolean;
}

export interface RayHit {
  t: number;
  nx: number;
  ny: number;
  nz: number;
  /** Index into world.boxes, or -1 for ramps. */
  box: number;
}

export interface MoveResult {
  landed: boolean;
  impact: number;
  blockedX: boolean;
  blockedZ: boolean;
}

/**
 * Static collision world made of axis-aligned boxes plus linear ramps.
 * Bodies are vertical "boxes" (square footprint of half-size `radius`) that can step up
 * small ledges, follow ramps and slide along walls one axis at a time.
 */
export class CollisionWorld {
  readonly boxes: StaticBox[];
  readonly ramps: Ramp[];
  private readonly cellSize = 4;
  private readonly gx0: number;
  private readonly gz0: number;
  private readonly gw: number;
  private readonly gh: number;
  private readonly cells: number[][];
  private readonly stamp: Uint32Array;
  private stampId = 1;
  private readonly tmp: number[] = [];
  readonly moveResult: MoveResult = { landed: false, impact: 0, blockedX: false, blockedZ: false };

  constructor(boxes: StaticBox[], ramps: Ramp[]) {
    this.boxes = boxes;
    this.ramps = ramps;
    let minX = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxZ = -Infinity;
    for (const b of boxes) {
      minX = Math.min(minX, b.minX);
      minZ = Math.min(minZ, b.minZ);
      maxX = Math.max(maxX, b.maxX);
      maxZ = Math.max(maxZ, b.maxZ);
    }
    this.gx0 = Math.floor(minX) - this.cellSize;
    this.gz0 = Math.floor(minZ) - this.cellSize;
    this.gw = Math.ceil((maxX - this.gx0) / this.cellSize) + 2;
    this.gh = Math.ceil((maxZ - this.gz0) / this.cellSize) + 2;
    this.cells = new Array(this.gw * this.gh);
    for (let i = 0; i < this.cells.length; i++) this.cells[i] = [];
    boxes.forEach((b, idx) => {
      const i0 = this.ci(b.minX);
      const i1 = this.ci(b.maxX);
      const j0 = this.cj(b.minZ);
      const j1 = this.cj(b.maxZ);
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) this.cells[j * this.gw + i].push(idx);
    });
    this.stamp = new Uint32Array(boxes.length);
  }

  private ci(x: number): number {
    return Math.max(0, Math.min(this.gw - 1, Math.floor((x - this.gx0) / this.cellSize)));
  }

  private cj(z: number): number {
    return Math.max(0, Math.min(this.gh - 1, Math.floor((z - this.gz0) / this.cellSize)));
  }

  /** Collects indices of boxes whose cells intersect the XZ rectangle. Returns count written to `out`. */
  query(minX: number, minZ: number, maxX: number, maxZ: number, out: number[]): number {
    this.stampId++;
    if (this.stampId === 0xffffffff) {
      this.stamp.fill(0);
      this.stampId = 1;
    }
    const sid = this.stampId;
    let n = 0;
    const i0 = this.ci(minX);
    const i1 = this.ci(maxX);
    const j0 = this.cj(minZ);
    const j1 = this.cj(maxZ);
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const cell = this.cells[j * this.gw + i];
        for (let k = 0; k < cell.length; k++) {
          const b = cell[k];
          if (this.stamp[b] === sid) continue;
          this.stamp[b] = sid;
          out[n++] = b;
        }
      }
    }
    return n;
  }

  rampHeight(r: Ramp, x: number, z: number): number {
    let t = r.axis === 'x' ? (x - r.minX) / (r.maxX - r.minX) : (z - r.minZ) / (r.maxZ - r.minZ);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    return r.h0 + (r.h1 - r.h0) * t;
  }

  /** Max ramp height over the intersection of the footprint and the ramp (assumes they overlap). */
  private rampMaxOver(r: Ramp, minX: number, minZ: number, maxX: number, maxZ: number): number {
    if (r.axis === 'x') {
      const a = Math.max(minX, r.minX);
      const b = Math.min(maxX, r.maxX);
      return Math.max(this.rampHeight(r, a, 0), this.rampHeight(r, b, 0));
    }
    const a = Math.max(minZ, r.minZ);
    const b = Math.min(maxZ, r.maxZ);
    return Math.max(this.rampHeight(r, 0, a), this.rampHeight(r, 0, b));
  }

  private static rampOverlaps(r: Ramp, minX: number, minZ: number, maxX: number, maxZ: number): boolean {
    return r.minX < maxX && r.maxX > minX && r.minZ < maxZ && r.maxZ > minZ;
  }

  /** Highest walkable surface under the footprint whose top is <= maxY. -Infinity if none. */
  supportHeight(x: number, z: number, r: number, maxY: number): number {
    const minX = x - r;
    const maxX = x + r;
    const minZ = z - r;
    const maxZ = z + r;
    let best = -Infinity;
    const n = this.query(minX, minZ, maxX, maxZ, this.tmp);
    for (let k = 0; k < n; k++) {
      const b = this.boxes[this.tmp[k]];
      if (b.minX >= maxX || b.maxX <= minX || b.minZ >= maxZ || b.maxZ <= minZ) continue;
      if (b.maxY <= maxY + EPS && b.maxY > best) best = b.maxY;
    }
    for (const rp of this.ramps) {
      if (!CollisionWorld.rampOverlaps(rp, minX, minZ, maxX, maxZ)) continue;
      const hgt = this.rampMaxOver(rp, minX, minZ, maxX, maxZ);
      if (hgt <= maxY + EPS && hgt > best) best = hgt;
    }
    return best;
  }

  /** True if a body standing at feetY would intersect a wall / tall prop / steep ramp side. */
  isBlocked(x: number, z: number, r: number, feetY: number, height: number, step = STEP_HEIGHT): boolean {
    const minX = x - r;
    const maxX = x + r;
    const minZ = z - r;
    const maxZ = z + r;
    const n = this.query(minX, minZ, maxX, maxZ, this.tmp);
    for (let k = 0; k < n; k++) {
      const b = this.boxes[this.tmp[k]];
      if (b.minX >= maxX || b.maxX <= minX || b.minZ >= maxZ || b.maxZ <= minZ) continue;
      if (b.maxY > feetY + step && b.minY < feetY + height) return true;
    }
    for (const rp of this.ramps) {
      if (!CollisionWorld.rampOverlaps(rp, minX, minZ, maxX, maxZ)) continue;
      if (this.rampMaxOver(rp, minX, minZ, maxX, maxZ) > feetY + step) return true;
    }
    return false;
  }

  /** Lowest box bottom above `headY` over the footprint (ceiling). */
  ceilingHeight(x: number, z: number, r: number, headY: number): number {
    const minX = x - r;
    const maxX = x + r;
    const minZ = z - r;
    const maxZ = z + r;
    let best = Infinity;
    const n = this.query(minX, minZ, maxX, maxZ, this.tmp);
    for (let k = 0; k < n; k++) {
      const b = this.boxes[this.tmp[k]];
      if (b.minX >= maxX || b.maxX <= minX || b.minZ >= maxZ || b.maxZ <= minZ) continue;
      if (b.minY >= headY - 0.05 && b.minY < best) best = b.minY;
    }
    return best;
  }

  private moveAxis(body: PhysBody, axis: 0 | 2, delta: number): boolean {
    const r = body.radius;
    const feet = body.pos.y;
    const top = feet + body.height;
    const ox = body.pos.x;
    const oz = body.pos.z;
    let nx = axis === 0 ? ox + delta : ox;
    let nz = axis === 2 ? oz + delta : oz;
    let blocked = false;
    const n = this.query(Math.min(ox, nx) - r, Math.min(oz, nz) - r, Math.max(ox, nx) + r, Math.max(oz, nz) + r, this.tmp);
    for (let k = 0; k < n; k++) {
      const b = this.boxes[this.tmp[k]];
      if (b.maxY <= feet + STEP_HEIGHT || b.minY >= top) continue;
      const tx = axis === 0 ? ox + delta : ox;
      const tz = axis === 2 ? oz + delta : oz;
      if (!(b.minX < tx + r && b.maxX > tx - r && b.minZ < tz + r && b.maxZ > tz - r)) continue;
      // Already overlapping at the old position: ignore so the body can escape.
      if (b.minX < ox + r && b.maxX > ox - r && b.minZ < oz + r && b.maxZ > oz - r) continue;
      blocked = true;
      if (axis === 0) {
        nx = delta > 0 ? Math.min(nx, b.minX - r - EPS) : Math.max(nx, b.maxX + r + EPS);
      } else {
        nz = delta > 0 ? Math.min(nz, b.minZ - r - EPS) : Math.max(nz, b.maxZ + r + EPS);
      }
    }
    if (axis === 0 && (nx - ox) * delta < 0) nx = ox;
    if (axis === 2 && (nz - oz) * delta < 0) nz = oz;

    // Steep ramp sides behave like walls.
    for (const rp of this.ramps) {
      if (!CollisionWorld.rampOverlaps(rp, nx - r, nz - r, nx + r, nz + r)) continue;
      if (this.rampMaxOver(rp, nx - r, nz - r, nx + r, nz + r) <= feet + STEP_HEIGHT) continue;
      if (
        CollisionWorld.rampOverlaps(rp, ox - r, oz - r, ox + r, oz + r) &&
        this.rampMaxOver(rp, ox - r, oz - r, ox + r, oz + r) > feet + STEP_HEIGHT
      ) {
        continue;
      }
      nx = ox;
      nz = oz;
      blocked = true;
      break;
    }
    body.pos.x = nx;
    body.pos.z = nz;
    return blocked;
  }

  /** Collision-aware horizontal displacement only (used for soft pushes between soldiers). */
  slide(body: PhysBody, dx: number, dz: number): void {
    if (dx !== 0) this.moveAxis(body, 0, dx);
    if (dz !== 0) this.moveAxis(body, 2, dz);
  }

  /** Integrates a body for dt: horizontal slide + step-up, then gravity / ground snapping / ceilings. */
  moveBody(body: PhysBody, dt: number): MoveResult {
    const res = this.moveResult;
    res.landed = false;
    res.impact = 0;
    res.blockedX = false;
    res.blockedZ = false;
    const dx = body.vel.x * dt;
    const dz = body.vel.z * dt;
    if (dx !== 0) res.blockedX = this.moveAxis(body, 0, dx);
    if (dz !== 0) res.blockedZ = this.moveAxis(body, 2, dz);
    if (res.blockedX) body.vel.x = 0;
    if (res.blockedZ) body.vel.z = 0;

    const wasGround = body.onGround;
    body.vel.y -= GRAVITY * dt;
    const feet = body.pos.y;
    const support = this.supportHeight(body.pos.x, body.pos.z, body.radius, feet + STEP_HEIGHT);
    let newFeet = feet + body.vel.y * dt;
    if (body.vel.y <= 0) {
      if (newFeet <= support + EPS) {
        if (!wasGround) {
          res.landed = true;
          res.impact = -body.vel.y;
        }
        body.pos.y = support;
        body.vel.y = 0;
        body.onGround = true;
      } else if (wasGround && feet - support <= STEP_DOWN) {
        body.pos.y = support;
        body.vel.y = 0;
        body.onGround = true;
      } else {
        body.pos.y = newFeet;
        body.onGround = false;
      }
    } else {
      const ceil = this.ceilingHeight(body.pos.x, body.pos.z, body.radius * 0.9, feet + body.height);
      if (newFeet + body.height > ceil) {
        newFeet = ceil - body.height;
        body.vel.y = 0;
      }
      body.pos.y = Math.max(feet, newFeet);
      body.onGround = false;
    }
    // Safety net: never fall out of the world.
    if (body.pos.y < -5) {
      body.pos.y = 0;
      body.vel.y = 0;
    }
    return res;
  }

  /**
   * Ray vs static geometry. Direction must be normalised. Returns the nearest hit within maxDist.
   */
  raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number, hit: RayHit): boolean {
    let best = maxDist;
    let found = false;
    const ix = dx !== 0 ? 1 / dx : Infinity;
    const iy = dy !== 0 ? 1 / dy : Infinity;
    const iz = dz !== 0 ? 1 / dz : Infinity;
    const ex = ox + dx * maxDist;
    const ez = oz + dz * maxDist;
    const n = this.query(Math.min(ox, ex), Math.min(oz, ez), Math.max(ox, ex), Math.max(oz, ez), this.tmp);
    for (let k = 0; k < n; k++) {
      const bi = this.tmp[k];
      const b = this.boxes[bi];
      let t1 = (b.minX - ox) * ix;
      let t2 = (b.maxX - ox) * ix;
      let tmin = Math.min(t1, t2);
      let tmax = Math.max(t1, t2);
      let axis = 0;
      if (Number.isNaN(tmin)) {
        // ray parallel and on the slab plane
        if (ox < b.minX || ox > b.maxX) continue;
        tmin = -Infinity;
        tmax = Infinity;
      }
      t1 = (b.minY - oy) * iy;
      t2 = (b.maxY - oy) * iy;
      let lo = Math.min(t1, t2);
      let hi = Math.max(t1, t2);
      if (Number.isNaN(lo)) {
        if (oy < b.minY || oy > b.maxY) continue;
        lo = -Infinity;
        hi = Infinity;
      }
      if (lo > tmin) {
        tmin = lo;
        axis = 1;
      }
      if (hi < tmax) tmax = hi;
      t1 = (b.minZ - oz) * iz;
      t2 = (b.maxZ - oz) * iz;
      lo = Math.min(t1, t2);
      hi = Math.max(t1, t2);
      if (Number.isNaN(lo)) {
        if (oz < b.minZ || oz > b.maxZ) continue;
        lo = -Infinity;
        hi = Infinity;
      }
      if (lo > tmin) {
        tmin = lo;
        axis = 2;
      }
      if (hi < tmax) tmax = hi;
      if (tmax < tmin || tmin < 0 || tmin >= best) continue;
      best = tmin;
      found = true;
      hit.t = tmin;
      hit.box = bi;
      hit.nx = axis === 0 ? (dx > 0 ? -1 : 1) : 0;
      hit.ny = axis === 1 ? (dy > 0 ? -1 : 1) : 0;
      hit.nz = axis === 2 ? (dz > 0 ? -1 : 1) : 0;
    }
    for (const r of this.ramps) {
      const len = r.axis === 'x' ? r.maxX - r.minX : r.maxZ - r.minZ;
      const k = (r.h1 - r.h0) / len;
      const oa = r.axis === 'x' ? ox - r.minX : oz - r.minZ;
      const da = r.axis === 'x' ? dx : dz;
      const denom = dy - k * da;
      if (Math.abs(denom) < 1e-9) continue;
      const s = (r.h0 + k * oa - oy) / denom;
      if (s < 0 || s >= best) continue;
      const px = ox + dx * s;
      const pz = oz + dz * s;
      if (px < r.minX || px > r.maxX || pz < r.minZ || pz > r.maxZ) continue;
      best = s;
      found = true;
      const nl = Math.sqrt(k * k + 1);
      hit.t = s;
      hit.box = -1;
      hit.nx = r.axis === 'x' ? -k / nl : 0;
      hit.ny = 1 / nl;
      hit.nz = r.axis === 'z' ? -k / nl : 0;
    }
    return found;
  }

  private readonly losHit: RayHit = { t: 0, nx: 0, ny: 0, nz: 0, box: 0 };

  /** True if the segment a→b is not obstructed by static geometry. */
  lineOfSight(ax: number, ay: number, az: number, bx: number, by: number, bz: number): boolean {
    const dx = bx - ax;
    const dy = by - ay;
    const dz = bz - az;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (d < 1e-6) return true;
    return !this.raycast(ax, ay, az, dx / d, dy / d, dz / d, d, this.losHit);
  }
}
