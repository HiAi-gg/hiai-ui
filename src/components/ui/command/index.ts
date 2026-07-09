/**
 * @hiai-gg/hiai-ui — Command primitive
 *
 * A searchable command palette / quick-actions component. Use for
 * keyboard-driven navigation, search results, or filterable lists.
 *
 * ## Usage
 *
 * ```svelte
 * <script lang="ts">
 *   let selected = $state("");
 * </script>
 *
 * <Command.Root bind:value={selected}>
 *   <Command.Input placeholder="Search..." />
 *   <Command.List>
 *     <Command.Empty>No results found.</Command.Empty>
 *     <Command.Group heading="Actions">
 *       <Command.Item value="copy">Copy</Command.Item>
 *       <Command.Item value="paste">Paste</Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </Command.Root>
 * ```
 *
 * See also {@link Combobox} for searchable select/autocomplete patterns.
 *
 * @module
 */

import { Command as CommandPrimitive } from "bits-ui";
import Root from "./command.svelte";
import Input from "./command-input.svelte";
import List from "./command-list.svelte";
import Empty from "./command-empty.svelte";
import Group from "./command-group.svelte";
import GroupHeading from "./command-group-heading.svelte";
import Item from "./command-item.svelte";
import Separator from "./command-separator.svelte";
import Viewport from "./command-viewport.svelte";
import Loading from "./command-loading.svelte";

export {
  Root,
  Root as CommandRoot,
  Input,
  Input as CommandInput,
  List,
  List as CommandList,
  Empty,
  Empty as CommandEmpty,
  Group,
  Group as CommandGroup,
  GroupHeading,
  GroupHeading as CommandGroupHeading,
  Item,
  Item as CommandItem,
  Separator,
  Separator as CommandSeparator,
  Viewport,
  Viewport as CommandViewport,
  Loading,
  Loading as CommandLoading,
};
