/**
 * Minimal DOM + 2D canvas shim so the film's world code (which paints its
 * textures pixel by pixel) can run under Bun for offline previews and tests.
 * Only the subset the project uses is implemented.
 */

type RGBA = [number, number, number, number];

const NAMED: Record<string, RGBA> = {
  white: [255, 255, 255, 255],
  black: [0, 0, 0, 255],
  transparent: [0, 0, 0, 0],
  red: [255, 0, 0, 255],
};

export function parseColor(s: string): RGBA {
  s = s.trim().toLowerCase();
  if (NAMED[s]) return NAMED[s]!;
  if (s.startsWith("#")) {
    const h = s.slice(1);
    if (h.length === 3) return [parseInt(h[0]! + h[0], 16), parseInt(h[1]! + h[1], 16), parseInt(h[2]! + h[2], 16), 255];
    if (h.length === 6) return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 255];
    if (h.length === 8) return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), parseInt(h.slice(6, 8), 16)];
  }
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1]!.split(",").map((x) => parseFloat(x));
    return [p[0]!, p[1]!, p[2]!, p[3] === undefined ? 255 : Math.round(p[3] * 255)];
  }
  return [0, 0, 0, 255];
}

export class ImageDataShim {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  constructor(w: number, h: number, data?: Uint8ClampedArray) {
    this.width = w;
    this.height = h;
    this.data = data ?? new Uint8ClampedArray(w * h * 4);
  }
}

export class Ctx2DShim {
  fillStyle: string = "#000";
  strokeStyle = "#000";
  globalAlpha = 1;
  imageSmoothingEnabled = false;
  font = "";
  textAlign = "left";
  textBaseline = "alphabetic";
  lineWidth = 1;
  globalCompositeOperation = "source-over";
  constructor(public canvas: CanvasShim) {}
  private get buf() {
    return this.canvas.data;
  }
  fillRect(x: number, y: number, w: number, h: number): void {
    const [r, g, b, a0] = parseColor(String(this.fillStyle));
    const a = (a0 / 255) * this.globalAlpha;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const x0 = Math.max(0, Math.floor(x));
    const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(W, Math.floor(x + w));
    const y1 = Math.min(H, Math.floor(y + h));
    const d = this.buf;
    for (let yy = y0; yy < y1; yy++) {
      for (let xx = x0; xx < x1; xx++) {
        const i = (yy * W + xx) * 4;
        if (a >= 0.999) {
          d[i] = r;
          d[i + 1] = g;
          d[i + 2] = b;
          d[i + 3] = 255;
        } else {
          const da = d[i + 3]! / 255;
          const oa = a + da * (1 - a);
          if (oa <= 0) continue;
          d[i] = (r * a + d[i]! * da * (1 - a)) / oa;
          d[i + 1] = (g * a + d[i + 1]! * da * (1 - a)) / oa;
          d[i + 2] = (b * a + d[i + 2]! * da * (1 - a)) / oa;
          d[i + 3] = oa * 255;
        }
      }
    }
  }
  clearRect(x: number, y: number, w: number, h: number): void {
    const W = this.canvas.width;
    const H = this.canvas.height;
    for (let yy = Math.max(0, Math.floor(y)); yy < Math.min(H, Math.floor(y + h)); yy++) {
      for (let xx = Math.max(0, Math.floor(x)); xx < Math.min(W, Math.floor(x + w)); xx++) {
        const i = (yy * W + xx) * 4;
        this.buf[i] = this.buf[i + 1] = this.buf[i + 2] = this.buf[i + 3] = 0;
      }
    }
  }
  getImageData(x: number, y: number, w: number, h: number): ImageDataShim {
    const out = new ImageDataShim(w, h);
    const W = this.canvas.width;
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        const sx = x + xx;
        const sy = y + yy;
        if (sx < 0 || sy < 0 || sx >= W || sy >= this.canvas.height) continue;
        const si = (sy * W + sx) * 4;
        const di = (yy * w + xx) * 4;
        out.data[di] = this.buf[si]!;
        out.data[di + 1] = this.buf[si + 1]!;
        out.data[di + 2] = this.buf[si + 2]!;
        out.data[di + 3] = this.buf[si + 3]!;
      }
    }
    return out;
  }
  putImageData(img: ImageDataShim, x: number, y: number): void {
    const W = this.canvas.width;
    for (let yy = 0; yy < img.height; yy++) {
      for (let xx = 0; xx < img.width; xx++) {
        const dx = x + xx;
        const dy = y + yy;
        if (dx < 0 || dy < 0 || dx >= W || dy >= this.canvas.height) continue;
        const si = (yy * img.width + xx) * 4;
        const di = (dy * W + dx) * 4;
        this.buf[di] = img.data[si]!;
        this.buf[di + 1] = img.data[si + 1]!;
        this.buf[di + 2] = img.data[si + 2]!;
        this.buf[di + 3] = img.data[si + 3]!;
      }
    }
  }
  createImageData(w: number, h: number): ImageDataShim {
    return new ImageDataShim(w, h);
  }
  drawImage(src: CanvasShim, dx = 0, dy = 0): void {
    if (!(src instanceof CanvasShim)) return;
    const img = new ImageDataShim(src.width, src.height, src.data);
    this.putImageData(img, dx, dy);
  }
  // no-ops
  fillText(): void {}
  strokeText(): void {}
  measureText(t: string) {
    return { width: t.length * 8 };
  }
  beginPath(): void {}
  closePath(): void {}
  moveTo(): void {}
  lineTo(): void {}
  arc(): void {}
  fill(): void {}
  stroke(): void {}
  save(): void {}
  restore(): void {}
  translate(): void {}
  scale(): void {}
  rotate(): void {}
  setTransform(): void {}
  strokeRect(): void {}
}

export class CanvasShim {
  private w = 300;
  private h = 150;
  data = new Uint8ClampedArray(300 * 150 * 4);
  style: Record<string, string> = {};
  private ctx: Ctx2DShim | null = null;
  get width() {
    return this.w;
  }
  set width(v: number) {
    this.w = v;
    this.data = new Uint8ClampedArray(this.w * this.h * 4);
  }
  get height() {
    return this.h;
  }
  set height(v: number) {
    this.h = v;
    this.data = new Uint8ClampedArray(this.w * this.h * 4);
  }
  getContext(kind: string): Ctx2DShim | null {
    if (kind !== "2d") return null;
    if (!this.ctx) this.ctx = new Ctx2DShim(this);
    return this.ctx;
  }
  toDataURL(): string {
    return "";
  }
  addEventListener(): void {}
  removeEventListener(): void {}
}

const g = globalThis as any;
if (!g.document) {
  g.document = {
    createElement(tag: string) {
      if (tag === "canvas") return new CanvasShim();
      return { style: {}, appendChild() {}, setAttribute() {}, addEventListener() {} };
    },
    createElementNS(_ns: string, tag: string) {
      return g.document.createElement(tag);
    },
  };
}
if (!g.window) g.window = g;
if (!g.self) g.self = g;
if (g.devicePixelRatio === undefined) g.devicePixelRatio = 1;
if (!g.ImageData) g.ImageData = ImageDataShim;
if (!g.HTMLCanvasElement) g.HTMLCanvasElement = CanvasShim;
if (!g.requestAnimationFrame) g.requestAnimationFrame = (cb: (t: number) => void) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
if (!g.cancelAnimationFrame) g.cancelAnimationFrame = (h: number) => clearTimeout(h);
