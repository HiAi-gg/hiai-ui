<!-- EditorToolbar.svelte — Formatting toolbar for TipTap editor -->
<script lang="ts">
	import type { Editor } from "@tiptap/core";
	import {
		AlignCenter,
		AlignJustify,
		AlignLeft,
		AlignRight,
		Bold,
		ChevronDown,
		Code2,
		Copy,
		Heading1,
		Heading2,
		Heading3,
		Highlighter,
		Image as ImageIcon,
		Italic,
		Link as LinkIcon,
		List,
		ListChecks,
		ListOrdered,
		Loader2,
		Minus,
		Quote,
		Redo,
		Smile,
		Table as TableIcon,
		Type,
		Undo,
	} from "lucide-svelte";
	import LinkDialog from "./LinkDialog.svelte";

	let {
		editor = null,
	}: {
		editor?: Editor | null;
	} = $props();

	// Preset highlight colors.
	const HIGHLIGHT_COLORS = [
		{ name: "Yellow", value: "#fde68a" },
		{ name: "Orange", value: "#fed7aa" },
		{ name: "Red", value: "#fecaca" },
		{ name: "Green", value: "#bbf7d0" },
		{ name: "Blue", value: "#bfdbfe" },
		{ name: "Purple", value: "#e9d5ff" },
		{ name: "Pink", value: "#fbcfe8" },
		{ name: "Gray", value: "#e5e7eb" },
	] as const;

	// Curated list of emojis.
	const EMOJIS = [
		"😀", "😂", "😍", "🤔", "😎",
		"😢", "😡", "🥳", "👍", "👏",
		"🙏", "🔥", "⭐", "✅", "❌",
		"❤️", "🎉", "💡", "📌", "🚀"
	] as const;

	type TextAlignValue = "left" | "center" | "right" | "justify";

	// Dropdown/Popover open states and roots
	let linkDialogOpen = $state(false);
	let highlightPickerOpen = $state(false);
	let highlightPickerRoot = $state<HTMLDivElement | null>(null);
	let emojiPickerOpen = $state(false);
	let emojiPickerRoot = $state<HTMLDivElement | null>(null);
	let tablePickerOpen = $state(false);
	let tablePickerRoot = $state<HTMLDivElement | null>(null);
	let tableHoverRows = $state(0);
	let tableHoverCols = $state(0);
	let headingDropdownOpen = $state(false);
	let headingDropdownRoot = $state<HTMLDivElement | null>(null);
	let listDropdownOpen = $state(false);
	let listDropdownRoot = $state<HTMLDivElement | null>(null);
	let alignDropdownOpen = $state(false);
	let alignDropdownRoot = $state<HTMLDivElement | null>(null);
	let copyConfirmation = $state(false);

	// editorRevision forces reactivity on selection and transactions.
	let editorRevision = $state(0);
	const readEditorRevision = $derived(editorRevision);

	$effect(() => {
		if (!editor) return;
		const bump = () => {
			editorRevision++;
		};
		editor.on("selectionUpdate", bump);
		editor.on("transaction", bump);
		return () => {
			editor.off("selectionUpdate", bump);
			editor.off("transaction", bump);
		};
	});

	// Active states mapping
	const activeStates = $derived.by(() => {
		void readEditorRevision;
		if (!editor) return {} as Record<string, boolean>;
		return {
			bold: editor.isActive("bold"),
			italic: editor.isActive("italic"),
			heading1: editor.isActive("heading", { level: 1 }),
			heading2: editor.isActive("heading", { level: 2 }),
			heading3: editor.isActive("heading", { level: 3 }),
			bulletList: editor.isActive("bulletList"),
			orderedList: editor.isActive("orderedList"),
			taskList: editor.isActive("taskList"),
			blockquote: editor.isActive("blockquote"),
			codeBlock: editor.isActive("codeBlock"),
			link: editor.isActive("link"),
			highlight: editor.isActive("highlight"),
		};
	});

	const activeHeadingLevel = $derived.by<1 | 2 | 3 | null>(() => {
		void readEditorRevision;
		if (!editor) return null;
		if (editor.isActive("heading", { level: 1 })) return 1;
		if (editor.isActive("heading", { level: 2 })) return 2;
		if (editor.isActive("heading", { level: 3 })) return 3;
		return null;
	});

	const activeAlignment = $derived.by<TextAlignValue>(() => {
		void readEditorRevision;
		if (!editor) return "left";
		if (editor.isActive({ textAlign: "center" })) return "center";
		if (editor.isActive({ textAlign: "right" })) return "right";
		if (editor.isActive({ textAlign: "justify" })) return "justify";
		return "left";
	});

	const activeHighlightColor = $derived.by<string | null>(() => {
		void readEditorRevision;
		if (!editor) return null;
		if (!editor.isActive("highlight")) return null;
		const attrs = editor.getAttributes("highlight");
		return attrs.color ?? null;
	});

	function isDisabled(): boolean {
		if (!editor) return true;
		return !editor.isEditable;
	}

	function toggleHighlightPicker() {
		highlightPickerOpen = !highlightPickerOpen;
	}

	function applyHighlight(color: string) {
		if (!editor) return;
		editor.chain().focus().toggleHighlight({ color }).run();
		highlightPickerOpen = false;
	}

	function clearHighlight() {
		if (!editor) return;
		editor.chain().focus().unsetHighlight().run();
		highlightPickerOpen = false;
	}

	function toggleEmojiPicker() {
		emojiPickerOpen = !emojiPickerOpen;
	}

	function insertEmoji(emoji: string) {
		if (!editor) return;
		editor.chain().focus().insertContent(emoji).run();
		emojiPickerOpen = false;
	}

	const TABLE_GRID_MAX = 8;

	function toggleTablePicker() {
		tablePickerOpen = !tablePickerOpen;
		tableHoverRows = 0;
		tableHoverCols = 0;
	}

	function insertTable(rows: number, cols: number) {
		if (!editor) return;
		editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
		tablePickerOpen = false;
	}

	function toggleHeadingDropdown() {
		headingDropdownOpen = !headingDropdownOpen;
	}

	function applyHeading(level: 1 | 2 | 3 | null) {
		if (!editor) return;
		if (level === null) {
			editor.chain().focus().setParagraph().run();
		} else {
			editor.chain().focus().toggleHeading({ level }).run();
		}
		headingDropdownOpen = false;
	}

	function toggleListDropdown() {
		listDropdownOpen = !listDropdownOpen;
	}

	function applyList(kind: "bullet" | "ordered" | "task") {
		if (!editor) return;
		if (kind === "bullet") {
			editor.chain().focus().toggleBulletList().run();
		} else if (kind === "ordered") {
			editor.chain().focus().toggleOrderedList().run();
		} else {
			editor.chain().focus().toggleTaskList().run();
		}
		listDropdownOpen = false;
	}

	function toggleBlockquote() {
		if (!editor) return;
		editor.chain().focus().toggleBlockquote().run();
	}

	function insertHorizontalRule() {
		if (!editor) return;
		editor.chain().focus().setHorizontalRule().run();
	}

	function toggleAlignDropdown() {
		alignDropdownOpen = !alignDropdownOpen;
	}

	function applyAlignment(value: TextAlignValue) {
		if (!editor) return;
		editor.chain().focus().setTextAlign(value).run();
		alignDropdownOpen = false;
	}

	// Undo/Redo functions
	function undo() {
		if (!editor) return;
		editor.chain().focus().undo().run();
	}

	function redo() {
		if (!editor) return;
		editor.chain().focus().redo().run();
	}

	async function copyContent() {
		if (!editor) return;
		const ed = editor as Editor & { getMarkdown?: () => string };
		const content = ed.getMarkdown ? ed.getMarkdown() : editor.getText();
		try {
			await navigator.clipboard.writeText(content);
			copyConfirmation = true;
			setTimeout(() => {
				copyConfirmation = false;
			}, 1500);
		} catch (_err) {
			/* ignore */
		}
	}

	// Image upload
	let imageFileInput = $state<HTMLInputElement | null>(null);
	let imageUploading = $state(false);

	function triggerImageUpload() {
		if (imageUploading) return;
		imageFileInput?.click();
	}

	function handleImageSelected(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		input.value = "";
		if (!file || !editor) return;

		imageUploading = true;
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result;
			if (typeof result === "string") {
				editor!.chain().focus().setImage({ src: result, alt: file.name }).run();
			}
			imageUploading = false;
		};
		reader.onerror = () => {
			imageUploading = false;
		};
		reader.readAsDataURL(file);
	}

	// Click outside to close popovers
	$effect(() => {
		if (
			!highlightPickerOpen &&
			!emojiPickerOpen &&
			!tablePickerOpen &&
			!headingDropdownOpen &&
			!listDropdownOpen &&
			!alignDropdownOpen
		) {
			return;
		}
		function onDocPointer(e: PointerEvent) {
			const target = e.target as Node | null;
			if (!target) return;
			if (highlightPickerOpen && highlightPickerRoot && !highlightPickerRoot.contains(target)) {
				highlightPickerOpen = false;
			}
			if (emojiPickerOpen && emojiPickerRoot && !emojiPickerRoot.contains(target)) {
				emojiPickerOpen = false;
			}
			if (tablePickerOpen && tablePickerRoot && !tablePickerRoot.contains(target)) {
				tablePickerOpen = false;
			}
			if (headingDropdownOpen && headingDropdownRoot && !headingDropdownRoot.contains(target)) {
				headingDropdownOpen = false;
			}
			if (listDropdownOpen && listDropdownRoot && !listDropdownRoot.contains(target)) {
				listDropdownOpen = false;
			}
			if (alignDropdownOpen && alignDropdownRoot && !alignDropdownRoot.contains(target)) {
				alignDropdownOpen = false;
			}
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				highlightPickerOpen = false;
				emojiPickerOpen = false;
				tablePickerOpen = false;
				headingDropdownOpen = false;
				listDropdownOpen = false;
				alignDropdownOpen = false;
			}
		}
		document.addEventListener("pointerdown", onDocPointer);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onDocPointer);
			document.removeEventListener("keydown", onKey);
		};
	});
</script>

{#if editor}
	<div class="toolbar" role="toolbar" aria-label="Text formatting">
		<!-- Undo / Redo -->
		<button
			class="toolbar-btn"
			disabled={isDisabled()}
			onclick={undo}
			title="Undo"
			aria-label="Undo"
			type="button"
		>
			<Undo size={16} />
		</button>
		<button
			class="toolbar-btn"
			disabled={isDisabled()}
			onclick={redo}
			title="Redo"
			aria-label="Redo"
			type="button"
		>
			<Redo size={16} />
		</button>

		<div class="toolbar-divider" aria-hidden="true"></div>

		<!-- Headings Dropdown -->
		<div class="dropdown" bind:this={headingDropdownRoot}>
			<button
				class="toolbar-btn dropdown-trigger"
				class:active={activeHeadingLevel !== null}
				disabled={isDisabled()}
				onclick={toggleHeadingDropdown}
				title="Heading"
				aria-label="Heading"
				aria-haspopup="true"
				aria-expanded={headingDropdownOpen}
				type="button"
			>
				{#if activeHeadingLevel !== null}
					<Heading1 size={16} />
				{:else}
					<Type size={16} />
				{/if}
				<ChevronDown size={14} class="dropdown-chevron" />
			</button>

			{#if headingDropdownOpen}
				<div class="dropdown-popover" role="menu" aria-label="Heading level">
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeHeadingLevel === null}
						role="menuitem"
						onclick={() => applyHeading(null)}
					>
						<Type size={16} />
						<span>Paragraph</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeHeadingLevel === 1}
						role="menuitem"
						onclick={() => applyHeading(1)}
					>
						<Heading1 size={16} />
						<span>Heading 1</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeHeadingLevel === 2}
						role="menuitem"
						onclick={() => applyHeading(2)}
					>
						<Heading2 size={16} />
						<span>Heading 2</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeHeadingLevel === 3}
						role="menuitem"
						onclick={() => applyHeading(3)}
					>
						<Heading3 size={16} />
						<span>Heading 3</span>
					</button>
				</div>
			{/if}
		</div>

		<div class="toolbar-divider" aria-hidden="true"></div>

		<!-- Basic Formats -->
		<button
			class="toolbar-btn"
			class:active={activeStates.bold ?? false}
			disabled={isDisabled()}
			onclick={() => editor?.chain().focus().toggleBold().run()}
			title="Bold"
			aria-label="Bold"
			aria-pressed={activeStates.bold ?? false}
			type="button"
		>
			<Bold size={16} />
		</button>
		<button
			class="toolbar-btn"
			class:active={activeStates.italic ?? false}
			disabled={isDisabled()}
			onclick={() => editor?.chain().focus().toggleItalic().run()}
			title="Italic"
			aria-label="Italic"
			aria-pressed={activeStates.italic ?? false}
			type="button"
		>
			<Italic size={16} />
		</button>

		<!-- Highlight Color Picker -->
		<div class="highlight-picker" bind:this={highlightPickerRoot}>
			<button
				class="toolbar-btn highlight-btn"
				class:active={activeStates.highlight ?? false}
				disabled={isDisabled()}
				onclick={toggleHighlightPicker}
				title="Highlight Color"
				aria-label="Highlight Color"
				aria-pressed={activeStates.highlight ?? false}
				aria-haspopup="true"
				aria-expanded={highlightPickerOpen}
				type="button"
			>
				<Highlighter size={16} />
				{#if activeHighlightColor}
					<span
						class="highlight-dot"
						style:background-color={activeHighlightColor}
						aria-hidden="true"
					></span>
				{/if}
			</button>

			{#if highlightPickerOpen}
				<div class="highlight-popover" role="menu" aria-label="Highlight Color">
					<div class="highlight-swatch-grid">
						{#each HIGHLIGHT_COLORS as color (color.value)}
							<button
								type="button"
								class="highlight-swatch"
								class:selected={activeHighlightColor === color.value}
								style:background-color={color.value}
								title={color.name}
								aria-label={color.name}
								role="menuitem"
								onclick={() => applyHighlight(color.value)}
							></button>
						{/each}
					</div>
					{#if activeHighlightColor !== null}
						<button
							type="button"
							class="highlight-clear"
							role="menuitem"
							onclick={clearHighlight}
						>
							Clear highlight
						</button>
					{/if}
				</div>
			{/if}
		</div>

		<div class="toolbar-divider" aria-hidden="true"></div>

		<!-- Lists Dropdown -->
		<div class="dropdown" bind:this={listDropdownRoot}>
			<button
				class="toolbar-btn dropdown-trigger"
				class:active={(activeStates.bulletList ?? false) || (activeStates.orderedList ?? false) || (activeStates.taskList ?? false)}
				disabled={isDisabled()}
				onclick={toggleListDropdown}
				title="List"
				aria-label="List"
				aria-haspopup="true"
				aria-expanded={listDropdownOpen}
				type="button"
			>
				<List size={16} />
				<ChevronDown size={14} class="dropdown-chevron" />
			</button>

			{#if listDropdownOpen}
				<div class="dropdown-popover" role="menu" aria-label="List options">
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeStates.bulletList ?? false}
						role="menuitem"
						onclick={() => applyList("bullet")}
					>
						<List size={16} />
						<span>Bullet List</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeStates.orderedList ?? false}
						role="menuitem"
						onclick={() => applyList("ordered")}
					>
						<ListOrdered size={16} />
						<span>Ordered List</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeStates.taskList ?? false}
						role="menuitem"
						onclick={() => applyList("task")}
					>
						<ListChecks size={16} />
						<span>Task List</span>
					</button>
				</div>
			{/if}
		</div>

		<!-- Alignment Dropdown -->
		<div class="dropdown" bind:this={alignDropdownRoot}>
			<button
				class="toolbar-btn dropdown-trigger"
				class:active={activeAlignment !== "left"}
				disabled={isDisabled()}
				onclick={toggleAlignDropdown}
				title="Text Align"
				aria-label="Text Align"
				aria-haspopup="true"
				aria-expanded={alignDropdownOpen}
				type="button"
			>
				{#if activeAlignment === "center"}
					<AlignCenter size={16} />
				{:else if activeAlignment === "right"}
					<AlignRight size={16} />
				{:else if activeAlignment === "justify"}
					<AlignJustify size={16} />
				{:else}
					<AlignLeft size={16} />
				{/if}
				<ChevronDown size={14} class="dropdown-chevron" />
			</button>

			{#if alignDropdownOpen}
				<div class="dropdown-popover" role="menu" aria-label="Text alignment">
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeAlignment === "left"}
						role="menuitem"
						onclick={() => applyAlignment("left")}
					>
						<AlignLeft size={16} />
						<span>Align Left</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeAlignment === "center"}
						role="menuitem"
						onclick={() => applyAlignment("center")}
					>
						<AlignCenter size={16} />
						<span>Align Center</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeAlignment === "right"}
						role="menuitem"
						onclick={() => applyAlignment("right")}
					>
						<AlignRight size={16} />
						<span>Align Right</span>
					</button>
					<button
						type="button"
						class="dropdown-item"
						class:selected={activeAlignment === "justify"}
						role="menuitem"
						onclick={() => applyAlignment("justify")}
					>
						<AlignJustify size={16} />
						<span>Justify</span>
					</button>
				</div>
			{/if}
		</div>

		<div class="toolbar-divider" aria-hidden="true"></div>

		<!-- Extra Block Formats -->
		<button
			class="toolbar-btn"
			class:active={activeStates.codeBlock ?? false}
			disabled={isDisabled()}
			onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
			title="Code Block"
			aria-label="Code Block"
			aria-pressed={activeStates.codeBlock ?? false}
			type="button"
		>
			<Code2 size={16} />
		</button>
		<button
			class="toolbar-btn"
			class:active={activeStates.blockquote ?? false}
			disabled={isDisabled()}
			onclick={toggleBlockquote}
			title="Blockquote"
			aria-label="Blockquote"
			aria-pressed={activeStates.blockquote ?? false}
			type="button"
		>
			<Quote size={16} />
		</button>
		<button
			class="toolbar-btn"
			disabled={isDisabled()}
			onclick={insertHorizontalRule}
			title="Horizontal Line"
			aria-label="Horizontal Line"
			type="button"
		>
			<Minus size={16} />
		</button>

		<div class="toolbar-divider" aria-hidden="true"></div>

		<!-- Links -->
		<button
			class="toolbar-btn"
			class:active={activeStates.link ?? false}
			disabled={isDisabled()}
			onclick={() => (linkDialogOpen = true)}
			title="Link"
			aria-label="Link"
			aria-pressed={activeStates.link ?? false}
			type="button"
		>
			<LinkIcon size={16} />
		</button>

		<!-- Tables Grid Picker -->
		<div class="table-picker" bind:this={tablePickerRoot}>
			<button
				class="toolbar-btn"
				disabled={isDisabled()}
				onclick={toggleTablePicker}
				title="Insert Table"
				aria-label="Insert Table"
				aria-haspopup="true"
				aria-expanded={tablePickerOpen}
				type="button"
			>
				<TableIcon size={16} />
			</button>

			{#if tablePickerOpen}
				<div class="table-popover" role="menu" aria-label="Insert Table">
					<div class="table-grid" role="presentation">
						{#each Array(TABLE_GRID_MAX) as _, r}
							{#each Array(TABLE_GRID_MAX) as _, c}
								<button
									type="button"
									class="table-cell"
									class:active={r < tableHoverRows && c < tableHoverCols}
									onmouseenter={() => {
										tableHoverRows = r + 1;
										tableHoverCols = c + 1;
									}}
									onfocus={() => {
										tableHoverRows = r + 1;
										tableHoverCols = c + 1;
									}}
									onclick={() => insertTable(r + 1, c + 1)}
									aria-label={`${r + 1} × ${c + 1}`}
								></button>
							{/each}
						{/each}
					</div>
					<div class="table-grid-label">
						{tableHoverRows > 0 ? `${tableHoverRows} × ${tableHoverCols}` : "Insert Table"}
					</div>
				</div>
			{/if}
		</div>

		<!-- Image Upload (Base64 conversion) -->
		<button
			class="toolbar-btn image-btn"
			class:uploading={imageUploading}
			disabled={isDisabled() || imageUploading}
			onclick={triggerImageUpload}
			title="Insert Image"
			aria-label="Insert Image"
			type="button"
		>
			{#if imageUploading}
				<Loader2 class="h-4 w-4 animate-spin text-primary" />
			{:else}
				<ImageIcon size={16} />
			{/if}
		</button>
		<input
			bind:this={imageFileInput}
			type="file"
			accept="image/*"
			class="visually-hidden-file-input"
			onchange={handleImageSelected}
		/>

		<!-- Emojis Picker -->
		<div class="emoji-picker" bind:this={emojiPickerRoot}>
			<button
				class="toolbar-btn"
				disabled={isDisabled()}
				onclick={toggleEmojiPicker}
				title="Insert Emoji"
				aria-label="Insert Emoji"
				aria-haspopup="true"
				aria-expanded={emojiPickerOpen}
				type="button"
			>
				<Smile size={16} />
			</button>

			{#if emojiPickerOpen}
				<div class="emoji-popover" role="menu" aria-label="Insert Emoji">
					<div class="emoji-grid">
						{#each EMOJIS as emoji (emoji)}
							<button
								type="button"
								class="emoji-button"
								role="menuitem"
								onclick={() => insertEmoji(emoji)}
								aria-label={emoji}
							>
								{emoji}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<div class="toolbar-divider" aria-hidden="true"></div>

		<!-- Copy Markdown Content -->
		<button
			class="toolbar-btn copy-btn"
			class:copied={copyConfirmation}
			disabled={isDisabled()}
			onclick={copyContent}
			title={copyConfirmation ? "Copied!" : "Copy Markdown"}
			aria-label="Copy Markdown"
			type="button"
		>
			<Copy size={16} />
		</button>
	</div>
{/if}

<LinkDialog bind:open={linkDialogOpen} {editor} />

<style>
	.toolbar {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 6px 12px;
		border-bottom: 1px solid var(--border);
		background: var(--card);
		flex-wrap: wrap;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.toolbar-divider {
		width: 1px;
		height: 20px;
		background: var(--border);
		margin: 0 4px;
	}

	.toolbar-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: 6px;
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.toolbar-btn:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.toolbar-btn.active {
		background: var(--accent);
		color: var(--primary);
		font-weight: 600;
	}

	.toolbar-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* Dropdowns */
	.dropdown {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.dropdown-trigger {
		width: auto;
		padding: 0 6px 0 8px;
		gap: 4px;
	}

	:global(.dropdown-chevron) {
		color: var(--muted-foreground);
		transition: transform 0.15s ease;
	}

	.dropdown-popover {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 6px;
		background: var(--popover);
		color: var(--popover-foreground);
		border: 1px solid var(--border);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		min-width: 150px;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 6px 8px;
		font-size: 0.875rem;
		text-align: left;
		background: transparent;
		border: none;
		border-radius: 6px;
		color: var(--popover-foreground);
		cursor: pointer;
		transition: background 0.1s ease;
	}

	.dropdown-item:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.dropdown-item.selected {
		background: var(--accent);
		color: var(--primary);
		font-weight: 500;
	}

	/* Highlight Picker */
	.highlight-picker {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.highlight-dot {
		position: absolute;
		bottom: 4px;
		right: 4px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		border: 1px solid var(--card);
	}

	.highlight-popover {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 8px;
		background: var(--popover);
		color: var(--popover-foreground);
		border: 1px solid var(--border);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		min-width: 160px;
	}

	.highlight-swatch-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 6px;
	}

	.highlight-swatch {
		width: 24px;
		height: 24px;
		border-radius: 6px;
		border: 1px solid var(--border);
		cursor: pointer;
		padding: 0;
		transition: transform 0.1s ease;
	}

	.highlight-swatch:hover {
		transform: scale(1.1);
	}

	.highlight-swatch.selected {
		box-shadow: 0 0 0 2px var(--ring);
	}

	.highlight-clear {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px 8px;
		font-size: 0.75rem;
		color: var(--muted-foreground);
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 4px;
		cursor: pointer;
		margin-top: 2px;
	}

	.highlight-clear:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	/* Hidden file input */
	.visually-hidden-file-input {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.image-btn.uploading {
		color: var(--primary);
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.image-btn :global(.animate-spin) {
		animation: spin 1s linear infinite;
	}

	/* Emoji Picker */
	.emoji-picker {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.emoji-popover {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		padding: 8px;
		background: var(--popover);
		color: var(--popover-foreground);
		border: 1px solid var(--border);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		min-width: 220px;
	}

	.emoji-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 4px;
	}

	.emoji-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		font-size: 1.25rem;
		background: transparent;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		padding: 0;
		transition: background 0.1s ease, transform 0.1s ease;
	}

	.emoji-button:hover {
		background: var(--accent);
		transform: scale(1.08);
	}

	/* Table Picker */
	.table-picker {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.table-popover {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 50;
		padding: 8px;
		background: var(--popover);
		color: var(--popover-foreground);
		border: 1px solid var(--border);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.table-grid {
		display: grid;
		grid-template-columns: repeat(8, 18px);
		grid-auto-rows: 18px;
		gap: 3px;
	}

	.table-cell {
		width: 18px;
		height: 18px;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 3px;
		background: var(--background);
		cursor: pointer;
		transition: background 0.08s ease, border-color 0.08s ease;
	}

	.table-cell.active {
		background: color-mix(in srgb, var(--primary) 35%, transparent);
		border-color: var(--primary);
	}

	.table-grid-label {
		margin-top: 8px;
		text-align: center;
		font-size: 0.75rem;
		color: var(--muted-foreground);
	}

	.copy-btn.copied {
		color: var(--primary);
	}
</style>
