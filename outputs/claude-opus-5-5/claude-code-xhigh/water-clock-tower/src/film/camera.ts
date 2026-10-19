// 镜头路径：关键帧之间用非均匀 Catmull-Rom 切线的三次 Hermite 插值；遇到 cut 时用黑场过渡。
import * as THREE from "three";
import { SHOTS, type CamKey } from "./timeline";

interface Segment { keys: CamKey[]; t0: number; t1: number }

const segments: Segment[] = [];
{
  let cur: CamKey[] = [];
  for (const shot of SHOTS) {
    if (shot.cut && cur.length) {
      segments.push({ keys: cur, t0: cur[0].t, t1: cur[cur.length - 1].t });
      cur = [];
    }
    for (const k of shot.keys) {
      const last = cur[cur.length - 1];
      if (last && Math.abs(last.t - k.t) < 1e-6) continue;
      cur.push(k);
    }
  }
  if (cur.length) segments.push({ keys: cur, t0: cur[0].t, t1: cur[cur.length - 1].t });
}
export const CUT_TIMES = segments.slice(1).map((s) => s.t0);

function hermite(p0: number, p1: number, m0: number, m1: number, h: number, s: number) {
  const s2 = s * s, s3 = s2 * s;
  return (2 * s3 - 3 * s2 + 1) * p0 + (s3 - 2 * s2 + s) * h * m0 + (-2 * s3 + 3 * s2) * p1 + (s3 - s2) * h * m1;
}

function evalSeg(seg: Segment, t: number, get: (k: CamKey) => number[]): number[] {
  const K = seg.keys;
  if (t <= K[0].t) return get(K[0]);
  if (t >= K[K.length - 1].t) return get(K[K.length - 1]);
  let i = 0;
  while (i < K.length - 2 && t > K[i + 1].t) i++;
  const a = K[i], b = K[i + 1];
  const h = b.t - a.t;
  const s = (t - a.t) / h;
  const tangent = (j: number) => {
    if (j <= 0 || j >= K.length - 1) return get(K[j]).map(() => 0);
    const pa = get(K[j - 1]), pb = get(K[j]), pc = get(K[j + 1]);
    const ha = K[j].t - K[j - 1].t, hc = K[j + 1].t - K[j].t;
    return pb.map((v, d) => 0.5 * ((v - pa[d]) / ha + (pc[d] - v) / hc));
  };
  const m0 = tangent(i), m1 = tangent(i + 1);
  const p0 = get(a), p1 = get(b);
  return p0.map((v, d) => hermite(v, p1[d], m0[d], m1[d], h, s));
}

export function evalCamera(t: number, cam: THREE.PerspectiveCamera) {
  let seg = segments[0];
  for (const s of segments) if (t >= s.t0) seg = s;
  const pos = evalSeg(seg, t, (k) => k.pos);
  const tgt = evalSeg(seg, t, (k) => k.tgt);
  const fov = evalSeg(seg, t, (k) => [k.fov ?? 40])[0];
  // 轻微的手持感
  const sway = 0.025;
  cam.position.set(pos[0] + Math.sin(t * 0.7) * sway, pos[1] + Math.sin(t * 0.9 + 1) * sway * 0.6, pos[2] + Math.cos(t * 0.6) * sway);
  cam.lookAt(tgt[0], tgt[1], tgt[2]);
  // 构图按 16:9 设计；窗口更窄时加大垂直视场角，保证水平方向的内容不被裁掉
  const design = 16 / 9;
  let vfov = fov;
  if (cam.aspect < design) {
    const half = Math.atan(Math.tan((fov * Math.PI) / 360) * design);
    vfov = (2 * Math.atan(Math.tan(half) / cam.aspect) * 180) / Math.PI;
  }
  if (Math.abs(cam.fov - vfov) > 1e-3) {
    cam.fov = vfov;
    cam.updateProjectionMatrix();
  }
}

/** 切镜处的黑场不透明度 */
export function cutFade(t: number) {
  let a = 0;
  for (const c of CUT_TIMES) {
    if (t > c - 0.3 && t <= c) a = Math.max(a, (t - (c - 0.3)) / 0.3);
    if (t > c && t < c + 0.45) a = Math.max(a, 1 - (t - c) / 0.45);
  }
  return a;
}
