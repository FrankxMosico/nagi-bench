import * as THREE from "three";
import { applyPose, createFigure, type AnchorName, type Figure, type Pose } from "@agentbench/voxel-kit";
import { bodyTexture, type BodySpec, type Expression } from "./skins";

/**
 * A performer: a kit figure plus the bookkeeping to switch painted
 * expressions and costumes without churning GPU uploads.
 */
export class Actor {
  readonly fig: Figure;
  readonly root: THREE.Group;
  private expr: Expression | null = null;
  private clothes: THREE.Texture | null | undefined = undefined;
  private bodySpec: BodySpec;
  private bodyKey: string;

  constructor(
    readonly name: string,
    body: BodySpec,
    heightM: number,
    arm: "classic" | "slim" = "classic",
  ) {
    this.bodySpec = body;
    this.bodyKey = name;
    this.fig = createFigure({ body: bodyTexture(name, body, "neutral"), heightM, arm });
    this.root = this.fig.root;
    this.expr = "neutral";
  }

  /** Switch which body sheet (e.g. bare hands vs. thin space gloves) is painted. */
  setBodySpec(key: string, spec: BodySpec): void {
    if (key === this.bodyKey) return;
    this.bodyKey = key;
    this.bodySpec = spec;
    const e = this.expr ?? "neutral";
    this.expr = null;
    this.face(e);
  }

  face(expr: Expression): void {
    if (expr === this.expr) return;
    this.expr = expr;
    this.fig.setBody(bodyTexture(this.bodyKey, this.bodySpec, expr));
  }

  wear(texture: THREE.Texture | null): void {
    if (texture === this.clothes) return;
    this.clothes = texture;
    this.fig.setClothes(texture);
  }

  pose(p: Pose): void {
    applyPose(this.fig, p);
  }

  place(x: number, y: number, z: number, yaw = 0, pitch = 0, roll = 0): void {
    this.root.position.set(x, y, z);
    this.root.rotation.set(pitch, yaw, roll, "YXZ");
  }

  /** Hang a metric prop on an anchor, counter-scaling the rig's px units. */
  hold(anchor: AnchorName, prop: THREE.Object3D): THREE.Object3D {
    const holder = new THREE.Group();
    holder.scale.setScalar(1 / this.root.scale.x);
    holder.add(prop);
    this.fig.anchors[anchor].add(holder);
    return holder;
  }

  /** World position of a point in an anchor's frame (metres). */
  anchorWorld(anchor: AnchorName, local: THREE.Vector3 = new THREE.Vector3(), out = new THREE.Vector3()): THREE.Vector3 {
    this.root.updateWorldMatrix(true, true);
    const a = this.fig.anchors[anchor];
    out.copy(local).multiplyScalar(1 / this.root.scale.x);
    return a.localToWorld(out);
  }

  headWorld(out = new THREE.Vector3()): THREE.Vector3 {
    this.root.updateWorldMatrix(true, true);
    // Centre of the head cube: 4 px above the neck joint.
    return this.fig.joints.neck.localToWorld(out.set(0, 4, 0));
  }

  /** A point on the face plane (front of the head), useful for eyelines. */
  faceWorld(out = new THREE.Vector3(), forward = 4.6): THREE.Vector3 {
    this.root.updateWorldMatrix(true, true);
    return this.fig.joints.neck.localToWorld(out.set(0, 4.2, forward));
  }

  chestWorld(out = new THREE.Vector3()): THREE.Vector3 {
    this.root.updateWorldMatrix(true, true);
    return this.fig.joints.hips.localToWorld(out.set(0, 7, 0));
  }

  set visible(v: boolean) {
    this.root.visible = v;
  }
}
