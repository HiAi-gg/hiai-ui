import { defineConfig, type Plugin } from "vitest/config";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname);
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  name: string;
  exports: Record<string, string | Record<string, string>>;
};

/** Resolve `@hiai-gg/hiai-ui/...` through package.json exports, not a prefix alias to dist/. */
function packageExportsPlugin(): Plugin {
  const prefix = pkg.name;
  return {
    name: "hiai-ui-package-exports",
    enforce: "pre",
    resolveId(id) {
      if (id !== prefix && !id.startsWith(`${prefix}/`)) return null;
      const sub = id === prefix ? "." : `./${id.slice(prefix.length + 1)}`;
      const entry = pkg.exports[sub];
      if (entry === undefined) return null;
      const target =
        typeof entry === "string" ? entry : entry.svelte ?? entry.default ?? entry.import;
      if (typeof target !== "string") return null;
      return resolve(root, target);
    },
  };
}

export default defineConfig({
  plugins: [
    packageExportsPlugin(),
    svelte({
      preprocess: vitePreprocess(),
    }),
  ],
  resolve: {
    conditions: ["svelte", "browser", "import", "module", "default"],
  },
  test: {
    // jsdom environment for @testing-library/svelte + axe-core DOM tests.
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    setupFiles: ["src/__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/components/ui/**"],
    },
  },
});
