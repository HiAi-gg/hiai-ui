# DropdownMenu

A click-triggered menu with items, sub-menus, separators, checkboxes, and radio groups.

## Import

```ts
import * as DropdownMenu from "@hiai-gg/hiai-ui/components/ui/dropdown-menu";
```

## Usage

### Basic menu

```svelte
<script lang="ts">
  import * as DropdownMenu from "@hiai-gg/hiai-ui/components/ui/dropdown-menu";
  import { Button } from "@hiai-gg/hiai-ui/components/ui/button";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="outline" size="sm">
        Options
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={() => console.log("View")}>View</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => console.log("Edit")}>Edit</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => console.log("Duplicate")}>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onSelect={() => console.log("Delete")}>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### With icons and sub-menus

```svelte
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="ghost" size="icon">
        <Settings class="h-4 w-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Item>
      <User class="h-4 w-4" /> Profile
    </DropdownMenu.Item>
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Item>Sub-action 1</DropdownMenu.Item>
        <DropdownMenu.Item>Sub-action 2</DropdownMenu.Item>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

## API

| Component | bits-ui Type | Description |
|-----------|-------------|-------------|
| `Root` | `DropdownMenu.RootProps` | Provider. Props: `bind:open`. |
| `Trigger` | `DropdownMenu.TriggerProps` | Click trigger. Supports `child` snippet. |
| `Content` | `DropdownMenu.ContentProps` | Floating menu. Props: `sideOffset` (default 4), `side`, `align`. |
| `Item` | `DropdownMenu.ItemProps` | Menu item. Props: `onSelect`, `disabled`, `inset`. |
| `Group` | — | Groups items. |
| `Separator` | — | Divider. |
| `Sub` | — | Nested sub-menu provider. |
| `SubTrigger` | — | Opens sub-menu on hover. |
| `SubContent` | — | Sub-menu content container. |

## Accessibility

- `role="menu"`, `role="menuitem"` ARIA attributes
- Keyboard: arrow keys navigate, Enter/Space selects, Escape closes
- Focus management on open/close
