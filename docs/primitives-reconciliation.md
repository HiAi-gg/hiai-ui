# Primitive plan vs exports — 2026-09-13

Reconciles the 2026-07-08 Popover / Command / Combobox (and ContextMenu / Menubar) plans against the **current** package. Existing primitives were **not** rebuilt in this pass.

**2026-09-14 addendum:** every `src/components/ui/<name>/index.ts` now has an exact `package.json` export to `dist/components/ui/<name>/index.js` (badge, card, checkbox, confirm-dialog, label, radio-group, textarea were missing). Editor left the main barrel for `@hiai-gg/hiai-ui/editor` so non-editor consumers do not load `svelte-tiptap`. Primitives were still not rebuilt.

Plans read: `docs/hiai-admin-integration-plan-2026-07-08.md`, `docs/TEAM-PLAN-PROMPT.md`, `docs/tasks-2026-07-08.md`. Package: `@hiai-gg/hiai-ui@0.1.3`.

## Barrel policy (unchanged)

Primitives stay **deep-path only**. They are not re-exported from `src/index.ts`. Consumers import:

```ts
import * as Popover from "@hiai-gg/hiai-ui/components/ui/popover/index";
import * as Command from "@hiai-gg/hiai-ui/components/ui/command/index";
import * as Combobox from "@hiai-gg/hiai-ui/components/ui/combobox/index";
```

Canonical specifier includes `/index` (matches `package.json` `exports` and hiai-admin). The package also has `"./components/*": "./dist/components/*"` for compiled files; do not rely on a directory import without `/index`.

## What already exists (do not rebuild)

| Plan item | Source | `package.json` export | Dist | Playground | Consumer use (hiai-admin, read-only) |
|-----------|--------|------------------------|------|------------|--------------------------------------|
| Popover (HIGH) | `src/components/ui/popover/` (`Root`, `Trigger`, `Content`, `Close`) | `./components/ui/popover/index` | `dist/components/ui/popover/` | Single-page demo on `src/routes/+page.svelte` | `NotificationBell.svelte`, `EditorToolbar.svelte` import `@hiai/ui/components/ui/popover/index` |
| Command (MEDIUM) | `src/components/ui/command/` (`Root`, `Input`, `List`, `Empty`, `Group`, `GroupHeading`, `Item`, `Separator`, `Viewport`, `Loading`) | `./components/ui/command/index` | `dist/components/ui/command/` | Same playground | `CommandPalette.svelte` (Command + Dialog; Empty text used for loading/no-results) |
| Combobox (MEDIUM) | `src/components/ui/combobox/` (compound bits-ui: `Root`, `Input`, `Trigger`, `Content`, `Item`, `Group`, `GroupHeading`, `Viewport`, `Separator`, scroll buttons) | `./components/ui/combobox/index` | `dist/components/ui/combobox/` | Same playground | **Not imported** in hiai-admin |
| ContextMenu (LOW) | `src/components/ui/context-menu/` | `./components/ui/context-menu/index` | yes | yes | unused in hiai-admin |
| Menubar (LOW) | `src/components/ui/menubar/` | `./components/ui/menubar/index` | yes | yes | unused in hiai-admin |
| Select / DropdownMenu | already present before the 2026-07-08 gap list | `/select/index`, `/dropdown-menu/index` | yes | yes | many admin forms; EditorToolbar dropdowns |

Shipped API is **bits-ui / shadcn compound components**, not the old plan’s single-file `Combobox` with `options={[]}` / `onSearch`. That wrapper would be a second, divergent primitive. Do not add it.

Old plan playground routes (`/popover`, `/command`, `/combobox`, …) were never created. Demos live on the library playground page. That is documentation layout, not a missing primitive.

## Precise remaining work (with consumer use case)

Do **not** treat these as “rebuild Popover/Command/Combobox”.

### Combobox empty / async error composition (library docs + consumer)

- **Gap:** bits-ui Combobox has no `Empty` / `Loading` parts (unlike Command). The old plan’s `onSearch` + `loading` props were never part of the shipped API.
- **Consumer:** hiai-admin searchable tenant / user / language lists still use **Select**. CommandPalette already composes Command.Empty (`Searching…` / `No results`) and handles fetch errors by clearing hits — that is the pattern Combobox consumers should copy (render a message inside `Combobox.Content` when the filtered list is empty or a fetch fails).
- **This repo:** document the composition (see `docs/components/combobox.md`). No new wrapper component.

### Combobox adoption in hiai-admin (sibling, not this package)

- **Gap:** Combobox is exported and demoed; hiai-admin does not import it.
- **Consumer use case:** replace large native/Select lists (users, sites, RBAC role pickers) where type-to-filter is required.
- **Owner:** hiai-admin. Out of scope for hiai-ui source.

### LAN playground process (ops)

- Caddy already `handle /hiai-ui*` → `127.0.0.1:5210`. Project Vite must listen on **5210** with `kit.paths.base=/hiai-ui` and bind `127.0.0.1`.
- **Do not restart** `portfolio@hiai-ui` from this pass. After config lands, ops restarts the unit so LAN `https://192.168.1.111/hiai-ui/` is 200.

## Import cheat sheet (current)

| Primitive | Specifier |
|-----------|-----------|
| Select | `@hiai-gg/hiai-ui/components/ui/select/index` |
| DropdownMenu | `@hiai-gg/hiai-ui/components/ui/dropdown-menu/index` |
| Popover | `@hiai-gg/hiai-ui/components/ui/popover/index` |
| Command | `@hiai-gg/hiai-ui/components/ui/command/index` |
| Combobox | `@hiai-gg/hiai-ui/components/ui/combobox/index` |
| ContextMenu | `@hiai-gg/hiai-ui/components/ui/context-menu/index` |
| Menubar | `@hiai-gg/hiai-ui/components/ui/menubar/index` |

hiai-admin aliases the package as `@hiai/ui` → `npm:@hiai-gg/hiai-ui@0.1.3`.
