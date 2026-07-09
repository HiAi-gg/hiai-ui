# ContextMenu

A right-click context menu that appears at the cursor position.

## Import

```ts
import * as ContextMenu from "@hiai-gg/hiai-ui/components/ui/context-menu";
```

## Usage

```svelte
<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div class="h-32 w-64 border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground">
      Right-click here
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={() => console.log("Edit")}>Edit</ContextMenu.Item>
    <ContextMenu.Item onSelect={() => console.log("Duplicate")}>Duplicate</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item onSelect={() => console.log("Archive")}>Archive</ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
      <ContextMenu.SubContent>
        <ContextMenu.Item>Sub-action 1</ContextMenu.Item>
        <ContextMenu.Item>Sub-action 2</ContextMenu.Item>
      </ContextMenu.SubContent>
    </ContextMenu.Sub>
  </ContextMenu.Content>
</ContextMenu.Root>
```

## API

| Component | Description |
|-----------|-------------|
| `Root` | Provider. Right-click context provider. |
| `Trigger` | Wraps the trigger area. Right-click opens menu. |
| `Content` | Floating menu at cursor position. `sideOffset` default 4. |
| `Item` | Menu item. Props: `onSelect`, `disabled`, `inset`. |
| `Separator` | Divider. |
| `Group` | Groups items. |
| `Sub` | Sub-menu provider. |
| `SubTrigger` | Opens sub-menu on hover. |
| `SubContent` | Sub-menu content. |
| `CheckboxItem` | Checkable item. Props: `checked`, `onCheckedChange`. |
| `RadioGroup` | Radio group provider. |
| `RadioItem` | Radio item. Props: `value`. |

## Accessibility

- Trigger fires on `contextmenu` event (right-click)
- Same ARIA patterns as DropdownMenu
- Keyboard navigation via arrow keys, Enter to select, Escape to close
