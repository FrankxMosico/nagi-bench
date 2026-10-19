/**
 * Reduced-coordinate rigid-body engine. SI units; fixed 1/240 s step.
 * A rotor has one unconstrained angular DOF; ideal bearings remove the other 5.
 * Gear/chain constraints solve impulses J M^-1 J^T, including reaction torque.
 * All visible mechanical transforms are reconstructed from these coordinates.
 * There are no animation curves, target angles or time-driven motors.
 */
export const STEP = 1 / 240;
const TAU = Math.PI * 2;
const wrap = x => Math.atan2(Math.sin(x), Math.cos(x));
export class Rotor {
  constructor(name, inertia, damping = .04) { this.name = name; this.I = inertia; this.invI = 1 / inertia; this.damping = damping; this.q = 0; this.v = 0; this.force = 0; }
  torque(value) { this.force += value; }
  impulse(value) { this.v += value * this.invI; }
}
class GearConstraint {
  constructor(a, b, ja, jb) { Object.assign(this, { a, b, ja, jb }); this.mass = 1 / (ja * ja * a.invI + jb * jb * b.invI); }
  solve() {
    const { a, b, ja, jb, mass } = this;
    const impulse = -(ja * a.v + jb * b.v) * mass;
    a.impulse(ja * impulse); b.impulse(jb * impulse);
  }
  project() {
    const { a, b, ja, jb, mass } = this;
    const impulse = -(ja * a.q + jb * b.q) * mass;
    a.q += a.invI * ja * impulse; b.q += b.invI * jb * impulse;
  }
  get error() { return this.ja * this.a.q + this.jb * this.b.q; }
}
export class ClockPhysics {
  constructor() {
    this.time = 0; this.flow = true; this.stepCount = 0; this.strikes = 0;
    this.rotors = []; this.constraints = []; this.events = [];
    this.wheel = this.rotor('water wheel', 3.4, .2);
    this.gear = this.rotor('idler gear', .14);
    // The chain uses length s rather than an angle; I is its linear mass.
    this.chain = this.rotor('endless chain', .4, .08);
    this.upper = this.rotor('upper chain sprocket', .12);
    this.shaft = this.rotor('vertical shaft', .17);
    this.globe = this.rotor('celestial globe', .16);
    this.armillary = this.rotor('armillary sphere', .25);
    this.carousel = this.rotor('time drum', .26);
    this.cam = this.rotor('striking cam', .09);
    this.balance = this.rotor('weighted balance and pallet', .028, .13);
    this.hammer = this.rotor('bell hammer', .024, .055);
    this.bell = this.rotor('bell pendulum', .15, .11);
    this.gearPair(this.wheel, this.gear, 1.8, 1);
    this.gearPair(this.gear, this.chain, -.37, 1);
    this.gearPair(this.chain, this.upper, 1, -.37);
    this.gearPair(this.upper, this.shaft, -.48, 1);
    this.gearPair(this.shaft, this.globe, -.45, 1);
    this.gearPair(this.shaft, this.armillary, -.28, 1);
    this.gearPair(this.wheel, this.carousel, -.48, 1);
    this.gearPair(this.wheel, this.cam, -1.5, 1);
    this.buckets = Array.from({ length: 12 }, (_, i) => ({ phi: Math.PI / 6 + i * TAU / 12, mass: 0 }));
    this.pitch = TAU / this.buckets.length; this.stop = 0; this.latched = true; this.armed = true;
    this.receiving = 0; this.receivingMass = 0; this.streamAccumulator = 0;
    this.particles = []; this.seed = 6321; this.hammerReleased = false;
    this.maxConstraintError = 0;
  }
  random() { this.seed = (this.seed * 1664525 + 1013904223) >>> 0; return this.seed / 4294967296; }
  rotor(name, inertia, damping) { const r = new Rotor(name, inertia, damping); this.rotors.push(r); return r; }
  gearPair(a, b, ja, jb) { this.constraints.push(new GearConstraint(a, b, ja, jb)); }
  limit(r, lower, upper) {
    // Inelastic unilateral contact plus penetration projection, not a pose driver.
    if (r.q < lower) { r.q = lower; if (r.v < 0) r.impulse(-r.v * r.I); }
    if (r.q > upper) { r.q = upper; if (r.v > 0) r.impulse(-r.v * r.I); }
  }
  emitParticle(x, y, z, vx, vy, vz, life = 2) { this.particles.push({ x, y, z, vx, vy, vz, life }); }
  step(dt = STEP) {
    this.time += dt;
    const w = this.wheel;
    let nearest = 0, dist = 100;
    this.buckets.forEach((b, i) => { const d = Math.abs(wrap(b.phi - w.q - Math.PI / 6)); if (d < dist) { dist = d; nearest = i; } });
    this.receiving = nearest;
    if (this.flow && dist < .14) this.buckets[nearest].mass += .28 * dt;
    let waterTorque = 0;
    for (const b of this.buckets) {
      const angle = wrap(b.phi - w.q);
      if (b.mass > 0 && (angle < -.8 || angle > 2)) {
        const lost = Math.min(b.mass, 2.8 * dt); b.mass -= lost;
        if (this.random() < .17) this.emitParticle(1.44 * Math.cos(angle), 2.18 + 1.44 * Math.sin(angle), .78, -w.v * 1.44 * Math.sin(angle), -w.v * 1.44 * Math.cos(angle), .16 * (this.random() - .5), .9);
      }
      waterTorque += b.mass * 9.81 * 1.44 * Math.cos(angle);
    }
    w.torque(waterTorque);
    this.receivingMass = this.buckets[nearest].mass;
    const contact = Math.max(0, 1 - dist / .13);
    const lever = this.balance;
    // A bucket resting on the balance depresses its left arm. A counterweight
    // supplies the closing torque. Its angular threshold opens the stop pallet.
    lever.torque(this.receivingMass * 9.81 * .64 * contact - .90 * Math.cos(lever.q) - 2.4 * lever.q);
    if (!this.armed && lever.q < .025) this.armed = true;
    if (this.latched && this.armed && lever.q > .095) {
      this.latched = false; this.armed = false; this.stop += this.pitch;
      this.events.push({ type: 'release', at: this.time });
    }
    // Pegged cam contact. The cam pushes the hammer away from the bell.
    // Contact forces react onto the cam; the hammer returns under spring/gravity.
    const phase = ((this.cam.q % (Math.PI / 2)) + Math.PI / 2) % (Math.PI / 2);
    const riseStart = .22, riseEnd = 1.05;
    const lift = phase >= riseStart && phase < riseEnd ? (phase - riseStart) / (riseEnd - riseStart) * .62 : 0;
    const camSlope = phase >= riseStart && phase < riseEnd ? .62 / (riseEnd - riseStart) : 0;
    const intrusion = lift - this.hammer.q;
    if (intrusion > 0 && camSlope > 0) {
      const force = Math.max(0, intrusion * 20 + (camSlope * this.cam.v - this.hammer.v) * .13);
      this.hammer.torque(force); this.cam.torque(-force * camSlope);
    }
    this.hammer.torque(-1.10 * Math.sin(this.hammer.q + .18) - .4 * this.hammer.q);
    this.bell.torque(-2.3 * Math.sin(this.bell.q));
    if (this.hammer.q > .25) this.hammerReleased = true;
    for (const r of this.rotors) { r.v += (r.force - r.damping * r.v) * r.invI * dt; r.force = 0; }
    for (let i = 0; i < 18; i++) {
      for (const c of this.constraints) c.solve();
      // The pallet can only push against forward rotation. Anti-reverse pawl.
      if (this.latched && w.v > 0) w.impulse(-w.v * w.I);
      if (w.q <= 0 && w.v < 0) w.impulse(-w.v * w.I);
    }
    for (const r of this.rotors) r.q += r.v * dt;
    this.limit(lever, 0, .23);
    if (this.hammer.q < 0) {
      const incoming = Math.max(0, -this.hammer.v);
      this.hammer.q = 0;
      if (incoming > 0) {
        // Coupled normal contact impulse with a massive resonating bell.
        const impact = (1.08 * incoming) / (this.hammer.invI + .4 * .4 * this.bell.invI);
        this.hammer.impulse(impact); this.bell.impulse(-impact * .4);
        if (this.hammerReleased && incoming > .15) {
          this.events.push({ type: 'bell', energy: Math.min(1, incoming / 4), at: this.time }); this.strikes++; this.hammerReleased = false;
        }
      }
    }
    if (!this.latched && w.q >= this.stop) {
      this.latched = true; this.stepCount++;
      this.events.push({ type: 'catch', at: this.time });
    }
    // Gear manifold and stop penetration are solved together; no imposed speeds.
    for (let k = 0; k < 24; k++) {
      for (const c of this.constraints) c.project();
      if (this.latched) { w.q = this.stop; if (w.v > 0) w.impulse(-w.v * w.I); }
    }
    this.maxConstraintError = Math.max(...this.constraints.map(c => Math.abs(c.error)));
    if (this.flow) {
      this.streamAccumulator += dt * 34;
      while (this.streamAccumulator >= 1) {
        this.streamAccumulator--;
        this.emitParticle(1.26 + (this.random() - .5) * .07, 3.91, .78 + (this.random() - .5) * .07, 0, -.3, 0, 1.2);
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]; p.life -= dt; p.vy -= 9.81 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      if (p.life <= 0 || p.y < .3 || (p.y < 2.96 && p.y > 2.7 && p.x > 1.1 && p.x < 1.4 && dist < .16 && p.vy < -1)) this.particles.splice(i, 1);
    }
  }
  takeEvents() { return this.events.splice(0); }
  // Exact kinematic reconstruction of a constrained endless chain on two pulleys.
  // s is integrated as a physical DOF and coupled by no-slip impulse constraints.
  chainPose(index, count = 56) {
    const radius = .37, lower = 3.12, upper = 6.05, straight = upper - lower;
    const length = straight * 2 + TAU * radius;
    let s = ((index / count * length - this.chain.q) % length + length) % length;
    if (s < straight) return { x: -1.77 + radius, y: lower + s, z: -.26, angle: 0 };
    s -= straight;
    if (s < Math.PI * radius) { const a = s / radius; return { x: -1.77 + radius * Math.cos(a), y: upper + radius * Math.sin(a), z: -.26, angle: a }; }
    s -= Math.PI * radius;
    if (s < straight) return { x: -1.77 - radius, y: upper - s, z: -.26, angle: Math.PI };
    s -= straight;
    const a = Math.PI + s / radius;
    return { x: -1.77 + radius * Math.cos(a), y: lower + radius * Math.sin(a), z: -.26, angle: a };
  }
  state() { return { time: this.time, water: this.flow, steps: this.stepCount, strikes: this.strikes, latched: this.latched, bucketMass: this.receivingMass, constraintError: this.maxConstraintError, rotors: this.rotors.map(r => ({ name: r.name, q: r.q, v: r.v })) }; }
}
