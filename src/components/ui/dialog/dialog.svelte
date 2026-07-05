<script lang="ts">
import { setContext } from "svelte";
import type { Snippet } from "svelte";

let {
	open = $bindable(false),
	onOpenChange,
	children,
}: {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: Snippet;
} = $props();

function close() {
	open = false;
	onOpenChange?.(false);
}

setContext("DIALOG_CONTEXT", {
	get open() { return open; },
	set open(v) { open = v; onOpenChange?.(v); },
	close
});

$effect(() => {
	if (open) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
	return () => {
		document.body.style.overflow = "";
	};
});
</script>

{#if children}
	{@render children()}
{/if}
