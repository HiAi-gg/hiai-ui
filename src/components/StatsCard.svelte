<script lang="ts">
  // `icon` accepts either a string (legacy emoji) or any Svelte 4/5 component
  // (lucide-svelte icons etc). The runtime check (`typeof icon === 'string'`)
  // handles both — the type is intentionally wide to bridge Svelte 4
  // `typeof SvelteComponent` and Svelte 5 `Component` variance.
  type IconProp = string | unknown;

  let {
    label,
    value,
    trend,
    icon,
    accent = 'primary',
    href,
  }: {
    label: string;
    value: string | number;
    trend?: { value: number; direction: 'up' | 'down' };
    icon?: IconProp;
    accent?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'violet';
    href?: string;
  } = $props();

  const accentColors: Record<string, string> = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-destructive',
    info: 'text-info',
    violet: 'text-violet',
  };
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  href={href}
  class="metric-card group block"
  class:cursor-pointer={href}
>
  <div class="flex items-center justify-between">
    <span class="metric-label">{label}</span>
    {#if icon}
      <span class="{accentColors[accent]}" aria-hidden="true">
        {#if typeof icon === 'string'}
          <span class="text-xl">{icon}</span>
        {:else}
          {@const Icon = icon as any}
          <Icon class="h-5 w-5" />
        {/if}
      </span>
    {/if}
  </div>
  <div class="metric-value {accentColors[accent]}">
    {value}
    {#if trend}
      <span
        class="ml-2 text-sm font-medium"
        class:text-success={trend.direction === 'up'}
        class:text-destructive={trend.direction === 'down'}
      >
        {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
      </span>
    {/if}
  </div>
</svelte:element>