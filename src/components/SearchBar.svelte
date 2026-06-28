<script lang="ts">
import { Search, X } from "lucide-svelte";
import { cn } from "../lib/utils.js";

const {
  class: className,
  onSearch,
  placeholder = "Search..."
}: {
  class?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
} = $props();

let query = $state("");
let inputEl = $state<HTMLInputElement | null>(null);

function clearQuery() {
	query = "";
	inputEl?.focus();
}
</script>

<div class={cn("relative", className)}>
  <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <input
    bind:this={inputEl}
    type="text"
    bind:value={query}
    onkeydown={(e: KeyboardEvent) => {
      if (e.key === "Enter" && query.trim()) onSearch?.(query.trim());
    }}
    placeholder={placeholder}
    class={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent pl-9 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      query ? "pr-9" : "pr-3"
    )}
    onfocus={() => {
      // Click/tap into the field — the global Cmd+K handler is
      // registered in the root layout and works from any page.
    }}
  />
  {#if query}
    <button
      type="button"
      onclick={clearQuery}
      class="absolute right-2 top-1/2 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label="Clear search"
      title="Clear search"
    >
      <X class="size-3.5" />
    </button>
  {/if}
</div>