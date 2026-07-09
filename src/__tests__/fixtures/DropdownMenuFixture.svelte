<script lang="ts">
  import * as DropdownMenu from "../../components/ui/dropdown-menu/index.js";
</script>

<div data-testid="dropdown-menu-fixture">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child(triggerProps)}
        <button type="button" {...triggerProps.props}>
          Open Menu
        </button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item onSelect={() => {}}>Edit</DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => {}}>Duplicate</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onSelect={() => {}}>Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
