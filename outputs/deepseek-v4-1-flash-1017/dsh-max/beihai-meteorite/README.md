# 陨石子弹 / The Meteor Bullets

A procedural, single-timeline Three.js film adapted from the Zhang Beihai section of
Liu Cixin's *The Three-Body Problem II: The Dark Forest*. Runtime is **356 seconds**,
including the opening and end card.

## Run

```bash
bun run dev       # development server
bun run build     # standard Vite production build -> dist/
bun run preview   # serve dist/
bun run typecheck # tsc --noEmit
```

All project commands are Bun commands. Runtime dependencies are only `three` and the
local `@agentbench/cinematic-player` / `@agentbench/voxel-kit` packages.

## Controls

Click **开始放映**, or press Space, to begin. The transport supports play/pause, seeking,
volume and fullscreen. Arrow keys seek by ten seconds.

## Production notes

- **Shot list / direction** — `src/shots.ts`. Every shot is a timed declarative entry with
  enter/update/leave hooks.
- **Voice manifest** — `src/cues.ts`. Every line is a single record with exactly
  `id`, `kind`, `speaker`, `text`, `delivery`, `start`, `end`. The provided cinematic
  controls render every subtitle as bottom-centred `【speaker】text`. There is no
  speech synthesis and no recorded voice: performance is delegated to the reader.
- **Sound** — `src/lib/audio.ts`. Ambience, score, foley, room impulses, the concrete
  gunshot, vacuum impacts and radio noise are built at runtime with Web Audio API
  oscillators, generated buffers and generated impulse responses. No audio files,
  samples or `data:audio` URLs exist in the project.
- **Figures** — all human bodies are created once through `createFigure` from
  `@agentbench/voxel-kit`; proportions and skeleton stay fixed. Faces and insignia are
  painted into generated 64×64 skins, never modelled.
- **Worlds** — `src/world/` contains the procedural hutong, collector's museum, lathe
  workshop, basement, Earth-orbit station and return base. Materials, textures and
  geometry are generated in code; there are no imported art assets.
- **Verification** — the production was checked in Chromium with a real click on the
  start control, timeline advance, pause/resume, drag/seek through the provided range
  input, responsive resize at 800×450 / 960×540 / 1440×900, and a zero-error console.
  All 46 distinct sound factories were exercised in a running AudioContext without
  exceptions.
