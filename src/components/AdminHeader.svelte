<script lang="ts">
import { page } from '$app/state';
import type { Snippet } from 'svelte';
import { LogOut, User } from 'lucide-svelte';
import * as DropdownMenu from './ui/dropdown-menu/index.js';

type Crumb = { label: string; href: string; current: boolean };

// Display labels for known technical role IDs. Unknown roles fall through
// to the raw role string (caller can override via the `roleLabel` prop).
const DEFAULT_ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  admin: 'Site Admin',
  editor: 'Editor',
  staff: 'Staff',
};

let {
  user,
  roleLabel,
  onToggleSidebar,
  actions,
  breadcrumbs: breadcrumbsProp,
  title,
  profileHref,
  onSignOut,
}: {
  user?: { name?: string; avatarUrl?: string; email?: string; role?: string | null } | null;
  roleLabel?: string;
  onToggleSidebar?: () => void;
  actions?: Snippet;
  breadcrumbs?: Crumb[];
  title?: string;
  profileHref?: string | null;
  onSignOut?: () => void;
} = $props();

// Resolve once so the template stays declarative.
const resolvedProfileHref = $derived(profileHref === undefined ? '/profile' : profileHref);

// Display label for the user's role. Priority:
//   1. Explicit `roleLabel` prop (caller-supplied)
//   2. DEFAULT_ROLE_LABELS lookup for known technical IDs
//   3. Raw role string
//   4. Empty string when no role is provided
const resolvedRoleLabel = $derived(
  roleLabel ?? (user?.role ? (DEFAULT_ROLE_LABELS[user.role] ?? user.role) : ''),
);

const derivedBreadcrumbs: Crumb[] = $derived.by((): Crumb[] => {
  if (breadcrumbsProp) return breadcrumbsProp;
  const segments: string[] = page.url.pathname.split('/').filter(Boolean);
  return segments.map(
    (seg: string, i: number): Crumb => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
      href: `/${segments.slice(0, i + 1).join('/')}`,
      current: i === segments.length - 1,
    }),
  );
});
</script>

<header class="flex h-14 items-center justify-between border-b border-border bg-card px-4">
  <div class="flex items-center gap-4">
    {#if title}
      <h1 class="text-lg font-semibold">{title}</h1>
    {:else if derivedBreadcrumbs.length > 0}
      <nav aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm">
          {#each derivedBreadcrumbs as crumb, i (i)}
            {#if i > 0}
              <li class="text-muted-foreground/50">/</li>
            {/if}
            <li>
              {#if crumb.current}
                <span class="font-semibold text-foreground">{crumb.label}</span>
              {:else}
                <a href={crumb.href} class="text-muted-foreground transition-colors hover:text-foreground">{crumb.label}</a>
              {/if}
            </li>
          {/each}
        </ol>
      </nav>
    {/if}
  </div>

  <div class="flex items-center gap-3">
    {#if actions}
      {@render actions()}
    {/if}

    {#if user}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child(childProps)}
            <button
              {...childProps.props}
              class="flex items-center gap-2 pl-2 border-l border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open user menu"
            >
              {#if user.avatarUrl}
                <img src={user.avatarUrl} alt={user.name || 'User'} class="h-8 w-8 rounded-full object-cover" />
              {:else}
                <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              {/if}
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium leading-none">{user.name || 'User'}</p>
                {#if resolvedRoleLabel}
                  <p class="text-[10px] text-muted-foreground leading-none mt-0.5">{resolvedRoleLabel}</p>
                {/if}
              </div>
            </button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-56 p-0">
          <div class="px-3 pt-1.5 pb-2.5">
          <!-- Identity header: name + email -->
          <div class="flex items-center gap-2 py-2.5">
  <User class="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium leading-tight">
                {resolvedRoleLabel || user.name || 'User'}
              </p>
              {#if user.email}
                <p class="truncate text-xs leading-tight text-muted-foreground">{user.email}</p>
              {/if}
            </div>
          </div>
          <DropdownMenu.Separator class="-mx-3" />
          {#if resolvedProfileHref}
            <DropdownMenu.Item class="px-0">
              {#snippet child(itemProps)}
                <a
                  {...itemProps.props}
                  href={resolvedProfileHref}
                class="flex items-center gap-2 w-full text-left cursor-pointer"
                >
                  <User class="h-4 w-4" aria-hidden="true" />
                  Profile
                </a>
              {/snippet}
            </DropdownMenu.Item>
          {/if}
          <DropdownMenu.Separator class="-mx-3" />
          <DropdownMenu.Item class="px-0">
            {#snippet child(itemProps)}
              <button
                {...itemProps.props}
                type="button"
                class="flex items-center gap-2 w-full text-left cursor-pointer"
                onclick={() => onSignOut?.()}
              >
                <LogOut class="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            {/snippet}
          </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {/if}
  </div>
</header>