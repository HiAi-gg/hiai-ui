<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";
import { ChevronRight } from "lucide-svelte";

let {
	ref = $bindable(null),
	class: className,
	inset,
	children,
	...restProps
}: ContextMenuPrimitive.SubTriggerProps & { inset?: boolean } = $props();
</script>

<ContextMenuPrimitive.SubTrigger
  bind:ref
  class={cn(
    "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
    inset && "pl-8",
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
  <ChevronRight class="ml-auto h-4 w-4" />
</ContextMenuPrimitive.SubTrigger>
