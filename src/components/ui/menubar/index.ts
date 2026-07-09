/**
 * @hiai-gg/hiai-ui — Menubar primitive
 *
 * A top-level horizontal menu bar with nested dropdown menus.
 * Supports items, sub-menus, separators, checkboxes, and radio groups.
 *
 * ## Usage
 *
 * ```svelte
 * <Menubar.Root>
 *   <Menubar.Menu>
 *     <Menubar.Trigger>File</Menubar.Trigger>
 *     <Menubar.Content>
 *       <Menubar.Item onSelect={() => console.log("New")}>New</Menubar.Item>
 *       <Menubar.Item onSelect={() => console.log("Open")}>Open</Menubar.Item>
 *       <Menubar.Separator />
 *       <Menubar.Item onSelect={() => console.log("Exit")}>Exit</Menubar.Item>
 *     </Menubar.Content>
 *   </Menubar.Menu>
 *   <Menubar.Menu>
 *     <Menubar.Trigger>Edit</Menubar.Trigger>
 *     <Menubar.Content>
 *       <Menubar.Item onSelect={() => console.log("Undo")}>Undo</Menubar.Item>
 *       <Menubar.Item onSelect={() => console.log("Redo")}>Redo</Menubar.Item>
 *     </Menubar.Content>
 *   </Menubar.Menu>
 * </Menubar.Root>
 * ```
 *
 * @module
 */

import { Menubar as MenubarPrimitive } from "bits-ui";
import Root from "./menubar.svelte";
import Menu from "./menubar-menu.svelte";
import Trigger from "./menubar-trigger.svelte";
import Content from "./menubar-content.svelte";
import Item from "./menubar-item.svelte";
import Separator from "./menubar-separator.svelte";
import Group from "./menubar-group.svelte";
import Sub from "./menubar-sub.svelte";
import SubTrigger from "./menubar-sub-trigger.svelte";
import SubContent from "./menubar-sub-content.svelte";
import CheckboxItem from "./menubar-checkbox-item.svelte";
import RadioGroup from "./menubar-radio-group.svelte";
import RadioItem from "./menubar-radio-item.svelte";

export {
  Root,
  Root as Menubar,
  Menu,
  Menu as MenubarMenu,
  Trigger,
  Trigger as MenubarTrigger,
  Content,
  Content as MenubarContent,
  Item,
  Item as MenubarItem,
  Separator,
  Separator as MenubarSeparator,
  Group,
  Group as MenubarGroup,
  Sub,
  Sub as MenubarSub,
  SubTrigger,
  SubTrigger as MenubarSubTrigger,
  SubContent,
  SubContent as MenubarSubContent,
  CheckboxItem,
  CheckboxItem as MenubarCheckboxItem,
  RadioGroup,
  RadioGroup as MenubarRadioGroup,
  RadioItem,
  RadioItem as MenubarRadioItem,
};
