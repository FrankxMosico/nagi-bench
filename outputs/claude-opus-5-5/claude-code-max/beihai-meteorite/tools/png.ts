import { deflateSync } from "node:zlib";

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  CRC_TABLE[n] = c >>> 0;
}
function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]!) & 0xff]! ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Uint8Array): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), Buffer.from(data)]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

/** Encode 8-bit RGB pixels as a PNG file. */
export function encodePNG(rgb: Uint8Array, w: number, h: number): Buffer {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    Buffer.from(rgb.buffer, rgb.byteOffset + y * w * 3, w * 3).copy(raw, y * (w * 3 + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 6 })),
    chunk("IEND", new Uint8Array(0)),
  ]);
}

/* 3x5 digit font for contact-sheet labels */
const GLYPHS: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
  ".": ["000", "000", "000", "000", "010"],
  "-": ["000", "000", "111", "000", "000"],
  " ": ["000", "000", "000", "000", "000"],
};

export function drawLabel(rgb: Uint8Array, w: number, h: number, text: string, x0: number, y0: number, scale = 2): void {
  let x = x0;
  for (const ch of text) {
    const g = GLYPHS[ch] ?? GLYPHS[" "]!;
    for (let gy = 0; gy < 5; gy++) {
      for (let gx = 0; gx < 3; gx++) {
        if (g[gy]![gx] !== "1") continue;
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = x + gx * scale + sx;
            const py = y0 + gy * scale + sy;
            if (px < 0 || py < 0 || px >= w || py >= h) continue;
            const i = (py * w + px) * 3;
            rgb[i] = 255;
            rgb[i + 1] = 230;
            rgb[i + 2] = 80;
          }
        }
      }
    }
    x += 4 * scale;
  }
}

/** Tile frames (same size) into a grid with labels. */
export function contactSheet(frames: Array<{ rgb: Uint8Array; label: string }>, w: number, h: number, cols = 3): { rgb: Uint8Array; w: number; h: number } {
  const rows = Math.ceil(frames.length / cols);
  const pad = 4;
  const SW = cols * (w + pad) + pad;
  const SH = rows * (h + pad) + pad;
  const out = new Uint8Array(SW * SH * 3).fill(30);
  frames.forEach((f, k) => {
    const cx = pad + (k % cols) * (w + pad);
    const cy = pad + Math.floor(k / cols) * (h + pad);
    for (let y = 0; y < h; y++) {
      const src = y * w * 3;
      const dst = ((cy + y) * SW + cx) * 3;
      out.set(f.rgb.subarray(src, src + w * 3), dst);
    }
    drawLabel(out, SW, SH, f.label, cx + 4, cy + 4, 2);
  });
  return { rgb: out, w: SW, h: SH };
}
