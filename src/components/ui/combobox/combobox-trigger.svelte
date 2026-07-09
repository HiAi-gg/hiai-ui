<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	child,
	children,
	...restProps
}: ComboboxPrimitive.TriggerProps & {
	child?: import("svelte").Snippet<[{ props: Record<string, unknown> }]>;
} = $props();
</script>

{#if child}
  {#snippet renderChild(snippetProps: { props: Record<string, unknown> })}
    {@render child?.(snippetProps)}
  {/snippet}
  <ComboboxPrimitive.Trigger bind:ref {...restProps} child={renderChild} class={cn(
    "flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    className
  )}>
  </ComboboxPrimitive.Trigger>
{:else}
  <ComboboxPrimitive.Trigger bind:ref {...restProps} class={cn(
    "flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    className
  )}>
    {#if children}
      {@render children()}
    {/if}
  </ComboboxPrimitive.Trigger>
{/if}
