<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	sideOffset = 4,
	children,
	...restProps
}: SelectPrimitive.ContentProps = $props();
</script>

<SelectPrimitive.Content
  bind:ref
  {sideOffset}
  class={cn(
    "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
    className
  )}
  {...restProps}
>
  <SelectPrimitive.Viewport class="p-1">
    {#if children}
      {@render children()}
    {/if}
  </SelectPrimitive.Viewport>
</SelectPrimitive.Content>
