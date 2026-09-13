import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // LAN Caddy `handle /hiai-ui*` → 127.0.0.1:5210. Do not restart
    // portfolio@hiai-ui from a library change without an explicit ops task.
    paths: { base: "/hiai-ui" },
  },
};

export default config;
