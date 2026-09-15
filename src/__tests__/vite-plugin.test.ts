import { describe, expect, it } from "vitest";
import {
  HIAI_UI_OPTIMIZE_DEPS_EXCLUDE,
  HIAI_UI_SSR_NO_EXTERNAL,
  hiaiUi,
} from "../lib/vite.js";

describe("hiaiUi Vite helper", () => {
  it("lists svelte-tiptap for optimizeDeps.exclude and ssr.noExternal", () => {
    expect(HIAI_UI_OPTIMIZE_DEPS_EXCLUDE).toContain("svelte-tiptap");
    expect(HIAI_UI_OPTIMIZE_DEPS_EXCLUDE).toContain("bits-ui");
    expect(HIAI_UI_OPTIMIZE_DEPS_EXCLUDE).toContain("lucide-svelte");
    expect(HIAI_UI_SSR_NO_EXTERNAL).toContain("svelte-tiptap");
  });

  it("returns a plugin whose config applies those lists", () => {
    const plugin = hiaiUi();
    expect(plugin.name).toBe("hiai-ui");
    const config = plugin.config();
    expect(config.optimizeDeps.exclude).toEqual([...HIAI_UI_OPTIMIZE_DEPS_EXCLUDE]);
    expect(config.ssr.noExternal).toEqual([...HIAI_UI_SSR_NO_EXTERNAL]);
  });
});
