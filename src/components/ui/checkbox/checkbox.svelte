<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import { Check } from "lucide-svelte";
	import { cn } from "../../../lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children: slot,
		...restProps
	}: Omit<CheckboxPrimitive.RootProps, "children"> & { children?: Snippet } = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked }: { checked: boolean })}
		{#if checked}
			{#if slot}
				{@render slot()}
			{:else}
				<Check class="h-3.5 w-3.5" />
			{/if}
		{/if}
	{/snippet}
</CheckboxPrimitive.Root>
