<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/utils.js";

interface Props {
	title?: string;
	description?: string;
	/** Form body — rows of labelled fields. */
	children: Snippet;
	/** Footer actions (Save/Cancel). */
	footer?: Snippet;
	onsubmit?: (e: SubmitEvent) => void;
	class?: string;
}

const {
	title,
	description,
	children,
	footer,
	onsubmit,
	class: className,
}: Props = $props();
</script>

<form
  {onsubmit}
  class={cn("rounded-lg border border-border bg-card", className)}
>
  {#if title || description}
    <div class="border-b border-border px-6 py-4">
      {#if title}
        <h2 class="text-base font-semibold text-card-foreground">{title}</h2>
      {/if}
      {#if description}
        <p class="mt-1 text-sm text-muted-foreground">{description}</p>
      {/if}
    </div>
  {/if}

  <div class="flex flex-col gap-4 px-6 py-5">
    {@render children()}
  </div>

  {#if footer}
    <div class="flex justify-end gap-2 border-t border-border px-6 py-4">
      {@render footer()}
    </div>
  {/if}
</form>
