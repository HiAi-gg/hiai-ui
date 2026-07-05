<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../lib/utils.js';

	export interface FooterLink {
		label: string;
		href: string;
		external?: boolean;
	}

	export interface FooterColumn {
		title: string;
		links: FooterLink[];
	}

	export interface SiteFooterConfig {
		brand?: {
			name: string;
			logo?: string;
			tagline?: string;
		};
		columns: FooterColumn[];
		asideSlot?: Snippet;
		copyright?: string;
	}

	interface Props {
		config: SiteFooterConfig;
		class?: string;
		asideSlot?: Snippet;
	}

	let { config, class: className, asideSlot }: Props = $props();

	const activeAsideSlot = $derived(asideSlot ?? config.asideSlot);
</script>

<footer class={cn('border-t border-border bg-background py-12', className)}>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
			{#if config.brand}
				<div class="flex flex-col gap-2">
					{#if config.brand.logo}
						<img
							src={config.brand.logo}
							alt={config.brand.name}
							class="h-8 w-auto object-contain self-start"
						/>
					{:else}
						<h3 class="text-lg font-semibold text-foreground">{config.brand.name}</h3>
					{/if}
					{#if config.brand.tagline}
						<p class="text-sm text-muted-foreground">
							{config.brand.tagline}
						</p>
					{/if}
				</div>
			{/if}

			{#each config.columns as column}
				<div>
					<h4 class="text-sm font-semibold text-foreground">{column.title}</h4>
					<ul class="mt-3 space-y-2 text-sm text-muted-foreground">
						{#each column.links as link}
							<li>
								<a
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener noreferrer' : undefined}
									class="transition-colors hover:text-foreground"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}

			{#if activeAsideSlot}
				<div class="flex flex-col gap-2">
					{@render activeAsideSlot()}
				</div>
			{/if}
		</div>

		{#if config.copyright}
			<div class="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
				{config.copyright}
			</div>
		{/if}
	</div>
</footer>
