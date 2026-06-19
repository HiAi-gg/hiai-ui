// @hiai-gg/hiai-ui — Shared components, stores, and utilities for the HiAi ecosystem
//
// Layers:
//   - tokens:     @import "@hiai-gg/hiai-ui/styles/tokens.css"  (canon from hiai-docs)
//   - primitives: '@hiai-gg/hiai-ui/components/ui/<button|card|input|badge|dialog|
//                  dropdown-menu|label|switch|tabs|textarea>' (deep-path, shadcn)
//   - composites: this barrel (Admin*, StatsCard, DataTable, PageHeader, …)
//   - editor:     '@hiai-gg/hiai-ui/components/editor/TipexEditor.svelte' (deep-path)
// See HIAI_UI_PACKAGE_PLAN.md.

// Types
export type { NavItem, NavGroup } from './lib/types.js';

// Lib
export { createApi, type ApiClient } from './lib/api.js';
export { cn, formatRelativeTime, type WithElementRef } from './lib/utils.js';

// Stores
export { authStore, type User } from './stores/auth.svelte.js';
export { notificationStore, type Notification } from './stores/notifications.svelte.js';
export { sidebarStore } from './stores/sidebar.svelte.js';

// Components (Svelte — use svelte-check for type validation, not tsc)
export { default as AdminSidebar } from './components/AdminSidebar.svelte';
export { default as AdminHeader } from './components/AdminHeader.svelte';
export { default as StatsCard } from './components/StatsCard.svelte';
export { default as StatusBadge } from './components/StatusBadge.svelte';
export { default as ConfirmModal } from './components/ConfirmModal.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as DataTable } from './components/DataTable.svelte';
export { default as PageHeader } from './components/PageHeader.svelte';
export { default as EmptyState } from './components/EmptyState.svelte';
export { default as SettingsForm } from './components/SettingsForm.svelte';
// Editor components are not re-exported here to avoid pulling in
// lucide-svelte + svelte-tiptap at SSR time. Import them directly via
// '@hiai-gg/hiai-ui/components/editor/TipexEditor.svelte' when needed.
