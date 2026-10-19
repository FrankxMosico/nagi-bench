/**
 * Minimal 2D-canvas stand-in so the film's scene graph (skins, procedural
 * textures) can be constructed under Bun for offline frame previews.
 * Development tool only; never bundled.
 */

function parseColour(s: string): [number, number, number, number] {
  s = s.trim();
  if (s.startsWith("#")) {
    let h = s.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h.slice(0, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, a];
  }
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1]!.split(",").map((x) => parseFloat(x));
    return [p[0]!, p[1]!, p[2]!, p[3] ?? 1];
  }
  return [0, 0, 0, 1];
}

class MockImageData {
  data: Uint8ClampedArray;
  constructor(public width: number, public height: number, data?: Uint8ClampedArray) {
    this.data = data ?? new Uint8ClampedArray(width * height * 4);
  }
}

class MockContext {
  fillStyle: string = "#000";
  strokeStyle: string = "#000";
  globalAlpha = 1;
  imageSmoothingEnabled = true;
  globalCompositeOperation = "source-over";
  lineWidth = 1;
  font = "10px sans-serif";
  textAlign = "left";
  textBaseline = "alphabetic";
  constructor(public canvas: MockCanvas) {}

  private get data(): Uint8ClampedArray {
    return this.canvas.pixels;
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    const [r, g, b, a0] = parseColour(this.fillStyle);
    const a = a0 * this.globalAlpha;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const x0 = Math.max(0, Math.round(x));
    const y0 = Math.max(0, Math.round(y));
    const x1 = Math.min(W, Math.round(x + w));
    const y1 = Math.min(H, Math.round(y + h));
    const d = this.data;
    for (let j = y0; j < y1; j++) {
      for (let i = x0; i < x1; i++) {
        const k = (j * W + i) * 4;
        const da = d[k + 3]! / 255;
        const oa = a + da * (1 - a);
        if (oa <= 0) continue;
        d[k] = (r * a + d[k]! * da * (1 - a)) / oa;
        d[k + 1] = (g * a + d[k + 1]! * da * (1 - a)) / oa;
        d[k + 2] = (b * a + d[k + 2]! * da * (1 - a)) / oa;
        d[k + 3] = oa * 255;
      }
    }
  }

  clearRect(x: number, y: number, w: number, h: number): void {
    const W = this.canvas.width;
    const H = this.canvas.height;
    for (let j = Math.max(0, y); j < Math.min(H, y + h); j++) {
      for (let i = Math.max(0, x); i < Math.min(W, x + w); i++) {
        const k = (j * W + i) * 4;
        this.data[k] = this.data[k + 1] = this.data[k + 2] = this.data[k + 3] = 0;
      }
    }
  }

  getImageData(x: number, y: number, w: number, h: number): MockImageData {
    const out = new MockImageData(w, h);
    const W = this.canvas.width;
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const s = ((y + j) * W + (x + i)) * 4;
        const t = (j * w + i) * 4;
        for (let c = 0; c < 4; c++) out.data[t + c] = this.data[s + c] ?? 0;
      }
    }
    return out;
  }

  createImageData(w: number, h: number): MockImageData {
    return new MockImageData(w, h);
  }

  putImageData(img: MockImageData, x: number, y: number): void {
    const W = this.canvas.width;
    for (let j = 0; j < img.height; j++) {
      for (let i = 0; i < img.width; i++) {
        const t = ((y + j) * W + (x + i)) * 4;
        const s = (j * img.width + i) * 4;
        for (let c = 0; c < 4; c++) this.data[t + c] = img.data[s + c]!;
      }
    }
  }

  drawImage(): void {}
  beginPath(): void {}
  closePath(): void {}
  moveTo(): void {}
  lineTo(): void {}
  arc(): void {}
  rect(): void {}
  fill(): void {}
  stroke(): void {}
  save(): void {}
  restore(): void {}
  translate(): void {}
  rotate(): void {}
  scale(): void {}
  setTransform(): void {}
  fillText(): void {}
  measureText(t: string): { width: number } {
    return { width: t.length * 8 };
  }
  createLinearGradient(): { addColorStop: () => void } {
    return { addColorStop: () => {} };
  }
  createRadialGradient(): { addColorStop: () => void } {
    return { addColorStop: () => {} };
  }
}

export class MockCanvas {
  private w = 300;
  private h = 150;
  pixels = new Uint8ClampedArray(300 * 150 * 4);
  style: Record<string, string> = {};
  private ctx = new MockContext(this);
  get width(): number {
    return this.w;
  }
  set width(v: number) {
    this.w = v;
    this.pixels = new Uint8ClampedArray(this.w * this.h * 4);
  }
  get height(): number {
    return this.h;
  }
  set height(v: number) {
    this.h = v;
    this.pixels = new Uint8ClampedArray(this.w * this.h * 4);
  }
  getContext(): MockContext {
    return this.ctx;
  }
  addEventListener(): void {}
  removeEventListener(): void {}
}

export function installMockDom(): void {
  const g = globalThis as unknown as Record<string, unknown>;
  g.document = {
    createElement: (tag: string) => {
      if (tag === "canvas") return new MockCanvas();
      return { style: {}, appendChild() {}, addEventListener() {}, setAttribute() {}, classList: { add() {}, remove() {}, toggle() {} } };
    },
    createElementNS: (_ns: string, tag: string) => (tag === "canvas" ? new MockCanvas() : { style: {} }),
    body: { appendChild() {} },
  };
  g.window = g;
  g.ImageData = MockImageData;
  g.HTMLCanvasElement = MockCanvas;
  g.requestAnimationFrame = () => 0;
  g.cancelAnimationFrame = () => {};
}
