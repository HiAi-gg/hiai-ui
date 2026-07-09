<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	open = $bindable(),
	children,
	...restProps
}: PopoverPrimitive.RootProps & { children?: Snippet } = $props();
</script>

<PopoverPrimitive.Root bind:open {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</PopoverPrimitive.Root>
