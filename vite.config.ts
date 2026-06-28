import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: { port: 50203, strictPort: true },
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
  // Some packages (lucide-svelte, bits-ui, svelte-tiptap, hiai-ui) ship
  // compiled .svelte files inside their dist/. esbuild's pre-bundler can't
  // handle .svelte files — excluding them routes them through the normal
  // Svelte plugin pipeline. See hiai-observe/frontend/vite.config.ts for
  // the canonical pattern.
  optimizeDeps: {
    exclude: ['lucide-svelte', 'bits-ui', 'svelte-tiptap'],
  },
});
