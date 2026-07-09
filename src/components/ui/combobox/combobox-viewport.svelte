<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: ComboboxPrimitive.ViewportProps = $props();
</script>

<ComboboxPrimitive.Viewport
  bind:ref
  class={cn("p-1", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</ComboboxPrimitive.Viewport>
