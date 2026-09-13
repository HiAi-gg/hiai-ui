<script lang="ts">
  import * as Popover from "../../components/ui/popover/index.js";

  let open = $state(false);

  function keepOpen(e: KeyboardEvent) {
    e.preventDefault();
  }
</script>

<div data-testid="prevented-escape">
  <span data-testid="prevented-state">{open ? "open" : "closed"}</span>
  <Popover.Root bind:open>
    <Popover.Trigger data-testid="prevented-trigger">Hold</Popover.Trigger>
    <Popover.Content onEscapeKeydown={keepOpen}>
      <p>must stay open on Escape</p>
    </Popover.Content>
  </Popover.Root>
</div>
