# Changelog

All notable changes to @hiai-gg/hiai-ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2026-06-19

- Remove TipexEditor and EditorToolbar
- Fix Button component duality (merge index.svelte into button.svelte)
- Fix Badge export pattern consistency
- Fix naming conventions (PascalCase composites, standard primitives export)
- Security audit — add .gitignore, LICENSE
- Rename package from @hiai/ui to @hiai-gg/hiai-ui
- Adopt OIDC trusted publishing
- Translate all documentation to English

## [0.0.1] - 2026-06-18

- Initial release
- 10 composites: AdminSidebar, AdminHeader, StatsCard, StatusBadge, ConfirmModal, ThemeToggle, DataTable, PageHeader, EmptyState, SettingsForm
- 10 shadcn-svelte primitives: Button, Card, Input, Badge, Dialog, DropdownMenu, Label, Switch, Tabs, Textarea
- tokens.css: :root/.dark/.theme-observe/@theme layers
- README consumption contract
