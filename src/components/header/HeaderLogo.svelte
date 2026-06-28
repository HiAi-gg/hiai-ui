<script lang="ts">
	import { cn } from '../../lib/utils.js';

	interface Props {
		/** Optional image URL. When omitted, a colored square + siteName text is rendered. */
		logoSrc?: string;
		/** Site name. Used as image alt and as the text fallback. */
		siteName: string;
		/** When provided, the logo becomes a clickable link. */
		homeHref?: string;
		class?: string;
	}

	let { logoSrc, siteName, homeHref = '/', class: className }: Props = $props();

	const initial = $derived(siteName.trim().charAt(0).toUpperCase() || '?');
</script>

{#snippet inner()}
	{#if logoSrc}
		<img
			src={logoSrc}
			alt={siteName}
			class="h-8 w-auto object-contain"
			loading="eager"
			decoding="async"
		/>
	{:else}
		<span
			aria-hidden="true"
			class={cn(
				'inline-flex h-8 w-8 items-center justify-center rounded-md',
				'bg-primary text-primary-foreground text-sm font-bold tracking-tight'
			)}
		>
			{initial}
		</span>
		<span class="truncate text-base font-bold tracking-tight text-foreground">
			{siteName}
		</span>
	{/if}
{/snippet}

{#if homeHref}
	<a
		href={homeHref}
		class={cn('flex items-center gap-3 transition-opacity hover:opacity-80', className)}
		aria-label={`Go to ${siteName} home`}
	>
		{@render inner()}
	</a>
{:else}
	<div class={cn('flex items-center gap-3', className)}>
		{@render inner()}
	</div>
{/if}