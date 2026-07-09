<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	sideOffset = 4,
	children,
	...restProps
}: ContextMenuPrimitive.SubContentProps = $props();
</script>

<ContextMenuPrimitive.SubContent
  bind:ref
  {sideOffset}
  class={cn(
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</ContextMenuPrimitive.SubContent>
