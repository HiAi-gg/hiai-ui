<script lang="ts">
  import * as ContextMenu from "../../components/ui/context-menu/index.js";
</script>

<div data-testid="context-menu-fixture">
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      <div class="h-32 w-64 border border-dashed rounded-md flex items-center justify-center">
        Right-click here
      </div>
    </ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item onSelect={() => {}}>Edit</ContextMenu.Item>
      <ContextMenu.Item onSelect={() => {}}>Duplicate</ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item onSelect={() => {}}>Delete</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Root>
</div>
