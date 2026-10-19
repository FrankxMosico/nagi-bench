// 影片时间线：物理时间映射、镜头关键帧、字幕、标注、因果链提示条。
//
// 物理是确定性的（固定步长、固定初始状态），机械事件（枢衡下压、天关放开、锁住、击鼓、敲钟）
// 总在相同的物理时刻发生。physEvents.json 由 tools/events.ts 离线跑同一套仿真得到，
// 这里只用它来决定“慢放哪一拍、字幕何时切换”——画面里的运动仍完全由实时物理计算。
import EV from "./physEvents.json";

// ---------------------------------------------------------------- 物理时间 ↔ 影片时间
// 关键一拍：影片 ~10 秒后、第一次枢衡下压的那一拍。从上一拍锁住到这一拍锁住分段慢放。
const iKey = EV.steps.findIndex((s) => s.dip > 10.5);
const KEY = EV.steps[iKey];
const PREV = EV.steps[iKey - 1];

/** 影片时间 ↔ 物理时间的分段线性对应（慢放区间） */
const KNOTS: [number, number][] = [
  [9.9, PREV.lock + 0.15], // 之前：1 倍速
  [11.6, KEY.dip - 0.05], // 水斗装满（约 0.6 倍）
  [13.6, KEY.release + 0.05], // 枢衡压下 → 天条 → 天衡 → 天关抬起（约 0.3 倍）
  [15.6, KEY.lock + 0.12], // 枢轮转过一格、天关落下锁住（约 0.5 倍）；之后恢复 1 倍速
];
export const PHYS0 = KNOTS[0][1] - KNOTS[0][0];

export function physTimeAt(t: number): number {
  if (t <= KNOTS[0][0]) return PHYS0 + t;
  for (let i = 0; i < KNOTS.length - 1; i++) {
    const [t0, T0] = KNOTS[i], [t1, T1] = KNOTS[i + 1];
    if (t <= t1) return T0 + ((t - t0) / (t1 - t0)) * (T1 - T0);
  }
  const [tl, Tl] = KNOTS[KNOTS.length - 1];
  return Tl + (t - tl);
}
export function filmTimeAt(T: number): number {
  if (T <= KNOTS[0][1]) return T - PHYS0;
  for (let i = 0; i < KNOTS.length - 1; i++) {
    const [t0, T0] = KNOTS[i], [t1, T1] = KNOTS[i + 1];
    if (T <= T1) return t0 + ((T - T0) / (T1 - T0)) * (t1 - t0);
  }
  const [tl, Tl] = KNOTS[KNOTS.length - 1];
  return tl + (T - Tl);
}
/** 当前播放速率（<1 为慢放） */
export function playRate(t: number) {
  for (let i = 0; i < KNOTS.length - 1; i++) {
    const [t0, T0] = KNOTS[i], [t1, T1] = KNOTS[i + 1];
    if (t > t0 && t < t1) return (T1 - T0) / (t1 - t0);
  }
  return 1;
}

// 关键时刻（影片时间）
const F = {
  dip: filmTimeAt(KEY.dip),
  release: filmTimeAt(KEY.release),
  lock: filmTimeAt(KEY.lock),
};

// ---------------------------------------------------------------- 场景分段
export const SCENE = {
  water: [5.0, 9.6], esc: [9.6, 18.4], gears: [18.4, 21.6], upper: [21.6, 24.0], time: [24.0, 29.4], end: [29.4, 34.4],
} as const;
export const FILM_END = SCENE.end[1];

// ---------------------------------------------------------------- 镜头
export interface CamKey { t: number; pos: [number, number, number]; tgt: [number, number, number]; fov?: number }
// 每组为一个连续运动的镜头；cut 表示与上一组之间用短暂黑场切换。
export const SHOTS: { cut?: boolean; keys: CamKey[] }[] = [
  { // 片头：黄昏中的仪象台
    keys: [
      { t: 0.0, pos: [-5.5, 8.8, 17.5], tgt: [-4.6, 6.4, 0.6], fov: 40 },
      { t: 4.6, pos: [-12.4, 6.4, 11.4], tgt: [-3.0, 5.0, 0.8], fov: 40 },
    ],
  },
  { // 水：天池 → 平水壶 → 出水口 → 水斗（侧面）
    keys: [
      { t: 4.6, pos: [-12.4, 6.4, 11.4], tgt: [-3.0, 5.0, 0.8], fov: 40 },
      { t: 6.6, pos: [-8.0, 3.45, 2.1], tgt: [-1.85, 3.1, 1.7], fov: 40 },
      { t: 9.6, pos: [-7.3, 3.25, 1.9], tgt: [-1.85, 2.95, 1.55], fov: 40 },
    ],
  },
  { // 擒纵：水斗、枢衡、天条、天衡、天关（侧面看整个擒纵机构）
    keys: [
      { t: 9.6, pos: [-7.3, 3.25, 1.9], tgt: [-1.85, 2.95, 1.55], fov: 40 },
      { t: 10.7, pos: [-9.2, 3.4, 1.3], tgt: [-2.1, 3.32, 0.95], fov: 40 },
      { t: 15.6, pos: [-9.0, 3.4, 1.2], tgt: [-2.1, 3.32, 0.85], fov: 40 },
      { t: 18.4, pos: [-9.7, 3.45, 0.6], tgt: [-2.0, 3.3, 0.2], fov: 40 },
    ],
  },
  { // 传动：塔内右后方低机位，看冠齿轮正面 → 灯笼齿轮 → 天柱
    cut: true,
    keys: [
      { t: 18.4, pos: [2.1, 2.95, -1.7], tgt: [-0.6, 3.3, -0.5], fov: 48 },
      { t: 21.6, pos: [1.85, 3.3, -1.45], tgt: [-0.5, 3.7, -0.45], fov: 48 },
    ],
  },
  { // 楼上：浑象、浑仪
    cut: true,
    keys: [
      { t: 21.6, pos: [-3.5, 7.7, 8.2], tgt: [0.25, 7.9, -0.1], fov: 40 },
      { t: 24.0, pos: [-4.4, 9.5, 9.0], tgt: [0.25, 9.1, -0.2], fov: 40 },
    ],
  },
  { // 报时：机轮、拨牙、木人、时辰牌
    cut: true,
    keys: [
      { t: 24.0, pos: [0.95, 1.85, 6.3], tgt: [1.05, 1.75, 2.3], fov: 36 },
      { t: 27.0, pos: [0.4, 1.9, 5.6], tgt: [1.0, 1.6, 2.1], fov: 36 },
      { t: 29.4, pos: [-1.5, 2.2, 5.1], tgt: [0.9, 1.25, 1.7], fov: 38 },
    ],
  },
  { // 总结：全景（塔居右，左侧留给结尾文字）
    cut: true,
    keys: [
      { t: 29.4, pos: [-11.4, 5.6, 9.6], tgt: [-3.1, 5.3, -2.9], fov: 40 },
      { t: 34.4, pos: [-15.0, 6.8, 12.8], tgt: [-3.5, 5.7, -3.4], fov: 40 },
    ],
  },
];

// ---------------------------------------------------------------- 字幕
export interface Caption { t0: number; t1: number; num?: string; main: string; sub?: string }
export const CAPTIONS: Caption[] = [
  { t0: 5.0, t1: 9.5, num: "1", main: "<b>平水壶</b>保持水位恒定，水以均匀的流量注入枢轮上的<b>水斗</b>", sub: "水位不变，出水就均匀——这是准确计时的前提" },
  { t0: 9.9, t1: 11.6, num: "2", main: "水斗渐渐装满，压在<b>枢衡</b>（一杆秤）的格叉上" },
  { t0: 11.6, t1: 13.6, num: "3", main: "重过<b>枢权</b>，枢衡被压下 → 拉紧<b>天条</b> → <b>天衡</b>翘起，提起<b>天关</b>" },
  { t0: 13.6, t1: 15.65, num: "4", main: "天关一开，<b>枢轮</b>转过一格；天关随即落下，卡住下一根横档" },
  { t0: 15.7, t1: 18.3, num: "5", main: "下一只水斗接着注水——<b>装满一斗，才走一格</b>", sub: "流量恒定，所以每一格用时相等：这一“擒”一“纵”，就是钟表计时的关键" },
  { t0: 18.65, t1: 21.5, num: "6", main: "枢轮轴上的齿轮拨动灯笼齿轮：枢轮走一格，<b>天柱</b>就跟着转一段" },
  { t0: 21.85, t1: 23.9, num: "7", main: "天柱把转动送上楼：<b>浑象</b>、<b>浑仪</b>随天空同步旋转" },
  { t0: 24.25, t1: 29.3, num: "8", main: "天柱还带动<b>机轮</b>：拨牙转到位，就拨动木人<b>敲钟</b>、<b>击鼓</b>报时", sub: "时辰牌也随机轮依次转到窗口（演示中时间已大大加快）" },
];

// ---------------------------------------------------------------- 标注（锚点名见 MachineVisuals.anchor）
export interface LabelCue { t0: number; t1: number; anchor: string; text: string; small?: string; dx: number; dy: number; hot?: [number, number][] }
const ESC_END = SCENE.esc[1] - 0.1;
export const LABELS: LabelCue[] = [
  { t0: 5.9, t1: 9.4, anchor: "tianchi", text: "天池", small: "储水，经虹吸管供水", dx: 150, dy: 30 },
  { t0: 6.1, t1: 9.4, anchor: "pingshui", text: "平水壶", small: "水位恒定", dx: 120, dy: 20 },
  { t0: 6.3, t1: 9.4, anchor: "spout", text: "出水口", dx: 40, dy: 75 },
  { t0: 6.2, t1: F.dip + 0.6, anchor: "bucket", text: "水斗", dx: -120, dy: 10 },
  { t0: 10.0, t1: ESC_END, anchor: "fork", text: "枢衡", small: "秤杆", dx: 30, dy: -62, hot: [[F.dip - 0.05, F.release + 0.15]] },
  { t0: 10.3, t1: ESC_END, anchor: "forkWeight", text: "枢权", small: "秤砣", dx: -150, dy: -55 },
  { t0: 10.6, t1: ESC_END, anchor: "chain", text: "天条", small: "链", dx: -95, dy: 30, hot: [[F.dip + 0.25, F.release + 0.2]] },
  { t0: 10.6, t1: ESC_END, anchor: "bal", text: "天衡", dx: 70, dy: 45, hot: [[F.dip + 0.5, F.release + 0.25]] },
  { t0: 10.6, t1: ESC_END, anchor: "pawl", text: "天关", small: "卡住横档", dx: -130, dy: 40, hot: [[F.dip + 0.8, F.release + 0.3], [F.lock - 0.1, F.lock + 0.5]] },
  { t0: F.release - 0.1, t1: ESC_END, anchor: "wheel", text: "枢轮", dx: -90, dy: 50, hot: [[F.release, F.lock]] },
  { t0: 18.7, t1: 21.45, anchor: "crown", text: "冠齿轮", small: "装在枢轮轴上", dx: 120, dy: 40 },
  { t0: 18.9, t1: 21.45, anchor: "lantern", text: "灯笼齿轮", small: "装在天柱上", dx: -150, dy: -10 },
  { t0: 19.1, t1: 21.45, anchor: "tianzhu", text: "天柱", small: "传动立轴", dx: -170, dy: 20 },
  { t0: 19.4, t1: 21.45, anchor: "spurA", text: "齿轮", small: "再带动机轮（报时）", dx: 150, dy: -20 },
  { t0: 21.9, t1: 23.9, anchor: "globe", text: "浑象", small: "天球仪", dx: 120, dy: 30 },
  { t0: 22.1, t1: 23.9, anchor: "armillary", text: "浑仪", small: "观测天体", dx: 130, dy: -20 },
  { t0: 22.0, t1: 23.9, anchor: "tianzhuUp", text: "天柱", dx: -110, dy: 20 },
  { t0: 24.4, t1: 29.3, anchor: "jackBell", text: "敲钟木人", dx: 120, dy: -40 },
  { t0: 24.4, t1: 29.3, anchor: "jackDrum", text: "击鼓木人", dx: -120, dy: -50 },
  { t0: 24.8, t1: 29.3, anchor: "placard", text: "时辰牌", dx: 140, dy: 30 },
  { t0: 25.2, t1: 29.3, anchor: "peg", text: "拨牙", small: "装在机轮上", dx: -110, dy: 40 },
  { t0: 30.4, t1: 34.0, anchor: "noria", text: "升水轮", small: "人力把水提回天池，循环使用", dx: -40, dy: -70 },
];

// ---------------------------------------------------------------- 因果链提示条
export const HUD_NODES = ["水流", "水斗", "枢衡", "天条·天衡", "天关", "枢轮", "天柱", "浑象·浑仪", "报时"];
export const HUD_SPAN = { t0: 5.0, t1: SCENE.time[1] };

// 镜头中各部分的讲解高亮（基础强度，物理状态会再叠加）
export const FOCUS: { t0: number; t1: number; keys: string[] }[] = [
  { t0: 5.0, t1: F.dip, keys: ["bucket"] },
  { t0: 18.6, t1: 21.6, keys: ["crown", "tianzhu"] },
  { t0: 21.7, t1: 24.0, keys: ["globeDrive", "armDrive", "armillary"] },
  { t0: 24.2, t1: 29.4, keys: ["peg"] },
];

// 画中画放大镜（以锚点为中心的特写相机）
export const INSET: { t0: number; t1: number; anchor: string; title: string; off: [number, number, number]; look: [number, number, number]; fov: number }[] = [
  { t0: 10.6, t1: ESC_END, anchor: "pawlCloseup", title: "放大：天关与横档", off: [-1.6, 0.12, -0.7], look: [0, -0.02, 0], fov: 30 },
];

export const NOTE_SPAN = { t0: 24.25, t1: 29.4, text: "演示已加速：真实的仪象台一昼夜才走完十二个时辰" };
export const END_TEXT_AT = 30.0;

/** 调试：打印各拍在影片中的时刻 */
export function describeTimeline() {
  return EV.steps.map((s) => `release ${filmTimeAt(s.release).toFixed(2)} lock ${filmTimeAt(s.lock).toFixed(2)}`).join("\n") +
    `\nbell ${EV.bell.map((t) => filmTimeAt(t).toFixed(2)).join(" ")}\ndrum ${EV.drum.map((t) => filmTimeAt(t).toFixed(2)).join(" ")}`;
}
