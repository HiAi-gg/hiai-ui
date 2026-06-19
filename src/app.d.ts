// Ambient declarations for SvelteKit runtime virtuals that this component
// library references. The real implementation is provided by the consuming
// SvelteKit app at runtime; here we only need the types so `svelte-check`
// resolves them when the package is checked in isolation.
declare module "$app/state" {
	/** Reactive page state. Only the fields used by @hiai/ui components are typed. */
	export const page: {
		url: URL;
		params: Record<string, string>;
		route: { id: string | null };
		[key: string]: unknown;
	};
}
