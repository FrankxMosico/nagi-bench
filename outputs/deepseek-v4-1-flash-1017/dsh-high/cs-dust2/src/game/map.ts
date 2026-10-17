import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { BombsiteInfo, Rect, Vec2 } from './types';
import { pointInRect } from './math';

export interface MapSolid {
  rect: Rect;
  minY: number;
  maxY: number;
  kind: 'wall' | 'crate' | 'prop' | 'railing';
}

export interface DoorRig {
  left: THREE.Group;
  right: THREE.Group;
  open: number;
  target: number;
  position: Vec2;
}

export interface MapRectVis {
  rect: Rect;
  kind: MapSolid['kind'];
}

export interface GameMap {
  group: THREE.Group;
  solids: MapSolid[];
  mapRects: MapRectVis[];
  sites: Record<'A' | 'B', BombsiteInfo>;
  tSpawns: Vec2[];
  ctSpawns: Vec2[];
  doors: DoorRig | null;
  updateDoors: (points: Vec2[], dt: number) => void;
  getSiteAt: (x: number, z: number) => BombsiteInfo | null;
}

export const MAP_BOUNDS = { minX: -60, maxX: 60, minZ: -52, maxZ: 52 };

const COLORS = {
  sand: '#c4a56b',
  wall: '#b89b69',
  wallDark: '#8d754c',
  trim: '#6c5737',
  wood: '#7d522b',
  metal: '#52554d',
  concrete: '#9b927e',
};

function makeSandTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  g.fillStyle = COLORS.sand;
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 18000; i++) {
    const a = Math.random() * 0.18;
    g.fillStyle = Math.random() > 0.5 ? `rgba(92,70,35,${a})` : `rgba(255,238,188,${a})`;
    const s = Math.random() * 2.4 + 0.4;
    g.fillRect(Math.random() * 512, Math.random() * 512, s, s);
  }
  for (let i = 0; i < 28; i++) {
    g.strokeStyle = `rgba(112,89,52,${0.05 + Math.random() * 0.08})`;
    g.lineWidth = 1 + Math.random() * 2;
    g.beginPath();
    let x = Math.random() * 512;
    let y = Math.random() * 512;
    g.moveTo(x, y);
    for (let k = 0; k < 5; k++) {
      x += (Math.random() - 0.5) * 90;
      y += (Math.random() - 0.5) * 30;
      g.lineTo(x, y);
    }
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(18, 18);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeWallTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  g.fillStyle = COLORS.wall;
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 14000; i++) {
    const v = Math.random();
    g.fillStyle = v > 0.5 ? `rgba(255,245,210,${Math.random() * 0.13})` : `rgba(73,57,31,${Math.random() * 0.14})`;
    const s = Math.random() * 3 + 0.4;
    g.fillRect(Math.random() * 512, Math.random() * 512, s, s);
  }
  // plaster patches
  for (let i = 0; i < 10; i++) {
    g.fillStyle = `rgba(222,200,150,${0.05 + Math.random() * 0.12})`;
    g.beginPath();
    g.ellipse(Math.random() * 512, Math.random() * 512, 18 + Math.random() * 60, 10 + Math.random() * 40, Math.random() * 3, 0, Math.PI * 2);
    g.fill();
  }
  // block seams
  g.strokeStyle = 'rgba(80,62,34,0.14)';
  g.lineWidth = 2;
  for (let y = 0; y < 512; y += 128) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(512, y);
    g.stroke();
    const off = (y / 128) % 2 ? 64 : 0;
    for (let x = off; x < 512; x += 128) {
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x, y + 128);
      g.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeCrateTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = '#8b5a2c';
  g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 32) {
    g.fillStyle = y % 64 === 0 ? 'rgba(255,190,100,.06)' : 'rgba(45,22,8,.07)';
    g.fillRect(0, y, 256, 32);
    g.strokeStyle = 'rgba(46,25,10,.45)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(256, y);
    g.stroke();
    for (let i = 0; i < 7; i++) {
      g.strokeStyle = `rgba(43,23,8,${0.08 + Math.random() * 0.12})`;
      g.beginPath();
      g.moveTo(Math.random() * 256, y + 4 + Math.random() * 22);
      g.lineTo(Math.random() * 256, y + 4 + Math.random() * 22);
      g.stroke();
    }
  }
  g.strokeStyle = 'rgba(48,26,10,.6)';
  g.lineWidth = 12;
  g.strokeRect(5, 5, 246, 246);
  g.strokeStyle = 'rgba(30,16,5,.55)';
  g.lineWidth = 8;
  g.beginPath();
  g.moveTo(10, 10);
  g.lineTo(246, 246);
  g.moveTo(246, 10);
  g.lineTo(10, 246);
  g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeMetalTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  g.fillStyle = COLORS.metal;
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 6000; i++) {
    g.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${Math.random() * 0.09})` : `rgba(0,0,0,${Math.random() * 0.18})`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  for (let i = 0; i < 8; i++) {
    g.fillStyle = 'rgba(30,30,26,.35)';
    g.beginPath();
    g.arc(18 + (i % 4) * 70, 20 + Math.floor(i / 4) * 210, 4, 0, Math.PI * 2);
    g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeTextTexture(text: string, color: string, size = 256, sub = ''): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, size, size);
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = color;
  g.font = `900 ${size * 0.62}px Impact, Arial Black, sans-serif`;
  g.globalAlpha = 0.9;
  g.fillText(text, size / 2, size * 0.48);
  if (sub) {
    g.font = `700 ${size * 0.08}px Arial, sans-serif`;
    g.globalAlpha = 0.75;
    g.fillText(sub, size / 2, size * 0.85);
  }
  g.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeSignTexture(title: string, sub: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = 'rgba(22, 23, 18, 0.9)';
  g.fillRect(0, 0, 512, 128);
  g.strokeStyle = 'rgba(202, 169, 102, 0.7)';
  g.lineWidth = 3;
  g.strokeRect(4, 4, 504, 120);
  g.fillStyle = '#d9c294';
  g.font = '900 50px Impact, Arial Black, sans-serif';
  g.textAlign = 'left';
  g.textBaseline = 'middle';
  g.fillText(title, 26, 58);
  g.fillStyle = 'rgba(207, 187, 145, 0.7)';
  g.font = '700 17px Arial, sans-serif';
  g.fillText(sub, 28, 98);
  g.fillStyle = 'rgba(202, 169, 102, 0.85)';
  g.fillRect(430, 54, 52, 4);
  g.fillRect(430, 64, 32, 3);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function addFloorOverlay(
  group: THREE.Group,
  x: number,
  z: number,
  w: number,
  d: number,
  color: number,
  opacity = 0.4,
  y = 0.015,
): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color, transparent: opacity < 1, opacity, roughness: 1, metalness: 0, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addSiteDecal(group: THREE.Group, site: BombsiteInfo): void {
  const tex = makeTextTexture(site.name, '#e6d7b8', 256, 'BOMBSITE');
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.52 });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(site.center.x, 0.026, site.center.z);
  group.add(plane);
}

function addSpawnDecal(group: THREE.Group, x: number, z: number, text: string, color: string): void {
  const tex = makeTextTexture(text, color, 256);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.38 });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(x, 0.027, z);
  group.add(plane);
}

function mergeStaticGeometry(group: THREE.Group): void {
  group.updateMatrixWorld(true);
  const buckets = new Map<string, { material: THREE.Material; meshes: THREE.Mesh[] }>();
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.userData.staticOpaque || Array.isArray(mesh.material)) return;
    const key = mesh.material.uuid;
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { material: mesh.material, meshes: [] };
      buckets.set(key, bucket);
    }
    bucket.meshes.push(mesh);
  });
  for (const bucket of buckets.values()) {
    if (bucket.meshes.length < 2) continue;
    const geoms: THREE.BufferGeometry[] = [];
    let castShadow = false;
    let receiveShadow = false;
    for (const mesh of bucket.meshes) {
      const g = mesh.geometry.clone();
      g.applyMatrix4(mesh.matrixWorld);
      geoms.push(g);
      castShadow ||= mesh.castShadow;
      receiveShadow ||= mesh.receiveShadow;
    }
    const merged = mergeGeometries(geoms, false);
    geoms.forEach((g) => g.dispose());
    if (!merged) continue;
    const batch = new THREE.Mesh(merged, bucket.material);
    batch.castShadow = castShadow;
    batch.receiveShadow = receiveShadow;
    batch.frustumCulled = true;
    group.add(batch);
    for (const mesh of bucket.meshes) {
      group.remove(mesh);
      mesh.geometry.dispose();
    }
  }
}

export function createMap(scene: THREE.Scene): GameMap {
  const group = new THREE.Group();
  scene.add(group);

  const sandTex = makeSandTexture();
  const wallTex = makeWallTexture();
  const crateTex = makeCrateTexture();
  const metalTex = makeMetalTexture();

  const floorMat = new THREE.MeshStandardMaterial({ map: sandTex, color: 0xffffff, roughness: 0.98, metalness: 0.0 });
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, color: 0xffffff, roughness: 0.94, metalness: 0.0 });
  const wallDarkMat = new THREE.MeshStandardMaterial({ color: 0x8c744b, roughness: 0.98 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x6a5638, roughness: 0.9 });
  const crateMat = new THREE.MeshStandardMaterial({ map: crateTex, color: 0xffffff, roughness: 0.85 });
  const metalMat = new THREE.MeshStandardMaterial({ map: metalTex, color: 0xffffff, roughness: 0.55, metalness: 0.55 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x3c403b, roughness: 0.48, metalness: 0.6 });
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x5d6b4f, roughness: 0.6, metalness: 0.35 });
  const tarpMat = new THREE.MeshStandardMaterial({ color: 0x7c3b2d, roughness: 0.95 });

  const solids: MapSolid[] = [];
  const mapRects: MapRectVis[] = [];

  // huge ground plane
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(124, 108), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, 0);
  floor.receiveShadow = true;
  group.add(floor);

  // subtle paved areas
  addFloorOverlay(group, 0, 5, 20, 62, 0x7f745c, 0.24);
  addFloorOverlay(group, 40, 18, 14, 54, 0x877b61, 0.18);
  addFloorOverlay(group, -38, 9, 18, 44, 0x5e5646, 0.22);
  addFloorOverlay(group, 0, 40, 36, 20, 0x96835e, 0.2);
  addFloorOverlay(group, 0, -42, 38, 14, 0x827b68, 0.2);
  addFloorOverlay(group, 40, -27, 30, 37, 0x9b8a65, 0.17);
  addFloorOverlay(group, -40, -31, 30, 30, 0x7f7357, 0.16);
  addFloorOverlay(group, 16, -10, 16, 8, 0x64675f, 0.6, 0.03).geometry = new THREE.PlaneGeometry(16, 8);

  const addSolid = (rect: Rect, maxY: number, kind: MapSolid['kind']) => {
    solids.push({ rect, minY: 0, maxY, kind });
    mapRects.push({ rect, kind });
  };

  const addWall = (minX: number, maxX: number, minZ: number, maxZ: number, height = 4.2, material = wallMat) => {
    const w = maxX - minX;
    const d = maxZ - minZ;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, height, d), material);
    mesh.position.set((minX + maxX) / 2, height / 2, (minZ + maxZ) / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.staticOpaque = true;
    group.add(mesh);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(w + 0.14, 0.2, d + 0.14), trimMat);
    cap.position.set(mesh.position.x, height + 0.08, mesh.position.z);
    cap.castShadow = true;
    cap.userData.staticOpaque = true;
    group.add(cap);
    addSolid({ minX, maxX, minZ, maxZ }, height, 'wall');
    return mesh;
  };

  const addLowWall = (minX: number, maxX: number, minZ: number, maxZ: number, material = wallDarkMat) => {
    const height = 1.15;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(maxX - minX, height, maxZ - minZ), material);
    mesh.position.set((minX + maxX) / 2, height / 2, (minZ + maxZ) / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.staticOpaque = true;
    group.add(mesh);
    addSolid({ minX, maxX, minZ, maxZ }, height, 'railing');
    return mesh;
  };

  const addCrate = (x: number, z: number, w: number, d: number, h: number, rot = 0, mat = crateMat) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, h / 2, z);
    mesh.rotation.y = rot;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.staticOpaque = true;
    group.add(mesh);
    // metal corner strips for readable silhouettes
    const edges = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, 0.07, d + 0.04), darkMetalMat);
    edges.position.set(x, h - 0.035, z);
    edges.rotation.y = rot;
    edges.userData.staticOpaque = true;
    group.add(edges);
    const halfW = Math.abs(Math.cos(rot)) * w / 2 + Math.abs(Math.sin(rot)) * d / 2;
    const halfD = Math.abs(Math.sin(rot)) * w / 2 + Math.abs(Math.cos(rot)) * d / 2;
    addSolid({ minX: x - halfW, maxX: x + halfW, minZ: z - halfD, maxZ: z + halfD }, h, 'crate');
    return mesh;
  };

  const addBarrel = (x: number, z: number, r = 0.55, h = 1.25) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.95, h, 12), barrelMat);
    mesh.position.set(x, h / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.staticOpaque = true;
    group.add(mesh);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(r * 0.85, 0.045, 5, 14), darkMetalMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(x, h * 0.74, z);
    rim.userData.staticOpaque = true;
    group.add(rim);
    addSolid({ minX: x - r, maxX: x + r, minZ: z - r, maxZ: z + r }, h, 'prop');
  };

  const addPillar = (x: number, z: number, w = 0.9, d = 0.9, h = 4.0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallDarkMat);
    mesh.position.set(x, h / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.staticOpaque = true;
    group.add(mesh);
    addSolid({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 }, h, 'wall');
  };

  // ---------- outer perimeter ----------
  addWall(-60, -57, -50, 50, 5.2);
  addWall(57, 60, -50, 50, 5.2);
  addWall(-60, 60, -52, -49, 5.2);
  addWall(-60, 60, 49, 52, 5.2);

  // ---------- T spawn / south ----------
  addWall(-22, -8, 26, 28);
  addWall(8, 22, 26, 28);
  addWall(-20, -18, 28, 34);
  addWall(-20, -18, 44, 49);
  addWall(18, 20, 28, 34);
  addWall(18, 20, 44, 49);

  // ---------- mid ----------
  addWall(-10, -8, -36, 26);
  addWall(8, 10, -36, -14);
  addWall(8, 10, -6, 26);
  addWall(-10, -4, 0.6, 2.4);
  addWall(4, 10, 0.6, 2.4);

  // ---------- CT spawn / connectors ----------
  addWall(-20, -8, -38, -36);
  addWall(8, 20, -38, -36);
  addWall(18, 20, -48, -44);
  addWall(18, 20, -38, -36);
  addWall(-20, -18, -48, -44);
  addWall(-20, -18, -38, -36);
  // low cover at CT spawn
  addCrate(-12, -45, 3.2, 1.7, 1.25);
  addCrate(12, -45, 3.2, 1.7, 1.25);
  addBarrel(16, -40.5);
  addBarrel(-16, -40.5);

  // ---------- A long ----------
  addWall(18, 40, 32, 34);
  addWall(18, 40, 44, 46);
  addWall(38, 40, -8, 32);
  addWall(54, 57, -8, 44);
  // long doors gateway
  addWall(40, 45, 14, 16.4);
  addWall(49, 54, 14, 16.4);
  addPillar(45, 15.2, 1.2, 1.4, 4.0);
  addPillar(49, 15.2, 1.2, 1.4, 4.0);
  addCrate(51.3, 22, 2.0, 2.4, 1.5);
  addCrate(42.2, 6.5, 1.6, 1.6, 1.2);
  // long cover
  addCrate(45.5, -1.5, 2.4, 2.0, 1.2);

  // ---------- A site ----------
  addWall(22, 24, -38, -14);
  addWall(22, 24, -6, -3.8);
  addWall(24, 44, -8, -6);
  addWall(50, 56, -8, -6);
  addWall(56, 57, -46, -8, 5.2);
  // A site props
  addCrate(34, -27, 3.2, 2.2, 2.1);
  addCrate(38, -28.2, 2.1, 1.7, 1.35);
  addCrate(50.1, -39.5, 2.5, 2.5, 1.4);
  addCrate(27.5, -42, 2.1, 1.5, 1.5);
  addCrate(51.8, -23.5, 2.0, 2.0, 1.15);
  addBarrel(45.7, -36.5);
  addBarrel(44.6, -38.2);
  addBarrel(29.2, -17.2);
  // A site tarp shade
  const tarp = new THREE.Mesh(new THREE.PlaneGeometry(9, 8), tarpMat);
  tarp.rotation.x = -Math.PI / 2;
  tarp.position.set(42.2, 0.05, -17.6);
  group.add(tarp);

  // ---------- catwalk ----------
  addLowWall(10, 24, -16.2, -14.2);
  addLowWall(10, 24, -5.8, -3.8);
  addCrate(13.8, -9, 1.5, 1.2, 1.0);
  // walkway accents
  const catMarks = addFloorOverlay(group, 16, -10, 16, 8, 0x9a978c, 0.42, 0.032);
  catMarks.material = new THREE.MeshStandardMaterial({ color: 0x9a978c, roughness: 0.65, metalness: 0.25, transparent: true, opacity: 0.45 });

  // ---------- CT -> A connector ----------
  addWall(20, 22, -48, -46.2);
  addCrate(28, -42.5, 2.2, 1.4, 1.2);
  addPillar(24, -38.7, 1.1, 1.1, 3.8);
  addPillar(24, -45.7, 1.1, 1.1, 3.8);

  // ---------- CT -> B connector ----------
  addWall(-22, -20, -48, -46.2);
  addCrate(-28, -42.5, 2.2, 1.4, 1.2);
  addPillar(-24, -38.7, 1.1, 1.1, 3.8);
  addPillar(-24, -45.7, 1.1, 1.1, 3.8);

  // ---------- B site ----------
  addWall(-24, -22, -38, -18);
  addWall(-56, -44, -18, -16);
  addWall(-30, -24, -18, -16);
  addWall(-57, -56, -46, -16, 5.2);
  addCrate(-39.5, -29.5, 3.2, 2.2, 2.0);
  addCrate(-43.3, -30.3, 2.0, 1.7, 1.2);
  addCrate(-48.7, -24, 2.6, 2.0, 1.5);
  addCrate(-31.3, -22.5, 2.3, 2.1, 1.35);
  addCrate(-47.7, -40.2, 2.0, 1.8, 1.2);
  addBarrel(-29.6, -35.4);
  addBarrel(-50.3, -32.7);
  addBarrel(-44.2, -20.4);
  const tarpB = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshStandardMaterial({ color: 0x4d5940, roughness: 1 }));
  tarpB.rotation.x = -Math.PI / 2;
  tarpB.position.set(-49.2, 0.05, -43.6);
  group.add(tarpB);

  // ---------- B tunnel ----------
  addWall(-48, -46, -18, 32);
  addWall(-28, -26, -18, 32);
  addWall(-46, -28, 32, 34);
  addWall(-48, -18, 44, 46);
  addWall(-50, -48, 32, 46);
  // tunnel door frame / arch
  addWall(-46, -44, 0, 2, 1.6, wallDarkMat);
  addWall(-30, -28, 0, 2, 1.6, wallDarkMat);
  addPillar(-44, 1, 0.9, 0.9, 3.8);
  addPillar(-30, 1, 0.9, 0.9, 3.8);
  addCrate(-44.5, 16, 2.2, 2.3, 1.35);
  addCrate(-30.7, 26.5, 1.7, 1.7, 1.1);
  addBarrel(-34.6, 10.2);
  addBarrel(-41.2, 27.8);

  // B tunnel ceiling strips (visual only)
  for (let z = -8; z < 34; z += 8) {
    const ceil = new THREE.Mesh(new THREE.BoxGeometry(18, 0.4, 3.4), wallDarkMat);
    ceil.position.set(-37, 3.7, z);
    ceil.castShadow = false;
    ceil.userData.staticOpaque = true;
    group.add(ceil);
  }

  // ---------- T spawn props ----------
  addCrate(-13.2, 33.4, 2.1, 1.7, 1.2);
  addCrate(13.2, 33.4, 2.1, 1.7, 1.2);
  addBarrel(-15.3, 46.2);
  addBarrel(15.3, 46.2);
  // central T landmark
  addCrate(0, 45.7, 3.2, 1.2, 0.65);

  // ---------- site & spawn decals ----------
  const siteA: BombsiteInfo = { name: 'A', center: { x: 40, z: -27 }, rect: { minX: 24, maxX: 56, minZ: -46, maxZ: -6 } };
  const siteB: BombsiteInfo = { name: 'B', center: { x: -40, z: -31 }, rect: { minX: -56, maxX: -24, minZ: -46, maxZ: -16 } };
  addSiteDecal(group, siteA);
  addSiteDecal(group, siteB);
  addSpawnDecal(group, 0, 38, 'T', '#a8452f');
  addSpawnDecal(group, 0, -42, 'CT', '#3f6d9b');

  const addSign = (title: string, sub: string, x: number, y: number, z: number, rotY: number, w = 4.4, h = 1.1) => {
    const material = new THREE.MeshBasicMaterial({ map: makeSignTexture(title, sub), transparent: true, side: THREE.FrontSide, opacity: 0.92 });
    // Two back-to-back planes keep lettering readable from either side instead
    // of mirroring a double-sided texture.
    for (const offset of [0, Math.PI]) {
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
      sign.position.set(x, y, z);
      sign.rotation.y = rotY + offset;
      group.add(sign);
    }
  };
  addSign('MID', 'CONTROL / DOORS', 0, 4.15, 2.55, 0, 5.4, 1.25);
  addSign('A LONG', 'EAST APPROACH', 40.02, 2.55, 21.5, Math.PI / 2);
  addSign('B TUNNELS', 'WEST APPROACH', -45.92, 2.5, 24, Math.PI / 2, 5.2, 1.2);
  addSign('CATWALK', 'ELEVATED ROUTE', 16, 1.85, -3.62, 0, 4.6, 1.05);
  addSign('T SPAWN', 'INSURGENT STAGING', -17.94, 2.35, 31.2, Math.PI / 2, 3.4, 0.85);
  addSign('CT SPAWN', 'COUNTER-TERRORIST HQ', -17.94, 2.35, -45.6, Math.PI / 2, 3.4, 0.85);
  addSign('A SITE', 'BOMBSITE ALPHA', 40.5, 3.05, -8.06, Math.PI, 5, 1.15);
  addSign('B SITE', 'BOMBSITE BRAVO', -47.5, 3.05, -18.06, Math.PI, 5, 1.15);

  // banners / signs
  const signA = new THREE.Mesh(
    new THREE.PlaneGeometry(7.5, 7.5),
    new THREE.MeshBasicMaterial({ map: makeTextTexture('A', '#ddc79f', 256, 'BOMBSITE'), transparent: true, side: THREE.DoubleSide, opacity: 0.88 }),
  );
  signA.position.set(34.2, 3.3, -25.2);
  signA.rotation.y = 0.3;
  group.add(signA);
  const signB = signA.clone();
  signB.material = new THREE.MeshBasicMaterial({ map: makeTextTexture('B', '#ddc79f', 256, 'BOMBSITE'), transparent: true, side: THREE.DoubleSide, opacity: 0.88 });
  signB.position.set(-39.4, 3.3, -27.2);
  signB.rotation.y = -0.2;
  group.add(signB);

  // mid doors
  const doorMat = new THREE.MeshStandardMaterial({ map: makeCrateTexture(), color: 0x9b8660, roughness: 0.82 });
  const left = new THREE.Group();
  const right = new THREE.Group();
  left.position.set(-4, 0, 1.5);
  right.position.set(4, 0, 1.5);
  const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(3.92, 3.1, 0.2), doorMat);
  leftPanel.position.set(1.96, 1.55, 0);
  leftPanel.castShadow = true;
  leftPanel.receiveShadow = true;
  left.add(leftPanel);
  const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(3.92, 3.1, 0.2), doorMat);
  rightPanel.position.set(-1.96, 1.55, 0);
  rightPanel.castShadow = true;
  rightPanel.receiveShadow = true;
  right.add(rightPanel);
  // door hardware / panels
  for (const [pivot, sx] of [[left, 1], [right, -1]] as const) {
    for (const yy of [0.8, 2.2]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.06), darkMetalMat);
      bar.position.set(sx * 2.0, yy, 0.12);
      pivot.add(bar);
    }
    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), darkMetalMat);
    handle.position.set(sx * 3.5, 1.5, 0.18);
    pivot.add(handle);
  }
  group.add(left, right);
  // lintel (visual only, the door opening stays walkable)
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(9, 0.6, 0.5), trimMat);
  lintel.position.set(0, 3.5, 1.5);
  lintel.castShadow = true;
  group.add(lintel);

  // overhead cables / atmosphere
  for (const [x1, z1, x2, z2, y] of [
    [-20, 10, 20, 12, 4.8],
    [24, -14, 54, -12, 4.6],
    [-48, -20, -24, -18, 4.6],
  ]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x1, y, z1),
      new THREE.Vector3((x1 + x2) / 2, y - 0.35, (z1 + z2) / 2),
      new THREE.Vector3(x2, y, z2),
    ]);
    const line = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.025, 4, false), darkMetalMat);
    line.userData.staticOpaque = true;
    group.add(line);
  }

  // soft practical lights in the tunnels
  const tunnelLight = new THREE.PointLight(0xffcb84, 12, 16, 1.8);
  tunnelLight.position.set(-37, 3.3, 8);
  group.add(tunnelLight);
  const tunnelLight2 = new THREE.PointLight(0xffcb84, 10, 14, 1.8);
  tunnelLight2.position.set(0, 3.2, -28);
  group.add(tunnelLight2);

  /** Mid double doors auto-open when any living entity approaches, leaving a walkable gap. */
  const updateDoors = (points: Vec2[], dt: number) => {
    let near = false;
    for (const p of points) {
      if (p.x > -7 && p.x < 7 && Math.abs(p.z - 1.5) < 5.2) {
        near = true;
        break;
      }
    }
    const target = near ? 1.28 : 0;
    const speed = 3.8;
    const current = (left.rotation.y + -right.rotation.y) / 2;
    const next = current + Math.max(-speed * dt, Math.min(speed * dt, target - current));
    left.rotation.y = -next;
    right.rotation.y = next;
  };

  // Batch every static opaque surface by material. This keeps the Dust2 blockout
  // at a handful of draw calls instead of hundreds while preserving collisions.
  mergeStaticGeometry(group);

  const getSiteAt = (x: number, z: number): BombsiteInfo | null => {
    if (pointInRect(x, z, siteA.rect, -1.2)) return siteA;
    if (pointInRect(x, z, siteB.rect, -1.2)) return siteB;
    return null;
  };

  return {
    group,
    solids,
    mapRects,
    sites: { A: siteA, B: siteB },
    tSpawns: [
      { x: 0, z: 39 }, { x: -4.5, z: 42 }, { x: 4.5, z: 42 }, { x: -9, z: 39 }, { x: 9, z: 39 },
    ],
    ctSpawns: [
      { x: 0, z: -42 }, { x: -4.5, z: -44 }, { x: 4.5, z: -44 }, { x: -9, z: -41 }, { x: 9, z: -41 },
    ],
    doors: { left, right, open: 0, target: 0, position: { x: 0, z: 1.5 } },
    updateDoors,
    getSiteAt,
  };
}
