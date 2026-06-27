/**
 * Icon accepted by NavItem / NavGroup.
 *
 * `unknown` is used here to keep the type assignable from any of:
 *   - A lucide-svelte icon class (e.g. `BarChart3` — a Svelte 4-style
 *     class extending `SvelteComponentTyped<...>`).
 *   - A Svelte 5 component (interface-style).
 *   - A string the AdminSidebar renders as text (emoji or legacy).
 *
 * The actual runtime check is done in `AdminSidebar.svelte`'s
 * `resolveIcon()` helper. Using `unknown` is the only way to accept
 * Svelte 4 class components alongside Svelte 5 components under strict
 * variance.
 */
export type NavIcon = unknown;

export interface NavItem {
  label: string;
  href: string;
  icon?: NavIcon;
  badge?: string | number;
  comingSoon?: boolean;
  disabled?: boolean;
}

export interface NavGroup {
  label?: string;
  icon?: NavIcon;
  items: NavItem[];
}
