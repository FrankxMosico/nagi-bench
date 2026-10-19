// 机械部件的可视化：每个物理刚体对应一组网格，每帧只读取刚体位姿来摆放。
import * as THREE from "three";
import { Builder, type V3 } from "./builder";
import { litMat, placardTexture, type LitMat, type Materials } from "./materials";
import {
  P, JL, W_FRONT, WHEEL_C, NORIA, W, derived, polarY, rot2, type Machine, type Vec,
} from "../physics/machine";

type RBody = Machine["wheel"];

const D = derived();
const tmpV = new THREE.Vector3();
const tmpQ = new THREE.Quaternion();
const tmpM = new THREE.Matrix4();
const ONE = new THREE.Vector3(1, 1, 1);

// 时辰牌的起始方位：-75° 再补偿机轮在开机时咬合齿隙造成的约 3° 超前
const PLACARD0 = (-75 + 3.3) * (Math.PI / 180);

export const SHICHEN = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function syncGroup(g: THREE.Object3D, b: RBody) {
  const t = b.translation(), r = b.rotation();
  g.position.set(t.x, t.y, t.z);
  g.quaternion.set(r.x, r.y, r.z, r.w);
}

/** 可高亮的材质副本 */
function hl(mat: LitMat) {
  const m = mat.clone();
  m.emissive = new THREE.Color(0xffc060);
  m.emissiveIntensity = 0;
  return m;
}

export class MachineVisuals {
  root = new THREE.Group();
  private m!: Machine;
  private wheelG: THREE.Group;
  private forkG: THREE.Group;
  private balG: THREE.Group;
  private tianzhuG: THREE.Group;
  private jilunG: THREE.Group;
  private jackG: THREE.Group[] = [];
  private poleG: { stub: THREE.Group; c1: THREE.Group; mid: THREE.Group; c2: THREE.Group; obj: THREE.Group }[] = [];
  private noriaG: THREE.Group;
  private bucketMeshes: THREE.InstancedMesh[] = [];
  private bucketLocal: THREE.Matrix4[] = [];
  private waterMesh: THREE.InstancedMesh;
  private streamMesh!: THREE.Mesh;
  private streamPts: THREE.Vector3[] = [];
  private readonly streamN = 28;
  private chainMesh: THREE.InstancedMesh;
  private chainN = 26;
  readonly hlMats: Record<string, LitMat[]> = {};
  private hlLevel: Record<string, number> = {};
  private hlSmooth: Record<string, number> = {};
  fillingBucket = 0;

  constructor(private mats: Materials) {
    const M = mats;
    const mk = (key: string, base: LitMat) => {
      const m = hl(base);
      (this.hlMats[key] ??= []).push(m);
      return m;
    };
    // ---------------------------------------------------------------- 枢轮
    {
      const b = new Builder();
      const wood = mk("wheel", M.woodLight);
      (wood as THREE.MeshStandardMaterial).color = new THREE.Color(0xb8a088);
      const iron = mk("wheel", M.iron);
      const bronze = mk("cross", M.gold);
      const AX: V3 = [Math.PI / 2, 0, 0];
      b.add(new THREE.CylinderGeometry(0.11, 0.11, 1.85, 12), iron, [0, 0, -0.17], AX);
      b.add(new THREE.CylinderGeometry(0.34, 0.34, 0.62, 16), wood, [0, 0, 0], AX);
      for (const w of [-0.29, 0.29]) b.add(new THREE.CylinderGeometry(0.355, 0.355, 0.05, 16), iron, [0, 0, w], AX);
      for (let k = 0; k < D.n; k++) {
        const a = D.thetaFill + k * D.phi;
        const r0 = 0.32, r1 = P.rCross + 0.05;
        const rm = (r0 + r1) / 2;
        for (const s of [-1, 1]) {
          b.box([r1 - r0, 0.075, 0.055], wood, [rm * Math.cos(a), rm * Math.sin(a), s * (P.bucketHalfW + 0.03)], [0, 0, a]);
        }
        // 横档
        b.add(new THREE.CylinderGeometry(P.crossR, P.crossR, P.crossHalfW * 2 + 0.06, 10), bronze,
          [P.rCross * Math.cos(a), P.rCross * Math.sin(a), 0], AX);
        // 水斗枢轴
        const [pu, pv] = rot2(P.rPivot, D.t0, a);
        b.add(new THREE.CylinderGeometry(0.028, 0.028, 0.52, 8), iron, [pu, pv, 0], AX);
      }
      for (const s of [-1, 1]) {
        b.add(new THREE.TorusGeometry(1.47, 0.04, 6, 96), wood, [0, 0, s * (P.bucketHalfW + 0.03)]);
        b.add(new THREE.TorusGeometry(0.85, 0.035, 6, 64), wood, [0, 0, s * (P.bucketHalfW + 0.03)]);
      }
      // 冠齿轮（地毂）
      const crownDisk = mk("crown", M.woodDark);
      const crownTooth = mk("crown", M.bronze);
      b.add(new THREE.CylinderGeometry(P.crownR + 0.08, P.crownR + 0.08, 0.06, 32), crownDisk, [0, 0, P.crownW + 0.03], AX);
      for (let k = 0; k < D.n; k++) {
        const a = D.crownPhase + k * D.crownPitch;
        b.box([0.09, P.crownToothHalfT * 2, P.crownToothLen], crownTooth,
          [P.crownR * Math.cos(a), P.crownR * Math.sin(a), P.crownW - P.crownToothLen / 2], [0, 0, a]);
      }
      this.wheelG = b.build();
      this.root.add(this.wheelG);
    }
    // ---------------------------------------------------------------- 水斗（实例化）
    {
      const L = P.bucketLen, Dp = P.bucketDepth, hw = P.bucketHalfW, t = P.wall;
      const wood = new Builder();
      // 水斗为实例化网格：高亮只通过实例颜色作用于正在注水的那一只
      const plank = hl(M.woodMid);
      wood.box([L, t, hw * 2], plank, [L / 2, -t / 2, 0]);
      wood.box([t, Dp, hw * 2], plank, [t / 2, Dp / 2, 0]);
      wood.box([t, Dp, hw * 2], plank, [L - t / 2, Dp / 2, 0]);
      // 剖视：只画背面侧板，朝镜头一侧敞开，便于看到斗中的水（碰撞体仍是封闭的斗）
      wood.box([L, Dp, t], plank, [L / 2, Dp / 2, -(hw - t / 2)]);
      wood.box([L, Dp * 0.18, t], plank, [L / 2, Dp * 0.09, hw - t / 2]);
      const metal = new Builder();
      const band = hl(M.bronze);
      metal.box([L + 0.02, 0.03, 0.035], band, [L / 2, Dp * 0.18, hw - 0.012]);
      metal.box([L + 0.02, 0.03, 0.035], band, [L / 2, Dp - 0.015, -hw + 0.012]);
      metal.box([0.035, 0.03, hw * 2], band, [0.012, Dp - 0.015, 0]);
      metal.box([0.035, 0.03, hw * 2], band, [L - 0.012, Dp - 0.015, 0]);
      metal.box([0.056, 0.044, 0.14], band, [L - 0.05, -t - 0.022, hw + 0.06]);
      metal.add(new THREE.CylinderGeometry(0.045, 0.045, hw * 2 + 0.04, 10), band, [0, 0, 0], [Math.PI / 2, 0, 0]);
      for (const g of [wood.build(), metal.build()]) {
        const src = g.children[0] as THREE.Mesh;
        const im = new THREE.InstancedMesh(src.geometry, src.material, D.n);
        im.castShadow = true;
        im.receiveShadow = true;
        im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        im.frustumCulled = false;
        this.bucketMeshes.push(im);
        this.root.add(im);
      }
      for (let k = 0; k < D.n; k++) {
        this.bucketLocal.push(new THREE.Matrix4().makeRotationZ(D.thetaFill + k * D.phi));
      }
    }
    // ---------------------------------------------------------------- 枢衡 + 枢权 + 格叉
    {
      const b = new Builder();
      const red = mk("fork", M.red);
      const brz = mk("fork", M.bronze);
      const wt = mk("forkWeight", M.darkBronze);
      const beamL = -P.forkCwArm - 0.1, beamR = P.forkChainArm + 0.06;
      b.box([beamR - beamL, 0.11, 0.1], red, [(beamR + beamL) / 2, 0, W_FRONT]);
      b.box([0.1, 0.035, 0.16], brz, [P.forkArm, 0.012, W_FRONT - 0.09]);
      for (const dx of [-0.04, 0.04]) b.box([0.02, 0.05, 0.03], brz, [P.forkArm + dx, 0.045, W_FRONT - 0.16]);
      b.add(new THREE.CylinderGeometry(0.065, 0.065, 0.16, 12), M.iron, [0, 0, W_FRONT], [Math.PI / 2, 0, 0]);
      b.rod([-P.forkCwArm, 0, W_FRONT], [-P.forkCwArm, -0.08, W_FRONT], 0.012, M.iron);
      b.add(new THREE.CylinderGeometry(0.1, 0.12, 0.24, 14), wt, [-P.forkCwArm, -0.12, W_FRONT]);
      b.add(new THREE.TorusGeometry(0.03, 0.01, 6, 12), M.iron, [P.forkChainArm, 0.045, W_FRONT], [0, Math.PI / 2, 0]);
      this.forkG = b.build();
      this.root.add(this.forkG);
    }
    // ---------------------------------------------------------------- 天衡 + 天关 + 天权
    {
      const b = new Builder();
      const red = mk("bal", M.red);
      const pawl = mk("pawl", M.bronze);
      const wt = mk("bal", M.darkBronze);
      const BR = P.balRaise;
      const bl = -P.pawlArm - 0.3, br = P.balChainArm + 0.06;
      b.box([br - bl, 0.11, 0.1], red, [(br + bl) / 2, BR, W_FRONT]);
      // 竖板：把抬高的横梁连到支点
      b.box([0.1, BR, 0.09], red, [0, BR / 2, W_FRONT]);
      b.beam([-0.45, BR - 0.05, W_FRONT], [0, 0.05, W_FRONT], 0.05, 0.06, red);
      b.beam([0.45, BR - 0.05, W_FRONT], [0, 0.05, W_FRONT], 0.05, 0.06, red);
      // 天关：从梁端垂下的铜块，下端伸到横档所在的平面
      const hz = (W_FRONT + 0.16) / 2, cz = (W_FRONT - 0.16) / 2 - 0.02;
      const hy = (BR + 0.05) / 2;
      b.box([0.1, hy * 2, hz * 2], pawl, [-P.pawlArm, hy - 0.05, cz]);
      b.box([0.14, 0.05, 0.12], pawl, [-P.pawlArm, BR + 0.08, W_FRONT]);
      b.add(new THREE.CylinderGeometry(0.09, 0.11, 0.2, 14), wt, [-P.pawlArm - 0.2, BR - 0.14, W_FRONT]);
      b.add(new THREE.CylinderGeometry(0.065, 0.065, 0.16, 12), M.iron, [0, 0, W_FRONT], [Math.PI / 2, 0, 0]);
      b.add(new THREE.TorusGeometry(0.03, 0.01, 6, 12), M.iron, [P.balChainArm, BR - 0.045, W_FRONT], [0, Math.PI / 2, 0]);
      this.balG = b.build();
      this.root.add(this.balG);
    }
    // ---------------------------------------------------------------- 天条（链）
    {
      const linkGeo = new THREE.TorusGeometry(0.052, 0.016, 6, 12);
      linkGeo.scale(1, 1.6, 1);
      this.chainMesh = new THREE.InstancedMesh(linkGeo, mk("chain", M.iron), this.chainN);
      this.chainMesh.castShadow = true;
      this.chainMesh.frustumCulled = false;
      this.root.add(this.chainMesh);
    }
    // ---------------------------------------------------------------- 天柱
    {
      const b = new Builder();
      const shaft = mk("tianzhu", M.lacquer);
      const brz = mk("tianzhu", M.bronze);
      const wood = mk("tianzhu", M.woodDark);
      b.add(new THREE.CylinderGeometry(0.1, 0.1, 6.25, 8), shaft, [0, 2.975, 0]);
      for (let y = 0.4; y < 6.0; y += 0.8) b.add(new THREE.CylinderGeometry(0.115, 0.115, 0.05, 8), brz, [0, y, 0]);
      for (const dy of [-0.115, 0.115]) b.add(new THREE.CylinderGeometry(D.lanternR + 0.07, D.lanternR + 0.07, 0.035, 24), wood, [0, dy, 0]);
      for (let k = 0; k < P.lanternN; k++) {
        const p = polarY(D.lanternR, D.lanternPhase + (k * 2 * Math.PI) / P.lanternN);
        b.add(new THREE.CylinderGeometry(P.lanternPinR, P.lanternPinR, 0.2, 10), brz, [p.x, 0, p.z]);
      }
      const gear = (y: number, dir: number) => {
        b.add(new THREE.CylinderGeometry(P.spurR1 - 0.06, P.spurR1 - 0.06, 0.1, 24), wood, [0, y, 0]);
        for (let k = 0; k < P.spurN1; k++) {
          const a = D.driverPhase(dir) + (k * 2 * Math.PI) / P.spurN1;
          const p = polarY(P.spurR1, a);
          b.box([0.16, 0.1, D.toothHalfT * 2], brz, [p.x, y, p.z], [0, a, 0]);
        }
      };
      gear(D.spurAY - D.tianzhu.y, D.jilunAng);
      gear(D.globeGearY - D.tianzhu.y, D.globeDir);
      gear(D.armGearY - D.tianzhu.y, D.globeDir);
      this.tianzhuG = b.build();
      this.root.add(this.tianzhuG);
    }
    // ---------------------------------------------------------------- 机轮（报时轮）
    {
      const b = new Builder();
      const wood = mk("jilun", M.woodLight);
      const brz = mk("jilun", M.bronze);
      const peg = mk("peg", M.gold);
      const JC = D.jilun;
      b.add(new THREE.CylinderGeometry(0.12, 0.12, 3.85, 10), mk("jilun", M.lacquer), [0, 1.925, 0]);
      const gy = D.spurAY - JC.y;
      b.add(new THREE.CylinderGeometry(P.spurR2 - 0.06, P.spurR2 - 0.06, 0.1, 40), wood, [0, gy, 0]);
      for (let k = 0; k < P.spurN2; k++) {
        const a = D.drivenPhase(D.jilunAng) + (k * 2 * Math.PI) / P.spurN2;
        const p = polarY(P.spurR2, a);
        b.box([0.16, 0.1, D.toothHalfT * 2], brz, [p.x, gy, p.z], [0, a, 0]);
      }
      // 拨牙轮盘（击鼓拨牙在上层，敲钟拨牙在下层）
      const py = JL.pegY - JC.y;
      b.add(new THREE.CylinderGeometry(JL.pegR - 0.01, JL.pegR - 0.01, 0.27, 40), wood, [0, py - JL.bellDrop / 2, 0]);
      for (const y of [py + 0.13, py - JL.bellDrop - 0.13]) b.add(new THREE.CylinderGeometry(JL.pegR + 0.01, JL.pegR + 0.01, 0.025, 40), brz, [0, y, 0]);
      for (const pg of this.pegAnglesStatic()) {
        const p = polarY(JL.pegR + JL.pegLen / 2, pg.ang);
        b.box([JL.pegLen, JL.pegRad * 2, JL.pegRad * 2], peg, [p.x, pg.y - JC.y, p.z], [0, pg.ang, 0]);
      }
      // 时辰牌木人转盘
      const ry = JL.placardY - JC.y;
      b.add(new THREE.CylinderGeometry(JL.placardR + 0.1, JL.placardR + 0.1, 0.06, 48), wood, [0, ry - 0.3, 0]);
      b.add(new THREE.CylinderGeometry(JL.placardR + 0.12, JL.placardR + 0.12, 0.03, 48), brz, [0, ry - 0.26, 0]);
      // 轮辐
      for (const y of [gy, py - JL.bellDrop / 2, ry - 0.3]) {
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          const p = polarY(0.5, a);
          b.box([0.8, 0.06, 0.06], wood, [p.x, y, p.z], [0, a, 0]);
        }
      }
      // 时辰牌木人：每 30° 一个，持牌朝外
      for (let k = 0; k < 12; k++) {
        const a = PLACARD0 + k * (Math.PI / 6);
        const p = polarY(JL.placardR - 0.08, a);
        const robe = k % 3 === 0 ? M.robeRed : k % 3 === 1 ? M.robeBlue : M.robeGreen;
        b.add(new THREE.CylinderGeometry(0.06, 0.09, 0.3, 10), robe, [p.x, ry - 0.11, p.z]);
        b.add(new THREE.SphereGeometry(0.055, 12, 10), M.skin, [p.x, ry + 0.09, p.z]);
        b.add(new THREE.CylinderGeometry(0.035, 0.06, 0.05, 10), M.black, [p.x, ry + 0.15, p.z]);
      }
      this.jilunG = b.build();
      // 时辰牌（每块单独贴图）
      const shichenStart = 8; // 第一个转到窗口的是“申”，影片中段恰好转到“子时”
      for (let k = 0; k < 12; k++) {
        const a = PLACARD0 + k * (Math.PI / 6);
        const p = polarY(JL.placardR + 0.04, a);
        const tex = placardTexture(SHICHEN[(shichenStart + k) % 12] + "时");
        const mat = litMat({ map: tex, roughness: 0.8, emissive: new THREE.Color(0x553311), emissiveIntensity: 0.25 });
        const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.34), mat);
        plate.position.set(p.x, ry + 0.02, p.z);
        plate.rotation.y = a + Math.PI / 2;
        plate.castShadow = true;
        this.jilunG.add(plate);
      }
      this.root.add(this.jilunG);
    }
    // ---------------------------------------------------------------- 木人（只有持槌的手臂随刚体转动）
    for (const kind of ["drum", "bell"] as const) {
      const b = new Builder();
      const arm = mk(kind === "drum" ? "jackDrum" : "jackBell", M.robeRed);
      const wood = mk(kind === "drum" ? "jackDrum" : "jackBell", M.woodMid);
      const head = mk(kind === "drum" ? "jackDrum" : "jackBell", kind === "drum" ? M.woodDark : M.bronze);
      const tip = kind === "drum" ? [-0.2, 0.44] : [-0.22, 0.38];
      b.rod([0, 0, 0.13], [tip[0] * 0.45, tip[1] * 0.45, 0.13], 0.035, arm);
      b.add(new THREE.SphereGeometry(0.04, 10, 8), M.skin, [tip[0] * 0.45, tip[1] * 0.45, 0.13]);
      b.rod([tip[0] * 0.4, tip[1] * 0.4, 0.12], [tip[0], tip[1], 0.12], 0.015, wood);
      if (kind === "drum") b.add(new THREE.SphereGeometry(0.05, 12, 10), head, [tip[0], tip[1], 0.12]);
      else b.add(new THREE.CylinderGeometry(0.035, 0.035, 0.12, 10), head, [tip[0], tip[1], 0.12], [Math.PI / 2, 0, 0]);
      this.jackG.push(b.build());
    }
    for (const g of this.jackG) this.root.add(g);
    // ---------------------------------------------------------------- 浑象、浑仪的传动件与本体
    for (let i = 0; i < 2; i++) {
      const isGlobe = i === 0;
      const stub = new Builder();
      const brz = mk(isGlobe ? "globeDrive" : "armDrive", M.bronze);
      const wood = mk(isGlobe ? "globeDrive" : "armDrive", M.woodLight);
      const gearY = isGlobe ? D.globeGearY : D.armGearY;
      const j1 = isGlobe ? D.globeJ1Y : D.armJ1Y;
      stub.add(new THREE.CylinderGeometry(0.05, 0.05, j1 - gearY + 0.1, 8), brz, [0, (j1 - gearY - 0.1) / 2, 0]);
      stub.add(new THREE.CylinderGeometry(P.spurR2 - 0.06, P.spurR2 - 0.06, 0.1, 40), wood, [0, 0, 0]);
      for (let k = 0; k < P.spurN2; k++) {
        const a = D.drivenPhase(D.globeDir) + (k * 2 * Math.PI) / P.spurN2;
        const p = polarY(P.spurR2, a);
        stub.box([0.16, 0.1, D.toothHalfT * 2], brz, [p.x, 0, p.z], [0, a, 0]);
      }
      for (let k = 0; k < 6; k++) {
        const p = polarY(0.5, (k / 6) * Math.PI * 2);
        stub.box([0.85, 0.05, 0.05], wood, [p.x, 0, p.z], [0, (k / 6) * Math.PI * 2, 0]);
      }
      const cross = () => {
        const c = new Builder();
        c.box([0.16, 0.035, 0.035], brz);
        c.box([0.035, 0.035, 0.16], brz);
        c.add(new THREE.SphereGeometry(0.035, 10, 8), brz);
        return c.build();
      };
      const mid = new Builder();
      const bdir = new THREE.Vector3(0, 1, 0).add(new THREE.Vector3(D.polar.x, D.polar.y, D.polar.z)).normalize();
      mid.rod([-bdir.x * D.midLen / 2, -bdir.y * D.midLen / 2, -bdir.z * D.midLen / 2], [bdir.x * D.midLen / 2, bdir.y * D.midLen / 2, bdir.z * D.midLen / 2], 0.035, brz);
      const obj = new Builder();
      const c = new THREE.Vector3(D.polar.x, D.polar.y, D.polar.z);
      const qPole = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), c);
      const dist = isGlobe ? 0.98 : 1.12;
      obj.rod([-c.x * dist, -c.y * dist, -c.z * dist], [c.x * 1.05, c.y * 1.05, c.z * 1.05], 0.03, brz);
      if (isGlobe) {
        obj.add(new THREE.SphereGeometry(0.75, 48, 32), mk("globe", M.globe), [0, 0, 0], qPole);
      } else {
        // 四游仪：绕极轴转动的双环 + 窥管
        const ringMat = mk("armillary", M.bronze);
        const n0 = new THREE.Vector3().crossVectors(c, new THREE.Vector3(1, 0, 0)).normalize();
        const qRing = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n0);
        for (const s of [-0.035, 0.035]) obj.add(new THREE.TorusGeometry(0.86, 0.022, 8, 96), ringMat, [n0.x * s, n0.y * s, n0.z * s], qRing);
        const tube = new THREE.Vector3(1, 0, 0);
        obj.rod([-tube.x * 0.8, 0, 0], [tube.x * 0.8, 0, 0], 0.035, mk("armillary", M.gold));
        obj.add(new THREE.SphereGeometry(0.06, 12, 10), ringMat);
      }
      const g = {
        stub: stub.build(), c1: cross(), mid: mid.build(), c2: cross(), obj: obj.build(),
      };
      this.poleG.push(g);
      this.root.add(g.stub, g.c1, g.mid, g.c2, g.obj);
    }
    // ---------------------------------------------------------------- 升水轮
    {
      const b = new Builder();
      const wood = mk("noria", M.woodMid);
      const AX: V3 = [Math.PI / 2, 0, 0];
      b.add(new THREE.CylinderGeometry(0.1, 0.1, 1.0, 10), M.iron, [0, 0, 0], AX);
      b.add(new THREE.CylinderGeometry(0.28, 0.28, 0.5, 14), wood, [0, 0, 0], AX);
      for (const s of [-0.22, 0.22]) b.add(new THREE.TorusGeometry(NORIA.r - 0.05, 0.05, 6, 96), wood, [0, 0, s]);
      for (let k = 0; k < 12; k++) {
        const a = (k / 12) * Math.PI * 2;
        for (const s of [-0.22, 0.22]) b.box([NORIA.r - 0.3, 0.07, 0.05], wood, [Math.cos(a) * NORIA.r * 0.5, Math.sin(a) * NORIA.r * 0.5, s], [0, 0, a]);
      }
      for (let k = 0; k < 24; k++) {
        const a = (k / 24) * Math.PI * 2;
        const r = NORIA.r + 0.05;
        b.box([0.22, 0.16, 0.4], k % 2 ? M.woodLight : wood, [Math.cos(a) * r, Math.sin(a) * r, 0], [0, 0, a]);
      }
      // 摇柄
      b.rod([0, 0, 0.5], [0, 0, 0.7], 0.05, M.iron);
      b.rod([0, 0, 0.7], [0.45, 0, 0.7], 0.04, M.iron);
      b.rod([0.45, 0, 0.7], [0.45, 0, 0.95], 0.035, wood);
      this.noriaG = b.build();
      this.root.add(this.noriaG);
    }
    // ---------------------------------------------------------------- 出水口的连续水柱（沿抛物线，每帧按射线检测截断在水斗处）
    {
      const sp = W(D.spoutUV.u, D.spoutUV.v, 0);
      const v0 = new THREE.Vector3(0, D.spoutVel.v, D.spoutVel.u);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= this.streamN; i++) {
        const tt = (i / this.streamN) * 0.62;
        pts.push(new THREE.Vector3(sp.x, sp.y, sp.z).addScaledVector(v0, tt).add(new THREE.Vector3(0, -4.905 * tt * tt, 0)));
      }
      this.streamPts = pts;
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), this.streamN * 2, 0.032, 6, false);
      this.streamMesh = new THREE.Mesh(geo, this.mats.water);
      this.streamMesh.frustumCulled = false;
      this.root.add(this.streamMesh);
    }
    // ---------------------------------------------------------------- 水滴
    {
      const geo = new THREE.SphereGeometry(P.waterR * 1.3, 10, 8);
      this.waterMesh = new THREE.InstancedMesh(geo, this.mats.water, 700);
      this.waterMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.waterMesh.frustumCulled = false;
      this.waterMesh.castShadow = false;
      this.root.add(this.waterMesh);
    }
  }

  private pegAnglesStatic() {
    const front = -Math.PI / 2;
    const up = 5.5 * (Math.PI / 180);
    const out: { ang: number; y: number }[] = [];
    for (let k = 0; k < 12; k++) {
      out.push({ ang: front + up + (15 + k * 30) * (Math.PI / 180), y: JL.pegY });
      out.push({ ang: front + (JL.bellOffsetDeg + 30 + k * 30) * (Math.PI / 180) + up, y: JL.pegY - JL.bellDrop });
    }
    return out;
  }

  bind(m: Machine) {
    this.m = m;
  }

  setHighlight(key: string, level: number) {
    this.hlLevel[key] = level;
  }

  update(time: number) {
    const m = this.m;
    syncGroup(this.wheelG, m.wheel);
    syncGroup(this.forkG, m.fork);
    syncGroup(this.balG, m.bal);
    syncGroup(this.tianzhuG, m.tianzhu);
    syncGroup(this.jilunG, m.jilun);
    syncGroup(this.noriaG, m.noria);
    m.jacks.forEach((j, i) => syncGroup(this.jackG[i], j.body));
    const poles = [m.globe, m.armillary];
    poles.forEach((p, i) => {
      const g = this.poleG[i];
      syncGroup(g.stub, p.stub);
      syncGroup(g.c1, p.cross1);
      syncGroup(g.mid, p.mid);
      syncGroup(g.c2, p.cross2);
      syncGroup(g.obj, p.obj);
    });
    // 水斗：实例矩阵 = 刚体位姿 × 工位旋转
    let best = 0, bestD = 1e9;
    m.buckets.forEach((bk, k) => {
      const t = bk.body.translation(), r = bk.body.rotation();
      tmpM.compose(tmpV.set(t.x, t.y, t.z), tmpQ.set(r.x, r.y, r.z, r.w), ONE).multiply(this.bucketLocal[k]);
      for (const im of this.bucketMeshes) im.setMatrixAt(k, tmpM);
      // 找出当前位于注水位的水斗
      const rel = new THREE.Vector3(t.x - WHEEL_C.x, t.y - WHEEL_C.y, t.z - WHEEL_C.z);
      const u = rel.z, v = rel.y;
      const [fu, fv] = rot2(P.rPivot, D.t0, D.thetaFill);
      const dd = (u - fu) ** 2 + (v - fv) ** 2;
      if (dd < bestD) { bestD = dd; best = k; }
    });
    this.fillingBucket = best;
    for (const im of this.bucketMeshes) im.instanceMatrix.needsUpdate = true;
    // 水滴：沿速度方向拉长
    const wm = this.waterMesh;
    let n = 0;
    const up = new THREE.Vector3(0, 1, 0);
    for (const b of m.water) {
      if (n >= wm.count) break;
      const p = b.translation(), v = b.linvel();
      const sp = Math.hypot(v.x, v.y, v.z);
      if (sp > 0.3) {
        tmpQ.setFromUnitVectors(up, tmpV.set(v.x / sp, v.y / sp, v.z / sp));
        const s = 1 + Math.min(sp * 0.3, 1.8);
        tmpM.compose(tmpV.set(p.x, p.y, p.z), tmpQ, new THREE.Vector3(0.85, s, 0.85));
      } else {
        tmpM.compose(tmpV.set(p.x, p.y, p.z), tmpQ.identity(), ONE);
      }
      wm.setMatrixAt(n++, tmpM);
    }
    wm.count = n;
    wm.instanceMatrix.needsUpdate = true;
    // 天条：两端锚点之间的链节，松弛时下垂
    this.updateChain();
    // 水柱：沿轨迹逐段射线检测，遇到水斗即截断
    {
      const P0 = this.streamPts;
      let frac = 1;
      for (let i = 0; i < P0.length - 1; i++) {
        const a = P0[i], b = P0[i + 1];
        const toi = m.rayBucket({ x: a.x, y: a.y, z: a.z }, { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z }, 1);
        if (toi !== null) { frac = (i + toi) / (P0.length - 1); break; }
      }
      const segs = this.streamN * 2;
      const idxPerSeg = 6 * 6;
      this.streamMesh.geometry.setDrawRange(0, Math.max(1, Math.round(frac * segs)) * idxPerSeg);
    }
    // 高亮
    for (const key in this.hlMats) {
      const lv = this.hlLevel[key] ?? 0;
      // 平滑过渡，避免高亮突然闪现
      const cur = this.hlSmooth[key] ?? 0;
      const sm = cur + (lv - cur) * 0.25;
      this.hlSmooth[key] = sm;
      const pulse = sm * (0.7 + 0.3 * Math.sin(time * 6));
      for (const mat of this.hlMats[key]) mat.emissiveIntensity = pulse * 0.42;
    }
    // 当前注水的水斗用实例颜色提亮（金色）
    const bl = (this.hlLevel["bucket"] ?? 0) * (0.8 + 0.2 * Math.sin(time * 6));
    const col = new THREE.Color();
    for (const im of this.bucketMeshes) {
      for (let k = 0; k < D.n; k++) {
        if (k === best) col.setRGB(1 + bl * 1.1, 1 + bl * 0.75, 1 + bl * 0.1);
        else col.setRGB(1, 1, 1);
        im.setColorAt(k, col);
      }
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }

  chainEnds() {
    const m = this.m;
    const a = this.localToWorld(m.bal, m.balAnchor);
    const b = this.localToWorld(m.fork, m.forkAnchor);
    return [a, b] as const;
  }

  private localToWorld(b: RBody, p: Vec) {
    const t = b.translation(), r = b.rotation();
    return new THREE.Vector3(p.x, p.y, p.z).applyQuaternion(new THREE.Quaternion(r.x, r.y, r.z, r.w)).add(new THREE.Vector3(t.x, t.y, t.z));
  }

  /** 天条是否被拉紧（用于讲解高亮） */
  chainTension() {
    const [a, b] = this.chainEnds();
    return a.distanceTo(b);
  }

  private updateChain() {
    const [a, b] = this.chainEnds();
    const len = this.m.chainLength;
    const d = a.distanceTo(b);
    const sag = d < len ? Math.sqrt(Math.max(0, len * len - d * d)) * 0.5 : 0;
    const N = this.chainN;
    const prev = new THREE.Vector3();
    const cur = new THREE.Vector3();
    const side = new THREE.Vector3(0, 0, 1);
    for (let i = 0; i < N; i++) {
      const t = (i + 0.5) / N;
      cur.lerpVectors(a, b, t);
      cur.z -= Math.sin(Math.PI * t) * sag; // 向前（-u 方向即世界 -Z）微微弯曲
      const t2 = Math.min(1, t + 0.01);
      prev.lerpVectors(a, b, t2);
      prev.z -= Math.sin(Math.PI * t2) * sag;
      const dir = prev.sub(cur).normalize();
      tmpQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      if (i % 2) tmpQ.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2));
      tmpM.compose(cur, tmpQ, ONE);
      this.chainMesh.setMatrixAt(i, tmpM);
    }
    void side;
    this.chainMesh.instanceMatrix.needsUpdate = true;
  }

  /** 讲解标注用的锚点（世界坐标） */
  anchor(name: string): THREE.Vector3 {
    const m = this.m;
    const v = (p: Vec) => new THREE.Vector3(p.x, p.y, p.z);
    switch (name) {
      case "bucket": {
        const bk = m.buckets[this.fillingBucket];
        return this.localToWorld(bk.body, { x: 0, y: 0, z: 0 }).add(new THREE.Vector3(0, 0.25, 0.3));
      }
      case "fork": return this.localToWorld(m.fork, { x: P.forkArm * 0.5, y: 0.05, z: W_FRONT });
      case "forkWeight": return this.localToWorld(m.fork, { x: -P.forkCwArm, y: -0.2, z: W_FRONT });
      case "chain": { const [a, b] = this.chainEnds(); return a.clone().lerp(b, 0.45); }
      case "bal": return this.localToWorld(m.bal, { x: 0.6, y: P.balRaise + 0.05, z: W_FRONT });
      case "pawl": return this.localToWorld(m.bal, { x: -P.pawlArm, y: 0.1, z: W_FRONT });
      // 天关特写的取景中心：固定在横档停止位置附近（不随杠杆移动，便于看出天关的抬起与落下）
      case "pawlCloseup": { const p = W(D.pawlU + 0.02, D.crossStopV + 0.02, 0.1); return new THREE.Vector3(p.x, p.y, p.z); }
      case "wheel": return this.localToWorld(m.wheel, { x: -1.1, y: 0.9, z: 0.3 });
      case "crown": return new THREE.Vector3(WHEEL_C.x - P.crownW + 0.12, WHEEL_C.y + 0.25, WHEEL_C.z - 0.55);
      case "tianzhu": return this.localToWorld(m.tianzhu, { x: 0, y: 0.4, z: 0 });
      case "tianzhuUp": return this.localToWorld(m.tianzhu, { x: 0, y: 3.9, z: 0 });
      case "spurA": return new THREE.Vector3(D.tianzhu.x + 0.35, D.spurAY, D.tianzhu.z - 0.35);
      case "lantern": return new THREE.Vector3(D.tianzhu.x + 0.35, D.tianzhu.y + 0.05, D.tianzhu.z - 0.45);
      case "jilunGear": return new THREE.Vector3(D.jilun.x - 0.7, D.spurAY + 0.05, D.jilun.z + 0.55);
      case "jilun": return this.localToWorld(m.jilun, { x: 0, y: 1.0, z: 0 }).add(new THREE.Vector3(0, 0, 0));
      case "peg": return this.localToWorld(m.jilun, { x: 0, y: JL.pegY - D.jilun.y, z: 1.1 });
      case "jackDrum": return v(m.jacks[0].pivot).add(new THREE.Vector3(-0.1, 0.35, 0.2));
      case "jackBell": return v(m.jacks[1].pivot).add(new THREE.Vector3(-0.1, 0.3, 0.2));
      case "globe": return this.localToWorld(m.globe.obj, { x: 0, y: 0.6, z: 0 });
      case "armillary": return this.localToWorld(m.armillary.obj, { x: 0, y: 0.8, z: 0 });
      case "noria": return this.localToWorld(m.noria, { x: 0, y: NORIA.r * 0.6, z: 0 });
      case "tianchi": return new THREE.Vector3(-2.45, 4.1, m.spout.z + 0.5);
      case "pingshui": return new THREE.Vector3(-2.2, 2.95, m.spout.z + 0.48);
      case "spout": return v(m.spout);
      case "placard": return new THREE.Vector3(D.jilun.x, JL.placardY + 0.05, 2.5);
    }
    return new THREE.Vector3();
  }
}
