export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  comingSoon?: boolean;
  disabled?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}
