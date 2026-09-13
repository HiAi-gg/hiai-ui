<script lang="ts">
  import * as Popover from "../../components/ui/popover/index.js";

  let outer = $state(false);
  let inner = $state(false);
</script>

<div data-testid="nested-popovers">
  <span data-testid="outer-state">{outer ? "open" : "closed"}</span>
  <span data-testid="inner-state">{inner ? "open" : "closed"}</span>
  <Popover.Root bind:open={outer}>
    <Popover.Trigger data-testid="outer-trigger">Outer</Popover.Trigger>
    <Popover.Content>
      <p>outer content</p>
      <Popover.Root bind:open={inner}>
        <Popover.Trigger data-testid="inner-trigger">Inner</Popover.Trigger>
        <Popover.Content>
          <p>inner content</p>
        </Popover.Content>
      </Popover.Root>
    </Popover.Content>
  </Popover.Root>
</div>
