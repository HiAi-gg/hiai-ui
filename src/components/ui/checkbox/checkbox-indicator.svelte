<script lang="ts">
	import { Check } from "lucide-svelte";
	import { cn } from "../../../lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	class={cn("flex items-center justify-center text-current", className)}
	{...restProps}
>
	<Check class="h-3.5 w-3.5" />
</div>
