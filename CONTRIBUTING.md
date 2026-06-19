# Contributing to @hiai-gg/hiai-ui

Thank you for your interest in contributing to @hiai-gg/hiai-ui! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.3+
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 18+ (for npm compatibility checks)

### Setup

```bash
# Clone the repository
git clone https://github.com/HiAi-gg/hiai-ui.git
cd hiai-ui

# Install dependencies
bun install
```

## Development Commands

| Command | Description |
|---|---|
| `bun run check` | TypeScript type checking and package validation |
| `bun run dev` | Start development mode (if applicable) |
| `bun run build` | Build the package |
| `bun run test` | Run tests |
| `bun run typecheck` | TypeScript type check |

## Project Structure

```
hiai-ui/
├── src/
│   ├── components/          # Composites (AdminSidebar, StatsCard, etc.)
│   ├── components/ui/       # shadcn-svelte primitives (Button, Card, Input, etc.)
│   ├── styles/              # tokens.css and global styles
│   ├── lib/                 # Shared utilities and stores
│   └── app.d.ts             # TypeScript ambient declarations
├── tests/                   # Test files
├── package.json             # Package manifest
└── tsconfig.json            # TypeScript configuration
```

## Code Guidelines

### TypeScript

- Strict mode enabled — no `any` types
- Use ESM (`import`/`export`) exclusively
- All imports must include `.js` extension where required
- Follow shadcn-svelte conventions for component structure

### Svelte 5 (shadcn-svelte)

- Use Svelte 5 runes: `$state`, `$derived`, `$effect`, `$props`
- Use `$derived.by()` for multi-line derived values
- Use Tailwind CSS v4 — no custom CSS unless absolutely necessary
- Respect `prefers-reduced-motion` for all animations
- Interactive elements must be >= 44x44px for touch targets

### Styling

- **No hardcoded hex colors** in components — use Tailwind classes or CSS variables
- **Use tokens.css** for all color, spacing, and sizing decisions
- Follow the token layers in `src/styles/tokens.css`:
  - `:root` — light theme defaults
  - `.dark` — dark theme overrides
  - `.theme-observe` — observe-specific theme
  - `@theme` — Tailwind v4 mappings
  - `base` — document-level styles

### Components

- **PascalCase** for all component files
- **Deep-path imports** for shadcn-svelte primitives to enable tree-shaking
  ```ts
  import { Button } from "@hiai-gg/hiai-ui/components/ui/button";
  ```
- **Barrel exports** from `index.ts` for composites only
- **A11y**: All interactive elements need keyboard handlers
- **Confirm modal pattern**: Use a reusable confirm dialog for destructive actions

### Testing

- Use vitest or Bun's built-in test runner
- Test actual implementation, not mocks
- Aim for 100% component coverage where possible

## Git Workflow

### Branches

- `main` — stable, production-ready
- `feature/<name>` — new features
- `fix/<name>` — bug fixes
- `docs/<name>` — documentation updates
- `chore/<name>` — maintenance tasks

### Commits

Use [conventional commit messages](https://www.conventionalcommits.org/):

```
feat: add ConfirmModal component
fix: resolve Button export pattern inconsistency
docs: update README with new import paths
docs: add AGENTS.md with package conventions
chore: update dependencies to latest versions
```

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes following the code guidelines
3. Run `bun run typecheck` and fix any errors
4. Run `bun run test` and ensure all tests pass
5. Push and create a PR
6. Ensure CI passes
7. Request review

## Release Process

### Versioning

Follow [Semantic Versioning](https://semver.org/):
- `MAJOR` — breaking changes
- `MINOR` — new features
- `PATCH` — bug fixes

### Publishing

This package uses OIDC trusted publishing on tag push:

```bash
# Update version in package.json
bun run check
bun run build

# Commit changes
git add package.json
git commit -m "chore: bump version to X.Y.Z"

# Create and push tag
git tag vX.Y.Z
git push origin vX.Y.Z
```

The GitHub Actions workflow will automatically publish to npm when the tag is pushed.

## Architecture Decisions

Key decisions documented in the codebase:

- **Single source of truth for tokens** — `tokens.css` is the canonical source, extracted from hiai-docs
- **Zero-config consumption** — just import `tokens.css` and components work
- **Deep-path imports for primitives** — enables tree-shaking and prevents pulling in unused dependencies
- **Dark mode via `.dark` class** — standard Tailwind pattern, no custom theme switching logic
- **Observe theme via `.theme-observe`** — specific theme for hiai-observe integration

## Reporting Issues

When reporting bugs or requesting features:

1. Check existing issues to avoid duplicates
2. Provide clear reproduction steps
3. Include expected vs actual behavior
4. Attach screenshots if visual
5. Specify your environment (OS, Bun version, package version)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).