import * as THREE from "three";

/** Per-frame picture treatment, written by shots and read by the post chain. */
export interface Grade {
  exposure: number;
  saturation: number;
  contrast: number;
  lift: THREE.Color;
  gain: THREE.Color;
  vignette: number;
  grain: number;
  /** 0..1 dip to black. */
  fade: number;
  /** 0..1 blend toward flashColor (muzzle flashes, impacts). */
  flash: number;
  flashColor: THREE.Color;
  /** 0..1 rifle-scope mask. */
  scope: number;
  /** Scope circle radius as a fraction of picture height. */
  scopeRadius: number;
  reticle: number;
  reticleOffset: THREE.Vector2;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  toneExposure: number;
  /** Subjective blur / defocus amount 0..1 (tinnitus moments). */
  blur: number;
}

export interface HudState {
  visible: number;
  lines: string[];
  alert: string;
  alertOn: boolean;
}

export interface OverlayState {
  caption: string;
  captionOpacity: number;
  title: string;
  titleSub: string;
  titleOpacity: number;
  hud: HudState;
  scopeText: string;
  endCard: number;
}

export interface FilmContext {
  camera: THREE.PerspectiveCamera;
  /** Foreground scene of the active set. */
  scene: THREE.Scene;
  /** Optional far layer (sky, planet, sun) rendered first with a rotation-only camera. */
  backdrop: THREE.Scene | null;
  grade: Grade;
  overlay: OverlayState;
  /** Absolute time of the frame being prepared. */
  time: number;
}

export function defaultGrade(): Grade {
  return {
    exposure: 1,
    saturation: 1,
    contrast: 1,
    lift: new THREE.Color(0, 0, 0),
    gain: new THREE.Color(1, 1, 1),
    vignette: 0.35,
    grain: 0.035,
    fade: 0,
    flash: 0,
    flashColor: new THREE.Color(1, 0.95, 0.85),
    scope: 0,
    scopeRadius: 0.46,
    reticle: 0,
    reticleOffset: new THREE.Vector2(0, 0),
    bloomStrength: 0.55,
    bloomRadius: 0.45,
    bloomThreshold: 0.82,
    toneExposure: 1,
    blur: 0,
  };
}

export function defaultOverlay(): OverlayState {
  return {
    caption: "",
    captionOpacity: 0,
    title: "",
    titleSub: "",
    titleOpacity: 0,
    hud: { visible: 0, lines: [], alert: "", alertOn: false },
    scopeText: "",
    endCard: 0,
  };
}

export function resetFrame(ctx: FilmContext): void {
  const g = defaultGrade();
  Object.assign(ctx.grade, { ...g, lift: ctx.grade.lift.copy(g.lift), gain: ctx.grade.gain.copy(g.gain), flashColor: ctx.grade.flashColor.copy(g.flashColor), reticleOffset: ctx.grade.reticleOffset.copy(g.reticleOffset) });
  const o = defaultOverlay();
  ctx.overlay.caption = o.caption;
  ctx.overlay.captionOpacity = 0;
  ctx.overlay.title = "";
  ctx.overlay.titleSub = "";
  ctx.overlay.titleOpacity = 0;
  ctx.overlay.hud.visible = 0;
  ctx.overlay.hud.lines = [];
  ctx.overlay.hud.alert = "";
  ctx.overlay.hud.alertOn = false;
  ctx.overlay.scopeText = "";
  ctx.overlay.endCard = 0;
}

const _m = new THREE.Matrix4();
const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();

/**
 * Point the camera from `pos` at `target`, with an explicit up vector and roll.
 */
export function frame(
  camera: THREE.PerspectiveCamera,
  pos: THREE.Vector3,
  target: THREE.Vector3,
  fov: number,
  up: THREE.Vector3 = new THREE.Vector3(0, 1, 0),
  roll = 0,
  near = 0.05,
  far = 60000,
): void {
  camera.position.copy(pos);
  camera.up.copy(up);
  camera.lookAt(target);
  if (roll !== 0) camera.rotateZ(roll);
  if (camera.fov !== fov || camera.near !== near || camera.far !== far) {
    camera.fov = fov;
    camera.near = near;
    camera.far = far;
    camera.updateProjectionMatrix();
  }
  camera.updateMatrixWorld(true);
}

/** Orient an object so its local +Z faces `forward` and +Y leans toward `up`. */
export function orient(obj: THREE.Object3D, forward: THREE.Vector3, up: THREE.Vector3): void {
  _z.copy(forward).normalize();
  _x.copy(up).cross(_z).normalize();
  _y.copy(_z).cross(_x).normalize();
  _m.makeBasis(_x, _y, _z);
  obj.quaternion.setFromRotationMatrix(_m);
}
