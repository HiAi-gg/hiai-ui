# Combobox

A searchable select / autocomplete component. Unlike **Command** (a command palette for keyboard-driven actions), Combobox wraps a select-with-search pattern with a text input for filtering options.

## Import

```ts
import * as Combobox from "@hiai-gg/hiai-ui/components/ui/combobox";
```

## Usage

### Single-select

```svelte
<script lang="ts">
  import * as Combobox from "@hiai-gg/hiai-ui/components/ui/combobox";

  let value = $state("");
</script>

<Combobox.Root type="single" bind:value>
  <Combobox.Input placeholder="Search fruits..." />
  <Combobox.Content>
    <Combobox.Item value="apple">Apple</Combobox.Item>
    <Combobox.Item value="banana">Banana</Combobox.Item>
    <Combobox.Item value="cherry">Cherry</Combobox.Item>
    <Combobox.Item value="date">Date</Combobox.Item>
    <Combobox.Item value="elderberry">Elderberry</Combobox.Item>
  </Combobox.Content>
</Combobox.Root>

<p>Selected: {value || "none"}</p>
```

### Multi-select

```svelte
<script lang="ts">
  let selected = $state<string[]>([]);
</script>

<Combobox.Root type="multiple" bind:value={selected}>
  <Combobox.Input placeholder="Select items..." />
  <Combobox.Content>
    <Combobox.Item value="design">Design</Combobox.Item>
    <Combobox.Item value="dev">Development</Combobox.Item>
    <Combobox.Item value="marketing">Marketing</Combobox.Item>
  </Combobox.Content>
</Combobox.Root>

<p>Selected: {selected.join(", ") || "none"}</p>
```

### With groups

```svelte
<Combobox.Root type="single">
  <Combobox.Input placeholder="Search..." />
  <Combobox.Content>
    <Combobox.Group>
      <Combobox.GroupHeading>Fruits</Combobox.GroupHeading>
      <Combobox.Item value="apple">Apple</Combobox.Item>
      <Combobox.Item value="banana">Banana</Combobox.Item>
    </Combobox.Group>
    <Combobox.Separator />
    <Combobox.Group>
      <Combobox.GroupHeading>Vegetables</Combobox.GroupHeading>
      <Combobox.Item value="carrot">Carrot</Combobox.Item>
      <Combobox.Item value="broccoli">Broccoli</Combobox.Item>
    </Combobox.Group>
  </Combobox.Content>
</Combobox.Root>
```

## API

| Component | bits-ui Type | Description |
|-----------|-------------|-------------|
| `Root` | `Combobox.RootProps` | Provider. Props: `type` ("single"\|"multiple"), `bind:value`, `bind:open`, `disabled`, `loop` |
| `Input` | `Combobox.InputProps` | Search text input (sets Combobox apart from Select — editable) |
| `Trigger` | `Combobox.TriggerProps` | Button trigger (alternative to Input). Supports `child` snippet. |
| `Content` | `Combobox.ContentProps` | Floating dropdown. Props: `sideOffset` (default 4), `side`, `align`, `forceMount` |
| `Item` | `Combobox.ItemProps` | Option item. Props: `value` (required), `disabled`, `label` |
| `Group` | — | Groups items under heading |
| `GroupHeading` | — | Group label |
| `Viewport` | — | Scrollable item container |
| `Separator` | — | Divider |
| `ScrollDownButton` | — | Auto-scroll down indicator |
| `ScrollUpButton` | — | Auto-scroll up indicator |

## Combobox vs Command vs Select

| Feature | Combobox | Command | Select |
|---------|----------|---------|--------|
| Editable search input | ✅ | ✅ | ❌ (read-only) |
| Selected value display | Via Input | Via `bind:value` | Via `Value` component |
| Popover/floating | ✅ | ❌ (inline) | ✅ |
| Form submission support | ✅ | ❌ | ✅ |
| Filter/search built-in | ✅ (via Input) | ✅ (via `shouldFilter`) | ❌ |
| Multi-select | ✅ | ❌ | ✅ |

## Accessibility

- `role="combobox"`, `aria-autocomplete="list"` on Input
- `aria-expanded` managed automatically
- Keyboard: type to filter, arrow keys navigate, Enter to select, Escape to close
- Focus trap within content when open
