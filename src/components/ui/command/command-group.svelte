<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: CommandPrimitive.GroupProps = $props();
</script>

<CommandPrimitive.Group
  bind:ref
  class={cn(
    "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.Group>
