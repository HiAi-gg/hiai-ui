<!-- portfolio-audit:2026-09-13 -->
> **Source reconciliation — 2026-09-13:** Read [TEAM_BACKLOG.md](TEAM_BACKLOG.md) before using the tasks/status below. Ordinary CI now checks main/PR; explicit tag/manual publish is separate. Package remains0.1.3; current acceptance is recorded in TEAM_BACKLOG. Runtime/remote-CI claims retain their original dates; they were not revalidated in this pass. The linked task ledger holds execution status; this document retains its original product direction/history.

# ROADMAP — hiai-ui
Date: 2026-09-05 · HEAD 19cb2318f0805ea6f46fddc066c88ac56510f783 · origin HiAi-gg/hiai-ui · branch main
Live: npm `@hiai-gg/hiai-ui@0.1.3`. LAN https://192.168.1.111/hiai-ui/ **502**. systemd `portfolio@hiai-ui` is active but Vite 6.4.3 listens on `:50203` (not canon `:5210`), so Caddy misses it. No public product URL.

## Snapshot
Canonical design system for HiAi **system** apps (`@hiai-gg/hiai-ui`). Package `0.1.3` is on npm; HEAD after the tag pins Svelte 5.57 / Kit 2.70 / Vite 8.2 / TypeScript 6 (unpublished). `package.json` exports **compiled `dist/`** via `svelte-package`. Do not mix with `@webs/ui`. Workflows: `publish.yml` on `v*` tags only (last success: tag `v0.1.3`).

## Evidence
- Code: `src/components/*` (composites), `src/components/ui/*` (shadcn primitives), `src/styles/tokens.css`, `src/index.ts` barrel, `package.json` exports → `dist/`
- Live/LAN: npm latest 0.1.3; LAN 502; `:5210` down; unit logs `Local: http://localhost:50203/`
- CI: `gh run list --commit HEAD` empty (HEAD is not a tag). Publish is tags-only; `publish.yml` still `bun-version: "1.3"`
- Docs that lie: `README.md` still says source-only / `workspace:*` install and counts “22 composites”. Consumers on this workstation use npm/`file:`/`github:`. 4 Sep overlay SHA `aeea80c` and “publish 0.1.3 / bump consumers” — 0.1.3 is already on npm; admin/post/observe/hub/kit already pin 0.1.3.

## Now
- Tokens + primitives + composites ship; dark `.dark`, observe `.theme-observe`.
- Inter webfonts are **not** imported from `tokens.css` (that fix is in `v0.1.3`).
- Consumers in this workspace: `local_hub` 0.1.3, `hiai-admin` 0.1.3, `hiai-post` 0.1.3, `hiai-observe` frontend 0.1.3, `hiai-kit` app 0.1.3.

## Next
1. **Ops:** restart `portfolio@hiai-ui` after this tree’s Vite `:5210` + `paths.base=/hiai-ui` + `127.0.0.1` config. Caddy already proxies `/hiai-ui*` → `:5210`. Do not claim LAN 200 until that restart. (Config landed 2026-09-13; process not restarted in that pass.)
2. README install/dist notes and Bun 1.4 CI pins are in-tree; keep Inter out of `tokens.css`.
3. Tag/publish HEAD’s Svelte/Kit/Vite pins only if consumers need them (no automatic publish from PR CI).

## Later / Not doing
- Do not add webs-cool / `@webs/ui` themes here.
- Do not treat DEV-01 playground as production.
