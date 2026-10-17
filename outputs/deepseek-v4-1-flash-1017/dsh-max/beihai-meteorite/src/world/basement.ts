import * as THREE from "three";
import {
  addBatchedBoxes,
  addBox,
  addLabelPlane,
  canvasTexture,
  clamp01,
  concreteTexture,
  makeGlowSprite,
  makeMistSprite,
  mulberry32,
  smooth,
  TAU,
  woodTexture,
} from "../lib/helpers";
import { createMeteoriteMesh, createPistolRig, createZhang, type PistolRig, type ZhangActor } from "../lib/characters";

export const BASEMENT_SHOT_TIME = 206.7;

interface BulletGeometry {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}

function makeBulletGeometry(): BulletGeometry {
  const geo = new THREE.BoxGeometry(0.014, 0.043, 0.014);
  const tip = new THREE.BoxGeometry(0.012, 0.015, 0.012);
  const merged = new THREE.BufferGeometry();
  // Build a tiny faceted round with stacked boxes; all block language.
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const add = (w: number, h: number, d: number, y: number, hex: number): void => {
    const g = new THREE.BoxGeometry(w, h, d);
    g.translate(0, y, 0);
    const pos = g.attributes.position;
    const normal = g.attributes.normal;
    const c = new THREE.Color(hex);
    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      normals.push(normal.getX(i), normal.getY(i), normal.getZ(i));
      colors.push(c.r, c.g, c.b);
    }
    g.dispose();
  };
  add(0.018, 0.03, 0.018, -0.005, 0x6e5b3e);
  add(0.02, 0.004, 0.02, 0.013, 0x3f3327);
  add(0.015, 0.014, 0.015, 0.022, 0x3e3a34);
  add(0.011, 0.006, 0.011, 0.032, 0x6f6a5d);
  merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  merged.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  merged.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  merged.computeBoundingSphere();
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.4,
    metalness: 0.55,
  });
  return { geometry: merged, material };
}

function makePliers(): THREE.Group {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0x707a76, metalness: 0.7, roughness: 0.35 });
  const grip = new THREE.MeshStandardMaterial({ color: 0x432d20, roughness: 0.85 });
  addBox(g, [0.035, 0.026, 0.17], [0.035, 0, 0], steel);
  addBox(g, [0.035, 0.026, 0.17], [-0.035, 0, 0], steel);
  addBox(g, [0.035, 0.026, 0.1], [0.085, 0, 0], grip, { rotation: [0, -0.18, 0] });
  addBox(g, [0.035, 0.026, 0.1], [-0.085, 0, 0], grip, { rotation: [0, 0.18, 0] });
  return g;
}

function makeRifleScope(): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x2b3131, metalness: 0.55, roughness: 0.35 });
  addBox(g, [0.08, 0.07, 0.31], [0, 0, 0], mat);
  addBox(g, [0.09, 0.085, 0.04], [0, 0, 0.15], mat);
  addBox(g, [0.055, 0.055, 0.03], [0, 0, -0.16], mat);
  addBox(g, [0.08, 0.03, 0.08], [0, -0.055, 0], mat, { castShadow: false });
  addBox(g, [0.064, 0.03, 0.01], [0, 0, 0.08], new THREE.MeshBasicMaterial({ color: 0x6cbba7, toneMapped: false }), { castShadow: false });
  return g;
}

export interface BasementWorld {
  group: THREE.Group;
  zhang: ZhangActor;
  gun: PistolRig;
  update: (time: number, localTime: number) => void;
  setLights: (level: number) => void;
  setDoorOpen: (amount: number) => void;
  setBullets: (visible: boolean) => void;
  setInspection: (visible: boolean) => void;
  setParcelState: (state: "loaded" | "holes" | "open") => void;
  setBulletCount: (count: number) => void;
  setStairsActive: (active: boolean) => void;
  fireTime: number;
}

export function createBasementWorld(): BasementWorld {
  const group = new THREE.Group();
  group.name = "basement";
  group.visible = false;

  const concrete = new THREE.MeshStandardMaterial({
    map: concreteTexture([3, 2]),
    color: 0x5b5b53,
    roughness: 0.98,
    metalness: 0,
  });
  const floorMat = new THREE.MeshStandardMaterial({
    map: concreteTexture([4, 4]),
    color: 0x4a4b45,
    roughness: 1,
  });
  const steel = new THREE.MeshStandardMaterial({ color: 0x3e4948, metalness: 0.55, roughness: 0.48 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x1b211f, metalness: 0.4, roughness: 0.65 });
  const wood = new THREE.MeshStandardMaterial({ map: woodTexture("#332318", [1, 2]), color: 0x7a5539, roughness: 0.9 });

  // Room shell.
  addBox(group, [6.6, 0.2, 8.8], [0, -0.1, 0], floorMat, { castShadow: false, receiveShadow: true });
  addBox(group, [6.6, 0.22, 8.8], [0, 2.62, 0], new THREE.MeshStandardMaterial({ color: 0x252724, roughness: 1 }), {
    castShadow: false,
  });
  addBox(group, [6.6, 2.7, 0.22], [0, 1.35, 4.25], concrete);
  addBox(group, [0.22, 2.7, 8.8], [-3.24, 1.35, 0], concrete);
  addBox(group, [0.22, 2.7, 8.8], [3.24, 1.35, 0], concrete);
  addBox(group, [2.0, 2.7, 0.25], [-2.3, 1.35, -4.25], concrete);
  addBox(group, [2.0, 2.7, 0.25], [2.3, 1.35, -4.25], concrete);
  addBox(group, [2.6, 0.5, 0.25], [0, 2.45, -4.25], concrete);
  // Floor drain and stains.
  addBox(group, [0.34, 0.01, 0.34], [0.9, 0.01, -1.5], darkSteel, { castShadow: false });
  const stainMat = new THREE.MeshBasicMaterial({ color: 0x201b16, transparent: true, opacity: 0.26, depthWrite: false });
  const stain = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8), stainMat);
  stain.rotation.x = -Math.PI / 2;
  stain.position.set(-1.4, 0.007, 1.6);
  group.add(stain);

  // Stair shaft beyond the heavy door.
  addBox(group, [2.55, 0.25, 5.2], [0, 3.16, -6.75], new THREE.MeshStandardMaterial({ color: 0x1c1e1c, roughness: 1 }), {
    castShadow: false,
  });
  addBox(group, [0.24, 3.3, 5.2], [-1.3, 1.55, -6.75], concrete);
  addBox(group, [0.24, 3.3, 5.2], [1.3, 1.55, -6.75], concrete);
  const stepBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  for (let i = 0; i < 15; i++) {
    const z = -8.55 + i * 0.27;
    const top = 2.68 - i * 0.18;
    stepBoxes.push({
      position: [0, (top - 0.18) / 2, z],
      size: [2.16, Math.max(0.02, top - 0.17), 0.28],
      color: i % 2 ? 0x4b4b43 : 0x44443d,
    });
  }
  addBatchedBoxes(group, stepBoxes, { roughness: 0.98 }, false, true);
  // Handrail.
  addBox(group, [0.045, 0.08, 4.1], [1.02, 2.3, -6.6], steel, { rotation: [-0.56, 0, 0], castShadow: false });
  const stairBulb = new THREE.PointLight(0xd0c8a8, 10.5, 7, 2);
  stairBulb.position.set(0.1, 3.0, -7.2);
  group.add(stairBulb);
  const stairTopFill = new THREE.PointLight(0xe0d1b4, 24.0, 7.5, 2);
  stairTopFill.position.set(0.3, 2.8, -8.0);
  group.add(stairTopFill);
  const stairStepFill = new THREE.PointLight(0xf0d6aa, 11.0, 5.2, 2);
  stairStepFill.position.set(0.15, 2.2, -8.65);
  group.add(stairStepFill);
  addBox(
    group,
    [0.34, 0.05, 0.18],
    [0.15, 3.06, -8.65],
    new THREE.MeshBasicMaterial({ color: 0xe7d2a3, toneMapped: false }),
    { castShadow: false },
  );
  addBox(group, [0.28, 0.12, 0.28], [0.1, 3.02, -7.2], new THREE.MeshBasicMaterial({ color: 0xc5d1a9, toneMapped: false }), {
    castShadow: false,
  });

  // Heavy door and frame. Pivot on the left, opening inward.
  const doorPivot = new THREE.Group();
  doorPivot.position.set(-0.76, 0, -4.12);
  group.add(doorPivot);
  const doorLeaf = new THREE.Group();
  doorLeaf.position.set(0.76, 0, 0);
  doorPivot.add(doorLeaf);
  addBox(
    doorLeaf,
    [1.52, 2.14, 0.13],
    [0, 1.08, 0],
    new THREE.MeshStandardMaterial({ color: 0x3b4441, metalness: 0.48, roughness: 0.55 }),
  );
  addBox(doorLeaf, [1.1, 0.34, 0.03], [0, 1.58, -0.09], darkSteel, { castShadow: false });
  addBox(doorLeaf, [0.17, 0.07, 0.06], [0.52, 1.05, -0.13], steel, { castShadow: false });
  const keypad = new THREE.Group();
  keypad.position.set(1.06, 1.25, -4.18);
  group.add(keypad);
  addBox(keypad, [0.23, 0.36, 0.06], [0, 0, 0], darkSteel);
  addBox(
    keypad,
    [0.15, 0.1, 0.012],
    [0, 0.07, -0.04],
    new THREE.MeshBasicMaterial({ color: 0x81d3a9, toneMapped: false }),
    { castShadow: false },
  );
  addBox(group, [1.7, 0.12, 0.35], [0, 2.25, -4.12], concrete, { castShadow: false });
  addBox(group, [1.9, 0.11, 0.25], [0, 0.055, -4.1], darkSteel, { castShadow: false });
  addLabelPlane(group, [0, 1.97, -4.36], [0, Math.PI, 0], {
    width: 0.62,
    height: 0.23,
    text: "B-07",
    bg: "#1b211f",
    color: "#b49d6e",
    size: 58,
    emissive: false,
  });

  // Pipes and cable runs.
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x4a5147, metalness: 0.55, roughness: 0.44 });
  for (let i = 0; i < 4; i++) {
    addBox(group, [6.5, 0.1, 0.1], [0, 2.39 - i * 0.12, 2.9 - i * 0.27], pipeMat, { castShadow: false });
  }
  addBox(group, [0.1, 0.1, 8.4], [-2.83, 2.32, 0], pipeMat, { castShadow: false });
  addBox(group, [0.1, 1.8, 0.1], [-2.83, 1.6, -4.0], pipeMat, { castShadow: false });
  const cablePoints: THREE.Vector3[] = [];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    cablePoints.push(new THREE.Vector3(-2.75 + Math.sin(t * 9) * 0.06, 2.5 - t * 0.55, -3.8 + t * 7.4));
  }
  const cable = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(cablePoints),
    new THREE.LineBasicMaterial({ color: 0x181a17 }),
  );
  group.add(cable);

  // Workbench.
  const table = new THREE.Group();
  table.position.set(-0.15, 0, 0.15);
  group.add(table);
  addBox(table, [3.7, 0.09, 1.45], [0, 0.87, 0], steel);
  addBox(table, [3.55, 0.025, 1.28], [0, 0.925, 0], new THREE.MeshStandardMaterial({ color: 0x3d4a3d, roughness: 0.92 }), {
    castShadow: false,
  });
  for (const x of [-1.62, 1.62]) {
    for (const z of [-0.56, 0.56]) {
      addBox(table, [0.1, 0.86, 0.1], [x, 0.43, z], darkSteel);
    }
  }
  addBox(table, [0.94, 0.27, 0.7], [1.18, 0.7, 0.1], darkSteel);
  addBox(table, [0.02, 0.025, 0.6], [1.0, 0.87, 0.1], steel, { castShadow: false });

  // The 36 disassembled rounds on a black cloth.
  addBox(
    table,
    [0.56, 0.014, 0.56],
    [-0.8, 0.94, 0.06],
    new THREE.MeshStandardMaterial({ color: 0x171915, roughness: 0.94 }),
    { castShadow: false },
  );
  const bullet = makeBulletGeometry();
  const bullets = new THREE.InstancedMesh(bullet.geometry, bullet.material, 36);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 36; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    dummy.position.set(-1.03 + col * 0.092, 0.975, -0.16 + row * 0.09);
    dummy.rotation.set(0, ((i * 37) % 10) * 0.01, 0);
    dummy.updateMatrix();
    bullets.setMatrixAt(i, dummy.matrix);
  }
  bullets.instanceMatrix.needsUpdate = true;
  table.add(bullets);

  // A few removed bullet heads and an empty tray.
  addBox(
    table,
    [0.45, 0.03, 0.28],
    [0.22, 0.95, -0.13],
    new THREE.MeshStandardMaterial({ color: 0x3a3e38, metalness: 0.45, roughness: 0.5 }),
    { castShadow: false },
  );
  for (let i = 0; i < 5; i++) {
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.017, 0.018, 0.017),
      new THREE.MeshStandardMaterial({ color: 0x806650, metalness: 0.6, roughness: 0.35 }),
    );
    head.position.set(0.08 + i * 0.055, 0.973, -0.16 + (i % 2) * 0.06);
    head.rotation.y = i * 0.6;
    table.add(head);
  }
  // A second tray of raw meteorite tips, stamped from the rods above.
  const tipGeo = new THREE.BoxGeometry(0.018, 0.034, 0.018);
  const tipMat = new THREE.MeshStandardMaterial({ color: 0x5a5145, metalness: 0.42, roughness: 0.55 });
  const tipMesh = new THREE.InstancedMesh(tipGeo, tipMat, 36);
  const tipDummy = new THREE.Object3D();
  for (let i = 0; i < 36; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    tipDummy.position.set(0.34 + (col - 2.5) * 0.045, 0.972, -0.25 + row * 0.05);
    tipDummy.rotation.set(0, (i * 0.83) % 1.4, 0.03 - (i % 3) * 0.02);
    tipDummy.updateMatrix();
    tipMesh.setMatrixAt(i, tipDummy.matrix);
  }
  tipMesh.instanceMatrix.needsUpdate = true;
  table.add(tipMesh);
  addBox(
    table,
    [0.34, 0.012, 0.37],
    [0.34, 0.95, -0.12],
    new THREE.MeshStandardMaterial({ color: 0x21221e, roughness: 0.9 }),
    { castShadow: false },
  );
  // A closer work-in-progress: a single cartridge receiving its stone tip.
  const jig = new THREE.Group();
  jig.name = "assembly-jig";
  jig.position.set(-0.12, 0.94, 0.5);
  table.add(jig);
  const jigSteel = new THREE.MeshStandardMaterial({ color: 0x48504a, metalness: 0.65, roughness: 0.35 });
  addBox(jig, [0.2, 0.025, 0.18], [0, 0, 0], jigSteel, { castShadow: false });
  addBox(jig, [0.035, 0.055, 0.14], [-0.075, 0.03, 0], jigSteel, { castShadow: false });
  addBox(jig, [0.035, 0.055, 0.14], [0.075, 0.03, 0], jigSteel, { castShadow: false });
  addBox(jig, [0.018, 0.02, 0.11], [0, 0.035, 0.03], new THREE.MeshBasicMaterial({ color: 0x9cbb9c, toneMapped: false }), { castShadow: false });
  addBox(jig, [0.042, 0.09, 0.042], [0, 0.08, 0], new THREE.MeshStandardMaterial({ color: 0x796145, metalness: 0.55, roughness: 0.4 }), { castShadow: false });
  addBox(jig, [0.042, 0.014, 0.042], [0, 0.132, 0], new THREE.MeshStandardMaterial({ color: 0x3d352a, roughness: 0.8 }), { castShadow: false });
  const assemblyTip = new THREE.Group();
  assemblyTip.position.set(0, 0.2, 0);
  jig.add(assemblyTip);
  const tipRock = createMeteoriteMesh(2, 880, true);
  tipRock.scale.setScalar(0.5);
  tipRock.position.set(0, 0.02, 0);
  assemblyTip.add(tipRock);
  for (const x of [-0.04, 0.04]) {
    addBox(assemblyTip, [0.009, 0.16, 0.009], [x, 0.12, -0.04], jigSteel, { castShadow: false, rotation: [0.08, 0, 0] });
  }
  const glueBead = addBox(
    jig,
    [0.016, 0.018, 0.016],
    [0, 0.143, 0],
    new THREE.MeshBasicMaterial({ color: 0xd9c78f, transparent: true, opacity: 0.8, toneMapped: false }),
    { castShadow: false },
  );
  const jigLight = new THREE.PointLight(0xffd4a0, 1.7, 1.4, 2);
  jigLight.position.set(0.05, 0.32, 0.08);
  jig.add(jigLight);

  // Tools.
  const pliers = makePliers();
  pliers.position.set(0.74, 0.96, 0.16);
  pliers.rotation.y = -0.45;
  table.add(pliers);
  const glue = new THREE.Group();
  glue.position.set(-1.32, 0.96, -0.25);
  addBox(glue, [0.065, 0.23, 0.065], [0, 0.12, 0], new THREE.MeshStandardMaterial({ color: 0x5f6961, roughness: 0.35, metalness: 0.2 }));
  addBox(glue, [0.04, 0.09, 0.04], [0, 0.27, 0], new THREE.MeshStandardMaterial({ color: 0xd0c5a1, roughness: 0.5 }));
  table.add(glue);
  for (let i = 0; i < 4; i++) {
    const frag = createMeteoriteMesh(2, 601 + i, false);
    frag.scale.setScalar(0.4 + i * 0.04);
    frag.position.set(0.9 + (i % 2) * 0.08, 0.955, -0.3 + Math.floor(i / 2) * 0.08);
    table.add(frag);
  }
  // Bench lamp.
  const benchLamp = new THREE.Group();
  benchLamp.position.set(-1.55, 0.93, -0.38);
  table.add(benchLamp);
  addBox(benchLamp, [0.22, 0.02, 0.16], [0, 0, 0], darkSteel);
  addBox(benchLamp, [0.025, 0.46, 0.025], [0.03, 0.23, 0], darkSteel, { rotation: [0, 0, -0.2] });
  addBox(benchLamp, [0.28, 0.1, 0.22], [0.06, 0.46, 0], new THREE.MeshStandardMaterial({ color: 0x2c3a32, roughness: 0.5, metalness: 0.35 }), {
    rotation: [0, 0, -0.2],
  });
  addBox(
    benchLamp,
    [0.22, 0.015, 0.16],
    [0.09, 0.405, 0],
    new THREE.MeshBasicMaterial({ color: 0xd2a260, toneMapped: false }),
    { castShadow: false },
  );
  const benchLight = new THREE.PointLight(0xffbd76, 4.8, 2.5, 2);
  benchLight.position.set(-1.4, 1.32, -0.4);
  group.add(benchLight);

  // Inspection tray for the aftermath.
  const inspection = new THREE.Group();
  inspection.position.set(-0.2, 0.94, 1.05);
  inspection.visible = false;
  group.add(inspection);
  addBox(inspection, [1.35, 0.03, 0.72], [0, 0, 0], new THREE.MeshStandardMaterial({ color: 0xb7b8ac, roughness: 0.4, metalness: 0.2 }), {
    castShadow: false,
  });
  addBox(inspection, [1.02, 0.02, 0.58], [-0.06, 0.035, 0], new THREE.MeshStandardMaterial({ color: 0x626354, roughness: 0.98 }), {
    castShadow: false,
  });
  addBox(inspection, [0.84, 0.14, 0.44], [-0.08, 0.1, 0], new THREE.MeshStandardMaterial({ color: 0x5a211e, roughness: 0.78 }), {
    castShadow: false,
  });
  addBox(inspection, [0.72, 0.025, 0.34], [-0.08, 0.18, 0], new THREE.MeshStandardMaterial({ color: 0x7c302b, roughness: 0.64 }), {
    castShadow: false,
  });
  addBox(inspection, [0.9, 0.012, 0.02], [-0.06, 0.195, -0.02], new THREE.MeshStandardMaterial({ color: 0xd3a990, roughness: 0.8 }), {
    castShadow: false,
    rotation: [0, 0.35, 0],
  });
  addBox(inspection, [0.42, 0.01, 0.015], [0.1, 0.2, 0.14], new THREE.MeshStandardMaterial({ color: 0xc89c82, roughness: 0.8 }), {
    castShadow: false,
    rotation: [0, -0.4, 0],
  });
  addBox(inspection, [0.17, 0.015, 0.19], [0.42, 0.02, 0.21], new THREE.MeshStandardMaterial({ color: 0x675f4f, roughness: 0.9 }), {
    castShadow: false,
  });
  for (let i = 0; i < 7; i++) {
    const frag = createMeteoriteMesh(2, 710 + i, false);
    frag.scale.setScalar(0.55 + (i % 2) * 0.1);
    frag.position.set(-0.24 + (i % 4) * 0.1, 0.2, -0.03 + Math.floor(i / 4) * 0.12);
    inspection.add(frag);
  }
  const knife = new THREE.Mesh(
    new THREE.BoxGeometry(0.29, 0.018, 0.055),
    new THREE.MeshStandardMaterial({ color: 0x8d9891, metalness: 0.75, roughness: 0.27 }),
  );
  knife.position.set(0.5, 0.07, 0.17);
  knife.rotation.y = -0.65;
  inspection.add(knife);

  // Hanging cloth bundle over a steel catch tray.
  const bundleGroup = new THREE.Group();
  bundleGroup.position.set(0.9, 0, 2.45);
  group.add(bundleGroup);
  addBox(group, [0.7, 0.08, 0.58], [0.9, 0.04, 2.45], new THREE.MeshStandardMaterial({ color: 0x272c29, metalness: 0.5, roughness: 0.55 }), {
    castShadow: false,
  });
  addBox(group, [0.55, 0.05, 0.44], [0.9, 0.12, 2.45], new THREE.MeshStandardMaterial({ color: 0x3a2420, roughness: 0.8 }), {
    castShadow: false,
  });
  const chainMat = new THREE.MeshStandardMaterial({ color: 0x4c5250, metalness: 0.8, roughness: 0.36 });
  for (let i = 0; i < 7; i++) {
    addBox(bundleGroup, [0.018, 0.09, 0.018], [0, 2.45 - i * 0.1, 0], chainMat, { castShadow: false });
  }
  addBox(bundleGroup, [0.34, 0.035, 0.18], [0, 1.78, 0], darkSteel, { castShadow: false });
  const clothMat = new THREE.MeshStandardMaterial({ color: 0x777264, roughness: 0.97 });
  addBox(bundleGroup, [0.44, 0.5, 0.22], [0, 1.5, 0], clothMat);
  addBox(bundleGroup, [0.47, 0.08, 0.25], [0, 1.78, 0], new THREE.MeshStandardMaterial({ color: 0x8b8474, roughness: 0.98 }));
  addBox(bundleGroup, [0.03, 0.44, 0.23], [-0.19, 1.49, 0], new THREE.MeshStandardMaterial({ color: 0x5f594d, roughness: 1 }), {
    castShadow: false,
  });
  addBox(bundleGroup, [0.03, 0.44, 0.23], [0.19, 1.49, 0], new THREE.MeshStandardMaterial({ color: 0x5f594d, roughness: 1 }), {
    castShadow: false,
  });
  // Bullet holes and cold vapour, visible after the test.
  const holes = new THREE.Group();
  holes.visible = false;
  bundleGroup.add(holes);
  for (let i = 0; i < 5; i++) {
    const hole = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.018, 0.006),
      new THREE.MeshBasicMaterial({ color: 0x16100d }),
    );
    hole.position.set(-0.1 + (i % 2) * 0.2 + (i === 3 ? 0.06 : 0), 1.56 + Math.floor(i / 2) * 0.13, -0.115);
    holes.add(hole);
  }
  const vapour = makeMistSprite(0.33, 0.0);
  vapour.position.set(0, 1.6, -0.18);
  bundleGroup.add(vapour);
  const spatter = new THREE.Group();
  spatter.visible = false;
  bundleGroup.add(spatter);
  for (let i = 0; i < 12; i++) {
    const bit = new THREE.Mesh(
      new THREE.BoxGeometry(0.009, 0.009, 0.009),
      new THREE.MeshBasicMaterial({ color: i % 3 ? 0x54201c : 0x9a3b34, toneMapped: false }),
    );
    const rng = mulberry32(410 + i);
    bit.position.set((rng() - 0.5) * 0.42, 1.52 + rng() * 0.28, -0.13 - rng() * 0.12);
    spatter.add(bit);
  }

  // Fire range backstop and sign.
  addBox(group, [2.8, 0.7, 0.35], [0.9, 0.35, 3.92], new THREE.MeshStandardMaterial({ color: 0x3a3d34, roughness: 0.98 }));
  for (let i = 0; i < 4; i++) {
    addBox(group, [2.3 - i * 0.12, 0.32, 0.18], [0.9, 0.8 + i * 0.27, 3.89], new THREE.MeshStandardMaterial({ color: 0x555243, roughness: 1 }), {
      castShadow: false,
    });
  }
  addLabelPlane(group, [0.9, 1.7, 3.69], [0, Math.PI, 0], {
    width: 0.9,
    height: 0.34,
    text: "试射 / B-07",
    bg: "#5a3523",
    color: "#e0c287",
    size: 48,
    emissive: false,
  });

  // Shelving and clutter on the right.
  addBox(group, [0.9, 0.08, 2.3], [2.78, 1.55, 0.5], steel);
  addBox(group, [0.9, 0.08, 2.3], [2.78, 0.9, 0.5], steel);
  for (const z of [-0.45, 0.5, 1.35]) {
    addBox(group, [0.06, 1.55, 0.06], [3.12, 0.8, z], steel);
  }
  for (let i = 0; i < 12; i++) {
    const rng = mulberry32(900 + i);
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.22 + rng() * 0.24, 0.16 + rng() * 0.2, 0.22 + rng() * 0.26),
      new THREE.MeshStandardMaterial({ color: i % 4 === 0 ? 0x766b4e : 0x424a42, roughness: 0.9 }),
    );
    box.position.set(2.75 + (rng() - 0.5) * 0.3, 1.0 + (i % 2) * 0.64, -0.2 + (i / 12) * 1.7);
    box.rotation.y = rng() * 1.4;
    group.add(box);
  }
  // Sink and water stain.
  addBox(group, [1.0, 0.15, 0.65], [-2.5, 0.85, 2.75], new THREE.MeshStandardMaterial({ color: 0x5e625d, metalness: 0.55, roughness: 0.4 }));
  addBox(group, [0.8, 0.2, 0.45], [-2.5, 0.75, 2.75], concrete);
  addBox(group, [0.04, 0.5, 0.04], [-2.5, 1.1, 3.02], steel);
  addBox(group, [0.24, 0.03, 0.16], [-2.48, 1.34, 2.9], steel);
  addBox(group, [0.7, 1.6, 0.1], [-3.1, 1.0, 2.6], new THREE.MeshStandardMaterial({ color: 0x2d342f, roughness: 1 }));

  // Characters and gun.
  const zhang = createZhang();
  zhang.setUniform();
  zhang.figure.root.position.set(-0.15, 0, -0.55);
  group.add(zhang.figure.root);
  const gun = createPistolRig(true);
  gun.root.visible = false;
  zhang.figure.anchors.handR.add(gun.root);
  const scopeOnTable = makeRifleScope();
  scopeOnTable.scale.setScalar(0.75);
  scopeOnTable.position.set(0.95, 0.975, -0.03);
  table.add(scopeOnTable);

  // Stool and small coat hook.
  addBox(group, [0.52, 0.07, 0.5], [1.35, 0.48, -1.5], darkSteel);
  for (const x of [1.14, 1.56]) {
    for (const z of [-1.7, -1.3]) {
      addBox(group, [0.05, 0.47, 0.05], [x, 0.24, z], darkSteel);
    }
  }

  // Hanging bulb, shadow-casting, warm.
  const bulbSwing = new THREE.Group();
  bulbSwing.position.set(0.0, 2.55, 1.2);
  group.add(bulbSwing);
  addBox(bulbSwing, [0.02, 0.38, 0.02], [0, -0.19, 0], new THREE.MeshBasicMaterial({ color: 0x2b2218 }), { castShadow: false });
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffc47c, toneMapped: false });
  addBox(bulbSwing, [0.13, 0.18, 0.13], [0, -0.44, 0], bulbMat, { castShadow: false });
  addBox(bulbSwing, [0.24, 0.08, 0.24], [0, -0.33, 0], darkSteel, { castShadow: false });
  const bulbGlow = makeGlowSprite(0xffb261, 1.9, 0.32);
  bulbGlow.position.set(0, -0.44, 0);
  bulbSwing.add(bulbGlow);
  const mainLight = new THREE.PointLight(0xffa862, 14, 7, 2);
  mainLight.position.set(0, -0.48, 0);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.set(1024, 1024);
  mainLight.shadow.bias = -0.008;
  mainLight.shadow.camera.near = 0.1;
  mainLight.shadow.camera.far = 8;
  bulbSwing.add(mainLight);
  const fill = new THREE.HemisphereLight(0x6e7f72, 0x201b14, 0.18);
  group.add(fill);
  const stairFill = new THREE.PointLight(0x8fb89a, 5.2, 5.2, 2);
  stairFill.position.set(0, 1.0, -4.6);
  group.add(stairFill);
  const cameraFill = new THREE.DirectionalLight(0xcab48e, 0.6);
  cameraFill.position.set(3.5, 3.2, 4.2);
  cameraFill.target.position.set(-0.4, 1.0, 0.2);
  group.add(cameraFill, cameraFill.target);
  const greenPractical = new THREE.PointLight(0x6f9a7d, 1.35, 3.2, 2);
  greenPractical.position.set(-2.2, 1.9, 2.6);
  group.add(greenPractical);
  const doorPractical = new THREE.PointLight(0x96c7a1, 2.0, 4.0, 2);
  doorPractical.position.set(0.4, 1.6, -3.4);
  group.add(doorPractical);
  const benchFrontFill = new THREE.PointLight(0xffca92, 9.0, 5.0, 2);
  benchFrontFill.position.set(1.4, 1.95, -2.15);
  group.add(benchFrontFill);

  // Gunshot flash.
  const flashLight = new THREE.PointLight(0xffd08a, 0, 7, 2);
  flashLight.position.set(0.15, 1.2, 1.65);
  group.add(flashLight);
  const muzzleRim = makeGlowSprite(0xffcd83, 3.3, 0);
  muzzleRim.position.set(0.3, 1.45, 1.0);
  group.add(muzzleRim);
  const muzzleSmoke = makeMistSprite(1.0, 0);
  muzzleSmoke.position.set(0.35, 1.45, 1.3);
  group.add(muzzleSmoke);

  // Dust in the bulb light.
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions: number[] = [];
  const rng = mulberry32(736);
  for (let i = 0; i < 150; i++) {
    dustPositions.push((rng() - 0.5) * 6, 0.3 + rng() * 2.1, -3.6 + rng() * 7.7);
  }
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xd9b986, size: 0.012, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  group.add(dust);

  let lightLevel = 1;
  let doorAmount = 0;
  let onStairs = false;
  let bulletCount = 36;
  let parcelState: "loaded" | "holes" | "open" = "loaded";
  let firstUpdate = true;

  const setLights = (level: number): void => {
    lightLevel = Math.max(0, Math.min(1.4, level));
  };
  const setDoorOpen = (amount: number): void => {
    doorAmount = Math.max(0, Math.min(1, amount));
    const e = doorAmount * doorAmount * (3 - 2 * doorAmount);
    doorPivot.rotation.y = e * 1.5;
  };
  const setBullets = (visible: boolean): void => {
    bullets.visible = visible;
  };
  const setInspection = (visible: boolean): void => {
    inspection.visible = visible;
  };
  const setParcelState = (state: "loaded" | "holes" | "open"): void => {
    parcelState = state;
    holes.visible = state !== "loaded";
    spatter.visible = state !== "loaded";
  };
  const setBulletCount = (count: number): void => {
    bulletCount = Math.max(0, Math.min(36, Math.round(count)));
    bullets.count = bulletCount;
    bullets.visible = bulletCount > 0;
  };
  const setStairsActive = (active: boolean): void => {
    onStairs = active;
  };

  const flashPoint = (time: number): { flash: number; smoke: number } => {
    const dt = time - BASEMENT_SHOT_TIME;
    if (dt < 0) return { flash: 0, smoke: 0 };
    return {
      flash: Math.max(0, 1 - dt / 0.14),
      smoke: Math.max(0, Math.min(1, dt / 0.15)) * Math.max(0, 1 - (dt - 0.2) / 2.3),
    };
  };

  const update = (time: number, localTime: number): void => {
    const level = lightLevel;
    const jigActive = time >= 177.6 && time < 191.2;
    assemblyTip.visible = jigActive;
    if (jigActive) {
      const p = smooth(clamp01((time - 180.2) / 5.6));
      assemblyTip.position.y = 0.2 - p * 0.058;
      glueBead.scale.setScalar(p > 0.08 && p < 0.82 ? 1 : 0.001);
      glueBead.position.y = 0.143;
    } else {
      glueBead.scale.setScalar(0.001);
    }
    const swing = Math.sin(time * 0.63) * 0.12 + Math.sin(time * 1.17 + 1.1) * 0.025;
    bulbSwing.rotation.z = swing;
    mainLight.intensity = (18.5 + Math.sin(time * 2.4) * 0.25) * level;
    fill.intensity = 0.46 * level;
    stairBulb.intensity = (onStairs ? 6.5 : 3.8) * Math.max(0.05, level);
    benchLight.intensity = 4.8 * Math.max(0, Math.min(1, level + 0.15));
    dust.position.y = Math.sin(time * 0.09) * 0.06;
    const flash = flashPoint(time);
    flashLight.intensity = flash.flash * 55;
    muzzleRim.material.opacity = flash.flash * 0.9;
    muzzleSmoke.material.opacity = flash.smoke * 0.24;
    muzzleSmoke.scale.setScalar(0.55 + flash.smoke * 1.4);
    (vapour.material as THREE.SpriteMaterial).opacity =
      Math.max(0, Math.min(0.25, (time - BASEMENT_SHOT_TIME - 1.8) * 0.14)) * (parcelState !== "loaded" ? 1 : 0);
    vapour.scale.setScalar(0.3 + Math.max(0, time - BASEMENT_SHOT_TIME) * 0.11);
    gun.setFlash(flash.flash);

    // Bundle reacts very slightly, as if it has just been struck.
    const recoil = Math.max(0, 1 - Math.abs(time - BASEMENT_SHOT_TIME - 0.12) / 0.18);
    bundleGroup.rotation.z = Math.sin(time * 1.3) * 0.008 + recoil * 0.035;

    if (firstUpdate) {
      firstUpdate = false;
      // Keep the count sane after an initial seek.
      bullets.count = bulletCount;
    }
  };

  setParcelState("loaded");
  setDoorOpen(0);
  update(0, 0);

  return {
    group,
    zhang,
    gun,
    update,
    setLights,
    setDoorOpen,
    setBullets,
    setInspection,
    setParcelState,
    setBulletCount,
    setStairsActive,
    fireTime: BASEMENT_SHOT_TIME,
  };
}
