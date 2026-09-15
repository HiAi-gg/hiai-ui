import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { hiaiUi } from './src/lib/vite.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [hiaiUi(), tailwindcss(), sveltekit()],
  server: { port: 5210, strictPort: true, host: "127.0.0.1" },
  preview: { port: 5210, strictPort: true, host: "127.0.0.1" },
  resolve: {
    alias: {
      '@tiptap/core': resolve(__dirname, './node_modules/@tiptap/core'),
      'prosemirror-changeset': resolve(__dirname, './node_modules/prosemirror-changeset'),
      'prosemirror-commands': resolve(__dirname, './node_modules/prosemirror-commands'),
      'prosemirror-dropcursor': resolve(__dirname, './node_modules/prosemirror-dropcursor'),
      'prosemirror-gapcursor': resolve(__dirname, './node_modules/prosemirror-gapcursor'),
      'prosemirror-history': resolve(__dirname, './node_modules/prosemirror-history'),
      'prosemirror-inputrules': resolve(__dirname, './node_modules/prosemirror-inputrules'),
      'prosemirror-keymap': resolve(__dirname, './node_modules/prosemirror-keymap'),
      'prosemirror-model': resolve(__dirname, './node_modules/prosemirror-model'),
      'prosemirror-schema-list': resolve(__dirname, './node_modules/prosemirror-schema-list'),
      'prosemirror-state': resolve(__dirname, './node_modules/prosemirror-state'),
      'prosemirror-tables': resolve(__dirname, './node_modules/prosemirror-tables'),
      'prosemirror-transform': resolve(__dirname, './node_modules/prosemirror-transform'),
      'prosemirror-view': resolve(__dirname, './node_modules/prosemirror-view'),
    },
    dedupe: [
      '@tiptap/core',
      'prosemirror-changeset',
      'prosemirror-commands',
      'prosemirror-dropcursor',
      'prosemirror-gapcursor',
      'prosemirror-history',
      'prosemirror-inputrules',
      'prosemirror-keymap',
      'prosemirror-model',
      'prosemirror-schema-list',
      'prosemirror-state',
      'prosemirror-tables',
      'prosemirror-transform',
      'prosemirror-view',
    ],
  },
  // lucide-svelte / bits-ui / svelte-tiptap optimizeDeps.exclude and
  // svelte-tiptap ssr.noExternal come from hiaiUi() (same helper consumers
  // should apply). Keep the TipTap/ProseMirror aliases above for the
  // playground's relative HiAiEditor import.
});
