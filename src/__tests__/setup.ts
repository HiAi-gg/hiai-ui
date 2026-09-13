import type { AxeResults } from "axe-core";
import { fireEvent } from "@testing-library/svelte";

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

/**
 * bits-ui EscapeLayer does `new KeyboardEvent(e.type, e)`. Passing the live
 * event as EventInit in jsdom can copy canceled state onto the clone, so
 * Popover skips handleClose. Rebuild the init dict with key/code only.
 * Test harness only — does not change production keyboard ownership.
 */
const NativeKeyboardEvent = globalThis.KeyboardEvent;
class HarnessKeyboardEvent extends NativeKeyboardEvent {
  constructor(type: string, init?: KeyboardEventInit) {
    const src = init as (KeyboardEventInit & KeyboardEvent) | undefined;
    super(type, {
      bubbles: src?.bubbles ?? true,
      cancelable: src?.cancelable ?? true,
      composed: src?.composed ?? true,
      key: src?.key ?? "",
      code: src?.code ?? "",
      location: src?.location ?? 0,
      ctrlKey: src?.ctrlKey ?? false,
      shiftKey: src?.shiftKey ?? false,
      altKey: src?.altKey ?? false,
      metaKey: src?.metaKey ?? false,
      repeat: src?.repeat ?? false,
    });
  }
}
globalThis.KeyboardEvent = HarnessKeyboardEvent as typeof KeyboardEvent;

/** Focus then click so bits-ui FocusScope records the trigger as pre-focus. */
export async function activateTrigger(el: HTMLElement) {
  el.focus();
  await fireEvent.click(el);
}

/** Dispatch a cancelable Escape keydown on document (bits-ui listens there). */
export function pressEscape(target: Document | HTMLElement = document) {
  target.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      bubbles: true,
      cancelable: true,
      composed: true,
    }),
  );
}

// ---------------------------------------------------------------------------
// axe-core helper — runs axe in jsdom and returns violations.
// ---------------------------------------------------------------------------
export async function runAxe(container: Element): Promise<AxeResults> {
  // axe-core 4.x: default export is an object with .run() method
  const { default: axe } = await import("axe-core");
  return axe.run(container);
}
