import type { Collider } from './types';

export interface MoveResult {
  x: number;
  z: number;
  hitX: boolean;
  hitZ: boolean;
}

export interface WorldRayHit {
  distance: number;
  point: { x: number; y: number; z: number };
  normal: { x: number; y: number; z: number };
  collider: Collider | null;
  distanceToFloor: number | null;
}

interface RayBoxResult {
  t: number;
  nx: number;
  ny: number;
  nz: number;
}

export class PhysicsWorld {
  readonly colliders: Collider[] = [];
  private nextColliderId = 1;

  addCollider(c: Omit<Collider, 'id'> & { id?: string }): Collider {
    const collider: Collider = {
      ...c,
      id: c.id ?? `col_${this.nextColliderId++}`,
    };
    this.colliders.push(collider);
    return collider;
  }

  addBoxCollider(
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    minZ: number,
    maxZ: number,
    tag: Collider['tag'],
    id?: string,
  ): Collider {
    return this.addCollider({
      id,
      minX,
      maxX,
      minY,
      maxY,
      minZ,
      maxZ,
      blocksSight: maxY > 0.9,
      tag,
    });
  }

  /**
   * Sweep a vertical player cylinder along one axis at a time.
   * This lets the player slide naturally along walls and is stable enough
   * for a browser FPS prototype.
   */
  moveCircle(
    startX: number,
    startZ: number,
    deltaX: number,
    deltaZ: number,
    radius: number,
    height: number,
    footY: number,
  ): MoveResult {
    let x = startX;
    let z = startZ;
    let hitX = false;
    let hitZ = false;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(deltaX), Math.abs(deltaZ)) / 0.12));
    const stepX = deltaX / steps;
    const stepZ = deltaZ / steps;

    for (let step = 0; step < steps; step++) {
      // X axis
      if (stepX !== 0) {
        const nextX = x + stepX;
        if (this.circleBlocked(nextX, z, radius, height, footY)) {
          hitX = true;
        } else {
          x = nextX;
        }
      }
      // Z axis
      if (stepZ !== 0) {
        const nextZ = z + stepZ;
        if (this.circleBlocked(x, nextZ, radius, height, footY)) {
          hitZ = true;
        } else {
          z = nextZ;
        }
      }
    }

    return { x, z, hitX, hitZ };
  }

  circleBlocked(
    x: number,
    z: number,
    radius: number,
    height: number,
    footY: number,
  ): boolean {
    const lower = footY + 0.08;
    const upper = footY + height - 0.04;
    for (const c of this.colliders) {
      if (c.tag === 'ground') continue;
      if (c.maxY <= lower || c.minY >= upper) continue;
      if (circleIntersectsBox(x, z, radius, c.minX, c.maxX, c.minZ, c.maxZ)) return true;
    }
    return false;
  }

  /** Highest solid top at or below the given foot height, used for crate landings. */
  supportHeight(x: number, z: number, radius: number, footY: number): number {
    let support = 0;
    for (const c of this.colliders) {
      if (c.tag === 'ground' || c.maxY > footY + 0.3) continue;
      if (!circleIntersectsBox(x, z, radius, c.minX, c.maxX, c.minZ, c.maxZ)) continue;
      if (c.maxY > support) support = c.maxY;
    }
    return support;
  }

  /** Returns the highest collider top under the player, regardless of current y. */
  highestSurfaceBelow(x: number, z: number, radius: number, maxY: number): number {
    let support = 0;
    for (const c of this.colliders) {
      if (c.tag === 'ground') continue;
      if (c.maxY > maxY || c.maxY < 0) continue;
      if (!circleIntersectsBox(x, z, radius, c.minX, c.maxX, c.minZ, c.maxZ)) continue;
      if (c.maxY > support) support = c.maxY;
    }
    return support;
  }

  /** Grid obstacle test used by the navigation mesh builder. */
  navBlocked(x: number, z: number, radius: number): boolean {
    const lower = 0.12;
    const upper = 1.72;
    for (const c of this.colliders) {
      if (c.tag === 'ground') continue;
      if (c.maxY <= lower || c.minY >= upper) continue;
      if (circleIntersectsBox(x, z, radius, c.minX, c.maxX, c.minZ, c.maxZ)) return true;
    }
    return false;
  }

  /**
   * 3D ray vs. world collider test. Returns the nearest impact and its normal.
   * Also accounts for the y=0 floor when a shot is aimed down.
   */
  raycastWorld(
    ox: number,
    oy: number,
    oz: number,
    dx: number,
    dy: number,
    dz: number,
    maxDistance: number,
  ): WorldRayHit | null {
    let best: WorldRayHit | null = null;

    for (const c of this.colliders) {
      if (c.tag === 'ground') continue;
      const hit = rayIntersectBox(ox, oy, oz, dx, dy, dz, c);
      if (hit && hit.t <= maxDistance && (!best || hit.t < best.distance)) {
        best = {
          distance: hit.t,
          point: { x: ox + dx * hit.t, y: oy + dy * hit.t, z: oz + dz * hit.t },
          normal: { x: hit.nx, y: hit.ny, z: hit.nz },
          collider: c,
          distanceToFloor: null,
        };
      }
    }

    let floorDistance: number | null = null;
    if (dy < -0.00001 && oy > 0) {
      const t = -oy / dy;
      if (t >= 0 && t <= maxDistance) {
        floorDistance = t;
        if (!best || t < best.distance) {
          best = {
            distance: t,
            point: { x: ox + dx * t, y: 0.01, z: oz + dz * t },
            normal: { x: 0, y: 1, z: 0 },
            collider: null,
            distanceToFloor: t,
          };
        }
      }
    }

    if (best) best.distanceToFloor = floorDistance;
    return best;
  }

  lineOfSight(
    fromX: number,
    fromY: number,
    fromZ: number,
    toX: number,
    toY: number,
    toZ: number,
    eyePadding = 0,
  ): boolean {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const dz = toZ - fromZ;
    const distance = Math.hypot(dx, dy, dz);
    if (distance < 0.001) return true;
    const nx = dx / distance;
    const ny = dy / distance;
    const nz = dz / distance;
    const limit = distance - Math.max(0.05, eyePadding);

    for (const c of this.colliders) {
      if (!c.blocksSight || c.tag === 'ground') continue;
      const hit = rayIntersectBox(fromX, fromY, fromZ, nx, ny, nz, c);
      if (hit && hit.t > 0.06 && hit.t < limit) return false;
    }
    return true;
  }

  colliderUnderneath(x: number, z: number, radius: number): Collider | null {
    for (const c of this.colliders) {
      if (
        c.maxY <= 0.2 &&
        c.maxY > 0 &&
        circleIntersectsBox(x, z, radius, c.minX, c.maxX, c.minZ, c.maxZ)
      ) {
        return c;
      }
    }
    return null;
  }
}

export function circleIntersectsBox(
  x: number,
  z: number,
  radius: number,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number,
): boolean {
  const cx = Math.max(minX, Math.min(x, maxX));
  const cz = Math.max(minZ, Math.min(z, maxZ));
  const dx = x - cx;
  const dz = z - cz;
  return dx * dx + dz * dz < radius * radius;
}

/** Slab-method ray/AABB intersection. Returns entry distance and face normal. */
export function rayIntersectBox(
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  c: Collider,
): RayBoxResult | null {
  let tmin = 0;
  let tmax = Number.POSITIVE_INFINITY;
  let nx = 0;
  let ny = 0;
  let nz = 0;

  // X slab
  if (Math.abs(dx) < 1e-8) {
    if (ox < c.minX || ox > c.maxX) return null;
  } else {
    const inv = 1 / dx;
    let t1 = (c.minX - ox) * inv;
    let t2 = (c.maxX - ox) * inv;
    let sign = -1;
    if (t1 > t2) {
      const tmp = t1;
      t1 = t2;
      t2 = tmp;
      sign = 1;
    }
    if (t1 > tmin) {
      tmin = t1;
      nx = sign;
      ny = 0;
      nz = 0;
    }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }

  // Y slab
  if (Math.abs(dy) < 1e-8) {
    if (oy < c.minY || oy > c.maxY) return null;
  } else {
    const inv = 1 / dy;
    let t1 = (c.minY - oy) * inv;
    let t2 = (c.maxY - oy) * inv;
    let sign = -1;
    if (t1 > t2) {
      const tmp = t1;
      t1 = t2;
      t2 = tmp;
      sign = 1;
    }
    if (t1 > tmin) {
      tmin = t1;
      nx = 0;
      ny = sign;
      nz = 0;
    }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }

  // Z slab
  if (Math.abs(dz) < 1e-8) {
    if (oz < c.minZ || oz > c.maxZ) return null;
  } else {
    const inv = 1 / dz;
    let t1 = (c.minZ - oz) * inv;
    let t2 = (c.maxZ - oz) * inv;
    let sign = -1;
    if (t1 > t2) {
      const tmp = t1;
      t1 = t2;
      t2 = tmp;
      sign = 1;
    }
    if (t1 > tmin) {
      tmin = t1;
      nx = 0;
      ny = 0;
      nz = sign;
    }
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }

  if (tmax < 0) return null;
  return { t: tmin, nx, ny, nz };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function expDamp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function normalizeAngle(angle: number): number {
  let a = angle;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}
