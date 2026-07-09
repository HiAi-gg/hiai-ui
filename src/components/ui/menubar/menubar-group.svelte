<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: MenubarPrimitive.GroupProps = $props();
</script>

<MenubarPrimitive.Group
  bind:ref
  class={cn("", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</MenubarPrimitive.Group>
