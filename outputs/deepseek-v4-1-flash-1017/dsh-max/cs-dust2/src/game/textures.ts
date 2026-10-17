import * as THREE from 'three';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(size = 256): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas is unavailable');
  return [c, ctx];
}

function finishTexture(c: HTMLCanvasElement, repeatX: number, repeatY: number): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = 4;
  return tex;
}

function noiseFill(
  ctx: CanvasRenderingContext2D,
  size: number,
  colors: string[],
  density: number,
  rand: () => number,
  minR = 0.4,
  maxR = 2.2,
): void {
  for (let i = 0; i < density; i++) {
    ctx.fillStyle = colors[Math.floor(rand() * colors.length)];
    ctx.globalAlpha = 0.12 + rand() * 0.3;
    const r = minR + rand() * (maxR - minR);
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function makeSandTexture(): THREE.CanvasTexture {
  const size = 512;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(7721);
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#b8a176');
  grad.addColorStop(0.5, '#a98f63');
  grad.addColorStop(1, '#c0aa7c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  noiseFill(ctx, size, ['#d6c296', '#8f7852', '#c9b185', '#766546'], 5200, rand, 0.3, 2.1);

  // Fine wind ripples.
  ctx.globalAlpha = 0.11;
  for (let i = 0; i < 30; i++) {
    ctx.strokeStyle = i % 2 ? '#ede0bb' : '#796647';
    ctx.lineWidth = 1 + rand() * 2;
    const y = rand() * size;
    ctx.beginPath();
    for (let x = 0; x <= size; x += 20) {
      const yy = y + Math.sin(x * 0.03 + i) * 5 + Math.sin(x * 0.011 + i * 2) * 8;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  // Scattered pebbles and dark specks.
  ctx.globalAlpha = 0.7;
  for (let i = 0; i < 500; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 0.3 + rand() * 1.7;
    ctx.fillStyle = rand() > 0.5 ? '#6d6049' : '#d8caa6';
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.65, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return finishTexture(c, 10, 10);
}

export function makeStoneTexture(base = '#a78d68', mortar = '#7c684d'): THREE.CanvasTexture {
  const size = 512;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(11411 + base.charCodeAt(1) * 99);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  noiseFill(ctx, size, ['#c2ab83', '#8f7859', '#b89d75', '#746248'], 3500, rand, 0.3, 2.5);

  const rowH = 58;
  ctx.strokeStyle = mortar;
  ctx.lineWidth = 4;
  for (let row = 0; row < Math.ceil(size / rowH); row++) {
    const y = row * rowH;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
    const offset = (row % 2) * 52;
    for (let x = offset; x < size; x += 104) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + rowH);
      ctx.stroke();
    }
  }

  // Chipped plaster patches.
  for (let i = 0; i < 45; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const w = 5 + rand() * 24;
    const h = 3 + rand() * 10;
    ctx.fillStyle = rand() > 0.5 ? 'rgba(221,205,170,.28)' : 'rgba(84,71,51,.25)';
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // A few hairlines.
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = 'rgba(67,54,39,.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const x = rand() * size;
    const y = rand() * size;
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * 70, y + rand() * 90);
    ctx.stroke();
  }

  return finishTexture(c, 2.2, 1.4);
}

export function makePlasterTexture(): THREE.CanvasTexture {
  const size = 256;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(551);
  ctx.fillStyle = '#b9a483';
  ctx.fillRect(0, 0, size, size);
  noiseFill(ctx, size, ['#d4c4a1', '#998361', '#c2ad88'], 2200, rand, 0.4, 2.8);
  for (let i = 0; i < 16; i++) {
    ctx.strokeStyle = `rgba(93,76,53,${0.12 + rand() * 0.15})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const x = rand() * size;
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 20, 60, x - 15, 170, x + 8, size);
    ctx.stroke();
  }
  return finishTexture(c, 2.5, 2.0);
}

export function makeConcreteTexture(): THREE.CanvasTexture {
  const size = 512;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(9983);
  ctx.fillStyle = '#918a7d';
  ctx.fillRect(0, 0, size, size);
  noiseFill(ctx, size, ['#a9a397', '#756e62', '#b5afa1', '#625d54'], 5200, rand, 0.3, 2);
  ctx.strokeStyle = 'rgba(58,54,47,.32)';
  ctx.lineWidth = 2;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo((i * size) / 4, 0);
    ctx.lineTo((i * size) / 4, size);
    ctx.stroke();
  }
  for (let i = 0; i < 20; i++) {
    ctx.strokeStyle = `rgba(55,50,44,${0.12 + rand() * 0.18})`;
    ctx.lineWidth = 1 + rand();
    ctx.beginPath();
    const x = rand() * size;
    const y = rand() * size;
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * 100, y + (rand() - 0.5) * 100);
    ctx.stroke();
  }
  return finishTexture(c, 5, 5);
}

export function makeTunnelTexture(): THREE.CanvasTexture {
  const size = 512;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(3921);
  ctx.fillStyle = '#665b4e';
  ctx.fillRect(0, 0, size, size);
  noiseFill(ctx, size, ['#7e705f', '#4e463c', '#8b7b66', '#3e3931'], 7000, rand, 0.4, 3);
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = `rgba(40,36,31,${0.1 + rand() * 0.25})`;
    ctx.beginPath();
    ctx.ellipse(rand() * size, rand() * size, 3 + rand() * 25, 2 + rand() * 9, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  return finishTexture(c, 4, 4);
}

export function makeWoodTexture(): THREE.CanvasTexture {
  const size = 512;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(44812);
  ctx.fillStyle = '#8c6236';
  ctx.fillRect(0, 0, size, size);
  const plankH = 86;
  for (let y = 0; y < size; y += plankH) {
    const grad = ctx.createLinearGradient(0, y, 0, y + plankH);
    grad.addColorStop(0, '#a87c48');
    grad.addColorStop(0.5, '#835c33');
    grad.addColorStop(1, '#a07141');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y + 3, size, plankH - 6);
    ctx.strokeStyle = 'rgba(46,30,16,.9)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
    for (let i = 0; i < 16; i++) {
      ctx.strokeStyle = `rgba(70,45,23,${0.1 + rand() * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const yy = y + 8 + rand() * (plankH - 16);
      ctx.moveTo(0, yy);
      ctx.bezierCurveTo(size * 0.3, yy + 6, size * 0.65, yy - 5, size, yy + 2);
      ctx.stroke();
    }
  }
  // Diagonal braces.
  ctx.strokeStyle = '#4e3723';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, size);
  ctx.moveTo(size, 0);
  ctx.lineTo(0, size);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(205,167,104,.22)';
  ctx.lineWidth = 5;
  ctx.stroke();
  return finishTexture(c, 1.6, 1.6);
}

export function makeMetalTexture(): THREE.CanvasTexture {
  const size = 512;
  const [c, ctx] = canvas(size);
  const rand = mulberry32(98001);
  ctx.fillStyle = '#485052';
  ctx.fillRect(0, 0, size, size);
  noiseFill(ctx, size, ['#606a6b', '#343a3b', '#778082', '#252b2c'], 3000, rand, 0.4, 2.2);
  ctx.strokeStyle = 'rgba(25,30,31,.5)';
  ctx.lineWidth = 3;
  for (let x = 0; x < size; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let i = 0; i < 80; i++) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.fillStyle = `rgba(142,74,35,${rand() * 0.22})`;
    ctx.beginPath();
    ctx.arc(x, y, 1 + rand() * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = 'rgba(165,178,180,.4)';
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
  return finishTexture(c, 2.5, 2.5);
}

export function makeC4Texture(): THREE.CanvasTexture {
  const size = 256;
  const [c, ctx] = canvas(size);
  ctx.fillStyle = '#292d24';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#444a33';
  ctx.fillRect(12, 12, size - 24, size - 24);
  ctx.strokeStyle = '#1a1c17';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, size - 24, size - 24);
  ctx.fillStyle = '#745b30';
  ctx.fillRect(34, 34, 72, 52);
  ctx.fillStyle = '#c7ba83';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('C4', 45, 65);
  ctx.fillStyle = '#191d18';
  ctx.fillRect(130, 42, 84, 54);
  ctx.strokeStyle = '#69705c';
  ctx.strokeRect(130, 42, 84, 54);
  ctx.fillStyle = '#e33b27';
  ctx.font = 'bold 34px monospace';
  ctx.fillText('88', 146, 82);
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 ? '#d0993b' : '#b44a2b';
    ctx.fillRect(36 + i * 22, 174, 13, 28);
  }
  ctx.strokeStyle = '#c73c28';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(70, 108);
  ctx.quadraticCurveTo(160, 140, 224, 110);
  ctx.stroke();
  ctx.strokeStyle = '#d9b23c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(84, 112);
  ctx.quadraticCurveTo(156, 158, 212, 118);
  ctx.stroke();
  return finishTexture(c, 1, 1);
}

export function makeLabelTexture(
  text: string,
  options: {
    width?: number;
    height?: number;
    color?: string;
    background?: string;
    border?: string;
    font?: string;
    transparent?: boolean;
    align?: CanvasTextAlign;
  } = {},
): THREE.CanvasTexture {
  const width = options.width ?? 512;
  const height = options.height ?? 128;
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas is unavailable');
  if (!options.transparent) {
    ctx.fillStyle = options.background ?? 'rgba(25,23,18,.9)';
    ctx.fillRect(0, 0, width, height);
  }
  if (options.border) {
    ctx.strokeStyle = options.border;
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, width - 8, height - 8);
  }
  ctx.fillStyle = options.color ?? '#e9dfc5';
  ctx.font = options.font ?? `bold ${Math.floor(height * 0.48)}px "Arial Narrow", Arial, sans-serif`;
  ctx.textAlign = options.align ?? 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,.65)';
  ctx.shadowBlur = 6;
  ctx.fillText(text, width / 2, height / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function makeSkyTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas is unavailable');
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#517c98');
  grad.addColorStop(0.36, '#9db5b8');
  grad.addColorStop(0.62, '#e2cfae');
  grad.addColorStop(1, '#c9a875');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const rand = mulberry32(721);
  // Soft, dusty clouds.
  for (let i = 0; i < 50; i++) {
    const x = rand() * width;
    const y = height * (0.12 + rand() * 0.4);
    const w = 50 + rand() * 180;
    const h = 8 + rand() * 30;
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, w);
    cloud.addColorStop(0, `rgba(247,235,214,${0.08 + rand() * 0.13})`);
    cloud.addColorStop(1, 'rgba(247,235,214,0)');
    ctx.fillStyle = cloud;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sun glow toward the horizon.
  const sun = ctx.createRadialGradient(width * 0.72, height * 0.34, 0, width * 0.72, height * 0.34, 160);
  sun.addColorStop(0, 'rgba(255,245,213,.8)');
  sun.addColorStop(0.15, 'rgba(255,230,173,.3)');
  sun.addColorStop(1, 'rgba(255,222,160,0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, width, height);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

export function makeBloodTexture(): THREE.CanvasTexture {
  const size = 64;
  const [c, ctx] = canvas(size);
  ctx.clearRect(0, 0, size, size);
  const grad = ctx.createRadialGradient(size / 2, size / 2, 1, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(125, 9, 4, .9)');
  grad.addColorStop(0.5, 'rgba(91, 6, 3, .55)');
  grad.addColorStop(1, 'rgba(60, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const rand = mulberry32(31);
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = `rgba(100,5,2,${0.25 + rand() * 0.4})`;
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, 1 + rand() * 4, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
