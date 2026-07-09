<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	child,
	children,
	...restProps
}: PopoverPrimitive.CloseProps & {
	child?: import("svelte").Snippet<[{ props: Record<string, unknown> }]>;
} = $props();
</script>

{#if child}
  {#snippet renderChild(snippetProps: { props: Record<string, unknown> })}
    {@render child?.(snippetProps)}
  {/snippet}
  <PopoverPrimitive.Close bind:ref {...restProps} child={renderChild} class={cn("", className)}>
  </PopoverPrimitive.Close>
{:else}
  <PopoverPrimitive.Close bind:ref {...restProps} class={cn("", className)}>
    {#if children}
      {@render children()}
    {/if}
  </PopoverPrimitive.Close>
{/if}
