<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: CommandPrimitive.ViewportProps = $props();
</script>

<CommandPrimitive.Viewport
  bind:ref
  class={cn("py-1", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.Viewport>
