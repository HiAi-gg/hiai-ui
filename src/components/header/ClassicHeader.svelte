<script lang="ts">
	import { cn } from '../../lib/utils.js';
	import HeaderLogo from './HeaderLogo.svelte';
	import HeaderNav from './HeaderNav.svelte';
	import MobileBurger, { type MobileNavItem } from './MobileBurger.svelte';
	import LanguageSelector, { type Language } from '../LanguageSelector.svelte';
	import ShareButton from '../ShareButton.svelte';

	export interface HeaderLogoConfig {
		src?: string;
		alt: string;
		href?: string;
	}

	export interface ClassicHeaderNavItem extends MobileNavItem {}

	export interface ClassicHeaderLanguage {
		code: string;
		name: string;
		nativeName: string;
		flag: string;
	}

	interface Props {
		/** Optional logo image URL. When omitted, a colored square + siteName text is rendered. */
		logo?: string;
		/** Site name. Used as image alt and text fallback for the logo. */
		siteName: string;
		/** Home href for the logo link. Defaults to '/'. */
		homeHref?: string;
		navItems: ClassicHeaderNavItem[];
		languages?: ClassicHeaderLanguage[];
		currentLang?: string;
		onSelectLang?: (code: string) => void;
		/** Whether to show the desktop/mobile theme toggle. */
		showThemeToggle?: boolean;
		/** Whether to show the desktop/mobile language selector. */
		showLangSelector?: boolean;
		/** Whether to show the share button. */
		showShare?: boolean;
		shareUrl?: string;
		shareTitle?: string;
		/** Reflects the current theme. Drives the toggle icon + aria-pressed. */
		dark?: boolean;
		onToggleDark?: () => void;
		/** Called when any nav link is clicked. When provided, default
		 * browser navigation is prevented so the parent can route — except
		 * for middle-click / cmd+click / ctrl+click, which are honored so
		 * users can still open in a new tab. */
		onNavigate?: (href: string) => void;
		class?: string;
	}

	let {
		logo,
		siteName,
		homeHref = '/',
		navItems,
		languages,
		currentLang,
		onSelectLang,
		showThemeToggle = false,
		showLangSelector = false,
		showShare = false,
		shareUrl,
		shareTitle,
		dark = false,
		onToggleDark,
		onNavigate,
		class: className
	}: Props = $props();

	const showLang = $derived(
		showLangSelector && !!languages && !!currentLang && (languages?.length ?? 0) > 1
	);

	// LanguageSelector / ShareButton expect the Language type from LanguageSelector.svelte.
	// Cast our richer classic shape to that type — same shape minus `nativeName`.
	const langsForSelector = $derived(
		languages as unknown as Language[] | undefined
	);

	function handleNav(href: string, e: MouseEvent) {
		if (onNavigate) {
			// Honor middle-click / cmd+click / ctrl+click / shift+click —
			// users expect "open in new tab" semantics for these.
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
			e.preventDefault();
			onNavigate(href);
		}
	}
</script>

<header
	class={cn(
		'fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-card/80 backdrop-blur-sm',
		className
	)}
	style="background: color-mix(in srgb, var(--card) 80%, transparent);"
>
	<div class="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
		<!-- Left zone: Logo -->
		<div class="flex flex-1 items-center min-w-0">
			<HeaderLogo logoSrc={logo} siteName={siteName} homeHref={homeHref} />
		</div>

		<!-- Center zone: desktop nav -->
		<HeaderNav items={navItems} {onNavigate} />

		<!-- Right zone: desktop controls -->
		<div class="hidden flex-1 items-center justify-end gap-1 lg:flex">
			{#if showLang && langsForSelector && currentLang && onSelectLang}
				<LanguageSelector
					languages={langsForSelector}
					current={currentLang}
					onSelect={onSelectLang}
				/>
			{/if}

			{#if showThemeToggle}
				<button
					type="button"
					onclick={onToggleDark}
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
			{/if}

			{#if showShare}
				<ShareButton url={shareUrl} title={shareTitle} />
			{/if}
		</div>

		<!-- Right zone: mobile burger -->
		<MobileBurger
			navItems={navItems}
			languages={langsForSelector}
			{currentLang}
			{onSelectLang}
			{showThemeToggle}
			{dark}
			{onToggleDark}
			{shareUrl}
			{shareTitle}
			{showShare}
			{onNavigate}
		/>
	</div>
</header>