<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	sideOffset = 4,
	children,
	...restProps
}: MenubarPrimitive.ContentProps = $props();
</script>

<MenubarPrimitive.Content
  bind:ref
  {sideOffset}
  class={cn(
    "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</MenubarPrimitive.Content>
