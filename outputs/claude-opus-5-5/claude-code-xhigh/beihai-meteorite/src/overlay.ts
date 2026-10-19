import type { FrameFX } from "./world";

/**
 * DOM layers drawn over the letterboxed frame: fade, flash, the telescopic
 * sight, the helmet HUD and title cards. Subtitles are not here; the player's
 * controls render them from the voice manifest.
 */
export class Overlay {
  readonly root: HTMLDivElement;
  private fade: HTMLDivElement;
  private flash: HTMLDivElement;
  private scope: HTMLDivElement;
  private scopeLabel: HTMLDivElement;
  private hud: HTMLDivElement;
  private hudLines: HTMLDivElement;
  private hudWarn: HTMLDivElement;
  private card: HTMLDivElement;
  private cardMain: HTMLDivElement;
  private cardSub: HTMLDivElement;
  private last = "";

  constructor(frame: HTMLElement) {
    this.root = document.createElement("div");
    this.root.className = "ov";
    this.root.innerHTML = `
      <div class="ov-scope">
        <svg class="ov-reticle" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
          <circle r="458" fill="none" stroke="rgba(120,160,190,0.35)" stroke-width="3"/>
          <circle r="452" fill="none" stroke="rgba(255,140,90,0.18)" stroke-width="2"/>
          <line x1="-458" y1="0" x2="-60" y2="0" stroke="#0b0d0f" stroke-width="7"/>
          <line x1="60" y1="0" x2="458" y2="0" stroke="#0b0d0f" stroke-width="7"/>
          <line x1="0" y1="60" x2="0" y2="458" stroke="#0b0d0f" stroke-width="9"/>
          <line x1="0" y1="-458" x2="0" y2="-60" stroke="#0b0d0f" stroke-width="7"/>
          <line x1="-60" y1="0" x2="60" y2="0" stroke="#0b0d0f" stroke-width="1.6"/>
          <line x1="0" y1="-60" x2="0" y2="60" stroke="#0b0d0f" stroke-width="1.6"/>
          ${[-4, -3, -2, -1, 1, 2, 3, 4].map((k) => `<circle cx="${k * 15}" cy="0" r="2.2" fill="#0b0d0f"/><circle cx="0" cy="${k * 15}" r="2.2" fill="#0b0d0f"/>`).join("")}
        </svg>
        <div class="ov-scope-label"></div>
      </div>
      <div class="ov-hud"><div class="ov-hud-lines"></div><div class="ov-hud-warn"></div></div>
      <div class="ov-card"><div class="ov-card-main"></div><div class="ov-card-sub"></div></div>
      <div class="ov-flash"></div>
      <div class="ov-fade"></div>`;
    frame.appendChild(this.root);
    const q = <T extends HTMLElement>(s: string) => this.root.querySelector(s) as T;
    this.fade = q(".ov-fade");
    this.flash = q(".ov-flash");
    this.scope = q(".ov-scope");
    this.scopeLabel = q(".ov-scope-label");
    this.hud = q(".ov-hud");
    this.hudLines = q(".ov-hud-lines");
    this.hudWarn = q(".ov-hud-warn");
    this.card = q(".ov-card");
    this.cardMain = q(".ov-card-main");
    this.cardSub = q(".ov-card-sub");
  }

  apply(fx: FrameFX, time: number): void {
    this.fade.style.opacity = String(fx.fade);
    this.flash.style.opacity = String(fx.flash);
    this.scope.style.opacity = String(fx.scope);
    this.scope.style.display = fx.scope > 0 ? "block" : "none";
    this.scopeLabel.textContent = fx.scopeLabel;
    this.hud.style.opacity = String(fx.hud);
    this.hud.style.display = fx.hud > 0 ? "block" : "none";
    const lines = fx.hudLines.join("\n");
    if (this.hudLines.textContent !== lines) this.hudLines.textContent = lines;
    this.hudWarn.textContent = fx.hudWarn;
    this.hudWarn.style.opacity = fx.hudWarn ? (Math.floor(time * 3) % 2 === 0 ? "1" : "0.35") : "0";
    const c = fx.card;
    const key = c ? `${c.style}|${c.text}|${c.sub ?? ""}` : "";
    if (key !== this.last) {
      this.last = key;
      this.card.className = `ov-card ${c ? `ov-card-${c.style}` : ""}`;
      this.cardMain.textContent = c?.text ?? "";
      this.cardSub.textContent = c?.sub ?? "";
    }
    this.card.style.opacity = String(c?.opacity ?? 0);
  }
}

export const OVERLAY_CSS = `
.ov{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:5}
.ov-fade{position:absolute;inset:0;background:#000;opacity:0}
.ov-flash{position:absolute;inset:0;background:#fff3dc;mix-blend-mode:screen;opacity:0}
.ov-scope{position:absolute;inset:0;display:none;background:radial-gradient(circle closest-side at 50% 50%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 84%,rgba(0,0,0,.55) 90%,#000 92.6%)}
.ov-reticle{position:absolute;left:50%;top:50%;height:100%;width:100%;transform:translate(-50%,-50%)}
.ov-scope-label{position:absolute;left:50%;top:50%;transform:translate(11vh,13vh);font:500 clamp(10px,1.3vh,15px)/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;color:rgba(10,12,14,.85)}
.ov-hud{position:absolute;inset:0;display:none;font:500 clamp(10px,1.6vh,16px)/1.55 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:rgba(120,230,255,.72);text-shadow:0 0 6px rgba(80,200,255,.6)}
.ov-hud-lines{position:absolute;left:7%;top:12%;white-space:pre}
.ov-hud-warn{position:absolute;right:7%;top:12%;color:rgba(255,170,60,.95);text-shadow:0 0 8px rgba(255,140,40,.8)}
.ov-card{position:absolute;inset:0;opacity:0;color:#e9e4da;font-family:"Noto Serif SC","Source Han Serif SC","Songti SC","STSong","SimSun",serif}
.ov-card-title{display:flex;flex-direction:column;align-items:center;justify-content:center}
.ov-card-title .ov-card-main{font-size:clamp(28px,7vh,84px);letter-spacing:.6em;padding-left:.6em;font-weight:400}
.ov-card-place .ov-card-main{position:absolute;left:6%;bottom:16%;font-size:clamp(14px,2.6vh,30px);letter-spacing:.4em}
.ov-card-place .ov-card-sub{position:absolute;left:6%;bottom:11%;font-size:clamp(11px,1.7vh,20px);letter-spacing:.3em;color:#b8b2a6}
.ov-card-credit{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.4vh}
.ov-card-credit .ov-card-main{font-size:clamp(22px,5vh,60px);letter-spacing:.55em;padding-left:.55em}
.ov-card-credit .ov-card-sub{font-size:clamp(11px,1.8vh,20px);letter-spacing:.25em;color:#a9a397}
`;
