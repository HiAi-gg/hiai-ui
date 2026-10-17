<!-- portfolio-audit:2026-09-13 -->
> **Source reconciliation — 2026-09-14:** Read [TEAM_BACKLOG.md](TEAM_BACKLOG.md) before using the tasks/status below. Ordinary CI now checks main/PR; explicit tag/manual publish is separate. Package remains 0.1.3 on npm; local unpublished work splits the editor off the barrel and completes primitive `/index` exports. Runtime/remote-CI claims retain their original dates unless revalidated. The linked task ledger holds execution status; this document retains product direction/history.

# ROADMAP — hiai-ui
Date: 2026-09-15 · branch `feat/t04-consumer-compat-editor-split` from `origin/main` `9919925` · origin HiAi-gg/hiai-ui
Live: npm `@hiai-gg/hiai-ui@0.1.3` (does **not** include this pass). Direct Vite `http://127.0.0.1:5210/hiai-ui/` HTTP 200 this pass; Caddy `/hiai-ui*` 502; LAN `https://192.168.1.111/hiai-ui/` not reachable. No public product URL. Library, not a site.

## Snapshot
Canonical design system for HiAi **system** apps (`@hiai-gg/hiai-ui`). Package `0.1.3` is on npm. Local tree: Svelte 5.57 / Kit 2.70 / Vite 8.2 / TypeScript 6; editor at `@hiai-gg/hiai-ui/editor`; every ui `index.ts` has an exact `/index` export. `package.json` exports **compiled `dist/`** via `svelte-package`. Do not mix with `@webs/ui`. Workflows: `ci.yml` on PR/`main`; `publish.yml` on `v*` tags only (last success: tag `v0.1.3`).

## Evidence
- Code: `src/components/*` (composites), `src/components/ui/*` (shadcn primitives), `src/editor.ts`, `src/styles/tokens.css`, `src/index.ts` barrel, `package.json` exports → `dist/`
- Live/LAN: npm latest 0.1.3; this pass did **not** restart `portfolio@hiai-ui`. Direct `:5210` playground HTTP 200 + graphical screenshots. Caddy still 502.
- CI: local `bun run build` / `check` / `test` this pass (80 tests). Remote GitHub Actions on the review PR. Publish remains tag-only; workflows pin Bun **1.4.0**
- Docs: README install is exact `0.1.3` / `file:` / SHA-or-tag; editor is a subpath; 21 primitive `/index` exports

## Now
- Tokens + primitives + composites ship; dark `.dark`, observe `.theme-observe`.
- Inter webfonts are **not** imported from `tokens.css` (that fix is in `v0.1.3`).
- Main barrel no longer imports `svelte-tiptap` / HiAiEditor (finance Vite SSR trap).
- Consumers in this workspace still pin **npm 0.1.3** (unpublished editor split not consumed until owner tag): `local_hub`, `hiai-admin`, `hiai-post`, `hiai-observe` frontend, `hiai-kit` app. `finance` web uses `^0.1.1` (forbidden-float).

## Next
1. Coordinator accepts HIAI-UI-T04. Owner tag/publish only if consumers should pick up the editor split (hiai-post must switch `HiAiEditor` to `@hiai/ui/editor`).
2. **Ops:** restart `portfolio@hiai-ui` after Vite `:5210` + `paths.base=/hiai-ui` + `127.0.0.1`. Caddy already proxies `/hiai-ui*` → `:5210`. Do not claim LAN 200 until that restart.
3. finance (and any editor host) should add `hiaiUi()` and an exact pin; sibling Combobox adoption stays hiai-admin.

## Later / Not doing
- Do not add webs-cool / `@webs/ui` themes here.
- Do not treat DEV-01 playground as production.
