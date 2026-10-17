# 陨石 · METEORITE

一部使用 Three.js、程序化体素几何与 Web Audio 实时合成的 5 分 54 秒（354 秒）短片。
改编自刘慈欣《三体》中章北海收购陨石、制造陨石子弹并在黄河站外实施刺杀的一段。

## 运行

```bash
bun run dev      # 开发预览
bun run build    # 生成 dist/
bun run preview  # 预览构建产物
```

构建产物为标准 Vite 输出：`dist/index.html` 与 `dist/assets/`。所有人物、场景、材质、
字幕与声音都在运行时生成，不读取任何外部图片、模型或音频文件。

## 结构

- `src/film/timeline.ts` — 绝对时间轴与 30 次击发时刻。
- `src/film/shots.ts` — 27 个镜头，全部使用绝对 `start` / `end`。
- `src/film/cues.ts` — 唯一的语音清单 `voiceCues`（54 条，固定七字段）与
  程序化声音清单 `soundCues`（130 条）。
- `src/film/sets.ts` — 胡同、收藏室、车间、地下室、同步轨道、黄河站外等场景。
- `src/film/figures.ts` — Voxel Kit 人物皮肤、服装、表情与道具。
- `src/film/audio.ts` — 49 个 Web Audio 合成工厂：房间、电梯、机床、枪声与混响、
  航天服呼吸、无线电、真空中经过航天服传导的闷震等。
- `src/film/textures.ts` — 所有程序化 Canvas 材质。

字幕由语音清单直接驱动，统一显示为 `【说话者】文本`。真空中的外部枪声不传播，
只保留航天服内部听到的低频闷震、机械动作与主观化低频冲击。
