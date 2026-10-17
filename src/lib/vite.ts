/**
 * Consumer Vite helper. svelte-tiptap's package.json only publishes
 * `types` + `svelte` conditions (no `default`/`import`), so Vite SSR
 * fails with "has no known '.' export" when the editor graph is loaded.
 * bits-ui and lucide-svelte ship compiled .svelte files that esbuild
 * cannot pre-bundle.
 *
 * Apply with `plugins: [hiaiUi(), sveltekit()]` in the consuming app.
 * Editor consumers still import `@hiai-gg/hiai-ui/editor`; this helper
 * does not pull that graph by itself.
 */

export const HIAI_UI_OPTIMIZE_DEPS_EXCLUDE = [
	"lucide-svelte",
	"bits-ui",
	"svelte-tiptap",
	"@hiai-gg/hiai-ui",
] as const;

export const HIAI_UI_SSR_NO_EXTERNAL = ["svelte-tiptap"] as const;

export function hiaiUi() {
	return {
		name: "hiai-ui",
		config() {
			return {
				optimizeDeps: {
					exclude: [...HIAI_UI_OPTIMIZE_DEPS_EXCLUDE],
				},
				ssr: {
					noExternal: [...HIAI_UI_SSR_NO_EXTERNAL],
				},
			};
		},
	};
}
