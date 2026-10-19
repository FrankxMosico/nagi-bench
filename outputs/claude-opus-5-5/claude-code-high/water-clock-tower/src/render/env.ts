// Sky dome, distant ink-wash mountains, ground, lights and fog.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { skyTexture, mountainTexture, stoneTexture } from "./materials";
import { rng } from "../sim/sim";

export function buildEnvironment(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  const horizon = new THREE.Color(0xd8ccb2);
  scene.fog = new THREE.Fog(horizon, 24, 130);
  scene.background = horizon;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(300, 32, 16),
    new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false, depthWrite: false }),
  );
  sky.position.y = -60;
  scene.add(sky);

  // three layers of ink-wash mountains, farther = paler (not fogged: they are
  // painted with their own aerial perspective)
  const layers: [number, number, string, number][] = [
    [200, 52, "rgba(150,160,166,0.85)", 11],
    [160, 38, "rgba(112,124,130,0.92)", 23],
    [120, 24, "rgba(80,92,92,0.95)", 37],
  ];
  for (const [r, h, col, seed] of layers) {
    const t = mountainTexture(seed, col);
    t.repeat.set(2, 1);
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, h, 64, 1, true),
      new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.BackSide, fog: false, depthWrite: false }),
    );
    m.position.y = h / 2 - 4;
    m.renderOrder = -1;
    scene.add(m);
  }

  // ground: earth with soft variation, and a paved court around the tower
  const rnd = rng(5);
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#8a7d62";
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 260; i++) {
    const x = rnd() * 512, y = rnd() * 512, rr = 10 + rnd() * 40;
    const gr = g.createRadialGradient(x, y, 0, x, y, rr);
    const green = rnd() < 0.5;
    gr.addColorStop(0, green ? "rgba(96,110,70,0.35)" : "rgba(120,104,80,0.3)");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(x - rr, y - rr, rr * 2, rr * 2);
  }
  for (let i = 0; i < 5000; i++) {
    const v = 100 + rnd() * 50;
    g.fillStyle = `rgba(${v},${v - 8},${v - 26},0.22)`;
    g.fillRect(rnd() * 512, rnd() * 512, 2, 2);
  }
  const gt = new THREE.CanvasTexture(c);
  gt.colorSpace = THREE.SRGBColorSpace;
  gt.wrapS = gt.wrapT = THREE.RepeatWrapping;
  gt.repeat.set(30, 30);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(230, 64), new THREE.MeshStandardMaterial({ map: gt, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.63;
  ground.receiveShadow = true;
  scene.add(ground);
  const pave = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshStandardMaterial({ map: (() => {
    const t = stoneTexture(9);
    t.repeat.set(9, 9);
    return t;
  })(), roughness: 0.95, color: 0xd8d0c0 }));
  pave.rotation.x = -Math.PI / 2;
  pave.position.set(0, -0.62, 0);
  pave.receiveShadow = true;
  scene.add(pave);

  // stylised pines and cypresses around the court (kept out of the camera paths)
  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.2, 1, 6);
  const crownGeo = new THREE.ConeGeometry(1, 1, 7);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3828, roughness: 0.9 });
  const crownMat = new THREE.MeshStandardMaterial({ color: 0x4b5a45, roughness: 0.9, flatShading: true });
  const crownMat2 = new THREE.MeshStandardMaterial({ color: 0x38473a, roughness: 0.9, flatShading: true });
  const trees = new THREE.Group();
  let placed = 0;
  for (let i = 0; i < 400 && placed < 46; i++) {
    const a = rnd() * Math.PI * 2;
    const r = 15 + rnd() * 30;
    // azimuth measured like the camera paths: 0° = +x (front), 90° = −z
    const deg = ((Math.atan2(-Math.sin(a), Math.cos(a)) * 180) / Math.PI + 360) % 360;
    // keep the front views open, and keep the escapement side (−z) clear so
    // the close-ups look out onto open ground rather than into a tree
    const clear = deg < 110 || deg > 300;
    if (clear && r < 48) continue;
    if (deg >= 110 && deg < 170 && r < 38) continue;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = 4 + rnd() * 5;
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.scale.set(1, h * 0.45, 1);
    trunk.position.y = h * 0.22;
    t.add(trunk);
    const tiers = 3;
    for (let k = 0; k < tiers; k++) {
      const cone = new THREE.Mesh(crownGeo, k % 2 ? crownMat2 : crownMat);
      const s = (1.6 - k * 0.38) * (h / 7);
      cone.scale.set(s * 1.3, h * 0.32, s * 1.3);
      cone.position.y = h * (0.42 + k * 0.2);
      cone.castShadow = true;
      t.add(cone);
    }
    t.position.set(x, -0.62, z);
    t.rotation.y = rnd() * 6;
    trees.add(t);
    placed++;
  }
  scene.add(trees);

  // lights
  const hemi = new THREE.HemisphereLight(0xe8eef5, 0x5b4a38, 1.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe0b0, 2.6);
  sun.position.set(14, 22, -9);
  sun.target.position.set(0, 4, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -9; sc.right = 9; sc.top = 12; sc.bottom = -4; sc.near = 5; sc.far = 60;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0xb9c8e0, 0.7);
  fill.position.set(10, 6, 12);
  scene.add(fill);
  // warm lamps inside the storeys so the cut-away interior reads clearly
  const lamp1 = new THREE.PointLight(0xffc98a, 9, 9, 1.6);
  lamp1.position.set(2.6, 3.4, -1.0);
  const lamp2 = new THREE.PointLight(0xffc98a, 6, 7, 1.6);
  lamp2.position.set(2.4, 6.0, 0.2);
  const lamp3 = new THREE.PointLight(0xffd6a0, 6, 7, 1.6);
  lamp3.position.set(2.2, 8.4, -1.0);
  const lamp4 = new THREE.PointLight(0xffd2a0, 7, 7, 1.6);
  lamp4.position.set(-1.7, 4.0, 1.4);
  scene.add(lamp1, lamp2, lamp3, lamp4);
  return { sun, hemi, lamps: [lamp1, lamp2, lamp3, lamp4] };
}
