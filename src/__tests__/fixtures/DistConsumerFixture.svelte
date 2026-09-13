<script lang="ts">
  // Published specifiers; vitest plugin resolves them via package.json exports.
  import * as Popover from "@hiai-gg/hiai-ui/components/ui/popover/index";
  import * as Command from "@hiai-gg/hiai-ui/components/ui/command/index";
  import * as Combobox from "@hiai-gg/hiai-ui/components/ui/combobox/index";

  let popoverOpen = $state(false);
  let commandValue = $state("");
  let comboboxValue = $state("");
</script>

<div data-testid="dist-consumer">
  <Popover.Root bind:open={popoverOpen}>
    <Popover.Trigger>Open from dist</Popover.Trigger>
    <Popover.Content>
      <p>dist popover content</p>
    </Popover.Content>
  </Popover.Root>
  <Command.Root bind:value={commandValue}>
    <Command.Input aria-label="Dist command" />
    <Command.List>
      <Command.Empty>No results</Command.Empty>
      <Command.Item value="copy">Copy</Command.Item>
    </Command.List>
  </Command.Root>
  <Combobox.Root type="single" bind:value={comboboxValue}>
    <Combobox.Input placeholder="Dist fruits" />
    <Combobox.Content>
      <Combobox.Item value="apple">Apple</Combobox.Item>
    </Combobox.Content>
  </Combobox.Root>
</div>
