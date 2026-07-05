# Changelog

All notable changes to @hiai-gg/hiai-ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.6] - 2026-06-27

### Added
- **Select primitive**: New `components/ui/select/` — accessible select with keyboard navigation and search filtering
- **Checkbox primitive**: New `components/ui/checkbox/` — form-ready checkbox with indeterminate state
- **RadioGroup primitive**: New `components/ui/radio-group/` — accessible radio group with keyboard navigation
- **Feedback/Subscribe form demos**: Interactive form examples added to the test page
- **OpenMoji icons**: 60 new SVG icons added to `static/icons/` for use across composites
- **DropdownMenu demo**: Interactive dropdown menu example added to the test page

### Fixed
- **Select item highlighting**: Fixed hover/focus highlight state and layout alignment for select items

## [0.0.9] - 2026-07-03

### Added
- **ui/skeleton primitive**: Standard pulse skeleton component and `SkeletonText` helper for multi-line layout placeholder
- **ui/sonner toast wrapper**: Wrapper around `svelte-sonner`'s Toaster, themed with design tokens, and imperative `toast` API export
- **SiteFooter**: Column-based adaptive footer layout with brand logo/name, links, and custom asideSlot

### Changed
- **SiteHeader**: Made `nav` optional, added `authSlot` and `mobileAuthSlot` snippet props replacing fallback controls when provided
- **EmptyState**: Added `actionHref` prop to support link-actions using native `<a>` tag with button classes

## [0.0.8] - 2026-07-03

- Internal releases and minor optimizations

## [0.0.7] - 2026-06-28

### Added
- **ChatWidget**: Floating AI chatbot with glassmorphic drawer, markdown parsing, localStorage persistence, dark/light theme
- **ConfirmDialog**: New confirmation dialog (shadcn Dialog-based, replaces ConfirmModal with requireReason, busy, variant props)
- **DatePicker**: Zero-dependency calendar date picker with CSS variable theming
- **ScrollToTop**: Floating scroll-to-top button with configurable scroll target
- **SearchBar**: Compact search input with clear button and callback API
- **LiveIndicator**: Animated online/offline status with CSS ping animation
- **AnsiText**: ANSI escape code renderer (wraps parseAnsi from lib/ansi.ts)
- **DocumentTitle**: Inline-edit document title with Enter-blur save and Escape-revert
- **LinkDialog**: Insert/edit link dialog for the editor (URL normalization, Enter-to-submit)
- **MarkdownToggle**: Raw markdown textarea editor with Tab-indent handler
- **Editor extensions**: editorExtensions and markdownToJson in lib/editor/
- **Chart utilities**: chart-utils.ts (Canvas2D: drawTimeSeriesChart, drawBarChart, drawDonutChart) and ansi.ts (ANSI parser) in lib/

### Fixed
- **Select value bug**: Empty selection when no children passed (Svelte 5 snippet compilation shadowing fix)
- **ChatWidget dark theme**: Replaced non-existent surface-*/slate-* classes with canonical hiai-ui tokens
- **ChatWidget positioning**: Moved to bottom-left to avoid conflict with ScrollToTop

### Changed
- **ConfirmModal deprecated**: Marked with @deprecated JSDoc; use ConfirmDialog instead
- **Package name**: @hiai-gg/hiai-ui consistent across all docs (resolved workspace vs npm scope confusion)

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
