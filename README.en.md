<div align="center">

<p align="center">
  <a href="https://bench.nagi.fun/"><img src="https://bench.nagi.fun/og-1200.png" alt="NAGI BENCH: same prompt, different models, one shot, no retries" width="720"></a>
</p>

# NAGI BENCH

**Same prompt, different models, one shot, no retries.**<br>
One-shot LLM eval cases by NAGI STUDIO: model x harness x effort combinations take the same task, ship runnable artifacts side by side, and face anonymous blind votes.

[中文](./README.md) | English

<p align="center">
  <a href="https://bench.nagi.fun/"><img src="https://img.shields.io/badge/Live_site-bench.nagi.fun-c8f04a?style=for-the-badge&labelColor=111111" alt="Live site: bench.nagi.fun"></a>
  <a href="https://bench.nagi.fun/#board"><img src="https://img.shields.io/badge/Leaderboard-Arena-c8f04a?style=for-the-badge&labelColor=111111" alt="Community leaderboard"></a>
  <a href="#contributing-a-run"><img src="https://img.shields.io/badge/Contribute-PRs_welcome-c8f04a?style=for-the-badge&labelColor=111111" alt="Contribute a run"></a>
</p>

<p align="center">
  <a href="https://x.com/Nag1ovo" target="_blank"><img src="https://img.shields.io/badge/@Nag1ovo-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
  <a href="https://discord.gg/TEUFxdMbGb" target="_blank"><img src="https://img.shields.io/badge/Discord-Join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://www.xiaohongshu.com/user/profile/5d366136000000001101950a" target="_blank"><img src="https://img.shields.io/badge/小红书-@Nagi--ovo-FF2442?style=flat-square" alt="Xiaohongshu"></a>
  <a href="https://space.bilibili.com/312249633" target="_blank"><img src="https://img.shields.io/badge/Bilibili-@卡普迪姆-FB7299?style=flat-square&logo=bilibili&logoColor=white" alt="Bilibili"></a>
</p>

[Cases](#cases) · [How it works](#how-it-works-arena-blind-battles--leaderboard) · [Core idea](#core-idea-model--harness--agent) · [Registry](#registry) · [Contributing](#contributing-a-run) · [License](#license)

</div>

## Cases

Each case is one fixed prompt that every agent uses verbatim, in one shot. Click a case name to open its blind-vote page.

| Case | Output | What it tests |
|---|---|---|
| [**Mythos Craft**](https://bench.nagi.fun/#mythos-craft)<br><sub>`mythos-craft`</sub> | Single-file HTML | A playable Minecraft-style 3D voxel world |
| [**Pelican by the Sea**](https://bench.nagi.fun/#pelican-cycling)<br><sub>`pelican-cycling`</sub> | SVG | The classic eval: draw a pelican riding a bicycle, in code |
| [**Skeleton Watch**](https://bench.nagi.fun/#skeleton-watch)<br><sub>`skeleton-watch`</sub> | Single-file HTML | A rotatable, exploded-view 3D skeleton watch |
| [**Turf War**](https://bench.nagi.fun/#turf-war)<br><sub>`turf-war`</sub> | JS agent | Territory-grabbing agents battle head-to-head, ranked by wins, not votes |
| [**CS Dust2 5v5**](https://bench.nagi.fun/#cs-dust2)<br><sub>`cs-dust2`</sub> | React project | A from-scratch 3D FPS in React + three.js |
| [**Zhang Beihai: Meteorite Bullet**](https://bench.nagi.fun/#beihai-meteorite)<br><sub>`beihai-meteorite`</sub> | Three.js project | A long-horizon 3D film adapted from The Three-Body Problem |

> Full prompts live in [`cases.json`](./cases.json).

## How it works: Arena blind battles & leaderboard

- **Arena (default)**: each case pits two anonymous artifacts against each other — vote A / B / Neither, and identities reveal only after you vote.
- **Demo Show**: switch top-right to browse everything, grouped by model; a model with several harnesses can be viewed singly or side by side.
- **Community leaderboard**: unlocks after 3 votes, ranked by Bradley-Terry scores (the LMSYS Chatbot Arena approach); "Neither" counts separately as both-bad. Votes feed a sitewide crowdsourced pool, guarded by Turnstile.

## Core idea: Model + Harness = Agent

> A model is just weights; wrap it in a runtime and it becomes an agent that can actually do the work. **That agent is the unit this bench evaluates.**

- **Model**: the weights and inference engine itself — GPT-5.5, Gemini 3.1 Pro, Claude Fable 5. **Reasoning effort counts as part of the model**: the same weights at high vs low effort feel like two different models, so judging a model while ignoring its effort isn't fair play. This bench defaults to max and labels the effort of every combination.
- **Harness**: the product/scaffolding wrapping the model — Codex CLI, Cursor, AntiGravity, the Claude web app. It controls tool calls, system prompts, context management and continuation strategy, and often shapes the outcome as much as the model does.
- **So a different harness means a different agent** and a separate entry (GPT-5.5 Pro and GPT-5.5 running in Codex CLI at xhigh are two agents from the same model family).
- **Only the out-of-the-box harness is evaluated**: do not load skills / plugins / MCP servers / custom system prompts — they shift the output as much as swapping the harness does and break comparability between agents. If maintainers agree an enhanced output is still worth preserving, the run may set `"evaluation": "showcase"` and remain viewable only; it is excluded from Arena, voting, rankings, and qualification counts.

## Registry

More than a hundred model x harness x effort combinations have run these cases, from Anthropic, OpenAI, Google, DeepSeek, xAI, Moonshot, Zhipu, Alibaba and more. Browse the artifacts at [bench.nagi.fun](https://bench.nagi.fun/); the full list is below.

<details>
<summary><b>Show the full Registry table</b> (sorted by vendor and version, generated by CI)</summary>

<!-- registry:start -->
> This table is generated from `models/*.json` by `bun scripts/update-registry.ts`; CI re-syncs it automatically after merge — contributors need not hand-edit it.

| Model | Vendor | Harness x Effort | Runs |
|---|---|---|---|
| Claude Opus 5.5 | Anthropic | Claude Code · Max<br>Claude Code · High | 10 |
| Claude Sonnet 5.5 | Anthropic | Claude Code · High<br>Claude Code · Max<br>Claude Code · xhigh | 17 |
| Claude Haiku 5.5 | Anthropic | Claude Code · High | 06 |
| Claude Fable 5.1 | Anthropic | Claude Code · High | 06 |
| Claude Opus 5 | Anthropic | Claude Code · Max<br>Claude Code · xhigh<br>Claude Code · High | 16 |
| Claude Fable 5 | Anthropic | Claude Web App · Max<br>Claude Code · High<br>Claude Code · Max<br>Claude Code · xhigh<br>Cursor · High | 11 |
| Claude Sonnet 5 | Anthropic | Claude Code · Max | 01 |
| Claude Opus 4.8 | Anthropic | Claude Code · Max<br>Claude Code · xhigh | 08 |
| Claude Opus 4.7 | Anthropic | Claude Code · Max<br>Cursor · Max | 05 |
| Claude Opus 4.6 | Anthropic | Claude Code · Max<br>Cursor · Max | 04 |
| Claude Sonnet 4.6 | Anthropic | Claude Code · Max<br>Cursor · High | 03 |
| Claude Opus 4.5 | Anthropic | Cursor · Thinking | 02 |
| Claude Haiku 4.5 | Anthropic | Claude Code · Default | 02 |
| GPT-6.1 Sol | OpenAI | Codex CLI · High | 06 |
| GPT-6 Astra | OpenAI | Codex CLI · xhigh | 06 |
| GPT-6 Sol | OpenAI | Codex CLI · xhigh | 06 |
| GPT-5.6-Sol | OpenAI | Codex CLI · ultra<br>Codex CLI · max<br>Codex CLI · xhigh | 11 |
| GPT-5.6-Terra | OpenAI | Codex CLI · ultra<br>Codex CLI · xhigh | 05 |
| GPT-5.5 Pro | OpenAI | ChatGPT Web · Extended Pro | 03 |
| GPT-5.5 | OpenAI | Codex CLI · xhigh | 03 |
| GPT-5.4 | OpenAI | Cursor · xhigh<br>Codex CLI · xhigh | 06 |
| GPT-5.3 Codex | OpenAI | Cursor · xhigh | 02 |
| GPT-5.2 | OpenAI | Cursor · xhigh | 02 |
| Gemini 3.8 Flash | Google | AntiGravity · High | 06 |
| Gemini 3.7 Flash | Google | AntiGravity · Low<br>AntiGravity · Medium<br>AntiGravity · High | 08 |
| Gemini 3.6 Flash | Google | AntiGravity · High | 05 |
| Gemini 3.5 Flash | Google | AntiGravity · High<br>Cursor · Default<br>Google AI Studio · High | 06 |
| Gemini 3.1 Pro | Google | AntiGravity · High<br>Cursor · Default<br>Gemini Web · Deep Think<br>Google AI Studio · High | 11 |
| DeepSeek V4.1 Flash 1017 | DeepSeek | DeepSeek Harness · High<br>DeepSeek Harness · Low<br>DeepSeek Harness · Max | 18 |
| DeepSeek V4.1 Flash | DeepSeek | DeepSeek Harness · High<br>WorkBuddy · High | 08 |
| DeepSeek V4 Pro 0831 | DeepSeek | DeepSeek Harness · Minimal | 01 |
| DeepSeek V4 Pro 0813 | DeepSeek | DeepSeek Harness · High<br>DeepSeek Harness · Minimal · High<br>DeepSeek Harness · Max<br>Codex CLI · xhigh | 21 (showcase 01) |
| DeepSeek-V4-Pro | DeepSeek | Claude Code · Max<br>Qoder · Max<br>Open Code · High | 05 |
| DeepSeek V4 Flash 0731 | DeepSeek | Claude Code · Max<br>OMP · Default | 05 (showcase 01) |
| DeepSeek V4 Flash | DeepSeek | Claude Code · Max<br>Reasonix · Max | 02 |
| Grok 4.7 | xAI | Grok Build TUI · High | 06 |
| Grok 4.6 | xAI | Grok Build TUI · High | 06 |
| Grok 4.5 | xAI | Grok Build TUI · High | 03 |
| Grok Build | xAI | Grok Build TUI · Max | 02 |
| Grok 4.3 | xAI | Cursor · Default | 02 |
| Hy4 Preview | Tencent | WorkBuddy · High<br>WorkBuddy · Default | 09 (showcase 06) |
| Nex-N2-Pro | Nex-AGI | Claude Code · Max | 02 |
| Composer 2.5 | Cursor | Cursor · Max<br>Cursor · Default<br>Grok Build TUI · Default | 05 |
| Mistral Medium 3.5 | Mistral AI | Vibe · Thinking | 02 |
| ERNIE 4.5 | Baidu | Wenxin Work Task Mode · Professional Skill | 05 |
| Doubao 2.1 Pro | ByteDance | Doubao Work · High | 05 |
| Doubao Seed 2.0 Pro | ByteDance | Doubao Web · Pro Mode | 01 |
| Doubao Seed 2.0 Mini | ByteDance | Doubao Web · Fast Mode | 01 |
| MiMo V2.5 | Xiaomi | MiMo Code · High | 03 |
| MiMo v2.5 Pro | Xiaomi | Claude Code · Max<br>MiMo Code · Max | 03 |
| MiMo v2.5 Pro UltraSpeed | Xiaomi | Web · Default | 05 |
| Kimi K3 | Moonshot AI | Claude Code · Max<br>Kimi Code · Max<br>Kimi Web · Max | 12 |
| Kimi K2.7-Code | Moonshot AI | Kimi Code · Thinking<br>Qoder · Default | 04 |
| Kimi K2.6 | Moonshot AI | Kimi Code · Thinking | 02 |
| MiniMax M3 | MiniMax | MiniMax Code Web · Thinking<br>Qoder · Default | 03 |
| MiniMax M2.7 | MiniMax | MiniMax Code Web · Thinking | 01 |
| GLM-5.3 Flash | Zhipu AI | WorkBuddy · High | 05 |
| GLM-5.2 | Zhipu AI | ZCode · Max<br>Qoder · Max | 05 |
| GLM-5.1 | Zhipu AI | ZCode · Max | 01 |
| GLM-5 Turbo | Zhipu AI | ZCode · Thinking | 03 |
| Qwen3.8-Max-Preview | Alibaba | Qoder · Default<br>Qwen Studio Web · Thinking | 06 |
| Qwen3.7-Max | Alibaba | Qoder · Default | 03 |
| Qwen 3.6 27B | Alibaba | OMP · Default | 01 (showcase 01) |
| Qoder Ultimate | Alibaba | Qoder · Default<br>Qoder · Max | 05 |
| Qwen 3.8 27B | Alibaba | OMP · Default | 01 (showcase 01) |
| Step 3.7 Flash | StepFun | Claude Code · High | 02 |
| Spark X2.5 | iFlytek | Spark Web Harness · Reasoning | 01 |
| Spark X2 | iFlytek | Web · Reasoning | 01 |
| Inkling | Thinking Machines Lab | Tinker Web · xHigh | 02 |
| Inkling-Small | Thinking Machines Lab | Tinker Web · xHigh | 03 |
<!-- registry:end -->

</details>

## Contributing a run

Contributions are **data-only — no code changes**: you add two files. Full rules live in [**AGENTS.md**](./AGENTS.md) (the contributor / AI-agent guide).

**Four steps:**

1. **Generate**: run the prompt from [`cases.json`](./cases.json) **verbatim** in your harness, once (every skill / plugin disabled, no MCP, no custom system prompt).
2. **Add the artifact**: preferably at `outputs/<base-model>/<harness-effort>/<case-id>.<ext>` (e.g. `outputs/gpt-5-5-pro/chatgpt-web-extended-pro/pelican-cycling.svg`).
3. **Register it**: `models/<agent-id>.json` (new file for a new combination; add to `runs` for an existing one) with `artifactDir` pointing at the artifact folder (example below).
4. **Check and open a PR**: run `bun scripts/validate-data.ts` until it passes, then open a PR with the template's proof screenshot — your harness showing the model name and effort while generating (paste it into the PR; do not commit image files).

```json
{
  "label": "GPT-5.5 Pro",
  "vendor": "OpenAI",
  "harness": "ChatGPT Web",
  "effort": "Extended Pro",
  "artifactDir": "gpt-5-5-pro/chatgpt-web-extended-pro",
  "order": 20,
  "runs": {
    "pelican-cycling": {
      "note": {
        "zh": "在哪个 Harness 里、什么思考档位、是否一次生成、是否有修复",
        "en": "Which harness, what effort level, one-shot or fixed"
      },
      "contributor": "your-github-username"
    }
  }
}
```

**Rules** (enforced by CI — the build fails otherwise):

- `agent-id`s use dash-only lowercase letters / digits (e.g. `doubao-seed-2-0-pro`) and are stable identities; without `artifactDir`, artifacts default to `outputs/<agent-id>/`;
- `artifactDir` uses one or two lowercase dash-case path segments (preferably `<base-model>/<harness-effort>`); it is only the file location and does not affect vote or leaderboard identity;
- a bilingual provenance `note` is **required** per run — it is where this repo's credibility comes from (which harness, what effort, one-shot or fixed);
- every declared run must have its artifact;
- multiple versions of the same combination x case go in an array under `runs.<case-id>`, and every version after the first needs a distinct `file` name (e.g. `pelican-cycling-2.svg`);
- set `contributor` to your GitHub username — the site shows your avatar linked to your profile next to the run;
- skill/plugin/non-standard outputs require maintainer approval plus `"evaluation": "showcase"`, must disclose the setup in both notes, and stay permanently excluded from blind voting and rankings;
- fill in `harness` and `effort` truthfully for new combinations: the case page renders Harness / Effort metadata chips from these fields and auto-matches brand icons for the model, vendor and harness (via [lobe-icons](https://github.com/lobehub/lobe-icons)) — contributors never touch icons.

PRs get data validation from CI; merges to `main` rebuild the site automatically (usually instant, at most 6 hours).

<details>
<summary><b>If you are an AI agent (Claude Code / Codex / Cursor, etc.), expand this</b></summary>

- **The unit you contribute is one Agent = a model × the harness you run in.** The `<agent-id>` (lowercase letters / digits / dashes) encodes that pairing — e.g. `gpt-5-5-pro`, `claude-fable-5-cc` (cc = Claude Code). The same model in a different harness is a different Agent with a different id. The `<agent-id>` is the vote and leaderboard identity; do not rename it just to reorganize files.
- **There are six cases right now**, defined in [`cases.json`](./cases.json) and listed under "Cases" above. The prompt lives in `cases.json` — **use it verbatim, do not paraphrase**. Note: `turf-war` does **not** accept artifact PRs — to keep earlier policies unscoutable, every run is executed and submitted personally by the maintainer Nagi ([@Nagi-ovo](https://github.com/Nagi-ovo)); open an issue to request a model.
- **To find what's missing**: read `cases.json` (all cases) and `models/*.json` (what each Agent has run) — a `<case-id>` absent from an Agent's json is an open slot; any row in the script-generated Registry table above whose "Runs" count is below the number of cases is an Agent missing a case; a brand-new Agent can fill every open case.
- **Then follow the two-file flow above**, write a bilingual `note` (how the artifact was produced — one-shot or fixed), and run `bun scripts/validate-data.ts` until it passes before opening a PR.

</details>

<details>
<summary><b>Repo layout and local commands</b></summary>

```
outputs/<artifact-dir>/<case-id>.<ext>  raw model artifacts (HTML / SVG), filename = case id
models/<agent-id>.json                  agent registry: label / vendor / harness / effort / artifactDir / order / run notes
cases.json                              case definitions (bilingual prompts, maintainer-owned)
scripts/validate-data.ts                data validation (CI runs it on every PR)
scripts/update-registry.ts              README Registry table generation (CI auto-syncs after merge)
```

```bash
bun scripts/validate-data.ts   # the same data validation CI runs (run this before submitting)
bun scripts/update-registry.ts # optional: preview the Registry tables locally; CI syncs them after merge
```

The site and vote-backend source lives in the private `nagi-bench-site` repo, deployed on Cloudflare Pages; this repo is the site's data source.

</details>

## License

- Code (`scripts/` and other code files): [MIT](./LICENSE)
- Benchmark data and artifacts (`cases.json`, `models/`, `outputs/`): [CC BY 4.0](./LICENSE-DATA). Please credit "NAGI BENCH (https://bench.nagi.fun/)".
