# Changelog

All notable changes to @hiai-gg/hiai-ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.4] - 2026-06-21

### Fixed
- **Broken barrel import**: v0.0.3 `exports["."]` pointed to `./dist/index.{js,d.ts}` which did not exist in the published tarball. Consumers importing from `@hiai-gg/hiai-ui` received module-resolution errors. The root export now points to `./src/index.ts` (source-only model), aligning with the package's documented consumption contract.
- **Restore StatusBadge statuses**: Re-add `provisioning`, `ready`, `running` status styles that were dropped from the local source between v0.0.3 npm release and now.
- **Restore ConfirmModal a11y**: Re-add Escape-key handler and `role="button"` backdrop close behavior that was removed during local refactoring.
- **Restore AdminSidebar auto-version**: Sidebar version label now reads from `package.json` (`v{pkg.version}`) instead of a hardcoded string.

### Added
- **TipexEditor and EditorToolbar** are now re-exported from the barrel so consumers can import directly from `@hiai-gg/hiai-ui` (previously deep-path only).

## [0.0.3] - 2026-06-19

- Initial public release of `@hiai-gg/hiai-ui` (renamed from `@hiai/ui`)
- 10 composites: AdminSidebar, AdminHeader, StatsCard, StatusBadge, ConfirmModal, ThemeToggle, DataTable, PageHeader, EmptyState, SettingsForm
- 10 shadcn-svelte primitives: Button, Card, Input, Badge, Dialog, DropdownMenu, Label, Switch, Tabs, Textarea
- tokens.css: :root/.dark/.theme-observe/@theme layers
- OIDC trusted publishing via GitHub Actions

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
