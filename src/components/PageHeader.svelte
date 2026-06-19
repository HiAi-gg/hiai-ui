<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/utils.js";

interface Props {
	title: string;
	description?: string;
	/** Right-aligned actions slot (buttons, etc.). */
	actions?: Snippet;
	class?: string;
}

const { title, description, actions, class: className }: Props = $props();
</script>

<header
  class={cn(
    "flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between",
    className,
  )}
>
  <div class="min-w-0">
    <h1 class="truncate text-2xl font-semibold text-foreground">{title}</h1>
    {#if description}
      <p class="mt-1 text-sm text-muted-foreground">{description}</p>
    {/if}
  </div>

  {#if actions}
    <div class="flex shrink-0 items-center gap-2">
      {@render actions()}
    </div>
  {/if}
</header>
