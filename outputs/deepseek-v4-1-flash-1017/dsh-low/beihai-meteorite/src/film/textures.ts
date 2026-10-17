import * as THREE from "three";

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface CanvasOptions {
  repeat?: [number, number];
  nearest?: boolean;
  mipmaps?: boolean;
  anisotropy?: number;
}

export function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  options: CanvasOptions = {},
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = options.nearest ?? false;
  draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  if (options.repeat) texture.repeat.set(...options.repeat);
  if (options.nearest) {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
  } else {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
  }
  texture.anisotropy = options.anisotropy ?? 4;
  return texture;
}

export function woodTexture(seed = 5, tint = "#5a3d27"): THREE.CanvasTexture {
  return canvasTexture(256, 256, (ctx) => {
    const rand = rng(seed);
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 210; i++) {
      const y = rand() * 256;
      const h = 1 + rand() * 3;
      const shade = 0.55 + rand() * 0.55;
      ctx.fillStyle = `rgba(${Math.floor(34 * shade)},${Math.floor(22 * shade)},${Math.floor(12 * shade)},${0.18 + rand() * 0.3})`;
      ctx.fillRect(0, y, 256, h);
    }
    for (let i = 0; i < 6; i++) {
      const x = rand() * 256;
      const y = rand() * 256;
      ctx.strokeStyle = "rgba(28,16,8,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y, 7 + rand() * 8, 3 + rand() * 3, rand() * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(120,85,50,0.2)";
      ctx.beginPath();
      ctx.ellipse(x, y, 11 + rand() * 8, 5 + rand() * 3, rand() * 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    for (let i = 0; i < 26; i++) {
      ctx.fillRect(0, rand() * 256, 256, 1);
    }
  });
}

export function plasterTexture(seed = 11, base = "#796b55"): THREE.CanvasTexture {
  return canvasTexture(256, 256, (ctx) => {
    const rand = rng(seed);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 9000; i++) {
      const v = Math.floor(rand() * 45) - 22;
      ctx.fillStyle = `rgba(${128 + v},${116 + v},${94 + v},0.13)`;
      ctx.fillRect(rand() * 256, rand() * 256, 1 + rand() * 3, 1 + rand() * 2);
    }
    for (let i = 0; i < 16; i++) {
      let x = rand() * 256;
      let y = rand() * 256;
      ctx.strokeStyle = `rgba(40,32,22,${0.12 + rand() * 0.18})`;
      ctx.lineWidth = 0.6 + rand();
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let k = 0; k < 7; k++) {
        x += (rand() - 0.5) * 22;
        y += rand() * 18;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "rgba(245,226,190,0.06)");
    grad.addColorStop(0.55, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.18)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  });
}

export function concreteTexture(seed = 21, base = "#4b4c48"): THREE.CanvasTexture {
  return canvasTexture(256, 256, (ctx) => {
    const rand = rng(seed);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 13000; i++) {
      const v = Math.floor(rand() * 50) - 25;
      ctx.fillStyle = `rgba(${92 + v},${92 + v},${88 + v},0.18)`;
      ctx.fillRect(rand() * 256, rand() * 256, 1 + rand() * 2, 1 + rand() * 2);
    }
    for (let i = 0; i < 20; i++) {
      const x = rand() * 256;
      const w = 1 + rand() * 4;
      const g = ctx.createLinearGradient(x, 0, x + w, 0);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.5, `rgba(15,16,14,${0.1 + rand() * 0.16})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, w, 256);
    }
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "rgba(20,21,18,0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rand() * 256, rand() * 256);
      ctx.lineTo(rand() * 256, rand() * 256);
      ctx.stroke();
    }
  });
}

export function stoneTileTexture(seed = 31): THREE.CanvasTexture {
  return canvasTexture(256, 256, (ctx) => {
    const rand = rng(seed);
    const tiles = 4;
    const size = 256 / tiles;
    for (let y = 0; y < tiles; y++) {
      for (let x = 0; x < tiles; x++) {
        const v = Math.floor(rand() * 20) - 10;
        ctx.fillStyle = `rgb(${62 + v},${61 + v},${56 + v})`;
        ctx.fillRect(x * size + 2, y * size + 2, size - 4, size - 4);
        for (let i = 0; i < 170; i++) {
          const d = Math.floor(rand() * 30) - 15;
          ctx.fillStyle = `rgba(${92 + d},${91 + d},${84 + d},0.16)`;
          ctx.fillRect(x * size + 3 + rand() * (size - 6), y * size + 3 + rand() * (size - 6), 1 + rand() * 3, 1 + rand() * 2);
        }
      }
    }
    ctx.strokeStyle = "rgba(20,20,18,0.8)";
    ctx.lineWidth = 3;
    for (let i = 0; i <= tiles; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, 256);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(256, i * size);
      ctx.stroke();
    }
  }, { repeat: [3, 3] });
}

export function metalTexture(seed = 41, base = 0x3a4046): THREE.CanvasTexture {
  return canvasTexture(256, 256, (ctx) => {
    const rand = rng(seed);
    const c = new THREE.Color(base);
    ctx.fillStyle = `#${c.getHexString()}`;
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 50; i++) {
      const y = rand() * 256;
      ctx.fillStyle = `rgba(255,255,255,${0.015 + rand() * 0.045})`;
      ctx.fillRect(0, y, 256, 0.6 + rand());
    }
    for (let i = 0; i < 900; i++) {
      const v = rand() > 0.5 ? 255 : 0;
      ctx.fillStyle = `rgba(${v},${v},${v},${0.01 + rand() * 0.03})`;
      ctx.fillRect(rand() * 256, rand() * 256, 1 + rand(), 1 + rand());
    }
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = `rgba(120,80,45,${0.02 + rand() * 0.04})`;
      ctx.fillRect(rand() * 256, rand() * 256, 2 + rand() * 9, 1 + rand() * 3);
    }
  });
}

export function fabricTexture(seed = 51, base = "#77746a"): THREE.CanvasTexture {
  return canvasTexture(128, 128, (ctx) => {
    const rand = rng(seed);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 2600; i++) {
      const v = Math.floor(rand() * 26) - 13;
      ctx.fillStyle = `rgba(${140 + v},${138 + v},${128 + v},0.12)`;
      ctx.fillRect(rand() * 128, rand() * 128, 1, 1);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 128; i += 4) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.stroke();
    }
  }, { nearest: true });
}

export function screenTexture(lines: string[], accent = "#8fd8b0"): THREE.CanvasTexture {
  return canvasTexture(256, 128, (ctx) => {
    ctx.fillStyle = "#07100e";
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = "rgba(80,160,130,0.08)";
    for (let y = 0; y < 128; y += 2) ctx.fillRect(0, y, 256, 1);
    ctx.font = "11px monospace";
    ctx.fillStyle = accent;
    lines.forEach((line, i) => ctx.fillText(line, 12, 24 + i * 18));
    ctx.strokeStyle = "rgba(140,220,190,0.22)";
    ctx.strokeRect(4, 4, 248, 120);
  }, { nearest: true });
}

export function labelTexture(text: string, color = "#d6a45f", bg = "#16120c"): THREE.CanvasTexture {
  return canvasTexture(256, 128, (ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = "rgba(214,164,95,0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, 244, 116);
    ctx.font = "22px 'Songti SC', serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 64);
  }, { nearest: true });
}

export function glowTexture(inner = "rgba(255,240,210,1)", outer = "rgba(255,190,110,0)"): THREE.CanvasTexture {
  const texture = canvasTexture(128, 128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, inner);
    g.addColorStop(0.18, inner);
    g.addColorStop(0.52, outer);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }, { nearest: false });
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function sunTexture(): THREE.CanvasTexture {
  const texture = canvasTexture(256, 256, (ctx) => {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,255,248,1)");
    g.addColorStop(0.1, "rgba(255,250,225,1)");
    g.addColorStop(0.18, "rgba(255,232,170,0.92)");
    g.addColorStop(0.35, "rgba(255,180,90,0.3)");
    g.addColorStop(0.68, "rgba(255,130,60,0.06)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = "rgba(255,255,245,0.9)";
    ctx.beginPath();
    ctx.arc(128, 128, 14, 0, Math.PI * 2);
    ctx.fill();
  }, { nearest: false });
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function smokeTexture(): THREE.CanvasTexture {
  const texture = canvasTexture(128, 128, (ctx) => {
    const rand = rng(77);
    ctx.clearRect(0, 0, 128, 128);
    for (let i = 0; i < 34; i++) {
      const x = 64 + (rand() - 0.5) * 68;
      const y = 64 + (rand() - 0.5) * 68;
      const r = 5 + rand() * 22;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(210,214,218,0.24)");
      g.addColorStop(1, "rgba(210,214,218,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }, { nearest: false });
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function dustTexture(): THREE.CanvasTexture {
  const texture = canvasTexture(64, 64, (ctx) => {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,244,218,0.95)");
    g.addColorStop(0.35, "rgba(255,232,190,0.4)");
    g.addColorStop(1, "rgba(255,220,170,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }, { nearest: false });
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}


export function meatTexture(): THREE.CanvasTexture {
  return canvasTexture(128, 128, (ctx) => {
    const rand = rng(881);
    ctx.fillStyle = "#7d2a2c";
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 1400; i++) {
      const v = Math.floor(rand() * 50) - 25;
      ctx.fillStyle = `rgba(${150 + v},${55 + v * 0.4},${54 + v * 0.3},0.22)`;
      ctx.fillRect(rand() * 128, rand() * 128, 1 + rand() * 2, 1 + rand() * 2);
    }
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(226,205,180,${0.16 + rand() * 0.2})`;
      ctx.lineWidth = 1 + rand() * 2;
      ctx.beginPath();
      let x = rand() * 128, y = rand() * 128;
      ctx.moveTo(x, y);
      for (let k = 0; k < 4; k++) {
        x += 6 + rand() * 22;
        y += (rand() - 0.5) * 12;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }, { nearest: true });
}

export function craterTexture(size = 256): THREE.CanvasTexture {
  return canvasTexture(size, size, (ctx) => {
    const rand = rng(91);
    ctx.fillStyle = "#3a3a3c";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 1400; i++) {
      const v = Math.floor(rand() * 55) - 27;
      ctx.fillStyle = `rgba(${120 + v},${118 + v},${116 + v},0.25)`;
      ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 3, 1 + rand() * 3);
    }
    for (let i = 0; i < 50; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 1 + rand() * 6;
      ctx.fillStyle = "rgba(15,15,16,0.55)";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(180,180,175,0.12)";
      ctx.stroke();
    }
  }, { nearest: true });
}
