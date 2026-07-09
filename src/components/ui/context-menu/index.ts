/**
 * @hiai-gg/hiai-ui — ContextMenu primitive
 *
 * A right-click context menu that appears at the cursor position.
 * Supports items, sub-menus, separators, checkboxes, and radio groups.
 *
 * ## Usage
 *
 * ```svelte
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger>
 *     <!-- Right-click area -->
 *     <div class="h-32 w-64 border border-dashed rounded-md flex items-center justify-center">
 *       Right-click here
 *     </div>
 *   </ContextMenu.Trigger>
 *   <ContextMenu.Content>
 *     <ContextMenu.Item onSelect={() => console.log("Edit")}>
 *       Edit
 *     </ContextMenu.Item>
 *     <ContextMenu.Item onSelect={() => console.log("Duplicate")}>
 *       Duplicate
 *     </ContextMenu.Item>
 *     <ContextMenu.Separator />
 *     <ContextMenu.Item onSelect={() => console.log("Delete")}>
 *       Delete
 *     </ContextMenu.Item>
 *   </ContextMenu.Content>
 * </ContextMenu.Root>
 * ```
 *
 * @module
 */

import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import Root from "./context-menu.svelte";
import Content from "./context-menu-content.svelte";
import Item from "./context-menu-item.svelte";
import Trigger from "./context-menu-trigger.svelte";
import Separator from "./context-menu-separator.svelte";
import Group from "./context-menu-group.svelte";
import Sub from "./context-menu-sub.svelte";
import SubTrigger from "./context-menu-sub-trigger.svelte";
import SubContent from "./context-menu-sub-content.svelte";
import CheckboxItem from "./context-menu-checkbox-item.svelte";
import RadioGroup from "./context-menu-radio-group.svelte";
import RadioItem from "./context-menu-radio-item.svelte";

export {
  Root,
  Root as ContextMenu,
  Content,
  Content as ContextMenuContent,
  Item,
  Item as ContextMenuItem,
  Trigger,
  Trigger as ContextMenuTrigger,
  Separator,
  Separator as ContextMenuSeparator,
  Group,
  Group as ContextMenuGroup,
  Sub,
  Sub as ContextMenuSub,
  SubTrigger,
  SubTrigger as ContextMenuSubTrigger,
  SubContent,
  SubContent as ContextMenuSubContent,
  CheckboxItem,
  CheckboxItem as ContextMenuCheckboxItem,
  RadioGroup,
  RadioGroup as ContextMenuRadioGroup,
  RadioItem,
  RadioItem as ContextMenuRadioItem,
};
