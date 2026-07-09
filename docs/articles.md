# Articles in hiai-ui

## Article Content Model

Articles in the hiai ecosystem are stored as structured TipTap/ProseMirror JSON documents.

### TiptapDoc / ArticleContentJson

The root document follows the ProseMirror JSON schema:
- `{ type: "doc", content: [...] }`

**Supported Node Types:**
- `paragraph` — text paragraph
- `heading` — levels 1, 2, 3 (configured in StarterKit)
- `bulletList` / `orderedList` — standard lists
- `taskList` / `taskItem` — checkbox lists (nested supported)
- `codeBlock` — syntax-highlighted code (via lowlight)
- `image` — inline images
- `table` / `tableRow` / `tableHeader` / `tableCell` — resizable tables
- `horizontalRule` — thematic break

**Supported Mark Types:**
- `bold`, `italic`, `code` — standard inline formatting
- `link` — hyperlinks (class `doc-link`, openOnClick disabled)
- `highlight` — multicolor text highlighting
- `textAlign` — alignment on headings and paragraphs

### TypeScript Types (from hiai-ui)

```
TiptapDoc = { type: "doc"; content: JSONContent[] }
JSONContent = { type: string; attrs?: Record<string, unknown>; content?: JSONContent[]; marks?: Mark[]; text?: string }
```

## Markdown ↔ TipTap JSON Conversion

The file `src/lib/editor/markdown.ts` provides:

```ts
function markdownToJson(markdown: string): JSONContent
```

This function:
- Parses markdown into a ProseMirror document using `@tiptap/markdown`
- Uses the same extension set as the WYSIWYG editor (shared `editorExtensions`)
- The MarkdownManager singleton is lazily created on first call (SSR-safe)
- Browser-only — relies on `window.DOMParser`

**Example:**

Markdown input:
```markdown
# Hello World

This is an **article** with a [link](https://example.com).

- Item 1
- Item 2
```

JSON output:
```json
{
  "type": "doc",
  "content": [
    { "type": "heading", "attrs": { "level": 1 }, "content": [{ "type": "text", "text": "Hello World" }] },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "This is an " },
        { "type": "text", "marks": [{ "type": "bold" }], "text": "article" },
        { "type": "text", "text": " with a " },
        { "type": "text", "marks": [{ "type": "link", "attrs": { "href": "https://example.com", "class": "doc-link" } }], "text": "link" },
        { "type": "text", "text": "." }
      ]
    },
    {
      "type": "bulletList",
      "content": [
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Item 1" }] }] },
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Item 2" }] }] }
      ]
    }
  ]
}
```

## Content Requirements

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Article title (used in SEO `<title>`) |
| `slug` | string | URL-friendly identifier, kebab-case |
| `contentJson` | JSONContent | ProseMirror document JSON |
| `contentMarkdown` | string (optional) | Source markdown if editing in markdown mode |
| `locale` | string | ISO language code (e.g., `en`, `pt`) |
| `status` | `'draft' | 'published' | 'archived'` | Publication status |

**Slug Conventions:**
- Format: `{locale}/{article-slug}` (e.g., `en/getting-started`)
- Kebab-case only
- Must be unique per locale

**Metadata Shape:**
```ts
{
  title: string;
  description?: string;
  ogImage?: string;
  author?: string;
  publishedAt?: string;   // ISO date
  updatedAt?: string;      // ISO date
}
```

## Translation Flow

Articles support a multi-language model:

```ts
{
  sourceLocale: string;  // e.g., "en" — the original language
  translations: Record<string, {
    title: string;
    contentJson: JSONContent;
    contentMarkdown?: string;
    status: 'draft' | 'published' | 'archived';
  }>;
}
```

- The **source locale** article is always complete
- Translations are generated via AI pipeline and stored in the `translations` map
- Each translation has its own status (can be `draft` while source is `published`)
- When rendering, the system looks up the current locale: first checks translations, falls back to source

## hiai-ui Editor Integration

The hiai-ui package provides three editor components for working with articles:

### TipexEditor (`src/components/editor/TipexEditor.svelte`)

The main WYSIWYG editor component. Accepts markdown content and emits markdown on updates.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `""` | Initial markdown content |
| `placeholder` | `string` | `"Start writing..."` | Placeholder text when empty |
| `onUpdate` | `(md: string) => void` | `() => {}` | Callback receiving markdown string on every change |
| `editable` | `boolean` | `true` | Whether the editor is editable |

**Basic Usage:**
```svelte
<script>
  import TipexEditor from '@hiai-gg/hiai-ui/components/editor/TipexEditor.svelte';
  
  let content = $state("# Hello\n\nStart typing...");
  function handleUpdate(md: string) {
    content = md;
  }
</script>

<TipexEditor {content} onUpdate={handleUpdate} />
```

### EditorToolbar (`src/components/editor/EditorToolbar.svelte`)
Formatting toolbar used alongside TipexEditor.

### MarkdownToggle (`src/components/editor/MarkdownToggle.svelte`)
Toggle switch between WYSIWYG and Markdown editing modes.

### LinkDialog (`src/components/editor/LinkDialog.svelte`)
Dialog for inserting/editing links in the editor.

## Complete Example

**Minimal Article:**
```json
{
  "title": "Getting Started",
  "slug": "en/getting-started",
  "locale": "en",
  "status": "published",
  "contentJson": {
    "type": "doc",
    "content": [
      { "type": "heading", "attrs": { "level": 1 }, "content": [{ "type": "text", "text": "Getting Started" }] },
      { "type": "paragraph", "content": [{ "type": "text", "text": "Welcome to the platform." }] }
    ]
  },
  "metadata": {
    "description": "A guide to getting started",
    "publishedAt": "2026-06-28T00:00:00Z"
  }
}
```

**Translated Article:**
```json
{
  "title": "Getting Started",
  "slug": "en/getting-started",
  "locale": "en",
  "status": "published",
  "contentJson": { "type": "doc", "content": [] },
  "i18n": {
    "sourceLocale": "en",
    "translations": {
      "pt": {
        "title": "Primeiros Passos",
        "status": "published",
        "contentJson": { "type": "doc", "content": [] }
      },
      "es": {
        "title": "Primeros Pasos",
        "status": "draft",
        "contentJson": { "type": "doc", "content": [] }
      }
    }
  }
}
```
