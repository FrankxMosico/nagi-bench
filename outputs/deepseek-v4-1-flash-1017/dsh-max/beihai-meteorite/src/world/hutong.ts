import * as THREE from "three";
import { createFigure, voxelModel, voxelMaterial } from "@agentbench/voxel-kit";
import {
  addBatchedBoxes,
  addBox,
  addLabelPlane,
  addPlane,
  brickTexture,
  createStarfield,
  makeGlowSprite,
  makeMistSprite,
  mulberry32,
  setCamera,
  shadowify,
  stoneTexture,
  TAU,
  woodTexture,
} from "../lib/helpers";
import { createCollector, createZhang, type CollectorActor, type ZhangActor } from "../lib/characters";

export interface HutongWorld {
  group: THREE.Group;
  zhang: ZhangActor;
  collector: CollectorActor;
  update: (time: number, localTime: number) => void;
  setDoorOpen: (amount: number) => void;
  setMode: (mode: "dusk" | "night") => void;
  setCase: (visible: boolean) => void;
  doorWorldPosition: THREE.Vector3;
}

interface Leaf {
  origin: THREE.Vector3;
  phase: number;
  speed: number;
  drift: number;
  spin: number;
}

export function createHutongWorld(): HutongWorld {
  const group = new THREE.Group();
  group.name = "hutong";
  group.visible = false;

  const sceneRoot = new THREE.Group();
  group.add(sceneRoot);

  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTexture("#402a1b", [2, 2]),
    color: 0x8a5b3e,
    roughness: 0.85,
    metalness: 0.02,
  });
  const darkWood = new THREE.MeshStandardMaterial({
    map: woodTexture("#24160f", [1, 3]),
    color: 0x4d3224,
    roughness: 0.88,
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    map: stoneTexture([3, 10]),
    roughness: 0.95,
    metalness: 0,
    color: 0x8f877b,
  });
  const wallMat = new THREE.MeshStandardMaterial({
    map: brickTexture("#5f5a51", "#3d3933", [4, 3]),
    roughness: 0.95,
    metalness: 0,
  });
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x2f302c, roughness: 0.62, metalness: 0.55 });

  // Alley paving.
  addBox(sceneRoot, [7.2, 0.2, 26], [0, -0.12, -8], stoneMat, { receiveShadow: true, castShadow: false });
  const pathGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 22),
    new THREE.MeshBasicMaterial({
      color: 0x3c2a20,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  pathGlow.rotation.x = -Math.PI / 2;
  pathGlow.position.set(0, 0.002, -8);
  sceneRoot.add(pathGlow);

  // Side courtyard walls and their tiled caps.
  addBox(sceneRoot, [0.55, 3.15, 23], [-3.35, 1.55, -8.5], wallMat);
  addBox(sceneRoot, [0.55, 3.15, 23], [3.35, 1.55, -8.5], wallMat);
  addBox(sceneRoot, [0.72, 0.16, 23.2], [-3.35, 3.1, -8.5], ironMat);
  addBox(sceneRoot, [0.72, 0.16, 23.2], [3.35, 3.1, -8.5], ironMat);

  const roofBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  const roofRng = mulberry32(881);
  const tileColours = [0x353d40, 0x3d4548, 0x2d3538, 0x424a4b, 0x31393c];
  for (const side of [-1, 1]) {
    // Eave courses.
    for (let z = -20; z < 3; z += 0.45) {
      roofBoxes.push({
        position: [side * 3.55, 3.29 + roofRng() * 0.03, z],
        size: [0.5, 0.12, 0.46],
        color: tileColours[Math.floor(roofRng() * tileColours.length)]!,
      });
    }
    // Roofs behind the walls, at several depths.
    for (let k = 0; k < 4; k++) {
      const x = side * (4.2 + k * 1.25);
      const zBase = -19 + k * 5.2;
      const length = 7 + roofRng() * 5;
      const baseY = 3.4 + k * 0.23;
      for (let step = 0; step < 5; step++) {
        const stepX = x + side * step * 0.42;
        const y = baseY + step * 0.23;
        roofBoxes.push({
          position: [stepX, y, zBase + length / 2],
          size: [0.44, 0.16, length - step * 0.18],
          color: tileColours[(step + k) % tileColours.length]!,
          rotation: [0, 0, side * -0.08],
        });
      }
      roofBoxes.push({
        position: [x + side * 1.02, baseY + 1.04, zBase + length / 2],
        size: [0.16, 0.22, length - 0.8],
        color: 0x252c2e,
      });
      // Upturned corner ornaments.
      roofBoxes.push({
        position: [x + side * 1.2, baseY + 1.16, zBase + length - 0.2],
        size: [0.22, 0.45, 0.24],
        color: 0x242a2b,
      });
    }
    // A further city roofline.
    for (let i = 0; i < 12; i++) {
      const x2 = side * (8 + roofRng() * 7);
      const z = -25 + roofRng() * 25;
      const h = 2.8 + roofRng() * 3.2;
      roofBoxes.push({
        position: [x2, h / 2, z],
        size: [2 + roofRng() * 3, h, 2 + roofRng() * 4],
        color: 0x202a30,
      });
      roofBoxes.push({
        position: [x2, h + 0.18, z],
        size: [2.8 + roofRng() * 2.5, 0.22, 2.8 + roofRng() * 3],
        color: 0x313a3e,
      });
    }
  }
  addBatchedBoxes(sceneRoot, roofBoxes, { roughness: 0.91, metalness: 0.03 }, true, true);

  // A large gold-leaf tree behind the right-hand wall.
  const trunkBoxes: Parameters<typeof addBatchedBoxes>[1] = [
    { position: [4.25, 1.8, 5.4], size: [0.45, 3.6, 0.45], color: 0x423126 },
    { position: [4.1, 3.2, 5.4], size: [0.33, 2.1, 0.33], color: 0x4c3929, rotation: [0.1, 0, -0.32] },
    { position: [4.55, 3.45, 5.35], size: [0.26, 1.7, 0.26], color: 0x503b29, rotation: [0, 0, 0.54] },
  ];
  addBatchedBoxes(sceneRoot, trunkBoxes, { roughness: 0.96 }, true, true);
  const leafBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  const autumn = [0x7a5834, 0x92683b, 0x6b4e2d, 0xa77a45, 0x574128, 0x886136];
  const rngTree = mulberry32(909);
  for (let i = 0; i < 150; i++) {
    const r = 1.2 + rngTree() * 2.6;
    const theta = rngTree() * TAU;
    const y = 3.3 + rngTree() * 3.1 - r * 0.2;
    leafBoxes.push({
      position: [4.2 + Math.cos(theta) * r, y, 5.3 + Math.sin(theta) * r * 0.72],
      size: [0.32 + rngTree() * 0.38, 0.26 + rngTree() * 0.3, 0.32 + rngTree() * 0.32],
      color: autumn[Math.floor(rngTree() * autumn.length)]!,
      rotation: [rngTree() * 0.8, rngTree() * TAU, rngTree() * 0.6],
    });
  }
  addBatchedBoxes(sceneRoot, leafBoxes, { roughness: 0.95 }, true, true);

  // The gatehouse wall and tiled roof.
  addBox(sceneRoot, [2.1, 3.4, 0.55], [-2.55, 1.7, 2.0], wallMat);
  addBox(sceneRoot, [2.1, 3.4, 0.55], [2.55, 1.7, 2.0], wallMat);
  addBox(sceneRoot, [3.1, 0.65, 0.55], [0, 3.05, 2.0], wallMat);
  const gateRoof: Parameters<typeof addBatchedBoxes>[1] = [];
  for (let i = 0; i < 10; i++) {
    gateRoof.push({
      position: [0, 3.68 + i * 0.08, 2.0],
      size: [5.7 - i * 0.24, 0.13, 1.25 - i * 0.06],
      color: tileColours[i % tileColours.length]!,
      rotation: [0, 0, 0],
    });
  }
  gateRoof.push({ position: [0, 4.43, 2.0], size: [1.25, 0.25, 1.3], color: 0x252c2e });
  gateRoof.push({ position: [-2.95, 4.3, 2.0], size: [0.65, 0.52, 0.8], color: 0x283033 });
  gateRoof.push({ position: [2.95, 4.3, 2.0], size: [0.65, 0.52, 0.8], color: 0x283033 });
  addBatchedBoxes(sceneRoot, gateRoof, { roughness: 0.9, metalness: 0.04 }, true, true);

  // The gate itself. Warm interior beyond becomes a vertical slit of life.
  const doorway = new THREE.Group();
  doorway.position.set(0, 0, 2.0);
  sceneRoot.add(doorway);
  const glowBack = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.72),
    new THREE.MeshBasicMaterial({ color: 0xa75b2d, toneMapped: false }),
  );
  glowBack.position.set(0, 1.45, 0.4);
  glowBack.rotation.y = Math.PI;
  doorway.add(glowBack);
  const innerGlow = makeGlowSprite(0xffd29c, 5.2, 0.23);
  innerGlow.position.set(0, 1.5, 0.65);
  doorway.add(innerGlow);

  const doorMat = new THREE.MeshStandardMaterial({
    map: woodTexture("#6a2f1c", [1, 1]),
    color: 0xd06a44,
    roughness: 0.62,
    metalness: 0.04,
    emissive: 0x3b150c,
    emissiveIntensity: 0.35,
  });
  function makeDoorLeaf(side: -1 | 1): THREE.Group {
    const pivot = new THREE.Group();
    pivot.position.set(side * 1.18, 0, 0.18);
    doorway.add(pivot);
    const leaf = addBox(pivot, [1.2, 2.76, 0.14], [side * -0.6, 1.42, 0], doorMat, {
      castShadow: true,
    });
    // Painted door studs and central ring.
    const studGeo = new THREE.BoxGeometry(0.055, 0.055, 0.035);
    const studMat = new THREE.MeshStandardMaterial({ color: 0xd2a25d, metalness: 0.65, roughness: 0.35 });
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        const stud = new THREE.Mesh(studGeo, studMat);
        stud.position.set(side * -0.25 - col * 0.32, 2.15 - row * 0.36, -0.095);
        leaf.add(stud);
      }
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.016, 4, 10), studMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(side * -0.6, 1.28, -0.11);
    leaf.add(ring);
    return pivot;
  }
  const leftDoor = makeDoorLeaf(-1);
  const rightDoor = makeDoorLeaf(1);

  addBox(sceneRoot, [3.5, 0.21, 1.1], [0, 0.1, 1.8], ironMat, { castShadow: true });
  addBox(sceneRoot, [4.2, 0.16, 0.65], [0, 0.01, 0.65], ironMat, { castShadow: false });
  addBox(sceneRoot, [4.2, 0.16, 0.65], [0, 0.12, 0.19], ironMat, { castShadow: false });

  // Plaque.
  addLabelPlane(sceneRoot, [0, 3.33, 1.69], [0, Math.PI, 0], {
    width: 1.5,
    height: 0.45,
    text: "栖石斋",
    bg: "#261813",
    color: "#d7b275",
    size: 64,
    emissive: false,
  });

  // Warm lamps either side of the gate.
  const lanterns: THREE.PointLight[] = [];
  for (const x of [-1.85, 1.85]) {
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(x, 2.55, 1.56);
    sceneRoot.add(lanternGroup);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2f2118, roughness: 0.7 });
    addBox(lanternGroup, [0.03, 0.6, 0.03], [0, 0.3, 0], frameMat, { castShadow: false });
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xffb670, toneMapped: false });
    addBox(lanternGroup, [0.32, 0.42, 0.32], [0, 0, 0], lampMat, { castShadow: false });
    const capMat = new THREE.MeshStandardMaterial({ color: 0x221a13, roughness: 0.7 });
    addBox(lanternGroup, [0.42, 0.08, 0.42], [0, 0.25, 0], capMat);
    addBox(lanternGroup, [0.42, 0.08, 0.42], [0, -0.25, 0], capMat);
    const glow = makeGlowSprite(0xffa960, 1.25, 0.38);
    lanternGroup.add(glow);
    const light = new THREE.PointLight(0xffa45b, 10.5, 7, 2);
    light.position.set(0, 0, 0.2);
    lanternGroup.add(light);
    lanterns.push(light);
  }

  // Courtyard beyond: a warm lattice window glimpsed through the door.
  addBox(sceneRoot, [10, 0.15, 8], [0, -0.06, 6.5], stoneMat, { castShadow: false });
  addBox(sceneRoot, [10, 3.8, 0.3], [0, 1.9, 10.2], wallMat);
  addBox(sceneRoot, [7, 3.4, 0.2], [0, 1.9, 10.1], new THREE.MeshStandardMaterial({ color: 0x40352c, roughness: 0.9 }));
  const windowMat = new THREE.MeshBasicMaterial({ color: 0xe8a96d, toneMapped: false });
  addPlane(sceneRoot, [3.2, 1.9], [0, 1.85, 9.97], windowMat, [0, Math.PI, 0]);
  const courtyardLight = new THREE.PointLight(0xffb76f, 24, 12, 2);
  courtyardLight.position.set(0, 2.2, 6.6);
  sceneRoot.add(courtyardLight);
  const courtyardMist = makeMistSprite(5, 0.08);
  courtyardMist.position.set(0, 1.9, 5.5);
  sceneRoot.add(courtyardMist);
  const courtyardTree: Parameters<typeof addBatchedBoxes>[1] = [];
  const rngCourt = mulberry32(921);
  for (let i = 0; i < 30; i++) {
    courtyardTree.push({
      position: [3.4 + (rngCourt() - 0.5) * 2.4, 2.5 + rngCourt() * 2.7, 7.6 + (rngCourt() - 0.5) * 1.8],
      size: [0.34 + rngCourt() * 0.3, 0.28 + rngCourt() * 0.25, 0.3 + rngCourt() * 0.3],
      color: autumn[Math.floor(rngCourt() * autumn.length)]!,
      rotation: [rngCourt(), rngCourt() * TAU, rngCourt()],
    });
  }
  addBatchedBoxes(sceneRoot, courtyardTree, { roughness: 0.95 }, false, false);

  // Hutong clutter: bicycle, wires, a crate of coal.
  const bikeGroup = new THREE.Group();
  bikeGroup.position.set(2.65, 0, -7.4);
  bikeGroup.rotation.y = -0.12;
  sceneRoot.add(bikeGroup);
  const wheelGeo = new THREE.TorusGeometry(0.33, 0.026, 4, 12);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x171a1a, roughness: 0.72, metalness: 0.25 });
  for (const z of [-0.55, 0.55]) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.y = Math.PI / 2;
    wheel.position.set(0, 0.35, z);
    bikeGroup.add(wheel);
  }
  const bikeMat = new THREE.MeshStandardMaterial({ color: 0x2b3c3c, roughness: 0.55, metalness: 0.55 });
  addBox(bikeGroup, [0.04, 0.04, 1.1], [0, 0.58, 0], bikeMat, { castShadow: false });
  addBox(bikeGroup, [0.04, 0.43, 0.04], [0, 0.4, 0.45], bikeMat, { castShadow: false });
  addBox(bikeGroup, [0.04, 0.55, 0.04], [0, 0.58, -0.5], bikeMat, { castShadow: false });
  addBox(bikeGroup, [0.38, 0.04, 0.04], [0, 0.75, 0.42], bikeMat, { castShadow: false });

  const wireMat = new THREE.LineBasicMaterial({ color: 0x131a1c, transparent: true, opacity: 0.9 });
  for (let i = 0; i < 3; i++) {
    const points: THREE.Vector3[] = [];
    for (let x = -3; x <= 3.2; x += 0.25) {
      points.push(new THREE.Vector3(x, 5.2 + i * 0.35 + Math.sin(x * 1.4 + i) * 0.12, -4.5 - i * 3.7));
    }
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), wireMat);
    sceneRoot.add(line);
  }

  // Leftover boxes and a stool by the wall.
  const clutterMat = new THREE.MeshStandardMaterial({ color: 0x4c3927, roughness: 0.94 });
  addBox(sceneRoot, [0.6, 0.45, 0.45], [-2.7, 0.22, -10.6], clutterMat);
  addBox(sceneRoot, [0.55, 0.4, 0.42], [-2.6, 0.6, -10.5], clutterMat, { rotation: [0, 0.06, 0.02] });

  // Stars, visible when the same alley returns at night.
  const stars = createStarfield(450, 80, 130, 84);
  stars.visible = false;
  sceneRoot.add(stars);

  // Fog wisps and dust in the low sun.
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions: number[] = [];
  const dustRng = mulberry32(744);
  for (let i = 0; i < 110; i++) {
    dustPositions.push((dustRng() - 0.5) * 6.5, 0.2 + dustRng() * 3.6, -15 + dustRng() * 17);
  }
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xe8b783,
    size: 0.018,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  sceneRoot.add(dust);

  // Characters.
  const zhang = createZhang();
  zhang.setUniform();
  zhang.figure.root.position.set(-0.2, 0, -5.5);
  sceneRoot.add(zhang.figure.root);

  const collector = createCollector();
  collector.figure.root.position.set(0.25, 0, 5.3);
  collector.figure.root.rotation.y = Math.PI;
  sceneRoot.add(collector.figure.root);
  shadowify(collector.figure.root, false, true);

  // A small document case for the departure.
  const caseRig = new THREE.Group();
  const caseGeo = voxelModel({
    palette: {
      "#": 0x2a2a27,
      h: 0xa88d5a,
      d: 0x151616,
    },
    layers: [
      ["########", "########", "########", "########", "########", "########", "#h####h#", "########"],
      ["########", "########", "########", "########", "########", "########", "#h####h#", "########"],
      ["########", "########", "########", "########", "########", "########", "#h####h#", "########"],
    ],
    axis: "x",
    voxel: 0.3,
    anchor: "center",
  });
  const caseMesh = new THREE.Mesh(caseGeo, voxelMaterial({ roughness: 0.65, metalness: 0.2 }));
  caseMesh.position.set(0, -1.2, 0);
  caseRig.add(caseMesh);
  caseRig.visible = false;
  zhang.figure.anchors.handL.add(caseRig);

  // Lights.
  const hemi = new THREE.HemisphereLight(0xb0bcc7, 0x3b2d21, 1.02);
  sceneRoot.add(hemi);
  const sun = new THREE.DirectionalLight(0xffc88a, 3.25);
  sun.position.set(-8.5, 10.5, -5.5);
  sun.target.position.set(0, 0.3, 0.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1536, 1536);
  sun.shadow.camera.left = -9;
  sun.shadow.camera.right = 9;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -2;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 35;
  sun.shadow.bias = -0.0012;
  sceneRoot.add(sun, sun.target);
  const bounce = new THREE.PointLight(0x7d7e70, 3.8, 16, 2);
  bounce.position.set(0, 3.8, -8);
  sceneRoot.add(bounce);
  const cameraFill = new THREE.DirectionalLight(0x9eb8cb, 1.15);
  cameraFill.position.set(6, 4.5, -9);
  cameraFill.target.position.set(0, 1.2, 1.0);
  sceneRoot.add(cameraFill, cameraFill.target);
  const gateFill = new THREE.PointLight(0xffc583, 19, 8, 2);
  gateFill.position.set(0, 1.65, -0.3);
  sceneRoot.add(gateFill);

  // Falling leaves.
  const count = 52;
  const leafGeo = new THREE.BoxGeometry(0.075, 0.018, 0.11);
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0xb47d3f,
    roughness: 0.95,
    vertexColors: true,
  });
  const leavesMesh = new THREE.InstancedMesh(leafGeo, leafMat, count);
  leavesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  leavesMesh.castShadow = true;
  leavesMesh.frustumCulled = false;
  sceneRoot.add(leavesMesh);
  const leafRng = mulberry32(592);
  const leaves: Leaf[] = [];
  const tempColor = new THREE.Color();
  for (let i = 0; i < count; i++) {
    leaves.push({
      origin: new THREE.Vector3(-5.5 + leafRng() * 11, 3.4 + leafRng() * 2.2, -13 + leafRng() * 20),
      phase: leafRng() * TAU,
      speed: 0.32 + leafRng() * 0.45,
      drift: 0.5 + leafRng() * 1.2,
      spin: 0.5 + leafRng() * 1.2,
    });
    tempColor.setHex(autumn[Math.floor(leafRng() * autumn.length)]!);
    leavesMesh.setColorAt(i, tempColor);
  }
  if (leavesMesh.instanceColor) leavesMesh.instanceColor.needsUpdate = true;

  const dummy = new THREE.Object3D();
  let starOpacity = 0;
  let starsVisible = false;
  let doorAmount = 0;

  const doorWorldPosition = new THREE.Vector3(0, 1.4, 2.0);

  const setMode = (mode: "dusk" | "night"): void => {
    if (mode === "dusk") {
      hemi.intensity = 1.02;
      hemi.color.setHex(0xb0bcc7);
      sun.intensity = 3.25;
      sun.color.setHex(0xffc88a);
      bounce.intensity = 3.8;
      lanterns.forEach((l) => (l.intensity = 9.5));
      courtyardLight.intensity = 22;
      starsVisible = false;
      starOpacity = 0;
    } else {
      hemi.intensity = 0.34;
      hemi.color.setHex(0x6f89a4);
      sun.intensity = 0.34;
      sun.color.setHex(0x7897b7);
      bounce.intensity = 0.55;
      lanterns.forEach((l) => (l.intensity = 27));
      courtyardLight.intensity = 32;
      starsVisible = true;
      starOpacity = 0.8;
    }
    stars.visible = starsVisible;
    (stars.material as THREE.PointsMaterial).opacity = starOpacity;
  };
  setMode("dusk");

  const setDoorOpen = (amount: number): void => {
    doorAmount = Math.max(0, Math.min(1, amount));
    const ease = doorAmount * doorAmount * (3 - 2 * doorAmount);
    leftDoor.rotation.y = -ease * 1.24;
    rightDoor.rotation.y = ease * 1.24;
  };

  const update = (time: number, localTime: number): void => {
    // Leaves derive their positions from absolute time so seeking is exact.
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i]!;
      const fall = ((localTime * leaf.speed + leaf.phase) % 1.8) / 1.8;
      const x = leaf.origin.x + Math.sin(localTime * 0.5 + leaf.phase) * leaf.drift * 0.5 + fall * 0.6;
      const y = leaf.origin.y - fall * leaf.origin.y;
      const z = leaf.origin.z + Math.cos(localTime * 0.37 + leaf.phase) * leaf.drift * 0.3;
      dummy.position.set(x, Math.max(0.04, y), z);
      dummy.rotation.set(localTime * leaf.spin + leaf.phase, localTime * 0.7 + leaf.phase, Math.sin(localTime + leaf.phase));
      dummy.scale.setScalar(0.65 + 0.45 * Math.sin(leaf.phase * 9));
      dummy.updateMatrix();
      leavesMesh.setMatrixAt(i, dummy.matrix);
    }
    leavesMesh.instanceMatrix.needsUpdate = true;
    dust.position.y = Math.sin(time * 0.12) * 0.03;
    dust.position.x = Math.sin(time * 0.07) * 0.04;
  };

  update(0, 0);

  return {
    group,
    zhang,
    collector,
    update,
    setDoorOpen,
    setMode,
    setCase(visible: boolean) {
      caseRig.visible = visible;
    },
    doorWorldPosition,
  };
}

export function frameHutongShot(
  camera: THREE.PerspectiveCamera,
  localTime: number,
  mode: "approach" | "departure",
): void {
  if (mode === "approach") {
    const t = Math.min(1, Math.max(0, localTime / 17.5));
    const e = t * t * (3 - 2 * t);
    const posX = 1.6 - 1.15 * e + Math.sin(localTime * 0.25) * 0.035;
    const posY = 6.7 - 5.1 * e;
    const posZ = -14.4 + 10.4 * e;
    const tx = 0.1 + 0.3 * Math.sin(localTime * 0.15);
    const ty = 1.9 - 0.5 * e;
    const tz = -2.4 + 3.2 * e;
    setCamera(camera, [posX, posY, posZ], [tx, ty, tz], 38 + e * 4, -0.012 + e * 0.02);
  } else {
    const t = Math.min(1, Math.max(0, localTime / 14.5));
    const posX = 2.0 - t * 0.35;
    const posY = 1.3 + Math.sin(localTime * 0.31) * 0.02;
    const posZ = -6.8 + t * 0.45;
    setCamera(camera, [posX, posY, posZ], [-0.1, 1.5, 1.9], 35.5, 0.012);
  }
}
