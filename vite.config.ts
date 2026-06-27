import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: { port: 50203, strictPort: true },
  // Some packages (lucide-svelte, bits-ui, svelte-tiptap, hiai-ui) ship
  // compiled .svelte files inside their dist/. esbuild's pre-bundler can't
  // handle .svelte files — excluding them routes them through the normal
  // Svelte plugin pipeline. See hiai-observe/frontend/vite.config.ts for
  // the canonical pattern.
  optimizeDeps: {
    exclude: ['lucide-svelte', 'bits-ui', 'svelte-tiptap'],
  },
});
