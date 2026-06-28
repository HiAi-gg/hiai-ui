<!-- MarkdownToggle.svelte — Raw Markdown editing view -->
<script lang="ts">
	import { markdownToJson, type EditorOutput } from "$lib/../lib/editor/markdown.js";

	let {
		content = "",
		onUpdate = (_output: EditorOutput) => {},
		placeholder = "Write markdown here…",
		ariaLabel = "Markdown editor",
	}: {
		content?: string;
		onUpdate?: (output: EditorOutput) => void;
		placeholder?: string;
		ariaLabel?: string;
	} = $props();

	let textarea = $state<HTMLTextAreaElement | null>(null);

	function emitUpdate(markdown: string) {
		const json = markdownToJson(markdown);
		onUpdate({ markdown, json });
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		emitUpdate(target.value);
	}
</script>

<div class="markdown-toggle">
	<textarea
		bind:this={textarea}
		value={content}
		oninput={handleInput}
		onkeydown={(e: KeyboardEvent) => {
			if (e.key === "Tab") {
				e.preventDefault();
				const target = e.target as HTMLTextAreaElement;
				const start = target.selectionStart;
				const end = target.selectionEnd;
				target.value = `${target.value.substring(0, start)}	${target.value.substring(end)}`;
				target.selectionStart = target.selectionEnd = start + 1;
				emitUpdate(target.value);
			}
		}}
		class="markdown-textarea"
		spellcheck="false"
		{placeholder}
		aria-label={ariaLabel}
	></textarea>
</div>

<style>
	.markdown-toggle {
		flex: 1;
		display: flex;
	}

	.markdown-textarea {
		flex: 1;
		width: 100%;
		min-height: 400px;
		padding: 24px;
		border: none;
		outline: none;
		resize: none;
		font-family: 'Fira Code', 'Consolas', 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.7;
		color: var(--foreground);
		background: var(--muted);
		tab-size: 4;
	}

	.markdown-textarea::placeholder {
		color: var(--muted-foreground);
	}

	.markdown-textarea:focus {
		background: var(--background);
	}
</style>
