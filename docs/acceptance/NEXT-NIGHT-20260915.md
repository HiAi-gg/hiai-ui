# NEXT-NIGHT-20260915 — hiai-ui

Date: 2026-09-15. Worker: Grok implementation. Coordinator (Codex) reviews and accepts.
Kind: **library** (not a website). In-place repository `/mnt/data/projects/hiai-ui`. No worktree/copy.

Status: **review** — not accepted-live. No tag, no npm publish, no DNS, no production mutation, `portfolio@hiai-ui` not restarted.

## Task

Reconcile recorded gaps against current source (historical findings were not treated as freshly reproduced):

1. HIAI-UI-T04 not independently accepted.
2. Editor split unpublished (npm `0.1.3` still barrels `HiAiEditor`).
3. hiai-post / finance (and other sibling) pins stale until a tagged build.

## Before (reproduced this pass)

Committed `origin/main` `9919925` / working HEAD at start `a597926` still re-exports `HiAiEditor` from `src/index.ts`.

Installed npm `0.1.3` in finance (`/mnt/data/projects/finance/web/node_modules/@hiai-gg/hiai-ui`):

- `HiAiEditor` present in `dist/index.js`
- no `./editor` or `./vite` export
- evidence: `docs/acceptance/evidence/next-night-20260915/before-published-0.1.3-barrel.txt`
- HEAD source exports: `docs/acceptance/evidence/next-night-20260915/before-HEAD-src-index-editor-exports.txt`

That is the finance Vite SSR trap: `import { EmptyState } from "@hiai-gg/hiai-ui"` loads the editor graph; `svelte-tiptap` has `types`+`svelte` conditions only.

Uncommitted 2026-09-14 T04 tree was already in this working copy (preserved; not discarded).

## After

- `src/editor.ts` is `@hiai-gg/hiai-ui/editor`. Main barrel does not mention `HiAiEditor` / `svelte-tiptap`.
- Every `src/components/ui/<name>/index.ts` maps to `./components/ui/<name>/index` → `./dist/components/ui/<name>/index.js` (21 primitives).
- `classifyHiaiUiPin` + `hiaiUi()` Vite helper (`@hiai-gg/hiai-ui/vite`).
- Playground `vite.config.ts` applies `hiaiUi()` (dogfood; TipTap aliases kept).
- Tests: barrel text + local-import graph never reach `svelte-tiptap`/`HiAiEditor`; `./vite` export asserted.

Package version remains **0.1.3**. Breaking barrel change is unpublished until an owner tag.

## Commands

Cwd: `/mnt/data/projects/hiai-ui`. Bun: `/home/vlgalib/.bun/bin/bun` 1.4.0.
Heavy commands used `flock /tmp/portfolio-next-night-heavy.lock` (released after each).

| Command | Exit | Summary |
|---------|------|---------|
| `bun run build` | **0** | `svelte-package` `src -> dist`; `dist/index.js` has no `HiAiEditor`/`svelte-tiptap`; `dist/editor.js` and `dist/lib/vite.js` present. Log: `docs/acceptance/evidence/next-night-20260915/build.log` |
| `bun run check` | **0** | svelte-check **0 errors and 0 warnings**. Log: `docs/acceptance/evidence/next-night-20260915/check.log` |
| `bun run test` | **0** | **11 files, 80 passed / 80** (was 78; +2: `./vite` export + barrel import-graph walk). a11y 27. jsdom canvas / `derived_inert` stderr unchanged. Log: `docs/acceptance/evidence/next-night-20260915/test.log` |

## Graphical interaction (not HTTP-200-only)

Named agent-browser session `hiai-ui-next-night-20260915`, engine **chrome** (CLI default; Lightpanda not required). Target: `http://127.0.0.1:5210/hiai-ui/` (systemd playground already listening; unit **not** restarted). One-off Vite on `:15210` was **not** used (EMFILE watchers).

| Check | Result |
|-------|--------|
| Direct Vite HTTP | **200** `x-sveltekit-page: true` title `hiai-ui Demo` |
| Caddy `http://127.0.0.1/hiai-ui/` | **502** |
| LAN `https://192.168.1.111/hiai-ui/` | connection failed (443) |
| Desktop 1280×800 light | Playground renders header, stats, buttons, badges, inputs, switch/tabs. `browser/desktop-light.png` |
| Desktop dark (`.dark` class) | Dark surfaces + purple FAB. `browser/desktop-dark-class.png`. ThemeToggle pointer hit-testing returned 0×0 boxes; class applied for visual theme evidence |
| Form | Native "Please fill out this field" tooltip on Submit. `browser/desktop-after-feedback.png`. Typed values reached `#feedback-name/email/message` |
| Keyboard | Tab moved focus to Popover **Open** (`#bits-s9`) |
| Mobile 390×844 / iPhone 12 | Narrow viewport; sidebar + FAB overlap main. `browser/mobile-iphone12.png` |
| Console | Vite HMR debug only; no error/warn |
| Network | Document GET `/hiai-ui/` **200**; OpenMoji icons **200**; `favicon.png` **404** |

HTTP 200 is not the interaction proof; screenshots and the native validation tooltip are.

## SHA / URL

- Commit: `33380afc1ac52d8e14d807648ef35f6ee9aa7d19` (source RC; follow-up docs commit may sit on top)
- Branch: `feat/t04-consumer-compat-editor-split`
- npm remains `@hiai-gg/hiai-ui@0.1.3` (does not include this source)
- No public product URL. Library RC only.

## Remaining blockers

1. Coordinator independent review of T04 — this worker does not mark accepted.
2. Owner tag/publish of the editor split. Until then consumers still get the barrel leak from npm 0.1.3.
3. Sibling pin/import updates (not edited here): see shared_dependency_requests in the dispatch result.
4. Ops restart of `portfolio@hiai-ui` so Caddy `/hiai-ui*` stops 502. Explicit ops task; not done.
5. jsdom is not full e2e; ThemeToggle click via accessibility refs did not hit a layout box.

## Rollback

`git revert` the review commit / close the PR. npm 0.1.3 is unchanged. No production host to roll back. Old playground unit left running.

## Old-host disposition

Not a website. No Coolify/DNS cutover. Playground stays DEV-01 only.
