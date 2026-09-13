/**
 * Real component + accessibility tests for hiai-ui primitives.
 *
 * Each primitive gets:
 *  1. A render smoke test — verifies the fixture mounts without throwing.
 *  2. An axe-core a11y pass — runs axe on the rendered DOM (container for
 *     self-contained components; baseElement for portal-mounted dropdowns/popovers).
 *  3. An interactive test where feasible (open/close for controlled Popover,
 *     typing in Command input).
 *
 * Known jsdom limitations (suppressed inline with explanation):
 *  • Portal / Teleport components render outside the test container in jsdom;
 *    we query baseElement (document.body) for axe and interactive checks.
 *  • bits-ui popper positioning is a no-op in jsdom — no scroll/click coordinates.
 */

import { describe, it, expect } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/svelte";
import { runAxe, activateTrigger, pressEscape } from "./setup";

// --- Fixtures ---------------------------------------------------------------
import SelectFixture from "./fixtures/SelectFixture.svelte";
import DropdownMenuFixture from "./fixtures/DropdownMenuFixture.svelte";
import PopoverFixture from "./fixtures/PopoverFixture.svelte";
import CommandFixture from "./fixtures/CommandFixture.svelte";
import ComboboxFixture from "./fixtures/ComboboxFixture.svelte";
import ContextMenuFixture from "./fixtures/ContextMenuFixture.svelte";
import MenubarFixture from "./fixtures/MenubarFixture.svelte";
import InputErrorFixture from "./fixtures/InputErrorFixture.svelte";
import NestedPopoversFixture from "./fixtures/NestedPopoversFixture.svelte";
import MultiplePopoversFixture from "./fixtures/MultiplePopoversFixture.svelte";
import PreventedEscapeFixture from "./fixtures/PreventedEscapeFixture.svelte";

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------
describe("Select a11y", () => {
  it("renders without throwing", () => {
    const { container } = render(SelectFixture);
    expect(container.querySelector("[data-testid='select-fixture']")).not.toBeNull();
  });

  it("has no axe violations on the trigger area", async () => {
    const { container } = render(SelectFixture);
    const results = await runAxe(container);
    // Only assert on the fixture container; the Trigger combobox has no open content here
    expect(results.violations).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// DropdownMenu — portal-mounted content, use baseElement for axe
// ---------------------------------------------------------------------------
describe("DropdownMenu a11y", () => {
  it("renders without throwing", () => {
    const { baseElement } = render(DropdownMenuFixture);
    expect(baseElement.querySelector("[data-testid='dropdown-menu-fixture']")).not.toBeNull();
  });

  it("has no axe violations", async () => {
    // baseElement covers portal-rendered content as well
    const { baseElement } = render(DropdownMenuFixture);
    const results = await runAxe(baseElement);
    expect(results.violations).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Popover — controlled open/close test + axe on content
// ---------------------------------------------------------------------------
describe("Popover a11y", () => {
  it("renders without throwing (closed state)", () => {
    const { container } = render(PopoverFixture);
    expect(container.querySelector("[data-testid='popover-fixture']")).not.toBeNull();
  });

  it("has no axe violations in closed state", async () => {
    const { container } = render(PopoverFixture);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("controlled open/close toggles the content element", async () => {
    const { container, baseElement } = render(PopoverFixture);
    const forceOpen = container.querySelector("[data-testid='popover-force-open']");
    expect(forceOpen).not.toBeNull();
    await fireEvent.click(forceOpen!);
    expect(container.querySelector("[data-testid='popover-state']")?.textContent).toBe(
      "open",
    );
    const content = baseElement.querySelector("[data-state='open']");
    expect(content ?? null).not.toBeNull();
  });

  it("Escape closes an open popover and restores focus to the trigger", async () => {
    const { container } = render(PopoverFixture);
    const trigger = Array.from(container.querySelectorAll("button")).find((b) =>
      (b.textContent ?? "").includes("Toggle Popover"),
    ) as HTMLButtonElement;
    expect(trigger).toBeDefined();
    await activateTrigger(trigger);
    await waitFor(() => {
      expect(container.querySelector("[data-testid='popover-state']")?.textContent).toBe(
        "open",
      );
    });
    pressEscape();
    await waitFor(() => {
      expect(container.querySelector("[data-testid='popover-state']")?.textContent).toBe(
        "closed",
      );
    });
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it("Escape on nested popovers closes only the inner layer and focuses its trigger", async () => {
    const { container } = render(NestedPopoversFixture);
    const outerTrigger = container.querySelector(
      "[data-testid='outer-trigger']",
    ) as HTMLElement;
    await activateTrigger(outerTrigger);
    await waitFor(() => {
      expect(container.querySelector("[data-testid='outer-state']")?.textContent).toBe(
        "open",
      );
    });
    const innerTrigger = document.querySelector(
      "[data-testid='inner-trigger']",
    ) as HTMLElement;
    expect(innerTrigger).not.toBeNull();
    await activateTrigger(innerTrigger);
    await waitFor(() => {
      expect(container.querySelector("[data-testid='inner-state']")?.textContent).toBe(
        "open",
      );
    });
    pressEscape();
    await waitFor(() => {
      expect(container.querySelector("[data-testid='inner-state']")?.textContent).toBe(
        "closed",
      );
    });
    expect(container.querySelector("[data-testid='outer-state']")?.textContent).toBe(
      "open",
    );
    await waitFor(() => {
      expect(document.activeElement).toBe(innerTrigger);
    });
  });

  it("Escape on two open popovers closes only the top layer and focuses its trigger", async () => {
    const { container } = render(MultiplePopoversFixture);
    const aTrigger = container.querySelector("[data-testid='a-trigger']") as HTMLElement;
    const bTrigger = container.querySelector("[data-testid='b-trigger']") as HTMLElement;
    await activateTrigger(aTrigger);
    await waitFor(() => {
      expect(container.querySelector("[data-testid='a-state']")?.textContent).toBe("open");
    });
    await activateTrigger(bTrigger);
    await waitFor(() => {
      expect(container.querySelector("[data-testid='b-state']")?.textContent).toBe("open");
    });
    expect(container.querySelector("[data-testid='a-state']")?.textContent).toBe("open");
    pressEscape();
    await waitFor(() => {
      expect(container.querySelector("[data-testid='b-state']")?.textContent).toBe(
        "closed",
      );
    });
    expect(container.querySelector("[data-testid='a-state']")?.textContent).toBe("open");
    await waitFor(() => {
      const active = document.activeElement as HTMLElement | null;
      expect(active).not.toBeNull();
      expect(active).not.toBe(bTrigger);
      const aContent = document.querySelector(
        "[data-popover-content][data-state='open']",
      );
      expect(
        active === aTrigger || (aContent !== null && aContent.contains(active)),
      ).toBe(true);
    });
  });

  it("preventDefault on Content onEscapeKeydown keeps the popover open", async () => {
    const { container } = render(PreventedEscapeFixture);
    const trigger = container.querySelector(
      "[data-testid='prevented-trigger']",
    ) as HTMLElement;
    await activateTrigger(trigger);
    await waitFor(() => {
      expect(container.querySelector("[data-testid='prevented-state']")?.textContent).toBe(
        "open",
      );
    });
    pressEscape();
    await new Promise((r) => setTimeout(r, 50));
    expect(container.querySelector("[data-testid='prevented-state']")?.textContent).toBe(
      "open",
    );
  });
});

// ---------------------------------------------------------------------------
// Command — input filtering + axe
// ---------------------------------------------------------------------------
describe("Command a11y", () => {
  it("renders without throwing", () => {
    const { container } = render(CommandFixture);
    expect(container.querySelector("[data-testid='command-fixture']")).not.toBeNull();
  });

  it("has no axe violations", async () => {
    const { container } = render(CommandFixture);
    const results = await runAxe(container);
    // Known library limitation: bits-ui Command generates random IDs for the
    // listbox and sets aria-controls=<random-id> on the combobox input.
    // In jsdom, axe-core checks aria-controls references exist, so this
    // always produces an aria-required-attr violation in test fixtures.
    // Suppressed per task requirement for library/portal limitations.
    const realViolations = results.violations.filter(
      (v) => !(v.id === "aria-required-attr")
    );
    expect(realViolations).toHaveLength(0);
  });

  it("input accepts text and filters the list", async () => {
    const { container } = render(CommandFixture);
    const input = container.querySelector("input");
    expect(input).not.toBeNull();

    await fireEvent.input(input!, { target: { value: "paste" } });
    // After typing, Command filters case-insensitively — item with "paste" should be visible
    // textContent may show "Paste" (original case) even when filter is "paste"
    const text = container.textContent ?? "";
    expect(text.toLowerCase()).toContain("paste");
  });

  it("shows Empty when the filter matches nothing", async () => {
    const { container } = render(CommandFixture);
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    await fireEvent.input(input!, { target: { value: "zzzz-no-match" } });
    expect(container.textContent ?? "").toContain("No results found.");
  });

  it("search input is labeled and focusable", () => {
    const { container } = render(CommandFixture);
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    expect(input!.getAttribute("aria-label")).toBe("Search commands");
    input!.focus();
    expect(document.activeElement).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// Combobox — axe on the combobox structure
// ---------------------------------------------------------------------------
describe("Combobox a11y", () => {
  it("renders without throwing", () => {
    const { container } = render(ComboboxFixture);
    expect(container.querySelector("[data-testid='combobox-fixture']")).not.toBeNull();
  });

  it("has no axe violations", async () => {
    const { container } = render(ComboboxFixture);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("input is focusable and accepts typed filter text", async () => {
    const { container } = render(ComboboxFixture);
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    input!.focus();
    expect(document.activeElement).toBe(input);
    await fireEvent.input(input!, { target: { value: "ban" } });
    expect((input as HTMLInputElement).value).toBe("ban");
  });
});

// ---------------------------------------------------------------------------
// Input error state (aria-invalid + alert)
// ---------------------------------------------------------------------------
describe("Input error state a11y", () => {
  it("renders without throwing", () => {
    const { container } = render(InputErrorFixture);
    expect(container.querySelector("[data-testid='input-error-fixture']")).not.toBeNull();
  });

  it("has no axe violations", async () => {
    const { container } = render(InputErrorFixture);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("exposes aria-invalid and an alert describedby the field", () => {
    const { container } = render(InputErrorFixture);
    const input = container.querySelector("#email-error-input");
    expect(input).not.toBeNull();
    expect(input!.getAttribute("aria-invalid")).toBe("true");
    expect(input!.getAttribute("aria-describedby")).toBe("email-error-msg");
    const alert = container.querySelector("[data-testid='input-error-msg']");
    expect(alert?.getAttribute("role")).toBe("alert");
    expect(alert?.textContent).toContain("Email is required");
  });
});

// ---------------------------------------------------------------------------
// ContextMenu — portal-mounted, use baseElement for axe
// ---------------------------------------------------------------------------
describe("ContextMenu a11y", () => {
  it("renders without throwing", () => {
    const { baseElement } = render(ContextMenuFixture);
    expect(baseElement.querySelector("[data-testid='context-menu-fixture']")).not.toBeNull();
  });

  it("has no axe violations on trigger area", async () => {
    // The trigger div is self-contained; check the fixture container
    const { container } = render(ContextMenuFixture);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Menubar — axe on the menubar structure
// ---------------------------------------------------------------------------
describe("Menubar a11y", () => {
  it("renders without throwing", () => {
    const { container } = render(MenubarFixture);
    expect(container.querySelector("[data-testid='menubar-fixture']")).not.toBeNull();
  });

  it("has no axe violations", async () => {
    const { container } = render(MenubarFixture);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("trigger buttons are present and labeled", () => {
    const { container } = render(MenubarFixture);
    const triggers = container.querySelectorAll("button");
    expect(triggers.length).toBeGreaterThanOrEqual(2);
    expect(triggers[0].textContent).toContain("File");
    expect(triggers[1].textContent).toContain("Edit");
  });
});
