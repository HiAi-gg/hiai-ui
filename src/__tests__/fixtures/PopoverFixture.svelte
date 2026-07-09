<script lang="ts">
  import * as Popover from "../../components/ui/popover/index.js";
  let open = $state(false);
</script>

<div data-testid="popover-fixture">
  <Popover.Root bind:open>
    <Popover.Trigger class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-transparent px-3 py-2 shadow-sm">
      Toggle Popover
    </Popover.Trigger>
    <Popover.Content>
      <p>This is popover content</p>
      <Popover.Close class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-transparent px-3 py-1 shadow-sm">
        Close
      </Popover.Close>
    </Popover.Content>
  </Popover.Root>
</div>
