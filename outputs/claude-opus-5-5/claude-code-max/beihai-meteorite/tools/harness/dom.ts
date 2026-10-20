/**
 * A deliberately small DOM for running the built bundle under Bun: elements,
 * an innerHTML parser, simple selectors, events, canvas (2D shim + WebGL2 mock).
 */
import { Ctx2DShim, CanvasShim } from "../shim";
import { createWebGL2 } from "./webgl";

const VOID = new Set(["input", "br", "img", "meta", "link", "hr", "source"]);

export class TextNodeX {
  parentNode: ElementX | null = null;
  nodeType = 3;
  constructor(public data: string) {}
  get textContent(): string {
    return this.data;
  }
}

type Child = ElementX | TextNodeX;

function styleObject(): Record<string, string> & { setProperty(k: string, v: string): void; getPropertyValue(k: string): string } {
  const s: Record<string, string> = {};
  return new Proxy(s, {
    get(target, key: string) {
      if (key === "setProperty") return (k: string, v: string) => (target[k] = v);
      if (key === "getPropertyValue") return (k: string) => target[k] ?? "";
      return target[key] ?? "";
    },
    set(target, key: string, value) {
      target[key] = String(value);
      return true;
    },
  }) as never;
}

export class ElementX extends EventTarget {
  nodeType = 1;
  tagName: string;
  childNodes: Child[] = [];
  parentNode: ElementX | null = null;
  attrs = new Map<string, string>();
  style = styleObject();
  value = "";
  /** layout size used by clientWidth/clientHeight */
  layout: { w: number; h: number } = { w: 0, h: 0 };

  constructor(tag: string) {
    super();
    this.tagName = tag.toUpperCase();
  }

  get id(): string {
    return this.attrs.get("id") ?? "";
  }
  set id(v: string) {
    this.attrs.set("id", v);
  }
  get className(): string {
    return this.attrs.get("class") ?? "";
  }
  set className(v: string) {
    this.attrs.set("class", v);
  }
  get classList() {
    const self = this;
    const list = () => self.className.split(/\s+/).filter(Boolean);
    return {
      add: (...c: string[]) => (self.className = [...new Set([...list(), ...c])].join(" ")),
      remove: (...c: string[]) => (self.className = list().filter((x) => !c.includes(x)).join(" ")),
      contains: (c: string) => list().includes(c),
      toggle: (c: string) => (list().includes(c) ? (self.className = list().filter((x) => x !== c).join(" ")) : (self.className = [...list(), c].join(" "))),
    };
  }
  get children(): ElementX[] {
    return this.childNodes.filter((c): c is ElementX => c instanceof ElementX);
  }
  get parentElement(): ElementX | null {
    return this.parentNode;
  }
  get firstChild(): Child | null {
    return this.childNodes[0] ?? null;
  }
  getAttribute(k: string): string | null {
    return this.attrs.has(k) ? this.attrs.get(k)! : null;
  }
  setAttribute(k: string, v: string): void {
    this.attrs.set(k, String(v));
    if (k === "value") this.value = String(v);
  }
  removeAttribute(k: string): void {
    this.attrs.delete(k);
  }
  hasAttribute(k: string): boolean {
    return this.attrs.has(k);
  }
  get dataset(): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [k, v] of this.attrs) if (k.startsWith("data-")) out[k.slice(5)] = v;
    return out;
  }
  appendChild<T extends Child>(c: T): T {
    if (c.parentNode) c.parentNode.removeChild(c);
    c.parentNode = this;
    this.childNodes.push(c);
    return c;
  }
  insertBefore<T extends Child>(c: T, ref: Child | null): T {
    if (!ref) return this.appendChild(c);
    if (c.parentNode) c.parentNode.removeChild(c);
    const i = this.childNodes.indexOf(ref);
    c.parentNode = this;
    this.childNodes.splice(i < 0 ? this.childNodes.length : i, 0, c);
    return c;
  }
  removeChild<T extends Child>(c: T): T {
    const i = this.childNodes.indexOf(c);
    if (i >= 0) this.childNodes.splice(i, 1);
    c.parentNode = null;
    return c;
  }
  remove(): void {
    this.parentNode?.removeChild(this);
  }
  contains(n: Child | null): boolean {
    let p: Child | null = n;
    while (p) {
      if (p === this) return true;
      p = p.parentNode;
    }
    return false;
  }
  get textContent(): string {
    return this.childNodes.map((c) => c.textContent).join("");
  }
  set textContent(v: string) {
    this.childNodes = [];
    if (v) this.appendChild(new TextNodeX(String(v)));
  }
  get innerText(): string {
    return this.textContent;
  }
  set innerHTML(html: string) {
    this.childNodes = [];
    parseInto(this, html);
  }
  get innerHTML(): string {
    return this.childNodes.map((c) => (c instanceof TextNodeX ? c.data : `<${c.tagName.toLowerCase()}>${c.innerHTML}</${c.tagName.toLowerCase()}>`)).join("");
  }
  get clientWidth(): number {
    return this.layout.w;
  }
  get clientHeight(): number {
    return this.layout.h;
  }
  getBoundingClientRect() {
    return { x: 0, y: 0, left: 0, top: 0, width: this.layout.w, height: this.layout.h, right: this.layout.w, bottom: this.layout.h };
  }
  querySelector<T = ElementX>(sel: string): T | null {
    return (this.querySelectorAll(sel)[0] ?? null) as T | null;
  }
  querySelectorAll(sel: string): ElementX[] {
    const out: ElementX[] = [];
    const parts = sel.split(",").map((s) => s.trim());
    const walk = (el: ElementX) => {
      for (const c of el.children) {
        if (parts.some((p) => matches(c, p))) out.push(c);
        walk(c);
      }
    };
    walk(this);
    return out;
  }
  matches(sel: string): boolean {
    return matches(this, sel);
  }
  click(): void {
    this.dispatchEvent(new Event("click", { bubbles: true }));
  }
  focus(): void {}
  blur(): void {}
  requestFullscreen(): Promise<void> {
    return Promise.resolve();
  }
  setPointerCapture(): void {}
  releasePointerCapture(): void {}
}

export class CanvasX extends ElementX {
  private shim = new CanvasShim();
  private gl: unknown = null;
  constructor() {
    super("canvas");
    this.shim.width = 300;
    this.shim.height = 150;
  }
  get width(): number {
    return this.shim.width;
  }
  set width(v: number) {
    this.shim.width = v;
  }
  get height(): number {
    return this.shim.height;
  }
  set height(v: number) {
    this.shim.height = v;
  }
  get data(): Uint8ClampedArray {
    return this.shim.data;
  }
  getContext(kind: string): unknown {
    if (kind === "2d") return new Ctx2DShim(this.shim as never);
    if (kind === "webgl2") {
      if (!this.gl) this.gl = createWebGL2(this);
      return this.gl;
    }
    return null;
  }
  toDataURL(): string {
    return "data:image/jpeg;base64,/9j/";
  }
}
// make `instanceof HTMLCanvasElement` work for three.js
Object.defineProperty(CanvasX.prototype, Symbol.toStringTag, { value: "HTMLCanvasElement" });

function matches(el: ElementX, sel: string): boolean {
  // compound selectors only: tag#id.class[attr="v"]
  const re = /([#.]?[\w-]+)|\[([\w-]+)(?:="([^"]*)")?\]/g;
  let m: RegExpExecArray | null;
  let ok = true;
  let any = false;
  while ((m = re.exec(sel))) {
    any = true;
    if (m[1]) {
      const t = m[1];
      if (t.startsWith("#")) ok &&= el.id === t.slice(1);
      else if (t.startsWith(".")) ok &&= el.classList.contains(t.slice(1));
      else ok &&= el.tagName === t.toUpperCase();
    } else if (m[2]) {
      ok &&= m[3] === undefined ? el.hasAttribute(m[2]) : el.getAttribute(m[2]) === m[3];
    }
  }
  return any && ok;
}

export function createElement(tag: string): ElementX {
  if (tag.toLowerCase() === "canvas") return new CanvasX();
  return new ElementX(tag);
}

/** Tiny HTML parser: tags, attributes, text, <style> as raw text. */
export function parseInto(root: ElementX, html: string): void {
  const stack: ElementX[] = [root];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt < 0) {
      const text = html.slice(i);
      if (text.trim()) stack[stack.length - 1]!.appendChild(new TextNodeX(decode(text)));
      break;
    }
    if (lt > i) {
      const text = html.slice(i, lt);
      if (text.trim()) stack[stack.length - 1]!.appendChild(new TextNodeX(decode(text)));
    }
    if (html.startsWith("<!--", lt)) {
      i = html.indexOf("-->", lt) + 3;
      continue;
    }
    if (html.startsWith("<!", lt)) {
      i = html.indexOf(">", lt) + 1;
      continue;
    }
    const gt = html.indexOf(">", lt);
    const raw = html.slice(lt + 1, gt);
    if (raw.startsWith("/")) {
      stack.pop();
      i = gt + 1;
      continue;
    }
    const selfClose = raw.endsWith("/");
    const body = selfClose ? raw.slice(0, -1) : raw;
    const nameMatch = /^([\w-]+)/.exec(body)!;
    const tag = nameMatch[1]!.toLowerCase();
    const el = createElement(tag);
    const attrRe = /([\w-:]+)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'>]+))?/g;
    attrRe.lastIndex = nameMatch[0].length;
    let a: RegExpExecArray | null;
    while ((a = attrRe.exec(body))) el.setAttribute(a[1]!, a[2] ?? a[3] ?? a[4] ?? "");
    stack[stack.length - 1]!.appendChild(el);
    i = gt + 1;
    if (tag === "style" || tag === "script") {
      const end = html.indexOf(`</${tag}>`, i);
      el.appendChild(new TextNodeX(html.slice(i, end)));
      i = end + tag.length + 3;
      continue;
    }
    if (!selfClose && !VOID.has(tag)) stack.push(el);
  }
}

function decode(s: string): string {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}
