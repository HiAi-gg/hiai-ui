<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: CommandPrimitive.GroupHeadingProps = $props();
</script>

<CommandPrimitive.GroupHeading
  bind:ref
  class={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.GroupHeading>
