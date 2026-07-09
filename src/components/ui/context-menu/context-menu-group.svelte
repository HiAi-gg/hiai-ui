<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: ContextMenuPrimitive.GroupProps = $props();
</script>

<ContextMenuPrimitive.Group
  bind:ref
  class={cn("", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</ContextMenuPrimitive.Group>
