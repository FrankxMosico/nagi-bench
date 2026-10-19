// 影片时间 -> 仿真时间的映射（慢放/快进段）。镜头与字幕按影片时间编排，
// 机械运动只按仿真时间推进；二者通过这张表一一对应，保证每次播放完全一致。
export interface ScaleSeg { t0: number; t1: number; scale: number }

export const FILM_LENGTH = 32.5;

export const SCALE: ScaleSeg[] = [
  { t0: 0, t1: 12.0, scale: 1 },
  { t0: 12.0, t1: 15.25, scale: 0.25 }, // 慢放：满斗压下格叉、天关抬起、枢轮起步、天关落下
  { t0: 15.25, t1: 16.55, scale: 0.4 }, // 慢放：枢轮走完一格，被天关再次锁住
  { t0: 16.55, t1: 25.55, scale: 1 },
  { t0: 25.55, t1: 28.35, scale: 2.6 }, // 加速：击鼓、扣钟（扣钟每六格一次）
  { t0: 28.35, t1: 999, scale: 3 }, // 加速：浑象浑仪随天旋转
];

/** 平滑过渡：每段边界处用 0.35 s 的余弦过渡，避免速度突变 */
const BLEND = 0.35;

export function scaleAt(t: number): number {
  for (let i = 0; i < SCALE.length; i++) {
    const s = SCALE[i];
    if (t < s.t1 || i === SCALE.length - 1) {
      const prev = i > 0 ? SCALE[i - 1].scale : s.scale;
      const d = t - s.t0;
      if (i > 0 && d < BLEND) {
        const k = 0.5 - 0.5 * Math.cos((Math.max(0, d) / BLEND) * Math.PI);
        return prev + (s.scale - prev) * k;
      }
      return s.scale;
    }
  }
  return 1;
}

/** 当前所在段的目标倍速（不含过渡），用于速度标记 */
export function segmentScaleAt(t: number): number {
  for (const s of SCALE) if (t < s.t1) return s.scale;
  return SCALE[SCALE.length - 1].scale;
}

// 预先积分得到 simTime(filmTime)
const DT = 1 / 600;
const TABLE: number[] = [];
{
  let acc = 0;
  for (let i = 0; i * DT <= 120; i++) {
    TABLE.push(acc);
    const t = i * DT;
    acc += 0.5 * (scaleAt(t) + scaleAt(t + DT)) * DT;
  }
}
export function simTimeAt(t: number): number {
  if (t <= 0) return 0;
  const f = t / DT;
  const i = Math.floor(f);
  if (i + 1 >= TABLE.length) return TABLE[TABLE.length - 1] + (t - (TABLE.length - 1) * DT) * scaleAt(t);
  return TABLE[i] + (TABLE[i + 1] - TABLE[i]) * (f - i);
}
/** 反查：仿真时间 -> 影片时间 */
export function filmTimeAt(sim: number): number {
  let lo = 0, hi = 120;
  for (let k = 0; k < 50; k++) {
    const m = (lo + hi) / 2;
    if (simTimeAt(m) < sim) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}
