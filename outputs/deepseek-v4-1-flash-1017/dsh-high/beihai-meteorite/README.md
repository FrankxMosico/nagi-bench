# 陨石子弹 · Meteor Bullets

一部 5 分 30 秒的程序化体素电影，使用 Three.js、AgentBench Cinematic Player 与 Voxel Kit 制作。

## 运行

```bash
bun run dev
bun run build
```

产物位于 `dist/`，`dist/index.html` 使用本地 `dist/assets/` 资源，可直接由静态服务器播放。声音必须通过页面的“开始放映”按钮解锁；所有画面、纹理、粒子与声音均在运行时由代码生成。

## 结构

- `src/film/cues.ts` — 唯一的 `VoiceCue[]` 语音清单（固定七字段）与全部 `SoundCue[]`；字幕直接由此清单驱动。
- `src/film/audio.ts` — 全部基于 Web Audio API 的程序化声音设计，无采样、无音频文件。
- `src/film/cast.ts` — 所有人物均由 Voxel Kit 的 `createFigure` 装配；面部、制服与头盔全部画在 64×64 皮肤贴图上。
- `src/film/shop.ts` / `workshop.ts` / `basement.ts` / `space.ts` — 四组程序化场景。
- `src/film/shots.ts` — 37 个绝对时间镜头，总时长 330 秒。
- `src/main.ts` — 播放器、渲染舞台、片名/字幕层与播放控制。
