# @hiai-gg/hiai-ui — Agent Operating Instructions

## Identity & Purpose

@hiai-gg/hiai-ui — the canonical design system for the HiAi ecosystem. Role: **shared UI primitives and composites** that power hiai-observe, hiai-dashboard, hiai-admin, and hiai-kit. All projects import from the same source of truth for design tokens and components.

**What agents should know before working here:**
- Production status: **v0.0.7 — stable, production-ready**
- Consumers expect zero-config import: `import "@hiai-gg/hiai-ui/styles/tokens.css"` and deep-path component imports
- Dark mode via `.dark` class; observe theme via `.theme-observe`
- Zero external dependencies pulled on SSR — tree-shaking via deep-path imports
- All branding colors come from `tokens.css` layers; no hardcoded hex in components

## Runtime Contract

- **Design tokens**: `src/styles/tokens.css` — exact extraction from hiai-docs
- **Primitives**: `src/components/ui/*` — shadcn-svelte v1 primitives with deep-path imports
- **Composites**: `src/components/*` — opinionated composites (AdminSidebar, StatsCard, etc.)
- **Build**: source-only package; consumers' Vite + Tailwind v4 builds the CSS
- **Theme**: `.dark` class on `<html>`; observe theme via `.theme-observe`

## Canonical Commands

```bash
cd packages/hiai-ui

# Install
bun install

# Typecheck (package gate)
bun run check

# Build (generates dist/)
bun run build
```

## Repo Map

| Path | Role |
|---|---|
| `src/components/ui/*` | shadcn-svelte primitives (Button, Card, Input, Badge, Dialog, DropdownMenu, Label, Switch, Tabs, Textarea, Select, Checkbox, RadioGroup, confirm-dialog) — deep-path only |
| `src/components/*` | Composites (AdminSidebar, AdminHeader, ChatWidget, ConfirmDialog, DatePicker, ScrollToTop, SearchBar, LiveIndicator, DocumentTitle, plus StatsCard, StatusBadge, ThemeToggle, DataTable, PageHeader, EmptyState, SettingsForm, LinkDialog, MarkdownToggle) — barrel exported |
| `src/styles/tokens.css` | Design tokens with layers: `:root` → `.dark` → `.theme-observe` → `@theme` → base |
| `src/lib/*` | Shared utilities (authStore, cn, etc.) |
| `src/stores/*.svelte.ts` | Svelte stores |
| `(none)` | Test files |

## Component Conventions

### File Structure
- **PascalCase** filenames: `Button.svelte`, `AdminSidebar.svelte`, `DataTable.svelte`
- **Directory structure**:
  - Composites in `src/components/` (barrel exported from index.ts)
  - Primitives in `src/components/ui/` (deep-path only, no barrel)
  - Tokens in `src/styles/tokens.css`

### Imports
```ts
// Composites (from barrel)
import { AdminSidebar, StatsCard, ConfirmModal } from "@hiai-gg/hiai-ui";

// Primitives (deep-path to enable tree-shaking)
import { Button } from "@hiai-gg/hiai-ui/components/ui/button";
import { Card } from "@hiai-gg/hiai-ui/components/ui/card";
import { Input } from "@hiai-gg/hiai-ui/components/ui/input";
```

### Token Contract

`tokens.css` layers (in order):

| Layer | Content |
|---|---|
| `:root` | Light theme defaults from hiai-docs |
| `.dark` | Dark theme overrides |
| `.theme-observe` | Dark-first slate variant for hiai-observe |
| `@theme` | Tailwind v4 mappings (`bg-primary`, `text-muted-foreground`, `rounded-lg`, `--radius-*`) |
| `base` | Document-level styles (`html/body`, `::selection`, `.skip-link`, date inputs, `.metric-*` classes for StatsCard) |

**Brand accent**: light `#20b2aa`, dark `#9932cc`.

**Rule**: Never hardcode hex colors in components. Use Tailwind classes or CSS variables from tokens.

### Styling Rules

- **No hardcoded hex** in components — use Tailwind classes or CSS variables from tokens
- **Use CSS variables** for dynamic values: `var(--primary)`, `var(--background)`, etc.
- **Follow token layers** — edit hiai-docs first, then sync tokens.css here
- **Tailwind v4** — all classes use v4 syntax

### Accessibility Rules

- **All interactive elements** need keyboard handlers (Enter/Space for buttons, Escape for modals)
- **Confirm modal pattern** for destructive actions (delete, disconnect)
- **Skip-to-content link** on layout root
- **ARIA labels** for icon-only buttons
- **Touch targets** >= 44x44px
- **Respect `prefers-reduced-motion`** for all animations

### Build & Publish

- **Build**: `bun run build` → generates `dist/` via `svelte-package`
- **Publish**: OIDC trusted publishing on tag push (`git tag v*`)
- **Package name**: `@hiai-gg/hiai-ui` (scoped to @hiai-gg org)
- **Entrypoints**:
  - Main: `src/index.ts` (composites barrel)
  - Styles: `src/styles/tokens.css`
  - Primitives: deep-path imports from `src/components/ui/*`

## Environment Variables (none for core package)

The package has no runtime environment variables. All configuration is via design tokens in `tokens.css`.

## Critic Guidelines

When reviewing this package:

- **Do NOT suggest adding hardcoded colors** — enforce use of CSS variables from tokens
- **Do NOT suggest removing deep-path imports** — this breaks tree-shaking for consumers
- **Do NOT suggest adding runtime configuration** — tokens.css is the source of truth
- **Focus on**: a11y compliance, token layer correctness, component API consistency, tree-shaking efficiency
- **Verify**: composites are PascalCase, primitives use deep-path imports, no hardcoded hex colors
- **Check**: all interactive elements have keyboard handlers and proper ARIA attributes

## Known Limitations

- **Source-only package** — consumers must have Vite + Tailwind v4 to build
- **No runtime theme switching** — relies on `.dark` class on `<html>`
- **Observe theme** requires `.theme-observe` class in addition to `.dark`
- **No CSS-in-JS** — all styles via Tailwind classes or tokens.css

## Roadmap

Current focus: stabilization and ecosystem integration. Future work:

- **Token layer enhancements** — add new token mappings as hiai-docs evolves
- **Composite additions** — new admin components as needed by hiai-dashboard/admin
- **A11y audit completion** — ensure all composites meet WCAG 2.1 AA
- **Performance optimization** — minimize CSS bundle size via Tailwind v4 purging

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full, prioritized list of planned work.

## Integration Patterns

### Basic Consumption

```bash
# In consuming project's app.css
git clone https://github.com/HiAi-gg/hiai-ui.git

# Import tokens
@import "../../packages/hiai-ui/src/styles/tokens.css";

# Let Tailwind scan the package
@source "../../packages/hiai-ui/src";
```

### Component Usage

```svelte
<script lang="ts">
  import { Button, Card } from "@hiai-gg/hiai-ui/components/ui/button";
  import { AdminSidebar } from "@hiai-gg/hiai-ui";
</script>

<Button variant="default">Click me</Button>
<Card>Content</Card>
<AdminSidebar />
```

### Theme Usage

```html
<!-- Light theme (default) -->
<html>

<!-- Dark theme -->
<html class="dark">

<!-- Observe theme (dark-first slate) -->
<html class="dark theme-observe">
```

## Security Considerations

- **No runtime secrets** — all configuration via tokens.css
- **No user input in tokens** — tokens.css is static and version-controlled
- **No dynamic CSS injection** — all styles via Tailwind classes
- **Tree-shaking safety** — deep-path imports prevent pulling unused code

## Further Reading

- [hiai-docs](https://github.com/HiAi-gg/hiai-docs) — design system source
- [CONTRIBUTING.md](./CONTRIBUTING.md) — development setup
- [CHANGELOG.md](./CHANGELOG.md) — release history