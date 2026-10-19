// 影片开场时的初始状态（初始条件，不是动画）：下行侧水斗已盛水、受水位水斗半满，
// 使机构从一开始就处于稳定"走时"状态。
import { ESC } from './escapement';
import type { Sim } from './sim';

export const INIT = {
  stationFill: 0.0064, // 受水位斗中初始水量（m³），决定第一次起跳的时刻
  descending: [0.0058, 0.0054, 0.005, 0.0044, 0.0036, 0.0026, 0.0016],
};

export function applyInitialState(sim: Sim) {
  sim.water.presetVolume(0, INIT.stationFill);
  INIT.descending.forEach((v, i) => sim.water.presetVolume(ESC.N - 1 - i, v));
}
