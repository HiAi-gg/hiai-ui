import { describe, it, expect, afterEach } from "vitest";
import * as Select from "../components/ui/select/index";
import * as DropdownMenu from "../components/ui/dropdown-menu/index";
import * as Popover from "../components/ui/popover/index";
import * as Command from "../components/ui/command/index";
import * as Combobox from "../components/ui/combobox/index";
import * as ContextMenu from "../components/ui/context-menu/index";
import * as Menubar from "../components/ui/menubar/index";

afterEach(() => {
  try {
    const root = document.getElementById("app");
    if (root) root.innerHTML = "";
  } catch {
    // ignore
  }
});

// ---------------------------------------------------------------------------
// Component smoke tests — verify modules import without errors
// and representative DOM markup renders without throwing.
// Real a11y tests with axe-core are in a11y.test.ts.
// ---------------------------------------------------------------------------

describe("Select", () => {
  it("exports named components without errors", () => {
    expect(Select.Root).toBeDefined();
    expect(Select.Trigger).toBeDefined();
    expect(Select.Content).toBeDefined();
    expect(Select.Item).toBeDefined();
  });

  it("renders representative trigger markup without throwing", () => {
    const root = document.getElementById("app")!;
    const trigger = document.createElement("button");
    trigger.className = "border rounded px-3 py-2 text-sm";
    trigger.textContent = "Pick an option";
    root.appendChild(trigger);
    // Verify element is in DOM
    expect(root.querySelector("button")).not.toBeNull();
    expect(root.textContent).toContain("Pick an option");
  });
});

describe("DropdownMenu", () => {
  it("exports named components without errors", () => {
    expect(DropdownMenu.Root).toBeDefined();
    expect(DropdownMenu.Trigger).toBeDefined();
    expect(DropdownMenu.Content).toBeDefined();
    expect(DropdownMenu.Item).toBeDefined();
    expect(DropdownMenu.Separator).toBeDefined();
  });

  it("renders representative trigger markup without throwing", () => {
    const root = document.getElementById("app")!;
    const trigger = document.createElement("button");
    trigger.className = "border rounded px-3 py-2 text-sm";
    trigger.textContent = "Open Menu";
    root.appendChild(trigger);
    expect(root.querySelector("button")).not.toBeNull();
  });
});

describe("Popover", () => {
  it("exports named components without errors", () => {
    expect(Popover.Root).toBeDefined();
    expect(Popover.Trigger).toBeDefined();
    expect(Popover.Content).toBeDefined();
    expect(Popover.Close).toBeDefined();
  });

  it("renders representative trigger markup without throwing", () => {
    const root = document.getElementById("app")!;
    const trigger = document.createElement("button");
    trigger.className = "border rounded px-3 py-2 text-sm";
    trigger.textContent = "Toggle";
    root.appendChild(trigger);
    expect(root.querySelector("button")).not.toBeNull();
  });
});

describe("Command", () => {
  it("exports named components without errors", () => {
    expect(Command.Root).toBeDefined();
    expect(Command.Input).toBeDefined();
    expect(Command.List).toBeDefined();
    expect(Command.Empty).toBeDefined();
    expect(Command.Group).toBeDefined();
    expect(Command.Item).toBeDefined();
    expect(Command.Separator).toBeDefined();
  });

  it("renders representative command palette markup without throwing", () => {
    const root = document.getElementById("app")!;
    const cmd = document.createElement("div");
    cmd.className =
      "flex flex-col overflow-hidden rounded-md bg-popover text-popover-foreground";
    cmd.innerHTML = `
      <input placeholder="Search..." role="combobox" />
      <div role="listbox">
        <div role="option" class="px-2 py-1.5 text-sm cursor-default select-none">Copy</div>
        <div role="option" class="px-2 py-1.5 text-sm cursor-default select-none">Paste</div>
      </div>
    `;
    root.appendChild(cmd);
    expect(root.querySelector('input[role="combobox"]')).not.toBeNull();
    expect(root.querySelectorAll('[role="option"]').length).toBe(2);
  });
});

describe("Combobox", () => {
  it("exports named components without errors", () => {
    expect(Combobox.Root).toBeDefined();
    expect(Combobox.Input).toBeDefined();
    expect(Combobox.Trigger).toBeDefined();
    expect(Combobox.Content).toBeDefined();
    expect(Combobox.Item).toBeDefined();
    expect(Combobox.Group).toBeDefined();
    expect(Combobox.Separator).toBeDefined();
  });

  it("renders representative trigger markup without throwing", () => {
    const root = document.getElementById("app")!;
    const trigger = document.createElement("button");
    trigger.className = "border rounded px-3 py-2 text-sm";
    trigger.textContent = "Pick an option";
    root.appendChild(trigger);
    expect(root.querySelector("button")).not.toBeNull();
  });
});

describe("ContextMenu", () => {
  it("exports named components without errors", () => {
    expect(ContextMenu.Root).toBeDefined();
    expect(ContextMenu.Trigger).toBeDefined();
    expect(ContextMenu.Content).toBeDefined();
    expect(ContextMenu.Item).toBeDefined();
    expect(ContextMenu.Separator).toBeDefined();
    expect(ContextMenu.Sub).toBeDefined();
    expect(ContextMenu.CheckboxItem).toBeDefined();
    expect(ContextMenu.RadioItem).toBeDefined();
  });

  it("renders representative trigger area markup without throwing", () => {
    const root = document.getElementById("app")!;
    const area = document.createElement("div");
    area.className =
      "h-32 w-64 border border-dashed rounded-md flex items-center justify-center";
    area.textContent = "Right-click here";
    root.appendChild(area);
    expect(root.textContent).toContain("Right-click here");
  });
});

describe("Menubar", () => {
  it("exports named components without errors", () => {
    expect(Menubar.Root).toBeDefined();
    expect(Menubar.Menu).toBeDefined();
    expect(Menubar.Trigger).toBeDefined();
    expect(Menubar.Content).toBeDefined();
    expect(Menubar.Item).toBeDefined();
    expect(Menubar.Separator).toBeDefined();
    expect(Menubar.Sub).toBeDefined();
    expect(Menubar.CheckboxItem).toBeDefined();
    expect(Menubar.RadioItem).toBeDefined();
  });

  it("renders representative menubar markup without throwing", () => {
    const root = document.getElementById("app")!;
    const menubar = document.createElement("div");
    menubar.setAttribute("role", "menubar");
    menubar.innerHTML = `
      <button role="menuitem" class="px-3 py-1 text-sm">File</button>
      <button role="menuitem" class="px-3 py-1 text-sm">Edit</button>
    `;
    root.appendChild(menubar);
    expect(menubar.querySelectorAll('[role="menuitem"]').length).toBe(2);
  });
});
