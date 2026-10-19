// A tiny single-pass React stand-in: renders function components (with hooks) into a plain
// host tree, collects effects so tests can run/cleanup them, and supports context providers.
import { createHost } from './dom.mjs';

export const Fragment = Symbol('Fragment');
export const __Fragment = Fragment;

export function StrictMode({ children }) {
  return children;
}

export function createElement(type, props, ...children) {
  const p = { ...(props || {}) };
  if (children.length === 1) p.children = children[0];
  else if (children.length > 1) p.children = children;
  return { $$el: true, type, props: p };
}
export const __h = createElement;

let pendingEffects = [];
let storeUnsubs = [];

export function createContext(defaultValue) {
  const ctx = { _default: defaultValue, _stack: [] };
  ctx.Provider = function Provider() {
    return null;
  };
  ctx.Provider._ctx = ctx;
  return ctx;
}

export function useContext(ctx) {
  return ctx._stack.length ? ctx._stack[ctx._stack.length - 1] : ctx._default;
}
export function useState(init) {
  return [typeof init === 'function' ? init() : init, () => {}];
}
export function useRef(init) {
  return { current: init };
}
export function useEffect(fn) {
  pendingEffects.push(fn);
}
export const useLayoutEffect = useEffect;
export function useMemo(fn) {
  return fn();
}
export function useCallback(fn) {
  return fn;
}
export function useSyncExternalStore(subscribe, getSnapshot) {
  storeUnsubs.push(subscribe(() => {}));
  return getSnapshot();
}

/** Renders an element tree; returns a host-node tree { tag, props, children, text }. */
export function render(node) {
  if (node === null || node === undefined || node === false || node === true) return null;
  if (typeof node === 'string' || typeof node === 'number') return { text: String(node) };
  if (Array.isArray(node)) return { tag: '#list', children: node.map(render).filter(Boolean) };
  if (!node.$$el) throw new Error(`Objects are not valid as a React child: ${JSON.stringify(node).slice(0, 120)}`);
  const { type, props } = node;
  if (type === Fragment) return { tag: '#frag', children: [render(props.children)].filter(Boolean) };
  if (typeof type === 'function' && type._ctx) {
    type._ctx._stack.push(props.value);
    try {
      return { tag: '#provider', children: [render(props.children)].filter(Boolean) };
    } finally {
      type._ctx._stack.pop();
    }
  }
  if (typeof type === 'function') return render(type(props));
  if (typeof type === 'string') {
    const host = createHost(type);
    if (props.ref) props.ref.current = host;
    for (const [k, v] of Object.entries(props)) {
      if (k === 'children' || k === 'ref' || k === 'key') continue;
      if (k === 'style' && v && typeof v === 'object') Object.assign(host.style, v);
      else host.props[k] = v;
    }
    const kids = props.children === undefined ? [] : [render(props.children)].filter(Boolean);
    return { tag: type, props, host, children: kids };
  }
  throw new Error(`Unknown element type: ${String(type)}`);
}

/** Runs queued effects; returns cleanup functions. */
export function flushEffects() {
  const cleanups = [];
  const list = pendingEffects;
  pendingEffects = [];
  for (const fn of list) {
    const c = fn();
    if (typeof c === 'function') cleanups.push(c);
  }
  for (const u of storeUnsubs) if (typeof u === 'function') cleanups.push(u);
  storeUnsubs = [];
  return cleanups;
}

export function textOf(tree) {
  if (!tree) return '';
  if (tree.text !== undefined) return tree.text;
  return (tree.children || []).map(textOf).join('');
}

export function findAll(tree, pred, out = []) {
  if (!tree) return out;
  if (pred(tree)) out.push(tree);
  for (const c of tree.children || []) findAll(c, pred, out);
  return out;
}

export default { createElement, Fragment, StrictMode, createContext, useContext, useState, useRef, useEffect, useMemo, useCallback, useSyncExternalStore };
