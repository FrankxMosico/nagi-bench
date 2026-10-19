// Permissive stand-in object: every property exists, can be called or constructed, coerces to 0.
// Assigned properties are remembered, so code that writes then reads its own fields works.
export const calls = { count: 0 };

export function makeAny(name) {
  const store = new Map();
  const target = function () {};
  const proxy = new Proxy(target, {
    get(_t, key) {
      if (key === Symbol.toPrimitive) return (hint) => (hint === 'string' ? `[${name}]` : 0);
      if (key === 'valueOf') return () => 0;
      if (key === 'toString') return () => `[${name}]`;
      if (key === Symbol.iterator) return function* () {};
      if (key === 'then') return undefined;
      if (key === Symbol.hasInstance) return () => false;
      if (store.has(key)) return store.get(key);
      const v = makeAny(`${name}.${String(key)}`);
      store.set(key, v);
      return v;
    },
    set(_t, key, value) {
      store.set(key, value);
      return true;
    },
    apply() {
      calls.count++;
      return makeAny(`${name}()`);
    },
    construct() {
      calls.count++;
      return makeAny(`new ${name}`);
    },
    has() {
      return true;
    },
  });
  return proxy;
}
