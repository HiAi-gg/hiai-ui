<script lang="ts">
  import * as Combobox from "../../components/ui/combobox/index.js";

  let value = $state("");
</script>

<div data-testid="combobox-fixture">
  <Combobox.Root type="single" bind:value>
    <Combobox.Input placeholder="Search fruits..." />
    <Combobox.Content>
      <Combobox.Item value="apple">Apple</Combobox.Item>
      <Combobox.Item value="banana">Banana</Combobox.Item>
      <Combobox.Item value="cherry">Cherry</Combobox.Item>
    </Combobox.Content>
  </Combobox.Root>
</div>
