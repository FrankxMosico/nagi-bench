// 分镜脚本：镜头关键帧、字幕、标注、因果链高亮。时间单位：影片秒。
import type { LabelSpec } from './labels';
import type { ArrowSpec } from './arrows';

export interface CamKey { t: number; pos: [number, number, number]; look: [number, number, number]; fov?: number }
/** cut = true 表示从上一个镜头硬切到本镜头的第一帧 */
export interface Shot { keys: CamKey[]; cut?: boolean }

export const SHOTS: Shot[] = [
  // 1 开场：夜色中的仪象台，镜头缓缓推近
  { keys: [
    { t: 0.0, pos: [14.5, 2.6, 21.5], look: [0.2, 5.8, 0], fov: 36 },
    { t: 4.3, pos: [12.8, 4.6, 15.6], look: [0.3, 5.8, 0], fov: 36 },
  ] },
  // 2 剖开：镜头绕向东南，东侧被一刀剖开，露出三层与内部机构
  { keys: [
    { t: 4.3, pos: [12.8, 4.6, 15.6], look: [0.3, 5.8, 0], fov: 36 },
    { t: 7.1, pos: [18.0, 6.6, 9.6], look: [0.3, 5.9, -0.2], fov: 36 },
  ] },
  // 3 水源：天池 → 平水壶 → 渴乌 → 出水口 → 水斗
  { cut: true, keys: [
    { t: 7.1, pos: [6.4, 5.25, 0.75], look: [1.85, 5.15, -1.15], fov: 42 },
    { t: 10.4, pos: [5.6, 4.8, 0.45], look: [1.95, 4.6, -0.85], fov: 42 },
  ] },
  // 4 天衡擒纵：受水壶、格叉、天条、天衡、天关同框
  { keys: [
    { t: 10.4, pos: [5.6, 4.8, 0.45], look: [1.95, 4.6, -0.85], fov: 42 },
    { t: 12.1, pos: [4.85, 4.22, -0.62], look: [2.05, 4.18, -0.62], fov: 42 },
    { t: 17.6, pos: [4.55, 4.2, -0.56], look: [2.05, 4.16, -0.58], fov: 42 },
  ] },
  // 5 一斗一格：拉远看整只枢轮的节拍
  { keys: [
    { t: 17.6, pos: [4.55, 4.2, -0.56], look: [2.05, 4.16, -0.58], fov: 42 },
    { t: 20.5, pos: [9.3, 2.9, 0.7], look: [1.7, 2.45, 0.1], fov: 40 },
  ] },
  // 6 传动：地毂冠齿 → 天柱（灯笼齿）→ 天柱下端 → 机轮销轮，同框；再沿机轮升到顶端
  { cut: true, keys: [
    { t: 20.5, pos: [-2.45, 2.4, -1.7], look: [0.05, 1.6, 0.6], fov: 54 },
    { t: 22.75, pos: [-2.55, 2.55, -1.5], look: [0.0, 1.65, 0.65], fov: 54 },
    { t: 23.9, pos: [-1.6, 5.75, -0.15], look: [-0.5, 4.88, 1.4], fov: 44 },
  ] },
  // 7a 报时（木阁内部）：拨牙顶起杠杆（原速）
  { keys: [
    { t: 23.9, pos: [-1.6, 5.75, -0.15], look: [-0.5, 4.88, 1.4], fov: 44 },
    { t: 24.7, pos: [-1.45, 5.55, 0.35], look: [-0.55, 4.92, 1.6], fov: 42 },
    { t: 25.55, pos: [-1.3, 5.4, 0.75], look: [-0.55, 4.95, 1.8], fov: 40 },
  ] },
  // 7b 报时（木阁正面）：击鼓、扣钟、司辰木人出窗
  { cut: true, keys: [
    { t: 25.55, pos: [-0.42, 5.12, 5.05], look: [-0.45, 4.52, 2.0], fov: 40 },
    { t: 28.35, pos: [-0.36, 5.06, 4.78], look: [-0.45, 4.52, 2.0], fov: 40 },
  ] },
  // 8 终章：升至浑象、浑仪，再拉远看全台
  { keys: [
    { t: 28.35, pos: [-0.36, 5.06, 4.78], look: [-0.45, 4.52, 2.0], fov: 40 },
    { t: 29.95, pos: [3.4, 8.9, 7.9], look: [-0.7, 8.4, 0.0], fov: 40 },
    { t: 32.5, pos: [13.8, 7.4, 17.6], look: [0.2, 7.3, 0], fov: 36 },
  ] },
];

/** 低画质只有一盏室内灯：随镜头移到正在讲解的部位（属于灯光/镜头语言，不影响机构）。
 *  jump = true 表示在硬切处直接换位，否则在两键之间平滑移动 */
export const LITE_LAMP: { t: number; pos: [number, number, number]; jump?: boolean }[] = [
  { t: 0, pos: [3.1, 4.2, 0.5] },
  { t: 20.5, pos: [-0.75, 2.6, -0.85], jump: true },
  { t: 22.75, pos: [-0.75, 2.6, -0.85] },
  { t: 23.9, pos: [-1.15, 6.1, 0.45] },
  { t: 25.55, pos: [-0.45, 5.2, 3.3], jump: true },
  { t: 28.35, pos: [-0.45, 5.2, 3.3] },
  { t: 29.9, pos: [-0.4, 7.4, 1.6] },
];

export interface Caption { t0: number; t1: number; num?: string; html: string }
export const CAPTIONS: Caption[] = [
  { t0: 4.6, t1: 6.95, html: '它的全部动力，只有<em>一股稳定的水流</em>' },
  { t0: 7.25, t1: 10.35, num: '1', html: '天池注入<em>平水壶</em>，水位恒定，出水就均匀' },
  { t0: 10.55, t1: 12.3, num: '2', html: '水注入枢轮上的<em>水斗</em>，越来越重' },
  { t0: 12.35, t1: 14.15, num: '3', html: '满斗压下<em>格叉</em>，经<em>天条</em>、<em>天衡</em>提起<em>天关</em>' },
  { t0: 14.2, t1: 15.55, num: '3', html: '天关一开，<em>枢轮</em>转过一格' },
  { t0: 15.6, t1: 17.5, num: '4', html: '天关落下，<em>再次锁住</em>枢轮；下一斗接着受水' },
  { t0: 17.75, t1: 20.4, html: '一斗水走一格：水流被切成均匀的<em>“嘀嗒”</em>——擒纵' },
  { t0: 20.65, t1: 23.7, num: '5', html: '枢轮带动<em>地毂</em>，齿轮把转动传给<em>天柱</em>与<em>机轮</em>' },
  { t0: 23.95, t1: 25.5, num: '6', html: '机轮上的<em>拨牙</em>按时顶起杠杆……' },
  { t0: 25.65, t1: 28.25, num: '6', html: '……木人<em>击鼓报刻</em>、<em>扣钟报时</em>，司辰木人出窗' },
  { t0: 28.45, t1: 30.2, html: '同一股水，还让<em>浑象、浑仪</em>随天穹同步旋转' },
];

export const TITLE = { t0: 0.5, t1: 4.0 };
export const END = { t0: 30.35 };
export const CUT = { t0: 4.7, t1: 6.4 }; // 墙体淡出

/** 因果链节点 */
export const CHAIN_NODES = ['水流', '水斗', '格叉', '天条·天衡', '天关', '枢轮', '天柱', '机轮', '木人报时'];
/** 各时段点亮的节点（下标） */
export const CHAIN_STEPS: { t0: number; t1: number; on: number[] }[] = [
  { t0: 7.1, t1: 10.5, on: [0] },
  { t0: 10.5, t1: 12.35, on: [1] },
  { t0: 12.35, t1: 12.95, on: [2] },
  { t0: 12.95, t1: 13.6, on: [3] },
  { t0: 13.6, t1: 14.2, on: [4] },
  { t0: 14.2, t1: 15.6, on: [5] },
  { t0: 15.6, t1: 17.6, on: [4] },
  { t0: 17.6, t1: 20.5, on: [0, 1, 2, 3, 4, 5] },
  { t0: 20.5, t1: 22.4, on: [5, 6] },
  { t0: 22.4, t1: 23.9, on: [6, 7] },
  { t0: 23.9, t1: 28.35, on: [7, 8] },
];
export const CHAIN_SHOW = { t0: 7.1, t1: 28.45 };

/** 运动箭头：部件动起来时显示其运动方向 */
export const ARROWS: ArrowSpec[] = [
  // 擒纵：满斗压下格叉 → 天条下拉 → 天衡一端下沉、一端翘起 → 天关抬起 → 枢轮转动 → 天关落下
  { t0: 12.2, t1: 17.4, anchor: 'fork', dir: [0, -1, 0], drive: 'fork' },
  { t0: 12.2, t1: 17.4, anchor: 'chain', dir: [0, -1, 0], drive: 'fork' },
  { t0: 12.2, t1: 17.4, anchor: 'upperR', dir: [0, -1, 0], drive: 'upper', size: 0.8 },
  { t0: 12.2, t1: 17.4, anchor: 'upperL', dir: [0, 1, 0], drive: 'upper', size: 0.8 },
  { t0: 12.2, t1: 17.4, anchor: 'lock', dir: [0, 1, 0], drive: 'lockUp' },
  { t0: 12.2, t1: 17.4, anchor: 'lock', dir: [0, -1, 0], drive: 'lockDown' },
  { t0: 12.2, t1: 17.4, anchor: 'wheelRim', dir: 'wheelRimAhead', drive: 'wheel', size: 1.25 },
  { t0: 17.8, t1: 20.4, anchor: 'wheelRimLow', dir: 'wheelRimLowAhead', drive: 'wheel', size: 1.2 },
  // 传动
  { t0: 20.6, t1: 22.9, anchor: 'crownRim', dir: 'crownRimAhead', drive: 'wheel' },
  { t0: 20.6, t1: 22.9, anchor: 'lanternRim', dir: 'lanternRimAhead', drive: 'tianzhu' },
  { t0: 20.6, t1: 22.9, anchor: 'jilunGearRim', dir: 'jilunGearRimAhead', drive: 'jilun' },
  // 报时（内部）：拨牙把杠杆尾端顶起
  { t0: 24.4, t1: 25.5, anchor: 'drumTail', dir: [0, 1, 0], drive: 'drumLift', size: 0.9 },
];

export const LABELS: LabelSpec[] = [
  // 剖开时的三层
  { t0: 5.3, t1: 7.05, anchor: 'armRoom', text: '浑仪', sub: '顶层 · 观测天象', dx: 0.11, dy: -0.05 },
  { t0: 5.5, t1: 7.05, anchor: 'globeRoom', text: '浑象', sub: '中层 · 演示星空', dx: 0.13, dy: -0.02 },
  { t0: 5.7, t1: 7.05, anchor: 'mugo', text: '报时木阁', sub: '下层 · 木人报时', dx: -0.17, dy: 0.06 },
  { t0: 5.9, t1: 7.05, anchor: 'wheel', text: '枢轮', sub: '水力驱动的大轮', dx: 0.12, dy: 0.1 },
  // 水源
  { t0: 7.4, t1: 10.4, anchor: 'tian', text: '天池', sub: '储水', dx: 0.1, dy: -0.1 },
  { t0: 7.7, t1: 10.4, anchor: 'ping', text: '平水壶', sub: '多余的水溢走，水位不变', dx: 0.16, dy: -0.15 },
  { t0: 8.2, t1: 10.4, anchor: 'spout', text: '渴乌', sub: '虹吸管，匀速出水', dx: -0.18, dy: -0.1 },
  { t0: 8.6, t1: 12.6, anchor: 'scoop', text: '水斗', sub: '受水壶 · 共 36 只', dx: -0.22, dy: -0.02, hot: 'scoop0' },
  // 天衡擒纵
  { t0: 11.0, t1: 17.6, anchor: 'fork', text: '格叉', sub: '托住水斗，称它的重', dx: -0.16, dy: 0.1, hot: 'fork' },
  { t0: 11.4, t1: 17.6, anchor: 'chain', text: '天条', sub: '铁链', dx: 0.11, dy: 0.0, hot: 'chain' },
  { t0: 11.8, t1: 17.6, anchor: 'upper', text: '天衡', sub: '上方杠杆', dx: 0.27, dy: 0.0, hot: 'upper' },
  { t0: 12.2, t1: 17.6, anchor: 'lock', text: '天关', sub: '锁住枢轮的闸', dx: -0.15, dy: -0.06, hot: 'lock' },
  { t0: 12.4, t1: 17.6, anchor: 'forkWeight', text: '枢权', sub: '配重', dx: 0.1, dy: 0.06 },
  // 传动
  { t0: 20.8, t1: 22.8, anchor: 'crownLbl', text: '地毂', sub: '枢轴上的冠齿', dx: 0.14, dy: -0.03 },
  { t0: 21.1, t1: 22.8, anchor: 'tianzhuLbl', text: '天柱', sub: '立轴，灯笼齿与地毂啮合', dx: -0.22, dy: -0.04, hot: 'tianzhu' },
  { t0: 21.4, t1: 22.8, anchor: 'jilunLbl', text: '机轮', sub: '立轴，下端销轮受天柱带动', dx: 0.16, dy: -0.02, hot: 'jilun' },
  { t0: 24.0, t1: 25.5, anchor: 'pegLbl', text: '拨牙', sub: '机轮上端，随轮慢转', dx: -0.1, dy: 0.14 },
  { t0: 24.5, t1: 25.5, anchor: 'drumTail', text: '杠杆尾端', sub: '被拨牙顶起', dx: -0.13, dy: -0.13, hot: 'figures' },
  // 报时
  { t0: 25.75, t1: 28.3, anchor: 'drummer', text: '击鼓木人', sub: '绿衣 · 每刻击鼓', dx: -0.2, dy: 0.0, hot: 'figures' },
  { t0: 26.0, t1: 28.3, anchor: 'bell', text: '扣钟木人', sub: '紫衣 · 按时扣钟', dx: 0.17, dy: -0.15, hot: 'figures' },
  { t0: 26.3, t1: 28.3, anchor: 'window', text: '司辰木人', sub: '手持时辰牌出窗', dx: 0.2, dy: 0.08 },
  // 终章
  { t0: 28.75, t1: 30.25, anchor: 'globe', text: '浑象', sub: '天球随天而转', dx: -0.15, dy: 0.1, hot: 'globe' },
  { t0: 29.05, t1: 30.25, anchor: 'armillary', text: '浑仪', sub: '三辰仪同步跟天', dx: 0.15, dy: -0.12, hot: 'armillary' },
];
