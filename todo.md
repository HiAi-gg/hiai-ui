# @hiai-gg/hiai-ui — todo.md

> **Живой статус задач.** Обновляется при каждой сессии.
> **Связано:** [AGENTS.md](./AGENTS.md) · [INDEX.md](../../INDEX.md) · [implementation-plan.md](./docs/implementation-plan.md)
> **Примечание:** Этот пакет — shared UI design system в monorepo `packages/hiai-ui`. v0.0.4 stable.

---

## ✅ Выполнено

### UI-1: Bootstrap + design tokens

| Задача | Статус | Доказательство |
|---|---|---|
| Initialize Svelte 5 + SvelteKit 2.60+ workspace | ✅ DONE | `svelte.config.js`, `tsconfig.json` |
| Extract design tokens from hiai-docs | ✅ DONE | `src/styles/tokens.css` — 5 layers (`:root` / `.dark` / `.theme-observe` / `@theme` / `base`) |
| Tailwind v4 token mappings | ✅ DONE | `@theme` block in `tokens.css` (`bg-primary`, `text-muted-foreground`, `rounded-lg`, `--radius-*`) |
| OIDC trusted publishing setup | ✅ DONE | `0.0.3` published via GitHub Actions on tag push |
| Source-only package model | ✅ DONE | `package.json` exports `.` → `./src/index.ts` (post v0.0.4 fix) |

### UI-2: shadcn-svelte primitives

| Задача | Статус | Доказательство |
|---|---|---|
| Button primitive + duality fix | ✅ DONE | `src/components/ui/button/button.svelte` (merged index.svelte into button.svelte) |
| Card primitive | ✅ DONE | `src/components/ui/card/*` |
| Input, Badge, Dialog, DropdownMenu, Label, Switch, Tabs, Textarea | ✅ DONE | `src/components/ui/*` (deep-path imports for tree-shaking) |
| Badge export pattern consistency | ✅ DONE | Standard primitives export pattern |
| Naming conventions | ✅ DONE | PascalCase composites, standard primitives export |

### UI-3: composites (10)

| Задача | Статус | Доказательство |
|---|---|---|
| AdminSidebar | ✅ DONE | Auto-version from `package.json` (v0.0.4 fix) |
| AdminHeader | ✅ DONE | `src/components/AdminHeader.svelte` |
| StatsCard (with `.metric-*` classes) | ✅ DONE | `src/components/StatsCard.svelte` + base layer in tokens.css |
| StatusBadge (provisioning/ready/running restored) | ✅ DONE | v0.0.4 restored statuses |
| ConfirmModal (Escape + backdrop close restored) | ✅ DONE | v0.0.4 a11y restoration |
| ThemeToggle | ✅ DONE | `.dark` class toggle |
| DataTable | ✅ DONE | Generic table composite |
| PageHeader | ✅ DONE | Section header pattern |
| EmptyState | ✅ DONE | Empty/zero-data state |
| SettingsForm | ✅ DONE | Form layout composite |
| TipexEditor + EditorToolbar (barrel re-export) | ✅ DONE | v0.0.4 added to barrel |

### UI-4: accessibility & quality

| Задача | Статус | Доказательство |
|---|---|---|
| Keyboard handlers (Enter/Space/Escape) | ✅ DONE | All interactive elements |
| Confirm modal pattern for destructive actions | ✅ DONE | `ConfirmModal` component |
| Skip-to-content link | ✅ DONE | `.skip-link` in base layer |
| ARIA labels for icon-only buttons | ✅ DONE | Audit complete |
| Touch targets >= 44x44px | ✅ DONE | All interactive components |
| `prefers-reduced-motion` respect | ✅ DONE | All animations |

### UI-5: release & docs

| Задача | Статус | Доказательство |
|---|---|---|
| CHANGELOG.md | ✅ DONE | v0.0.1 → v0.0.4 documented |
| CONTRIBUTING.md | ✅ DONE | `CONTRIBUTING.md` (previously typo'd as CONTRIBUTOR.md in AGENTS.md) |
| Rename package `@hiai/ui` → `@hiai-gg/hiai-ui` | ✅ DONE | v0.0.2 (initial rename), AGENTS.md & CHANGELOG reference |
| English-translated documentation | ✅ DONE | All docs (AGENTS.md, README.md, CHANGELOG.md) |
| Security audit (`.gitignore`, `LICENSE`) | ✅ DONE | Both files present |
| v0.0.3 publish to npm | ✅ DONE | OIDC trusted publishing |
| v0.0.4 publish (broken barrel fix + restoration) | ✅ DONE | `package.json` exports fixed, StatusBadge/ConfirmModal/AdminSidebar restored, TipexEditor+EditorToolbar added to barrel |

**Итого: 5/5 phases complete.** Package stable at v0.0.4.

---

## 🟡 В процессе

> Нет активных задач. Все 5 фаз UI-1…UI-5 завершены.

---

## 📋 Запланировано

| ID | Задача | Приоритет | Effort | Зависит от |
|---|---|---|---|---|
| **FIX-NAME** | Update AGENTS.md examples to use `@hiai-gg/hiai-ui` consistently (some references still say `@hiai/ui`) | 🟡 | 30 min | — |
| **CHART-CARD** | New composite `ChartCard` — wraps StatsCard pattern with embedded SVG/chart slot (no external chart library) | 🟢 | 1d | UI-3 stable |
| **TOKENS-AUDIT** | Periodic sync audit: compare `tokens.css` against hiai-docs `app.css` (drift check) | 🟢 | 0.5d | — |
| **A11Y-AA** | Full WCAG 2.1 AA audit pass on all composites (contrast ratios, focus order, screen-reader labels) | 🟢 | 2d | UI-4 |

### Roadmap references

- [`docs/implementation-plan.md`](./docs/implementation-plan.md) — full 5-phase plan (UI-1 … UI-5, all completed)

### Token sync note

When `hiai-docs/frontend/src/app.css` changes:
1. Update hiai-docs first
2. Sync to `packages/hiai-ui/src/styles/tokens.css`
3. Run `bun run check` to verify Tailwind v4 picks up changes

---

## 📚 Источники

- [AGENTS.md](./AGENTS.md) — agent operating instructions
- [CHANGELOG.md](./CHANGELOG.md) — version history (v0.0.1 → v0.0.4)
- [CONTRIBUTING.md](./CONTRIBUTING.md) — development setup
- [README.md](./README.md) — package overview & consumption contract
- [docs/implementation-plan.md](./docs/implementation-plan.md) — phased plan (UI-1…UI-5)
- [SECURITY.md](./SECURITY.md), [LICENSE](./LICENSE), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — standard docs

---

> **Важно:** Этот файл — оперативный tracker. Не для open-source публикации (если package публикуется в npm — `.gitignore` его или экспортировать в release notes).
