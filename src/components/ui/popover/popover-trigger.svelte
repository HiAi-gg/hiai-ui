<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";

let {
	ref = $bindable(null),
	child,
	children,
	...restProps
}: PopoverPrimitive.TriggerProps & {
	child?: import("svelte").Snippet<[{ props: Record<string, unknown> }]>;
} = $props();
</script>

{#if child}
  {#snippet renderChild(snippetProps: { props: Record<string, unknown> })}
    {@render child?.(snippetProps)}
  {/snippet}
  <PopoverPrimitive.Trigger bind:ref {...restProps} child={renderChild}>
  </PopoverPrimitive.Trigger>
{:else}
  <PopoverPrimitive.Trigger bind:ref {...restProps}>
    {#if children}
      {@render children()}
    {/if}
  </PopoverPrimitive.Trigger>
{/if}
