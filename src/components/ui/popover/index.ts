/**
 * @hiai-gg/hiai-ui — Popover primitive
 *
 * A popover is a floating container that appears near a trigger element,
 * used for secondary content like contextual actions, forms, or info.
 *
 * ## Usage
 *
 * ### Uncontrolled (default)
 * ```svelte
 * <Popover.Root>
 *   <Popover.Trigger>
 *     <Button>Open</Button>
 *   </Popover.Trigger>
 *   <Popover.Content>
 *     <p>Popover content</p>
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 *
 * ### Controlled (bind:open)
 * ```svelte
 * <script lang="ts">
 *   let open = $state(false);
 * </script>
 *
 * <Popover.Root bind:open>
 *   <Popover.Trigger>
 *     <Button>Toggle</Button>
 *   </Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Close>
 *       <Button variant="ghost">Close</Button>
 *     </Popover.Close>
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 *
 * ### With custom trigger element (asChild pattern via `child` snippet)
 * ```svelte
 * <Popover.Root>
 *   <Popover.Trigger>
 *     {#snippet child(triggerProps)}
 *       <span {...triggerProps.props} class="custom-trigger">
 *         Custom Trigger
 *       </span>
 *     {/snippet}
 *   </Popover.Trigger>
 *   <Popover.Content>
 *     <p>Content</p>
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 *
 * @module
 */

import { Popover as PopoverPrimitive } from "bits-ui";
import Root from "./popover.svelte";
import Content from "./popover-content.svelte";
import Trigger from "./popover-trigger.svelte";
import Close from "./popover-close.svelte";

export {
  Root,
  /** Unprefixed alias for convenience */
  Root as Popover,
  /** Prefixed alias matching shadcn-svelte convention */
  Root as PopoverRoot,
  Content,
  Content as PopoverContent,
  Trigger,
  Trigger as PopoverTrigger,
  Close,
  Close as PopoverClose,
};
