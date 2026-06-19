# @hiai/ui

Единственный канонический UI-пакет экосистемы HiAi. Дизайн-эталон — **hiai-docs**
(oklch, shadcn-svelte new-york / slate). Source-only (без компиляции): потребитель
импортирует исходник, его Vite + Tailwind v4 собирают.

> План и статус: [`HIAI_UI_PACKAGE_PLAN.md`](../../projects/HIAI_UI_PACKAGE_PLAN.md) ·
> правила: [`HIAI_CONVENTIONS.md`](../../projects/HIAI_CONVENTIONS.md).

## Слои

| Слой | Где | Импорт |
|---|---|---|
| **Токены** | `src/styles/tokens.css` | `@import "@hiai/ui/styles/tokens.css";` |
| **Примитивы** (shadcn) | `src/components/ui/*` | `import { Button } from "@hiai/ui/components/ui/button";` |
| **Композиты** | `src/components/*` | `import { AdminSidebar, StatsCard } from "@hiai/ui";` |
| **Редактор** | `src/components/editor/*` | `import TipexEditor from "@hiai/ui/components/editor/TipexEditor.svelte";` |
| **Stores / lib** | `src/stores`, `src/lib` | `import { authStore, cn } from "@hiai/ui";` |

Примитивы и редактор — только deep-path (не в главном barrel), чтобы не тянуть
`bits-ui`/`lucide`/`tiptap` при SSR без надобности.

## Как подключить (контракт — выполняет каждый hiai-проект)

1. Добавить зависимость:
   ```jsonc
   // package.json
   "dependencies": { "@hiai/ui": "workspace:*" }
   ```
2. Импортировать токены в корневом `app.css` (после Tailwind):
   ```css
   @import "tailwindcss";
   @import "@hiai/ui/styles/tokens.css";
   ```
3. Дать Tailwind v4 просканировать классы пакета — в `app.css`:
   ```css
   @source "../../../packages/hiai-ui/src";
   ```
   (путь — относительно файла; поправь под глубину проекта).
4. Использовать компоненты из `@hiai/ui` / `@hiai/ui/components/ui/*`.
5. **Удалить локальные дубли** компонентов и токенов.
6. Тема: класс `.dark` на `<html>` (toggle через `ThemeToggle`); для observe — `.theme-observe`.

## Канон токенов

`tokens.css` — точная выжимка `hiai-docs/frontend/src/app.css`. **Менять дизайн →
править сначала там, затем синхронить сюда.** Слои внутри файла:

| Слой | Содержание |
|---|---|
| `:root` / `.dark` | канон docs: `--background/foreground/card/popover/primary/secondary/muted/accent/destructive/border/input/ring/radius`, app-токены (`--color-bg/surface`), `--highlight-default`, `--hljs-*` |
| semantic add-on | `--primary-hover`, `--success`, `--warning`, `--info`, `--violet` (+`-foreground`) — аддитивно, не вместо docs |
| `.theme-observe` | dark-first slate-вариант для hiai-observe |
| `@theme` | маппинг токенов в Tailwind v4 (`bg-primary`, `text-muted-foreground`, `rounded-lg`…) + шкала `--radius-{sm,md,lg,xl}` |
| base | document (`html/body`, `::selection`, `.skip-link`, date-inputs), `.metric-*` (StatsCard), TipTap/ProseMirror база (нужна редактору) |

Бренд-акцент: light `#20b2aa`, dark `#9932cc`.

## Проверка

```bash
bun run check   # svelte-kit sync && svelte-check — гейт пакета (0 ошибок)
```

## Заметки

- `AdminHeader`/`AdminSidebar` ссылаются на рантайм-виртуал SvelteKit `$app/state`
  (только `page.url.pathname` для подсветки активного пункта). Типы объявлены ambient
  в `src/app.d.ts`; реализацию даёт SvelteKit-приложение-потребитель. Развязка через
  проп `currentPath` — кандидат на будущий рефактор.

## Publishing

This package auto-publishes to npm on push to `main` via GitHub Actions.
To publish manually: `bun run build && npm publish --access public`.
