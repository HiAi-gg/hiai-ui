# Team backlog — hiai-ui

Source audit: **2026-09-13**. Kind: **library**.
Baseline HEAD: `19cb2318f0805ea6f46fddc066c88ac56510f783`; branch: `main`.

Coordination and acceptance: [TEAM_HANDOFF.md](../TEAM_HANDOFF.md).

## Current reconciliation

Ordinary CI (`.github/workflows/ci.yml`) covers check/build/test on PR and `main` push; publish remains tag-only. Package 0.1.3; Popover/Command/Combobox are exported deep-path primitives.

Source checks support this note; they do not certify the running app. Prior live/CI/test claims are historical until rechecked. GitHub freshness was not verified.

Recent local commits:

- `19cb231 chore: pin Svelte 5.57, Kit 2.70, and Vite 8.2`
- `aeea80c fix: do not import Inter webfonts from tokens.css`
- `dd8a983 feat: circular theme spread and Inter tokens for 0.1.2`

Pre-existing Git status: **1 changed/untracked entries** before this audit. Preserve them; the baseline inventory records paths, not secret contents.

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
- Evidence: `.github/workflows/ci.yml` runs check/build/test on `pull_request` + `push` to `main` (no publish). `.github/workflows/publish.yml` stays tag-only / `workflow_dispatch`. `vite.config.ts` `:5210` + `127.0.0.1`; `svelte.config.js` `paths.base=/hiai-ui`; Caddy already `/hiai-ui*` → `:5210`. `docs/playground.md`. Service **not** restarted.
- Delivery: dated acceptance report `docs/acceptance/GROK-20260913.md`. Coordinator marks accepted.

## Verification entry points

Available script names read from manifests (not executed and not automatically safe):

- `.`: `bun run build`, `bun run check`, `bun run test`.

CI definitions: .github/workflows/ci.yml and .github/workflows/publish.yml. Presence does not prove a passing run.

Before acceptance attach actual test/typecheck/build evidence and explicitly record pending runtime/visual checks.

## Coordinator acceptance

[Independent final evidence](docs/acceptance/COORDINATOR-20260913.md):65 tests, check/build passed. T01–T03 scoped source accepted; browser/visual and external install remain distinct.
