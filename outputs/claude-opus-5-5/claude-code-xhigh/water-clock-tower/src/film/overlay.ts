// 叠加层：片头标题、因果链提示条、字幕、三维标注（带引线）、结尾、开始/重播/声音按钮
import * as THREE from "three";
import { CAPTIONS, END_TEXT_AT, HUD_NODES, HUD_SPAN, LABELS, NOTE_SPAN, FILM_END, type Caption } from "./timeline";

const el = (tag: string, cls: string, parent: HTMLElement, html = "") => {
  const e = document.createElement(tag);
  e.className = cls;
  if (html) e.innerHTML = html;
  parent.appendChild(e);
  return e;
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export class Overlay {
  root: HTMLElement;
  private title: HTMLElement;
  private hud: HTMLElement;
  private hudNodes: HTMLElement[] = [];
  private hudArrows: HTMLElement[] = [];
  private capBox: HTMLElement;
  private capMain: HTMLElement;
  private capSub: HTMLElement;
  private curCap: Caption | null = null;
  private svg: SVGSVGElement;
  private labels: { el: HTMLElement; line: SVGLineElement; dot: SVGCircleElement }[] = [];
  private note: HTMLElement;
  private speed: HTMLElement;
  private end: HTMLElement;
  private fade: HTMLElement;
  readonly replayBtn: HTMLButtonElement;
  readonly soundBtn: HTMLButtonElement;
  private startEl: HTMLElement | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    el("div", "vignette", root);
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("class", "lines");
    root.appendChild(this.svg);
    for (const cue of LABELS) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("stroke", "rgba(242,196,109,0.85)");
      line.setAttribute("stroke-width", "1.5");
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", "#f2c46d");
      dot.setAttribute("stroke", "rgba(0,0,0,0.6)");
      this.svg.append(line, dot);
      const e = el("div", "label", root, cue.text + (cue.small ? `<small>${cue.small}</small>` : ""));
      this.labels.push({ el: e, line, dot });
    }
    this.title = el("div", "title", root,
      `<h1>水运仪象台</h1><div class="line"></div><div class="sub">北宋 · 苏颂 · 公元 1088 年</div><div class="tag">一座用水驱动、能自己报时的天文钟</div>`);
    this.hud = el("div", "hud", root);
    HUD_NODES.forEach((n, i) => {
      if (i) this.hudArrows.push(el("span", "arr", this.hud, "→"));
      this.hudNodes.push(el("span", "node", this.hud, n));
    });
    const cap = el("div", "cap", root);
    this.capBox = el("div", "box", cap);
    this.capMain = el("div", "main", this.capBox);
    this.capSub = el("div", "sub", this.capBox);
    this.note = el("div", "note", root, NOTE_SPAN.text);
    this.speed = el("div", "speed", root, "▶ 慢放 ×0.45");
    this.end = el("div", "end", root,
      `<div class="eh">一环扣一环</div>` +
      `<div class="chain">${["<em>水</em>", "水斗", "枢衡", "天条·天衡", "天关", "枢轮", "天柱", "<em>浑象·浑仪·报时</em>"]
        .map((s) => `<span class="n">${s}</span>`).join(" → ")}</div>` +
      `<div class="lead">以水为动力，以“擒纵”把连续的水流变成一格一格、节奏均匀的转动，昼夜不停。</div>` +
      `<div class="lead2">苏颂的水运仪象台，比欧洲最早的机械钟早了约两百年。</div>`);
    this.fade = el("div", "fade", root);
    this.replayBtn = el("button", "btn replay", root, "↻ 重新播放") as HTMLButtonElement;
    this.soundBtn = el("button", "btn sound", root, "🔇 点击开启声音") as HTMLButtonElement;
  }

  showStart(onStart: () => void) {
    const s = el("div", "start", this.root,
      `<div class="st">水运仪象台 · 水如何驱动一座天文钟</div><div class="btn">▶ 播放</div><div class="hint">约 35 秒 · 含配乐与音效</div>`);
    this.startEl = s;
    s.addEventListener("click", () => {
      s.remove();
      this.startEl = null;
      onStart();
    }, { once: true });
  }
  hideStart() {
    this.startEl?.remove();
    this.startEl = null;
  }

  /** 每帧更新 */
  update(t: number, ctx: {
    camera: THREE.PerspectiveCamera; width: number; height: number;
    anchor: (name: string) => THREE.Vector3; hudState: boolean[]; slow: number; fade: number;
  }) {
    // 片头
    const ta = smooth(0.25, 1.1, t) * (1 - smooth(3.6, 4.4, t));
    this.title.style.opacity = String(ta);
    this.title.style.transform = `translateY(${(1 - ta) * 10}px)`;
    // 因果链
    const ha = smooth(HUD_SPAN.t0 - 0.3, HUD_SPAN.t0 + 0.3, t) * (1 - smooth(HUD_SPAN.t1, HUD_SPAN.t1 + 0.6, t));
    this.hud.style.opacity = String(ha);
    let lastOn = -1;
    ctx.hudState.forEach((on, i) => { if (on) lastOn = i; });
    this.hudNodes.forEach((n, i) => {
      const on = ctx.hudState[i];
      n.classList.toggle("on", on);
      n.classList.toggle("done", !on && i < lastOn);
    });
    this.hudArrows.forEach((a, i) => a.classList.toggle("on", ctx.hudState[i] && ctx.hudState[i + 1]));
    // 字幕
    const cap = CAPTIONS.find((c) => t >= c.t0 && t < c.t1) ?? null;
    if (cap !== this.curCap) {
      this.curCap = cap;
      if (cap) {
        this.capMain.innerHTML = (cap.num ? `<span class="num">${cap.num}</span>` : "") + cap.main;
        this.capSub.innerHTML = cap.sub ?? "";
        this.capSub.style.display = cap.sub ? "" : "none";
        this.capBox.classList.remove("show");
        void this.capBox.offsetWidth;
        this.capBox.classList.add("show");
      } else {
        this.capBox.classList.remove("show");
      }
    }
    // 标注
    const v = new THREE.Vector3();
    LABELS.forEach((cue, i) => {
      const L = this.labels[i];
      const a = smooth(cue.t0, cue.t0 + 0.35, t) * (1 - smooth(cue.t1 - 0.35, cue.t1, t));
      if (a <= 0.001) {
        L.el.style.opacity = "0";
        L.line.setAttribute("opacity", "0");
        L.dot.setAttribute("opacity", "0");
        return;
      }
      v.copy(ctx.anchor(cue.anchor)).project(ctx.camera);
      const behind = v.z > 1;
      const x = (v.x * 0.5 + 0.5) * ctx.width;
      const y = (-v.y * 0.5 + 0.5) * ctx.height;
      const sc = Math.min(1.25, ctx.width / 1280);
      const lx = x + cue.dx * sc, ly = y + cue.dy * sc;
      const op = behind ? 0 : a;
      L.el.style.opacity = String(op);
      L.el.style.left = `${lx}px`;
      L.el.style.top = `${ly}px`;
      const hot = cue.hot?.some(([h0, h1]) => t >= h0 && t < h1) ?? false;
      L.el.classList.toggle("hot", hot);
      L.line.setAttribute("x1", String(x));
      L.line.setAttribute("y1", String(y));
      L.line.setAttribute("x2", String(lx));
      L.line.setAttribute("y2", String(ly));
      L.line.setAttribute("opacity", String(op));
      L.dot.setAttribute("cx", String(x));
      L.dot.setAttribute("cy", String(y));
      L.dot.setAttribute("opacity", String(op));
    });
    // 注释、慢放提示
    this.note.style.opacity = String(smooth(NOTE_SPAN.t0, NOTE_SPAN.t0 + 0.5, t) * (1 - smooth(NOTE_SPAN.t1 - 0.4, NOTE_SPAN.t1, t)));
    const slow = ctx.slow < 0.95;
    this.speed.style.opacity = slow ? "1" : "0";
    if (slow) {
      const txt = `▶ 慢放 ×${ctx.slow.toFixed(1)}`;
      if (this.speed.textContent !== txt) this.speed.textContent = txt;
    }
    // 结尾
    const ea = smooth(END_TEXT_AT, END_TEXT_AT + 1.0, t);
    this.end.style.opacity = String(ea);
    this.fade.style.opacity = String(Math.max(ctx.fade, smooth(FILM_END - 0.2, FILM_END + 0.8, t) * 0.45));
  }

  private insetFrame: HTMLElement | null = null;
  setInset(r: { x: number; y: number; w: number; h: number } | null, title: string) {
    if (!this.insetFrame) {
      this.insetFrame = el("div", "inset", this.root, `<div class="it"></div>`);
    }
    const f = this.insetFrame;
    if (!r) { f.style.display = "none"; return; }
    f.style.display = "block";
    f.style.left = `${r.x}px`;
    f.style.top = `${r.y}px`;
    f.style.width = `${r.w}px`;
    f.style.height = `${r.h}px`;
    (f.firstChild as HTMLElement).textContent = title;
  }

  showReplay(show: boolean) {
    this.replayBtn.style.display = show ? "block" : "none";
  }
  showSoundButton(show: boolean, on = false) {
    this.soundBtn.style.display = show ? "block" : "none";
    this.soundBtn.textContent = on ? "🔊 声音已开启" : "🔇 点击开启声音（从头播放）";
  }
}
