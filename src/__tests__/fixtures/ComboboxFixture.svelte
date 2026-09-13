<script lang="ts">
  import * as Combobox from "../../components/ui/combobox/index.js";

  let value = $state("");
</script>

<div data-testid="combobox-fixture">
  <Combobox.Root type="single" bind:value>
    <Combobox.Input placeholder="Search fruits..." aria-invalid={false} />
    <Combobox.Content>
      <Combobox.Item value="apple">Apple</Combobox.Item>
      <Combobox.Item value="banana">Banana</Combobox.Item>
      <Combobox.Item value="cherry">Cherry</Combobox.Item>
      {#if value === "missing"}
        <p role="status" data-testid="combobox-empty">No fruits match.</p>
      {/if}
    </Combobox.Content>
  </Combobox.Root>
  <p data-testid="combobox-value">{value || "none"}</p>
</div>
