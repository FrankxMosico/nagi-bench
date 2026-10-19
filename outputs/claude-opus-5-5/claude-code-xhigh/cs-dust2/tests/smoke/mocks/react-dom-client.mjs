import { flushEffects, render } from './react.mjs';

export const roots = [];

export function createRoot(el) {
  const root = {
    el,
    tree: null,
    cleanups: [],
    render(element) {
      root.tree = render(element);
      root.cleanups = flushEffects();
    },
    unmount() {
      for (const c of root.cleanups) c();
      root.cleanups = [];
    },
  };
  roots.push(root);
  return root;
}
