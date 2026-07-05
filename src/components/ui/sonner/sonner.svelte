<script lang="ts">
	// Thin wrapper around svelte-sonner's Toaster, themed with hiai-ui tokens.
	import { Toaster } from 'svelte-sonner';

	let {
		position = 'bottom-right',
		richColors = true,
		closeButton = true,
	}: {
		position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
		richColors?: boolean;
		closeButton?: boolean;
	} = $props();
</script>

<Toaster
	{position}
	{richColors}
	{closeButton}
	theme="system"
	toastOptions={{
		classes: {
			toast: 'group toast !bg-background !text-foreground !border-border !shadow-lg',
			title: 'text-sm font-semibold',
			description: '!text-muted-foreground text-xs',
			actionButton: '!bg-primary !text-primary-foreground',
			cancelButton: '!bg-muted !text-muted-foreground',
			success: '!text-success',
			error: '!text-destructive',
		},
	}}
/>
