<script lang="ts">
	import Skeleton from './skeleton.svelte';
	import { cn } from '../../../lib/utils.js';

	let {
		lines = 3,
		class: className = '',
	}: {
		lines?: number;
		class?: string;
	} = $props();
</script>

<div class={cn('space-y-2', className)}>
	{#each Array(lines) as _, i (i)}
		<Skeleton class="h-4" style="width: {i === lines - 1 ? '75%' : '100%'}" />
	{/each}
</div>
