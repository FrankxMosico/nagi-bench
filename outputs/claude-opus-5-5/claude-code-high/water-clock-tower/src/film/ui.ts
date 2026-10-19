// DOM overlay: title, captions, world-anchored labels, cause-and-effect chain.
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = "", html = "", parent?: HTMLElement) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  parent?.appendChild(e);
  return e;
}

export class Label {
  root: HTMLDivElement;
  txt: HTMLDivElement;
  line: HTMLDivElement;
  sub: HTMLElement | null = null;
  shown = false;
  constructor(parent: HTMLElement, text: string, public dx: number, public dy: number, sub?: string) {
    this.root = el("div", "label", "", parent);
    el("div", "dot", "", this.root);
    this.line = el("div", "line", "", this.root);
    this.txt = el("div", "txt", text, this.root);
    if (sub !== undefined) this.sub = el("small", "", sub, this.txt);
    this.place();
  }
  private dirty = true;
  setSub(s: string) {
    if (this.sub && this.sub.textContent !== s) {
      this.sub.textContent = s;
      this.dirty = true;
    }
  }
  place() {
    if (!this.dirty) return;
    const r = this.txt.getBoundingClientRect();
    if (!r.width) return;
    this.dirty = false;
    const len = Math.hypot(this.dx, this.dy);
    const ang = Math.atan2(this.dy, this.dx);
    this.line.style.width = `${len}px`;
    this.line.style.transform = `rotate(${ang}rad)`;
    const w = r.width, h = r.height;
    const tx = this.dx >= 0 ? this.dx : this.dx - w;
    const ty = this.dy - h / 2;
    this.txt.style.left = `${tx}px`;
    this.txt.style.top = `${ty}px`;
  }
  show(on: boolean) {
    if (on !== this.shown) {
      this.shown = on;
      this.root.classList.toggle("on", on);
    }
  }
  hot(on: boolean) {
    this.root.classList.toggle("hot", on);
  }
  at(x: number, y: number) {
    this.root.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }
}

export function buildUI() {
  const ui = document.getElementById("ui")!;
  ui.classList.add("bars");
  el("div", "vignette", "", ui);
  const title = el("div", "title", `
    <h1>水运仪象台<span class="seal">北宋<br>苏颂</span></h1>
    <p>一座用水驱动、自己报时的天文钟楼</p>
    <p class="sub">元祐三年（1088）· 汴京（今河南开封）</p>`, ui);
  const caption = el("div", "caption", "", ui);
  const chain = el("div", "chain", "", ui);
  const chainNodes: Record<string, HTMLSpanElement> = {};
  const nodes: [string, string][] = [
    ["water", "水流"], ["scoop", "受水壶"], ["shuheng", "枢衡·秤"], ["rope", "天条"], ["tianheng", "天衡·天关"],
    ["wheel", "枢轮"], ["shaft", "天柱"], ["sky", "浑象·浑仪"], ["jacks", "木阁报时"],
  ];
  nodes.forEach(([k, t], i) => {
    if (i) el("span", "arrow", "→", chain);
    chainNodes[k] = el("span", "node", t, chain);
  });
  const badge = el("div", "badge", "慢放", ui);
  const note = el("div", "badge", "示意模型 · 时间已加快", ui);
  note.style.right = "auto";
  note.style.left = "2vw";
  note.style.background = "rgba(20,16,12,0.6)";
  note.style.fontSize = "min(1.7vh, 1.4vw)";
  const labels = el("div", "", "", ui);
  const end = el("div", "endcard", `
    <h2>水运仪象台</h2>
    <p>北宋 苏颂、韩公廉等主持制造 · 元祐三年（1088）建成</p>
    <p class="flow"><span>水流恒定 → 受水壶称重 → 枢衡压下</span><br><span>→ 天关抬起 · 枢轮走一格（擒纵）</span><br><span>→ 天柱 → 浑象 · 浑仪 · 木阁报时</span></p>
    <p>被认为是世界上最早的天文钟之一：<br>一壶一壶的水，让时间和星空一起走动。</p>`, ui);
  const timebar = el("div", "timebar", "", ui);
  const replay = el("button", "replay", "↻ 重播", ui);
  return { ui, title, caption, chain, chainNodes, badge, note, labels, end, timebar, replay };
}
export type UI = ReturnType<typeof buildUI>;
