<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";

let {
	ref = $bindable(null),
	children,
	...restProps
}: CommandPrimitive.LoadingProps = $props();
</script>

<CommandPrimitive.Loading bind:ref {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</CommandPrimitive.Loading>
