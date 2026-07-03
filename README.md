# @hiai-gg/hiai-ui

![npm version](https://img.shields.io/npm/v/@hiai-gg/hiai-ui?logo=npm)
![npm downloads](https://img.shields.io/npm/dw/@hiai-gg/hiai-ui?logo=npm)
![license](https://img.shields.io/github/license/HiAi-gg/hiai-ui)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

## Why @hiai-gg/hiai-ui

- One source of truth for design tokens across the HiAi ecosystem
- 22 composites (AdminSidebar, ChatWidget, DatePicker, ConfirmDialog, ScrollToTop, SearchBar, LiveIndicator, DocumentTitle…)
- 14 shadcn-svelte primitive categories (Button, Card, Select, Checkbox, RadioGroup…) with deep-path imports
- Dark mode built-in via `.dark` class; observe theme via `.theme-observe`
- Zero-config consumption — just import tokens.css and you're good

The canonical UI package for the HiAi ecosystem. Design reference — **hiai-docs
(oklch, shadcn-svelte new-york / slate). Source-only (no compilation): consumers
import the source, which their Vite + Tailwind v4 builds.

> See the project documentation for more details.

## Layers

| Layer | Location | Import |
|---|---|---|
| **Tokens** | `src/styles/tokens.css` | `@import "@hiai-gg/hiai-ui/styles/tokens.css";` |
| **Primitives** (shadcn) | `src/components/ui/*` | `import { Button } from "@hiai-gg/hiai-ui/components/ui/button";` |
| **Composites** | `src/components/*` | `import { AdminSidebar, StatsCard } from "@hiai-gg/hiai-ui";` |
| **Stores / lib** | `src/stores`, `src/lib` | `import { authStore, cn } from "@hiai-gg/hiai-ui";` |

Primitives are deep-path only (not in main barrel) to avoid pulling
`bits-ui`/`lucide` on SSR when unnecessary.

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
| base | document (`html/body`, `::selection`, `.skip-link`, date-inputs), `.metric-*` (StatsCard) |

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

## New Components (Synced from Consumer)

### SiteHeader (Auth Slots)
Now `SiteHeaderConfig` supports Svelte 5 snippets `authSlot` and `mobileAuthSlot` for custom user menus, and `nav` has been made optional:
```svelte
<script lang="ts">
  import { SiteHeader } from "@hiai-gg/hiai-ui";
</script>

<SiteHeader config={{
  logo: { alt: "My App" }
}} authSlot={myAuthSnippet} />

{#snippet myAuthSnippet()}
  <button>Log in</button>
{/snippet}
```

### EmptyState
Supports optional link action via `actionHref` (renders an `<a>` tag with button styling):
```svelte
<EmptyState
  title="No Documents"
  description="Create your first document to get started."
  actionLabel="Create Document"
  actionHref="/documents/new"
/>
```

### SiteFooter
A brand new marketing footer component:
```svelte
<SiteFooter config={{
  brand: { name: "HiAi", tagline: "Smart Agent Scaffolding" },
  columns: [
    { title: "Product", links: [{ label: "Features", href: "/features" }] }
  ],
  copyright: "© 2026 HiAi"
}} />
```

### Skeleton / SkeletonText
Primitives for loading states:
```svelte
<script lang="ts">
  import { Skeleton, SkeletonText } from '@hiai-gg/hiai-ui/components/ui/skeleton/index';
</script>

<!-- Custom block skeleton -->
<Skeleton class="h-4 w-64" />

<!-- Paragraph helper -->
<SkeletonText lines={3} />
```

### Sonner (Toasts)
Toast notifications using `svelte-sonner`:
```svelte
<!-- Mount once in your root layout: -->
<script lang="ts">
  import { Sonner } from '@hiai-gg/hiai-ui/components/ui/sonner/index';
</script>

<Sonner />

<!-- Trigger toast anywhere in your app: -->
<script lang="ts">
  import { toast } from '@hiai-gg/hiai-ui/components/ui/sonner/index';

  function handleSave() {
    toast.success("Settings saved!");
  }
</script>
```

## Ecosystem

- [@hiai-gg/hiai-observe](https://www.npmjs.com/package/@hiai-gg/hiai-observe) — telemetry & monitoring
- [HiAi Dashboard](https://github.com/HiAi-gg/hiai-dashboard) — operator control plane
- [HiAi Admin](https://github.com/HiAi-gg/hiai-admin) — tenant admin
- [HiAi Kit](https://github.com/HiAi-gg/hiai-kit) — agent scaffolding CLI

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT © 2025 HiAi — see [LICENSE](./LICENSE).
