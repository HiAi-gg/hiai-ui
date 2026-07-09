# Menubar

A top-level horizontal menu bar with nested dropdown menus.

## Import

```ts
import * as Menubar from "@hiai-gg/hiai-ui/components/ui/menubar";
```

## Usage

```svelte
<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onSelect={() => console.log("New")}>New</Menubar.Item>
      <Menubar.Item onSelect={() => console.log("Open")}>Open</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onSelect={() => console.log("Exit")}>Exit</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onSelect={() => console.log("Undo")}>Undo</Menubar.Item>
      <Menubar.Item onSelect={() => console.log("Redo")}>Redo</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>More</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Preferences</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.CheckboxItem>Show Toolbar</Menubar.CheckboxItem>
      <Menubar.CheckboxItem>Show Sidebar</Menubar.CheckboxItem>
      <Menubar.Separator />
      <Menubar.RadioGroup value="auto">
        <Menubar.RadioItem value="auto">Auto</Menubar.RadioItem>
        <Menubar.RadioItem value="light">Light</Menubar.RadioItem>
        <Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
      </Menubar.RadioGroup>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

## API

| Component | Description |
|-----------|-------------|
| `Root` | Horizontal bar container. Props: `loop`, `bind:value`, `dir`. |
| `Menu` | Wraps one menu (Trigger + Content pair). Props: `value`. |
| `Trigger` | Click/hover trigger in the bar. Displays label. |
| `Content` | Dropdown content. `sideOffset` default 4. |
| `Item` | Menu item. Props: `onSelect`, `disabled`, `inset`. |
| `Separator` | Divider. |
| `Group` | Groups items. |
| `Sub` | Sub-menu provider. |
| `SubTrigger` | Opens sub-menu on hover/arrow. |
| `SubContent` | Sub-menu floating content. |
| `CheckboxItem` | Checkable item. |
| `RadioGroup` | Radio group provider. |
| `RadioItem` | Radio item. |

## Accessibility

- Horizontal keyboard navigation between menus (left/right arrows)
- Vertical navigation within menus (up/down arrows)
- Enter/Space to activate, Escape to close
- `role="menubar"` ARIA pattern
