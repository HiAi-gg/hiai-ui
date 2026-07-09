/**
 * @hiai-gg/hiai-ui — Combobox primitive
 *
 * A searchable select / autocomplete component. Unlike {@link Command}
 * (a command palette for keyboard-driven actions), Combobox wraps a
 * select-with-search pattern with a text input for filtering options.
 *
 * ## Usage
 *
 * ### Single-select (uncontrolled)
 * ```svelte
 * <Combobox.Root type="single">
 *   <Combobox.Input placeholder="Search fruits..." />
 *   <Combobox.Content>
 *     <Combobox.Item value="apple">Apple</Combobox.Item>
 *     <Combobox.Item value="banana">Banana</Combobox.Item>
 *     <Combobox.Item value="cherry">Cherry</Combobox.Item>
 *   </Combobox.Content>
 * </Combobox.Root>
 * ```
 *
 * ### Single-select (controlled)
 * ```svelte
 * <script lang="ts">
 *   let value = $state("apple");
 * </script>
 *
 * <Combobox.Root type="single" bind:value>
 *   <Combobox.Input placeholder="Search..." />
 *   <Combobox.Content>
 *     <Combobox.Item value="apple">Apple</Combobox.Item>
 *     <Combobox.Item value="banana">Banana</Combobox.Item>
 *   </Combobox.Content>
 * </Combobox.Root>
 * ```
 *
 * ### Multi-select
 * ```svelte
 * <Combobox.Root type="multiple">
 *   <Combobox.Input placeholder="Select items..." />
 *   <Combobox.Content>
 *     <Combobox.Item value="a">Option A</Combobox.Item>
 *     <Combobox.Item value="b">Option B</Combobox.Item>
 *   </Combobox.Content>
 * </Combobox.Root>
 * ```
 *
 * @module
 */

import { Combobox as ComboboxPrimitive } from "bits-ui";
import Root from "./combobox.svelte";
import Input from "./combobox-input.svelte";
import Trigger from "./combobox-trigger.svelte";
import Content from "./combobox-content.svelte";
import Item from "./combobox-item.svelte";
import Group from "./combobox-group.svelte";
import GroupHeading from "./combobox-group-heading.svelte";
import Viewport from "./combobox-viewport.svelte";
import Separator from "./combobox-separator.svelte";
import ScrollDownButton from "./combobox-scroll-down-button.svelte";
import ScrollUpButton from "./combobox-scroll-up-button.svelte";

export {
  Root,
  Root as ComboboxRoot,
  Input,
  Input as ComboboxInput,
  Trigger,
  Trigger as ComboboxTrigger,
  Content,
  Content as ComboboxContent,
  Item,
  Item as ComboboxItem,
  Group,
  Group as ComboboxGroup,
  GroupHeading,
  GroupHeading as ComboboxGroupHeading,
  Viewport,
  Viewport as ComboboxViewport,
  Separator,
  Separator as ComboboxSeparator,
  ScrollDownButton,
  ScrollDownButton as ComboboxScrollDownButton,
  ScrollUpButton,
  ScrollUpButton as ComboboxScrollUpButton,
};
