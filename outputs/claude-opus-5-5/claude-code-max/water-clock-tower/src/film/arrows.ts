// 运动箭头：锚定在部件上，方向为该部件的运动方向（三维方向投影到屏幕），
// 亮度由仿真里的真实运动量驱动（角度、速度），部件不动就不出现。（讲解图形，不驱动任何机构）
import * as THREE from 'three';

export interface ArrowSpec {
  t0: number;
  t1: number;
  anchor: string; // 起点
  dir: string | [number, number, number]; // 世界方向，或一个返回方向的锚点名（取 anchor→该点）
  drive: string; // 活跃度来源（由影片控制器按仿真状态计算，0..1）
  size?: number;
  len?: number; // 方向投影所用的世界长度
}

interface ArrowNode { spec: ArrowSpec; el: SVGGElement; op: number }

export class Arrows {
  private nodes: ArrowNode[] = [];
  private a = new THREE.Vector3();
  private b = new THREE.Vector3();
  constructor(svg: SVGSVGElement, specs: ArrowSpec[], lite = false) {
    for (const s of specs) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const L = s.size ?? 1;
      path.setAttribute('d', `M0,${-4.5 * L} L${20 * L},${-4.5 * L} L${20 * L},${-11 * L} L${36 * L},0 L${20 * L},${11 * L} L${20 * L},${4.5 * L} L0,${4.5 * L} Z`);
      path.setAttribute('fill', '#ffd45e');
      path.setAttribute('stroke', 'rgba(50,25,0,0.85)');
      path.setAttribute('stroke-width', lite ? '2' : '1.6');
      g.appendChild(path);
      g.style.opacity = '0';
      // 软件渲染时不用 SVG 滤镜（箭头每帧移动，滤镜要逐帧重新光栅化）
      if (!lite) g.style.filter = 'drop-shadow(0 0 5px rgba(255,180,60,0.85))';
      svg.appendChild(g);
      this.nodes.push({ spec: s, el: g, op: 0 });
    }
  }

  update(t: number, camera: THREE.Camera, anchors: Record<string, () => THREE.Vector3>, drive: (name: string) => number) {
    const W = window.innerWidth, H = window.innerHeight;
    const toScreen = (v: THREE.Vector3) => new THREE.Vector2((v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H);
    for (const n of this.nodes) {
      const s = n.spec;
      const fn = anchors[s.anchor] as (() => THREE.Vector3) | undefined;
      const inWin = t >= s.t0 && t <= s.t1;
      const target = typeof fn === 'function' && inWin ? Math.max(0, Math.min(1, drive(s.drive))) : 0;
      n.op += (target - n.op) * 0.3;
      if (n.op < 0.01) { if (n.el.style.opacity !== '0') n.el.style.opacity = '0'; continue; }
      const edge = Math.max(0, Math.min((t - s.t0) / 0.25, (s.t1 - t) / 0.25, 1));
      this.a.copy(fn!());
      if (typeof s.dir === 'string') this.b.copy(anchors[s.dir]()); else this.b.set(...s.dir).multiplyScalar(s.len ?? 0.15).add(this.a);
      const pa = this.a.clone().project(camera), pb = this.b.clone().project(camera);
      if (pa.z > 1 || pa.z < -1) { n.el.style.opacity = '0'; continue; }
      const sa = toScreen(pa), sb = toScreen(pb);
      const d = sb.sub(sa);
      if (d.lengthSq() < 1e-6) continue;
      const ang = Math.atan2(d.y, d.x) * 180 / Math.PI;
      const off = d.normalize().multiplyScalar(10);
      n.el.style.opacity = (n.op * edge).toFixed(3);
      n.el.setAttribute('transform', `translate(${(sa.x + off.x).toFixed(1)},${(sa.y + off.y).toFixed(1)}) rotate(${ang.toFixed(1)})`);
    }
  }
}
