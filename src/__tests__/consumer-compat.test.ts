import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { readPackageJson, resolvePackageExport } from "./package-exports.js";

const root = process.cwd();

function uiIndexNames(): string[] {
  const ui = resolve(root, "src/components/ui");
  return readdirSync(ui, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(resolve(ui, name, "index.ts")))
    .sort();
}

describe("every ui primitive has an exact /index export to a .js file", () => {
  it("maps each src/components/ui/<name>/index.ts to dist/<name>/index.js", () => {
    const pkg = readPackageJson();
    const names = uiIndexNames();
    expect(names.length).toBeGreaterThan(10);
    for (const name of names) {
      const key = `./components/ui/${name}/index`;
      const mapped = pkg.exports[key];
      expect(mapped, `missing exact export ${key}`).toBe(
        `./dist/components/ui/${name}/index.js`,
      );
      expect(resolvePackageExport(key)).toBe(
        resolve(root, `dist/components/ui/${name}/index.js`),
      );
    }
  });
});

function walkLocalImports(entry: string): string[] {
  const seen = new Set<string>();
  const stack = [resolve(entry)];
  const specRe =
    /(?:from|import)\s*['"](\.[^'"]+)['"]|import\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g;
  while (stack.length) {
    const file = stack.pop()!;
    if (seen.has(file) || !existsSync(file)) continue;
    seen.add(file);
    if (!/\.(js|svelte|css)$/.test(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(specRe)) {
      const spec = match[1] ?? match[2];
      if (!spec) continue;
      let target = resolve(dirname(file), spec);
      if (!existsSync(target) && existsSync(`${target}.js`)) target = `${target}.js`;
      if (!existsSync(target) && existsSync(`${target}.svelte`)) {
        target = `${target}.svelte`;
      }
      stack.push(target);
    }
  }
  return [...seen];
}

describe("main barrel does not pull the editor / svelte-tiptap graph", () => {
  it("does not statically import HiAiEditor, editor lib, or svelte-tiptap from dist/index.js", () => {
    const barrel = readFileSync(resolve(root, "dist/index.js"), "utf8");
    expect(barrel).not.toMatch(/HiAiEditor/);
    expect(barrel).not.toMatch(/EditorToolbar/);
    expect(barrel).not.toMatch(/LinkDialog/);
    expect(barrel).not.toMatch(/MarkdownToggle/);
    expect(barrel).not.toMatch(/editor\/editorExtensions/);
    expect(barrel).not.toMatch(/editor\/markdown/);
    expect(barrel).not.toMatch(/svelte-tiptap/);
  });

  it("walks local imports from dist/index.js without reaching svelte-tiptap or HiAiEditor", () => {
    const files = walkLocalImports(resolve(root, "dist/index.js"));
    expect(files.length).toBeGreaterThan(10);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toMatch(/svelte-tiptap/);
      expect(text, file).not.toMatch(/HiAiEditor/);
    }
  });

  it("does not re-export HiAiEditor from src/index.ts", () => {
    const src = readFileSync(resolve(root, "src/index.ts"), "utf8");
    expect(src).not.toMatch(/HiAiEditor/);
    expect(src).not.toMatch(/svelte-tiptap/);
    expect(src).not.toMatch(/from ['"]\.\/lib\/editor\//);
  });
});

describe("vite helper is a dedicated package export", () => {
  it("exposes ./vite to dist/lib/vite.js", () => {
    const pkg = readPackageJson();
    expect(pkg.exports["./vite"]).toBe("./dist/lib/vite.js");
    expect(resolvePackageExport("./vite")).toBe(resolve(root, "dist/lib/vite.js"));
  });
});

describe("editor is a dedicated package export", () => {
  it("exposes ./editor to dist/editor.js", () => {
    const pkg = readPackageJson();
    const mapped = pkg.exports["./editor"];
    const target =
      typeof mapped === "string"
        ? mapped
        : mapped && typeof mapped === "object"
          ? (mapped.svelte ?? mapped.default ?? mapped.import)
          : undefined;
    expect(target).toBe("./dist/editor.js");
    expect(resolvePackageExport("./editor")).toBe(resolve(root, "dist/editor.js"));
  });

  it("built editor entry re-exports HiAiEditor", () => {
    const editor = readFileSync(resolve(root, "dist/editor.js"), "utf8");
    expect(editor).toMatch(/HiAiEditor/);
    expect(editor).toMatch(/editorExtensions/);
    expect(editor).toMatch(/markdown/);
  });
});

describe("svelte-tiptap export conditions (third-party SSR trap)", () => {
  it("ships svelte/types but no default or import condition on '.'", () => {
    const pkgPath = resolve(root, "node_modules/svelte-tiptap/package.json");
    expect(existsSync(pkgPath)).toBe(true);
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as {
      exports?: { "."?: Record<string, string> };
    };
    const entry = pkg.exports?.["."];
    expect(entry?.svelte).toMatch(/index\.js$/);
    expect(entry?.types).toMatch(/index\.d\.ts$/);
    expect(entry?.default).toBeUndefined();
    expect(entry?.import).toBeUndefined();
  });
});
