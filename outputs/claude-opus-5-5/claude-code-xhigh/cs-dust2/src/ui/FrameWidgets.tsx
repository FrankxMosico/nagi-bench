import { useRef } from 'react';
import { useFrame } from './context.ts';

/** Dynamic crosshair: the gap follows the weapon's live inaccuracy (movement, recoil, air). */
export function Crosshair() {
  const root = useRef<HTMLDivElement>(null);
  const hit = useRef<HTMLDivElement>(null);
  useFrame((c) => {
    const el = root.current;
    const hm = hit.current;
    if (!el || !hm) return;
    const f = c.frame;
    el.style.display = f.crosshairVisible ? 'block' : 'none';
    el.style.setProperty('--gap', `${Math.min(90, f.crosshairGap).toFixed(1)}px`);
    const age = f.now - f.hitTime;
    const life = f.hitKill ? 0.45 : 0.22;
    hm.style.opacity = age < life ? String(1 - age / life) : '0';
    hm.className = `hitmarker${f.hitKill ? ' kill' : ''}${f.hitHead ? ' head' : ''}`;
  });
  return (
    <>
      <div ref={root} className="crosshair">
        <i className="ch ch-l" />
        <i className="ch ch-r" />
        <i className="ch ch-t" />
        <i className="ch ch-b" />
        <i className="ch-dot" />
      </div>
      <div ref={hit} className="hitmarker">
        <i />
        <i />
        <i />
        <i />
      </div>
    </>
  );
}

/** AWP scope: 2D mask with reticle, shown while zoomed. */
export function ScopeOverlay() {
  const el = useRef<HTMLDivElement>(null);
  useFrame((c) => {
    if (el.current) el.current.style.display = c.frame.scope > 0 ? 'block' : 'none';
  });
  return (
    <div ref={el} className="scope-overlay">
      <div className="scope-ring" />
      <div className="scope-line h" />
      <div className="scope-line v" />
      <div className="scope-dot" />
    </div>
  );
}

/** Red hurt flash, low-health vignette and directional damage indicators. */
export function DamageOverlay() {
  const flash = useRef<HTMLDivElement>(null);
  const arcs = useRef<HTMLDivElement>(null);
  useFrame((c) => {
    const f = c.frame;
    const fl = flash.current;
    const box = arcs.current;
    if (!fl || !box) return;
    const age = f.now - f.hurtTime;
    const low = f.alive && f.health < 35 ? (35 - f.health) / 35 : 0;
    fl.style.opacity = String(Math.max(age < 0.35 ? (1 - age / 0.35) * 0.55 : 0, low * 0.5));
    const children = box.children;
    for (let i = 0; i < children.length; i++) {
      const d = f.damageDirs[f.damageDirs.length - 1 - i];
      const node = children[i] as HTMLElement;
      if (!d || f.now - d.time > 1.4 || !f.alive) {
        node.style.opacity = '0';
        continue;
      }
      const rel = d.angle - f.viewYaw;
      node.style.opacity = String(1 - (f.now - d.time) / 1.4);
      node.style.transform = `translate(-50%, -50%) rotate(${(-rel * 180) / Math.PI}deg)`;
    }
  });
  return (
    <>
      <div ref={flash} className="hurt-flash" />
      <div ref={arcs} className="damage-dirs">
        <i />
        <i />
        <i />
        <i />
      </div>
    </>
  );
}
