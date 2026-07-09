# hiai-ui Team: hiai-admin Integration Plan
*Generated from hiai-admin dropdown/select audit context*

## Objective
Prepare hiai-ui primitives so hiai-admin can fully migrate from bespoke dropdown/select/popover patterns to hiai-ui components, eliminating divergence and enabling future feature parity.

## Context Summary
- hiai-admin native selects/dropdowns were audited and migrated to hiai-ui Select where feasible
- hiai-ui package: `/mnt/ai_data/packages/hiai-ui`, name: `@hiai-gg/hiai-ui` / alias `@hiai/ui`
- Existing primitives: bits-ui/shadcn-svelte Select and DropdownMenu (deep-path components)
- hiai-admin import pattern: `@hiai/ui/components/ui/select/index`
- Gaps identified: Popover (HIGH), Command/Combobox (MEDIUM), ContextMenu/Menubar (LOW)
- Bespoke patterns remaining: EditorToolbar.svelte popovers, NotificationBell.svelte panel

## Acceptance Criteria
1. All hiai-admin native dropdown/select patterns replaced with hiai-ui Select or appropriate primitive
2. Popover primitive implemented for NotificationBell and EditorToolbar use cases
3. Command/Combobox primitive available for searchable/large choice lists
4. ContextMenu/Menubar primitives implemented for menu bar patterns
5. Documentation and examples updated for all new primitives
6. No regression in existing hiai-ui functionality
7. All components follow repo conventions (Svelte 5.56+, Tailwind v4, shadcn-svelte style, bits-ui, lucide-svelte only)

## Implementation Steps

### Phase 1: Popover Primitive (HIGH Priority)
**Target:** Replace NotificationBell.svelte custom panel and EditorToolbar.svelte popovers

1.1 **Design Review**
- Analyze NotificationBell.svelte current behavior: trigger on click, panel with notifications, dismiss on outside click
- Analyze EditorToolbar.svelte popovers: heading, list, highlight, align, color, emoji, table triggers
- Review shadcn-svelte Popover implementation and bits-ui primitives

1.2 **Implementation**
```bash
# Create Popover component structure
mkdir -p src/components/ui/popover
cp src/components/ui/select/select.tsx src/components/ui/popover/popover.svelte
# Rename and adapt to Popover pattern
```

1.3 **API Design**
- Expose Popover, PopoverTrigger, PopoverContent as deep-path components
- Support controlled/uncontrolled modes
- Implement focus management and outside click handling
- Add transition animations (Tailwind v4)

1.4 **Examples**
- Create `src/routes/(playground)/popover/+page.svelte` with NotificationBell and EditorToolbar patterns
- Document usage in `src/docs/components/popover.md`

1.5 **Verification**
```bash
bun run check
bun run test:unit
```

### Phase 2: Command/Combobox Primitive (MEDIUM Priority)
**Target:** Replace searchable select patterns in hiai-admin

2.1 **Design Review**
- Analyze hiai-admin searchable patterns: language selection, large tenant/user lists
- Review bits-ui Command primitive and shadcn-svelte Combobox

2.2 **Implementation**
```bash
# Create Command/Combobox component structure
mkdir -p src/components/ui/command
mkdir -p src/components/ui/combobox
# Implement Command with search/filter
# Implement Combobox as Command wrapper with select semantics
```

2.3 **API Design**
- Command: searchable list with keyboard navigation
- Combobox: Command + Select integration for form usage
- Support async data loading
- Add loading states and empty states

2.4 **Examples**
- Create `src/routes/(playground)/command/+page.svelte` with searchable lists
- Create `src/routes/(playground)/combobox/+page.svelte` with form integration
- Document usage in `src/docs/components/command-combobox.md`

2.5 **Verification**
```bash
bun run check
bun run test:unit
```

### Phase 3: ContextMenu/Menubar Primitives (LOW Priority)
**Target:** Replace right-click menus and menu bar patterns

3.1 **Design Review**
- Analyze potential use cases in hiai-admin
- Review bits-ui ContextMenu and Menubar primitives

3.2 **Implementation**
```bash
# Create ContextMenu component structure
mkdir -p src/components/ui/context-menu
# Create Menubar component structure
mkdir -p src/components/ui/menubar
# Implement both primitives
```

3.3 **API Design**
- ContextMenu: right-click menu with items
- Menubar: horizontal menu bar with dropdowns
- Support keyboard navigation and accessibility

3.4 **Examples**
- Create `src/routes/(playground)/context-menu/+page.svelte` with right-click demo
- Create `src/routes/(playground)/menubar/+page.svelte` with menu bar demo
- Document usage in `src/docs/components/context-menu-menubar.md`

3.5 **Verification**
```bash
bun run check
bun run test:unit
```

### Phase 4: Select Deep Export and Barrel Policy
**Target:** Standardize import patterns for hiai-admin compatibility

4.1 **Barrel Policy Review**
```bash
# Check current barrel exports
cat src/components/ui/select/index.ts
cat src/lib/index.ts
```

4.2 **Implementation**
```bash
# Update barrel exports to support deep-path imports
# Add selective exports for common patterns
# Document barrel policy in README.md
```

4.3 **Verification**
```bash
# Test hiai-admin import patterns
cd /mnt/ai_data/projects/hiai-admin/app
bun install @hiai-gg/hiai-ui@workspace:
```

### Phase 5: Documentation and Migration Guide
**Target:** Enable hiai-admin team to migrate existing patterns

5.1 **Component Documentation**
```bash
# Create comprehensive docs for each primitive
mkdir -p src/docs/components
# Select.md (existing)
# Popover.md (new)
# Command-Combobox.md (new)
# Context-Menu-Menubar.md (new)
```

5.2 **Migration Guide**
```bash
# Create hiai-admin-migration.md in docs/
# Include:
# - Select replacement patterns
# - Popover usage examples
# - Command/Combobox integration
# - Testing checklist
```

5.3 **Example Patterns**
```bash
# Create comprehensive examples for common hiai-admin patterns
# EditorToolbar popovers → Popover usage
# NotificationBell → Popover usage
# Searchable selects → Command/Combobox usage
```

## Verification Commands

### Build Verification
```bash
# From hiai-ui root
bun install
bun run check
bun run lint
bun run format
```

### Integration Test
```bash
# Test with hiai-admin
cd /mnt/ai_data/projects/hiai-admin/app
bun install @hiai-gg/hiai-ui@workspace:
bun run dev
```

### Manual Testing
```bash
# Navigate to each component page
http://localhost:5173/popover
http://localhost:5173/command
http://localhost:5173/combobox
http://localhost:5173/context-menu
http://localhost:5173/menubar
```

## Deliverables

1. **Popover Component**
   - `/src/components/ui/popover/popover.svelte`
   - `/src/components/ui/popover/popover-trigger.svelte`
   - `/src/components/ui/popover/popover-content.svelte`
   - Playground examples and documentation

2. **Command/Combobox Components**
   - `/src/components/ui/command/command.svelte`
   - `/src/components/ui/combobox/combobox.svelte`
   - Playground examples and documentation

3. **ContextMenu/Menubar Components**
   - `/src/components/ui/context-menu/context-menu.svelte`
   - `/src/components/ui/menubar/menubar.svelte`
   - Playground examples and documentation

4. **Documentation Updates**
   - Component docs in `/src/docs/components/`
   - Migration guide in `/src/docs/`
   - Updated README with barrel policy

5. **Verification**
   - Passing typecheck and lint
   - Integration tests with hiai-admin
   - Manual verification of all examples

## Do's and Don'ts

### DO ✅
- Use bits-ui primitives as foundation
- Follow shadcn-svelte styling conventions
- Implement accessibility (ARIA, keyboard navigation)
- Add comprehensive examples
- Document usage patterns
- Test with hiai-admin integration
- Use Tailwind v4 for animations and styling
- Follow existing repo conventions (no hardcoded colors, no root sprawl)

### DON'T ❌
- Create divergent patterns from existing primitives
- Hardcode colors or spacing values
- Skip accessibility checks
- Create top-level barrel exports that bloat bundle size
- Modify existing Select or DropdownMenu without coordination
- Add new dependencies without team review
- Create files outside component directories without justification

## Timeline and Ownership

- Popover: 3-5 days (HIGH priority)
- Command/Combobox: 5-7 days (MEDIUM priority)
- ContextMenu/Menubar: 7-10 days (LOW priority)
- Documentation: Parallel with implementation
- Integration testing: Ongoing

## Coordination

- Weekly sync with hiai-admin team to review progress
- PR reviews from both hiai-ui and hiai-admin maintainers
- Integration testing before merging to main
- Documentation updates before release

## Success Metrics

- All hiai-admin dropdown/select patterns replaced
- NotificationBell and EditorToolbar using hiai-ui primitives
- Zero regressions in existing functionality
- Documentation complete and accurate
- Integration tests passing
- hiai-admin team able to migrate without assistance

---
*Plan generated from hiai-admin audit context. Update this file as implementation progresses.*
