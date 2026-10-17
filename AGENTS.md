# hiai-ui

Deltas only. Canon: `/mnt/data/.devstack/STACK.md`

- Library package `@hiai-gg/hiai-ui` (not a host app). Kind **system** consumers import this kit; do not mix with `@webs/ui`.
- Primitives in `src/components/ui/` are **deep-path only** (`@hiai-gg/hiai-ui/components/ui/<name>/index`). Do not add them to `src/index.ts`.
- Editor (`HiAiEditor` and TipTap helpers) is `@hiai-gg/hiai-ui/editor`, not the main barrel. Barrel consumers must not load `svelte-tiptap`. Editor Vite apps should add `hiaiUi()` from `@hiai-gg/hiai-ui/vite`.
- Published surface is compiled `dist/` via `svelte-package`. Portable pins: exact npm `0.1.3`, `npm:@hiai-gg/hiai-ui@0.1.3`, `github:HiAi-gg/hiai-ui#<sha|v0.1.3>`. Sibling `file:` is local-dev only. Not `workspace:*`, `^`, or `#main`.
- Fonts are **consumer-owned**. `tokens.css` names `--font-sans: "Inter Variable", …` and must not `@import` webfonts.
- Playground (this repo’s SvelteKit app): Vite `127.0.0.1:5210`, `kit.paths.base=/hiai-ui`, Caddy `/hiai-ui*`. Do not restart `portfolio@hiai-ui` from a library edit without an explicit ops task.
- Checks: `bun run check`, `bun run test`, `bun run build`. CI on PR/push; npm publish requires an explicit `v*` tag or manual `publish.yml` dispatch, never ordinary CI.
