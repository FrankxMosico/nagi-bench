import * as THREE from "three";
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
import { createMeteoriteMesh, createZhang, type ZhangActor } from "../lib/characters";

export interface WorkshopWorld {
  group: THREE.Group;
  zhang: ZhangActor;
  update: (time: number) => void;
  setMachining: (active: boolean) => void;
  setPieces: (count: number) => void;
  setCaseOpen: (open: boolean) => void;
  setWorkpieces: (visible: boolean) => void;
  setDustVial: (visible: boolean) => void;
  machineScreen: THREE.Mesh;
  machineGlass: THREE.Mesh;
  cutRod: THREE.Group;
}

function createMachine(): {
  group: THREE.Group;
  glass: THREE.Mesh;
  rod: THREE.Group;
  chuck: THREE.Group;
  tool: THREE.Group;
  screen: THREE.Mesh;
  workLight: THREE.PointLight;
  alarm: THREE.PointLight;
} {
  const group = new THREE.Group();
  group.position.set(-1.0, 0, 0.35);
  const shell = new THREE.MeshStandardMaterial({ color: 0x243236, metalness: 0.36, roughness: 0.58 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x10181b, metalness: 0.42, roughness: 0.66 });
  const edge = new THREE.MeshStandardMaterial({ color: 0x8c6b3d, metalness: 0.6, roughness: 0.38 });

  // Base, frame and back.
  addBox(group, [4.2, 0.35, 2.4], [0, 0.22, 0], dark, { castShadow: true });
  addBox(group, [4.3, 2.15, 0.16], [0, 1.36, -1.16], shell);
  addBox(group, [0.3, 2.3, 2.2], [-2.05, 1.32, 0], shell);
  addBox(group, [0.3, 2.3, 2.2], [2.05, 1.32, 0], shell);
  addBox(group, [4.2, 0.35, 2.2], [0, 2.45, 0], shell);
  // Front lower panel and glass aperture.
  addBox(group, [4.1, 0.62, 0.15], [0, 0.64, 1.11], shell);
  addBox(group, [4.1, 0.43, 0.15], [0, 2.22, 1.11], shell);
  addBox(group, [0.38, 1.95, 0.15], [-1.86, 1.42, 1.11], shell);
  addBox(group, [0.38, 1.95, 0.15], [1.86, 1.42, 1.11], shell);
  addBox(group, [3.4, 0.055, 0.18], [0, 1.95, 1.09], edge, { castShadow: false });
  addBox(group, [3.4, 0.055, 0.18], [0, 0.88, 1.09], edge, { castShadow: false });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9ec5c3,
    transparent: true,
    opacity: 0.055,
    roughness: 0.1,
    metalness: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const glass = addPlane(group, [3.08, 1.05], [0, 1.42, 1.12], glassMat);
  glass.name = "machine-safety-glass";

  // Machine bed and rails.
  addBox(group, [3.8, 0.13, 0.28], [0, 0.78, 0.52], dark);
  addBox(group, [3.8, 0.08, 0.06], [0, 0.86, 0.84], edge, { castShadow: false });
  addBox(group, [3.8, 0.08, 0.06], [0, 0.86, 0.2], edge, { castShadow: false });
  // Chuck.
  const chuck = new THREE.Group();
  chuck.position.set(-1.36, 1.05, 0.52);
  group.add(chuck);
  addBox(chuck, [0.35, 0.48, 0.48], [0, 0, 0], new THREE.MeshStandardMaterial({ color: 0x687170, metalness: 0.7, roughness: 0.35 }));
  addBox(chuck, [0.12, 0.32, 0.32], [0.2, 0, 0], dark);
  for (let i = 0; i < 4; i++) {
    addBox(chuck, [0.08, 0.12, 0.08], [0.24, Math.sin(i * TAU / 4) * 0.2, Math.cos(i * TAU / 4) * 0.2], edge, {
      rotation: [i * TAU / 4, 0, 0],
    });
  }
  // The raw meteorite rod.
  const rod = new THREE.Group();
  rod.position.set(-0.35, 1.05, 0.52);
  group.add(rod);
  const rodMat = new THREE.MeshStandardMaterial({ color: 0x77766c, metalness: 0.58, roughness: 0.33 });
  addBox(rod, [1.82, 0.18, 0.18], [0, 0, 0], rodMat);
  for (let i = 0; i < 9; i++) {
    addBox(
      rod,
      [0.03, 0.19, 0.19],
      [-0.8 + i * 0.2, 0, 0],
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0x4a4a43 : 0x989486, metalness: 0.68, roughness: 0.35 }),
      { castShadow: false },
    );
  }
  // Tailstock.
  addBox(group, [0.3, 0.5, 0.3], [0.94, 1.02, 0.52], dark);
  addBox(group, [0.12, 0.12, 0.12], [0.81, 1.05, 0.52], edge, { castShadow: false });
  // Tool carriage and cutter.
  const tool = new THREE.Group();
  tool.position.set(0.2, 1.31, 0.85);
  group.add(tool);
  addBox(tool, [0.3, 0.25, 0.22], [0, 0, 0], dark);
  addBox(tool, [0.1, 0.1, 0.34], [0, 0.14, -0.12], new THREE.MeshStandardMaterial({ color: 0xc1a567, metalness: 0.75, roughness: 0.22 }));
  addBox(tool, [0.08, 0.32, 0.08], [0, 0.3, 0.08], edge);
  addBox(tool, [0.18, 0.06, 0.18], [0, 0.16, -0.22], new THREE.MeshStandardMaterial({ color: 0x747c76, metalness: 0.7, roughness: 0.3 }));
  // Coolant nozzle.
  addBox(tool, [0.04, 0.045, 0.32], [-0.19, 0.14, -0.1], new THREE.MeshStandardMaterial({ color: 0x536c6d, metalness: 0.5, roughness: 0.45 }), {
    rotation: [0.5, 0, 0],
  });
  const coolant = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.018, 0.4),
    new THREE.MeshBasicMaterial({ color: 0x90c2c5, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  coolant.position.set(-0.19, 0.05, -0.26);
  coolant.rotation.x = 0.35;
  tool.add(coolant);

  // Control column with a live program screen.
  addBox(group, [0.82, 1.35, 0.4], [2.35, 0.92, 0.74], shell);
  const screenTexture = canvasTexture(512, 384, (ctx) => {
    ctx.fillStyle = "#061211";
    ctx.fillRect(0, 0, 512, 384);
    ctx.strokeStyle = "rgba(122,197,180,.24)";
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, 476, 348);
    ctx.fillStyle = "#9dd3bd";
    ctx.font = '500 25px "Courier New", monospace';
    ctx.fillText("FE-NI / CTRL-07", 42, 64);
    ctx.font = '600 45px "Courier New", monospace';
    ctx.fillStyle = "#d6efc7";
    ctx.fillText("X 36.000", 42, 132);
    ctx.fillStyle = "#81b9a9";
    ctx.font = '500 24px "Courier New", monospace';
    ctx.fillText("FEED  0.08 mm/rev", 42, 188);
    ctx.fillText("SPINDLE  1480 rpm", 42, 226);
    ctx.fillText("COOLANT  ON", 42, 264);
    ctx.fillStyle = "#d1a860";
    ctx.fillRect(42, 302, 250, 3);
    ctx.fillStyle = "#7fa89d";
    ctx.fillText("METEORITE / 36", 42, 342);
    ctx.strokeStyle = "rgba(129,198,178,.28)";
    ctx.beginPath();
    ctx.moveTo(320, 110);
    ctx.lineTo(448, 110);
    ctx.lineTo(448, 292);
    ctx.lineTo(320, 292);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(340, 272);
    ctx.lineTo(380, 208);
    ctx.lineTo(406, 228);
    ctx.lineTo(438, 164);
    ctx.stroke();
  });
  const screen = addPlane(group, [0.55, 0.42], [2.06, 1.36, 0.95], new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false }));
  screen.rotation.y = -0.45;
  // Physical buttons below.
  for (let i = 0; i < 6; i++) {
    addBox(
      group,
      [0.045, 0.035, 0.045],
      [2.15 + (i % 3) * 0.08, 1.03 - Math.floor(i / 3) * 0.07, 0.98],
      new THREE.MeshBasicMaterial({ color: i === 1 ? 0x73c6b6 : i === 4 ? 0xd39a55 : 0x293a38, toneMapped: false }),
      { castShadow: false },
    );
  }

  // Work light inside the enclosure.
  const light = new THREE.PointLight(0xb9dfd1, 8, 3.6, 2);
  light.position.set(-0.1, 1.8, 0.8);
  group.add(light);
  const glow = makeGlowSprite(0xbfded1, 1.6, 0.16);
  glow.position.set(-0.25, 1.5, 0.95);
  group.add(glow);
  // Amber alarm beacon.
  const alarm = new THREE.PointLight(0xff7438, 0.08, 2.4, 2);
  alarm.position.set(1.86, 2.13, 0.65);
  group.add(alarm);
  addBox(
    group,
    [0.15, 0.1, 0.15],
    [1.86, 2.13, 1.03],
    new THREE.MeshBasicMaterial({ color: 0x5e2618, toneMapped: false }),
    { castShadow: false },
  );

  // Tool cabinet, warning stripes and cable trunking.
  const stripes: Parameters<typeof addBatchedBoxes>[1] = [];
  for (let i = 0; i < 22; i++) {
    stripes.push({
      position: [-2.25 + i * 0.22, 0.02, 1.46],
      size: [0.1, 0.015, 0.3],
      color: i % 2 ? 0xc7943f : 0x181814,
      rotation: [0, 0.6, 0],
    });
  }
  addBatchedBoxes(group, stripes, { roughness: 0.7 }, false, false);

  return { group, glass, rod, chuck, tool, screen, workLight: light, alarm };
}

function createWorkTable(): {
  group: THREE.Group;
  pieces: THREE.InstancedMesh;
  vial: THREE.Group;
  caseOpen: THREE.Group;
  caseLid: THREE.Group;
} {
  const group = new THREE.Group();
  group.position.set(3.25, 0, 1.6);
  const steel = new THREE.MeshStandardMaterial({ color: 0x394445, metalness: 0.55, roughness: 0.44 });
  addBox(group, [2.7, 0.1, 1.45], [0, 0.86, 0], steel);
  addBox(group, [2.5, 0.08, 1.25], [0, 0.93, 0], new THREE.MeshStandardMaterial({ color: 0x2b3333, metalness: 0.35, roughness: 0.7 }));
  for (const x of [-1.1, 1.1]) {
    for (const z of [-0.55, 0.55]) {
      addBox(group, [0.1, 0.84, 0.1], [x, 0.42, z], steel);
    }
  }
  // Caliper, tray, gloves.
  addBox(group, [0.46, 0.02, 0.1], [-0.8, 0.985, 0.15], new THREE.MeshStandardMaterial({ color: 0x9aa09a, metalness: 0.75, roughness: 0.28 }), {
    rotation: [0, 0.15, 0],
    castShadow: false,
  });
  addBox(group, [0.16, 0.02, 0.3], [-0.65, 0.995, 0.19], new THREE.MeshStandardMaterial({ color: 0xc8c6b9, metalness: 0.55, roughness: 0.36 }), {
    rotation: [0, 0.15, 0],
    castShadow: false,
  });
  addBox(group, [0.72, 0.025, 0.44], [0.25, 0.99, 0.0], new THREE.MeshStandardMaterial({ color: 0x1c1f1d, roughness: 0.9 }), {
    castShadow: false,
  });
  addBox(group, [0.5, 0.035, 0.12], [-0.72, 1.0, -0.32], new THREE.MeshStandardMaterial({ color: 0x5e665e, roughness: 0.9 }), {
    rotation: [0, -0.18, 0],
    castShadow: false,
  });
  // A focused work lamp for the tiny rows of stone.
  const workLamp = new THREE.Group();
  workLamp.position.set(-0.95, 0.93, -0.35);
  group.add(workLamp);
  addBox(workLamp, [0.2, 0.02, 0.16], [0, 0, 0], new THREE.MeshStandardMaterial({ color: 0x1d2424, metalness: 0.5 }), { castShadow: false });
  addBox(workLamp, [0.025, 0.5, 0.025], [0.02, 0.25, 0], new THREE.MeshStandardMaterial({ color: 0x1d2424, metalness: 0.5 }), { rotation: [0, 0, -0.16], castShadow: false });
  addBox(workLamp, [0.34, 0.1, 0.24], [0.08, 0.5, -0.02], new THREE.MeshStandardMaterial({ color: 0x31423c, metalness: 0.4, roughness: 0.45 }), { rotation: [0, 0, -0.16], castShadow: false });
  addBox(workLamp, [0.26, 0.016, 0.18], [0.11, 0.445, -0.02], new THREE.MeshBasicMaterial({ color: 0xffd89b, toneMapped: false }), { castShadow: false });
  const tableLight = new THREE.PointLight(0xffcf8d, 4.8, 2.3, 2);
  tableLight.position.set(0, 0.4, 0);
  workLamp.add(tableLight);
  // Vial of collected dust.
  const vial = new THREE.Group();
  vial.position.set(0.78, 0.99, -0.15);
  vial.visible = false;
  group.add(vial);
  addBox(vial, [0.08, 0.24, 0.08], [0, 0.12, 0], new THREE.MeshPhysicalMaterial({ color: 0xafc2b7, transparent: true, opacity: 0.35, roughness: 0.08, depthWrite: false }), {
    castShadow: false,
  });
  addBox(vial, [0.06, 0.1, 0.06], [0, 0.06, 0], new THREE.MeshStandardMaterial({ color: 0x6b6558, roughness: 0.95 }), {
    castShadow: false,
  });
  addBox(vial, [0.1, 0.04, 0.1], [0, 0.25, 0], new THREE.MeshStandardMaterial({ color: 0x2d2f2c, metalness: 0.55, roughness: 0.42 }), {
    castShadow: false,
  });

  // Case that carried the meteorites.
  const caseGroup = new THREE.Group();
  caseGroup.position.set(1.0, 1.0, 0.35);
  group.add(caseGroup);
  addBox(caseGroup, [0.78, 0.18, 0.5], [0, 0.09, 0], new THREE.MeshStandardMaterial({ color: 0x222321, metalness: 0.3, roughness: 0.62 }), {
    castShadow: false,
  });
  const caseLid = new THREE.Group();
  caseLid.position.set(0, 0.18, -0.24);
  caseGroup.add(caseLid);
  addBox(caseLid, [0.78, 0.08, 0.5], [0, 0.04, 0.24], new THREE.MeshStandardMaterial({ color: 0x282926, metalness: 0.4, roughness: 0.5 }), {
    castShadow: false,
  });
  addBox(caseLid, [0.3, 0.03, 0.05], [0, 0.1, 0.25], new THREE.MeshStandardMaterial({ color: 0x8a7a55, metalness: 0.65, roughness: 0.32 }), {
    castShadow: false,
  });
  const caseOpen = new THREE.Group();
  caseOpen.visible = false;
  caseGroup.add(caseOpen);
  for (let i = 0; i < 3; i++) {
    const rock = createMeteoriteMesh(3, 410 + i, i === 1);
    rock.position.set(-0.22 + i * 0.22, 0.22, 0.06);
    rock.scale.setScalar(0.7);
    caseOpen.add(rock);
  }

  // 36 cut segments, as an instanced row.
  const segmentGeo = new THREE.BoxGeometry(0.035, 0.22, 0.035);
  const segmentMat = new THREE.MeshStandardMaterial({ color: 0x8a8171, metalness: 0.72, roughness: 0.24 });
  const pieces = new THREE.InstancedMesh(segmentGeo, segmentMat, 36);
  const matrix = new THREE.Matrix4();
  const quat = new THREE.Quaternion();
  for (let i = 0; i < 36; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    matrix.compose(
      new THREE.Vector3(0.17 + (col - 2.5) * 0.065, 1.055, -0.16 + row * 0.075),
      quat.setFromEuler(new THREE.Euler(0.012 * Math.sin(i * 2.2), 0.08 * Math.sin(i * 3.1), 0.015 * Math.cos(i))),
      new THREE.Vector3(1, 1, 1),
    );
    pieces.setMatrixAt(i, matrix);
  }
  pieces.instanceMatrix.needsUpdate = true;
  pieces.castShadow = false;
  pieces.visible = false;
  group.add(pieces);

  return { group, pieces, vial, caseOpen, caseLid };
}

export function createWorkshopWorld(): WorkshopWorld {
  const group = new THREE.Group();
  group.name = "workshop";
  group.visible = false;

  const concrete = new THREE.MeshStandardMaterial({
    map: concreteTexture([5, 5]),
    color: 0x606762,
    roughness: 0.92,
  });
  addBox(group, [16, 0.2, 13], [0, -0.11, 0.5], concrete, { castShadow: false, receiveShadow: true });
  addBox(group, [16, 0.2, 13], [0, 6.5, 0.5], new THREE.MeshStandardMaterial({ color: 0x182125, roughness: 0.96 }), {
    castShadow: false,
  });
  addBox(group, [16, 6.5, 0.3], [0, 3.25, -6.0], concrete);
  addBox(group, [0.3, 6.5, 13], [-8.0, 3.25, 0.5], concrete);
  addBox(group, [0.3, 6.5, 13], [8.0, 3.25, 0.5], concrete);

  // High windows with a distant, sleeping city.
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: 0x4e6a75,
    transparent: true,
    opacity: 0.2,
    roughness: 0.22,
    metalness: 0.2,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  for (const x of [-5.4, -1.8, 1.8, 5.4]) {
    addBox(group, [3.3, 2.2, 0.1], [x, 4.65, -5.82], new THREE.MeshStandardMaterial({ color: 0x0b1114, roughness: 0.85 }), {
      castShadow: false,
    });
    addPlane(group, [3.0, 1.95], [x, 4.63, -5.75], windowMat);
    addBox(group, [0.08, 2.1, 0.12], [x, 4.63, -5.68], new THREE.MeshStandardMaterial({ color: 0x2a3437, metalness: 0.55, roughness: 0.5 }), {
      castShadow: false,
    });
    addBox(group, [3.15, 0.08, 0.12], [x, 4.63, -5.68], new THREE.MeshStandardMaterial({ color: 0x2a3437, metalness: 0.55, roughness: 0.5 }), {
      castShadow: false,
    });
  }
  const cityBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  const cityRng = mulberry32(382);
  for (let i = 0; i < 48; i++) {
    const x = -18 + cityRng() * 36;
    const z = -14 - cityRng() * 16;
    const h = 1.3 + cityRng() * 7.5;
    cityBoxes.push({ position: [x, h / 2 - 1.4, z], size: [1.2 + cityRng() * 2.2, h, 1.5], color: 0x071014 });
    if (cityRng() > 0.42) {
      cityBoxes.push({
        position: [x + (cityRng() - 0.5), h / 2 - 1.3, z + 0.8],
        size: [0.08, 0.1, 0.02],
        color: cityRng() > 0.55 ? 0xe0a865 : 0x8eb1b9,
      });
    }
  }
  addBatchedBoxes(group, cityBoxes, { roughness: 0.92 }, false, false);

  // Ceiling rails and industrial lamps.
  const railBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  for (const x of [-5.2, 0, 5.2]) {
    railBoxes.push({ position: [x, 6.24, 0.5], size: [0.22, 0.18, 12], color: 0x273237 });
    railBoxes.push({ position: [x, 6.2, -3.5], size: [0.14, 0.35, 0.14], color: 0x1e282c });
    railBoxes.push({ position: [x, 6.2, 3.6], size: [0.14, 0.35, 0.14], color: 0x1e282c });
  }
  addBatchedBoxes(group, railBoxes, { metalness: 0.5, roughness: 0.48 }, false, false);
  const lampPositions: THREE.Vector3[] = [];
  for (const x of [-5.2, 0, 5.2]) {
    for (const z of [-3.5, 0.5, 4.5]) {
      addBox(
        group,
        [1.3, 0.07, 0.24],
        [x, 5.72, z],
        new THREE.MeshBasicMaterial({ color: 0xaed9cf, toneMapped: false }),
        { castShadow: false },
      );
      addBox(group, [1.45, 0.13, 0.34], [x, 5.82, z], new THREE.MeshStandardMaterial({ color: 0x202d31, metalness: 0.5, roughness: 0.6 }), {
        castShadow: false,
      });
      const glow = makeGlowSprite(0xb9e6dc, 1.4, 0.13);
      glow.position.set(x, 5.6, z);
      group.add(glow);
      lampPositions.push(new THREE.Vector3(x, 5.65, z));
    }
  }

  // Support columns and pipes.
  const columnMat = new THREE.MeshStandardMaterial({ color: 0x2c3739, metalness: 0.35, roughness: 0.65 });
  for (const x of [-7.1, 7.1]) {
    addBox(group, [0.7, 6.3, 0.7], [x, 3.15, -4.0], columnMat);
    addBox(group, [0.7, 6.3, 0.7], [x, 3.15, 5.0], columnMat);
  }
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x41564e, metalness: 0.6, roughness: 0.4 });
  for (let i = 0; i < 4; i++) {
    addBox(group, [15.6, 0.16, 0.16], [0, 5.12 - i * 0.21, -1.5 - i * 0.38], pipeMat, { castShadow: false });
  }

  // Tool cabinets and a steel shelf.
  const cabMat = new THREE.MeshStandardMaterial({ color: 0x384449, metalness: 0.35, roughness: 0.6 });
  const toolRng = mulberry32(908);
  for (let i = 0; i < 5; i++) {
    addBox(group, [0.9, 1.8, 0.65], [-6.75, 0.9, -2.5 + i * 0.72], cabMat);
    addBox(group, [0.84, 0.02, 0.04], [-6.75, 1.28 + (i % 2) * 0.22, -2.48 + i * 0.72], new THREE.MeshStandardMaterial({ color: 0x151c1e, roughness: 0.5, metalness: 0.4 }), {
      castShadow: false,
    });
  }
  addBox(group, [1.2, 0.12, 2.8], [6.9, 2.1, 1.3], cabMat);
  for (let i = 0; i < 8; i++) {
    addBox(
      group,
      [0.06, 0.35 + toolRng() * 0.5, 0.06],
      [6.76, 2.3, 0.1 + i * 0.32],
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0x8a917f : 0x53656a, metalness: 0.65, roughness: 0.35 }),
      { castShadow: false, rotation: [0, 0, (toolRng() - 0.5) * 0.1] },
    );
  }

  const machine = createMachine();
  group.add(machine.group);

  const table = createWorkTable();
  group.add(table.group);

  // Zhang enters from the dark right-hand service door.
  const zhang = createZhang();
  zhang.setUniform();
  zhang.figure.root.position.set(6.7, 0, 4.4);
  group.add(zhang.figure.root);

  // Fine metal dust and coolant haze.
  const mist = makeMistSprite(2.1, 0.04);
  mist.position.set(-1.3, 1.6, 1.5);
  group.add(mist);
  const dustGeo = new THREE.BufferGeometry();
  const positions: number[] = [];
  const rng = mulberry32(772);
  for (let i = 0; i < 110; i++) positions.push(-3.5 + rng() * 7, 0.3 + rng() * 3.2, -1 + rng() * 5);
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xb4d2c8, size: 0.014, transparent: true, opacity: 0.23, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  group.add(dust);

  // Sparks inside the machining enclosure.
  const sparkCount = 90;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkSeed = new Float32Array(sparkCount * 3);
  const srng = mulberry32(660);
  for (let i = 0; i < sparkCount; i++) {
    sparkSeed[i * 3] = srng();
    sparkSeed[i * 3 + 1] = srng();
    sparkSeed[i * 3 + 2] = srng();
  }
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
  const sparkTex = canvasTexture(16, 16, (ctx) => {
    ctx.clearRect(0, 0, 16, 16);
    const grd = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grd.addColorStop(0, "rgba(255,243,194,1)");
    grd.addColorStop(0.35, "rgba(255,186,86,.9)");
    grd.addColorStop(1, "rgba(255,122,42,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 16, 16);
  });
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      color: 0xffb65e,
      size: 0.035,
      map: sparkTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    }),
  );
  group.add(sparks);

  // A low fill and a cold key, with the machine as a hot little planet.
  const hemi = new THREE.HemisphereLight(0x9bb9c0, 0x25312f, 0.68);
  group.add(hemi);
  const key = new THREE.SpotLight(0xd6ebe3, 128, 16, 0.85, 0.72, 2);
  key.position.set(2.5, 7, 4.2);
  key.target.position.set(0.5, 0.8, 0.2);
  key.castShadow = true;
  key.shadow.mapSize.set(1536, 1536);
  key.shadow.bias = -0.002;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 18;
  group.add(key, key.target);
  const coldFill = new THREE.DirectionalLight(0x82a8b5, 0.58);
  coldFill.position.set(4, 5, -6);
  group.add(coldFill);
  const amber = new THREE.PointLight(0xffa860, 5.2, 5.0, 2);
  amber.position.set(-2.8, 2.6, 2.8);
  group.add(amber);
  const frontFill = new THREE.DirectionalLight(0xb6c8c6, 0.48);
  frontFill.position.set(2.5, 3.4, 7);
  frontFill.target.position.set(-1, 1.1, 0.4);
  group.add(frontFill, frontFill.target);
  const tableKey = new THREE.PointLight(0xffd39e, 5.5, 3.6, 2);
  tableKey.position.set(3.2, 2.15, 1.5);
  group.add(tableKey);

  // Machine screen spill.
  const screenLight = new THREE.PointLight(0x7de1c8, 3.0, 3.0, 2);
  screenLight.position.set(1.0, 1.4, 1.9);
  group.add(screenLight);

  let machining = false;
  let pieceCount = 0;
  let caseOpen = false;

  const setMachining = (active: boolean): void => {
    machining = active;
  };
  const setPieces = (count: number): void => {
    pieceCount = Math.max(0, Math.min(36, Math.round(count)));
    table.pieces.visible = pieceCount > 0;
    table.pieces.count = pieceCount;
  };
  const setCaseOpen = (open: boolean): void => {
    caseOpen = open;
    table.caseLid.rotation.x = open ? -1.05 : 0;
    table.caseOpen.visible = open;
  };
  const setDustVial = (visible: boolean): void => {
    table.vial.visible = visible;
  };
  const setWorkpieces = (visible: boolean): void => {
    machine.rod.visible = visible;
  };

  const update = (time: number): void => {
    const t = time;
    const spin = machining ? t * 14.5 : t * 0.4;
    machine.rod.rotation.x = spin;
    machine.chuck.rotation.x = spin;
    machine.tool.position.x = 0.2 + Math.sin(t * 0.22) * 0.17;
    machine.rod.position.x = -0.35 + Math.sin(t * 0.08) * 0.015;
    (machine.tool.children[3] as THREE.Mesh).rotation.y = Math.sin(t * 2.1) * 0.1;
    table.caseLid.rotation.x = caseOpen ? -1.05 + Math.sin(t * 1.3) * 0.008 : 0;
    key.intensity = 128 * (0.98 + Math.sin(t * 1.8) * 0.014);
    machine.workLight.intensity = machining ? 13 * (0.8 + Math.sin(t * 12) * 0.1) : 5.2;
    machine.alarm.intensity = machining ? 0.08 : 0.22 + Math.abs(Math.sin(t * 1.7)) * 0.18;
    dust.position.y = Math.sin(t * 0.08) * 0.08;
    mist.position.x = -1.3 + Math.sin(t * 0.1) * 0.25;

    if (machining) {
      const origin = new THREE.Vector3(-1.1 + machine.tool.position.x, 1.28, 0.57);
      const arr = sparkGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < sparkCount; i++) {
        const p = (t * (0.8 + sparkSeed[i * 3] * 1.4) + sparkSeed[i * 3 + 2]) % 1;
        const x = origin.x - 0.16 + (sparkSeed[i * 3 + 1] - 0.5) * 0.2 + (sparkSeed[i * 3] - 0.5) * 0.34 * p;
        const y = origin.y + p * 0.14 - p * p * 0.35;
        const z = origin.z + 0.4 + p * (0.35 + sparkSeed[i * 3 + 2] * 0.55);
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      }
      sparkGeo.attributes.position.needsUpdate = true;
      sparks.visible = true;
    } else {
      sparks.visible = false;
    }
  };

  setPieces(0);
  setCaseOpen(false);
  update(0);

  return {
    group,
    zhang,
    update,
    setMachining,
    setPieces,
    setCaseOpen,
    setWorkpieces,
    setDustVial,
    machineScreen: machine.screen,
    machineGlass: machine.glass,
    cutRod: machine.rod,
  };
}
