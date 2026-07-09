<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";
import { ChevronDown } from "lucide-svelte";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: ComboboxPrimitive.ScrollDownButtonProps = $props();
</script>

<ComboboxPrimitive.ScrollDownButton
  bind:ref
  class={cn("flex cursor-default items-center justify-center py-1", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDown class="h-4 w-4" />
  {/if}
</ComboboxPrimitive.ScrollDownButton>
