import type { FilmContext } from "./world/context";

/**
 * Picture-area typography that is not speech: place captions, the title card,
 * the helmet HUD, the scope's range readout and the end card. (All speech is
 * rendered by the player's subtitle line from the voice manifest.)
 */
export interface Overlay {
  update(ctx: FilmContext): void;
}

export function createOverlay(stage: HTMLElement): Overlay {
  const root = document.createElement("div");
  root.className = "ov";
  root.innerHTML = `
    <div class="ov-caption"></div>
    <div class="ov-title"><div class="ov-title-main"></div><div class="ov-title-sub"></div></div>
    <div class="ov-hud"><div class="ov-hud-lines"></div><div class="ov-hud-alert"></div></div>
    <div class="ov-scope"></div>
    <div class="ov-end">
      <div class="ov-end-title">尘世之外</div>
      <div class="ov-end-line">根据刘慈欣《三体Ⅱ·黑暗森林》片段改编</div>
      <div class="ov-end-line dim">人物、场景、光影与声音全部由代码实时生成</div>
    </div>`;
  stage.appendChild(root);
  const caption = root.querySelector<HTMLElement>(".ov-caption")!;
  const title = root.querySelector<HTMLElement>(".ov-title")!;
  const titleMain = root.querySelector<HTMLElement>(".ov-title-main")!;
  const titleSub = root.querySelector<HTMLElement>(".ov-title-sub")!;
  const hud = root.querySelector<HTMLElement>(".ov-hud")!;
  const hudLines = root.querySelector<HTMLElement>(".ov-hud-lines")!;
  const hudAlert = root.querySelector<HTMLElement>(".ov-hud-alert")!;
  const scope = root.querySelector<HTMLElement>(".ov-scope")!;
  const end = root.querySelector<HTMLElement>(".ov-end")!;
  let last = "";

  return {
    update(ctx) {
      const o = ctx.overlay;
      const key = [o.caption, o.captionOpacity.toFixed(2), o.title, o.titleOpacity.toFixed(2), o.hud.visible, o.hud.lines.join("|"), o.hud.alert, o.hud.alertOn, o.scopeText, o.endCard.toFixed(2), ctx.grade.scope].join("#");
      if (key === last) return;
      last = key;
      if (caption.textContent !== o.caption) caption.textContent = o.caption;
      caption.style.opacity = String(o.captionOpacity);
      if (titleMain.textContent !== o.title) titleMain.textContent = o.title;
      if (titleSub.textContent !== o.titleSub) titleSub.textContent = o.titleSub;
      title.style.opacity = String(o.titleOpacity);
      hud.style.opacity = String(o.hud.visible);
      const lines = o.hud.lines.join("\n");
      if (hudLines.textContent !== lines) hudLines.textContent = lines;
      if (hudAlert.textContent !== o.hud.alert) hudAlert.textContent = o.hud.alert;
      hudAlert.style.opacity = o.hud.alert ? (o.hud.alertOn ? "1" : "0.35") : "0";
      scope.textContent = o.scopeText;
      scope.style.opacity = ctx.grade.scope > 0.5 && o.scopeText ? "0.85" : "0";
      end.style.opacity = String(o.endCard);
    },
  };
}
