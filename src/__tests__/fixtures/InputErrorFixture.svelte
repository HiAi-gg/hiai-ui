<script lang="ts">
  import { Input } from "../../components/ui/input/index.js";
  import Label from "../../components/ui/label/label.svelte";

  let value = $state("");
  let error = $state("Email is required");
</script>

<div data-testid="input-error-fixture">
  <Label for="email-error-input">Email</Label>
  <Input
    id="email-error-input"
    type="email"
    bind:value
    aria-invalid={error ? true : undefined}
    aria-describedby="email-error-msg"
  />
  {#if error}
    <p id="email-error-msg" role="alert" data-testid="input-error-msg">{error}</p>
  {/if}
</div>
