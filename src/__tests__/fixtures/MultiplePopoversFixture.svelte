<script lang="ts">
  import * as Popover from "../../components/ui/popover/index.js";

  let aOpen = $state(false);
  let bOpen = $state(false);
</script>

<div data-testid="multiple-popovers">
  <span data-testid="a-state">{aOpen ? "open" : "closed"}</span>
  <span data-testid="b-state">{bOpen ? "open" : "closed"}</span>
  <Popover.Root bind:open={aOpen}>
    <Popover.Trigger data-testid="a-trigger">Alpha</Popover.Trigger>
    <Popover.Content interactOutsideBehavior="ignore">
      <p>content A</p>
    </Popover.Content>
  </Popover.Root>
  <Popover.Root bind:open={bOpen}>
    <Popover.Trigger data-testid="b-trigger">Beta</Popover.Trigger>
    <Popover.Content interactOutsideBehavior="ignore">
      <p>content B</p>
    </Popover.Content>
  </Popover.Root>
</div>
