<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	child,
	children,
	...restProps
}: MenubarPrimitive.TriggerProps & {
	child?: import("svelte").Snippet<[{ props: Record<string, unknown> }]>;
} = $props();
</script>

{#if child}
  {#snippet renderChild(snippetProps: { props: Record<string, unknown> })}
    {@render child?.(snippetProps)}
  {/snippet}
  <MenubarPrimitive.Trigger bind:ref {...restProps} child={renderChild} class={cn(
    "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
    className
  )}>
  </MenubarPrimitive.Trigger>
{:else}
  <MenubarPrimitive.Trigger bind:ref {...restProps} class={cn(
    "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
    className
  )}>
    {#if children}
      {@render children()}
    {/if}
  </MenubarPrimitive.Trigger>
{/if}
