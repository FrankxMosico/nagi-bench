import { vec3 } from '../math.ts';
import type { MapDefinition, PropDef, RampDef, RoomDef } from './types.ts';

/*
 * Dust2 core layout, metres. Top-down: +X = east, +Z = south (T spawn is south, CT spawn north),
 * which matches the classic radar orientation (A site top-right, B site top-left).
 *
 *            B Site ── B Doors ── CT Mid ── CT ramp ── CT Spawn ── A Site ── Goose
 *                                   (CT ramp sits west of the mid axis: no spawn-to-spawn sightline)
 *              │                    │                               │  \
 *        Upper Tunnels          Mid Doors            Catwalk ── A Short   A Ramp
 *              │                    │                   │                   │
 *        Tunnel bend ── Lower ──── Mid ── Xbox ── Catwalk stairs        Long A
 *              │        Tunnels     │                                     │
 *        Tunnel entry           Top Mid                       Long Doors ─ Long Corner ── Pit
 *              │                    │                             │
 *        Outside Tunnels ─────── T Spawn ─────────────────── Outside Long
 *
 * Everything that is not a room or ramp is turned into solid wall by the map builder.
 */

const rooms: RoomDef[] = [
  { id: 'tspawn', name: 'T出生点', en: 'T Spawn', x0: 40, z0: 82, x1: 64, z1: 96, h: 0, floor: 'floor_sand' },
  { id: 'topmid', name: 'T中路', en: 'Top Mid', x0: 42, z0: 66, x1: 50, z1: 82, h: 0, floor: 'floor_sand' },
  { id: 'mid', name: '中路', en: 'Mid', x0: 40, z0: 30, x1: 50, z1: 66, h: 0, floor: 'floor_stone' },
  { id: 'xbox', name: '中路 Xbox', en: 'Xbox', x0: 50, z0: 56, x1: 56, z1: 62, h: 0, floor: 'floor_stone' },
  { id: 'ctmid', name: 'CT中路', en: 'CT Mid', x0: 34, z0: 24, x1: 50, z1: 30, h: 0, floor: 'floor_stone' },
  { id: 'ctspawn', name: 'CT出生点', en: 'CT Spawn', x0: 42, z0: 4, x1: 62, z1: 18, h: 1.2, floor: 'floor_tile' },
  // CT spawn's west exit is offset from the mid axis so there is no CT-spawn ↔ T-spawn sightline.
  { id: 'ctspawnwest', name: 'CT出生点', en: 'CT Spawn', x0: 34, z0: 10, x1: 42, z1: 18, h: 1.2, floor: 'floor_tile' },
  { id: 'asite', name: 'A点', en: 'A Site', x0: 66, z0: 4, x1: 86, z1: 24, h: 2.4, floor: 'floor_tile' },
  { id: 'goose', name: 'A点 Goose', en: 'Goose', x0: 86, z0: 4, x1: 96, z1: 10, h: 2.4, floor: 'floor_tile' },
  { id: 'longa', name: 'A大', en: 'Long A', x0: 84, z0: 24, x1: 96, z1: 56, h: 0, floor: 'floor_sand' },
  { id: 'longcorner', name: 'A大拐角', en: 'Long Corner', x0: 80, z0: 56, x1: 96, z1: 70, h: 0, floor: 'floor_sand' },
  { id: 'pit', name: '坑位', en: 'Pit', x0: 88, z0: 70, x1: 96, z1: 80, h: 0, floor: 'floor_sand' },
  { id: 'longdoors', name: 'A大门', en: 'Long Doors', x0: 74, z0: 62, x1: 80, z1: 68, h: 0, floor: 'floor_stone' },
  { id: 'outsidelong', name: 'A大外', en: 'Outside Long', x0: 64, z0: 62, x1: 74, z1: 92, h: 0, floor: 'floor_sand' },
  { id: 'catwalk', name: '猫道', en: 'Catwalk', x0: 50, z0: 24, x1: 55, z1: 46, h: 2.4, floor: 'floor_stone' },
  { id: 'ashort', name: 'A小', en: 'A Short', x0: 55, z0: 24, x1: 74, z1: 32, h: 2.4, floor: 'floor_stone' },
  { id: 'outsidetunnels', name: 'B洞外', en: 'Outside Tunnels', x0: 22, z0: 76, x1: 40, z1: 90, h: 0, floor: 'floor_sand' },
  { id: 'tunnelentry', name: 'B洞口', en: 'Tunnel Entrance', x0: 22, z0: 62, x1: 30, z1: 76, h: 0, floor: 'floor_dark' },
  { id: 'tunnelbend', name: 'B洞', en: 'Upper Tunnels', x0: 8, z0: 56, x1: 30, z1: 62, h: 0, floor: 'floor_dark' },
  { id: 'uppertunnel', name: 'B洞', en: 'Upper Tunnels', x0: 8, z0: 30, x1: 15, z1: 56, h: 0, floor: 'floor_dark' },
  { id: 'lowertunnel', name: '下B洞', en: 'Lower Tunnels', x0: 15, z0: 44, x1: 40, z1: 50, h: 0, floor: 'floor_dark' },
  { id: 'bsite', name: 'B点', en: 'B Site', x0: 6, z0: 6, x1: 26, z1: 30, h: 0, floor: 'floor_tile' },
  { id: 'bdoors', name: 'B门', en: 'B Doors', x0: 26, z0: 22, x1: 34, z1: 30, h: 0, floor: 'floor_stone' },
];

const ramps: RampDef[] = [
  { id: 'ctramp', name: 'CT坡', en: 'CT Ramp', x0: 34, z0: 18, x1: 42, z1: 24, axis: 'z', h0: 1.2, h1: 0, floor: 'floor_stone' },
  { id: 'ctaramp', name: 'CT通A', en: 'CT to A', x0: 62, z0: 6, x1: 66, z1: 16, axis: 'x', h0: 1.2, h1: 2.4, floor: 'floor_tile' },
  { id: 'aramp', name: 'A坡', en: 'A Ramp', x0: 86, z0: 10, x1: 96, z1: 24, axis: 'z', h0: 2.4, h1: 0, floor: 'floor_sand' },
  { id: 'catstairs', name: '猫道楼梯', en: 'Catwalk Stairs', x0: 50, z0: 46, x1: 55, z1: 56, axis: 'z', h0: 2.4, h1: 0, floor: 'floor_stone' },
];

const W = (x0: number, z0: number, x1: number, z1: number, y: number, h: number, mat: PropDef['mat'] = 'wall_plaster'): PropDef => ({
  x0, z0, x1, z1, y, h, mat, kind: 'wall',
});
const DOOR = (x0: number, z0: number, x1: number, z1: number, h = 3.1): PropDef => ({
  x0, z0, x1, z1, y: 0, h, mat: 'door_blue', kind: 'door',
});
const CRATE = (x0: number, z0: number, x1: number, z1: number, y: number, h: number, mat: PropDef['mat'] = 'crate'): PropDef => ({
  x0, z0, x1, z1, y, h, mat, kind: 'prop',
});
const ROOF = (x0: number, z0: number, x1: number, z1: number): PropDef => ({
  x0, z0, x1, z1, y: 3.6, h: 0.5, mat: 'roof_wood', kind: 'roof',
});

const props: PropDef[] = [
  // ── Mid Doors (中门): frame, lintel and two open door leaves leaving a 3.6 m gap ──
  W(40, 35.6, 43, 36.4, 0, 7),
  W(47, 35.6, 50, 36.4, 0, 7),
  W(43, 35.6, 47, 36.4, 3.3, 3.7),
  DOOR(43, 36.4, 43.15, 38.3, 3.2),
  DOOR(46.85, 33.7, 47, 35.6, 3.2),
  // Catwalk / mid separation: a full wall north of the mid doors (no sightline from catwalk
  // into CT mid), a railing south of them (1 m above catwalk, a wall seen from lower mid).
  W(49.6, 24, 50.4, 36.4, 0, 7),
  W(49.6, 36.4, 50.4, 44, 0, 3.4, 'wall_trim'),

  // ── Long Doors ──
  W(76.6, 62, 77.4, 63.4, 0, 7, 'wall_sand'),
  W(76.6, 66.6, 77.4, 68, 0, 7, 'wall_sand'),
  W(76.6, 63.4, 77.4, 66.6, 3.2, 3.8, 'wall_sand'),
  DOOR(77.4, 63.4, 79.0, 63.55),
  DOOR(77.4, 66.45, 79.0, 66.6),

  // ── B Doors ──
  W(29.6, 22, 30.4, 24, 0, 7),
  W(29.6, 28, 30.4, 30, 0, 7),
  W(29.6, 24, 30.4, 28, 3.2, 3.8),
  DOOR(27.8, 24, 29.6, 24.15),
  DOOR(27.8, 27.85, 29.6, 28),

  // ── Tunnel roofs ──
  ROOF(8, 33, 15, 56),
  ROOF(8, 56, 30, 62),
  ROOF(22, 62, 30, 74),
  ROOF(15, 44, 38, 50),

  // ── T spawn / top mid / mid ──
  CRATE(58, 84, 60, 86, 0, 1.2),
  CRATE(42, 92, 44.5, 94.5, 0, 1.3, 'crate_dark'),
  CRATE(61, 93, 63.5, 95.5, 0, 1.2),
  CRATE(42, 70, 43.6, 71.6, 0, 1.1),
  CRATE(47.2, 55.2, 49.6, 57.6, 0, 1.25), // Xbox
  CRATE(40, 52, 41.6, 53.6, 0, 1.1, 'crate_dark'),
  CRATE(34.2, 28, 36, 29.8, 0, 1.2),

  // ── Long ──
  CRATE(81, 57, 84, 62, 0, 2.6, 'metal_blue'), // blue container
  CRATE(92.5, 76.5, 95, 79, 0, 1.3), // pit
  CRATE(90.5, 30, 93.5, 34.5, 0, 1.4, 'car'), // A car
  CRATE(84.2, 44, 85.8, 45.6, 0, 1.0),
  CRATE(64.2, 70, 66, 71.8, 0, 1.2),
  CRATE(70, 80, 73.5, 86, 0, 2.6, 'metal_red'),

  // ── A site ──
  CRATE(74, 12, 76.2, 14.2, 2.4, 1.3),
  CRATE(74.4, 12.4, 75.8, 13.8, 3.7, 1.0, 'crate_dark'),
  CRATE(76.2, 12, 77.8, 13.6, 2.4, 1.0),
  CRATE(92.5, 4.2, 95.8, 7, 2.4, 1.3), // goose
  CRATE(66.2, 18, 68.2, 20.4, 2.4, 1.2),
  CRATE(70, 4.2, 72, 6, 2.4, 1.2, 'crate_dark'),

  // ── CT spawn ──
  // Building corner: breaks the long sightline from A site (through CT-to-A) across CT spawn.
  W(52, 8, 55, 15, 1.2, 3.4),
  CRATE(56, 4.2, 58, 6.2, 1.2, 1.2),
  CRATE(59, 15, 61, 17, 1.2, 1.1, 'crate_dark'),

  // ── B site ──
  CRATE(6.2, 6.2, 9.5, 9, 0, 1.2),
  CRATE(6.2, 9, 8.2, 11, 0, 1.2, 'crate_dark'),
  CRATE(10.5, 13, 14.5, 16.2, 0, 1.4, 'car'), // B car
  CRATE(17, 17, 19, 19, 0, 1.2),
  CRATE(17.2, 17.2, 18.8, 18.8, 1.2, 1.0, 'crate_dark'),
  CRATE(21, 8, 24, 10.2, 0, 1.4),
  CRATE(22.6, 27.4, 25, 29.8, 0, 1.2),

  // ── Tunnels ──
  CRATE(13, 38, 14.8, 39.8, 0, 1.0, 'crate_dark'),
  CRATE(22.2, 86, 24.6, 89.8, 0, 1.3),
  CRATE(36, 77, 38, 79, 0, 1.1),
];

export const DUST2: MapDefinition = {
  name: 'de_dust2',
  bounds: { x0: 0, z0: 0, x1: 100, z1: 100 },
  rooms,
  ramps,
  props,
  bombSites: {
    A: { x0: 68, z0: 6, x1: 86, z1: 22 },
    B: { x0: 7, z0: 7, x1: 25, z1: 27 },
  },
  spawns: {
    T: [vec3(47, 0, 88), vec3(51, 0, 90), vec3(55, 0, 88), vec3(59, 0, 90), vec3(51, 0, 93.5)],
    CT: [vec3(48, 1.2, 8), vec3(51, 1.2, 6), vec3(57, 1.2, 9), vec3(49, 1.2, 12), vec3(57, 1.2, 13)],
  },
  routes: {
    long: [vec3(69, 0, 80), vec3(69, 0, 65), vec3(78, 0, 65), vec3(88, 0, 62), vec3(90, 0, 48), vec3(89, 0, 28), vec3(91, 1.4, 16), vec3(83, 2.4, 13)],
    short: [vec3(46, 0, 76), vec3(45, 0, 62), vec3(53, 0, 59), vec3(52.5, 1.2, 51), vec3(52.5, 2.4, 40), vec3(55, 2.4, 28), vec3(70, 2.4, 27), vec3(72, 2.4, 18)],
    tunnels: [vec3(31, 0, 84), vec3(26, 0, 70), vec3(20, 0, 59), vec3(11.5, 0, 50), vec3(11.5, 0, 36), vec3(14, 0, 24)],
    midToB: [vec3(46, 0, 76), vec3(44, 0, 58), vec3(45, 0, 42), vec3(45, 0, 33), vec3(40, 0, 27), vec3(30, 0, 26), vec3(20, 0, 22)],
  },
  ctHolds: {
    A: [
      { pos: vec3(90, 2.4, 8.5), look: vec3(90, 0.8, 45), label: 'Goose 架A大' },
      { pos: vec3(77, 2.4, 9), look: vec3(70, 3.2, 27), label: 'A点 看A小' },
      { pos: vec3(84.5, 2.4, 14), look: vec3(91, 0.8, 40), label: 'A坡顶' },
    ],
    mid: [{ pos: vec3(44, 0, 27), look: vec3(45, 0.8, 50), label: 'CT中路 看中门' }],
    B: [
      { pos: vec3(9, 0, 12.5), look: vec3(11.5, 0.8, 32), label: 'B点后平台' },
      { pos: vec3(23.5, 0, 14), look: vec3(11.5, 0.8, 31), label: 'B点箱后' },
      { pos: vec3(22, 0, 23.5), look: vec3(11.5, 0.8, 32), label: 'B门内' },
    ],
  },
  tHolds: {
    A: [
      { pos: vec3(84, 2.4, 8), look: vec3(65, 2.4, 11), label: 'A点 看CT' },
      { pos: vec3(80, 2.4, 18), look: vec3(70, 3.2, 28), label: 'A点 看A小' },
      { pos: vec3(88, 2.4, 6), look: vec3(70, 2.6, 10), label: 'Goose' },
      { pos: vec3(91, 0.8, 20), look: vec3(78, 3.0, 14), label: 'A坡' },
    ],
    B: [
      { pos: vec3(12, 0, 27), look: vec3(27, 0.8, 26), label: 'B洞口 看B门' },
      { pos: vec3(8, 0, 19), look: vec3(27, 0.8, 26), label: 'B点 看B门' },
      { pos: vec3(20, 0, 12), look: vec3(27, 0.8, 26), label: 'B点 侧' },
      { pos: vec3(15, 0, 22), look: vec3(28, 0.8, 26), label: 'B点 中' },
    ],
  },
  retakeStaging: {
    A: { pos: vec3(48.5, 1.2, 11.5), look: vec3(60, 2.6, 6), label: 'CT出生点 集合回防A' },
    B: { pos: vec3(38, 0.6, 21), look: vec3(28, 0.8, 26), label: 'CT坡 集合回防B' },
  },
  plantSpots: {
    A: [vec3(79, 2.4, 16), vec3(72, 2.4, 10)],
    B: [vec3(14, 0, 20), vec3(20, 0, 13)],
  },
  labels: [
    { text: 'A', x: 77, z: 15, size: 22 },
    { text: 'B', x: 16, z: 18, size: 22 },
    { text: 'T', x: 52, z: 89, size: 13 },
    { text: 'CT', x: 52, z: 11, size: 13 },
  ],
};
