<!-- LinkDialog.svelte — Modal dialog to set/edit a link on the active Tiptap selection -->
<script lang="ts">
	import type { Editor } from "@tiptap/core";
	import { Button } from "$lib/../components/ui/button/index.js";
	import {
		Dialog,
		DialogFooter,
		DialogHeader,
		DialogTitle,
	} from "$lib/../components/ui/dialog/index.js";
	import { Input } from "$lib/../components/ui/input/index.js";

	let {
		open = $bindable(false),
		editor = null,
		label = "Link",
		urlLabel = "Enter URL",
		cancelLabel = "Cancel",
		saveLabel = "Save",
	}: {
		open?: boolean;
		editor?: Editor | null;
		label?: string;
		urlLabel?: string;
		cancelLabel?: string;
		saveLabel?: string;
	} = $props();

	let url = $state("");
	let inputEl = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (open && editor) {
			const previousUrl = editor.getAttributes("link").href ?? "";
			url = previousUrl;
			queueMicrotask(() => inputEl?.focus());
		}
	});

	function close() {
		open = false;
	}

	function handleCancel() {
		close();
	}

	function handleApply() {
		if (!editor) {
			close();
			return;
		}
		const trimmed = url.trim();
		if (trimmed === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
		} else {
			const normalized = /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)
				? trimmed
				: `https://${trimmed}`;

			const { from, to } = editor.state.selection;
			if (from === to) {
				editor
					.chain()
					.focus()
					.insertContent({
						type: "text",
						text: normalized,
						marks: [{ type: "link", attrs: { href: normalized } }],
					})
					.run();
			} else {
				editor
					.chain()
					.focus()
					.extendMarkRange("link")
					.setLink({ href: normalized })
					.run();
			}
		}
		close();
	}
</script>

<Dialog bind:open>
	<DialogHeader>
		<DialogTitle>{label}</DialogTitle>
	</DialogHeader>
	<div class="link-dialog-body">
		<label for="link-url" class="link-dialog-label">
			{urlLabel}
		</label>
		<Input
			id="link-url"
			bind:ref={inputEl}
			bind:value={url}
			type="url"
			placeholder="https://example.com"
			onkeydown={(e: KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); handleApply(); } }}
		/>
	</div>
	<DialogFooter>
		<Button variant="outline" type="button" onclick={handleCancel}>
			{cancelLabel}
		</Button>
		<Button type="button" onclick={handleApply}>
			{saveLabel}
		</Button>
	</DialogFooter>
</Dialog>

<style>
	.link-dialog-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0 0 1rem 0;
	}

	.link-dialog-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--foreground);
	}
</style>
