<script lang="ts">
import { page } from '$app/state';
import type { Component } from 'svelte';
import * as Icons from 'lucide-svelte';
import type { NavGroup } from '../lib/types.js';

type NavIcon = unknown;

let {
  groups = [],
  collapsed = false,
  appName = 'hiai',
  onToggle,
  logoHref = '/',
  version,
  poweredByHref = 'https://hiai.gg/oss/admin',
}: {
  groups: NavGroup[];
  collapsed?: boolean;
  appName?: string;
  onToggle?: () => void;
  logoHref?: string;
  version?: string;
  poweredByHref?: string;
} = $props();

/**
 * Resolves a {@link NavIcon} to a Svelte component, or `undefined` if the
 * value is a plain string (e.g. an emoji) that should be rendered as text.
 *
 * Resolution order:
 *   1. Svelte component (instance check)
 *   2. String key — try as a lucide-svelte icon name (kebab-case passthrough)
 */
function resolveIcon(icon: NavIcon | undefined): Component | undefined {
  if (!icon) return undefined;
  if (typeof icon === 'function') return icon as unknown as Component;
  if (typeof icon === 'string') {
    // Resolve a string to a lucide-svelte icon (PascalCase or kebab-case).
    const pascal = icon
      .split(/[-_\s]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
    const resolved = (Icons as unknown as Record<string, Component>)[pascal];
    if (resolved) return resolved;
    // Not a known icon — caller should render as text.
  }
  return undefined;
}

/** True if the icon should be rendered as inline text (emoji / legacy). */
function isTextIcon(icon: NavIcon | undefined): boolean {
  return typeof icon === 'string' && resolveIcon(icon) === undefined;
}
</script>

<aside
  class="relative flex flex-col border-r border-border bg-card text-card-foreground transition-[width] duration-200"
  class:w-64={!collapsed}
  class:w-16={collapsed}
>
  {#if onToggle}
    <button
      onclick={onToggle}
      class="absolute -right-3 top-4 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {#if collapsed}
        <Icons.PanelLeftOpen class="h-3.5 w-3.5" strokeWidth={2} />
      {:else}
        <Icons.PanelLeftClose class="h-3.5 w-3.5" strokeWidth={2} />
      {/if}
    </button>
  {/if}
  <div class="flex h-14 items-center border-b border-border px-4">
    <a href={logoHref} class="flex items-center gap-2 no-underline">
      {#if !collapsed}
        <div class="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
          {appName.charAt(0).toUpperCase()}
        </div>
        <span class="text-sm font-semibold tracking-tight text-foreground">{appName}</span>
      {:else}
        <div class="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
          {appName.charAt(0).toUpperCase()}
        </div>
      {/if}
    </a>
  </div>

  <nav class="flex-1 space-y-4 overflow-y-auto p-2">
    {#each groups as group (group.label ?? JSON.stringify(group.items))}
      {#if group.label && !collapsed}
        <div class="flex items-center gap-2 px-3 pt-3 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase first:pt-0">
          {#if group.icon}
            {@const GroupIcon = resolveIcon(group.icon)}
            {#if GroupIcon}
              <GroupIcon class="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
            {:else if isTextIcon(group.icon)}
              <span class="text-muted-foreground" aria-hidden="true">{group.icon}</span>
            {/if}
          {/if}
          <span>{group.label}</span>
        </div>
      {/if}
      <div class="space-y-0.5">
        {#each group.items as item (item.href + item.label)}
          {@const active = !item.disabled && !item.comingSoon && page.url.pathname.startsWith(item.href)}
          {@const IconComponent = resolveIcon(item.icon)}
          <a
            href={item.disabled || item.comingSoon ? undefined : item.href}
            aria-disabled={item.disabled || item.comingSoon}
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            class:bg-accent={active}
            class:text-accent-foreground={active}
            class:text-muted-foreground={!active && !item.comingSoon && !item.disabled}
            class:opacity-60={item.comingSoon || item.disabled}
            class:cursor-not-allowed={item.comingSoon || item.disabled}
            class:hover:bg-muted={!active && !item.comingSoon && !item.disabled}
            class:hover:text-foreground={!active && !item.comingSoon && !item.disabled}
            title={item.label}
          >
            {#if IconComponent}
              <IconComponent
                class="h-4 w-4 shrink-0"
                strokeWidth={2}
                aria-hidden="true"
              />
            {:else if isTextIcon(item.icon)}
              <span class="text-base shrink-0" aria-hidden="true">{item.icon}</span>
            {/if}
            {#if !collapsed}
              <span class="flex-1 truncate">{item.label}</span>
              {#if item.comingSoon}
                <span class="text-[10px] font-semibold uppercase tracking-wide rounded-full border border-warning/30 bg-warning/10 text-warning px-1.5 py-0.5">
                  Soon
                </span>
              {:else if item.badge !== undefined}
                <span class="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              {/if}
            {/if}
          </a>
        {/each}
      </div>
    {/each}
  </nav>

  <div class="border-t border-border p-3" data-testid="sidebar-footer">
    {#if !collapsed}
      <p class="text-[10px] font-medium tracking-wide text-muted-foreground" title="App version">
        v{version ?? '0.0.0'}
      </p>
    {/if}
    <a
      href={poweredByHref}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
    >
      <span class={collapsed ? 'sr-only' : ''}>Powered by HiAi-Admin</span>
      {#if collapsed}
        <Icons.CircleHelp class="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      {/if}
    </a>
  </div>
</aside>
