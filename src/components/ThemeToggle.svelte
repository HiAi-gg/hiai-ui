<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { applyTheme } from '../lib/themes.js';

	let {
		storageKey = 'hiai-theme',
		themeId = 'hiai',
		dark = $bindable(false),
	}: {
		storageKey?: string;
		themeId?: string;
		dark?: boolean;
	} = $props();

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		applyTheme(themeId, dark);
		try {
			localStorage.setItem(storageKey, dark ? 'dark' : 'light');
		} catch {
			// Storage may be unavailable (Safari private mode, SSR, quota).
			// Theme still applies in-memory for this session.
		}
	}

	$effect(() => {
		let saved: string | null = null;
		try {
			saved = localStorage.getItem(storageKey);
		} catch {
			// Storage may be unavailable — fall through to OS preference.
		}
		const prefersDark =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches;
		dark = saved === 'dark' || (!saved && prefersDark);
		document.documentElement.classList.toggle('dark', dark);
		applyTheme(themeId, dark);
	});
</script>

<button
	onclick={toggle}
	class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm hover:bg-accent hover:text-accent-foreground"
	aria-label="Toggle theme"
>
	{#if dark}
		<Sun class="h-4 w-4" />
	{:else}
		<Moon class="h-4 w-4" />
	{/if}
</button>
