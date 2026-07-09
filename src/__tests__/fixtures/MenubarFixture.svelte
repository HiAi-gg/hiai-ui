<script lang="ts">
  import * as Menubar from "../../components/ui/menubar/index.js";
</script>

<div data-testid="menubar-fixture">
  <Menubar.Root>
    <Menubar.Menu>
      <Menubar.Trigger>File</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item onSelect={() => {}}>New</Menubar.Item>
        <Menubar.Item onSelect={() => {}}>Open</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item onSelect={() => {}}>Exit</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item onSelect={() => {}}>Undo</Menubar.Item>
        <Menubar.Item onSelect={() => {}}>Redo</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
  </Menubar.Root>
</div>
