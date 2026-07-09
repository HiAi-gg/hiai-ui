<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	children,
	...restProps
}: MenubarPrimitive.MenuProps & { children?: Snippet } = $props();
</script>

<MenubarPrimitive.Menu {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</MenubarPrimitive.Menu>
