# hiai-ui

Deltas only. Canon: `/mnt/data/.devstack/STACK.md`

- Library package `@hiai-gg/hiai-ui` (not a host app). Kind **system** consumers import this kit; do not mix with `@webs/ui`.
- Primitives in `src/components/ui/` are **deep-path only** (`@hiai-gg/hiai-ui/components/ui/<name>/index`). Do not add them to `src/index.ts`.
- Published surface is compiled `dist/` via `svelte-package`. Consumers install npm `0.1.3`, `file:`, or `github:HiAi-gg/hiai-ui#…` — not `workspace:*` unless they are in the same workspace.
- Fonts are **consumer-owned**. `tokens.css` names `--font-sans: "Inter Variable", …` and must not `@import` webfonts.
- Playground (this repo’s SvelteKit app): Vite `127.0.0.1:5210`, `kit.paths.base=/hiai-ui`, Caddy `/hiai-ui*`. Do not restart `portfolio@hiai-ui` from a library edit without an explicit ops task.
- Checks: `bun run check`, `bun run test`, `bun run build`. CI on PR/push; npm publish requires an explicit `v*` tag or manual `publish.yml` dispatch, never ordinary CI.
