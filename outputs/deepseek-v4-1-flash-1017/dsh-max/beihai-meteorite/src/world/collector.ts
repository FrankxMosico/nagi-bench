import * as THREE from "three";
import { voxelMaterial } from "@agentbench/voxel-kit";
import {
  addBatchedBoxes,
  addBox,
  addLabelPlane,
  addPlane,
  canvasTexture,
  concreteTexture,
  createStarfield,
  makeGlowSprite,
  makeMistSprite,
  mulberry32,
  TAU,
  woodTexture,
} from "../lib/helpers";
import { createCollector, createMeteoriteMesh, createZhang, type CollectorActor, type ZhangActor } from "../lib/characters";

export interface CollectorWorld {
  group: THREE.Group;
  zhang: ZhangActor;
  collector: CollectorActor;
  chosenMeteorites: THREE.Object3D[];
  safeGroup: THREE.Group;
  setSafeOpen: (amount: number) => void;
  setParcel: (visible: boolean) => void;
  setChosenVisible: (visible: boolean) => void;
  setParcelVisible: (visible: boolean) => void;
  setPhone: (visible: boolean) => void;
  update: (time: number, localTime: number) => void;
  deskTarget: THREE.Vector3;
  safeTarget: THREE.Vector3;
}

function plankMaterial(base = "#3b281b"): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    map: woodTexture(base, [3, 4]),
    color: 0xa57750,
    roughness: 0.8,
    metalness: 0.02,
  });
}

function createCarpet(): THREE.Mesh {
  const tex = canvasTexture(
    256,
    256,
    (ctx) => {
      ctx.fillStyle = "#3b1f1a";
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = "#7d4a35";
      ctx.lineWidth = 2;
      for (let i = 16; i < 256; i += 48) {
        ctx.strokeRect(i, i, 256 - i * 2, 256 - i * 2);
      }
      ctx.strokeStyle = "#9c6242";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const cx = 32 + i * 49;
        const cy = 128;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 26);
        ctx.lineTo(cx + 22, cy);
        ctx.lineTo(cx, cy + 26);
        ctx.lineTo(cx - 22, cy);
        ctx.closePath();
        ctx.stroke();
      }
      const rng = mulberry32(611);
      for (let i = 0; i < 700; i++) {
        ctx.fillStyle = `rgba(20,10,8,${rng() * 0.06})`;
        ctx.fillRect(rng() * 256, rng() * 256, 2, 2);
      }
    },
    { repeat: [1, 1] },
  );
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.012, 4.6),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 1 }),
  );
  mesh.position.set(0.1, 0.015, 0.25);
  mesh.receiveShadow = true;
  return mesh;
}

function makeMeteorCollection(): { group: THREE.Group; meshes: THREE.Mesh[] } {
  const group = new THREE.Group();
  const textures = [
    { r: 3, color: 0x6e6558, bright: false },
    { r: 4, color: 0x504a42, bright: false },
    { r: 3, color: 0x7e7565, bright: true },
    { r: 2, color: 0x5d5041, bright: true },
    { r: 4, color: 0x3f3b35, bright: false },
  ];
  const meshes: THREE.Mesh[] = [];
  for (let i = 0; i < textures.length; i++) {
    const mesh = createMeteoriteMesh(textures[i]!.r, 30 + i, textures[i]!.bright);
    meshes.push(mesh);
  }
  group.userData.variants = meshes;
  return { group, meshes };
}

function addCabinet(
  parent: THREE.Object3D,
  position: [number, number, number],
  rotationY: number,
  width: number,
  stoneInstances: THREE.Matrix4[],
): void {
  const cab = new THREE.Group();
  cab.position.set(...position);
  cab.rotation.y = rotationY;
  parent.add(cab);
  const height = 3.1;
  const depth = 0.52;
  const wood = plankMaterial("#2f2017");
  const woodDark = new THREE.MeshStandardMaterial({ color: 0x21150f, roughness: 0.8 });
  // Shell.
  addBox(cab, [width, 0.1, depth], [0, height, 0], wood, { castShadow: true });
  addBox(cab, [width, 0.1, depth], [0, 0.1, 0], wood, { castShadow: false });
  addBox(cab, [0.09, height, depth], [-width / 2, height / 2, 0], wood);
  addBox(cab, [0.09, height, depth], [width / 2, height / 2, 0], wood);
  addBox(cab, [width, height, 0.035], [0, height / 2, -depth / 2], woodDark);
  // Shelves.
  const shelfYs = [0.74, 1.53, 2.32, height - 0.04];
  for (const y of shelfYs) {
    addBox(cab, [width - 0.12, 0.065, depth - 0.08], [0, y, 0.015], wood, { castShadow: true });
    // Concealed warm strip along the underside.
    addBox(
      cab,
      [width - 0.35, 0.018, 0.035],
      [0, y - 0.06, 0.22],
      new THREE.MeshBasicMaterial({ color: 0xffc277, toneMapped: false }),
      { castShadow: false, receiveShadow: false },
    );
  }
  // Glass door + frame mullions.
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fc4c5,
    metalness: 0,
    roughness: 0.12,
    transparent: true,
    opacity: 0.07,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  addPlane(cab, [width - 0.16, height - 0.18], [0, height / 2, depth / 2 + 0.02], glassMat);
  addBox(cab, [0.055, height, 0.055], [0, height / 2, depth / 2 + 0.028], woodDark, { castShadow: false });
  addBox(cab, [width - 0.12, 0.055, 0.055], [0, 1.44, depth / 2 + 0.028], woodDark, { castShadow: false });
  addBox(cab, [width - 0.12, 0.055, 0.055], [0, 2.37, depth / 2 + 0.028], woodDark, { castShadow: false });
  // Small brass handle.
  addBox(
    cab,
    [0.04, 0.22, 0.04],
    [width * 0.2, 1.35, depth / 2 + 0.075],
    new THREE.MeshStandardMaterial({ color: 0xb69255, metalness: 0.7, roughness: 0.3 }),
    { castShadow: false },
  );

  // Stone stands, using precomputed world-compatible local matrices.
  const rng = mulberry32(410 + Math.floor(position[0] * 10 + position[2] * 17));
  for (let shelf = 0; shelf < 3; shelf++) {
    const n = 2 + (shelf % 2);
    for (let i = 0; i < n; i++) {
      const x = -width * 0.31 + (i / Math.max(1, n - 1)) * width * 0.62 + (rng() - 0.5) * 0.12;
      const z = 0.01 + rng() * 0.04;
      const baseY = shelfYs[shelf]! + 0.08;
      const matrix = new THREE.Matrix4();
      const rot = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(rng() * 0.5, rng() * TAU, rng() * 0.4),
      );
      const scale = 1.15 + rng() * 0.9;
      matrix.compose(new THREE.Vector3(x, baseY + 0.16, z), rot, new THREE.Vector3(scale, scale, scale));
      const cabinetMatrix = new THREE.Matrix4().compose(
        new THREE.Vector3(...position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationY, 0)),
        new THREE.Vector3(1, 1, 1),
      );
      stoneInstances.push(cabinetMatrix.multiply(matrix));
      // Stone stand and label.
      addBox(cab, [0.18, 0.035, 0.18], [x, baseY, z], woodDark, { castShadow: false });
      addBox(cab, [0.24, 0.04, 0.1], [x, baseY - 0.03, z + 0.12], new THREE.MeshStandardMaterial({ color: 0xcfc4ad, roughness: 0.9 }), {
        castShadow: false,
      });
    }
  }
}

function createSafe(): { group: THREE.Group; door: THREE.Group; light: THREE.PointLight; mars: THREE.Mesh } {
  const group = new THREE.Group();
  group.position.set(1.75, 0.0, 4.62);
  group.rotation.y = 0;
  const metal = new THREE.MeshStandardMaterial({ color: 0x343630, metalness: 0.58, roughness: 0.6 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x161915, metalness: 0.45, roughness: 0.72 });
  addBox(group, [1.04, 1.2, 0.72], [0, 0.94, 0], metal);
  addBox(group, [0.92, 1.04, 0.63], [0, 0.94, 0.02], dark);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x1a1713,
    roughness: 0.75,
    emissive: 0x2b1b0f,
    emissiveIntensity: 0.7,
  });
  addBox(group, [0.84, 0.95, 0.58], [0, 0.95, 0], innerMat);
  addBox(group, [0.84, 0.04, 0.55], [0, 0.58, 0.04], new THREE.MeshStandardMaterial({ color: 0xb2a48b, roughness: 0.9 }));
  const plinth = addBox(
    group,
    [0.22, 0.12, 0.22],
    [0, 0.65, 0.08],
    new THREE.MeshStandardMaterial({ color: 0x171917, roughness: 0.65 }),
    { castShadow: false },
  );
  const mars = createMeteoriteMesh(2, 48, true);
  mars.scale.setScalar(0.72);
  mars.position.set(0, 0.78, 0.12);
  group.add(mars);
  // Vitrine glass and a tiny downlight.
  addPlane(
    group,
    [0.56, 0.32],
    [0, 0.83, 0.34],
    new THREE.MeshPhysicalMaterial({
      color: 0xc9d4cd,
      roughness: 0.08,
      metalness: 0,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    }),
  );
  addBox(
    group,
    [0.32, 0.018, 0.07],
    [0, 1.03, 0.24],
    new THREE.MeshBasicMaterial({ color: 0xffd69a, toneMapped: false }),
    { castShadow: false },
  );
  const light = new THREE.PointLight(0xffc178, 5.4, 2.0, 2);
  light.position.set(0, 1.12, 0.17);
  group.add(light);

  const doorPivot = new THREE.Group();
  doorPivot.position.set(-0.53, 0, 0.38);
  group.add(doorPivot);
  const door = new THREE.Group();
  door.position.set(0.52, 0.98, 0);
  doorPivot.add(door);
  addBox(door, [1.02, 1.14, 0.08], [0, 0, 0], metal);
  const dial = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.018, 4, 12),
    new THREE.MeshStandardMaterial({ color: 0xb79859, metalness: 0.8, roughness: 0.3 }),
  );
  dial.position.set(0.12, 0.14, 0.06);
  dial.rotation.y = 0;
  door.add(dial);
  addBox(
    door,
    [0.035, 0.28, 0.04],
    [-0.18, 0.05, 0.06],
    new THREE.MeshStandardMaterial({ color: 0xb79859, metalness: 0.8, roughness: 0.3 }),
    { castShadow: false },
  );
  group.add(doorPivot);
  addBox(group, [1.12, 0.12, 0.8], [0, 0.3, 0], metal);
  group.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return { group, door: doorPivot, light, mars };
}

function createMicroscope(): THREE.Group {
  const g = new THREE.Group();
  const brass = new THREE.MeshStandardMaterial({ color: 0x9c7a43, metalness: 0.72, roughness: 0.36 });
  const black = new THREE.MeshStandardMaterial({ color: 0x1b1b19, roughness: 0.55, metalness: 0.2 });
  addBox(g, [0.42, 0.055, 0.3], [0, 0.03, 0], black);
  addBox(g, [0.05, 0.36, 0.05], [-0.06, 0.2, -0.02], brass);
  addBox(g, [0.25, 0.05, 0.05], [-0.04, 0.38, -0.02], brass);
  addBox(g, [0.08, 0.18, 0.08], [0.06, 0.31, -0.02], brass);
  addBox(g, [0.16, 0.09, 0.16], [0.06, 0.46, -0.02], black);
  addBox(g, [0.1, 0.05, 0.1], [0.06, 0.52, -0.02], brass);
  addBox(g, [0.24, 0.02, 0.2], [0.06, 0.09, 0.06], brass, { castShadow: false });
  addBox(g, [0.04, 0.06, 0.07], [0.06, 0.2, 0.17], brass, { castShadow: false });
  return g;
}

function createTable(): {
  group: THREE.Group;
  lampLight: THREE.PointLight;
  cup: THREE.Group;
  chosenTray: THREE.Group;
  parcel: THREE.Group;
} {
  const group = new THREE.Group();
  group.position.set(0.15, 0, 1.2);
  const wood = plankMaterial("#38261a");
  const dark = new THREE.MeshStandardMaterial({ color: 0x241811, roughness: 0.86 });
  addBox(group, [3.2, 0.09, 1.25], [0, 0.79, 0], wood);
  addBox(group, [3.0, 0.03, 1.05], [0, 0.85, 0], new THREE.MeshStandardMaterial({ color: 0x39463d, roughness: 0.95 }));
  for (const x of [-1.43, 1.43]) {
    for (const z of [-0.48, 0.48]) {
      addBox(group, [0.09, 0.78, 0.09], [x, 0.39, z], dark);
    }
  }
  for (let i = 0; i < 3; i++) {
    addBox(group, [0.92, 0.15, 0.06], [-0.95 + i * 0.95, 0.64, -0.56], dark, { castShadow: false });
  }
  // Drawer hardware and worn edge highlights.
  const brass = new THREE.MeshStandardMaterial({ color: 0xb1905b, metalness: 0.7, roughness: 0.34 });
  for (let i = 0; i < 3; i++) {
    addBox(group, [0.13, 0.025, 0.025], [-0.95 + i * 0.95, 0.64, -0.62], brass, { castShadow: false });
  }

  // Banker's lamp.
  const lamp = new THREE.Group();
  lamp.position.set(-1.35, 0.88, -0.18);
  group.add(lamp);
  addBox(lamp, [0.36, 0.05, 0.26], [0, 0, 0], brass);
  addBox(lamp, [0.035, 0.45, 0.035], [0, 0.22, 0], brass);
  addBox(lamp, [0.56, 0.09, 0.3], [0, 0.5, 0], new THREE.MeshStandardMaterial({ color: 0x355d4d, roughness: 0.32, metalness: 0.2, emissive: 0x0e2219, emissiveIntensity: 0.6 }));
  const shadeGlow = new THREE.MeshBasicMaterial({ color: 0xd6a45e, toneMapped: false });
  addBox(lamp, [0.48, 0.014, 0.24], [0, 0.447, 0], shadeGlow, { castShadow: false });
  const glow = makeGlowSprite(0xffd396, 1.1, 0.2);
  glow.position.set(0, 0.4, 0.05);
  lamp.add(glow);
  const lampLight = new THREE.PointLight(0xffc477, 4.2, 3.6, 2);
  lampLight.position.set(0, 0.42, 0.1);
  lamp.add(lampLight);
  const stoneLight = new THREE.PointLight(0xffd7a4, 2.2, 1.55, 2);
  stoneLight.position.set(0.15, 1.18, 1.33);
  group.add(stoneLight);

  // Tea, never quite abandoned.
  const cup = new THREE.Group();
  cup.position.set(-1.25, 0.9, -0.22);
  group.add(cup);
  const porcelain = new THREE.MeshStandardMaterial({ color: 0xded6c2, roughness: 0.35 });
  addBox(cup, [0.2, 0.16, 0.2], [0, 0.08, 0], porcelain);
  addBox(cup, [0.16, 0.012, 0.16], [0, 0.15, 0], new THREE.MeshBasicMaterial({ color: 0xd0a46a, toneMapped: false }));
  addBox(cup, [0.05, 0.07, 0.035], [0.13, 0.09, 0], porcelain, { castShadow: false });
  const steam = makeMistSprite(0.75, 0.06);
  steam.position.set(0, 0.48, 0);
  cup.add(steam);

  // Black velvet acquisition tray with two rocks.
  const chosenTray = new THREE.Group();
  chosenTray.position.set(0.08, 0.88, 0.1);
  group.add(chosenTray);
  addBox(
    chosenTray,
    [1.5, 0.03, 0.73],
    [0, 0.015, 0],
    new THREE.MeshStandardMaterial({ color: 0x171815, roughness: 0.99 }),
  );
  for (let i = 0; i < 3; i++) {
    const rock = createMeteoriteMesh(4 + (i % 2), 300 + i, i !== 1);
    rock.scale.setScalar(2.25 - i * 0.16);
    rock.position.set(-0.42 + i * 0.42, 0.14 + (i === 1 ? 0.02 : 0), 0.02);
    rock.rotation.set(0.2 + i * 0.1, i * 1.4, 0.1);
    chosenTray.add(rock);
  }

  // Wrapped parcel, used when the deal closes.
  const parcel = new THREE.Group();
  parcel.position.set(0.02, 0.9, 0.18);
  group.add(parcel);
  const clothMat = new THREE.MeshStandardMaterial({ color: 0x6d5d48, roughness: 1 });
  addBox(parcel, [0.6, 0.19, 0.34], [0, 0.1, 0], clothMat);
  addBox(parcel, [0.64, 0.04, 0.15], [0, 0.2, 0], new THREE.MeshStandardMaterial({ color: 0x8a795f, roughness: 1 }));
  addBox(parcel, [0.13, 0.012, 0.37], [0, 0.21, 0], new THREE.MeshStandardMaterial({ color: 0xa69573, roughness: 1 }), { castShadow: false });
  parcel.visible = false;
  chosenTray.visible = false;

  const microscope = createMicroscope();
  microscope.position.set(-0.55, 0.86, 0.07);
  microscope.scale.setScalar(0.8);
  group.add(microscope);

  // A few loose tools and a loupe.
  addBox(group, [0.24, 0.012, 0.06], [0.43, 0.87, 0.27], brass, { rotation: [0, 0.25, 0], castShadow: false });
  addBox(group, [0.2, 0.012, 0.05], [0.72, 0.87, 0.33], new THREE.MeshStandardMaterial({ color: 0xaeb0a7, metalness: 0.5, roughness: 0.4 }), {
    rotation: [0, -0.18, 0],
    castShadow: false,
  });
  return { group, lampLight, cup, chosenTray, parcel };
}

export function createCollectorWorld(): CollectorWorld {
  const group = new THREE.Group();
  group.name = "collector-room";
  group.visible = false;

  const wood = plankMaterial("#3b281b");
  const woodDark = new THREE.MeshStandardMaterial({ map: woodTexture("#21140e", [1, 2]), color: 0x4d3425, roughness: 0.86 });
  const plaster = new THREE.MeshStandardMaterial({
    map: concreteTexture([3, 2]),
    color: 0x675b4c,
    roughness: 0.99,
  });

  // Floor and ceiling.
  addBox(group, [10.4, 0.16, 13.5], [0, -0.09, 0.2], new THREE.MeshStandardMaterial({ map: woodTexture("#2f1f16", [5, 8]), color: 0x8f603e, roughness: 0.82 }), {
    castShadow: false,
    receiveShadow: true,
  });
  addBox(group, [10.4, 0.1, 13.5], [0, 4.15, 0.2], woodDark, { castShadow: false });
  addBox(group, [10.4, 2.5, 0.24], [0, 2.25, 6.5], plaster);
  addBox(group, [10.4, 1.2, 0.24], [0, 0.6, 6.5], wood);
  addBox(group, [0.24, 4.2, 13.5], [-5.1, 2.1, 0.2], plaster);
  addBox(group, [0.24, 4.2, 13.5], [5.1, 2.1, 0.2], plaster);
  addBox(group, [10.2, 1.15, 0.15], [0, 0.58, -6.32], woodDark, { castShadow: false });
  addBox(group, [0.15, 4.2, 13.0], [-5.0, 2.1, -0.4], woodDark);
  addBox(group, [0.15, 4.2, 13.0], [5.0, 2.1, -0.4], woodDark);
  addBox(group, [4.02, 4.2, 0.2], [-3.09, 2.1, -6.3], plaster);
  addBox(group, [4.02, 4.2, 0.2], [3.09, 2.1, -6.3], plaster);
  addBox(group, [2.16, 1.72, 0.2], [0, 3.34, -6.3], plaster);
  addBox(group, [2.15, 0.08, 0.24], [0, 2.45, -6.22], woodDark, { castShadow: false });
  addBox(group, [0.1, 2.5, 0.24], [-1.1, 1.25, -6.22], woodDark, { castShadow: false });
  addBox(group, [0.1, 2.5, 0.24], [1.1, 1.25, -6.22], woodDark, { castShadow: false });
  addBox(group, [2.02, 2.36, 0.12], [0, 1.23, -6.39], new THREE.MeshStandardMaterial({ color: 0x43271c, roughness: 0.74 }));
  addBox(group, [0.03, 2.3, 0.04], [0, 1.23, -6.32], new THREE.MeshBasicMaterial({ color: 0x9cb7ba, toneMapped: false }), { castShadow: false });
  const doorGapGlow = new THREE.PointLight(0x8daec8, 1.6, 5, 2);
  doorGapGlow.position.set(0, 1.6, -5.8);
  group.add(doorGapGlow);

  // Ceiling beams.
  const beamBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  for (let z = -5.5; z < 6; z += 1.55) {
    beamBoxes.push({ position: [0, 3.98, z], size: [10.2, 0.25, 0.22], color: 0x2a1c13 });
  }
  for (const x of [-4.4, -2.1, 0, 2.1, 4.4]) {
    beamBoxes.push({ position: [x, 4.07, 0.25], size: [0.17, 0.13, 12.8], color: 0x24170f });
  }
  addBatchedBoxes(group, beamBoxes, { roughness: 0.9 }, false, false);

  group.add(createCarpet());

  // Cabinet wall. The back wall has the largest display.
  const stoneMatrices: THREE.Matrix4[] = [];
  for (let i = 0; i < 3; i++) {
    addCabinet(group, [-4.8, 0.02, -2.5 + i * 3.18], Math.PI / 2, 2.9, stoneMatrices);
    addCabinet(group, [4.8, 0.02, -2.5 + i * 3.18], -Math.PI / 2, 2.9, stoneMatrices);
  }
  for (let i = 0; i < 3; i++) {
    addCabinet(group, [-3.3 + i * 3.3, 0.02, 6.14], Math.PI, 3.02, stoneMatrices);
  }

  // Instanced stones inside the cabinets.
  const variants: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 5; i++) {
    const mesh = createMeteoriteMesh(2 + (i % 3), 700 + i, i === 2);
    variants.push(mesh.geometry);
    mesh.geometry = mesh.geometry;
  }
  const rockMaterial = voxelMaterial({ roughness: 0.7, metalness: 0.25 });
  const chunks: THREE.Matrix4[][] = [[], [], [], [], []];
  stoneMatrices.forEach((matrix, i) => {
    chunks[i % chunks.length]!.push(matrix);
  });
  for (let v = 0; v < variants.length; v++) {
    const inst = new THREE.InstancedMesh(variants[v]!, rockMaterial, chunks[v]!.length);
    chunks[v]!.forEach((matrix, i) => inst.setMatrixAt(i, matrix));
    inst.instanceMatrix.needsUpdate = true;
    inst.receiveShadow = true;
    group.add(inst);
  }

  // The worktable and its warm pool of light.
  const table = createTable();
  group.add(table.group);

  // Stool.
  addBox(group, [0.65, 0.08, 0.52], [0.05, 0.65, 2.45], wood);
  for (const x of [-0.24, 0.34]) {
    for (const z of [2.25, 2.65]) {
      addBox(group, [0.07, 0.64, 0.07], [x, 0.32, z], woodDark);
    }
  }
  addBox(group, [0.72, 0.16, 0.58], [0.05, 0.6, 2.45], new THREE.MeshStandardMaterial({ color: 0x5a3b27, roughness: 0.95 }));

  // Safe, installed in a low lit niche.
  const safe = createSafe();
  safe.group.rotation.y = Math.PI;
  group.add(safe.group);
  addBox(group, [1.35, 0.12, 0.9], [1.75, 0.34, 4.62], woodDark);

  // A single extraordinary stone: a little illuminated shrine in the collection.
  const heroCase = new THREE.Group();
  heroCase.position.set(-3.55, 0, 3.95);
  group.add(heroCase);
  const vitrineWood = new THREE.MeshStandardMaterial({ color: 0x241812, roughness: 0.8 });
  addBox(heroCase, [0.78, 0.82, 0.56], [0, 0.41, 0], vitrineWood);
  addBox(heroCase, [0.86, 0.07, 0.64], [0, 0.86, 0], new THREE.MeshStandardMaterial({ color: 0x9a7e50, metalness: 0.6, roughness: 0.35 }));
  addBox(heroCase, [0.68, 0.035, 0.5], [0, 0.9, 0], new THREE.MeshStandardMaterial({ color: 0x141511, roughness: 0.95 }));
  const marquee = createMeteoriteMesh(7, 940, true);
  marquee.scale.setScalar(1.65);
  marquee.position.set(0, 1.18, 0);
  marquee.rotation.set(0.2, 0.65, 0.1);
  heroCase.add(marquee);
  const caseGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.58, 0.46),
    new THREE.MeshPhysicalMaterial({
      color: 0xb8d0cb,
      transparent: true,
      opacity: 0.1,
      roughness: 0.05,
      metalness: 0,
      depthWrite: false,
    }),
  );
  caseGlass.position.set(0, 1.2, 0);
  heroCase.add(caseGlass);
  addBox(
    heroCase,
    [0.56, 0.02, 0.05],
    [0, 1.42, 0.2],
    new THREE.MeshBasicMaterial({ color: 0xffd19a, toneMapped: false }),
    { castShadow: false },
  );
  const specimenGlow = new THREE.PointLight(0xffc77e, 3.2, 2.2, 2);
  specimenGlow.position.set(0, 1.38, 0.18);
  heroCase.add(specimenGlow);
  const ringMetal = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.012, 4, 10),
    new THREE.MeshStandardMaterial({ color: 0xb28f55, metalness: 0.75, roughness: 0.3 }),
  );
  ringMetal.position.set(0.38, 1.23, 0.08);
  ringMetal.rotation.y = Math.PI / 2;
  heroCase.add(ringMetal);
  addLabelPlane(heroCase, [0, 1.4, 0.235], [0, 0, 0], {
    width: 0.6,
    height: 0.16,
    text: "火星无球粒陨石 / MARS",
    bg: "#191713",
    color: "#d5bd92",
    size: 28,
    fontFamily: '"Noto Sans CJK SC", sans-serif',
    emissive: true,
  });

  // A paper-and-ink inscription on the back wall.
  addLabelPlane(group, [-1.85, 2.55, 6.35], [0, Math.PI, 0], {
    width: 1.55,
    height: 0.9,
    text: "石不能言最可人",
    lines: ["石不能言", "最可人"],
    bg: "#b7a98f",
    color: "#2b2017",
    size: 56,
    fontFamily: '"Noto Serif CJK SC", serif',
    emissive: false,
  });
  // A framed star chart.
  const chart = canvasTexture(512, 384, (ctx) => {
    ctx.fillStyle = "#10171a";
    ctx.fillRect(0, 0, 512, 384);
    ctx.strokeStyle = "rgba(153,177,170,.4)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.ellipse(256, 190, 50 + i * 28, 24 + i * 16, 0.2, 0, TAU);
      ctx.stroke();
    }
    const rng = mulberry32(806);
    ctx.fillStyle = "rgba(218,194,150,.9)";
    for (let i = 0; i < 120; i++) {
      const r = rng() * 8;
      ctx.fillRect(rng() * 512, rng() * 330 + 22, r > 5 ? 2 : 1, r > 5 ? 2 : 1);
    }
    ctx.fillStyle = "rgba(219,205,178,.78)";
    ctx.font = '500 20px "Noto Serif CJK SC", serif';
    ctx.fillText("同步轨道陨石分布 / 2087", 28, 350);
    ctx.strokeStyle = "rgba(205,180,139,.5)";
    ctx.strokeRect(14, 14, 484, 356);
  });
  addPlane(
    group,
    [1.65, 1.24],
    [-4.97, 2.7, 1.2],
    new THREE.MeshStandardMaterial({ map: chart, roughness: 0.7, metalness: 0.1 }),
    [0, Math.PI / 2, 0],
  );

  // A wall clock, still ticking.
  const clock = new THREE.Group();
  clock.position.set(2.8, 2.9, 6.32);
  clock.rotation.y = Math.PI;
  group.add(clock);
  addBox(clock, [0.5, 1.2, 0.12], [0, 0, 0], woodDark);
  const clockFace = new THREE.Mesh(
    new THREE.PlaneGeometry(0.42, 0.42),
    new THREE.MeshBasicMaterial({
      map: canvasTexture(128, 128, (ctx) => {
        ctx.fillStyle = "#d6c8ab";
        ctx.fillRect(0, 0, 128, 128);
        ctx.strokeStyle = "#3c2d20";
        ctx.lineWidth = 3;
        ctx.strokeRect(7, 7, 114, 114);
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * TAU;
          ctx.fillStyle = "#3b2a1e";
          ctx.fillRect(63 + Math.sin(a) * 48, 63 - Math.cos(a) * 48, 2, 2);
        }
        ctx.beginPath();
        ctx.moveTo(64, 64);
        ctx.lineTo(64, 28);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(64, 64);
        ctx.lineTo(90, 74);
        ctx.stroke();
      }),
    }),
  );
  clockFace.position.set(0, 0.2, 0.07);
  clock.add(clockFace);
  const pendulum = new THREE.Group();
  pendulum.position.set(0, -0.18, 0.07);
  clock.add(pendulum);
  addBox(pendulum, [0.02, 0.52, 0.02], [0, -0.27, 0], new THREE.MeshStandardMaterial({ color: 0xb1935d, metalness: 0.7, roughness: 0.35 }), {
    castShadow: false,
  });
  addBox(pendulum, [0.12, 0.12, 0.025], [0, -0.53, 0], new THREE.MeshStandardMaterial({ color: 0xad8c55, metalness: 0.65, roughness: 0.4 }), {
    castShadow: false,
  });

  // Ambient dust.
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions: number[] = [];
  const rng = mulberry32(992);
  for (let i = 0; i < 180; i++) {
    dustPositions.push((rng() - 0.5) * 9.2, 0.25 + rng() * 3.3, -5.4 + rng() * 11.2);
  }
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xe4c598,
      size: 0.013,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(dust);

  // Lighting: dim, intimate, designed around pools of museum light.
  const hemi = new THREE.HemisphereLight(0x9b8f7a, 0x2a1d14, 0.58);
  group.add(hemi);
  const key = new THREE.SpotLight(0xffca8c, 68, 8.5, 0.67, 0.7, 2);
  key.position.set(0.15, 4.0, 0.9);
  key.target.position.set(0.1, 0.8, 1.3);
  key.castShadow = true;
  key.shadow.mapSize.set(1536, 1536);
  key.shadow.bias = -0.0015;
  key.shadow.camera.near = 0.4;
  key.shadow.camera.far = 9;
  group.add(key, key.target);
  const windowFill = new THREE.DirectionalLight(0x6d89a1, 0.15);
  windowFill.position.set(-4, 3, -5);
  group.add(windowFill);
  const cabinetLightPositions = [
    [-3.8, 2.25, -2.5],
    [-3.8, 2.25, 3.7],
    [3.8, 2.25, -2.5],
    [3.8, 2.25, 3.7],
    [-3.0, 2.25, 5.2],
    [3.0, 2.25, 5.2],
  ];
  for (const [x, y, z] of cabinetLightPositions) {
    const l = new THREE.PointLight(0xffb96f, 6.0, 4.6, 2);
    l.position.set(x!, y!, z!);
    group.add(l);
  }
  const safeSpill = new THREE.PointLight(0xffc176, 3.6, 3.0, 2);
  safeSpill.position.set(1.75, 1.4, 4.8);
  group.add(safeSpill);
  const roomFill = new THREE.PointLight(0xffd2a2, 9.5, 6.5, 2);
  roomFill.position.set(2.5, 2.0, -1.25);
  group.add(roomFill);
  const profileFill = new THREE.DirectionalLight(0xd8c09a, 0.7);
  profileFill.position.set(7, 4, 2);
  profileFill.target.position.set(0, 1.2, 1.2);
  group.add(profileFill, profileFill.target);

  // Characters.
  const zhang = createZhang();
  zhang.setUniform();
  zhang.figure.root.position.set(-0.7, 0, -2.8);
  group.add(zhang.figure.root);

  const collector = createCollector();
  collector.figure.root.position.set(0.05, 0, 2.7);
  collector.figure.root.rotation.y = Math.PI;
  group.add(collector.figure.root);

  // Phone used for the one immediate payment.
  const phone = new THREE.Group();
  addBox(phone, [0.36, 0.024, 0.7], [0, 0, 0], new THREE.MeshStandardMaterial({ color: 0x1b1d1e, roughness: 0.3, metalness: 0.45 }), {
    castShadow: false,
  });
  const phoneScreen = addBox(
    phone,
    [0.3, 0.006, 0.56],
    [0, 0.017, 0],
    new THREE.MeshBasicMaterial({ color: 0x82e2d4, toneMapped: false }),
    { castShadow: false },
  );
  phone.position.set(0, 0.91, -0.15);
  table.group.add(phone);
  phone.visible = false;

  let safeAmount = 0;
  const setSafeOpen = (amount: number): void => {
    safeAmount = Math.max(0, Math.min(1, amount));
    const e = safeAmount * safeAmount * (3 - 2 * safeAmount);
    safe.door.rotation.y = -e * 1.72;
  };
  setSafeOpen(0);

  const setParcel = (visible: boolean): void => {
    table.parcel.visible = visible;
    table.chosenTray.visible = !visible;
  };
  const setChosenVisible = (visible: boolean): void => {
    table.chosenTray.visible = visible;
  };
  const setParcelVisible = (visible: boolean): void => {
    table.parcel.visible = visible;
  };
  const setPhone = (visible: boolean): void => {
    phone.visible = visible;
  };

  const update = (time: number, localTime: number): void => {
    // Warm light is alive, but never flashy.
    const flicker = 1 + Math.sin(time * 2.3) * 0.006 + Math.sin(time * 7.1 + 0.4) * 0.0025;
    key.intensity = 82 * flicker;
    table.lampLight.intensity = 4.2 * (0.98 + Math.sin(time * 1.7) * 0.03);
    pendulum.rotation.x = Math.sin(time * 2.3) * 0.22;
    dust.position.y = Math.sin(time * 0.08) * 0.06;
    dust.position.z = Math.cos(time * 0.05) * 0.05;
    const steam = table.cup.children[table.cup.children.length - 1] as THREE.Sprite;
    if (steam) {
      steam.position.y = 0.45 + Math.sin(time * 0.7) * 0.06;
      steam.material.opacity = 0.035 + Math.sin(time * 0.5) * 0.015;
    }
    safe.light.intensity = 5.4 * (0.9 + Math.sin(time * 0.9) * 0.1) * (0.3 + safeAmount * 0.7);
  };

  update(0, 0);

  return {
    group,
    zhang,
    collector,
    chosenMeteorites: [],
    safeGroup: safe.group,
    setSafeOpen,
    setParcel,
    setChosenVisible,
    setParcelVisible,
    setPhone,
    update,
    deskTarget: new THREE.Vector3(0.05, 1.2, 2.25),
    safeTarget: new THREE.Vector3(1.75, 1.1, 4.0),
  };
}
