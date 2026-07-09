# Command

A searchable command palette / quick-actions component. Use for keyboard-driven navigation, search results, or filterable lists.

## Import

```ts
import * as Command from "@hiai-gg/hiai-ui/components/ui/command";
```

## Usage

### Basic command palette

```svelte
<script lang="ts">
  import * as Command from "@hiai-gg/hiai-ui/components/ui/command";

  let selected = $state("");
</script>

<Command.Root bind:value={selected} class="w-72 border rounded-lg shadow-md">
  <Command.Input placeholder="Search commands..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Actions">
      <Command.Item value="copy">Copy</Command.Item>
      <Command.Item value="cut">Cut</Command.Item>
      <Command.Item value="paste">Paste</Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Navigation">
      <Command.Item value="home">Go Home</Command.Item>
      <Command.Item value="settings">Open Settings</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

### Disable filtering (server-side search)

```svelte
<Command.Root shouldFilter={false}>
  <!-- Filtering handled externally -->
</Command.Root>
```

### Custom filter function

```svelte
<script lang="ts">
  function customFilter(value: string, search: string, keywords?: string[]): number {
    // Return 0-1 score; higher = better match
    if (value.toLowerCase().startsWith(search.toLowerCase())) return 1;
    return 0;
  }
</script>

<Command.Root filter={customFilter}>
  <!-- ... -->
</Command.Root>
```

## API

| Component | bits-ui Type | Description |
|-----------|-------------|-------------|
| `Root` | `Command.RootProps` | Provider. Props: `bind:value`, `shouldFilter`, `filter`, `label`, `loop`, `vimBindings`, `disablePointerSelection` |
| `Input` | `Command.InputProps` | Search text input |
| `List` | `Command.ListProps` | Scrollable list container (`max-h-[300px]`) |
| `Empty` | `Command.EmptyProps` | Shown when filter yields no results. Props: `forceMount` |
| `Group` | `Command.GroupProps` | Groups items. Props: `value`, `forceMount` |
| `GroupHeading` | `Command.GroupHeadingProps` | Group label |
| `Item` | `Command.ItemProps` | Selectable option. Props: `value`, `disabled`, `onSelect`, `keywords`, `forceMount` |
| `Separator` | `Command.SeparatorProps` | Divider |
| `Viewport` | `Command.ViewportProps` | Scrollable viewport within List |
| `Loading` | `Command.LoadingProps` | Loading indicator. Props: `progress` (0-100) |

## Accessibility

- `role="application"` on Root
- `role="combobox"`, `aria-autocomplete="list"` on Input
- `role="listbox"` on List
- `role="option"` on Item with `aria-selected`, `aria-disabled`
- Keyboard: arrow keys, Enter to select, Escape to close
- Vim-style bindings enabled by default (Ctrl+J/K)
