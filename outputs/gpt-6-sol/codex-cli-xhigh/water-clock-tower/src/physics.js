// Fixed-step rotational mechanics. Every changing mechanical transform in the film
// comes from these angular/linear bodies and their impulses, never a timeline pose.
const TAU = Math.PI * 2;
export const STEP = 1 / 120;

class Rotor {
  constructor(inertia, angle = 0, damping = 0.06) {
    this.I = inertia; this.a = angle; this.v = 0; this.damping = damping; this.torque = 0;
  }
  addTorque(t) { this.torque += t; }
  integrate(dt) {
    this.v += (this.torque / this.I - this.damping * this.v) * dt;
    this.a += this.v * dt;
    this.torque = 0;
  }
}

class Slider {
  constructor(mass, position = 0) { this.m = mass; this.x = position; this.v = 0; this.force = 0; }
  addForce(f) { this.force += f; }
  integrate(dt) { this.v += this.force / this.m * dt; this.x += this.v * dt; this.force = 0; }
}

export class ClockPhysics {
  constructor() { this.reset(); }
  reset() {
    this.time = 0;
    this.wheel = new Rotor(3.4, 0, 0.16);
    this.pinion = new Rotor(0.7, 0, 0.09);
    this.shaft = new Rotor(1.0, 0, 0.08);
    this.globe = new Rotor(1.6, 0, 0.08);
    this.armillary = new Rotor(1.9, 0, 0.08);
    this.cam = new Rotor(0.5, 0, 0.12);
    this.lever = new Rotor(0.11, -0.16, 3.0);
    this.hammer = new Rotor(0.08, -0.43, 1.1);
    this.figure = new Slider(0.75, 0);
    this.bucket = Array.from({length: 12}, (_, i) => i === 4 ? 0.9 : (i === 5 ? 0.35 : 0));
    this.cupMass = 0;
    this.cupDraining = false;
    this.latchOpen = false;
    this.stopIndex = 0;
    this.justStepped = false;
    this.justStruck = false;
    this.steps = 0;
    this.strikes = 0;
  }
  // An impulse enforces rolling contact at the pitch circles of a pair of gears.
  gear(a, b, ra, rb, phase = 0) {
    const error = a.a * ra + b.a * rb - phase;
    const speed = a.v * ra + b.v * rb;
    const inv = ra * ra / a.I + rb * rb / b.I;
    const impulse = -(speed + Math.max(-5, Math.min(5, error * 15))) / inv;
    a.v += impulse * ra / a.I;
    b.v += impulse * rb / b.I;
  }
  // Coaxial axles and bevel gearing use the same no-slip angular constraint.
  couple(a, b, ratio, sign = 1) {
    const error = b.a - sign * ratio * a.a;
    const speed = b.v - sign * ratio * a.v;
    const inv = 1 / b.I + ratio * ratio / a.I;
    const impulse = -(speed + Math.max(-5, Math.min(5, error * 18))) / inv;
    b.v += impulse / b.I;
    a.v -= impulse * sign * ratio / a.I;
  }
  step(dt = STEP) {
    this.time += dt;
    this.justStepped = false;
    this.justStruck = false;
    const w = this.wheel;
    // Gravity acting on the water in the individual wooden scoops supplies torque.
    // The top-left scoop catches the stream; low scoops empty into the drain.
    let gravityTorque = 0;
    for (let i = 0; i < 12; i++) {
      const a = w.a + i * TAU / 12;
      const normalized = Math.atan2(Math.sin(a), Math.cos(a));
      if (Math.abs(normalized - 2.26) < 0.28) this.bucket[i] = Math.min(1.15, this.bucket[i] + 1.65 * dt);
      if (normalized < -1.12 && normalized > -2.48) this.bucket[i] = Math.max(0, this.bucket[i] - 4.0 * dt);
      gravityTorque += -this.bucket[i] * 9.81 * 1.63 * Math.cos(a);
    }
    w.addTorque(gravityTorque - 0.22 * w.v);
    this.pinion.addTorque(-0.18 * this.pinion.v);
    this.shaft.addTorque(-0.14 * this.shaft.v);
    this.globe.addTorque(-0.08 * this.globe.v);
    this.armillary.addTorque(-0.08 * this.armillary.v);
    this.cam.addTorque(-0.1 * this.cam.v);

    // Water accumulating in the balance cup tips its lever. This withdraws
    // the retaining tooth for one pitch; a second tooth catches the wheel.
    if (!this.cupDraining) this.cupMass = Math.min(1.4, this.cupMass + 0.91 * dt);
    else this.cupMass = Math.max(0, this.cupMass - 5.0 * dt);
    this.lever.addTorque(this.cupMass * 1.12 - 0.53 - (this.lever.a + 0.16) * 2.5);
    this.lever.integrate(dt);
    if (!this.latchOpen && this.lever.a > 0.16 && gravityTorque > 2.5) {
      this.latchOpen = true;
      this.cupDraining = true;
    }
    if (this.cupDraining && this.cupMass < 0.03 && this.lever.a < -0.08) this.cupDraining = false;

    const oldWheel = w.a;
    for (const rotor of [w, this.pinion, this.shaft, this.globe, this.armillary, this.cam]) rotor.integrate(dt);
    for (let iteration = 0; iteration < 8; iteration++) {
      this.gear(w, this.pinion, 1.75, 0.72);
      this.couple(this.pinion, this.shaft, 0.41, -1);
      this.couple(this.shaft, this.globe, 0.57, 1);
      this.couple(this.shaft, this.armillary, 0.35, 1);
      this.couple(this.shaft, this.cam, 1.0, 1);
    }
    const nextStop = (this.stopIndex + 1) * TAU / 12;
    if (!this.latchOpen) {
      // Rigid unilateral stop contact: cancel angular velocity and penetration.
      w.a = this.stopIndex * TAU / 12;
      w.v = 0;
    } else if (w.a >= nextStop) {
      w.a = nextStop;
      w.v = 0;
      this.stopIndex++;
      this.steps++;
      this.justStepped = true;
      this.latchOpen = false;
    }
    // Remove tiny backwards numerical motion at the ratchet.
    if (w.a < oldWheel && w.a < this.stopIndex * TAU / 12) w.a = this.stopIndex * TAU / 12;

    // The rotating cam pushes a spring-loaded sliding figure out of its bay.
    const camPhase = ((this.cam.a % TAU) + TAU) % TAU;
    const lift = Math.max(0, Math.cos(camPhase - 1.55) - 0.57) * 1.38;
    const follower = this.figure;
    follower.addForce(-3.9 * follower.x - 2.5 * follower.v);
    if (follower.x < lift) follower.addForce((lift - follower.x) * 92 - follower.v * 2.2);
    follower.integrate(dt);
    if (follower.x < 0) { follower.x = 0; follower.v = Math.max(0, follower.v); }
    if (follower.x > 0.72) { follower.x = 0.72; follower.v = Math.min(0, follower.v); }

    // The figure's sliding pin lifts a pivoted hammer. Its spring then lets
    // the hammer fall against the fixed bronze bell.
    const h = this.hammer;
    h.addTorque(-7.8 * (h.a + 0.43) - 0.8 * h.v);
    if (follower.x > 0.23 && follower.v > 0.035 && h.a < 0.32) h.addTorque(7.5 * follower.v);
    h.integrate(dt);
    if (h.a > 0.43) {
      h.a = 0.43;
      if (h.v > 0.45) { this.justStruck = true; this.strikes++; }
      h.v = -h.v * 0.12;
    }
    if (h.a < -0.52) { h.a = -0.52; h.v = Math.max(0, h.v); }
  }
  advanceTo(t) {
    if (t < this.time) this.reset();
    while (this.time + STEP <= t) this.step(STEP);
  }
}
