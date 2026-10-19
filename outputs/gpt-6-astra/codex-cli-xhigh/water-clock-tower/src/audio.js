/** All sound is synthesized at runtime. No downloaded or embedded recordings. */
export class Soundscape {
  constructor(){this.enabled=false;this.ctx=null;this.lastNote=-1;}
  async enable(){
    if(!this.ctx)this.init();
    await this.ctx.resume();this.enabled=true;this.setRunning(true);
  }
  init(){
    const c=this.ctx=new (window.AudioContext||window.webkitAudioContext)();
    this.master=c.createGain();this.master.gain.value=0;
    const limiter=c.createDynamicsCompressor();limiter.threshold.value=-18;limiter.knee.value=12;limiter.ratio.value=8;limiter.attack.value=.006;limiter.release.value=.25;
    this.master.connect(limiter);limiter.connect(c.destination);
    this.delay=c.createDelay(1);this.delay.delayTime.value=.31;const feedback=c.createGain();feedback.gain.value=.16;const wet=c.createGain();wet.gain.value=.15;this.delay.connect(feedback);feedback.connect(this.delay);this.delay.connect(wet);wet.connect(this.master);
    const data=c.createBuffer(1,c.sampleRate*3,c.sampleRate);const channel=data.getChannelData(0);let last=0;
    for(let i=0;i<channel.length;i++){last=(last+.03*(Math.random()*2-1))/1.03;channel[i]=last*3.5;}
    const source=c.createBufferSource();source.buffer=data;source.loop=true;const filter=c.createBiquadFilter();filter.type='bandpass';filter.frequency.value=2200;filter.Q.value=.6;this.water=c.createGain();this.water.gain.value=.08;source.connect(filter);filter.connect(this.water);this.water.connect(this.master);source.start();
    // Quiet, beating open fifth. Slow gain envelope prevents clicks.
    for(const frequency of [130.81,196.0,261.9]){const o=c.createOscillator();o.type='sine';o.frequency.value=frequency;const g=c.createGain();g.gain.value=.016;o.connect(g);g.connect(this.master);o.start();}
  }
  setRunning(running){if(this.ctx)this.master.gain.setTargetAtTime(this.enabled&&running?.34:0,this.ctx.currentTime,.10);}
  mute(){this.enabled=false;this.setRunning(false);}
  tone(freq,amplitude,duration,type='sine',delay=0){
    if(!this.enabled||!this.ctx)return;const c=this.ctx,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(amplitude,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(this.master);g.connect(this.delay);o.start(t);o.stop(t+duration+.05);
  }
  event(e){
    if(e.type==='bell'){
      const a=.17+e.energy*.10;[1,2.01,2.74,4.08,5.43].forEach((r,i)=>this.tone(523.25*r,a/(i+1)**1.7,2.6/(1+i*.24)));
    }else if(e.type==='catch'){this.tone(480,.055,.08,'triangle');this.tone(190,.035,.06);}
    else if(e.type==='release')this.tone(710,.025,.045,'triangle');
  }
  update(time,flow){
    if(!this.enabled||!this.ctx)return;
    this.water.gain.setTargetAtTime(flow?.08:0,this.ctx.currentTime,.25);
    const n=Math.floor(time/2.6);if(n!==this.lastNote){this.lastNote=n;const notes=[261.63,392,349.23,293.66,440,392,293.66,261.63,349.23,392,523.25,392];const f=notes[n%notes.length];this.tone(f,.060,2.2);this.tone(f*2,.015,1.2);}
  }
}
