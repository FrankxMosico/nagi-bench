# DUST//STRIKE

一个可在浏览器直接运行的 **React 18 + TypeScript + three.js** 5v5 战术第一人称射击原型。地图、角色、武器与全部视觉纹理均由代码程序化生成；所有声音由 Web Audio API 实时合成，不包含任何外部模型、贴图、字体或音频资产。

## 快速开始

```bash
npm install
npm run dev
```

打开终端中显示的地址，选择 CT 或 T 阵营，点击「进入战场」。推荐桌面端 Chrome / Edge，并使用支持 WebGL2 与 Pointer Lock 的浏览器。

```bash
npm run build
npm run preview
```

## 操作

| 输入 | 功能 |
| --- | --- |
| `WASD` | 移动 |
| 鼠标 | 瞄准（指针锁定） |
| 左键 | 开火 |
| 右键 | AWP 开镜 / 收镜 |
| `Space` | 跳跃 |
| `Ctrl` | 蹲伏 |
| `Shift` | 静步 |
| `R` | 换弹 |
| `1 / 2 / 3` | 主武器 / 副武器 / 军刀 |
| 滚轮 | 循环切枪 |
| `E` | 按住安放 / 拆除 C4 |
| `F` | 玩家阵亡后立即接管存活队友 |
| `M` | 静音 |
| `Esc` | 释放鼠标（点击画面重新锁定） |

## 回合规则

- 第 1 回合固定为**手枪局**：全员只有阵营默认手枪（T = Glock，CT = USP）和军刀，无主武器、无护甲。结束后可选择下一回合的 AK-47 / M4A4 / AWP、Glock / USP / 沙鹰，以及 Kevlar + Helmet。
- C4 开局随机交给一名 T。携带者可以按 `E` 在 A 点或 B 点安放；倒计时 40 秒。
- C4 携带者阵亡后炸弹掉落，T 可走近拾取。持包者进入炸弹点后按住 `E` 3.2 秒完成安放。
- CT 在已安放的 C4 附近按住 `E` 8 秒完成拆除。
- T 消灭全部 CT，或 C4 爆炸，T 胜。
- CT 消灭全部 T 且 C4 尚未安放，或成功拆除 C4，CT 胜。若 T 全灭但 C4 已安放，回合继续，CT 仍需拆包。
- 105 秒回合时间；未下包且时间耗尽 CT 胜。
- 先到 7 分获胜。
- 玩家阵亡后会自动在 2.8 秒后接管最近的存活队友，也可按 `F` 立即接管。

## Dust2 核心区域与连通关系

地图坐标西侧为 A/B 区，东侧为 T 出生点，CT 出生点位于西侧中部：

```text
                 B SITE ── B TUNNELS ──┐
                   │                    │
                 B DOORS                │
                   │                    │
  A SITE ── CATWALK ─ MID ── MID DOORS ─ T MID ── T SPAWN
     │                 │                    │        │
  A RAMP            CT MID                  │     B TUNNELS
     │                 │                    │        │
  CT SPAWN ────────────┘                  A LONG ────┘
```

包含：T 出生点、CT 出生点、A 大、A 点、中门（带可穿越门体）、猫道、B 洞、B 点，以及 A Ramp、B Doors、CT Mid 等连接区域。

## 系统架构

- `src/game/GameEngine.ts` — 比赛生命周期、输入、物理更新、命中和 HUD 同步的总编排器。
- `src/game/Combatant.ts` — 10 名战斗单位的数据模型、装备槽、换弹与动画状态。
- `src/game/Character.ts` — 程序化类人角色：独立头部、胸部、腹部、双臂、双腿和世界武器挂点；身体网格同时就是分层 Hitbox。
- `src/game/WeaponModels.ts` — 第一人称和低模世界武器的几何构造。
- `src/game/FirstPersonView.ts` — 独立深度清理的 viewmodel 渲染层；开镜、后坐、换弹、摆动和切枪动画。
- `src/game/MapBuilder.ts` — Dust2 地图几何、程序化材质、光照、可穿越门、掩体与静态批处理。
- `src/data/mapLayout.ts` — 地图区域矩形、碰撞/掩体、炸弹点、出生点与 AI 目标点。
- `src/game/NavGrid.ts` — 基于可行走区域与静态碰撞膨胀的网格 A*，供所有 bot 使用。
- `src/game/AI.ts` — Bot 状态机：视野/遮挡感知、巡逻推进、交火、下包、拆包、防守、追击、C4 拾取。
- `src/game/PhysicsWorld.ts` — AABB 碰撞、玩家圆柱扫掠、平台落地、射线与视线检测。
- `src/game/AudioEngine.ts` — 全部音效的 Web Audio 合成器。
- `src/ui/` — React HUD、小地图 canvas、武器选择与开始/回合/比赛结算界面。
- `src/game/UIStore.ts` — 引擎与 React 之间的外部 store；游戏循环以固定频率构建不可变 HUD 快照，React 使用 `useSyncExternalStore` 消费。

### 数据与渲染同步

游戏逻辑不依赖 React state。引擎使用自己的渲染循环和定时器推进 simulation；React 只负责消费 HUD 快照、输入回调与关卡结算界面。这样 60 FPS 的物理/动画与 20 Hz 的 HUD 更新、事件驱动的 Killfeed 互不阻塞。

### 武器与伤害

- AK-47：36 基础伤害，明显的视角上扬与准星扩散。
- M4A4：30 基础伤害，高射速，低后坐力。
- AWP：115 基础伤害，右键 22° FOV 开镜并渲染 2D 瞄准镜遮罩，单发后收镜。
- Glock-18 / USP-S / Desert Eagle / 军刀。
- Hitbox 分区：头 2.0×、胸 1.0×、腹 0.85×、手臂 0.7×、腿 0.6×。
- 护甲按武器穿透率减伤并消耗护甲值；头盔会进一步降低爆头伤害。

### AI

每个 bot 有独立的感知节拍（FOV + 3D 墙体遮挡检查）、反应延迟、点射节奏与移动/作战状态。A* 网格在 CT/T 双方共用，但目标选择、站点分配和 C4 流程按阵营分开：

- T：推进目标点、携带者进点安放、拾取掉落 C4、下包后环形防守。
- CT：预置 A/B/Mid 防守点、听到枪声调查、C4 安放后强制回防并寻找拆包机会。
- 所有 bot 都会避免墙体与掩体，并在卡住时重新寻路。

### 性能

- 静态地图墙、装饰、掩体、路缘等会按材质合并为少量 draw call。
- 软件 WebGL（SwiftShader/llvmpipe）或自动检测到的低帧率会关闭阴影并使用内部低分辨率渲染；正常 GPU 使用程序化纹理、方向光阴影和 2048 shadow map。
- 场景仅使用少量动态点光源，避免逐材质光照开销。

## 无外部资产

工程中没有任何外部图片、模型或音频文件。沙地、砖墙、金属、木箱、C4 面板、阵营旗帜与 C4 LED 均为 Canvas 程序化纹理；枪声、脚步、换弹、开镜、命中、C4 蜂鸣与爆炸由振荡器、噪声缓冲和滤波器即时合成。

## 已知原型边界

这是单机 bot 原型，不含联机、经济系统、投掷物或完整的 CS 购买菜单；下一回合装备通过回合结算界面选择。地图按 Dust2 核心区域的空间关系重建，不追求逐厘米级还原。
