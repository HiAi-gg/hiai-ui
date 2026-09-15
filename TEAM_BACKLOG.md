# Team backlog — hiai-ui

Source audit: **2026-09-13**. Kind: **library**.
This pass: **2026-09-15**. Branch: `feat/t04-consumer-compat-editor-split` (from `origin/main` `9919925`). T04 source remains unpublished.

Coordination and acceptance: [TEAM_HANDOFF.md](../TEAM_HANDOFF.md).

## Current reconciliation

Ordinary CI (`.github/workflows/ci.yml`) covers check/build/test on PR and `main` push; publish remains tag-only. Package **0.1.3** (unpublished editor-split + exact primitive `/index` exports). Popover/Command/Combobox stay deep-path. Editor is `@hiai-gg/hiai-ui/editor`, not the main barrel.

Source checks this pass: `bun run build` 0, `bun run check` 0 errors/0 warnings, `bun run test` **80/80**. Graphical playground evidence: [docs/acceptance/NEXT-NIGHT-20260915.md](docs/acceptance/NEXT-NIGHT-20260915.md). Caddy `/hiai-ui*` still 502; `portfolio@hiai-ui` was not restarted.

Recent local commits on `origin/main` at start:

- `9919925 Build package before clean consumer typechecks`
- `a597926 Build package before typechecking clean consumer fixtures`
- `75a92f0 Verify primitive accessibility and built consumer exports in CI`

Pre-existing Git status at start of 2026-09-15: uncommitted T04 tree from 2026-09-14 (preserved). Owner dirty files besides that T04 set: none.

## Read first

- [docs/TEAM-PLAN-PROMPT.md](docs/TEAM-PLAN-PROMPT.md)
- [docs/hiai-admin-integration-plan-2026-07-08.md](docs/hiai-admin-integration-plan-2026-07-08.md)
- [src](src)
- [README.md](README.md)
- [package.json](package.json)
- [ROADMAP.md](ROADMAP.md)

## Dependencies and scope

No cross-project implementation dependency assigned in this pass.
Use isolated fixtures. No production change, DNS, publishing, real messages or financial action is implied.

## Task ledger

Effort is a planning estimate, not a deadline. Confirm the first task baseline before implementation; already implemented work becomes verification.

### HIAI-UI-T01 — Reconcile old Popover/Command/Combobox plans against exports

- [x] **P1** · status: **accepted-source** · owner: **grok-20260913** · effort: M: about 0.5-1 day
- Depends on: current baseline and cited source inspection.
- Acceptance: Existing primitives are not rebuilt; missing behavior is a precise task with a consumer use case.
- Evidence: `docs/primitives-reconciliation.md`; `src/__tests__/exports.test.ts`. Primitives already in `src/components/ui/{popover,command,combobox}` and `package.json` exports; not added to `src/index.ts`. Remaining: Combobox empty/error is composition (documented); Combobox adoption is hiai-admin (sibling).
- Delivery: dated acceptance report `docs/acceptance/GROK-20260913.md`. Coordinator marks accepted.

### HIAI-UI-T02 — Verify accessibility and installed-package consumer integration

- [x] **P2** · status: **accepted-source** · owner: **grok-20260913** · effort: M-L: about 1-2 days
- Depends on: HIAI-UI-T01.
- Acceptance: Keyboard/focus/Escape and error states pass; built dist imports in a real consumer; fonts remain consumer-owned.
- Evidence: Production Popover.Root is bits-ui only (no document Escape listener). Tests use bits-ui via harness (`activateTrigger`, `pressEscape`, KeyboardEvent clone init). Regressions: nested (inner only), two open (top layer only; remaining layer owns focus), `onEscapeKeydown` preventDefault. Dist: package.json exports resolution + `import()` of targets; DistConsumerFixture via exports plugin (not prefix alias). `bun run check` 0; `bun run build` src→dist; `bun run test` **65/65** (27 a11y, 6 consumer-dist). jsdom only — not browser/runtime visual.
- Delivery: dated acceptance report `docs/acceptance/GROK-20260913.md`. Coordinator marks accepted.

### HIAI-UI-T03 — Add ordinary CI and document playground/versions

- [x] **P2** · status: **accepted-source** · owner: **grok-20260913** · effort: M-L: about 1-2 days
- Depends on: HIAI-UI-T01.
- Acceptance: test/check/build covered on PR/push; LAN configuration verified before restart; no automatic package publish.
- Evidence: `.github/workflows/ci.yml` and `publish.yml` **check** job run **build then check then test** (dist gitignored; DistConsumerFixture needs compiled exports). Publish job also builds before typecheck; still tag-only / `workflow_dispatch`. `vite.config.ts` `:5210` + `127.0.0.1`; `svelte.config.js` `paths.base=/hiai-ui`. Service **not** restarted. Clean-runner empty-dist CI is coordinator-validated.
- Delivery: dated acceptance report `docs/acceptance/GROK-20260913.md`. Coordinator marks accepted.

### HIAI-UI-T04 — Consumer compatibility: editor graph, primitive /index exports, portable pins

- [ ] **P1** · status: **review** · owner: **grok-20260915** · effort: M: about 0.5-1 day
- Depends on: HIAI-UI-T01–T03 (accepted-source).
- Acceptance: Non-editor barrel imports do not load `svelte-tiptap`; every `src/components/ui/<name>/index.ts` has an exact `.js` export; pin classifier distinguishes portable vs floating specs; editor Vite helper covers the svelte-tiptap SSR trap. No publish/tag.
- Evidence: `src/editor.ts` + `package.json` `./editor` and `./vite`; barrel no longer re-exports HiAiEditor. Missing `/index` exports added for badge/card/checkbox/confirm-dialog/label/radio-group/textarea. `classifyHiaiUiPin` in `src/lib/pins.ts`. `hiaiUi()` in `src/lib/vite.ts`; playground Vite applies it. Tests: `src/__tests__/consumer-compat.test.ts` (including barrel import-graph walk + `./vite` export), `pins.test.ts`, `vite-plugin.test.ts`. Graphical: `docs/acceptance/evidence/next-night-20260915/`.
- Delivery: `docs/acceptance/GROK-20260914.md` and `docs/acceptance/NEXT-NIGHT-20260915.md`. Coordinator marks accepted.

## Verification entry points

Available script names read from manifests (not executed and not automatically safe):

- `.`: `bun run build`, `bun run check`, `bun run test`.

CI definitions: .github/workflows/ci.yml and .github/workflows/publish.yml. Presence does not prove a passing run.

Before acceptance attach actual test/typecheck/build evidence and explicitly record pending runtime/visual checks.

## Coordinator acceptance

[Independent T01–T03 evidence](docs/acceptance/COORDINATOR-20260913.md): 65 tests, check/build passed. T01–T03 scoped source accepted; browser/visual and external install remain distinct.

T04 (2026-09-15) is **review** pending independent coordinator checks. Local evidence: [docs/acceptance/GROK-20260914.md](docs/acceptance/GROK-20260914.md), [docs/acceptance/NEXT-NIGHT-20260915.md](docs/acceptance/NEXT-NIGHT-20260915.md).
