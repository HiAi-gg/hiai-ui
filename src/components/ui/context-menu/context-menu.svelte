<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	children,
	...restProps
}: ContextMenuPrimitive.RootProps & { children?: Snippet } = $props();
</script>

<ContextMenuPrimitive.Root {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</ContextMenuPrimitive.Root>
