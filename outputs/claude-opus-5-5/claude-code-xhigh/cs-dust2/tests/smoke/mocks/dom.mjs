// Just enough browser environment (window/document/canvas 2D/Web Audio/rAF/localStorage) for the
// game client to boot under Node. Event listeners are recorded so tests can dispatch input.
import { makeAny } from './any.mjs';

function eventTarget(obj) {
  const listeners = new Map();
  obj.addEventListener = (type, fn) => {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(fn);
  };
  obj.removeEventListener = (type, fn) => {
    listeners.get(type)?.delete(fn);
  };
  obj.dispatch = (type, ev = {}) => {
    const e = { type, target: { tagName: 'BODY' }, preventDefault() {}, stopPropagation() {}, ...ev };
    for (const fn of [...(listeners.get(type) || [])]) fn(e);
  };
  obj.listenerCount = (type) => listeners.get(type)?.size ?? 0;
  return obj;
}

function context2d(canvas) {
  const ctx = makeAny('CanvasRenderingContext2D');
  ctx.canvas = canvas;
  ctx.createImageData = (w, h) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) });
  ctx.measureText = () => ({ width: 10 });
  return ctx;
}

export function createHost(tag) {
  const el = eventTarget({
    tagName: String(tag).toUpperCase(),
    props: {},
    style: { setProperty() {}, removeProperty() {} },
    children: [],
    className: '',
    clientWidth: 1280,
    clientHeight: 720,
    width: 300,
    height: 150,
    appendChild(c) {
      this.children.push(c);
      return c;
    },
    remove() {},
    requestPointerLock() {
      return Promise.resolve();
    },
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 1280, height: 720 };
    },
  });
  if (tag === 'canvas') {
    let ctx = null;
    el.getContext = () => (ctx ??= context2d(el));
  }
  return el;
}

export const rafQueue = [];

export function installDom() {
  const g = globalThis;
  g.window = g;
  eventTarget(g);
  g.devicePixelRatio = 1;
  g.innerWidth = 1280;
  g.innerHeight = 720;
  const doc = eventTarget({
    pointerLockElement: null,
    body: createHost('body'),
    createElement: (t) => createHost(t),
    getElementById: () => createHost('div'),
    exitPointerLock() {
      if (doc.pointerLockElement) {
        doc.pointerLockElement = null;
        doc.dispatch('pointerlockchange');
      }
    },
  });
  g.document = doc;
  g.requestAnimationFrame = (cb) => {
    rafQueue.push(cb);
    return rafQueue.length;
  };
  g.cancelAnimationFrame = () => {};
  const mem = new Map();
  g.localStorage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
  };
  g.AudioContext = function AudioContext() {
    const ctx = makeAny('AudioContext');
    ctx.sampleRate = 48000;
    ctx.currentTime = 0;
    ctx.state = 'running';
    ctx.createBuffer = (ch, len) => {
      const data = Array.from({ length: ch }, () => new Float32Array(len));
      return { numberOfChannels: ch, length: len, getChannelData: (i) => data[i] };
    };
    ctx.resume = () => Promise.resolve();
    ctx.suspend = () => Promise.resolve();
    ctx.close = () => Promise.resolve();
    return ctx;
  };
}

/** Runs one animation frame at the given timestamp (ms). */
export function pumpFrame(t) {
  const cbs = rafQueue.splice(0);
  for (const cb of cbs) cb(t);
}
