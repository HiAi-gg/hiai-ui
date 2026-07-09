<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

let {
	ref = $bindable(null),
	child,
	children,
	...restProps
}: ContextMenuPrimitive.TriggerProps & {
	child?: import("svelte").Snippet<[{ props: Record<string, unknown> }]>;
} = $props();
</script>

{#if child}
  {#snippet renderChild(snippetProps: { props: Record<string, unknown> })}
    {@render child?.(snippetProps)}
  {/snippet}
  <ContextMenuPrimitive.Trigger bind:ref {...restProps} child={renderChild}>
  </ContextMenuPrimitive.Trigger>
{:else}
  <ContextMenuPrimitive.Trigger bind:ref {...restProps}>
    {#if children}
      {@render children()}
    {/if}
  </ContextMenuPrimitive.Trigger>
{/if}
