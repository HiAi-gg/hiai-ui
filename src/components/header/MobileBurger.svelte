<script lang="ts">
	import { Menu, X, Sun, Moon } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cn } from '../../lib/utils.js';
	import LanguageSelector, { type Language } from '../LanguageSelector.svelte';
	import ShareButton from '../ShareButton.svelte';

	export interface MobileNavItem {
		label: string;
		href: string;
		active?: boolean;
	}

	interface Props {
		navItems: MobileNavItem[];
		languages?: Language[];
		currentLang?: string;
		onSelectLang?: (code: string) => void;
		/** Whether to show the theme toggle inside the panel. */
		showThemeToggle?: boolean;
		/** Currently active theme — drives the icon shown in the toggle. */
		dark?: boolean;
		onToggleDark?: () => void;
		shareUrl?: string;
		shareTitle?: string;
		showShare?: boolean;
		/** Convenience alias for `languages.length > 1`. Defaults to true when languages given. */
		showLang?: boolean;
		/** Called when a nav link is clicked. When provided, parent handles routing. */
		onNavigate?: (href: string) => void;
		class?: string;
	}

	let {
		navItems,
		languages,
		currentLang,
		onSelectLang,
		showThemeToggle = false,
		dark = false,
		onToggleDark,
		shareUrl,
		shareTitle,
		showShare = false,
		showLang = true,
		onNavigate,
		class: className
	}: Props = $props();

	let open = $state(false);
	let rootEl = $state<HTMLDivElement | null>(null);

	const showLangSelector = $derived(
		showLang && !!languages && !!currentLang && (languages?.length ?? 0) > 1
	);

	function handleNav(href: string, e: MouseEvent) {
		if (onNavigate) {
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
			e.preventDefault();
			onNavigate(href);
		}
		open = false;
	}

	function handleLangSelect(code: string) {
		onSelectLang?.(code);
		open = false;
	}

	function handleToggleDark() {
		onToggleDark?.();
	}

	function handleClickOutside(event: MouseEvent) {
		if (!open) return;
		if (!(event.target as Element).closest('.mobile-burger-root')) {
			open = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div
	bind:this={rootEl}
	class={cn('mobile-burger-root flex items-center lg:hidden', className)}
>
	<button
		type="button"
		onclick={() => (open = !open)}
		aria-label={open ? 'Close menu' : 'Open menu'}
		aria-expanded={open}
		aria-controls="mobile-burger-panel"
		class={cn(
			'inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors',
			'hover:bg-accent hover:text-accent-foreground',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background'
		)}
	>
		{#if open}
			<X class="h-5 w-5" />
		{:else}
			<Menu class="h-5 w-5" />
		{/if}
	</button>

	{#if open}
		<div
			id="mobile-burger-panel"
			class={cn(
				'absolute inset-x-0 top-full z-50 mt-0 border-b border-border bg-background/95 backdrop-blur-md shadow-lg',
				'overflow-hidden'
			)}
			style="background: color-mix(in srgb, var(--background) 95%, transparent);"
			transition:slide={{ duration: 200 }}
		>
			<nav class="space-y-1 px-4 py-3" aria-label="Mobile">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						onclick={(e) => handleNav(item.href, e)}
						aria-current={item.active ? 'page' : undefined}
						class={cn(
							'block rounded-md px-3 py-2.5 text-base font-medium transition-colors',
							item.active
								? 'bg-accent text-foreground'
								: 'text-muted-foreground hover:bg-accent hover:text-foreground'
						)}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div
				class="flex items-center gap-2 border-t border-border px-4 py-3"
			>
				{#if showLangSelector && languages && currentLang}
					<LanguageSelector
						languages={languages}
						current={currentLang}
						onSelect={handleLangSelect}
					/>
				{/if}
				<div class="flex-1"></div>
				{#if showThemeToggle}
					<button
						type="button"
						onclick={handleToggleDark}
						aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
						aria-pressed={dark}
						title={dark ? 'Light mode' : 'Dark mode'}
						class={cn(
							'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors',
							'hover:bg-accent hover:text-accent-foreground',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background'
						)}
					>
						{#if dark}
							<Sun class="h-4 w-4" />
						{:else}
							<Moon class="h-4 w-4" />
						{/if}
					</button>
				{/if}
				{#if showShare}
					<ShareButton url={shareUrl} title={shareTitle} />
				{/if}
			</div>
		</div>
	{/if}
</div>