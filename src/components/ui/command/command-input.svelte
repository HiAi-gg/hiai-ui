<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	...restProps
}: CommandPrimitive.InputProps = $props();
</script>

<CommandPrimitive.Input
  bind:ref
  aria-label={restProps["aria-label"] ?? "Command input"}
  class={cn(
    "flex h-10 w-full rounded-md bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  {...restProps}
/>
