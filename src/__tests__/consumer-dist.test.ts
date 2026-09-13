import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { render, fireEvent, waitFor } from "@testing-library/svelte";
import DistConsumerFixture from "./fixtures/DistConsumerFixture.svelte";
import { readPackageJson, resolvePackageExport } from "./package-exports.js";

const root = process.cwd();

/** Specifiers hiai-admin already uses (alias `@hiai/ui` → this package). */
const CONSUMER_INDEX_EXPORTS = [
  "components/ui/select/index",
  "components/ui/dropdown-menu/index",
  "components/ui/popover/index",
  "components/ui/command/index",
  "components/ui/dialog/index",
  "components/ui/button/index",
  "components/ui/input/index",
] as const;

describe("installed-package consumer contract (dist)", () => {
  it("exposes each consumer /index specifier as a built file", () => {
    const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
      exports: Record<string, unknown>;
    };
    for (const spec of CONSUMER_INDEX_EXPORTS) {
      const key = `./${spec}`;
      expect(pkg.exports[key], `package.json exports missing ${key}`).toBeDefined();
      const distFile = resolve(root, "dist", spec + ".js");
      expect(existsSync(distFile), `missing ${distFile}`).toBe(true);
    }
  });

  it("resolves consumer specifiers through package.json exports to dist files", () => {
    const pkg = readPackageJson();
    expect(pkg.name).toBe("@hiai-gg/hiai-ui");
    for (const spec of CONSUMER_INDEX_EXPORTS) {
      const key = `./${spec}`;
      const mapped = pkg.exports[key];
      const target = typeof mapped === "string" ? mapped : undefined;
      expect(target, key).toBe(`./dist/${spec}.js`);
      expect(resolvePackageExport(key)).toBe(resolve(root, `dist/${spec}.js`));
    }
    expect(resolvePackageExport(".")).toBe(resolve(root, "dist/index.js"));
  });

  it("imports Popover, Command, and Combobox through package.json export targets", async () => {
    const popover = await import(
      pathToFileURL(resolvePackageExport("./components/ui/popover/index")).href
    );
    const command = await import(
      pathToFileURL(resolvePackageExport("./components/ui/command/index")).href
    );
    const combobox = await import(
      pathToFileURL(resolvePackageExport("./components/ui/combobox/index")).href
    );
    expect(popover.Root ?? popover.PopoverRoot).toBeDefined();
    expect(popover.Trigger).toBeDefined();
    expect(popover.Content).toBeDefined();
    expect(popover.Close).toBeDefined();
    expect(command.Root).toBeDefined();
    expect(command.Input).toBeDefined();
    expect(command.Empty).toBeDefined();
    expect(command.Loading).toBeDefined();
    expect(combobox.Root).toBeDefined();
    expect(combobox.Input).toBeDefined();
    expect(combobox.Item).toBeDefined();
  });

  it("does not barrel-export Popover, Command, or Combobox from dist/index.js", () => {
    const barrel = readFileSync(resolve(root, "dist/index.js"), "utf8");
    expect(barrel).not.toMatch(/components\/ui\/popover/);
    expect(barrel).not.toMatch(/components\/ui\/command/);
    expect(barrel).not.toMatch(/components\/ui\/combobox/);
    expect(barrel).not.toMatch(/\bPopover\b/);
    expect(barrel).not.toMatch(/\bCommand\b/);
    expect(barrel).not.toMatch(/\bCombobox\b/);
  });

  it(
    "renders Popover, Command, and Combobox imported from built dist",
    { timeout: 30000 },
    async () => {
      const { container } = render(DistConsumerFixture);
      expect(container.querySelector("[data-testid='dist-consumer']")).not.toBeNull();
      expect(container.textContent).toContain("Open from dist");
      const trigger = Array.from(container.querySelectorAll("button")).find((b) =>
        (b.textContent ?? "").includes("Open from dist"),
      );
      expect(trigger).toBeDefined();
      await fireEvent.click(trigger!);
      await waitFor(() => {
        expect(container.textContent ?? "").toContain("dist popover content");
      });
      const commandInput = container.querySelector('input[aria-label="Dist command"]');
      expect(commandInput).not.toBeNull();
      const comboInput = container.querySelector('input[placeholder="Dist fruits"]');
      expect(comboInput).not.toBeNull();
    },
  );
});

describe("fonts remain consumer-owned", () => {
  const sources = [
    resolve(root, "src/styles/tokens.css"),
    resolve(root, "dist/styles/tokens.css"),
  ];

  it("does not @import webfonts from tokens.css (src and dist)", () => {
    for (const file of sources) {
      expect(existsSync(file), file).toBe(true);
      const css = readFileSync(file, "utf8");
      expect(css).not.toMatch(/@import\s+['"][^'"]*fontsource/i);
      expect(css).not.toMatch(/fonts\.googleapis/i);
      expect(css).not.toMatch(/fonts\.gstatic/i);
      expect(css).not.toMatch(/@font-face/);
      expect(css).toMatch(/Inter Variable/);
    }
  });
});
