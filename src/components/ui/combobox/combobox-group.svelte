<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: ComboboxPrimitive.GroupProps = $props();
</script>

<ComboboxPrimitive.Group
  bind:ref
  class={cn("", className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</ComboboxPrimitive.Group>
