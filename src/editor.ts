// Editor surface — not on the main barrel. Import from
// `@hiai-gg/hiai-ui/editor` so consumers of EmptyState/PageHeader do not
// load svelte-tiptap (whose "." export has no default/import condition).

export { default as HiAiEditor } from "./components/editor/HiAiEditor.svelte";
export { default as EditorToolbar } from "./components/editor/EditorToolbar.svelte";
export { default as LinkDialog } from "./components/editor/LinkDialog.svelte";
export { default as MarkdownToggle } from "./components/editor/MarkdownToggle.svelte";
export {
	getEditorExtensions,
	editorExtensions,
} from "./lib/editor/editorExtensions.js";
export { markdownToJson, type EditorOutput } from "./lib/editor/markdown.js";
