import type { AxeResults } from "axe-core";

// ---------------------------------------------------------------------------
// Ensure #app root element exists in jsdom
// ---------------------------------------------------------------------------
if (!document.getElementById("app")) {
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);
}

// ---------------------------------------------------------------------------
// jsdom polyfills needed by bits-ui components
// ---------------------------------------------------------------------------
if (typeof globalThis.HTMLElement !== "undefined") {
  HTMLElement.prototype.scrollIntoView = function (_options?: ScrollIntoViewOptions | boolean) {
    // no-op in jsdom — bits-ui calls this for keyboard navigation UX
  };
}

// ---------------------------------------------------------------------------
// axe-core helper — runs axe in jsdom and returns violations.
// ---------------------------------------------------------------------------
export async function runAxe(container: Element): Promise<AxeResults> {
  // axe-core 4.x: default export is an object with .run() method
  const { default: axe } = await import("axe-core");
  return axe.run(container);
}
