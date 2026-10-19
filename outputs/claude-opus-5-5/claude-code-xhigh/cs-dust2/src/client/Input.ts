/**
 * Keyboard / mouse / pointer-lock state. Held keys are queried directly; presses are latched
 * until consumed by the next simulation tick so short taps are never lost between frames.
 */
export class InputManager {
  private readonly held = new Set<string>();
  private readonly pressed = new Set<string>();
  private mouseDX = 0;
  private mouseDY = 0;
  private wheel = 0;
  locked = false;
  /** When pointer lock is unavailable, fall back to raw mouse movement over the canvas. */
  lookFallback = false;
  private readonly target: HTMLElement;
  private readonly listeners: Array<[EventTarget, string, EventListener, AddEventListenerOptions | undefined]> = [];
  onLockChange: ((locked: boolean) => void) | null = null;
  onLockError: (() => void) | null = null;
  /** Keys that should not scroll / move focus while playing. */
  private static readonly BLOCK = new Set(['Space', 'Tab', 'ArrowUp', 'ArrowDown', 'Backquote']);
  enabled = false;

  constructor(target: HTMLElement) {
    this.target = target;
    this.listen(window, 'keydown', (e) => this.onKey(e as KeyboardEvent, true));
    this.listen(window, 'keyup', (e) => this.onKey(e as KeyboardEvent, false));
    this.listen(document, 'mousemove', (e) => this.onMouseMove(e as MouseEvent));
    this.listen(document, 'mousedown', (e) => this.onMouseButton(e as MouseEvent, true));
    this.listen(document, 'mouseup', (e) => this.onMouseButton(e as MouseEvent, false));
    this.listen(target, 'wheel', (e) => this.onWheel(e as WheelEvent), { passive: false });
    this.listen(target, 'contextmenu', (e) => e.preventDefault());
    this.listen(document, 'pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.target;
      if (!this.locked) this.releaseAll();
      this.onLockChange?.(this.locked);
    });
    this.listen(document, 'pointerlockerror', () => this.onLockError?.());
    this.listen(window, 'blur', () => this.releaseAll());
  }

  private listen(t: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions): void {
    t.addEventListener(type, fn, opts);
    this.listeners.push([t, type, fn, opts]);
  }

  private get active(): boolean {
    return this.enabled && (this.locked || this.lookFallback);
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    if (!this.enabled) return;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    if (InputManager.BLOCK.has(e.code)) e.preventDefault();
    if (down) {
      if (!this.held.has(e.code)) this.pressed.add(e.code);
      this.held.add(e.code);
    } else {
      this.held.delete(e.code);
    }
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.active) return;
    this.mouseDX += e.movementX || 0;
    this.mouseDY += e.movementY || 0;
  }

  private onMouseButton(e: MouseEvent, down: boolean): void {
    if (!this.active) return;
    const code = e.button === 0 ? 'Mouse0' : e.button === 2 ? 'Mouse2' : e.button === 1 ? 'Mouse1' : `Mouse${e.button}`;
    if (down) {
      if (!this.held.has(code)) this.pressed.add(code);
      this.held.add(code);
    } else this.held.delete(code);
  }

  private onWheel(e: WheelEvent): void {
    if (!this.active) return;
    e.preventDefault();
    this.wheel += Math.sign(e.deltaY);
  }

  requestLock(): void {
    try {
      const r = this.target.requestPointerLock() as unknown;
      if (r && typeof (r as Promise<void>).catch === 'function') {
        (r as Promise<void>).catch(() => this.onLockError?.());
      }
    } catch {
      this.onLockError?.();
    }
  }

  exitLock(): void {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  isDown(code: string): boolean {
    return this.held.has(code);
  }

  /** Consumes a latched press. */
  consume(code: string): boolean {
    if (this.pressed.has(code)) {
      this.pressed.delete(code);
      return true;
    }
    return false;
  }

  peek(code: string): boolean {
    return this.pressed.has(code);
  }

  consumeLook(): [number, number] {
    const r: [number, number] = [this.mouseDX, this.mouseDY];
    this.mouseDX = 0;
    this.mouseDY = 0;
    return r;
  }

  consumeWheel(): number {
    const w = this.wheel;
    this.wheel = 0;
    return w;
  }

  clearPressed(): void {
    this.pressed.clear();
  }

  releaseAll(): void {
    this.held.clear();
    this.pressed.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
  }

  dispose(): void {
    for (const [t, type, fn, opts] of this.listeners) t.removeEventListener(type, fn, opts);
    this.listeners.length = 0;
    this.exitLock();
  }
}
