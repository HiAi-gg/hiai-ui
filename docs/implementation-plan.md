# @hiai/ui Shared Package — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract duplicated components, stores, and utilities from hiai-admin, hiai-post, and hiai-store into a shared workspace package `@hiai/ui`.

**Architecture:** Monorepo workspace package at `packages/hiai-ui/`. Each project imports `@hiai/ui` as `workspace:*` dependency. The package exports Svelte 5 components, Svelte stores, and TypeScript utilities.

**Tech Stack:** Svelte 5.55+, SvelteKit 2.60+, shadcn-svelte, svelte-tiptap, Better Auth, TypeScript strict, Bun workspaces

**Design Spec:** `docs/superpowers/specs/2026-05-25-hiai-ecosystem-design.md` — Section 3 (Shared Package)

---

## File Structure

```
packages/hiai-ui/
├── package.json
├── tsconfig.json
├── svelte.config.js
├── src/
│   ├── index.ts                    # Barrel exports
│   ├── lib/
│   │   ├── api.ts                  # Typed fetch wrapper (from hiai-admin/app/src/lib/api.ts)
│   │   ├── auth-client.ts          # Better Auth client
│   │   └── i18n/
│   │       ├── index.ts
│   │       └── en.json
│   ├── stores/
│   │   ├── auth.svelte.ts          # Auth store (from hiai-admin/app/src/lib/stores/auth.svelte.ts)
│   │   ├── notifications.svelte.ts # Toast/alert store
│   │   └── sidebar.svelte.ts       # Sidebar collapse state
│   └── components/
│       ├── DataTable.svelte        # Generic table with pagination
│       ├── StatsCard.svelte        # Metric card with icon/trend
│       ├── ChartCard.svelte        # Wrapper for chart display
│       ├── StatusBadge.svelte      # Colored status indicator
│       ├── ConfirmModal.svelte     # Confirmation dialog
│       ├── ThemeToggle.svelte      # Dark/light mode toggle
│       ├── AdminHeader.svelte      # Top bar with user menu
│       ├── AdminSidebar.svelte     # Collapsible nav sidebar
│       └── editor/
│           ├── TipexEditor.svelte  # svelte-tiptap wrapper
│           └── EditorToolbar.svelte # Formatting toolbar
```

---

### Task 1: Scaffold workspace package

**Files:**
- Create: `packages/hiai-ui/package.json`
- Create: `packages/hiai-ui/tsconfig.json`
- Create: `packages/hiai-ui/svelte.config.js`
- Create: `packages/hiai-ui/src/index.ts`
- Modify: `/mnt/ai_data/package.json` (add workspace)

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@hiai/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*",
    "./stores/*": "./src/stores/*",
    "./lib/*": "./src/lib/*"
  },
  "scripts": {
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
  },
  "dependencies": {
    "svelte": "^5.55.0",
    "@tiptap/core": "^3.23.5",
    "@tiptap/starter-kit": "^3.23.5",
    "@tiptap/pm": "^3.23.5",
    "@tiptap/markdown": "^3.18.0",
    "svelte-tiptap": "^3.0.1",
    "bits-ui": "^2.18.1",
    "lucide-svelte": "^0.577.0",
    "shadcn-svelte": "^1.2.7"
  },
  "devDependencies": {
    "@sveltejs/kit": "^2.60.0",
    "@sveltejs/package": "^2.3.0",
    "svelte-check": "^4.0.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "verbatimModuleSyntax": true,
    "noEmit": true
  },
  "include": ["src/**/*.ts", "src/**/*.svelte"]
}
```

- [ ] **Step 3: Create svelte.config.js**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: { adapter: adapter() }
};

export default config;
```

- [ ] **Step 4: Create barrel export**

```typescript
// src/index.ts
export { api } from './lib/api.js';
export { authStore } from './stores/auth.svelte.js';
export { notificationStore } from './stores/notifications.svelte.js';
export { sidebarStore } from './stores/sidebar.svelte.js';
```

- [ ] **Step 5: Add to workspace root package.json**

Read the existing root `package.json` and add `"packages/hiai-ui"` to the `workspaces` array if not already present.

- [ ] **Step 6: Install and verify**

Run: `cd /mnt/ai_data && bun install`
Expected: installs successfully with workspace link

- [ ] **Step 7: Commit**

```bash
git add packages/hiai-ui/
git commit -m "feat(hiai-ui): scaffold shared workspace package"
```

---

### Task 2: Extract api.ts utility

**Files:**
- Create: `packages/hiai-ui/src/lib/api.ts`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/api.ts`

The three projects have nearly identical `api.ts`. The shared version takes `API_BASE` as a parameter instead of reading env directly, so each project can pass its own backend URL.

- [ ] **Step 1: Create shared api.ts**

```typescript
// packages/hiai-ui/src/lib/api.ts

export function createApi(baseUrl: string) {
  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }

    return res.json();
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
    put: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  };
}

export type ApiClient = ReturnType<typeof createApi>;
```

- [ ] **Step 2: Update barrel export**

```typescript
// packages/hiai-ui/src/index.ts — add:
export { createApi, type ApiClient } from './lib/api.js';
```

- [ ] **Step 3: Commit**

```bash
git add packages/hiai-ui/src/lib/api.ts packages/hiai-ui/src/index.ts
git commit -m "feat(hiai-ui): extract shared api client utility"
```

---

### Task 3: Extract auth store

**Files:**
- Create: `packages/hiai-ui/src/stores/auth.svelte.ts`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/auth.svelte.ts`

- [ ] **Step 1: Create shared auth store**

```typescript
// packages/hiai-ui/src/stores/auth.svelte.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

let user = $state<User | null>(null);
let loading = $state(true);

export const authStore = {
  get user() { return user; },
  get loading() { return loading; },
  get isAdmin() { return user?.role === 'super_admin'; },

  async init(sessionEndpoint = '/api/auth/get-session') {
    try {
      const res = await fetch(sessionEndpoint, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json() as { user?: User };
        user = data.user || null;
      }
    } catch {
      user = null;
    } finally {
      loading = false;
    }
  },

  setUser(u: User | null) {
    user = u;
  },

  logout(loginPath = '/login') {
    user = null;
    if (typeof window !== 'undefined') {
      window.location.href = loginPath;
    }
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add packages/hiai-ui/src/stores/auth.svelte.ts
git commit -m "feat(hiai-ui): extract shared auth store"
```

---

### Task 4: Extract notifications store

**Files:**
- Create: `packages/hiai-ui/src/stores/notifications.svelte.ts`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/notifications.svelte.ts`

- [ ] **Step 1: Read existing notifications store from hiai-admin**

Read `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/notifications.svelte.ts` and adapt.

- [ ] **Step 2: Create shared notifications store**

```typescript
// packages/hiai-ui/src/stores/notifications.svelte.ts

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timeout?: number;
}

let notifications = $state<Notification[]>([]);

export const notificationStore = {
  get all() { return notifications; },

  add(type: Notification['type'], message: string, timeout = 5000) {
    const id = crypto.randomUUID();
    notifications = [...notifications, { id, type, message, timeout }];

    if (timeout > 0) {
      setTimeout(() => this.dismiss(id), timeout);
    }
    return id;
  },

  success(message: string) { return this.add('success', message); },
  error(message: string) { return this.add('error', message, 0); },
  warning(message: string) { return this.add('warning', message); },
  info(message: string) { return this.add('info', message); },

  dismiss(id: string) {
    notifications = notifications.filter(n => n.id !== id);
  },

  clear() {
    notifications = [];
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add packages/hiai-ui/src/stores/notifications.svelte.ts
git commit -m "feat(hiai-ui): extract shared notifications store"
```

---

### Task 5: Extract sidebar store

**Files:**
- Create: `packages/hiai-ui/src/stores/sidebar.svelte.ts`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/sidebar.svelte.ts`

- [ ] **Step 1: Read existing sidebar store from hiai-admin**

Read `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/sidebar.svelte.ts` and adapt.

- [ ] **Step 2: Create shared sidebar store**

```typescript
// packages/hiai-ui/src/stores/sidebar.svelte.ts

let collapsed = $state(false);
let mobileOpen = $state(false);

export const sidebarStore = {
  get collapsed() { return collapsed; },
  get mobileOpen() { return mobileOpen; },

  toggle() { collapsed = !collapsed; },
  collapse() { collapsed = true; },
  expand() { collapsed = false; },

  openMobile() { mobileOpen = true; },
  closeMobile() { mobileOpen = false; },
  toggleMobile() { mobileOpen = !mobileOpen; },
};
```

- [ ] **Step 3: Commit**

```bash
git add packages/hiai-ui/src/stores/sidebar.svelte.ts
git commit -m "feat(hiai-ui): extract shared sidebar store"
```

---

### Task 6: Extract AdminSidebar component

**Files:**
- Create: `packages/hiai-ui/src/components/AdminSidebar.svelte`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/AdminSidebar.svelte`

The sidebar needs to accept nav items as props instead of hardcoding them, so each project (and the plugin system) can provide its own navigation.

- [ ] **Step 1: Create flexible AdminSidebar**

```svelte
<!-- packages/hiai-ui/src/components/AdminSidebar.svelte -->
<script lang="ts">
  import { page } from '$app/state';

  export interface NavItem {
    label: string;
    href: string;
    icon?: string;
    badge?: string | number;
  }

  export interface NavGroup {
    label?: string;
    items: NavItem[];
  }

  let {
    groups = [],
    collapsed = false,
    appName = 'hiai',
    onToggle,
  }: {
    groups: NavGroup[];
    collapsed?: boolean;
    appName?: string;
    onToggle?: () => void;
  } = $props();
</script>

<aside
  class="flex flex-col border-r bg-muted/30 transition-all duration-200"
  class:w-64={!collapsed}
  class:w-16={collapsed}
>
  <div class="flex items-center justify-between p-4 border-b">
    {#if !collapsed}
      <span class="font-semibold text-lg">{appName}</span>
    {/if}
    {#if onToggle}
      <button onclick={onToggle} class="p-1 rounded hover:bg-muted" aria-label="Toggle sidebar">
        {collapsed ? '→' : '←'}
      </button>
    {/if}
  </div>

  <nav class="flex-1 p-2 space-y-4 overflow-y-auto">
    {#each groups as group}
      {#if group.label && !collapsed}
        <p class="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.label}</p>
      {/if}
      <div class="space-y-1">
        {#each group.items as item}
          <a
            href={item.href}
            class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted"
            class:bg-muted={page.url.pathname.startsWith(item.href)}
            class:font-medium={page.url.pathname.startsWith(item.href)}
            title={item.label}
          >
            {#if item.icon}
              <span class="text-lg">{item.icon}</span>
            {/if}
            {#if !collapsed}
              <span class="flex-1">{item.label}</span>
              {#if item.badge !== undefined}
                <span class="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">{item.badge}</span>
              {/if}
            {/if}
          </a>
        {/each}
      </div>
    {/each}
  </nav>
</aside>
```

- [ ] **Step 2: Commit**

```bash
git add packages/hiai-ui/src/components/AdminSidebar.svelte
git commit -m "feat(hiai-ui): extract AdminSidebar with configurable nav groups"
```

---

### Task 7: Extract AdminHeader component

**Files:**
- Create: `packages/hiai-ui/src/components/AdminHeader.svelte`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/AdminHeader.svelte`

- [ ] **Step 1: Read existing AdminHeader from hiai-admin**

Read `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/AdminHeader.svelte` and adapt to accept props.

- [ ] **Step 2: Create flexible AdminHeader**

```svelte
<!-- packages/hiai-ui/src/components/AdminHeader.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { User } from '../stores/auth.svelte.js';

  let {
    user,
    onToggleSidebar,
    actions,
  }: {
    user?: User | null;
    onToggleSidebar?: () => void;
    actions?: Snippet;
  } = $props();
</script>

<header class="flex items-center justify-between border-b px-6 py-3 bg-background">
  <div class="flex items-center gap-3">
    {#if onToggleSidebar}
      <button onclick={onToggleSidebar} class="p-1.5 rounded hover:bg-muted" aria-label="Toggle sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    {/if}
  </div>

  <div class="flex items-center gap-3">
    {#if actions}
      {@render actions()}
    {/if}
    {#if user}
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">{user.name}</span>
        {#if user.avatarUrl}
          <img src={user.avatarUrl} alt={user.name} class="h-8 w-8 rounded-full" />
        {:else}
          <div class="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {user.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</header>
```

- [ ] **Step 3: Commit**

```bash
git add packages/hiai-ui/src/components/AdminHeader.svelte
git commit -m "feat(hiai-ui): extract AdminHeader with snippet actions"
```

---

### Task 8: Extract reusable UI components (DataTable, StatsCard, StatusBadge, ConfirmModal, ThemeToggle)

**Files:**
- Create: `packages/hiai-ui/src/components/DataTable.svelte`
- Create: `packages/hiai-ui/src/components/StatsCard.svelte`
- Create: `packages/hiai-ui/src/components/StatusBadge.svelte`
- Create: `packages/hiai-ui/src/components/ConfirmModal.svelte`
- Create: `packages/hiai-ui/src/components/ThemeToggle.svelte`
- Create: `packages/hiai-ui/src/components/ChartCard.svelte`
- Source references: all from `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/`

- [ ] **Step 1: Read all 6 components from hiai-admin**

Read each file from hiai-admin and adapt to accept props generically.

- [ ] **Step 2: Create StatsCard**

```svelte
<!-- packages/hiai-ui/src/components/StatsCard.svelte -->
<script lang="ts">
  let {
    label,
    value,
    icon,
    trend,
  }: {
    label: string;
    value: string | number;
    icon?: string;
    trend?: { value: number; direction: 'up' | 'down' } | null;
  } = $props();
</script>

<div class="rounded-lg border bg-card p-6">
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm text-muted-foreground">{label}</span>
    {#if icon}
      <span class="text-xl">{icon}</span>
    {/if}
  </div>
  <p class="text-2xl font-bold">{value}</p>
  {#if trend}
    <p class="text-xs mt-1" class:text-success={trend.direction === 'up'} class:text-destructive={trend.direction === 'down'}>
      {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
    </p>
  {/if}
</div>
```

- [ ] **Step 3: Create StatusBadge**

```svelte
<!-- packages/hiai-ui/src/components/StatusBadge.svelte -->
<script lang="ts">
  let {
    status,
    variant = 'default',
  }: {
    status: string;
    variant?: 'default' | 'dot';
  } = $props();

  const colorMap: Record<string, string> = {
    active: 'bg-success/10 text-success',
    connected: 'bg-success/10 text-success',
    completed: 'bg-success/10 text-success',
    paid: 'bg-success/10 text-success',
    pending: 'bg-warning/10 text-warning',
    processing: 'bg-warning/10 text-warning',
    inactive: 'bg-muted text-muted-foreground',
    disconnected: 'bg-muted text-muted-foreground',
    draft: 'bg-muted text-muted-foreground',
    failed: 'bg-destructive/10 text-destructive',
    error: 'bg-destructive/10 text-destructive',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  const color = $derived(colorMap[status.toLowerCase()] ?? 'bg-muted text-muted-foreground');
</script>

<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium {color}">
  {#if variant === 'dot'}
    <span class="w-1.5 h-1.5 rounded-full mr-1.5 {color.includes('success') ? 'bg-success' : color.includes('warning') ? 'bg-warning' : color.includes('destructive') ? 'bg-destructive' : 'bg-muted-foreground'}"></span>
  {/if}
  {status}
</span>
```

- [ ] **Step 4: Create ConfirmModal**

```svelte
<!-- packages/hiai-ui/src/components/ConfirmModal.svelte -->
<script lang="ts">
  let {
    open = $bindable(false),
    title = 'Confirm',
    message = 'Are you sure?',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    onConfirm,
    onCancel,
  }: {
    open?: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'default' | 'destructive';
    onConfirm?: () => void;
    onCancel?: () => void;
  } = $props();

  function handleConfirm() {
    onConfirm?.();
    open = false;
  }

  function handleCancel() {
    onCancel?.();
    open = false;
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <button class="absolute inset-0 bg-black/50" onclick={handleCancel} aria-label="Close"></button>
    <div class="relative bg-background rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
      <h2 class="text-lg font-semibold mb-2">{title}</h2>
      <p class="text-muted-foreground mb-6">{message}</p>
      <div class="flex justify-end gap-3">
        <button onclick={handleCancel} class="px-4 py-2 rounded border text-sm hover:bg-muted">
          {cancelLabel}
        </button>
        <button
          onclick={handleConfirm}
          class="px-4 py-2 rounded text-sm text-white {variant === 'destructive' ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}
```

- [ ] **Step 5: Create ThemeToggle**

```svelte
<!-- packages/hiai-ui/src/components/ThemeToggle.svelte -->
<script lang="ts">
  let dark = $state(false);

  function toggle() {
    dark = !dark;
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  $effect(() => {
    dark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });
</script>

<button onclick={toggle} class="p-2 rounded hover:bg-muted" aria-label="Toggle theme">
  {#if dark}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {/if}
</button>
```

- [ ] **Step 6: Create DataTable**

```svelte
<!-- packages/hiai-ui/src/components/DataTable.svelte -->
<script lang="ts" generics="T extends Record<string, unknown>">
  import type { Snippet } from 'svelte';

  let {
    data = [],
    columns = [],
    loading = false,
    emptyMessage = 'No data',
    actions,
  }: {
    data: T[];
    columns: { key: string; label: string; render?: Snippet<[T]> }[];
    loading?: boolean;
    emptyMessage?: string;
    actions?: Snippet<[T]>;
  } = $props();
</script>

<div class="rounded-lg border bg-card overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b bg-muted/50">
          {#each columns as col}
            <th class="text-left px-4 py-3 font-semibold text-muted-foreground">{col.label}</th>
          {/each}
          {#if actions}
            <th class="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#if loading}
          <tr>
            <td colspan={columns.length + (actions ? 1 : 0)} class="px-4 py-8 text-center text-muted-foreground">
              Loading...
            </td>
          </tr>
        {:else if data.length === 0}
          <tr>
            <td colspan={columns.length + (actions ? 1 : 0)} class="px-4 py-8 text-center text-muted-foreground">
              {emptyMessage}
            </td>
          </tr>
        {:else}
          {#each data as row}
            <tr class="border-b last:border-0 hover:bg-muted/30 transition-colors">
              {#each columns as col}
                <td class="px-4 py-3">{row[col.key] ?? ''}</td>
              {/each}
              {#if actions}
                <td class="px-4 py-3 text-right">
                  {@render actions(row)}
                </td>
              {/if}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 7: Create ChartCard (wrapper)**

```svelte
<!-- packages/hiai-ui/src/components/ChartCard.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: Snippet;
  } = $props();
</script>

<div class="rounded-lg border bg-card p-6">
  <div class="mb-4">
    <h3 class="text-lg font-semibold">{title}</h3>
    {#if subtitle}
      <p class="text-sm text-muted-foreground">{subtitle}</p>
    {/if}
  </div>
  {@render children()}
</div>
```

- [ ] **Step 8: Update barrel exports**

```typescript
// packages/hiai-ui/src/index.ts
export { createApi, type ApiClient } from './lib/api.js';
export { authStore, type User } from './stores/auth.svelte.js';
export { notificationStore, type Notification } from './stores/notifications.svelte.js';
export { sidebarStore } from './stores/sidebar.svelte.js';
export { default as AdminSidebar } from './components/AdminSidebar.svelte';
export { default as AdminHeader } from './components/AdminHeader.svelte';
export { default as DataTable } from './components/DataTable.svelte';
export { default as StatsCard } from './components/StatsCard.svelte';
export { default as StatusBadge } from './components/StatusBadge.svelte';
export { default as ConfirmModal } from './components/ConfirmModal.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as ChartCard } from './components/ChartCard.svelte';
```

- [ ] **Step 9: Commit**

```bash
git add packages/hiai-ui/src/
git commit -m "feat(hiai-ui): extract DataTable, StatsCard, StatusBadge, ConfirmModal, ThemeToggle, ChartCard"
```

---

### Task 9: Extract editor components (TipexEditor + EditorToolbar)

**Files:**
- Create: `packages/hiai-ui/src/components/editor/TipexEditor.svelte`
- Create: `packages/hiai-ui/src/components/editor/EditorToolbar.svelte`
- Source reference: `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/editor/`

- [ ] **Step 1: Read both editor components from hiai-admin**

Read `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/editor/TipexEditor.svelte` and `EditorToolbar.svelte`.

- [ ] **Step 2: Create TipexEditor**

Copy from hiai-admin, replacing local imports with `@hiai/ui` paths. The editor accepts `content` and `onUpdate` props.

- [ ] **Step 3: Create EditorToolbar**

Copy from hiai-admin. The toolbar accepts `editor` instance as prop.

- [ ] **Step 4: Update barrel exports**

```typescript
// packages/hiai-ui/src/index.ts — add:
export { default as TipexEditor } from './components/editor/TipexEditor.svelte';
export { default as EditorToolbar } from './components/editor/EditorToolbar.svelte';
```

- [ ] **Step 5: Commit**

```bash
git add packages/hiai-ui/src/components/editor/
git commit -m "feat(hiai-ui): extract TipexEditor and EditorToolbar"
```

---

### Task 10: Migrate hiai-admin to use @hiai/ui

**Files:**
- Modify: `/mnt/ai_data/projects/hiai-admin/app/package.json`
- Modify: `/mnt/ai_data/projects/hiai-admin/app/src/lib/api.ts` → use `createApi` from @hiai/ui
- Modify: `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/auth.svelte.ts` → re-export from @hiai/ui
- Modify: `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/notifications.svelte.ts` → re-export
- Modify: `/mnt/ai_data/projects/hiai-admin/app/src/lib/stores/sidebar.svelte.ts` → re-export
- Modify: `/mnt/ai_data/projects/hiai-admin/app/src/lib/components/AdminSidebar.svelte` → re-export or import
- Modify: all pages that import local components → import from @hiai/ui

- [ ] **Step 1: Add @hiai/ui dependency**

```bash
cd /mnt/ai_data/projects/hiai-admin/app
# Read package.json, add "@hiai/ui": "workspace:*" to dependencies
```

- [ ] **Step 2: Replace api.ts with createApi wrapper**

```typescript
// projects/hiai-admin/app/src/lib/api.ts
import { createApi } from '@hiai/ui';

const API_BASE = typeof window !== 'undefined' ? '' : (process.env.API_URL || 'http://localhost:50200');
export const api = createApi(API_BASE);
```

- [ ] **Step 3: Replace stores with re-exports**

```typescript
// projects/hiai-admin/app/src/lib/stores/auth.svelte.ts
export { authStore, type User } from '@hiai/ui';
```

Same for `notifications.svelte.ts` and `sidebar.svelte.ts`.

- [ ] **Step 4: Replace local component imports**

In each page/layout that imports from `$lib/components/`, change to import from `@hiai/ui`:
```typescript
// Before:
import AdminSidebar from '$lib/components/AdminSidebar.svelte';
// After:
import { AdminSidebar } from '@hiai/ui';
```

- [ ] **Step 5: Verify build**

```bash
cd /mnt/ai_data/projects/hiai-admin/app && bunx tsc --noEmit
```
Expected: 0 errors

- [ ] **Step 6: Run tests**

```bash
cd /mnt/ai_data/projects/hiai-admin && bun test
```
Expected: 65 pass / 0 fail

- [ ] **Step 7: Commit**

```bash
git add projects/hiai-admin/
git commit -m "refactor(hiai-admin): migrate to @hiai/ui shared package"
```

---

### Task 11: Migrate hiai-post to use @hiai/ui

**Files:**
- Modify: `/mnt/ai_data/projects/hiai-post/app/package.json`
- Modify: local api.ts, stores, component imports

- [ ] **Step 1: Add @hiai/ui dependency**

```bash
cd /mnt/ai_data/projects/hiai-post/app
# Add "@hiai/ui": "workspace:*" to dependencies
```

- [ ] **Step 2: Replace api.ts**

```typescript
// projects/hiai-post/app/src/lib/api.ts
import { createApi } from '@hiai/ui';

const API_BASE = typeof window !== 'undefined' ? '' : (process.env.API_URL || 'http://localhost:50300');
export const api = createApi(API_BASE);
```

- [ ] **Step 3: Replace stores and component imports**

Same pattern as hiai-admin. Import from `@hiai/ui` instead of local paths.

- [ ] **Step 4: Verify build**

```bash
cd /mnt/ai_data/projects/hiai-post/app && bunx tsc --noEmit
```

- [ ] **Step 5: Run tests**

```bash
cd /mnt/ai_data/projects/hiai-post && bun test
```

- [ ] **Step 6: Commit**

```bash
git add projects/hiai-post/
git commit -m "refactor(hiai-post): migrate to @hiai/ui shared package"
```

---

### Task 12: Migrate hiai-store to use @hiai/ui

**Files:**
- Modify: `/mnt/ai_data/projects/hiai-store/frontend/package.json`
- Modify: local api.ts, stores, component imports

- [ ] **Step 1: Add @hiai/ui dependency**

- [ ] **Step 2: Replace api.ts**

```typescript
// projects/hiai-store/frontend/src/lib/api.ts
import { createApi } from '@hiai/ui';

const API_BASE = typeof window !== 'undefined' ? '' : (process.env.API_URL || 'http://localhost:50400');
export const api = createApi(API_BASE);
```

- [ ] **Step 3: Replace stores and component imports**

Same pattern. hiai-store uses different component names in admin pages (e.g., `admin/StatsCard`, `admin/StatusBadge`). Map them to the @hiai/ui equivalents.

- [ ] **Step 4: Verify build**

```bash
cd /mnt/ai_data/projects/hiai-store/frontend && bunx tsc --noEmit
```

- [ ] **Step 5: Run tests**

```bash
cd /mnt/ai_data/projects/hiai-store && bun test
```

- [ ] **Step 6: Commit**

```bash
git add projects/hiai-store/
git commit -m "refactor(hiai-store): migrate to @hiai/ui shared package"
```

---

### Task 13: Final verification

- [ ] **Step 1: Verify all 3 projects compile**

```bash
cd /mnt/ai_data/projects/hiai-admin/app && bunx tsc --noEmit
cd /mnt/ai_data/projects/hiai-post/app && bunx tsc --noEmit
cd /mnt/ai_data/projects/hiai-store/frontend && bunx tsc --noEmit
```
Expected: 0 errors in all 3

- [ ] **Step 2: Run all tests**

```bash
cd /mnt/ai_data/projects/hiai-admin && bun test
cd /mnt/ai_data/projects/hiai-post && bun test
cd /mnt/ai_data/projects/hiai-store && bun test
```
Expected: 65 + 33 + 65 = 163 pass / 0 fail

- [ ] **Step 3: Verify no broken imports**

```bash
grep -r "from '\$lib/components/AdminSidebar" projects/hiai-admin/app/src/ | grep -v node_modules
grep -r "from '\$lib/stores/auth" projects/hiai-admin/app/src/ | grep -v node_modules
```
Expected: 0 matches (all migrated to @hiai/ui)

- [ ] **Step 4: Commit any cleanup**

```bash
git add -A && git commit -m "chore: final cleanup after @hiai/ui extraction"
```
