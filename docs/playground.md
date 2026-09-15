# Playground and versions

Library playground is the SvelteKit app in this repo (`src/routes/+page.svelte`). It is **not** production.

## Versions (2026-09-13)

| Item | Value |
|------|-------|
| Package | `@hiai-gg/hiai-ui@0.1.3` (npm; HEAD may be unpublished pins) |
| Runtime | Bun **1.4.0** (CI + publish workflows) |
| UI stack | Svelte **5.57**, SvelteKit **2.70**, Vite **8.2**, TypeScript **6** |
| Primitives | bits-ui `^2.18.1` |
| Install | exact `0.1.3`, `npm:@hiai-gg/hiai-ui@0.1.3`, `file:../hiai-ui` (dev), or `github:HiAi-gg/hiai-ui#<sha>` / `#v0.1.3` — not `workspace:*`, `^`, or `#main` |
| Editor | `@hiai-gg/hiai-ui/editor` (not the main barrel). Playground still imports `HiAiEditor` via a relative path. |
| Vite helper | `@hiai-gg/hiai-ui/vite` `hiaiUi()` for consumers that mount the editor |

Ordinary CI is `.github/workflows/ci.yml` (`build` then `check` then `test`) on **push to `main` and pull requests**. That workflow does **not** publish. Build is first because `dist/` is gitignored and DistConsumerFixture imports package exports that resolve there.

npm publish stays **tag-only**: `.github/workflows/publish.yml` on `v*` tags or `workflow_dispatch`. Its check job uses the same **build → check → test** order. Last published tag: `v0.1.3`. Bun in both workflows is **1.4.0**.

## LAN (verified, not restarted)

Canon: `/mnt/data/.devstack/LAN-PORTS.md` — hiai-ui web **5210**.

| Piece | Configured | Verified this pass |
|-------|------------|--------------------|
| Caddy | `handle /hiai-ui*` → `127.0.0.1:5210` in `/mnt/data/.devstack/caddy/sites/zz-lan-portfolio.caddy` | Source read; process not restarted |
| Vite | `server.port=5210`, `strictPort: true`, `host: 127.0.0.1` | `vite.config.ts` |
| Kit base | `kit.paths.base=/hiai-ui` | `svelte.config.js` |
| URL | `https://192.168.1.111/hiai-ui/` and `http://127.0.0.1:5210/hiai-ui/` | Direct `:5210` HTTP 200 this pass; Caddy `/hiai-ui*` 502; LAN 443 not reachable |

**Do not restart** `portfolio@hiai-ui` from a library task. After these files land, an ops pass must restart the unit so Caddy stops 502-ing if Vite is still bound to the old `:50203`.

Local: `bun run dev` then open `http://127.0.0.1:5210/hiai-ui/`.

There is no `test:e2e` script. Unit tests are jsdom (vitest) — that is **not** browser coverage.

## Fonts

`tokens.css` names Inter Variable in `--font-sans` and does **not** import `@fontsource-variable/inter`. Consumers load the webfont in their own stylesheet.
