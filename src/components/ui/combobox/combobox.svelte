<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	value = $bindable(),
	children,
	...restProps
}: ComboboxPrimitive.RootProps & { children?: Snippet } = $props();
</script>

<ComboboxPrimitive.Root bind:value={value as any} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</ComboboxPrimitive.Root>
