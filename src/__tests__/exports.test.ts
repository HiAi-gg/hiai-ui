import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  exports: Record<string, unknown>;
};
const barrel = readFileSync(resolve(root, "src/index.ts"), "utf8");

const DEEP_PATH_PRIMITIVES = [
  "popover",
  "command",
  "combobox",
  "select",
  "dropdown-menu",
  "context-menu",
  "menubar",
] as const;

describe("deep-path exports vs old Popover/Command/Combobox plans", () => {
  it("does not barrel-export Popover, Command, or Combobox from src/index.ts", () => {
    expect(barrel).not.toMatch(/from ['"]\.\/components\/ui\/popover/);
    expect(barrel).not.toMatch(/from ['"]\.\/components\/ui\/command/);
    expect(barrel).not.toMatch(/from ['"]\.\/components\/ui\/combobox/);
    expect(barrel).not.toMatch(/\bPopover\b/);
    expect(barrel).not.toMatch(/\bCommand\b/);
    expect(barrel).not.toMatch(/\bCombobox\b/);
  });

  it("maps each planned primitive to package.json ./components/ui/<name>/index", () => {
    for (const name of DEEP_PATH_PRIMITIVES) {
      const key = `./components/ui/${name}/index`;
      expect(pkg.exports[key], `missing export ${key}`).toBeDefined();
      const target = pkg.exports[key];
      const path =
        typeof target === "string"
          ? target
          : typeof target === "object" && target && "default" in target
            ? String((target as { default: string }).default)
            : "";
      expect(path).toBe(`./dist/components/ui/${name}/index.js`);
    }
  });

  it("has source index.ts for each deep-path primitive", () => {
    for (const name of DEEP_PATH_PRIMITIVES) {
      expect(existsSync(resolve(root, `src/components/ui/${name}/index.ts`))).toBe(
        true,
      );
    }
  });

  it("lists the same primitive folders under src/components/ui", () => {
    const ui = readdirSync(resolve(root, "src/components/ui"));
    for (const name of DEEP_PATH_PRIMITIVES) {
      expect(ui).toContain(name);
    }
  });
});
