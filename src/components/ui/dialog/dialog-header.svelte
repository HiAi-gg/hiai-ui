<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../../lib/utils.js";

const {
	class: className,
	children,
	...restProps
}: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
