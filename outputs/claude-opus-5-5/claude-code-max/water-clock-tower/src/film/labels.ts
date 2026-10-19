// 三维标注：锚定在部件上的文字框 + 引线（DOM/SVG 叠加层，随相机投影）。
import * as THREE from 'three';

export interface LabelSpec {
  t0: number;
  t1: number;
  anchor: string;
  text: string;
  sub?: string;
  dx: number; // 文字框相对锚点的屏幕偏移（以画面高度为单位）
  dy: number;
  hot?: string; // 与某个高亮组同步加亮
}

interface LabelNode { spec: LabelSpec; el: HTMLDivElement; line: SVGLineElement; dot: SVGCircleElement; op: number }

export class Labels {
  private nodes: LabelNode[] = [];
  private v = new THREE.Vector3();
  constructor(host: HTMLElement, svg: SVGSVGElement, specs: LabelSpec[]) {
    for (const s of specs) {
      const el = document.createElement('div');
      el.className = 'lbl';
      el.innerHTML = `<b>${s.text}</b>${s.sub ? `<small>${s.sub}</small>` : ''}`;
      el.style.opacity = '0';
      host.appendChild(el);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3.5');
      svg.appendChild(line);
      svg.appendChild(dot);
      this.nodes.push({ spec: s, el, line, dot, op: 0 });
    }
  }

  update(t: number, camera: THREE.Camera, anchors: Record<string, () => THREE.Vector3>, hot: (name: string) => number) {
    const W = window.innerWidth, H = window.innerHeight;
    for (const n of this.nodes) {
      const s = n.spec;
      const fade = 0.35;
      let target = 0;
      if (t >= s.t0 && t <= s.t1) target = Math.min(1, (t - s.t0) / fade, (s.t1 - t) / fade);
      const fn = anchors[s.anchor];
      if (!fn) { n.el.style.opacity = '0'; continue; }
      if (target <= 0.001) {
        if (n.op !== 0) { n.op = 0; n.el.style.opacity = '0'; n.line.style.opacity = '0'; n.dot.style.opacity = '0'; }
        continue;
      }
      this.v.copy(fn()).project(camera);
      const behind = this.v.z > 1 || this.v.z < -1;
      const x = (this.v.x * 0.5 + 0.5) * W, y = (-this.v.y * 0.5 + 0.5) * H;
      const op = behind ? 0 : target;
      n.op = op;
      const lx = x + s.dx * H, ly = y + s.dy * H;
      n.el.style.opacity = String(op);
      n.el.style.left = `${lx}px`;
      n.el.style.top = `${ly}px`;
      n.el.classList.toggle('hot', !!s.hot && hot(s.hot) > 0.35);
      n.line.setAttribute('x1', String(x));
      n.line.setAttribute('y1', String(y));
      // 引线指向文字框边缘
      const r = n.el.getBoundingClientRect();
      const ex = Math.max(r.left, Math.min(x, r.right)), ey = Math.max(r.top, Math.min(y, r.bottom));
      n.line.setAttribute('x2', String(ex));
      n.line.setAttribute('y2', String(ey));
      n.line.style.opacity = String(op);
      n.dot.setAttribute('cx', String(x));
      n.dot.setAttribute('cy', String(y));
      n.dot.style.opacity = String(op);
    }
  }
}
