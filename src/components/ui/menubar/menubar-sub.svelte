<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	children,
	...restProps
}: MenubarPrimitive.SubProps & { children?: Snippet } = $props();
</script>

<MenubarPrimitive.Sub {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</MenubarPrimitive.Sub>
