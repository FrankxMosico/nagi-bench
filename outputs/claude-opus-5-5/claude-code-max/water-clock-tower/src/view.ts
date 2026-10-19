// 视图总装：舞台 + 建筑 + 机构网格 + 水；负责把刚体位姿（插值后）同步到网格。
import * as THREE from 'three';
import type { Sim } from './sim/sim';
import { makePalette, Highlighter, type Palette } from './render/materials';
import { createStage, type Stage } from './render/stage';
import { buildTower, type TowerView } from './render/tower';
import { buildMech, type MechView } from './render/mech';
import { buildWaterView, type WaterView } from './render/waterview';

interface Snap { px: number; py: number; pz: number; qx: number; qy: number; qz: number; qw: number }

export class View {
  pal: Palette;
  stage: Stage;
  tower: TowerView;
  mech: MechView;
  water: WaterView;
  hl: Highlighter;
  private prev: Snap[] = [];
  private cur: Snap[] = [];
  private qa = new THREE.Quaternion();
  private qb = new THREE.Quaternion();

  constructor(public sim: Sim, canvas: HTMLCanvasElement, public lite: boolean) {
    this.pal = makePalette(lite);
    this.hl = new Highlighter(lite ? 0.7 : 0.55);
    this.stage = createStage(canvas, this.pal, lite);
    this.tower = buildTower(sim, this.pal);
    this.mech = buildMech(sim, this.pal);
    this.water = buildWaterView(sim.water, this.pal);
    this.stage.scene.add(this.tower.root, this.mech.root, this.water.mesh);
    for (const b of this.mech.bound) {
      void b;
      this.prev.push({ px: 0, py: 0, pz: 0, qx: 0, qy: 0, qz: 0, qw: 1 });
      this.cur.push({ px: 0, py: 0, pz: 0, qx: 0, qy: 0, qz: 0, qw: 1 });
    }
    this.capture();
    this.capture();
    // 可高亮的部件
    const P = this.mech.parts, TP = this.tower.parts;
    const reg = (name: string, list: (THREE.Object3D[] | undefined)[]) => this.hl.register(name, list.flatMap((l) => l ?? []));
    reg('water', [TP.tanks]);
    reg('scoop0', [P.scoop0]);
    reg('fork', [P.fork]);
    reg('chain', [P.chain]);
    reg('upper', [P.upper]);
    reg('lock', [P.lock]);
    reg('pawls', [P.pawls]);
    reg('wheel', [P.wheel]);
    reg('tianzhu', [P.tianzhu]);
    reg('jilun', [P.jilun]);
    reg('figures', [P.drumArm, P.bellArm, P.bell]);
    reg('globe', [P.globe, P.globeShaft]);
    reg('armillary', [P.armillary, P.armillaryShaft]);
  }

  /** 记录当前刚体位姿（每个物理步之后调用；之前一份变成 prev） */
  capture() {
    const b = this.mech.bound;
    for (let i = 0; i < b.length; i++) {
      const p = this.prev[i], c = this.cur[i];
      p.px = c.px; p.py = c.py; p.pz = c.pz; p.qx = c.qx; p.qy = c.qy; p.qz = c.qz; p.qw = c.qw;
      const t = b[i].body.translation(), q = b[i].body.rotation();
      c.px = t.x; c.py = t.y; c.pz = t.z; c.qx = q.x; c.qy = q.y; c.qz = q.z; c.qw = q.w;
    }
  }

  /** 把插值后的位姿写入网格 */
  sync(alpha: number) {
    const b = this.mech.bound;
    for (let i = 0; i < b.length; i++) {
      const p = this.prev[i], c = this.cur[i], o = b[i].obj;
      o.position.set(p.px + (c.px - p.px) * alpha, p.py + (c.py - p.py) * alpha, p.pz + (c.pz - p.pz) * alpha);
      this.qa.set(p.qx, p.qy, p.qz, p.qw);
      this.qb.set(c.qx, c.qy, c.qz, c.qw);
      o.quaternion.slerpQuaternions(this.qa, this.qb, alpha);
    }
    this.mech.root.updateMatrixWorld(true);
    this.mech.updateDynamic();
    this.water.update();
  }

  render() { this.stage.render(); }
}
