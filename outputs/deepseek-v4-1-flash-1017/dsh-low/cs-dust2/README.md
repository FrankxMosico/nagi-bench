# Dust Operations — 3D FPS Prototype

A playable browser-based 5v5 tactical FPS prototype inspired by Dust2's core layout.
Built from scratch with **React 18 + TypeScript + three.js**. No external models,
textures, fonts, or audio files are used — geometry, materials, signage, and sound are
generated procedurally at runtime.

## Run

```bash
npm install
npm run dev
```

Open the Vite URL, choose **CT** or **T**, deploy, then click **继续作战** to lock the mouse.
Press **Esc** to pause/release the pointer.

Production build:

```bash
npm run build
npm run preview
```

## Controls

| Input | Action |
| --- | --- |
| `WASD` | Move |
| `Space` | Jump |
| Mouse | Look / fire |
| Right mouse | AWP scope |
| `1` / `2` / `3` | Primary / secondary / knife |
| Mouse wheel | Cycle weapon slots |
| `R` | Reload |
| `E` (hold) | Plant C4 (T) / defuse C4 (CT) |
| `B` | Armory during buy phase (pistols only on pistol round) |
| `Q` / `E` while dead | Cycle spectated teammate |
| Left mouse / `Space` while dead | Take control of spectated bot |

## Implemented Systems

- **Map**: original procedural Dust2-core layout containing T spawn, CT spawn, A-long,
  A site, mid doors with an actual animated door body, catwalk, B tunnels, and B site.
  Smooth AABB collisions for every wall, crate, barrier, and barrel.
- **Characters**: fully articulated humanoids with head, torso, two arms, two legs,
  team uniforms, held procedural weapons, walk/death animation, and independent
  head/chest/abdomen/arm/leg hitboxes.
- **Weapons**: data-driven AK-47, M4A4, AWP, Glock-18, USP-S, Desert Eagle and knife.
  Per-weapon damage, RPM, spread, recoil, bloom, falloff, armor penetration, reload
  times, magazine sizes and first-person models. AWP has a zoomed FOV and a 2D scope
  mask. Headshot base damage is 2× chest damage.
- **Round flow**: pistol round with default pistols and light armor, freeze time,
  full-buy rounds, buy menu, score tracking, elimination win conditions, C4 planting,
  defusing, dropping/pickup, explosion, and round restart.
- **AI**: 9 bots with A* navigation + path smoothing, stuck recovery, vision cones and
  wall-occluded line-of-sight checks, reactive combat, site attack/defense objectives,
  bomb retrieval, planting and defusing.
- **HUD**: dynamic crosshair spread, health/armor, ammo and reload state, killfeed,
  round clock and score, interaction progress, spectator/takeover UI, permanent canvas
  minimap with spotted-enemy logic and C4 tracking.
- **Audio**: full Web Audio synthesized gunshots, reloads, footsteps, scope, hit/kill
  feedback, plant/defuse beeps and explosion.


## Code Architecture

- `src/game/engine.ts` — authoritative game loop, player controller, raycast hit
  resolution, C4/round state machine, AI steering and HUD snapshots.
- `src/game/map.ts` — procedural Dust2-core geometry, colliders, signage, lighting
  props, animated mid doors, bomb-site definitions and navigation-grid creation.
- `src/game/pathfinding.ts` — 8-direction A* with a binary heap, corner validation,
  nearest-walkable recovery and string-pulled paths.
- `src/game/humanModel.ts` / `weaponModels.ts` — articulated humanoid rig and
  data-driven procedural weapon/viewmodel geometry.
- `src/game/weapons.ts` — extendable weapon table, loadout factory and faction rules.
- `src/game/audio.ts` — runtime Web Audio synthesis graph.
- `src/components/HUD.tsx`, `Minimap.tsx`, `GameView.tsx` — 2D overlay, live canvas
  radar, pointer-lock shell, React state bridge and engine lifecycle.

The React layer never drives per-frame simulation. The engine owns the fixed-state
authority and publishes throttled immutable HUD snapshots; React renders those snapshots.
