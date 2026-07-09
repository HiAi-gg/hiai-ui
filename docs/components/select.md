# Select

A native-select replacement with custom trigger, dropdown items, groups, separators, and keyboard navigation.

## Import

```ts
import { SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectGroupHeading, SelectSeparator, SelectValue } from "@hiai-gg/hiai-ui/components/ui/select";
```

Also available via star import:

```ts
import * as Select from "@hiai-gg/hiai-ui/components/ui/select";
```

## Usage

### Single-select (controlled)

```svelte
<script lang="ts">
  import * as Select from "@hiai-gg/hiai-ui/components/ui/select";
  import { Button } from "@hiai-gg/hiai-ui/components/ui/button";

  let value = $state("");
</script>

<Select.Root type="single" bind:value>
  <Select.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="outline" role="combobox" class="w-[200px] justify-between">
        {value || "Pick a fruit…"}
      </Button>
    {/snippet}
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
    <Select.Item value="cherry">Cherry</Select.Item>
    <Select.Separator />
    <Select.Item value="other">Other</Select.Item>
  </Select.Content>
</Select.Root>

<p>Selected: {value || "none"}</p>
```

### With groups

```svelte
<Select.Root type="single" bind:value>
  <Select.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="outline" class="w-[250px] justify-between">
        {value || "Choose…"}
      </Button>
    {/snippet}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.GroupHeading>Fruits</Select.GroupHeading>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.GroupHeading>Vegetables</Select.GroupHeading>
      <Select.Item value="carrot">Carrot</Select.Item>
      <Select.Item value="broccoli">Broccoli</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>
```

### Multi-select

```svelte
<script lang="ts">
  let selected = $state<string[]>([]);
</script>

<Select.Root type="multiple" bind:value={selected}>
  <!-- ... -->
</Select.Root>
```

## API

| Component | bits-ui Type | Description |
|-----------|-------------|-------------|
| `Root` | `Select.RootProps` | Provider. Props: `type` ("single"\|"multiple"), `bind:value`, `disabled`, `required`, `name` |
| `Trigger` | `Select.TriggerProps` | Button that opens the select. Supports `child` snippet for asChild pattern. |
| `Content` | `Select.ContentProps` | Floating dropdown. Props: `sideOffset` (default 4), `side`, `align`. |
| `Value` | `Select.ValueProps` | Renders the selected value text. Can provide custom children as snippet. |
| `Item` | `Select.ItemProps` | Selectable option. Props: `value` (required), `disabled`, `label`. |
| `Group` | — | Groups items under a heading. |
| `GroupHeading` | — | Label for a group. |
| `Separator` | — | Horizontal divider. |

## Accessibility

- Uses bits-ui's built-in ARIA: `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `listbox`
- Keyboard navigation via arrow keys, Enter to select, Escape to close
- Typeahead search when focused
- Focus trap within content when open

## Styling

All styles use Tailwind v4 token classes — no hardcoded colors. Override via `class` prop.
