# @hiai-gg/hiai-ui

The canonical UI package for the HiAi ecosystem. Design reference — **hiai-docs**
(oklch, shadcn-svelte new-york / slate). Source-only (no compilation): consumers
import the source, which their Vite + Tailwind v4 builds.

> Plan and status: [`HIAI_UI_PACKAGE_PLAN.md`](../../projects/HIAI_UI_PACKAGE_PLAN.md) ·
> rules: [`HIAI_CONVENTIONS.md`](../../projects/HIAI_CONVENTIONS.md).

## Layers

| Layer | Location | Import |
|---|---|---|
| **Tokens** | `src/styles/tokens.css` | `@import "@hiai-gg/hiai-ui/styles/tokens.css";` |
| **Primitives** (shadcn) | `src/components/ui/*` | `import { Button } from "@hiai-gg/hiai-ui/components/ui/button";` |
| **Composites** | `src/components/*` | `import { AdminSidebar, StatsCard } from "@hiai-gg/hiai-ui";` |
| **Editor** | `src/components/editor/*` | `import TipexEditor from "@hiai-gg/hiai-ui/components/editor/TipexEditor.svelte";` |
| **Stores / lib** | `src/stores`, `src/lib` | `import { authStore, cn } from "@hiai-gg/hiai-ui";` |

Primitives and editor are deep-path only (not in main barrel) to avoid pulling
`bits-ui`/`lucide`/`tiptap` on SSR when unnecessary.

## How to connect (contract — enforced by every hiai project)

1. Add dependency:
   ```jsonc
   // package.json
   "dependencies": { "@hiai-gg/hiai-ui": "workspace:*" }
   ```
2. Import tokens in root `app.css` (after Tailwind):
   ```css
   @import "tailwindcss";
   @import "@hiai-gg/hiai-ui/styles/tokens.css";
   ```
3. Let Tailwind v4 scan the package classes — in `app.css`:
   ```css
   @source "../../../packages/hiai-ui/src";
   ```
   (path — relative to the file; adjust for project depth).
4. Use components from `@hiai-gg/hiai-ui` / `@hiai-gg/hiai-ui/components/ui/*`.
5. **Remove local duplicates** of components and tokens.
6. Theme: `.dark` class on `<html>` (toggle via `ThemeToggle`); for observe — `.theme-observe`.

## Token canon

`tokens.css` — exact extraction from `hiai-docs/frontend/src/app.css`. **Change design →
edit there first, then sync here.** Layers within the file:

| Layer | Content |
|---|---|
| `:root` / `.dark` | canon docs: `--background/foreground/card/popover/primary/secondary/muted/accent/destructive/border/input/ring/radius`, app-tokens (`--color-bg/surface`), `--highlight-default`, `--hljs-*` |
| semantic add-on | `--primary-hover`, `--success`, `--warning`, `--info`, `--violet` (+`-foreground`) — additive, not instead of docs |
| `.theme-observe` | dark-first slate variant for hiai-observe |
| `@theme` | mapping tokens to Tailwind v4 (`bg-primary`, `text-muted-foreground`, `rounded-lg`…) + scale `--radius-{sm,md,lg,xl}` |
| base | document (`html/body`, `::selection`, `.skip-link`, date-inputs), `.metric-*` (StatsCard), TipTap/ProseMirror base (required by editor) |

Brand accent: light `#20b2aa`, dark `#9932cc`.

## Checks

```bash
bun run check   # svelte-kit sync && svelte-check — package gate (0 errors)
```

## Notes

- `AdminHeader`/`AdminSidebar` reference the SvelteKit runtime virtual `$app/state`
  (only `page.url.pathname` for active item highlighting). Types are declared ambient
  in `src/app.d.ts`; implementation is provided by the consuming SvelteKit app. Decoupling via
  `currentPath` prop — candidate for future refactor.

## Publishing

This package auto-publishes to npm on push to `main` via GitHub Actions.
To publish manually: `bun run build && npm publish --access public`.
