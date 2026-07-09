<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	value = $bindable(),
	children,
	...restProps
}: MenubarPrimitive.RadioGroupProps & { children?: Snippet } = $props();
</script>

<MenubarPrimitive.RadioGroup bind:value {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</MenubarPrimitive.RadioGroup>
