<script lang="ts">
	interface ThemeOption {
		id: string;
		name: string;
	}

	interface Props {
		themes?: ThemeOption[];
		current?: string;
		onSelect?: (id: string) => void;
		storageKey?: string;
	}

	let {
		themes = [
			{ id: 'hiai', name: 'HiAi' },
			{ id: 'webs', name: 'Webs' },
		],
		current = 'hiai',
		onSelect,
		storageKey = 'hiai-palette',
	}: Props = $props();

	let selected = $state<string>('');
	let open = $state(false);
	let rootEl: HTMLDivElement | undefined = $state();

	function applyTheme(id: string) {
		if (typeof document === 'undefined') return;
		const html = document.documentElement;
		// Strip any previously-applied theme-* class. The default theme (hiai)
		// is canon from tokens.css — it owns :root, so it requires no class.
		Array.from(html.classList)
			.filter((c) => c.startsWith('theme-'))
			.forEach((c) => html.classList.remove(c));
		if (id !== 'hiai') {
			html.classList.add(`theme-${id}`);
		}
	}

	function select(id: string) {
		if (id === selected) {
			open = false;
			return;
		}
		selected = id;
		open = false;
		applyTheme(id);
		try {
			localStorage.setItem(storageKey, id);
		} catch {
			// localStorage may be unavailable (SSR, private mode) — silent.
		}
		onSelect?.(id);
	}

	function handleDocClick(event: MouseEvent) {
		if (!open) return;
		const target = event.target;
		if (target instanceof Node && rootEl && !rootEl.contains(target)) {
			open = false;
		}
	}

	function handleKey(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}

	$effect(() => {
		// Resolve initial selection from localStorage → prop → fallback 'hiai'.
		// (Runs on mount in the browser; harmless on the server.)
		let initial = current;
		try {
			const saved = localStorage.getItem(storageKey);
			if (saved && themes.some((t) => t.id === saved)) initial = saved;
		} catch {
			// localStorage unavailable — fall through to prop default.
		}
		selected = initial;
		applyTheme(initial);

		document.addEventListener('click', handleDocClick);
		document.addEventListener('keydown', handleKey);
		return () => {
			document.removeEventListener('click', handleDocClick);
			document.removeEventListener('keydown', handleKey);
		};
	});

	const currentName = $derived(
		themes.find((t) => t.id === selected)?.name ?? current
	);
</script>

<div bind:this={rootEl} class="relative inline-block">
	<button
		type="button"
		onclick={(e) => {
			e.stopPropagation();
			open = !open;
		}}
		class="inline-flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label="Select theme palette"
		data-testid="theme-switcher-trigger"
	>
		<span class="text-muted-foreground">Theme:</span>
		<span class="text-foreground">{currentName}</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="opacity-60 transition-transform"
			class:rotate-180={open}
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</button>

	{#if open}
		<ul
			role="listbox"
			aria-label="Available themes"
			class="absolute right-0 z-50 mt-1 min-w-[10rem] overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-lg"
			data-testid="theme-switcher-list"
		>
			{#each themes as theme (theme.id)}
				{@const isActive = theme.id === selected}
				<li role="presentation">
					<button
						type="button"
						role="option"
						aria-selected={isActive}
						onclick={() => select(theme.id)}
						class="flex w-full items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
						class:bg-accent={isActive}
						class:text-accent-foreground={isActive}
						data-theme-id={theme.id}
					>
						<span>{theme.name}</span>
						{#if isActive}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>