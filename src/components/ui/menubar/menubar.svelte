<script lang="ts">
import { Menubar as MenubarPrimitive } from "bits-ui";
import { cn } from "../../../lib/utils.js";
import type { Snippet } from "svelte";

let {
	ref = $bindable(null),
	class: className,
	children,
	...restProps
}: MenubarPrimitive.RootProps & { children?: Snippet } = $props();
</script>

<MenubarPrimitive.Root
  bind:ref
  class={cn(
    "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-sm",
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</MenubarPrimitive.Root>
