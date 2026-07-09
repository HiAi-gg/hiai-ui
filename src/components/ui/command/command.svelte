<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	value = $bindable(),
	children,
	...restProps
}: CommandPrimitive.RootProps & { children?: Snippet } = $props();
</script>

<CommandPrimitive.Root
  bind:value
  class="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground"
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.Root>
