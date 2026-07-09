<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	children,
	...restProps
}: ContextMenuPrimitive.RadioGroupProps & { children?: Snippet } = $props();
</script>

<ContextMenuPrimitive.RadioGroup {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</ContextMenuPrimitive.RadioGroup>
