<script lang="ts">
	/**
	 * LanguageSelector — tokenized composite for hiai-ui
	 *
	 * Adapted from webs/svelte-app/src/lib/components/LanguageSelector.svelte.
	 * Differences:
	 *  - No $app/state, $app/navigation, $lib/i18n, PUBLIC_API_URL — fully self-contained
	 *  - Optional RTL handling: when `current` is in `rtlLanguages`, the dropdown anchors
	 *    to `left-0` instead of `right-0` so the trigger's natural reading edge stays
	 *    visually adjacent to the panel in RTL languages
	 *  - Optional localStorage persistence via `storageKey`; reads on mount, writes on selection
	 *  - Keyboard navigation within the open dropdown (ArrowUp/ArrowDown/Home/End/Enter,
	 *    with wrap-around); Escape closes and returns focus to the trigger
	 *  - Uses Tailwind utility classes mapped to tokens.css variables
	 *  - Flag emoji rendering only (no flagcdn.com dependency) — caller may pass `flag`
	 *    on each language entry; otherwise falls back to a 2-letter ISO code badge
	 */
	import { cn } from '../lib/utils.js';

	export interface Language {
		code: string;
		name: string;
		/** Optional emoji flag (e.g. "🇬🇧"). Falls back to 2-letter code if omitted. */
		flag?: string;
	}

	interface Props {
		languages: Language[];
		current: string;
		onSelect: (code: string) => void;
		class?: string;
		/** Direction the dropdown opens. Defaults to "right". Ignored when current language is RTL. */
		align?: 'left' | 'right';
		/** Language codes that should trigger RTL dropdown alignment. */
		rtlLanguages?: string[];
		/** localStorage key for persisting the selected language. */
		storageKey?: string;
	}

	let {
		languages,
		current,
		onSelect,
		class: className,
		align = 'right',
		rtlLanguages = ['ar', 'he', 'ur', 'fa'],
		storageKey = 'hiai-language'
	}: Props = $props();

	let isOpen = $state(false);
	let rootEl = $state<HTMLDivElement | null>(null);
	let triggerEl = $state<HTMLButtonElement | null>(null);
	let focusedIndex = $state(-1);
	let itemRefs: (HTMLButtonElement | null)[] = $state([]);

	const sorted = $derived([...languages].sort((a, b) => a.name.localeCompare(b.name, 'en')));
	const active = $derived(
		languages.find((l) => l.code === current) ?? {
			code: current,
			name: current.toUpperCase()
		}
	);
	const isRtl = $derived(rtlLanguages.includes(current));
	const dropdownAlignClass = $derived(
		isRtl ? 'left-0' : align === 'right' ? 'right-0' : 'left-0'
	);

	// Hydrate from localStorage on mount. Guarded for SSR + storage-disabled environments.
	$effect(() => {
		if (typeof window === 'undefined') return;
		if (!storageKey) return;
		try {
			const saved = window.localStorage.getItem(storageKey);
			if (saved && saved !== current) {
				onSelect(saved);
			}
		} catch {
			// localStorage may be unavailable (private mode, disabled storage, quota) — ignore
		}
	});

	// When the dropdown opens, prime focusedIndex to the active language (or 0).
	// When it closes, clear the focus marker.
	$effect(() => {
		if (!isOpen) {
			focusedIndex = -1;
			return;
		}
		if (focusedIndex >= 0 && focusedIndex < sorted.length) return;
		const idx = sorted.findIndex((l) => l.code === current);
		focusedIndex = idx >= 0 ? idx : 0;
	});

	// Move DOM focus to the highlighted option whenever focusedIndex changes while open.
	$effect(() => {
		if (!isOpen) return;
		const el = itemRefs[focusedIndex];
		if (el && typeof el.focus === 'function') {
			el.focus();
		}
	});

	function selectLanguage(code: string) {
		isOpen = false;
		if (storageKey && typeof window !== 'undefined') {
			try {
				window.localStorage.setItem(storageKey, code);
			} catch {
				// localStorage may be unavailable — ignore
			}
		}
		onSelect(code);
	}

	function handleClickOutside(event: MouseEvent) {
		if (!isOpen) return;
		if (!(event.target as Element).closest('.lang-selector-root')) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
			event.preventDefault();
			triggerEl?.focus();
			return;
		}

		if (!isOpen) return;
		if (sorted.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % sorted.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = focusedIndex <= 0 ? sorted.length - 1 : focusedIndex - 1;
				break;
			case 'Home':
				event.preventDefault();
				focusedIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				focusedIndex = sorted.length - 1;
				break;
			case 'Enter':
			case ' ':
				if (focusedIndex >= 0 && focusedIndex < sorted.length) {
					event.preventDefault();
					selectLanguage(sorted[focusedIndex].code);
				}
				break;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div
	bind:this={rootEl}
	class={cn('lang-selector-root relative inline-block', className)}
>
	<button
		bind:this={triggerEl}
		type="button"
		onclick={() => (isOpen = !isOpen)}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-label="Select language"
		class={cn(
			'inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-sm text-foreground',
			'transition-colors hover:bg-accent hover:text-accent-foreground',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background'
		)}
	>
		{#if active.flag}
			<span
				class="text-base leading-none"
				style="font-family: 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif;"
				aria-hidden="true"
			>
				{active.flag}
			</span>
		{:else}
			<span
				class="inline-flex h-4 w-5 items-center justify-center rounded-sm border border-border bg-muted text-[10px] font-bold tracking-wider text-muted-foreground"
				aria-hidden="true"
			>
				{active.code.toUpperCase().slice(0, 2)}
			</span>
		{/if}
		<span class="text-xs font-bold uppercase tracking-wider">{active.code}</span>
		<svg
			class={cn('h-3 w-3 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen && sorted.length > 0}
		<div
			role="listbox"
			aria-label="Available languages"
			dir={isRtl ? 'rtl' : 'ltr'}
			class={cn(
				'absolute top-full z-50 mt-2 w-52 max-h-72 overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-lg',
				dropdownAlignClass
			)}
		>
			{#each sorted as lang, i (lang.code)}
				{@const isActive = lang.code === current}
				{@const isFocused = i === focusedIndex}
				<button
					bind:this={itemRefs[i]}
					type="button"
					role="option"
					aria-selected={isActive}
					tabindex={isFocused ? 0 : -1}
					onclick={() => selectLanguage(lang.code)}
					title={lang.name}
					class={cn(
						'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors',
						'hover:bg-accent hover:text-accent-foreground',
						'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground',
						isActive && 'bg-accent/50 font-semibold text-primary'
					)}
				>
					{#if lang.flag}
						<span
							class="text-base leading-none flex-shrink-0"
							style="font-family: 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif;"
							aria-hidden="true"
						>
							{lang.flag}
						</span>
					{:else}
						<span
							class="inline-flex h-4 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-muted text-[10px] font-bold tracking-wider text-muted-foreground"
							aria-hidden="true"
						>
							{lang.code.toUpperCase().slice(0, 2)}
						</span>
					{/if}
					<span class="flex-1 truncate">{lang.name}</span>
					{#if isActive}
						<svg
							class="h-4 w-4 flex-shrink-0 text-primary"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>