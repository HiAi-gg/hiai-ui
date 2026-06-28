<!-- ConfirmDialog.svelte — Generic confirmation dialog used in place of
     window.confirm() so destructive actions get styled, accessible UI.

     Migration target for the legacy <ConfirmModal /> component. Adds:
       - requireReason: optional textarea, reason passed to onConfirm()
       - busy: spinner + disable controls while async work runs
       - Escape key closes the dialog (unless busy)
-->
<script lang="ts">
	import { Button } from "../button/index";
	import {
		Dialog,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
	} from "../dialog/index";
	import { Textarea } from "../textarea/index";
	import { Loader2 } from "lucide-svelte";

	let {
		open = $bindable(false),
		title,
		description,
		confirmLabel = "Confirm",
		cancelLabel = "Cancel",
		variant = "default",
		busy = false,
		requireReason = false,
		reasonLabel = "Reason",
		reasonPlaceholder = "Provide a reason...",
		onConfirm,
		onCancel,
	}: {
		open?: boolean;
		title: string;
		description?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		variant?: "default" | "destructive";
		busy?: boolean;
		requireReason?: boolean;
		reasonLabel?: string;
		reasonPlaceholder?: string;
		onConfirm?: (reason?: string) => void;
		onCancel?: () => void;
	} = $props();

	let reason = $state("");

	const reasonMissing = $derived(requireReason && reason.trim().length === 0);

	function reset() {
		reason = "";
	}

	function handleConfirm() {
		if (reasonMissing) return;
		onConfirm?.(requireReason ? reason : undefined);
		reset();
	}

	function handleCancel() {
		if (busy) return;
		open = false;
		onCancel?.();
		reset();
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && !busy && open) {
			event.preventDefault();
			handleCancel();
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<Dialog
	bind:open
	onOpenChange={(next: boolean) => {
		if (!next) {
			reset();
			onCancel?.();
		}
	}}
>
	<DialogHeader>
		<DialogTitle>{title}</DialogTitle>
		{#if description}
			<DialogDescription>{description}</DialogDescription>
		{/if}
	</DialogHeader>

	{#if requireReason}
		<div class="grid gap-2 py-2">
			<label for="confirm-dialog-reason" class="text-sm font-medium">
				{reasonLabel}
			</label>
			<Textarea
				id="confirm-dialog-reason"
				bind:value={reason}
				rows={3}
				placeholder={reasonPlaceholder}
				disabled={busy}
			/>
		</div>
	{/if}

	<DialogFooter>
		<Button variant="outline" type="button" onclick={handleCancel} disabled={busy}>
			{cancelLabel}
		</Button>
		<Button
			type="button"
			variant={variant === "destructive" ? "destructive" : "default"}
			onclick={handleConfirm}
			disabled={busy || reasonMissing}
		>
			{#if busy}
				<Loader2 class="mr-1 size-4 animate-spin" />
			{/if}
			{confirmLabel}
		</Button>
	</DialogFooter>
</Dialog>