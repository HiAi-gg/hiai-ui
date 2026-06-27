<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	children,
	...restProps
}: Omit<SelectPrimitive.ValueProps, "children"> & { children?: Snippet } = $props();
</script>

<SelectPrimitive.Value {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</SelectPrimitive.Value>
