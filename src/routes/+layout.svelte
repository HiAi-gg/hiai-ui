<script>
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>hiai-ui Demo</title>
</svelte:head>

{@render children()}
