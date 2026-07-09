/**
 * @hiai-gg/hiai-ui — DropdownMenu primitive
 *
 * A menu triggered by clicking a button or element. Supports items,
 * sub-menus, separators, checkboxes, and radio groups.
 *
 * ## Usage
 *
 * ```svelte
 * <DropdownMenu.Root>
 *   <DropdownMenu.Trigger>
 *     {#snippet child(triggerProps)}
 *       <Button {...triggerProps.props}>Open Menu</Button>
 *     {/snippet}
 *   </DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item onSelect={() => console.log("Edit")}>
 *       Edit
 *     </DropdownMenu.Item>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item onSelect={() => console.log("Delete")}>
 *       Delete
 *     </DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
 *
 * @module
 */

import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import Root from "./dropdown-menu.svelte";
import Content from "./dropdown-menu-content.svelte";
import Item from "./dropdown-menu-item.svelte";
import Separator from "./dropdown-menu-separator.svelte";
import Trigger from "./dropdown-menu-trigger.svelte";

const Sub = DropdownMenuPrimitive.Sub;
const Group = DropdownMenuPrimitive.Group;

export {
	Content,
	Content as DropdownMenuContent,
	Group,
	Group as DropdownMenuGroup,
	Item,
	Item as DropdownMenuItem,
	Root,
	//
	Root as DropdownMenu,
	Separator,
	Separator as DropdownMenuSeparator,
	Sub,
	Sub as DropdownMenuSub,
	Trigger,
	Trigger as DropdownMenuTrigger,
};
