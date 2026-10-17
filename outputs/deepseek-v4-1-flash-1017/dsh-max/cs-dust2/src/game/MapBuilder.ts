import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  COVER_BOXES,
  FLOOR_RECTS,
  MAP_BOUNDS,
  PLANT_SITES,
  STRUCTURES,
} from '../data/mapLayout';
import type { BoxSpec, RectSpec, WallSpec } from './types';
import { PhysicsWorld } from './PhysicsWorld';
import {
  makeConcreteTexture,
  makeLabelTexture,
  makeMetalTexture,
  makePlasterTexture,
  makeSandTexture,
  makeSkyTexture,
  makeStoneTexture,
  makeTunnelTexture,
  makeWoodTexture,
} from './textures';

type WallStyle = 'sandstone' | 'concrete' | 'plaster' | 'tunnel' | 'brick';

interface BoundaryRun {
  start: number;
  end: number;
  line: number;
  side: 'north' | 'south' | 'west' | 'east';
  style: WallStyle;
}

interface Animated {
  object: THREE.Object3D;
  baseRotation: number;
  phase: number;
  speed: number;
}

const CELL = 0.5;

export class Dust2Map {
  readonly group = new THREE.Group();
  readonly lights: THREE.Light[] = [];
  private readonly animated: Animated[] = [];
  private readonly dust: THREE.Points;
  private readonly dustPositions: Float32Array;
  private readonly dustVelocities: Float32Array;
  private readonly bannerObjects: { mesh: THREE.Mesh; phase: number }[] = [];
  private readonly textureSet = new Set<THREE.Texture>();
  private readonly baseTextureCache = new Map<string, THREE.CanvasTexture>();
  private readonly wallMaterialCache = new Map<WallStyle, THREE.MeshStandardMaterial>();
  private readonly wallBatches = new Map<WallStyle, THREE.BufferGeometry[]>();
  private readonly capBatch: THREE.BufferGeometry[] = [];
  private readonly plinthBatch: THREE.BufferGeometry[] = [];
  private readonly curbBatch: THREE.BufferGeometry[] = [];
  private readonly coverBatches = new Map<string, THREE.BufferGeometry[]>();
  private readonly coverMaterialCache = new Map<string, THREE.MeshStandardMaterial>();
  private readonly materialSet = new Set<THREE.Material>();
  private readonly geometrySet = new Set<THREE.BufferGeometry>();
  private readonly physics: PhysicsWorld;
  private readonly scene: THREE.Scene;
  private elapsed = 0;

  constructor(scene: THREE.Scene, physics: PhysicsWorld) {
    this.scene = scene;
    this.physics = physics;
    scene.add(this.group);

    this.addSky();
    this.addGround();
    this.addFloors();
    this.addTunnelRoofs();
    this.buildBoundaryWalls();
    this.addBackstops();
    this.addStructures();
    this.finalizeWallBatches();
    this.addCover();
    this.finalizeCoverBatches();
    this.addDoorsAndArches();
    this.addBombSiteMarkings();
    this.addSignage();
    this.addDistantCity();
    this.addLights();
    const dust = this.addDust();
    this.dust = dust.points;
    this.dustPositions = dust.positions;
    this.dustVelocities = dust.velocities;
  }

  update(dt: number, playerPos?: THREE.Vector3): void {
    this.elapsed += dt;
    // Slowly drifting dust motes.
    const count = this.dustPositions.length / 3;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      this.dustPositions[i3] += this.dustVelocities[i3] * dt;
      this.dustPositions[i3 + 1] += Math.sin(this.elapsed * 0.35 + i) * 0.02 * dt;
      this.dustPositions[i3 + 2] += this.dustVelocities[i3 + 2] * dt;
      if (this.dustPositions[i3] > MAP_BOUNDS.maxX + 2) {
        this.dustPositions[i3] = MAP_BOUNDS.minX - 2;
      }
      if (this.dustPositions[i3] < MAP_BOUNDS.minX - 2) {
        this.dustPositions[i3] = MAP_BOUNDS.maxX + 2;
      }
      if (this.dustPositions[i3 + 2] > MAP_BOUNDS.maxZ + 2) {
        this.dustPositions[i3 + 2] = MAP_BOUNDS.minZ - 2;
      }
      if (this.dustPositions[i3 + 2] < MAP_BOUNDS.minZ - 2) {
        this.dustPositions[i3 + 2] = MAP_BOUNDS.maxZ + 2;
      }
    }
    const attr = this.dust.geometry.getAttribute('position') as THREE.BufferAttribute;
    attr.needsUpdate = true;

    // Fabric banners breathing in the desert wind.
    for (const banner of this.bannerObjects) {
      banner.mesh.rotation.z = Math.sin(this.elapsed * 1.1 + banner.phase) * 0.06;
      banner.mesh.rotation.y = Math.sin(this.elapsed * 0.7 + banner.phase) * 0.05;
    }

    for (const item of this.animated) {
      item.object.rotation.z = item.baseRotation + Math.sin(this.elapsed * item.speed + item.phase) * 0.018;
    }

    if (playerPos) {
      // Keep motes around the player subtly alive without doing a full particle sim.
      const p = this.dust.material as THREE.PointsMaterial;
      p.opacity = 0.27 + Math.sin(this.elapsed * 0.7) * 0.035;
      p.size = 0.09 + Math.sin(this.elapsed * 0.3) * 0.012;
    }
  }

  private track<T extends THREE.BufferGeometry>(geometry: T): T {
    this.geometrySet.add(geometry);
    return geometry;
  }

  private trackMaterial<T extends THREE.Material>(material: T): T {
    this.materialSet.add(material);
    return material;
  }

  private cloneTexture(base: THREE.CanvasTexture, repeatX = 1, repeatY = 1): THREE.CanvasTexture {
    const clone = base.clone();
    clone.wrapS = THREE.RepeatWrapping;
    clone.wrapT = THREE.RepeatWrapping;
    clone.repeat.set(repeatX, repeatY);
    clone.needsUpdate = true;
    this.textureSet.add(clone);
    return clone;
  }

  /** Generate each procedural base canvas once; clone only the lightweight UV state. */
  private baseTexture(
    key: 'sand' | 'concrete' | 'tunnel' | 'wood' | 'metal' | 'stone' | 'plaster',
  ): THREE.CanvasTexture {
    const cached = this.baseTextureCache.get(key);
    if (cached) return cached;
    let texture: THREE.CanvasTexture;
    switch (key) {
      case 'sand':
        texture = makeSandTexture();
        break;
      case 'concrete':
        texture = makeConcreteTexture();
        break;
      case 'tunnel':
        texture = makeTunnelTexture();
        break;
      case 'wood':
        texture = makeWoodTexture();
        break;
      case 'metal':
        texture = makeMetalTexture();
        break;
      case 'plaster':
        texture = makePlasterTexture();
        break;
      case 'stone':
      default:
        texture = makeStoneTexture();
        break;
    }
    this.textureSet.add(texture);
    this.baseTextureCache.set(key, texture);
    return texture;
  }

  private addSky(): void {
    const skyTex = makeSkyTexture();
    this.textureSet.add(skyTex);
    const skyMat = this.trackMaterial(
      new THREE.MeshBasicMaterial({
        map: skyTex,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      }),
    );
    const skyGeo = this.track(new THREE.SphereGeometry(460, 32, 18));
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.set(0, -35, 0);
    sky.renderOrder = -100;
    this.group.add(sky);

  }

  private addGround(): void {
    const tex = this.baseTexture('sand');
    const mat = this.trackMaterial(
      new THREE.MeshStandardMaterial({
        map: this.cloneTexture(tex, 32, 32),
        color: '#8f7956',
        roughness: 1,
      }),
    );
    const geo = this.track(new THREE.PlaneGeometry(560, 560));
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.18;
    ground.receiveShadow = true;
    this.group.add(ground);

    // Layered dust banks just beyond the playable walls.
    const ridgeMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#8c7552', roughness: 1 }),
    );
    const ridgeGeos = [
      new THREE.BoxGeometry(90, 5, 26),
      new THREE.BoxGeometry(40, 7, 50),
      new THREE.BoxGeometry(100, 4, 20),
    ];
    const ridges: [number, number, number, number][] = [
      [0, -74, 0, 0.12],
      [-77, 2, Math.PI / 2, 0.18],
      [72, 60, -0.16, 0.08],
    ];
    ridges.forEach(([x, z, rot, y], i) => {
      const g = this.track(ridgeGeos[i]);
      const m = new THREE.Mesh(g, ridgeMat);
      m.position.set(x, y, z);
      m.rotation.y = rot;
      m.receiveShadow = true;
      this.group.add(m);
    });
    // The three geometries are used individually; the array itself is disposable via the set.
  }

  private floorMaterial(rect: RectSpec): THREE.MeshStandardMaterial {
    const style = rect.style;
    let base: THREE.CanvasTexture;
    let repeatX = 5;
    let repeatY = 5;
    let color = '#ffffff';
    let roughness = 0.95;
    if (style === 'sand') {
      base = this.baseTexture('sand');
      repeatX = Math.max(2, (rect.x2 - rect.x1) / 5);
      repeatY = Math.max(2, (rect.z2 - rect.z1) / 5);
      color = '#ddc69d';
    } else if (style === 'concrete') {
      base = this.baseTexture('concrete');
      repeatX = Math.max(2, (rect.x2 - rect.x1) / 7);
      repeatY = Math.max(2, (rect.z2 - rect.z1) / 7);
      color = '#c7c0b1';
      roughness = 0.88;
    } else if (style === 'tunnel') {
      base = this.baseTexture('tunnel');
      repeatX = Math.max(2, (rect.x2 - rect.x1) / 6);
      repeatY = Math.max(2, (rect.z2 - rect.z1) / 6);
      color = '#b7ab97';
      roughness = 1;
    } else if (style === 'wood') {
      base = this.baseTexture('wood');
      repeatX = Math.max(2, (rect.x2 - rect.x1) / 4);
      repeatY = Math.max(2, (rect.z2 - rect.z1) / 4);
      color = '#d8c4a4';
    } else {
      base = this.baseTexture('stone');
      repeatX = Math.max(2, (rect.x2 - rect.x1) / 5);
      repeatY = Math.max(2, (rect.z2 - rect.z1) / 5);
      color = '#cec2a9';
    }
    this.textureSet.add(base);
    return this.trackMaterial(
      new THREE.MeshStandardMaterial({
        map: this.cloneTexture(base, repeatX, repeatY),
        color,
        roughness,
        metalness: 0.02,
      }),
    );
  }

  private addFloors(): void {
    FLOOR_RECTS.forEach((rect, index) => {
      const w = rect.x2 - rect.x1;
      const d = rect.z2 - rect.z1;
      const geo = this.track(new THREE.BoxGeometry(w, 0.22, d));
      const mat = this.floorMaterial(rect);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((rect.x1 + rect.x2) / 2, -0.11 + index * 0.0008, (rect.z1 + rect.z2) / 2);
      mesh.receiveShadow = true;
      this.group.add(mesh);

      // Thin, lighter curbs make the lanes readable without blocking movement.
      if (rect.id !== 'b_tunnel_main' && rect.id !== 'b_tunnel_horizontal') {
        const northCurb = new THREE.BoxGeometry(w, 0.07, 0.16);
        northCurb.translate((rect.x1 + rect.x2) / 2, 0.01, rect.z1 + 0.08);
        this.curbBatch.push(northCurb);
        const southCurb = new THREE.BoxGeometry(w, 0.07, 0.16);
        southCurb.translate((rect.x1 + rect.x2) / 2, 0.01, rect.z2 - 0.08);
        this.curbBatch.push(southCurb);
      }
    });
  }

  private addTunnelRoofs(): void {
    const roofs: [number, number, number, number][] = [
      [46, 2, 12, 56],
      [18, -20, 68, 12],
      [-14, -30, 12, 32],
    ];
    roofs.forEach(([x, z, w, d], index) => {
      const y = 3.62 + index * 0.025;
      const geometry = this.track(new THREE.BoxGeometry(w, 0.28, d));
      this.tileBoxUVs(geometry, w, 0.28, d, 3.2);
      geometry.translate(x, y, z);
      const mesh = new THREE.Mesh(geometry, this.wallMaterial('tunnel'));
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.group.add(mesh);
    });
  }

  private buildBoundaryWalls(): void {
    const cols = Math.ceil((MAP_BOUNDS.maxX - MAP_BOUNDS.minX) / CELL);
    const rows = Math.ceil((MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ) / CELL);
    const walkable = new Uint8Array(cols * rows);
    const styles: (WallStyle | null)[] = new Array(cols * rows).fill(null);

    const inFloor = (x: number, z: number): RectSpec | null => {
      for (const rect of FLOOR_RECTS) {
        if (x >= rect.x1 && x <= rect.x2 && z >= rect.z1 && z <= rect.z2) return rect;
      }
      return null;
    };

    const styleForRect = (rect: RectSpec): WallStyle => {
      if (rect.style === 'tunnel') return 'tunnel';
      if (rect.style === 'concrete') return 'plaster';
      if (rect.style === 'stone') return 'sandstone';
      return 'sandstone';
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = MAP_BOUNDS.minX + (col + 0.5) * CELL;
        const z = MAP_BOUNDS.minZ + (row + 0.5) * CELL;
        const rect = inFloor(x, z);
        if (rect) {
          walkable[row * cols + col] = 1;
          styles[row * cols + col] = styleForRect(rect);
        }
      }
    }

    const runs = new Map<string, BoundaryRun[]>();
    const pushRun = (side: BoundaryRun['side'], line: number, a: number, b: number, style: WallStyle) => {
      const key = `${side}:${line.toFixed(2)}:${style}`;
      if (!runs.has(key)) runs.set(key, []);
      runs.get(key)!.push({ start: Math.min(a, b), end: Math.max(a, b), line, side, style });
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!walkable[row * cols + col]) continue;
        const cellX = MAP_BOUNDS.minX + col * CELL;
        const cellZ = MAP_BOUNDS.minZ + row * CELL;
        const style = styles[row * cols + col] ?? 'sandstone';
        const hasNorth =
          row > 0 && walkable[(row - 1) * cols + col] === 1;
        const hasSouth =
          row < rows - 1 && walkable[(row + 1) * cols + col] === 1;
        const hasWest = col > 0 && walkable[row * cols + col - 1] === 1;
        const hasEast =
          col < cols - 1 && walkable[row * cols + col + 1] === 1;
        if (!hasNorth) pushRun('north', cellZ, cellX, cellX + CELL, style);
        if (!hasSouth) pushRun('south', cellZ + CELL, cellX, cellX + CELL, style);
        if (!hasWest) pushRun('west', cellX, cellZ, cellZ + CELL, style);
        if (!hasEast) pushRun('east', cellX + CELL, cellZ, cellZ + CELL, style);
      }
    }

    for (const list of runs.values()) {
      list.sort((a, b) => a.start - b.start);
      let current: BoundaryRun | null = null;
      const merged: BoundaryRun[] = [];
      for (const run of list) {
        if (!current) {
          current = { ...run };
        } else if (run.start <= current.end + 0.001) {
          current.end = Math.max(current.end, run.end);
        } else {
          merged.push(current);
          current = { ...run };
        }
      }
      if (current) merged.push(current);
      for (const run of merged) {
        if (run.end - run.start < 0.05) continue;
        this.addBoundarySegment(run);
      }
    }

    // A few tall, very visible outer parapets on the main perimeter make the
    // playable space feel like a fortified compound.
    const wallStyle = this.wallMaterial('sandstone');
    const parapetGeos: [number, number, number, number][] = [
      [0, MAP_BOUNDS.maxZ + 1.0, 116, 2],
      [0, MAP_BOUNDS.minZ - 1.0, 116, 2],
    ];
    for (const [x, z, w, d] of parapetGeos) {
      const geo = this.track(new THREE.BoxGeometry(w, 5.5, d));
      const m = new THREE.Mesh(geo, wallStyle);
      m.position.set(x, 2.7, z);
      m.castShadow = true;
      m.receiveShadow = true;
      this.group.add(m);
    }
  }

  private wallMaterial(style: WallStyle): THREE.MeshStandardMaterial {
    const cached = this.wallMaterialCache.get(style);
    if (cached) return cached;
    const baseMap =
      style === 'tunnel'
        ? this.baseTexture('tunnel')
        : style === 'concrete'
          ? this.baseTexture('concrete')
          : style === 'plaster'
            ? this.baseTexture('plaster')
            : this.baseTexture('stone');
    const material = this.trackMaterial(
      new THREE.MeshStandardMaterial({
        map: this.cloneTexture(baseMap, 1, 1),
        color:
          style === 'tunnel'
            ? '#9a8d7b'
            : style === 'concrete'
              ? '#bdae97'
              : style === 'plaster'
                ? '#d6c6a8'
                : '#dbc7a1',
        roughness: 0.97,
        metalness: 0.02,
      }),
    );
    this.wallMaterialCache.set(style, material);
    return material;
  }

  private wallMaterialForLength(style: WallStyle, length: number, height: number): THREE.MeshStandardMaterial {
    void length;
    void height;
    return this.wallMaterial(style);
  }

  /** Scale per-face UVs so a single shared material tiles consistently. */
  private tileBoxUVs(geometry: THREE.BoxGeometry, w: number, h: number, d: number, tile = 4.2): void {
    const uv = geometry.getAttribute('uv') as THREE.BufferAttribute;
    const faceDims: [number, number][] = [
      [d, h],
      [d, h],
      [w, d],
      [w, d],
      [w, h],
      [w, h],
    ];
    for (let face = 0; face < 6; face++) {
      const [uDim, vDim] = faceDims[face];
      const uRepeat = Math.max(0.35, uDim / tile);
      const vRepeat = Math.max(0.35, vDim / tile);
      for (let vertex = 0; vertex < 4; vertex++) {
        const index = face * 4 + vertex;
        uv.setXY(index, uv.getX(index) * uRepeat, uv.getY(index) * vRepeat);
      }
    }
    uv.needsUpdate = true;
  }

  private queueWallGeometry(style: WallStyle, geometry: THREE.BufferGeometry): void {
    const list = this.wallBatches.get(style);
    if (list) list.push(geometry);
    else this.wallBatches.set(style, [geometry]);
  }

  private mergeStaticBatch(
    geometries: THREE.BufferGeometry[],
    material: THREE.Material,
    castShadow = true,
    receiveShadow = true,
  ): THREE.Mesh | null {
    if (geometries.length === 0) return null;
    const merged = mergeGeometries(geometries, false);
    for (const geometry of geometries) geometry.dispose();
    if (!merged) return null;
    this.track(merged);
    const mesh = new THREE.Mesh(merged, material);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    this.group.add(mesh);
    return mesh;
  }

  private finalizeWallBatches(): void {
    for (const [style, geometries] of this.wallBatches) {
      this.mergeStaticBatch(geometries, this.wallMaterial(style));
    }
    this.wallBatches.clear();
    const trimMaterial = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#b19b76', roughness: 0.95 }),
    );
    this.mergeStaticBatch(this.capBatch, trimMaterial);
    this.capBatch.length = 0;
    const plinthMaterial = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#938367', roughness: 0.98 }),
    );
    this.mergeStaticBatch(this.plinthBatch, plinthMaterial);
    this.plinthBatch.length = 0;
    const curbMaterial = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#b8a685', roughness: 0.95 }),
    );
    this.mergeStaticBatch(this.curbBatch, curbMaterial, false, true);
    this.curbBatch.length = 0;
  }

  private addBoundarySegment(run: BoundaryRun): void {
    const thickness = 0.8;
    let x: number;
    let z: number;
    let w: number;
    let d: number;
    if (run.side === 'north' || run.side === 'south') {
      const dir = run.side === 'north' ? -1 : 1;
      w = run.end - run.start;
      d = thickness;
      x = (run.start + run.end) / 2;
      z = run.line + dir * (thickness / 2);
    } else {
      const dir = run.side === 'west' ? -1 : 1;
      w = thickness;
      d = run.end - run.start;
      x = run.line + dir * (thickness / 2);
      z = (run.start + run.end) / 2;
    }
    const height = 4.4 + ((run.start * 13 + run.line * 7) % 5) * 0.04;
    const geo = new THREE.BoxGeometry(w, height, d);
    this.tileBoxUVs(geo, w, height, d);
    geo.translate(x, height / 2, z);
    this.queueWallGeometry(run.style, geo);

    // Wall caps and base courses are merged into two shared trim meshes.
    const cap = new THREE.BoxGeometry(w + 0.16, 0.22, d + 0.16);
    cap.translate(x, height + 0.08, z);
    this.capBatch.push(cap);
    const plinth = new THREE.BoxGeometry(w + 0.12, 0.38, d + 0.12);
    plinth.translate(x, 0.19, z);
    this.plinthBatch.push(plinth);

    this.physics.addBoxCollider(
      x - w / 2,
      x + w / 2,
      0,
      height,
      z - d / 2,
      z + d / 2,
      'wall',
      `wall_${run.side}_${run.line}_${run.start}`,
    );
  }

  private addBackstops(): void {
    const h = 10;
    this.physics.addBoxCollider(
      MAP_BOUNDS.minX - 3,
      MAP_BOUNDS.minX - 1,
      0,
      h,
      MAP_BOUNDS.minZ - 4,
      MAP_BOUNDS.maxZ + 4,
      'structure',
      'backstop_west',
    );
    this.physics.addBoxCollider(
      MAP_BOUNDS.maxX + 1,
      MAP_BOUNDS.maxX + 3,
      0,
      h,
      MAP_BOUNDS.minZ - 4,
      MAP_BOUNDS.maxZ + 4,
      'structure',
      'backstop_east',
    );
    this.physics.addBoxCollider(
      MAP_BOUNDS.minX - 4,
      MAP_BOUNDS.maxX + 4,
      0,
      h,
      MAP_BOUNDS.minZ - 3,
      MAP_BOUNDS.minZ - 1,
      'structure',
      'backstop_north',
    );
    this.physics.addBoxCollider(
      MAP_BOUNDS.minX - 4,
      MAP_BOUNDS.maxX + 4,
      0,
      h,
      MAP_BOUNDS.maxZ + 1,
      MAP_BOUNDS.maxZ + 3,
      'structure',
      'backstop_south',
    );
  }

  private addStructures(): void {
    for (const spec of STRUCTURES) {
      this.addLinearWall(spec);
    }
  }

  private addLinearWall(spec: WallSpec): void {
    const thickness = spec.thickness ?? 0.8;
    const height = spec.height ?? 4;
    const horizontal = Math.abs(spec.x2 - spec.x1) >= Math.abs(spec.z2 - spec.z1);
    let x: number;
    let z: number;
    let w: number;
    let d: number;
    if (horizontal) {
      x = (spec.x1 + spec.x2) / 2;
      z = (spec.z1 + spec.z2) / 2;
      w = Math.max(thickness, Math.abs(spec.x2 - spec.x1));
      d = thickness;
    } else {
      x = (spec.x1 + spec.x2) / 2;
      z = (spec.z1 + spec.z2) / 2;
      w = thickness;
      d = Math.max(thickness, Math.abs(spec.z2 - spec.z1));
    }
    const style: WallStyle = spec.style === 'tunnel' ? 'tunnel' : 'plaster';
    const geo = new THREE.BoxGeometry(w, height, d);
    this.tileBoxUVs(geo, w, height, d);
    geo.translate(x, height / 2, z);
    this.queueWallGeometry(style, geo);
    const cap = new THREE.BoxGeometry(w + 0.12, 0.16, d + 0.12);
    cap.translate(x, height + 0.05, z);
    this.capBatch.push(cap);
    this.physics.addBoxCollider(
      x - w / 2,
      x + w / 2,
      0,
      height,
      z - d / 2,
      z + d / 2,
      'structure',
      `structure_${spec.x1}_${spec.z1}_${spec.x2}_${spec.z2}`,
    );
  }

  private addCover(): void {
    for (const box of COVER_BOXES) this.addCoverBox(box);
  }

  private coverMaterial(key: string): THREE.MeshStandardMaterial {
    const cached = this.coverMaterialCache.get(key);
    if (cached) return cached;
    let material: THREE.MeshStandardMaterial;
    switch (key) {
      case 'crate':
        material = this.trackMaterial(
          new THREE.MeshStandardMaterial({
            map: this.cloneTexture(this.baseTexture('wood'), 1, 1),
            color: '#c9a170',
            roughness: 0.8,
            metalness: 0.02,
          }),
        );
        break;
      case 'metal':
        material = this.trackMaterial(
          new THREE.MeshStandardMaterial({
            map: this.cloneTexture(this.baseTexture('metal'), 1, 1),
            color: '#758079',
            roughness: 0.5,
            metalness: 0.55,
          }),
        );
        break;
      case 'sandbag':
        material = this.trackMaterial(
          new THREE.MeshStandardMaterial({ color: '#9b855d', roughness: 1 }),
        );
        break;
      case 'barrel':
        material = this.trackMaterial(
          new THREE.MeshStandardMaterial({
            map: this.cloneTexture(this.baseTexture('metal'), 1, 1),
            color: '#7b5b39',
            roughness: 0.72,
            metalness: 0.45,
          }),
        );
        break;
      case 'barrel_ring':
        material = this.trackMaterial(
          new THREE.MeshStandardMaterial({ color: '#3b342a', roughness: 0.7 }),
        );
        break;
      default:
        material = this.trackMaterial(
          new THREE.MeshStandardMaterial({
            map: this.cloneTexture(this.baseTexture('concrete'), 1, 1),
            color: '#a9a391',
            roughness: 0.9,
          }),
        );
        break;
    }
    this.coverMaterialCache.set(key, material);
    return material;
  }

  private queueCoverGeometry(key: string, geometry: THREE.BufferGeometry): void {
    const list = this.coverBatches.get(key);
    if (list) list.push(geometry);
    else this.coverBatches.set(key, [geometry]);
  }

  private finalizeCoverBatches(): void {
    for (const [key, geometries] of this.coverBatches) {
      this.mergeStaticBatch(geometries, this.coverMaterial(key));
    }
    this.coverBatches.clear();
  }

  private addCoverBox(box: BoxSpec): void {
    const rot = box.rot ?? 0;
    const c = Math.abs(Math.cos(rot));
    const s = Math.abs(Math.sin(rot));
    const extentX = (box.w * c + box.d * s) / 2;
    const extentZ = (box.w * s + box.d * c) / 2;
    const baseY = box.y ?? 0;

    if (box.kind === 'barrel') {
      const r = box.w / 2;
      const geometry = new THREE.CylinderGeometry(r, r * 0.92, box.h, 12);
      geometry.translate(box.x, baseY + box.h / 2, box.z);
      this.queueCoverGeometry('barrel', geometry);
      for (const ratio of [0.2, 0.78]) {
        const ring = new THREE.TorusGeometry(r * 1.02, 0.035, 5, 14);
        ring.rotateX(Math.PI / 2);
        ring.translate(box.x, baseY + box.h * ratio, box.z);
        this.queueCoverGeometry('barrel_ring', ring);
      }
    } else {
      const levels = Math.max(1, box.stack ?? 1);
      let y = 0;
      for (let i = 0; i < levels; i++) {
        const h = box.h / levels;
        const inset = i > 0 ? 0.06 : 0;
        const w = box.w - inset;
        const d = box.d - inset;
        const geometry = new THREE.BoxGeometry(w, h, d);
        this.tileBoxUVs(geometry, w, h, d, 3.2);
        geometry.rotateY(rot);
        geometry.translate(box.x, baseY + y + h / 2, box.z);
        this.queueCoverGeometry(box.kind, geometry);
        y += h;
      }
    }

    this.physics.addBoxCollider(
      box.x - extentX,
      box.x + extentX,
      baseY,
      baseY + box.h,
      box.z - extentZ,
      box.z + extentZ,
      box.kind === 'crate' || box.kind === 'sandbag' ? 'crate' : 'structure',
      `cover_${box.x}_${box.z}_${box.kind}`,
    );
  }

  private addDoorsAndArches(): void {
    // MID DOORS: the passable doorway from T Mid into CT Mid.
    this.addDoorFrame({
      x: 6,
      z: 2,
      width: 12,
      orientation: 'x',
      height: 3.15,
      label: 'MID DOORS',
      labelColor: '#d8c293',
      leafColor: '#68878f',
      metal: true,
      openDirection: 1,
      hingeInset: 0.8,
    });

    // LONG DOORS: a passable blue double door on the A Long lane.
    this.addDoorFrame({
      x: 3,
      z: 52,
      width: 12,
      orientation: 'z',
      height: 3.1,
      label: 'LONG DOORS',
      labelColor: '#d8c293',
      leafColor: '#5f7f8c',
      metal: true,
      openDirection: -1,
      hingeInset: 0.7,
      leafWidth: 3.8,
    });

    // B tunnel exit arch.
    this.addArchway(-20, -41, 10, 'z', 3.4, 'B TUNNEL');
    // CT spawn to B.
    this.addArchway(-32, -30, 12, 'x', 3.35, 'B DOORS');
    // CT spawn to A ramp.
    this.addArchway(-34, 24, 12, 'x', 3.1, 'A RAMP');
    // Catwalk / A short exit into mid.
    this.addArchway(-18, 29, 10, 'z', 3.05, 'CATWALK');
    // T spawn exits.
    this.addArchway(28, 50, 8, 'z', 3.1, 'LONG A');
    this.addArchway(28, 31, 10, 'z', 3.0, 'T MID');
    this.addArchway(46, 30, 12, 'x', 3.2, 'B TUNNELS');
    // A site long entrance.
    this.addArchway(-18, 50, 8, 'z', 3.2, 'A SITE');

    // Overhead cloth banners at both spawns.
    this.addBanner(32.0, 45.0, 3.6, 'CT', -Math.PI / 2, 2.8);
    this.addBanner(50.0, 33.0, 3.6, 'T', Math.PI / 2, 2.8);
  }

  private addDoorFrame(opts: {
    x: number;
    z: number;
    width: number;
    orientation: 'x' | 'z';
    height: number;
    label: string;
    labelColor: string;
    leafColor: string;
    metal: boolean;
    openDirection: 1 | -1;
    hingeInset: number;
    leafWidth?: number;
  }): void {
    const isX = opts.orientation === 'x';
    const half = opts.width / 2;
    const frameMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#8a7a64', roughness: 0.82 }),
    );
    const metalMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({
        map: this.cloneTexture(this.baseTexture('metal'), 2, 2),
        color: opts.leafColor,
        emissive: '#18282e',
        emissiveIntensity: 0.55,
        roughness: 0.68,
        metalness: 0.28,
      }),
    );
    const postW = 0.65;
    const postD = 0.9;
    for (const sign of [-1, 1]) {
      const px = isX ? opts.x + sign * (half - 0.28) : opts.x;
      const pz = isX ? opts.z : opts.z + sign * (half - 0.28);
      const post = new THREE.Mesh(
        this.track(new THREE.BoxGeometry(postW, opts.height + 0.5, postD)),
        frameMat,
      );
      post.position.set(px, (opts.height + 0.5) / 2, pz);
      post.castShadow = true;
      post.receiveShadow = true;
      this.group.add(post);
      this.physics.addBoxCollider(
        px - postW / 2,
        px + postW / 2,
        0,
        opts.height + 0.5,
        pz - postD / 2,
        pz + postD / 2,
        'structure',
        `doorpost_${opts.x}_${opts.z}_${sign}`,
      );

      const hingeX = isX ? opts.x + sign * (half - opts.hingeInset) : opts.x;
      const hingeZ = isX ? opts.z : opts.z + sign * (half - opts.hingeInset);
      const leafWidth = opts.leafWidth ?? Math.min(4.2, half - opts.hingeInset - 0.6);
      // For a doorway spanning X, the leaf must turn ~90° into the lane.
      // For a doorway spanning Z (Long Doors), the leaves already extend
      // along the wall when the mesh's local +X faces east.
      const swing = isX
        ? sign * (Math.PI / 2 - 0.13) * opts.openDirection
        : sign * 0.12 * opts.openDirection;
      const leaf = new THREE.Group();
      leaf.position.set(hingeX, 0, hingeZ);
      leaf.rotation.y = swing;
      const panel = new THREE.Mesh(
        this.track(new THREE.BoxGeometry(leafWidth, opts.height - 0.55, 0.14)),
        metalMat,
      );
      panel.position.set(leafWidth / 2, (opts.height - 0.55) / 2, 0);
      panel.castShadow = true;
      panel.receiveShadow = true;
      leaf.add(panel);
      // Door studs and handles.
      const handleMat = this.trackMaterial(
        new THREE.MeshStandardMaterial({ color: '#b8a778', metalness: 0.8, roughness: 0.35 }),
      );
      for (let i = 0; i < 3; i++) {
        const rivet = new THREE.Mesh(
          this.track(new THREE.SphereGeometry(0.065, 6, 5)),
          handleMat,
        );
        rivet.position.set(leafWidth * (0.2 + i * 0.3), opts.height * 0.58, 0.1);
        leaf.add(rivet);
      }
      const handle = new THREE.Mesh(
        this.track(new THREE.BoxGeometry(0.08, 0.32, 0.08)),
        handleMat,
      );
      handle.position.set(leafWidth - 0.25, opts.height * 0.45, 0.12);
      leaf.add(handle);
      this.group.add(leaf);

      // Axis-aligned collision approximation for the open, swung door body.
      const ex = Math.abs(Math.cos(swing) * leafWidth) / 2;
      const ez = Math.abs(Math.sin(swing) * leafWidth) / 2;
      const dirX = Math.cos(swing);
      const dirZ = -Math.sin(swing);
      const cx = hingeX + dirX * leafWidth * 0.5;
      const cz = hingeZ + dirZ * leafWidth * 0.5;
      this.physics.addBoxCollider(
        cx - ex - 0.1,
        cx + ex + 0.1,
        0,
        opts.height - 0.55,
        cz - ez - 0.1,
        cz + ez + 0.1,
        'door',
        `doorleaf_${opts.x}_${opts.z}_${sign}`,
      );
    }

    const lintel = new THREE.Mesh(
      this.track(new THREE.BoxGeometry(isX ? opts.width : 0.55, 0.55, isX ? 0.8 : opts.width)),
      frameMat,
    );
    lintel.position.set(
      isX ? opts.x : opts.x,
      opts.height + 0.25,
      isX ? opts.z : opts.z,
    );
    lintel.castShadow = true;
    this.group.add(lintel);

    // A little sign over the doorway.
    const signTex = makeLabelTexture(opts.label, {
      width: 640,
      height: 130,
      color: opts.labelColor,
      background: 'rgba(30,30,25,.92)',
      border: 'rgba(196,168,116,.65)',
      font: 'bold 54px "Arial Narrow", Arial, sans-serif',
    });
    this.textureSet.add(signTex);
    const signMat = this.trackMaterial(
      new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide }),
    );
    const sign = new THREE.Mesh(this.track(new THREE.PlaneGeometry(4.3, 0.9)), signMat);
    if (isX) {
      sign.position.set(opts.x, opts.height + 0.88, opts.z + 0.05);
    } else {
      sign.position.set(opts.x + 0.05, opts.height + 0.88, opts.z);
      sign.rotation.y = Math.PI / 2;
    }
    this.group.add(sign);
  }

  private addArchway(
    x: number,
    z: number,
    width: number,
    orientation: 'x' | 'z',
    height: number,
    label: string,
  ): void {
    const isX = orientation === 'x';
    const mat = this.wallMaterial('plaster');
    const half = width / 2;
    for (const sign of [-1, 1]) {
      const px = isX ? x + sign * half : x;
      const pz = isX ? z : z + sign * half;
      const pillar = new THREE.Mesh(
        this.track(new THREE.BoxGeometry(0.6, height, 0.85)),
        mat,
      );
      pillar.position.set(px, height / 2, pz);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      this.group.add(pillar);
      this.physics.addBoxCollider(
        px - 0.3,
        px + 0.3,
        0,
        height,
        pz - 0.425,
        pz + 0.425,
        'structure',
        `arch_${x}_${z}_${sign}`,
      );
    }
    const lintel = new THREE.Mesh(
      this.track(new THREE.BoxGeometry(isX ? width : 0.8, 0.5, isX ? 0.85 : width)),
      mat,
    );
    lintel.position.set(x, height, z);
    lintel.castShadow = true;
    this.group.add(lintel);

    const tex = makeLabelTexture(label, {
      width: 600,
      height: 120,
      color: '#e2d3b2',
      background: 'rgba(27,26,21,.82)',
      border: 'rgba(191,160,107,.45)',
      font: 'bold 46px "Arial Narrow", Arial, sans-serif',
    });
    this.textureSet.add(tex);
    const sign = new THREE.Mesh(
      this.track(new THREE.PlaneGeometry(Math.min(4.8, width * 0.65), 0.85)),
      this.trackMaterial(
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide }),
      ),
    );
    if (isX) {
      sign.position.set(x, height + 0.7, z + 0.1);
    } else {
      sign.position.set(x + 0.1, height + 0.7, z);
      sign.rotation.y = Math.PI / 2;
    }
    this.group.add(sign);
  }

  private addBanner(x: number, z: number, size: number, team: 'T' | 'CT', rotY: number, y: number): void {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    if (team === 'T') {
      grad.addColorStop(0, '#b55a32');
      grad.addColorStop(1, '#6b2718');
    } else {
      grad.addColorStop(0, '#4f7d9b');
      grad.addColorStop(1, '#213f56');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 512);
    ctx.strokeStyle = 'rgba(245,224,178,.65)';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, 240, 496);
    ctx.fillStyle = 'rgba(247,231,195,.9)';
    ctx.font = '900 150px "Arial Narrow", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(team === 'T' ? 'T' : 'CT', 128, 250);
    ctx.font = 'bold 24px monospace';
    ctx.fillText(team === 'T' ? 'STRIKE UNIT' : 'COUNTER-TERRORIST', 128, 320);
    ctx.beginPath();
    ctx.arc(128, 390, 45, 0, Math.PI * 2);
    ctx.stroke();
    const tex = new THREE.CanvasTexture(c);
    this.textureSet.add(tex);
    const mat = this.trackMaterial(
      new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        roughness: 0.9,
        transparent: true,
      }),
    );
    const banner = new THREE.Mesh(this.track(new THREE.PlaneGeometry(size, size * 2)), mat);
    banner.position.set(x, y + size, z);
    banner.rotation.y = rotY;
    banner.castShadow = true;
    this.bannerObjects.push({ mesh: banner, phase: x * 0.1 + z * 0.03 });
    const poleMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#4e4030', roughness: 0.8, metalness: 0.3 }),
    );
    const pole = new THREE.Mesh(
      this.track(new THREE.CylinderGeometry(0.06, 0.06, y + size * 2, 6)),
      poleMat,
    );
    pole.position.set(x, (y + size * 2) / 2, z);
    this.group.add(banner, pole);
  }

  private addBombSiteMarkings(): void {
    for (const site of PLANT_SITES) {
      const w = site.x2 - site.x1;
      const d = site.z2 - site.z1;
      const lineMat = new THREE.LineBasicMaterial({
        color: site.id === 'A' ? '#d9ad59' : '#d9ad59',
        transparent: true,
        opacity: 0.42,
      });
      this.trackMaterial(lineMat);
      const points = [
        new THREE.Vector3(site.x1, 0.04, site.z1),
        new THREE.Vector3(site.x2, 0.04, site.z1),
        new THREE.Vector3(site.x2, 0.04, site.z2),
        new THREE.Vector3(site.x1, 0.04, site.z2),
        new THREE.Vector3(site.x1, 0.04, site.z1),
      ];
      const geo = this.track(new THREE.BufferGeometry().setFromPoints(points));
      const line = new THREE.Line(geo, lineMat);
      this.group.add(line);

      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(217,173,89,.11)';
        ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = 'rgba(222,181,102,.5)';
        ctx.lineWidth = 5;
        ctx.strokeRect(8, 8, 240, 240);
        ctx.fillStyle = 'rgba(227,198,137,.48)';
        ctx.font = '900 172px "Arial Narrow", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(site.id, 128, 138);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = 'rgba(237,220,181,.55)';
        ctx.fillText('BOMBSITE', 128, 225);
      }
      const tex = new THREE.CanvasTexture(c);
      this.textureSet.add(tex);
      const mat = this.trackMaterial(
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        }),
      );
      const marker = new THREE.Mesh(this.track(new THREE.PlaneGeometry(Math.min(w, d) * 0.55, Math.min(w, d) * 0.55)), mat);
      marker.rotation.x = -Math.PI / 2;
      marker.position.set(site.centerX, 0.055, site.centerZ);
      this.group.add(marker);
    }
  }

  private addSignage(): void {
    const labels: { text: string; x: number; z: number; w: number; rotationY: number; color?: string }[] = [
      { text: 'A SITE', x: -36, z: 32.8, w: 7, rotationY: 0, color: 'rgba(231,204,146,.4)' },
      { text: 'B SITE', x: -36.5, z: -37.8, w: 7, rotationY: 0, color: 'rgba(231,204,146,.4)' },
      { text: 'LONG A', x: 10, z: 51.9, w: 5, rotationY: Math.PI / 2, color: 'rgba(231,204,146,.3)' },
      { text: 'T SPAWN', x: 41, z: 49.5, w: 4.8, rotationY: 0, color: 'rgba(237,211,157,.3)' },
    ];
    for (const label of labels) {
      const tex = makeLabelTexture(label.text, {
        width: 640,
        height: 128,
        color: label.color ?? 'rgba(237,211,157,.35)',
        transparent: true,
        font: 'bold 54px "Arial Narrow", Arial, sans-serif',
      });
      this.textureSet.add(tex);
      const mat = this.trackMaterial(
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          opacity: 0.75,
          polygonOffset: true,
          polygonOffsetFactor: -1,
        }),
      );
      const plane = new THREE.Mesh(this.track(new THREE.PlaneGeometry(label.w, label.w * 0.2)), mat);
      plane.rotation.x = -Math.PI / 2;
      plane.rotation.z = label.rotationY;
      plane.position.set(label.x, 0.035, label.z);
      this.group.add(plane);
    }

    // Vertical wall posters / stencils.
    const posterTex = makeLabelTexture('DUST // SECTOR 2', {
      width: 512,
      height: 128,
      color: '#d5c19a',
      background: 'rgba(45,40,31,.75)',
      border: 'rgba(165,136,88,.4)',
      font: 'bold 34px monospace',
    });
    this.textureSet.add(posterTex);
    const posterMat = this.trackMaterial(
      new THREE.MeshBasicMaterial({ map: posterTex, transparent: true, side: THREE.DoubleSide }),
    );
    const posters: [number, number, number, number][] = [
      [27.6, 2.1, 38, -Math.PI / 2],
      [-19.6, 2.2, -20, Math.PI / 2],
      [-53.55, 2.1, 35, Math.PI / 2],
    ];
    for (const [x, y, z, ry] of posters) {
      const p = new THREE.Mesh(this.track(new THREE.PlaneGeometry(3.6, 0.9)), posterMat);
      p.position.set(x, y, z);
      p.rotation.y = ry;
      this.group.add(p);
    }
  }

  private addDistantCity(): void {
    const mat = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#8b7860', roughness: 1 }),
    );
    const accentMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#6b5b48', roughness: 1 }),
    );
    const buildings: [number, number, number, number, number][] = [
      [-82, -30, 16, 18, 30],
      [-78, 22, 20, 12, 22],
      [-95, -70, 24, 26, 38],
      [82, -42, 18, 20, 28],
      [92, 22, 24, 16, 34],
      [75, 78, 28, 20, 18],
      [-55, 84, 30, 18, 15],
      [8, 94, 48, 14, 10],
    ];
    for (const [x, z, w, d, h] of buildings) {
      const b = new THREE.Mesh(this.track(new THREE.BoxGeometry(w, h, d)), mat);
      b.position.set(x, h / 2 - 0.1, z);
      b.castShadow = true;
      b.receiveShadow = true;
      this.group.add(b);
      const crown = new THREE.Mesh(
        this.track(new THREE.BoxGeometry(w * 0.35, h * 0.18, d * 1.02)),
        accentMat,
      );
      crown.position.set(x, h * 1.0, z);
      this.group.add(crown);
    }
    // A distant minaret silhouette.
    const tower = new THREE.Mesh(
      this.track(new THREE.CylinderGeometry(2.2, 3.1, 24, 10)),
      this.trackMaterial(new THREE.MeshStandardMaterial({ color: '#9b886c', roughness: 1 })),
    );
    tower.position.set(-112, 12, -48);
    this.group.add(tower);
    const dome = new THREE.Mesh(
      this.track(new THREE.SphereGeometry(4.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2)),
      this.trackMaterial(new THREE.MeshStandardMaterial({ color: '#998668', roughness: 1 })),
    );
    dome.position.set(-112, 24.2, -48);
    this.group.add(dome);
  }

  private addLights(): void {
    const hemi = new THREE.HemisphereLight('#c2d7df', '#8b704c', 1.65);
    this.scene.add(hemi);
    this.lights.push(hemi);

    const sun = new THREE.DirectionalLight('#ffe6b3', 2.35);
    sun.position.set(38, 72, 28);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -82;
    sun.shadow.camera.right = 82;
    sun.shadow.camera.top = 82;
    sun.shadow.camera.bottom = -82;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 180;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.025;
    this.scene.add(sun);
    this.scene.add(sun.target);
    this.lights.push(sun);

    const bounce = new THREE.DirectionalLight('#b5c3c0', 0.25);
    bounce.position.set(-50, 20, -30);
    this.scene.add(bounce);
    this.lights.push(bounce);

    this.addLantern(44, 20, 'tunnel');
    this.addLantern(-10, -20, 'tunnel');
    this.addLantern(-38, -42, 'site');
    this.addLantern(-35, 35, 'site');
  }

  private addLantern(x: number, z: number, kind: 'tunnel' | 'street' | 'site'): void {
    const warm = kind === 'site' ? '#ffb35e' : '#ffd08a';
    const light = new THREE.PointLight(warm, kind === 'tunnel' ? 11 : 8, kind === 'tunnel' ? 20 : 17, 1.8);
    light.position.set(x, kind === 'tunnel' ? 3.0 : 3.4, z);
    this.scene.add(light);
    this.lights.push(light);
    const poleMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({ color: '#3c3932', roughness: 0.7, metalness: 0.5 }),
    );
    const metalMat = this.trackMaterial(
      new THREE.MeshStandardMaterial({
        color: '#2b2a25',
        metalness: 0.7,
        roughness: 0.5,
      }),
    );
    if (kind !== 'tunnel') {
      const pole = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.07, 0.1, 3.2, 7)), poleMat);
      pole.position.set(x, 1.6, z);
      this.group.add(pole);
    }
    const lamp = new THREE.Mesh(
      this.track(new THREE.BoxGeometry(0.42, 0.35, 0.42)),
      metalMat,
    );
    lamp.position.set(x, kind === 'tunnel' ? 3.0 : 3.25, z);
    this.group.add(lamp);
    const glow = new THREE.Mesh(
      this.track(new THREE.BoxGeometry(0.27, 0.11, 0.27)),
      this.trackMaterial(
        new THREE.MeshBasicMaterial({ color: warm, transparent: true, opacity: 0.9 }),
      ),
    );
    glow.position.set(x, kind === 'tunnel' ? 2.8 : 3.06, z);
    this.group.add(glow);
    this.animated.push({ object: glow, baseRotation: 0, phase: x + z, speed: 3.2 });
  }

  private addDust(): {
    points: THREE.Points;
    positions: Float32Array;
    base: Float32Array;
    velocities: Float32Array;
  } {
    const count = 420;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = MAP_BOUNDS.minX + Math.random() * (MAP_BOUNDS.maxX - MAP_BOUNDS.minX);
      const y = 0.35 + Math.random() * 7;
      const z = MAP_BOUNDS.minZ + Math.random() * (MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ);
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
      velocities[i3] = 0.15 + Math.random() * 0.28;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.06;
    }
    const geo = this.track(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const tex = makeLabelTexture('•', {
      width: 64,
      height: 64,
      color: '#fff6dc',
      transparent: true,
      font: 'bold 64px Arial',
    });
    this.textureSet.add(tex);
    const mat = this.trackMaterial(
      new THREE.PointsMaterial({
        color: '#e8d4aa',
        size: 0.09,
        map: tex,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    const points = new THREE.Points(geo, mat);
    this.group.add(points);
    return { points, positions, base, velocities };
  }

  dispose(): void {
    this.scene.remove(this.group);
    for (const light of this.lights) {
      if (light.parent) light.parent.remove(light);
      light.dispose();
    }
    for (const geo of this.geometrySet) geo.dispose();
    for (const mat of this.materialSet) mat.dispose();
    for (const tex of this.textureSet) tex.dispose();
  }
}
