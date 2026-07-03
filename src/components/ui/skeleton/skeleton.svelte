<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn } from "../../../lib/utils.js";

	let {
		class: className = '',
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={cn('animate-pulse rounded-md bg-muted', className)} {...restProps}>
	{#if children}{@render children()}{/if}
</div>
