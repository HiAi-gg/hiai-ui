<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	children,
	...restProps
}: ContextMenuPrimitive.SubProps & { children?: Snippet } = $props();
</script>

<ContextMenuPrimitive.Sub {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</ContextMenuPrimitive.Sub>
