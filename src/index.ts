// @hiai/ui — Shared components, stores, and utilities for the HiAi ecosystem

// Types
export type { NavItem, NavGroup, NavIcon } from './lib/types.js';

// Lib
export { createApi, type ApiClient } from './lib/api.js';

// Stores
export { authStore, type User } from './stores/auth.svelte.js';
export { notificationStore, type Notification } from './stores/notifications.svelte.js';
export { sidebarStore } from './stores/sidebar.svelte.js';

// Components (Svelte — use svelte-check for type validation, not tsc)
export { default as AdminSidebar } from './components/AdminSidebar.svelte';
export { default as AdminHeader } from './components/AdminHeader.svelte';
export { default as PageHeader } from './components/PageHeader.svelte';
export { default as StatsCard } from './components/StatsCard.svelte';
export { default as StatusBadge } from './components/StatusBadge.svelte';
export { default as ConfirmModal } from './components/ConfirmModal.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as DataTable } from './components/DataTable.svelte';
export { default as TipexEditor } from './components/editor/TipexEditor.svelte';
export { default as EditorToolbar } from './components/editor/EditorToolbar.svelte';
