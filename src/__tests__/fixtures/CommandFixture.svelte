<script lang="ts">
  import * as Command from "../../components/ui/command/index.js";

  let value = $state("");
</script>

<div data-testid="command-fixture">
  <Command.Root bind:value>
    <Command.Input placeholder="Search..." aria-label="Search commands" />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group>
        <Command.GroupHeading>Actions</Command.GroupHeading>
        <Command.Item value="copy">Copy</Command.Item>
        <Command.Item value="paste">Paste</Command.Item>
        <Command.Item value="cut">Cut</Command.Item>
      </Command.Group>
    </Command.List>
  </Command.Root>
</div>
