# Popover

A floating container that appears near a trigger element. **Highest priority primitive.**

## Import

```ts
import * as Popover from "@hiai-gg/hiai-ui/components/ui/popover";
```

## Usage

### Uncontrolled (default)

```svelte
<Popover.Root>
  <Popover.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="outline">Open Popover</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <div class="space-y-2">
      <h3 class="font-medium">Popover Title</h3>
      <p class="text-sm text-muted-foreground">Popover content goes here.</p>
    </div>
  </Popover.Content>
</Popover.Root>
```

### Controlled (bind:open)

```svelte
<script lang="ts">
  import * as Popover from "@hiai-gg/hiai-ui/components/ui/popover";
  import { Button } from "@hiai-gg/hiai-ui/components/ui/button";

  let open = $state(false);
</script>

<Popover.Root bind:open>
  <Popover.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="outline">
        {open ? "Close" : "Open"} Popover
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Close>
      <Button variant="ghost" size="sm">Close</Button>
    </Popover.Close>
    <p class="text-sm">Controlled popover content.</p>
  </Popover.Content>
</Popover.Root>
```

### With form content

```svelte
<Popover.Root>
  <Popover.Trigger>
    {#snippet child(triggerProps)}
      <Button {...triggerProps.props} variant="outline">Edit Dimensions</Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-80">
    <form class="space-y-4">
      <div class="space-y-2">
        <Label for="width">Width</Label>
        <Input id="width" placeholder="100%" />
      </div>
      <div class="space-y-2">
        <Label for="height">Height</Label>
        <Input id="height" placeholder="auto" />
      </div>
      <Button type="submit">Apply</Button>
    </form>
  </Popover.Content>
</Popover.Root>
```

## API

| Component | bits-ui Type | Description |
|-----------|-------------|-------------|
| `Root` | `Popover.RootProps` | Provider. Props: `bind:open`, `onOpenChange`. |
| `Trigger` | `Popover.TriggerProps` | Opens popover. Props: `openOnHover`, `openDelay`, `closeDelay`. |
| `Content` | `Popover.ContentProps` | Floating container with animations. Props: `sideOffset` (default 4), `side`, `align`, `forceMount`. |
| `Close` | `Popover.CloseProps` | Close button inside content. Supports `child` snippet. |

## Controlled vs Uncontrolled

- **Uncontrolled**: bits-ui manages open state internally. Wrap in a `Popover.Root` without `bind:open`.
- **Controlled**: Pass `bind:open` to manage state from parent. Use `<Popover.Close>` to close programmatically.

## Accessibility

- Uses Floating UI for positioning with boundary detection
- Focus trap when content is open
- Escape key closes
- Click outside closes (configurable via `interactOutsideBehavior`)
