# hiai-ui Team Integration Task
*Actionable English prompt for immediate execution*

## Your Mission
Prepare hiai-ui primitives so hiai-admin can fully migrate from bespoke dropdown/select/popover patterns to hiai-ui components.

## Current Status
- hiai-admin native selects/dropdowns audited and partially migrated to hiai-ui Select
- hiai-ui has Select and DropdownMenu primitives (deep-path: `@hiai/ui/components/ui/select/index`)
- **Critical gaps identified:** Popover (HIGH priority), Command/Combobox (MEDIUM), ContextMenu/Menubar (LOW)
- Bespoke patterns remaining: EditorToolbar.svelte popovers, NotificationBell.svelte panel

## Acceptance Criteria (Must All Pass)
1. ✅ hiai-admin can replace all native dropdown/select with hiai-ui Select
2. ✅ NotificationBell and EditorToolbar use hiai-ui Popover
3. ✅ Searchable selects use hiai-ui Command/Combobox
4. ✅ All new components follow repo conventions (Svelte 5.56+, Tailwind v4, shadcn-svelte style, bits-ui, lucide-svelte only)
5. ✅ Documentation and examples complete
6. ✅ Zero regressions in existing hiai-ui functionality

---

## STEP-BY-STEP EXECUTION PLAN

### Phase 1: Popover Primitive (HIGH - Must Complete First)
**Goal:** Replace NotificationBell.svelte custom panel and EditorToolbar.svelte popovers

#### 1.1 Create Popover Component Structure
```bash
cd /mnt/ai_data/packages/hiai-ui

# Create directory structure
mkdir -p src/components/ui/popover

# Copy base template from Select
cp src/components/ui/select/select.tsx src/components/ui/popover/popover.svelte
```

#### 1.2 Implement Popover Components
Create these files in `src/components/ui/popover/`:

**popover.svelte**
```svelte
<script lang="ts">
  import { Popover as PopoverPrimitive } from "@hiai/ui/components/ui/popover"
  export let open: boolean = false
  export let onOpenChange: (open: boolean) => void = () => {}
</script>

<PopoverPrimitive.Root bind:open>
  <slot {open} {onOpenChange} />
</PopoverPrimitive.Root>
```

**popover-trigger.svelte**
```svelte
<script lang="ts">
  import { PopoverPrimitive } from "@hiai/ui/components/ui/popover"
</script>

<PopoverPrimitive.Trigger>
  <slot />
</PopoverPrimitive.Trigger>
```

**popover-content.svelte**
```svelte
<script lang="ts">
  import { PopoverPrimitive } from "@hiai/ui/components/ui/popover"
</script>

<PopoverPrimitive.Content>
  <slot />
</PopoverPrimitive.Content>
```

#### 1.3 Create Example Pages
```bash
# NotificationBell pattern example
cat > src/routes/(playground)/popover/+page.svelte << 'EOF'
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent } from "@hiai/ui/components/ui/popover"
  import { Button } from "@hiai/ui/components/ui/button"
  import { Bell } from "lucide-svelte"
</script>

<div class="p-8">
  <Popover>
    <PopoverTrigger>
      <Button variant="ghost" size="icon">
        <Bell class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="space-y-2">
        <h4 class="font-semibold">Notifications</h4>
        <p class="text-sm text-muted-foreground">You have 3 new notifications</p>
      </div>
    </PopoverContent>
  </Popover>
</div>
EOF

# EditorToolbar pattern example
cat > src/routes/(playground)/popover/editor-toolbar/+page.svelte << 'EOF'
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent } from "@hiai/ui/components/ui/popover"
  import { Button } from "@hiai/ui/components/ui/button"
  import { Bold, Italic, List, Heading1 } from "lucide-svelte"
</script>

<div class="flex gap-2 p-4">
  <Popover>
    <PopoverTrigger>
      <Button variant="ghost" size="icon">
        <Bold class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div class="grid gap-2">
        <Button variant="ghost" size="sm" class="justify-start">
          <Bold class="mr-2 h-3 w-3" /> Bold
        </Button>
        <Button variant="ghost" size="sm" class="justify-start">
          <Italic class="mr-2 h-3 w-3" /> Italic
        </Button>
      </div>
    </PopoverContent>
  </Popover>
  
  <Popover>
    <PopoverTrigger>
      <Button variant="ghost" size="icon">
        <Heading1 class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div class="grid gap-2">
        <Button variant="ghost" size="sm" class="justify-start">
          Heading 1
        </Button>
        <Button variant="ghost" size="sm" class="justify-start">
          Heading 2
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</div>
EOF
```

#### 1.4 Update Documentation
```bash
# Create Popover documentation
cat > src/docs/components/popover.md << 'EOF'
# Popover Component

A floating panel triggered by a button.

## Usage

### Basic Popover
```svelte
<script>
  import { Popover, PopoverTrigger, PopoverContent } from "@hiai/ui/components/ui/popover"
</script>

<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div>Popover content here</div>
  </PopoverContent>
</Popover>
```

### Notification Bell Pattern
```svelte
<Popover>
  <PopoverTrigger>
    <Button variant="ghost" size="icon">
      <Bell class="h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="space-y-2">
      <!-- Notifications -->
    </div>
  </PopoverContent>
</Popover>
```

### Editor Toolbar Pattern
```svelte
<div class="flex gap-2">
  <Popover>
    <PopoverTrigger>
      <Button variant="ghost" size="icon">
        <Bold class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <!-- Format options -->
    </PopoverContent>
  </Popover>
</div>
```

## API Reference

### Popover
- `open` (boolean): Controlled open state
- `onOpenChange` (function): Callback when open state changes

### PopoverTrigger
- Default slot: Trigger element

### PopoverContent
- Default slot: Content to display
- `class` (string): Additional classes
EOF
```

---

### Phase 2: Command/Combobox Primitives (MEDIUM)
**Goal:** Replace searchable select patterns in hiai-admin

#### 2.1 Create Command Component
```bash
mkdir -p src/components/ui/command

cat > src/components/ui/command/command.svelte << 'EOF'
<script lang="ts">
  import { Command as CommandPrimitive } from "bits-ui"
  import { cn } from "@hiai/ui/lib/utils"
  
  export let value: string = ""
  export let onValueChange: (value: string) => void = () => {}
  export let placeholder: string = "Search..."
  export let className: string = ""
</script>

<CommandPrimitive.Root 
  value={value}
  onValueChange={onValueChange}
  class={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className)}
>
  <CommandPrimitive.Input 
    placeholder={placeholder}
    class="flex h-10 w-full rounded-md bg-transparent py-3 px-4 text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
  />
  <CommandPrimitive.List class="flex-1 overflow-y-auto overflow-x-hidden p-2">
    <slot />
  </CommandPrimitive.List>
</CommandPrimitive.Root>
EOF

cat > src/components/ui/command/item.svelte << 'EOF'
<script lang="ts">
  import { CommandPrimitive } from "bits-ui"
  import { cn } from "@hiai/ui/lib/utils"
  
  export let value: string
  export let onSelect: (value: string) => void = () => {}
  export let className: string = ""
</script>

<CommandPrimitive.Item
  value={value}
  onSelect={onSelect}
  class={cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
>
  <slot />
</CommandPrimitive.Item>
EOF
```

#### 2.2 Create Combobox Component
```bash
mkdir -p src/components/ui/combobox

cat > src/components/ui/combobox/combobox.svelte << 'EOF'
<script lang="ts">
  import { Command } from "@hiai/ui/components/ui/command"
  import { Popover, PopoverTrigger, PopoverContent } from "@hiai/ui/components/ui/popover"
  import { Button } from "@hiai/ui/components/ui/button"
  import { Check, ChevronsUpDown } from "lucide-svelte"
  import { cn } from "@hiai/ui/lib/utils"
  
  export let value: string = ""
  export let onValueChange: (value: string) => void = () => {}
  export let options: Array<{ value: string; label: string }> = []
  export let placeholder: string = "Select..."
  export let searchable: boolean = true
</script>

<Popover>
  <PopoverTrigger>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={value}
      class="w-[200px] justify-between"
    >
      {#if value}
        {options.find((o) => o.value === value)?.label || value}
      {:else}
        {placeholder}
      {/if}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-[200px] p-0">
    {#if searchable}
      <Command value={value} onValueChange={onValueChange}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <slot {options} />
        </Command.List>
      </Command>
    {:else}
      <div class="p-2">
        {#each options as option}
          <div
            class={cn(
              "flex cursor-pointer items-center rounded px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
              value === option.value ? "bg-accent" : ""
            )}
            on:click={() => onValueChange(option.value)}
          >
            {option.label}
            {#if value === option.value}
              <Check class="ml-auto h-3.5 w-3.5" />
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </PopoverContent>
</Popover>
EOF
```

#### 2.3 Create Examples
```bash
cat > src/routes/(playground)/command/+page.svelte << 'EOF'
<script lang="ts">
  import { Command, CommandItem } from "@hiai/ui/components/ui/command"
  import { Input } from "@hiai/ui/components/ui/input"
</script>

<div class="p-8">
  <Command>
    <Input placeholder="Search commands..." />
    <Command.List>
      <CommandItem value="copy">Copy</CommandItem>
      <CommandItem value="paste">Paste</CommandItem>
      <CommandItem value="cut">Cut</CommandItem>
      <CommandItem value="undo">Undo</CommandItem>
    </Command.List>
  </Command>
</div>
EOF

cat > src/routes/(playground)/combobox/+page.svelte << 'EOF'
<script lang="ts">
  import { Combobox } from "@hiai/ui/components/ui/combobox"
  
  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
  ]
</script>

<div class="p-8 space-y-4">
  <Combobox 
    options={frameworks}
    placeholder="Select framework..."
    bind:value
  />
  
  <p>Selected: {value || "None"}</p>
</div>
EOF
```

---

### Phase 3: ContextMenu/Menubar Primitives (LOW)
**Goal:** Replace right-click menus and menu bar patterns

#### 3.1 Create ContextMenu Component
```bash
mkdir -p src/components/ui/context-menu

cat > src/components/ui/context-menu/context-menu.svelte << 'EOF'
<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from "@hiai/ui/components/ui/context-menu"
</script>

<ContextMenuPrimitive.Root>
  <slot />
</ContextMenuPrimitive.Root>

<!-- Export children as separate files -->
EOF

cat > src/components/ui/context-menu/context-menu-trigger.svelte << 'EOF'
<script lang="ts">
  import { ContextMenuPrimitive } from "@hiai/ui/components/ui/context-menu"
</script>

<ContextMenuPrimitive.Trigger>
  <slot />
</ContextMenuPrimitive.Trigger>
EOF

cat > src/components/ui/context-menu/context-menu-content.svelte << 'EOF'
<script lang="ts">
  import { ContextMenuPrimitive } from "@hiai/ui/components/ui/context-menu"
</script>

<ContextMenuPrimitive.Content>
  <slot />
</ContextMenuPrimitive.Content>
EOF
```

#### 3.2 Create Menubar Component
```bash
mkdir -p src/components/ui/menubar

cat > src/components/ui/menubar/menubar.svelte << 'EOF'
<script lang="ts">
  import { Menubar as MenubarPrimitive } from "@hiai/ui/components/ui/menubar"
</script>

<MenubarPrimitive.Root>
  <slot />
</MenubarPrimitive.Root>
EOF

cat > src/components/ui/menubar/menubar-menu.svelte << 'EOF'
<script lang="ts">
  import { MenubarPrimitive } from "@hiai/ui/components/ui/menubar"
</script>

<MenubarPrimitive.Menu>
  <slot />
</MenubarPrimitive.Menu>
EOF
```

---

### Phase 4: Quality Assurance

#### 4.1 Verify Build
```bash
# From hiai-ui root
cd /mnt/ai_data/packages/hiai-ui

bun install
bun run check
bun run lint
bun run format
```

#### 4.2 Integration Test with hiai-admin
```bash
# In another terminal
cd /mnt/ai_data/projects/hiai-admin/app

# Install local hiai-ui
bun install @hiai-gg/hiai-ui@workspace:

# Start hiai-admin
bun run dev

# Verify components work in admin UI
```

#### 4.3 Manual Testing
```bash
# Test each component page
open http://localhost:5173/popover
open http://localhost:5173/command
open http://localhost:5173/combobox
open http://localhost:5173/context-menu
open http://localhost:5173/menubar
```

---

### Phase 5: Documentation and Handoff

#### 5.1 Update README with Barrel Policy
```bash
# Add to README.md
cat >> README.md << 'EOF'

## Component Imports

hiai-ui uses deep-path imports for primitives:

```javascript
// Select
import { Select, SelectTrigger, SelectContent, SelectItem } from "@hiai/ui/components/ui/select"

// Popover
import { Popover, PopoverTrigger, PopoverContent } from "@hiai/ui/components/ui/popover"

// Command/Combobox
import { Command, CommandItem } from "@hiai/ui/components/ui/command"
import { Combobox } from "@hiai/ui/components/ui/combobox"

// ContextMenu/Menubar
import { ContextMenu } from "@hiai/ui/components/ui/context-menu"
import { Menubar } from "@hiai/ui/components/ui/menubar"
```

## Migration Guide for hiai-admin

### Replace Native Select
```svelte
<!-- Before -->
<select class="border rounded px-2 py-1">
  <option value="1">Option 1</option>
</select>

<!-- After -->
<Select value={value} onValueChange={setValue}>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Replace NotificationBell
```svelte
<!-- Before -->
<div class="notification-panel">...</div>

<!-- After -->
<Popover>
  <PopoverTrigger>
    <Button variant="ghost" size="icon">
      <Bell class="h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="space-y-2">
      <!-- Notifications -->
    </div>
  </PopoverContent>
</Popover>
```

### Replace Searchable Select
```svelte
<!-- Before -->
<input type="text" list="options" />
<datalist id="options">...</datalist>

<!-- After -->
<Combobox options={options} placeholder="Search..." bind:value />
```
EOF
```

#### 5.2 Create Migration Checklist
```bash
cat > src/docs/hiai-admin-migration.md << 'EOF'
# hiai-admin Migration to hiai-ui Primitives

## Checklist

### Select Migration ✅
- [ ] Replace all `<select>` elements with `<Select>`
- [ ] Add hidden inputs for `use:enhance` forms
- [ ] Update form validation to use Select values
- [ ] Test keyboard navigation
- [ ] Verify accessibility (ARIA attributes)

### Popover Migration ✅
- [ ] Replace NotificationBell.svelte with Popover
- [ ] Replace EditorToolbar.svelte popovers with Popover
- [ ] Test trigger behavior (click, hover)
- [ ] Test outside click dismissal
- [ ] Test focus management

### Command/Combobox Migration ✅
- [ ] Replace searchable inputs with Combobox
- [ ] Replace large choice lists with Command
- [ ] Add loading states for async data
- [ ] Test search functionality
- [ ] Verify keyboard navigation

### Testing Commands

```bash
# Typecheck
bun run check

# Lint
bun run lint

# Format
bun run format

# Test in hiai-admin
cd /mnt/ai_data/projects/hiai-admin/app
bun run dev
```

## Common Patterns

### Form Integration
```svelte
<script>
  import { Select, SelectTrigger, SelectContent, SelectItem } from "@hiai/ui/components/ui/select"
  import { enhance } from "$app/forms"
</script>

<form method="POST" use:enhance>
  <Select name="theme" value={theme} onValueChange={setTheme}>
    <SelectTrigger>
      <SelectValue placeholder="Select theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="light">Light</SelectItem>
    </SelectContent>
  </Select>
  <input type="hidden" name="theme" value={theme} />
</form>
```

### Async Data
```svelte
<script>
  import { Combobox } from "@hiai/ui/components/ui/combobox"
  
  let options = []
  let loading = false
  
  async function loadOptions(query: string) {
    loading = true
    options = await fetchOptions(query)
    loading = false
  }
</script>

<Combobox 
  options={options}
  placeholder="Search..."
  searchable
  onSearch={loadOptions}
/>
```

## Troubleshooting

### Select not updating form
- Add hidden input with same name as Select
- Ensure form uses `use:enhance`
- Check Select has `name` prop if needed

### Popover not closing
- Add `onOpenChange` handler if controlled
- Check for conflicting event handlers
- Verify trigger element is not inside PopoverContent

### Combobox search not working
- Verify `searchable` prop is true
- Check `onSearch` handler is implemented
- Ensure options have proper value/label structure
EOF
```

---

## Final Verification

### 6.1 Run All Checks
```bash
cd /mnt/ai_data/packages/hiai-ui

# Clean install
bun install --frozen-lockfile

# Typecheck
bun run check

# Lint
bun run lint

# Format
bun run format

# Build
bun run build
```

### 6.2 Integration Test
```bash
# In hiai-admin
cd /mnt/ai_data/projects/hiai-admin/app

# Update dependency
bun add @hiai-gg/hiai-ui@workspace:

# Run dev server
bun run dev

# Navigate to:
# - Site settings (test Select replacement)
# - Notification panel (test Popover)
# - Searchable fields (test Combobox)
```

### 6.3 Success Criteria Checklist
- [ ] All hiai-ui primitives compile without errors
- [ ] All playground examples render correctly
- [ ] hiai-admin can import and use new primitives
- [ ] No regressions in existing hiai-ui functionality
- [ ] Documentation is complete and accurate
- [ ] TypeScript types are correct
- [ ] Lint passes with no warnings

---

## DO NOT
- ❌ Skip TypeScript typechecking
- ❌ Hardcode colors or spacing
- ❌ Create top-level barrel exports that bloat bundle
- ❌ Modify existing Select/DropdownMenu without coordination
- ❌ Add new dependencies without team review
- ❌ Create files outside component directories without justification
- ❌ Skip accessibility checks (ARIA, keyboard navigation)

## DO
- ✅ Follow existing repo conventions
- ✅ Use bits-ui primitives as foundation
- ✅ Implement accessibility (ARIA attributes, keyboard navigation)
- ✅ Add comprehensive examples and documentation
- ✅ Test with hiai-admin integration
- ✅ Use Tailwind v4 for animations and styling
- ✅ Keep component APIs consistent with existing patterns

---

## Timeline
- **Popover:** 3-5 days (HIGH priority - blocks hiai-admin migration)
- **Command/Combobox:** 5-7 days (MEDIUM priority)
- **ContextMenu/Menubar:** 7-10 days (LOW priority)
- **Documentation:** Parallel with implementation
- **Integration Testing:** Ongoing

## Coordination
- Weekly sync with hiai-admin team
- PR reviews from both hiai-ui and hiai-admin maintainers
- Integration testing before merging to main
- Documentation updates before release

---

## Success Metrics
✅ All hiai-admin dropdown/select patterns replaced with hiai-ui primitives  
✅ NotificationBell and EditorToolbar using Popover  
✅ Searchable selects using Command/Combobox  
✅ Zero regressions in existing hiai-ui functionality  
✅ Documentation complete and accurate  
✅ Integration tests passing  
✅ hiai-admin team able to migrate without assistance  

**Ready to execute. Paste this entire file to your team and begin Phase 1 immediately.**