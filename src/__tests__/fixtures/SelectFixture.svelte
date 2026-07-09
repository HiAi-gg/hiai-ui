<script lang="ts">
  import * as Select from "../../components/ui/select/index.js";
  let value = $state("apple");
</script>

<div data-testid="select-fixture">
  <Select.Root type="single" bind:value>
    <Select.Trigger class="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
      <Select.Value placeholder="Pick a fruit" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
      <Select.Item value="cherry">Cherry</Select.Item>
    </Select.Content>
  </Select.Root>
</div>
