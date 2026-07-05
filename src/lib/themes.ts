/**
 * @hiai-gg/hiai-ui — Multi-theme registry + applyTheme
 *
 * Mirrors the design tokens declared in `src/styles/tokens.css` (HiAi canon)
 * and `src/styles/theme-webs.css` (Webs "Laser Grid" palette). Components
 * that read `var(--background)`, `var(--primary)`, `var(--ring)`, `var(--card)`,
 * `var(--border)`, `var(--font-heading)`, `var(--font-body)` re-skin
 * automatically — same DOM, same components, only the palette swaps.
 *
 * Two themes ship in v0.1.0:
 *   - hiai: HiAi canon (oklch / shadcn-svelte new-york on slate).
 *     Light primary `#20b2aa` (teal), dark primary `#9932cc` (purple).
 *   - webs: Webs Laser Grid (hot-pink / lime / pure-black).
 *     Light primary `#cc007a`, dark primary `#ff0099`.
 *
 * Dark variants use the flat `--dark-<name>` prefix convention so a single
 * `Record<string, string>` can carry both. `applyTheme` resolves the prefix
 * at runtime based on the `dark` boolean.
 */

export interface ThemeDefinition {
	/** Stable theme id used as the registry key. Lowercase, kebab-case. */
	id: string;
	/** Human-readable name (shown in ThemeSwitcher UI). */
	name: string;
	/** Optional one-liner shown in tooltips / docs. */
	description?: string;
	/**
	 * CSS custom properties. Light variants use the canonical `--name` form;
	 * dark variants are prefixed `--dark-<name>` (e.g. `--dark-background`).
	 * `applyTheme` resolves the prefix based on the `dark` flag.
	 */
	variables: Record<string, string>;
	/** Font stacks applied to `--font-heading` and `--font-body`. */
	fonts?: { heading?: string; body?: string };
}

/* -------------------------------------------------------------------------- */
/*  THEME_HIAI — canon (mirrors src/styles/tokens.css :root + .dark)          */
/* -------------------------------------------------------------------------- */

export const THEME_HIAI: ThemeDefinition = {
	id: 'hiai',
	name: 'HiAi',
	description: 'Default HiAi ecosystem teal/purple theme',
	variables: {
		/* light — from tokens.css :root */
		'--background': 'oklch(1 0 0)',
		'--foreground': 'oklch(0.145 0.013 285.82)',
		'--card': 'oklch(1 0 0)',
		'--card-foreground': 'oklch(0.145 0.013 285.82)',
		'--popover': 'oklch(1 0 0)',
		'--popover-foreground': 'oklch(0.145 0.013 285.82)',
		'--primary': '#20b2aa',
		'--primary-foreground': 'oklch(0.985 0.002 247.86)',
		'--primary-hover': '#1c9c95',
		'--secondary': 'oklch(0.97 0.004 264.54)',
		'--secondary-foreground': 'oklch(0.205 0.042 265.76)',
		'--muted': 'oklch(0.97 0.004 264.54)',
		'--muted-foreground': 'oklch(0.556 0.019 270.87)',
		'--accent': 'oklch(0.97 0.004 264.54)',
		'--accent-foreground': 'oklch(0.205 0.042 265.76)',
		'--destructive': 'oklch(0.577 0.245 27.33)',
		'--destructive-foreground': 'oklch(0.985 0.002 247.86)',
		'--border': 'oklch(0.922 0.007 264.54)',
		'--input': 'oklch(0.922 0.007 264.54)',
		'--ring': '#20b2aa',
		'--radius': '0.625rem',

		'--color-primary': '#20b2aa',
		'--color-secondary': 'oklch(0.97 0.004 264.54)',
		'--color-bg': 'oklch(1 0 0)',
		'--color-surface': 'oklch(0.985 0.002 247.86)',

		/* dark — from tokens.css .dark (prefixed --dark-<name>) */
		'--dark-background': 'oklch(0.16 0 0)',
		'--dark-foreground': 'oklch(0.96 0 0)',
		'--dark-card': 'oklch(0.20 0 0)',
		'--dark-card-foreground': 'oklch(0.96 0 0)',
		'--dark-popover': 'oklch(0.24 0 0)',
		'--dark-popover-foreground': 'oklch(0.96 0 0)',
		'--dark-primary': '#9932cc',
		'--dark-primary-foreground': 'oklch(0.98 0 0)',
		'--dark-primary-hover': '#a94ed6',
		'--dark-secondary': 'oklch(0.24 0 0)',
		'--dark-secondary-foreground': 'oklch(0.96 0 0)',
		'--dark-muted': 'oklch(0.26 0 0)',
		'--dark-muted-foreground': 'oklch(0.74 0 0)',
		'--dark-accent': 'oklch(0.28 0 0)',
		'--dark-accent-foreground': 'oklch(0.96 0 0)',
		'--dark-destructive': 'oklch(0.58 0.18 25)',
		'--dark-destructive-foreground': 'oklch(0.98 0.01 25)',
		'--dark-border': 'oklch(0.32 0 0)',
		'--dark-input': 'oklch(0.34 0 0)',
		'--dark-ring': '#9932cc',

		'--dark-color-primary': '#9932cc',
		'--dark-color-secondary': 'oklch(0.24 0 0)',
		'--dark-color-bg': 'oklch(0.16 0 0)',
		'--dark-color-surface': 'oklch(0.20 0 0)',
	},
	fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
};

/* -------------------------------------------------------------------------- */
/*  THEME_WEBS — Webs Laser Grid (mirrors src/styles/theme-webs.css)          */
/* -------------------------------------------------------------------------- */

export const THEME_WEBS: ThemeDefinition = {
	id: 'webs',
	name: 'Webs Laser Grid',
	description: 'Webs platform hot pink laser-grid theme',
	variables: {
		/* light — from theme-webs.css .theme-webs */
		'--background': '#ffffff',
		'--foreground': '#0000b3',
		'--card': '#ffffff',
		'--card-foreground': '#0000b3',
		'--popover': '#ffffff',
		'--popover-foreground': '#0000b3',
		'--primary': '#cc007a',
		'--primary-foreground': '#ffffff',
		'--primary-hover': '#b3006b',
		'--secondary': '#f0f0f0',
		'--secondary-foreground': '#0000b3',
		'--muted': '#f0f0f0',
		'--muted-foreground': '#006600',
		'--accent': '#999900',
		'--accent-foreground': '#ffffff',
		'--destructive': '#cc007a',
		'--destructive-foreground': '#ffffff',
		'--border': '#e0e0e0',
		'--input': '#e0e0e0',
		'--ring': '#ff0099',
		'--radius': '0.5rem',

		'--color-primary': '#cc007a',
		'--color-secondary': '#f0f0f0',
		'--color-bg': '#ffffff',
		'--color-surface': '#f0f0f0',

		/* dark — from theme-webs.css .theme-webs.dark (prefixed --dark-<name>) */
		'--dark-background': '#000000',
		'--dark-foreground': '#ffffff',
		'--dark-card': '#1a1a1a',
		'--dark-card-foreground': '#ffffff',
		'--dark-popover': '#1a1a1a',
		'--dark-popover-foreground': '#ffffff',
		'--dark-primary': '#ff0099',
		'--dark-primary-foreground': '#000000',
		'--dark-primary-hover': '#ff33ad',
		'--dark-secondary': '#1a1a1a',
		'--dark-secondary-foreground': '#ffffff',
		'--dark-muted': '#1a1a1a',
		'--dark-muted-foreground': '#00ff00',
		'--dark-accent': '#ffff00',
		'--dark-accent-foreground': '#000000',
		'--dark-destructive': '#ff0099',
		'--dark-destructive-foreground': '#000000',
		'--dark-border': '#333333',
		'--dark-input': '#333333',
		'--dark-ring': '#ff0099',

		'--dark-color-primary': '#ff0099',
		'--dark-color-secondary': '#1a1a1a',
		'--dark-color-bg': '#000000',
		'--dark-color-surface': '#1a1a1a',
	},
	fonts: {
		heading: "'Righteous', 'Zen Dots', sans-serif",
		body: "'Inter', sans-serif",
	},
};

/* -------------------------------------------------------------------------- */
/*  Registry                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * All built-in themes keyed by id. Consumers can extend by spreading:
 *   const registry = { ...THEME_REGISTRY, acme: THEME_ACME };
 */
export const THEME_REGISTRY: Record<string, ThemeDefinition> = {
	hiai: THEME_HIAI,
	webs: THEME_WEBS,
};

/* -------------------------------------------------------------------------- */
/*  applyTheme                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Apply a theme's CSS custom properties to `document.documentElement`.
 *
 * Resolution rules:
 *   - For each `theme.variables` entry:
 *       - If `dark === true`  and the key starts with `--dark-`, strip the
 *         prefix and set the resulting base key (e.g. `--dark-background`
 *         → set `--background`).
 *       - If `dark === false` and the key does NOT start with `--dark-`,
 *         set the key as-is.
 *       - Otherwise skip (e.g. a light-mode call never writes `--dark-*`).
 *   - Fonts from `theme.fonts` are written to `--font-heading` / `--font-body`.
 *   - `color-scheme` is set to `'dark'` or `'light'` so native form controls
 *     and scrollbars match.
 *   - The `.dark` class on `<html>` is toggled so frameworks that branch on
 *     it (Tailwind `dark:` variant, shadcn-svelte `.dark` selectors) still work.
 *
 * Unknown theme ids are a no-op. SSR-safe (guarded by `typeof document`).
 */
export function applyTheme(id: string, dark: boolean): void {
	if (typeof document === 'undefined') return;

	const theme = THEME_REGISTRY[id];
	if (!theme) return;

	const root = document.documentElement;

	// 1. Apply palette variables, resolving the --dark- prefix per mode.
	for (const [key, value] of Object.entries(theme.variables)) {
		if (dark && key.startsWith('--dark-')) {
			const lightKey = key.replace('--dark-', '--');
			root.style.setProperty(lightKey, value);
		} else if (!dark && !key.startsWith('--dark-')) {
			root.style.setProperty(key, value);
		}
	}

	// 2. Apply font stacks as CSS vars so stylesheets can pick them up.
	if (theme.fonts?.heading) {
		root.style.setProperty('--font-heading', theme.fonts.heading);
	}
	if (theme.fonts?.body) {
		root.style.setProperty('--font-body', theme.fonts.body);
	}

	// 3. Native form-control / scrollbar color scheme.
	root.style.setProperty('color-scheme', dark ? 'dark' : 'light');

	// 4. `.dark` class toggle for Tailwind / shadcn-svelte selectors.
	root.classList.toggle('dark', dark);
}