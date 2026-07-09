/**
 * @hiai-gg/hiai-ui — Select primitive
 *
 * A native-select replacement with a custom trigger, dropdown items,
 * groups, separators, and search filtering via the keyboard.
 *
 * ## Usage
 *
 * ### Uncontrolled
 * ```svelte
 * <Select.Root type="single">
 *   <Select.Trigger>
 *     {#snippet child(triggerProps)}
 *       <Button {...triggerProps.props} variant="outline" role="combobox">
 *         {selectedValue || "Pick an option"}
 *       </Button>
 *     {/snippet}
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="1">Option 1</Select.Item>
 *     <Select.Item value="2">Option 2</Select.Item>
 *   </Select.Content>
 * </Select.Root>
 * ```
 *
 * ### Controlled
 * ```svelte
 * <script lang="ts">
 *   let value = $state("1");
 * </script>
 * <Select.Root type="single" bind:value>
 *   ...
 * </Select.Root>
 * ```
 *
 * @module
 */

import { Select as SelectPrimitive } from "bits-ui";
import Root from "./select.svelte";
import Content from "./select-content.svelte";
import Item from "./select-item.svelte";
import Separator from "./select-separator.svelte";
import Trigger from "./select-trigger.svelte";
import Value from "./select-value.svelte";

const Group = SelectPrimitive.Group;
const GroupHeading = SelectPrimitive.GroupHeading;

export {
	Content,
	Content as SelectContent,
	Group,
	Group as SelectGroup,
	GroupHeading,
	GroupHeading as SelectGroupHeading,
	Item,
	Item as SelectItem,
	Root,
	Root as SelectRoot,
	Separator,
	Separator as SelectSeparator,
	Trigger,
	Trigger as SelectTrigger,
	Value,
	Value as SelectValue,
};
