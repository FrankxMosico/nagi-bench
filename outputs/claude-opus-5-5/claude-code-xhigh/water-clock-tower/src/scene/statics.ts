// 机构中不动的部分：水壶、退水壶、轴承支架、鼓、钟、木人身体、浑象与浑仪的固定环等
import * as THREE from "three";
import { Builder, type V3 } from "./builder";
import type { Materials } from "./materials";
import { P, W_FRONT, WHEEL_C, NORIA, W, derived, type Machine } from "../physics/machine";
import { TOWER } from "./tower";

const D = derived();

export function buildStatics(mats: Materials, m: Machine) {
  const M = mats;
  const b = new Builder();
  const g = new THREE.Group();
  const wv = (u: number, v: number, w = 0): V3 => {
    const p = W(u, v, w);
    return [p.x, p.y, p.z];
  };

  // ---------------------------------------------------------------- 枢轮轴承柱
  const floorV = -WHEEL_C.y;
  for (const w of [0.62, -0.62]) {
    b.beam(wv(0, floorV, w), wv(0, -0.16, w), 0.2, 0.2, M.woodDark);
    b.box([0.3, 0.22, 0.34], M.iron, wv(0, -0.06, w));
    b.beam(wv(-0.5, floorV, w), wv(0, -0.9, w), 0.12, 0.12, M.woodDark);
    b.beam(wv(0.5, floorV, w), wv(0, -0.9, w), 0.12, 0.12, M.woodDark);
  }
  // 枢衡支柱
  {
    const w = W_FRONT + 0.13;
    b.beam(wv(D.forkPivot.u, floorV, w), wv(D.forkPivot.u, D.forkPivot.v - 0.06, w), 0.12, 0.12, M.woodDark);
    b.box([0.16, 0.14, 0.16], M.iron, wv(D.forkPivot.u, D.forkPivot.v, w - 0.02));
    // 下限位挡块（枢衡下压的极限）
  }
  // 天衡吊架：自中层楼板垂下
  {
    const w = W_FRONT + 0.13;
    const top = TOWER.floor1 - WHEEL_C.y;
    b.beam(wv(D.balPivot.u, top, w), wv(D.balPivot.u, D.balPivot.v + 0.06, w), 0.12, 0.12, M.woodDark);
    b.box([0.16, 0.14, 0.16], M.iron, wv(D.balPivot.u, D.balPivot.v, w - 0.02));
  }

  // ---------------------------------------------------------------- 平水壶、天池与管道
  const water = M.waterSurface;
  const tank = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, level: number) => {
    const t = 0.05;
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, h = y1 - y0;
    b.box([x1 - x0, t, z1 - z0], M.woodMid, [cx, y0 + t / 2, cz]);
    b.box([t, h, z1 - z0], M.woodMid, [x0 + t / 2, y0 + h / 2, cz]);
    b.box([t, h, z1 - z0], M.woodMid, [x1 - t / 2, y0 + h / 2, cz]);
    b.box([x1 - x0, h, t], M.woodMid, [cx, y0 + h / 2, z0 + t / 2]);
    b.box([x1 - x0, h, t], M.woodMid, [cx, y0 + h / 2, z1 - t / 2]);
    for (const yy of [y0 + 0.08, y1 - 0.06]) {
      b.box([x1 - x0 + 0.03, 0.04, z1 - z0 + 0.03], M.bronze, [cx, yy, cz]);
    }
    b.box([x1 - x0 - 2 * t, 0.01, z1 - z0 - 2 * t], water, [cx, level, cz]);
  };
  const spout = m.spout;
  // 平水壶（保持水位恒定）
  const pz0 = spout.z + 0.18, pz1 = spout.z + 0.78;
  tank(-2.2, -1.5, 2.45, 3.15, pz0, pz1, 3.0);
  // 出水管：从平水壶侧壁伸出，口朝 -Z（朝向水斗）
  b.rod([spout.x, 2.52, pz0 + 0.05], [spout.x, 2.42, spout.z + 0.1], 0.045, M.bronze);
  b.rod([spout.x, 2.42, spout.z + 0.12], [spout.x, spout.y + 0.01, spout.z + 0.02], 0.04, M.bronze);
  b.add(new THREE.CylinderGeometry(0.055, 0.045, 0.08, 12), M.gold, [spout.x, spout.y + 0.01, spout.z + 0.03], [Math.PI / 2, 0, 0]);
  // 溢流管：多余的水流回退水壶
  b.rod([-1.55, 3.0, pz1 - 0.1], [-1.4, 3.0, pz1 - 0.1], 0.03, M.bronze);
  b.rod([-1.4, 3.0, pz1 - 0.1], [-1.4, 0.4, pz1 - 0.1], 0.03, M.bronze);
  // 天池
  tank(-2.45, -1.25, 3.65, 4.5, pz0 - 0.05, pz1 + 0.04, 4.32);
  // 渴乌（虹吸管）：从天池翻过壶沿进入平水壶
  b.rod([-1.85, 3.9, pz0 + 0.35], [-1.85, 4.62, pz0 + 0.35], 0.03, M.bronze);
  b.rod([-1.85, 4.62, pz0 + 0.35], [-1.85, 4.62, pz0 + 0.15], 0.03, M.bronze);
  b.rod([-1.85, 4.62, pz0 + 0.15], [-1.85, 3.05, pz0 + 0.15], 0.03, M.bronze);
  // 水壶支架
  // 支柱放在杠杆层（x≈-2.23）之后，避免与枢衡、天衡交叠
  for (const [x, z] of [[-2.08, pz0 + 0.05], [-1.55, pz0 + 0.05], [-2.08, pz1 + 0.15], [-1.55, pz1 + 0.15]] as const) {
    b.beam([x, 0, z], [x, 3.65, z], 0.1, 0.1, M.woodDark);
  }
  b.box([0.75, 0.08, 0.75], M.woodDark, [-1.85, 2.41, (pz0 + pz1) / 2]);

  // ---------------------------------------------------------------- 退水壶（承接溢出的水）
  {
    const x0 = -2.35, x1 = -1.35, z0 = WHEEL_C.z - 2.5, z1 = WHEEL_C.z + 2.4, y1 = 0.45;
    const t = 0.06;
    b.box([x1 - x0, t, z1 - z0], M.stone, [(x0 + x1) / 2, t / 2, (z0 + z1) / 2]);
    b.box([t, y1, z1 - z0], M.woodMid, [x0, y1 / 2, (z0 + z1) / 2]);
    b.box([t, y1, z1 - z0], M.woodMid, [x1, y1 / 2, (z0 + z1) / 2]);
    b.box([x1 - x0, y1, t], M.woodMid, [(x0 + x1) / 2, y1 / 2, z0]);
    b.box([x1 - x0, y1, t], M.woodMid, [(x0 + x1) / 2, y1 / 2, z1]);
    b.box([x1 - x0 - 0.1, 0.01, z1 - z0 - 0.1], water, [(x0 + x1) / 2, 0.33, (z0 + z1) / 2]);
    // 通往升水轮的水渠
    const nz = NORIA.center.z;
    b.box([0.5, 0.3, z0 - nz + 0.6], M.stone, [NORIA.center.x, 0.15, (z0 + nz) / 2]);
    b.box([0.4, 0.01, z0 - nz + 0.5], water, [NORIA.center.x, 0.27, (z0 + nz) / 2]);
  }

  // ---------------------------------------------------------------- 升水轮支架与高架水槽
  {
    const c = NORIA.center;
    for (const dx of [-0.65, 0.65]) {
      b.beam([c.x + dx, 0, c.z - 1.2], [c.x + dx * 0.6, c.y, c.z], 0.14, 0.14, M.woodDark);
      b.beam([c.x + dx, 0, c.z + 1.2], [c.x + dx * 0.6, c.y, c.z], 0.14, 0.14, M.woodDark);
    }
    // 顶部出水槽沿塔左侧向前通到天池上方
    const ty = 5.55, tx = -3.05;
    b.box([0.4, 0.2, 0.5], M.woodMid, [c.x, ty, c.z + NORIA.r * 0.15]);
    b.box([0.36, 0.18, 2.9 - (c.z + 0.2)], M.woodMid, [tx, ty, (2.9 + c.z + 0.2) / 2]);
    b.box([0.28, 0.01, 2.9 - (c.z + 0.2)], water, [tx, ty + 0.06, (2.9 + c.z + 0.2) / 2]);
    b.box([1.3, 0.18, 0.36], M.woodMid, [(tx - 1.85) / 2, ty, 2.75]);
    b.rod([-1.85, ty, 2.75], [-1.85, 4.55, 2.75], 0.05, M.woodMid);
  }

  // ---------------------------------------------------------------- 天柱、机轮的轴承
  {
    const t = D.tianzhu;
    b.box([0.34, 0.12, 0.34], M.iron, [t.x, t.y - 0.25, t.z]);
    b.beam([t.x, 0, t.z], [t.x, t.y - 0.31, t.z], 0.16, 0.16, M.woodDark);
    const j = D.jilun;
    b.add(new THREE.CylinderGeometry(0.22, 0.28, 0.45, 12), M.stone, [j.x, 0.22, j.z]);
  }

  // ---------------------------------------------------------------- 木人身体、鼓、钟
  for (const jack of m.jacks) {
    const q = new THREE.Quaternion(jack.q.x, jack.q.y, jack.q.z, jack.q.w);
    const at = (x: number, y: number, z: number): V3 => {
      const v = new THREE.Vector3(x, y, z).applyQuaternion(q).add(new THREE.Vector3(jack.pivot.x, jack.pivot.y, jack.pivot.z));
      return [v.x, v.y, v.z];
    };
    const robe = jack.kind === "drum" ? M.robeRed : M.robeBlue;
    b.add(new THREE.CylinderGeometry(0.09, 0.16, 0.5, 14), robe, at(0, -0.24, 0.16), q);
    b.add(new THREE.CylinderGeometry(0.1, 0.09, 0.12, 14), robe, at(0, 0.0, 0.16), q);
    b.add(new THREE.SphereGeometry(0.075, 14, 12), M.skin, at(0, 0.13, 0.17));
    b.add(new THREE.CylinderGeometry(0.05, 0.08, 0.07, 12), M.black, at(0, 0.21, 0.17), q);
    b.box([0.2, 0.025, 0.04], M.black, at(0, 0.215, 0.17), q);
    // 另一只手臂（静止）
    b.rod(at(0.08, -0.02, 0.17), at(0.13, -0.2, 0.22), 0.03, robe);
    // 底座
    b.box([0.4, 0.08, 0.36], M.woodDark, at(0, -0.52, 0.16), q);
    const s = jack.strikeCenter;
    if (jack.kind === "drum") {
      // 鼓身（轴沿木人局部 X）
      const qd = q.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2));
      const prof: THREE.Vector2[] = [];
      for (let i = 0; i <= 10; i++) {
        const y = -0.075 + (i / 10) * 0.15;
        prof.push(new THREE.Vector2(0.17 + 0.03 * Math.cos((y / 0.075) * (Math.PI / 2)), y));
      }
      b.add(new THREE.LatheGeometry(prof, 24), M.red, [s.x, s.y, s.z], qd);
      for (const sgn of [-1, 1]) {
        const off = new THREE.Vector3(sgn * 0.076, 0, 0).applyQuaternion(q);
        b.add(new THREE.CylinderGeometry(0.172, 0.172, 0.006, 24), M.drumSkin, [s.x + off.x, s.y + off.y, s.z + off.z], qd);
      }
      // 鼓架
      b.beam([s.x, s.y - 0.16, s.z], [s.x - 0.05, jack.pivot.y - 0.62, s.z - 0.12], 0.04, 0.04, M.woodDark);
      b.beam([s.x, s.y - 0.16, s.z], [s.x - 0.05, jack.pivot.y - 0.62, s.z + 0.12], 0.04, 0.04, M.woodDark);
    } else {
      const prof: THREE.Vector2[] = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        prof.push(new THREE.Vector2(0.06 + 0.1 * Math.pow(t, 1.6), 0.16 - t * 0.3));
      }
      prof.push(new THREE.Vector2(0.0, -0.14));
      b.add(new THREE.LatheGeometry(prof, 28), M.bronze, [s.x, s.y, s.z]);
      b.add(new THREE.TorusGeometry(0.03, 0.012, 6, 12), M.bronze, [s.x, s.y + 0.18, s.z]);
      // 钟架
      b.beam([s.x - 0.3, s.y + 0.32, s.z], [s.x + 0.12, s.y + 0.32, s.z], 0.05, 0.05, M.woodDark);
      b.beam([s.x, s.y + 0.32, s.z], [s.x, s.y + 0.18, s.z], 0.015, 0.015, M.iron);
      b.beam([s.x - 0.3, s.y + 0.34, s.z], [s.x - 0.3, jack.pivot.y - 0.6, s.z], 0.05, 0.05, M.woodDark);
    }
  }

  // ---------------------------------------------------------------- 浑象的固定部分：地平框与子午环
  {
    const c = D.globeCenter;
    const pol = new THREE.Vector3(D.polar.x, D.polar.y, D.polar.z);
    // 子午环（含极轴的竖直平面，法线为 X）
    b.add(new THREE.TorusGeometry(0.84, 0.03, 8, 96), M.bronze, [c.x, c.y, c.z], [0, Math.PI / 2, 0]);
    // 地平：木框把球半埋
    b.add(new THREE.CylinderGeometry(0.98, 0.98, 0.08, 48, 1, true), M.lacquer, [c.x, c.y, c.z]);
    b.add(new THREE.RingGeometry(0.8, 1.0, 48), M.woodLight, [c.x, c.y + 0.04, c.z], [-Math.PI / 2, 0, 0]);
    for (let k = 0; k < 4; k++) {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      b.beam([c.x + Math.cos(a) * 0.92, TOWER.floor1 + 0.18, c.z + Math.sin(a) * 0.92], [c.x + Math.cos(a) * 0.92, c.y, c.z + Math.sin(a) * 0.92], 0.08, 0.08, M.lacquer);
    }
    // 极轴的上端轴承
    const top = new THREE.Vector3(c.x, c.y, c.z).addScaledVector(pol, 0.84);
    b.add(new THREE.SphereGeometry(0.05, 10, 8), M.iron, [top.x, top.y, top.z]);
  }

  // ---------------------------------------------------------------- 浑仪的固定部分：子午环、地平环、赤道环与龙柱
  {
    const c = D.armCenter;
    const pol = new THREE.Vector3(D.polar.x, D.polar.y, D.polar.z);
    b.add(new THREE.TorusGeometry(1.02, 0.035, 8, 120), M.bronze, [c.x, c.y, c.z], [0, Math.PI / 2, 0]);
    b.add(new THREE.TorusGeometry(1.0, 0.03, 8, 120), M.darkBronze, [c.x, c.y, c.z], new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pol));
    const hz = new THREE.RingGeometry(1.04, 1.16, 96);
    b.add(hz, M.bronze, [c.x, c.y, c.z], [-Math.PI / 2, 0, 0]);
    b.add(hz, M.bronze, [c.x, c.y - 0.001, c.z], [Math.PI / 2, 0, 0]);
    for (let k = 0; k < 4; k++) {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      const x = c.x + Math.cos(a) * 1.1, z = c.z + Math.sin(a) * 1.1;
      b.add(new THREE.CylinderGeometry(0.06, 0.08, c.y - 9.0, 10), M.darkBronze, [x, (c.y + 9.0) / 2, z]);
      b.add(new THREE.SphereGeometry(0.08, 10, 8), M.gold, [x, c.y - 0.03, z]);
    }
    // 极轴两端的轴承
    for (const s of [-1.12, 1.02]) {
      const p = new THREE.Vector3(c.x, c.y, c.z).addScaledVector(pol, s);
      b.add(new THREE.SphereGeometry(0.045, 10, 8), M.iron, [p.x, p.y, p.z]);
    }
  }

  g.add(b.build());
  return g;
}

export { P };
