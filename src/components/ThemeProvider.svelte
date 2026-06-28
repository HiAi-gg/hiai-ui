<!--
	@hiai-gg/hiai-ui — ThemeProvider

	Svelte 5 runes-based theme provider. Mounts once near the root of any
	SvelteKit / Svelte app and:

	  - applies the active theme palette (via applyTheme) to <html> on mount,
	  - reads/writes the chosen theme + dark mode to localStorage so the choice
	    survives reloads,
	  - exposes `setTheme` / `toggleDark` helpers so children can drive it
	    (typically via a button or a ThemeSwitcher composite).

	Storage layout (per `storageKey`):
	  - <storageKey>-theme → theme id (e.g. "hiai" | "webs")
	  - <storageKey>-dark  → "true" | "false"

	The component renders its `children` snippet as the only output, so it is a
	transparent wrapper — no DOM of its own is injected.
-->
<script lang="ts">
	import { untrack, type Snippet } from 'svelte';
	import { applyTheme } from '../lib/themes.js';

	interface Props {
		/** Page content rendered inside the provider. */
		children?: Snippet;
		/** Theme id used when no value is in localStorage. */
		defaultTheme?: string;
		/**
		 * Storage key prefix. Both the theme and the dark-mode flag are stored
		 * under this key with a `-theme` / `-dark` suffix to avoid clashing
		 * with other apps on the same origin.
		 */
		storageKey?: string;
	}

	let {
		children,
		defaultTheme = 'hiai',
		storageKey = 'hiai-ui-theme',
	}: Props = $props();

	// `untrack` makes the intent explicit: we want the *initial* value of the
	// `defaultTheme` prop only. Subsequent prop changes are ignored — the
	// chosen theme is owned by localStorage from that point on, and is
	// updated via `setTheme()` / `toggleDark()`.
	let themeId = $state(untrack(() => defaultTheme));
	let isDark = $state(false);

	function setTheme(id: string): void {
		themeId = id;
		try {
			localStorage.setItem(`${storageKey}-theme`, id);
		} catch {
			// localStorage may be unavailable (SSR, private mode, quota) — silent.
		}
		applyTheme(id, isDark);
	}

	function toggleDark(): void {
		isDark = !isDark;
		try {
			localStorage.setItem(`${storageKey}-dark`, String(isDark));
		} catch {
			// localStorage may be unavailable — silent.
		}
		applyTheme(themeId, isDark);
	}

	// Initialize from localStorage on mount, then apply. Runs once in the
	// browser; harmless on the server because applyTheme is SSR-guarded.
	$effect(() => {
		try {
			const savedTheme = localStorage.getItem(`${storageKey}-theme`);
			const savedDark = localStorage.getItem(`${storageKey}-dark`);
			if (savedTheme) themeId = savedTheme;
			if (savedDark) isDark = savedDark === 'true';
		} catch {
			// localStorage unavailable — fall through to defaults.
		}
		applyTheme(themeId, isDark);
	});
</script>

{@render children?.()}