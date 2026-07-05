<script lang="ts">
import { getContext } from "svelte";
import type { Snippet } from "svelte";
import { cn } from "../../../lib/utils.js";

let {
	class: className,
	children,
	...restProps
}: {
	class?: string;
	children?: Snippet;
	[key: string]: any;
} = $props();

const ctx = getContext<{ open: boolean; close: () => void }>("DIALOG_CONTEXT");
if (!ctx) {
	throw new Error("DialogContent must be used within a Dialog component");
}

let contentRef = $state<HTMLDivElement | null>(null);

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape") ctx.close();
}

function handleBackdropClick(e: MouseEvent) {
	if (contentRef && !contentRef.contains(e.target as Node)) {
		ctx.close();
	}
}
</script>

{#if ctx.open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center"
    onkeydown={handleKeydown}
    onclick={handleBackdropClick}
  >
    <div class="fixed inset-0 bg-black/80" aria-hidden="true"></div>
    <div
      bind:this={contentRef}
      class={cn(
        "relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
        className
      )}
      role="dialog"
      aria-modal="true"
      {...restProps}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{/if}
