<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";
import { ChevronUp } from "lucide-svelte";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: ComboboxPrimitive.ScrollUpButtonProps = $props();
</script>

<ComboboxPrimitive.ScrollUpButton
  bind:ref
  class={cn("flex cursor-default items-center justify-center py-1", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronUp class="h-4 w-4" />
  {/if}
</ComboboxPrimitive.ScrollUpButton>
