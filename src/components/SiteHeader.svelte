<script lang="ts">
	/**
	 * SiteHeader — universal, prop-driven site header for hiai-ui
	 *
	 * Adapted from projects/webs/svelte-app/src/lib/components/SiteHeader.svelte.
	 * Stripped of:
	 *  - $app/state, $app/navigation, getContext('t'|'siteContent'), palettes,
	 *    globalThemeState, nidoStructuredContentSeed (all webs-specific)
	 *  - CrocoNav / HiaiLogo / Logo special-cases
	 *  - Style selector (department dropdown, palette switcher)
	 *  - Page-driven URL query rewriting (design / style / lang persistence)
	 *
	 * Replaced with a single `config` prop + three callbacks. Parent owns state.
	 * Reuses hiai-ui's own LanguageSelector, ShareButton, and ThemeToggle so the
	 * same picker UX is identical across consumers. ThemeToggle is only used as a
	 * fallback when `onToggleDark` is not provided — controlled theme is preferred.
	 */
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import { cn } from '../lib/utils.js';
	import LanguageSelector, { type Language } from './LanguageSelector.svelte';
	import ShareButton from './ShareButton.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	export interface HeaderNavItem {
		label: string;
		href: string;
		active?: boolean;
	}

	export interface LogoConfig {
		/** Optional image URL. When omitted, `alt` is rendered as text. */
		src?: string;
		/** Logo image alt text, or fallback site name when no src. */
		alt: string;
		/** When provided, the logo becomes a clickable link. */
		href?: string;
	}

	export interface SiteHeaderConfig {
		logo: LogoConfig;
		nav?: HeaderNavItem[];
		/** Optional list of available languages. If length <= 1, the selector
		 * is hidden even when `showLangSelector` is true. */
		languages?: Language[];
		/** Active language code. Required when `languages` is provided. */
		currentLang?: string;
		/** Reflects the current theme. Drives the icon + `aria-pressed`. */
		dark?: boolean;
		showThemeToggle?: boolean;
		showLangSelector?: boolean;
		showShareButton?: boolean;
		/** Optional override for the share URL. Defaults to window.location.href. */
		shareUrl?: string;
		/** Optional override for the share title. Defaults to document.title. */
		shareTitle?: string;
		/** Optional share description / body. */
		shareText?: string;
		/** Right-aligned auth area (desktop). Rendered as-is. */
		authSlot?: Snippet;
		/** Auth area in mobile menu. Fallbacks to authSlot if unset. */
		mobileAuthSlot?: Snippet;
	}

	interface Props {
		config: SiteHeaderConfig;
		/** Called when the dark/light toggle button is pressed.
		 * When omitted, the self-contained ThemeToggle is rendered instead. */
		onToggleDark?: () => void;
		/** Called when the user picks a language code from the selector. */
		onSelectLang?: (code: string) => void;
		/** Called when a nav link is clicked. Receives the href; when provided,
		 * the default browser navigation is prevented so the parent can route. */
		onNavigate?: (href: string) => void;
		class?: string;
		authSlot?: Snippet;
		mobileAuthSlot?: Snippet;
	}

	let {
		config,
		onToggleDark,
		onSelectLang,
		onNavigate,
		class: className,
		authSlot,
		mobileAuthSlot
	}: Props = $props();

	let mobileOpen = $state(false);

	const activeAuthSlot = $derived(authSlot ?? config.authSlot);
	const activeMobileAuthSlot = $derived(mobileAuthSlot ?? config.mobileAuthSlot ?? authSlot ?? config.authSlot);

	const showLang = $derived(
		(config.showLangSelector ?? true) && (config.languages?.length ?? 0) > 1
	);
	const showTheme = $derived(config.showThemeToggle ?? true);
	const showShare = $derived(config.showShareButton ?? true);

	function handleNav(href: string, e: MouseEvent) {
		if (onNavigate) {
			e.preventDefault();
			onNavigate(href);
		}
		mobileOpen = false;
	}

	function handleLangSelect(code: string) {
		onSelectLang?.(code);
		mobileOpen = false;
	}

	function handleToggleDark() {
		onToggleDark?.();
	}
</script>

<header
	class={cn(
		'fixed inset-x-0 top-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-sm',
		className
	)}
	style="background: color-mix(in srgb, var(--background) 80%, transparent);"
>
	<div class="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
		<!-- Left zone: Logo -->
		<div class="flex flex-1 items-center min-w-0">
			{#snippet logo()}
				{#if config.logo.src}
					<img
						src={config.logo.src}
						alt={config.logo.alt}
						class="h-8 w-auto object-contain"
					/>
				{:else}
					<span class="truncate text-base font-bold tracking-tight text-foreground">
						{config.logo.alt}
					</span>
				{/if}
			{/snippet}
			{#if config.logo.href}
				<a
					href={config.logo.href}
					class="flex items-center gap-2 transition-opacity hover:opacity-80"
				>
					{@render logo()}
				</a>
			{:else}
				<div class="flex items-center gap-2">
					{@render logo()}
				</div>
			{/if}
		</div>

		<!-- Center zone: desktop nav -->
		<nav class="hidden shrink-0 items-center gap-6 lg:flex" aria-label="Primary">
			{#each config.nav ?? [] as item (item.href)}
				<a
					href={item.href}
					onclick={(e) => handleNav(item.href, e)}
					aria-current={item.active ? 'page' : undefined}
					class={cn(
						'text-sm font-medium transition-colors',
						item.active
							? 'text-foreground'
							: 'text-muted-foreground hover:text-foreground'
					)}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Right zone: desktop controls -->
		<div class="hidden flex-1 items-center justify-end gap-2 lg:flex">
			{#if activeAuthSlot}
				{@render activeAuthSlot()}
			{:else}
				{#if showLang && config.languages && config.currentLang}
					<LanguageSelector
						languages={config.languages}
						current={config.currentLang}
						onSelect={handleLangSelect}
					/>
				{/if}

				{#if showTheme}
					{#if onToggleDark}
						<button
							type="button"
							onclick={handleToggleDark}
							aria-label={config.dark ? 'Switch to light mode' : 'Switch to dark mode'}
							aria-pressed={config.dark ?? false}
							title={config.dark ? 'Light mode' : 'Dark mode'}
							class={cn(
								'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors',
								'hover:bg-accent hover:text-accent-foreground',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background'
							)}
						>
							{#if config.dark}
								<!-- sun -->
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M5.64 18.36l-.71.71M18.36 18.36l-.71-.71M5.64 5.64l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z"
									/>
								</svg>
							{:else}
								<!-- moon -->
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
									/>
								</svg>
							{/if}
						</button>
					{:else}
						<ThemeToggle />
					{/if}
				{/if}

				{#if showShare}
					<ShareButton
						url={config.shareUrl}
						title={config.shareTitle}
						text={config.shareText}
					/>
				{/if}
			{/if}
		</div>

		<!-- Right zone: mobile burger -->
		<div class="flex flex-1 items-center justify-end lg:hidden">
			<button
				type="button"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
				aria-controls="site-header-mobile-menu"
				class={cn(
					'relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
				)}
			>
				<span class="burger" class:burger-open={mobileOpen} aria-hidden="true">
					<span class="burger-line burger-line-top"></span>
					<span class="burger-line burger-line-mid"></span>
					<span class="burger-line burger-line-bot"></span>
				</span>
			</button>
		</div>
	</div>

	<!-- Mobile slide-down panel -->
	{#if mobileOpen}
		<div
			id="site-header-mobile-menu"
			class="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
			style="background: color-mix(in srgb, var(--background) 95%, transparent);"
			transition:slide={{ duration: 200 }}
		>
			{#if config.nav && config.nav.length > 0}
				<nav class="space-y-1 px-4 py-4" aria-label="Mobile">
					{#each config.nav as item (item.href)}
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
			{/if}

			{#if activeMobileAuthSlot}
				<div class="flex flex-col gap-2 border-t border-border px-4 py-4">
					{@render activeMobileAuthSlot()}
				</div>
			{:else}
				<div
					class="flex items-center gap-2 border-t border-border px-4 py-3"
				>
					{#if showLang && config.languages && config.currentLang}
						<LanguageSelector
							languages={config.languages}
							current={config.currentLang}
							onSelect={handleLangSelect}
						/>
					{/if}
					<div class="flex-1"></div>
					{#if showTheme}
						{#if onToggleDark}
							<button
								type="button"
								onclick={handleToggleDark}
								aria-label={config.dark ? 'Switch to light mode' : 'Switch to dark mode'}
								title={config.dark ? 'Light mode' : 'Dark mode'}
								class={cn(
									'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors',
									'hover:bg-accent hover:text-accent-foreground',
									'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								)}
							>
								{#if config.dark}
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M5.64 18.36l-.71.71M18.36 18.36l-.71-.71M5.64 5.64l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
									</svg>
								{:else}
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
									</svg>
								{/if}
							</button>
						{:else}
							<ThemeToggle />
						{/if}
					{/if}
					{#if showShare}
						<ShareButton
							url={config.shareUrl}
							title={config.shareTitle}
							text={config.shareText}
						/>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</header>

<style>
	/* 3-line burger that morphs into an X when open. Lives in the same
	   scoped Svelte component so its classes are locally scoped — the global
	   tokens.css provides the color via currentColor. */
	.burger {
		position: relative;
		display: block;
		width: 20px;
		height: 14px;
	}
	.burger-line {
		position: absolute;
		left: 0;
		display: block;
		height: 2px;
		width: 100%;
		background-color: currentColor;
		border-radius: 1px;
		transition:
			transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
			opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
			top 220ms cubic-bezier(0.4, 0, 0.2, 1),
			bottom 220ms cubic-bezier(0.4, 0, 0.2, 1);
	}
	.burger-line-top {
		top: 0;
	}
	.burger-line-mid {
		top: 50%;
		transform: translateY(-50%);
	}
	.burger-line-bot {
		bottom: 0;
	}
	.burger-open .burger-line-top {
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}
	.burger-open .burger-line-mid {
		opacity: 0;
		transform: translateY(-50%) scaleX(0);
	}
	.burger-open .burger-line-bot {
		bottom: 50%;
		transform: translateY(50%) rotate(-45deg);
	}
</style>