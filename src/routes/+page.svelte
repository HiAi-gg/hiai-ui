<script lang="ts">
  import AdminSidebar from '$lib/../components/AdminSidebar.svelte';
  import AdminHeader from '$lib/../components/AdminHeader.svelte';
  import PageHeader from '$lib/../components/PageHeader.svelte';
  import StatsCard from '$lib/../components/StatsCard.svelte';
  import StatusBadge from '$lib/../components/StatusBadge.svelte';
  import ThemeToggle from '$lib/../components/ThemeToggle.svelte';
  import ThemeSwitcher from '$lib/../components/ThemeSwitcher.svelte';
  import DataTable from '$lib/../components/DataTable.svelte';
  import ConfirmModal from '$lib/../components/ConfirmModal.svelte';
  import EmptyState from '$lib/../components/EmptyState.svelte';
  import SettingsForm from '$lib/../components/SettingsForm.svelte';
  import ConfirmDialog from '$lib/../components/ui/confirm-dialog/ConfirmDialog.svelte';
  import DatePicker from '$lib/../components/DatePicker.svelte';
  import ScrollToTop from '$lib/../components/ScrollToTop.svelte';
  import SearchBar from '$lib/../components/SearchBar.svelte';
  import LiveIndicator from '$lib/../components/LiveIndicator.svelte';
  import DocumentTitle from '$lib/../components/DocumentTitle.svelte';
  import ClassicHeader from '$lib/../components/header/ClassicHeader.svelte';
import HiAiEditor from '$lib/../components/editor/HiAiEditor.svelte';
  import QuickContact from '$lib/../components/QuickContact.svelte';
  import LegalTabs from '$lib/../components/LegalTabs.svelte';
  import ThemeProvider from '$lib/../components/ThemeProvider.svelte';
  import { applyTheme } from '$lib/../lib/themes.js';
  import type { NavGroup } from '$lib/types.js';

  // Primitives
  import Badge from '$lib/../components/ui/badge/badge.svelte';
  import { Button } from '$lib/../components/ui/button/index.js';
  import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '$lib/../components/ui/card/index.js';
  import { Input } from '$lib/../components/ui/input/index.js';
  import Label from '$lib/../components/ui/label/label.svelte';
  import { Switch } from '$lib/../components/ui/switch/index.js';
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/../components/ui/tabs/index.js';
  import Textarea from '$lib/../components/ui/textarea/textarea.svelte';
  import * as DropdownMenu from '$lib/../components/ui/dropdown-menu/index.js';
  import * as Select from '$lib/../components/ui/select/index.js';
  import { Checkbox, CheckboxIndicator } from '$lib/../components/ui/checkbox/index.js';
  import { RadioGroup, RadioGroupItem } from '$lib/../components/ui/radio-group/index.js';

  import {
    Activity,
    ArrowUp,
    Calendar,
    ChevronDown,
    CreditCard,
    FileText,
    Globe,
    Inbox,
    Layers,
    LogOut,
    Mail,
    MapPin,
    Menu,
    Moon,
    Phone,
    PhoneCall,
    Search,
    Send,
    Settings,
    Sun,
    TrendingUp,
    User,
    Users,
    Layout as LayoutIcon,
  } from 'lucide-svelte';

  // Scrollable sidebar demo content (long enough to overflow)
  const navItems = Array.from({ length: 30 }, (_, i) => ({
    label: `Navigation Item ${i + 1}`,
    href: `#item-${i + 1}`,
  }));

  // Composite showcase: AdminSidebar example
  const sidebarGroups: NavGroup[] = [
    {
      label: 'Overview',
      icon: LayoutIcon,
      items: [
        { label: 'Dashboard', href: '#dashboard', icon: LayoutIcon },
        { label: 'Analytics', href: '#analytics', icon: Activity, badge: 'New' },
        { label: 'Reports', href: '#reports', icon: FileText, comingSoon: true },
      ],
    },
    {
      label: 'Workspace',
      icon: Layers,
      items: [
        { label: 'Customers', href: '#customers', icon: Users },
        { label: 'Billing', href: '#billing', icon: CreditCard },
      ],
    },
  ];

  const iconList = [
    { codepoint: '1F30D', label: 'globe' },
    { codepoint: '1F31C', label: 'moon' },
    { codepoint: '1F355', label: 'pizza' },
    { codepoint: '1F366', label: 'ice cream' },
    { codepoint: '1F369', label: 'doughnut' },
    { codepoint: '1F370', label: 'cake' },
    { codepoint: '1F414', label: 'chicken' },
    { codepoint: '1F427', label: 'penguin' },
    { codepoint: '1F433', label: 'whale' },
    { codepoint: '1F495', label: 'heart' },
    { codepoint: '1F4A1', label: 'lightbulb' },
    { codepoint: '1F525', label: 'fire' },
    { codepoint: '1F5D1', label: 'wastebasket' },
    { codepoint: '1F608', label: 'smiling devil' },
    { codepoint: '1F609', label: 'wink' },
    { codepoint: '1F60D', label: 'heart eyes' },
    { codepoint: '1F60E', label: 'cool' },
    { codepoint: '1F60F', label: 'smirk' },
    { codepoint: '1F618', label: 'kiss' },
    { codepoint: '1F619', label: 'kiss heart' },
    { codepoint: '1F61A', label: 'kiss closed eyes' },
    { codepoint: '1F61C', label: 'tongue wink' },
    { codepoint: '1F621', label: 'rage' },
    { codepoint: '1F622', label: 'cry' },
    { codepoint: '1F623', label: 'persevere' },
    { codepoint: '1F624', label: 'triumph' },
    { codepoint: '1F62B', label: 'tired' },
    { codepoint: '1F62C', label: 'grimace' },
    { codepoint: '1F62D', label: 'sob' },
    { codepoint: '1F62F', label: 'hushed' },
    { codepoint: '1F630', label: 'anguish' },
    { codepoint: '1F631', label: 'scream' },
    { codepoint: '1F634', label: 'sleeping' },
    { codepoint: '1F635-200D-1F4AB', label: 'dizzy face' },
    { codepoint: '1F636-200D-1F32B-FE0F', label: 'face in clouds' },
    { codepoint: '1F636', label: 'no mouth' },
    { codepoint: '1F680', label: 'rocket' },
    { codepoint: '1F90C', label: 'pinched fingers' },
    { codepoint: '1F90F', label: 'pinching hand' },
    { codepoint: '1F910', label: 'zipper mouth' },
    { codepoint: '1F912', label: 'thermometer face' },
    { codepoint: '1F913', label: 'nerd' },
    { codepoint: '1F914', label: 'thinking' },
    { codepoint: '1F916', label: 'robot' },
    { codepoint: '1F928', label: 'raised eyebrow' },
    { codepoint: '1F929', label: 'star-struck' },
    { codepoint: '1F92D', label: 'hand over mouth' },
    { codepoint: '1F92E', label: 'vomiting' },
    { codepoint: '1F970', label: 'smiling hearts' },
    { codepoint: '1F973', label: 'partying' },
    { codepoint: '1F979', label: 'disguised' },
    { codepoint: '1F9D0', label: 'yawn' },
    { codepoint: '1F9D1-1F3FB-200D-1F373', label: 'cook' },
    { codepoint: '1F9E1', label: 'orange heart' },
    { codepoint: '1FAE0', label: 'melting face' },
    { codepoint: '1FAE9', label: 'face holding back tears' },
    { codepoint: '1FAF6', label: 'heart hands' },
    { codepoint: '265F', label: 'chess pawn' },
    { codepoint: 'E10C', label: 'E10C' },
    { codepoint: 'E282', label: 'E282' },
  ];

  // DataTable sample data
  const users = [
    { name: 'Ada Lovelace', role: 'Engineer', status: 'active' },
    { name: 'Grace Hopper', role: 'Architect', status: 'active' },
    { name: 'Alan Turing', role: 'Researcher', status: 'pending' },
    { name: 'Linus Torvalds', role: 'Maintainer', status: 'suspended' },
    { name: 'Margaret Hamilton', role: 'Director', status: 'trial' },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) =>
        value ? (value as string).charAt(0).toUpperCase() + (value as string).slice(1) : '',
    },
  ];

  // Left sidebar — collapsible + resizable (hiai-docs pattern)
  let sidebarCollapsed = $state(false);
  let sidebarWidth = $state(224); // w-56 = 224px default
  let isResizing = $state(false);

  $effect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hiai-ui_sidebar_width');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!Number.isNaN(parsed) && parsed >= 180 && parsed <= 500) {
          sidebarWidth = parsed;
        }
      }
    }
  });

  $effect(() => {
    if (isResizing) {
      const onMove = (e: MouseEvent) => {
        sidebarWidth = Math.max(180, Math.min(500, e.clientX));
      };
      const onUp = () => {
        isResizing = false;
        localStorage.setItem('hiai-ui_sidebar_width', String(sidebarWidth));
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
    }
  });

  // Local state for primitives demo
  let inputValue = $state('');
  let textValue = $state('');
  let switchChecked = $state(false);
  let activeTab = $state('overview');
  let dropdownSelection = $state<string | null>(null);

  // Select + forms state
  let selectedFruit = $state('');
  let feedbackName = $state('');
  let feedbackEmail = $state('');
  let feedbackMessage = $state('');
  let feedbackSent = $state(false);
  let subscribeEmail = $state('');
  let subscribed = $state(false);
  let feedbackTopics = $state<string[]>([]);
  let feedbackSource = $state('');
  let mainEl = $state<HTMLElement>();

  // ConfirmModal state
  let confirmOpen = $state(false);

  // ConfirmDialog state
  let confirmDialogOpen = $state(false);

  // DatePicker state
  let datePickerValue = $state('');

  // SearchBar state
  let searchQuery = $state('');

  // DocumentTitle state
  let documentTitle = $state('Demo Title');
  let editorContent = $state('# Hello from HiAiEditor\n\nThis is a **markdown**-enabled WYSIWYG editor with tables, task lists, and syntax highlighting.\n\nTry selecting text and using the toolbar above.');
  let editorOutput = $state({ markdown: '', json: {} });

  // Phase 4 — Theme/Header/Legal state
  let currentTheme = $state('hiai');
  let currentLang = $state('en');
  let isDark = $state(false);

  function setTheme(id: string) {
    currentTheme = id;
    applyTheme(id, isDark);
  }

  function openConfirm() {
    confirmOpen = true;
  }
  function onConfirm() {
    confirmOpen = false;
  }
  function onCancel() {
    confirmOpen = false;
  }
</script>

<svelte:head>
  <title>hiai-ui — Component Library Demo</title>
</svelte:head>

<ThemeProvider defaultTheme="hiai">
<div class="flex h-screen flex-col">
  <!-- ===== Top bar — AdminHeader with ThemeToggle + version badge ===== -->
  <AdminHeader title="hiai-ui Design System">
    {#snippet actions()}
      <Badge>v0.1.0</Badge>
      <ThemeSwitcher current={currentTheme} onSelect={setTheme} />
      <ThemeToggle bind:dark={isDark} themeId={currentTheme} />
    {/snippet}
  </AdminHeader>

  <!-- ===== Scrollable layout: sidebar + main ===== -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Left sidebar — collapsible + resizable (hiai-docs pattern) -->
    <aside
      class="relative flex flex-col shrink-0 border-r bg-card"
      class:transition-[width]={!isResizing}
      class:duration-200={!isResizing}
      style={sidebarCollapsed ? 'width: 48px;' : `width: ${sidebarWidth}px;`}
    >
      <!-- Resize handle (only when not collapsed) -->
      {#if !sidebarCollapsed}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div
          role="separator"
          tabindex="-1"
          class="absolute right-0 top-0 z-50 h-full w-1 cursor-col-resize hover:bg-primary/50 transition-colors"
          class:bg-primary={isResizing}
          onmousedown={(e) => { e.preventDefault(); isResizing = true; }}
        ></div>
      {/if}

      <!-- Collapse toggle button -->
      <button
        onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
        class="absolute -right-3 top-4 z-50 flex size-6 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-accent"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {#if sidebarCollapsed}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m15 15-3-3 3-3"/></svg>
        {/if}
      </button>

      <!-- Sidebar content (hidden when collapsed) -->
      {#if !sidebarCollapsed}
        <nav class="flex-1 space-y-0.5 overflow-y-auto p-3">
          <p class="mb-2 px-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Scrollable Nav
          </p>
          {#each navItems as item (item.href)}
            <a
              href={item.href}
              class="block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          {/each}
        </nav>
      {/if}
    </aside>

    <!-- Main content — tall enough to scroll -->
    <main bind:this={mainEl} class="flex-1 overflow-y-auto p-8">
      <div class="mx-auto max-w-5xl space-y-10 pb-[30vh]">
        <!-- PageHeader -->
        <PageHeader
          title="Component Library"
          description="A scrollable single-page showcase of every composite and primitive in @hiai-gg/hiai-ui."
        />

        <!-- ===== StatsCards (4) ===== -->
        <section class="space-y-3">
          <h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Stats
          </h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard label="Users" value="1,234" accent="primary" icon={Users} />
            <StatsCard label="Revenue" value="$12,345" accent="success" icon={CreditCard} />
            <StatsCard label="Active" value="89%" accent="info" icon={Activity} />
            <StatsCard
              label="Growth"
              value="+12%"
              accent="violet"
              icon={TrendingUp}
              trend={{ value: 12, direction: 'up' }}
            />
          </div>
        </section>

        <!-- ===== Primitives ===== -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Primitives
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- Button variants -->
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>All available variants and sizes.</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Icon button">
                  <Inbox class="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <!-- Badges + StatusBadge -->
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Primitive + domain-specific status badges.</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap items-center gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <StatusBadge status="active" />
                <StatusBadge status="pending" />
                <StatusBadge status="suspended" />
                <StatusBadge status="trial" size="sm" />
                <StatusBadge status="completed" size="lg" />
              </CardContent>
            </Card>

            <!-- Inputs -->
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>Labeled text input + textarea.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="space-y-1.5">
                  <Label for="demo-input">Email</Label>
                  <Input id="demo-input" type="email" placeholder="you@example.com" bind:value={inputValue} />
                </div>
                <div class="space-y-1.5">
                  <Label for="demo-textarea">Notes</Label>
                  <Textarea id="demo-textarea" placeholder="Add a note…" bind:value={textValue} rows={3} />
                </div>
              </CardContent>
            </Card>

            <!-- Switch + Tabs -->
            <Card>
              <CardHeader>
                <CardTitle>Switch & Tabs</CardTitle>
                <CardDescription>Interactive primitives.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <Label for="demo-switch">Enable notifications</Label>
                    <p class="text-xs text-muted-foreground">Receive email alerts for activity.</p>
                  </div>
                  <Switch id="demo-switch" bind:checked={switchChecked} ariaLabel="Enable notifications" />
                </div>

                <Tabs value={activeTab} class="w-full">
                  <TabsList>
                    <TabsTrigger value="overview" selected={activeTab === 'overview'} onclick={(v) => (activeTab = v)}>
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="settings" selected={activeTab === 'settings'} onclick={(v) => (activeTab = v)}>
                      Settings
                    </TabsTrigger>
                    <TabsTrigger value="activity" selected={activeTab === 'activity'} onclick={(v) => (activeTab = v)}>
                      Activity
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" currentValue={activeTab}>
                    <p class="text-sm text-muted-foreground">Overview tab content.</p>
                  </TabsContent>
                  <TabsContent value="settings" currentValue={activeTab}>
                    <p class="text-sm text-muted-foreground">Settings tab content.</p>
                  </TabsContent>
                  <TabsContent value="activity" currentValue={activeTab}>
                    <p class="text-sm text-muted-foreground">Activity tab content.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <!-- DropdownMenu -->
            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>Triggered menus with icons, separators, and live selection.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <!-- Plain menu with separator -->
                <div class="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <Label>Plain menu</Label>
                    <p class="text-xs text-muted-foreground">Basic items, chevron trigger, destructive separator.</p>
                  </div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      {#snippet child(triggerProps)}
                        <Button {...triggerProps.props} variant="outline" size="sm">
                          Options
                          <ChevronDown class="h-4 w-4" />
                        </Button>
                      {/snippet}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end">
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'View')}>View</DropdownMenu.Item>
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'Edit')}>Edit</DropdownMenu.Item>
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'Duplicate')}>Duplicate</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'Delete')}>Delete</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>

                <!-- Icon menu with separator -->
                <div class="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <Label>Account menu</Label>
                    <p class="text-xs text-muted-foreground">Icon items separated by a divider.</p>
                  </div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      {#snippet child(triggerProps)}
                        <Button
                          {...triggerProps.props}
                          variant="ghost"
                          size="icon"
                          aria-label="Open account menu"
                        >
                          <User class="h-4 w-4" />
                        </Button>
                      {/snippet}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end" class="w-48">
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'Profile')}>
                        <User class="h-4 w-4" aria-hidden="true" />
                        Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'Settings')}>
                        <Settings class="h-4 w-4" aria-hidden="true" />
                        Settings
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item onclick={() => (dropdownSelection = 'Sign out')}>
                        <LogOut class="h-4 w-4" aria-hidden="true" />
                        Sign out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>

                <!-- Live state feedback -->
                <p class="text-xs text-muted-foreground">
                  Last action:
                  <span class="font-medium text-foreground">
                    {dropdownSelection ?? 'none yet'}
                  </span>
                </p>
              </CardContent>
            </Card>

            <!-- Select -->
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>Native select replacement with custom trigger and items.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-1.5">
                  <Label for="demo-select">Choose a fruit</Label>
                  <Select.Root type="single" bind:value={selectedFruit}>
                    <Select.Trigger class="w-[200px]">
                      {#snippet child(triggerProps)}
                        <Button {...triggerProps.props} variant="outline" role="combobox" class="w-[200px] justify-between">
                          {selectedFruit || 'Pick a fruit…'}
                          <ChevronDown class="h-4 w-4 opacity-50" />
                        </Button>
                      {/snippet}
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="apple">Apple</Select.Item>
                      <Select.Item value="banana">Banana</Select.Item>
                      <Select.Item value="blueberry">Blueberry</Select.Item>
                      <Select.Item value="grape">Grape</Select.Item>
                      <Select.Item value="orange">Orange</Select.Item>
                      <Select.Separator />
                      <Select.Item value="other">Other</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>
                <p class="text-xs text-muted-foreground">
                  Selected:
                  <span class="font-medium text-foreground">
                    {selectedFruit || 'none'}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- ===== Composites ===== -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Composites
          </h2>

          <!-- DataTable with sample users -->
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Sortable, searchable DataTable — capitalised status column.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={users} columns={tableColumns} searchPlaceholder="Search users…" />
            </CardContent>
          </Card>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- EmptyState -->
            <Card>
              <CardHeader>
                <CardTitle>Empty state</CardTitle>
                <CardDescription>Composable placeholder for empty lists.</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState
                  icon={Inbox}
                  title="No items yet"
                  description="Once you create something, it will appear here."
                  actionLabel="Create item"
                  onAction={openConfirm}
                />
              </CardContent>
            </Card>

            <!-- SettingsForm -->
            <Card>
              <CardHeader>
                <CardTitle>Settings form</CardTitle>
                <CardDescription>Composable labelled form wrapper.</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsForm title="Profile" description="Update your public profile.">
                  <div class="space-y-1.5">
                    <Label for="profile-name">Display name</Label>
                    <Input id="profile-name" placeholder="Ada Lovelace" />
                  </div>
                  <div class="space-y-1.5">
                    <Label for="profile-bio">Bio</Label>
                    <Textarea id="profile-bio" placeholder="A short bio…" rows={3} />
                  </div>
                  {#snippet footer()}
                    <Button variant="outline" onclick={onCancel}>Cancel</Button>
                    <Button onclick={onConfirm}>Save</Button>
                  {/snippet}
                </SettingsForm>
              </CardContent>
            </Card>
          </div>

          <!-- AdminSidebar showcase -->
          <Card>
            <CardHeader>
              <CardTitle>AdminSidebar</CardTitle>
              <CardDescription>Composite sidebar with grouped navigation.</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="overflow-hidden rounded-lg border">
                <div class="h-72 overflow-hidden">
                  <AdminSidebar groups={sidebarGroups} appName="hiai" version="0.0.7" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onclick={openConfirm}>Open confirm modal</Button>
            </CardFooter>
          </Card>
        </section>

        <!-- Icon Showcase -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Icons
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Icons</CardTitle>
              <CardDescription>60 curated icons from OpenMoji. Click to copy codepoint.</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-3">
                {#each iconList as icon}
                  <div class="flex flex-col items-center gap-1 rounded-md border p-2 hover:bg-accent/50 transition-colors" title={icon.codepoint}>
                    <img src="/icons/{icon.codepoint}.svg" alt={icon.label} class="size-10" />
                    <span class="text-[10px] text-muted-foreground text-center leading-tight">{icon.label}</span>
                  </div>
                {/each}
              </div>
            </CardContent>
          </Card>
        </section>

        <!-- ===== Extracted Components ===== -->
        <section class="space-y-4">
          <h2 class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Extracted Components
          </h2>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- ConfirmDialog -->
            <Card>
              <CardHeader>
                <CardTitle>ConfirmDialog</CardTitle>
                <CardDescription>
                  Replacement for ConfirmModal — with busy state, destructive variant, and optional reason.
                </CardDescription>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <Button variant="outline" onclick={() => (confirmDialogOpen = true)}>
                  Open ConfirmDialog
                </Button>
              </CardContent>
            </Card>

            <!-- DatePicker -->
            <Card>
              <CardHeader>
                <CardTitle>DatePicker</CardTitle>
                <CardDescription>Zero-dependency calendar date picker with CSS variable theming.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="space-y-1.5">
                  <Label>Pick a date</Label>
                  <DatePicker bind:value={datePickerValue} />
                </div>
                <p class="text-xs text-muted-foreground">
                  Selected:
                  <span class="font-medium text-foreground">{datePickerValue || 'none'}</span>
                </p>
              </CardContent>
            </Card>

            <!-- SearchBar -->
            <Card>
              <CardHeader>
                <CardTitle>SearchBar</CardTitle>
                <CardDescription>Compact search input with clear button.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <SearchBar onSearch={(q) => (searchQuery = q)} />
                {#if searchQuery}
                  <p class="text-xs text-muted-foreground">
                    Searching for:
                    <span class="font-medium text-foreground">{searchQuery}</span>
                  </p>
                {/if}
              </CardContent>
            </Card>

            <!-- LiveIndicator -->
            <Card>
              <CardHeader>
                <CardTitle>LiveIndicator</CardTitle>
                <CardDescription>Animated online/offline status with CSS ping animation.</CardDescription>
              </CardHeader>
              <CardContent class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <LiveIndicator connected={true} />
                  <span class="text-sm">Connected</span>
                </div>
                <div class="flex items-center gap-2">
                  <LiveIndicator connected={false} />
                  <span class="text-sm">Disconnected</span>
                </div>
              </CardContent>
            </Card>

            <!-- DocumentTitle (InlineEdit) -->
            <Card>
              <CardHeader>
                <CardTitle>DocumentTitle (InlineEdit)</CardTitle>
                <CardDescription>Editable title with Enter-blur save, Escape-revert.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <DocumentTitle
                  title={documentTitle}
                  onUpdate={(t) => (documentTitle = t)}
                />
                <p class="text-xs text-muted-foreground">
                  Current value:
                  <span class="font-medium text-foreground">{documentTitle}</span>
                </p>
              </CardContent>
            </Card>

            <!-- ScrollToTop -->
            <Card>
              <CardHeader>
                <CardTitle>ScrollToTop</CardTitle>
                <CardDescription>
                  Floating scroll-to-top button — scroll down and look bottom-right.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  Scroll down to see the button appear at the bottom-right corner.
                </p>
              </CardContent>
            </Card>

            <!-- ChatWidget -->
            <Card>
              <CardHeader>
                <CardTitle>ChatWidget</CardTitle>
                <CardDescription>
                  Floating AI chatbot — accessible via QuickContact's chat button (bottom-left phone FAB).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  Self-contained glassmorphic chat drawer with markdown parsing, typing
                  indicator, and localStorage persistence. Configure
                  <code class="rounded bg-muted px-1 font-mono text-xs">apiEndpoint</code>,
                  <code class="rounded bg-muted px-1 font-mono text-xs">botName</code>, and
                  <code class="rounded bg-muted px-1 font-mono text-xs">accentColor</code>
                  props. Click outside or press <kbd
                    class="rounded border bg-muted px-1 font-mono text-[10px]">Esc</kbd
                  > to close. Access it via the QuickContact FAB at the bottom-left.
                </p>
              </CardContent>
            </Card>

            <!-- Theme Switcher -->
            <Card>
              <CardHeader>
                <CardTitle>Theme Switcher</CardTitle>
                <CardDescription>Switch between HiAi (teal/purple) and Webs (hot pink) themes.</CardDescription>
              </CardHeader>
              <CardContent class="flex items-center gap-3">
                <Button variant={currentTheme === 'hiai' ? 'default' : 'outline'} size="sm" onclick={() => setTheme('hiai')}>HiAi</Button>
                <Button variant={currentTheme === 'webs' ? 'default' : 'outline'} size="sm" onclick={() => setTheme('webs')}>Webs</Button>
              </CardContent>
            </Card>

            <!-- ClassicHeader -->
            <Card>
              <CardHeader>
                <CardTitle>ClassicHeader</CardTitle>
                <CardDescription>Composable header with logo, nav, language selector, theme toggle, share button, and mobile burger.</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">Scroll to the top of the page to see the ClassicHeader demo in the header bar.</p>
              </CardContent>
            </Card>

            <!-- QuickContact -->
            <Card>
              <CardHeader>
                <CardTitle>QuickContact</CardTitle>
                <CardDescription>Floating contact FAB with expandable channels.</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">Look for the floating phone icon at the bottom-left corner. Click to expand contact channels.</p>
              </CardContent>
            </Card>

            <!-- HiAiEditor -->
            <Card>
              <CardHeader>
                <CardTitle>HiAiEditor</CardTitle>
                <CardDescription>Canonical WYSIWYG editor from hiai-docs with markdown, tables, and task lists.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex-1 flex flex-col border border-border rounded-lg min-h-[500px] bg-card overflow-visible">
                  <HiAiEditor
                    content={editorContent}
                    onUpdate={(output) => { editorOutput = output; }}
                    placeholder="Start typing..."
                  />
                </div>
              </CardContent>
            </Card>

            <!-- LegalTabs -->
            <Card class="md:col-span-2">
              <CardHeader>
                <CardTitle>LegalTabs</CardTitle>
                <CardDescription>Unified legal structure with Privacy, Terms, and Cookies tabs.</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <LegalTabs appName="hiai-ui" contactEmail="hi@hiai-ui.dev" />
              </CardContent>
            </Card>
          </div>

          <ScrollToTop scrollTarget={mainEl} />
        </section>

        <!-- Feedback + Subscribe -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- Feedback Form -->
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Send us a message.</CardDescription>
            </CardHeader>
            <CardContent>
              {#if feedbackSent}
                <div class="flex flex-col items-center gap-2 py-6 text-center">
                  <p class="text-sm font-medium text-foreground">Thanks for your feedback!</p>
                  <p class="text-xs text-muted-foreground">We'll review it shortly.</p>
                  <Button variant="outline" size="sm" onclick={() => (feedbackSent = false)}>
                    Send another
                  </Button>
                </div>
              {:else}
                <form
                  class="space-y-3"
                  onsubmit={(e) => {
                    e.preventDefault();
                    feedbackSent = true;
                  }}
                >
                  <div class="space-y-1.5">
                    <Label for="feedback-name">Name</Label>
                    <Input id="feedback-name" placeholder="Your name" bind:value={feedbackName} required />
                  </div>
                  <div class="space-y-1.5">
                    <Label for="feedback-email">Email</Label>
                    <Input id="feedback-email" type="email" placeholder="you@example.com" bind:value={feedbackEmail} required />
                  </div>
                  <div class="space-y-1.5">
                    <Label for="feedback-message">Message</Label>
                    <Textarea id="feedback-message" placeholder="Tell us what you think…" bind:value={feedbackMessage} rows={3} required />
                  </div>

                  <!-- Checkbox group: Topics of interest -->
                  <div class="space-y-2">
                    <Label>Topics of interest</Label>
                    <div class="flex flex-col gap-2">
                      {#each ['Design', 'Development', 'Marketing', 'Support'] as topic}
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={feedbackTopics.includes(topic)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                feedbackTopics = [...feedbackTopics, topic];
                              } else {
                                feedbackTopics = feedbackTopics.filter(t => t !== topic);
                              }
                            }}
                          >
                            <CheckboxIndicator class="" />
                          </Checkbox>
                          {topic}
                        </label>
                      {/each}
                    </div>
                  </div>

                  <!-- Radio group: How did you hear about us? -->
                  <div class="space-y-2">
                    <Label>How did you hear about us?</Label>
                    <RadioGroup value={feedbackSource} onValueChange={(v: string) => (feedbackSource = v)}>
                      {#each ['Search', 'Social Media', 'Friend', 'Other'] as source}
                        <label class="flex items-center gap-2 text-sm cursor-pointer">
                          <RadioGroupItem value={source} />
                          {source}
                        </label>
                      {/each}
                    </RadioGroup>
                  </div>

                  <Button type="submit" class="w-full">Submit feedback</Button>
                </form>
              {/if}
            </CardContent>
          </Card>

          <!-- Subscribe Form -->
          <Card>
            <CardHeader>
              <CardTitle>Subscribe</CardTitle>
              <CardDescription>Stay up to date with our newsletter.</CardDescription>
            </CardHeader>
            <CardContent>
              {#if subscribed}
                <div class="flex flex-col items-center gap-2 py-6 text-center">
                  <p class="text-sm font-medium text-foreground">You're subscribed!</p>
                  <p class="text-xs text-muted-foreground">Check your inbox for a confirmation email.</p>
                  <Button variant="outline" size="sm" onclick={() => (subscribed = false)}>
                    Unsubscribe
                  </Button>
                </div>
              {:else}
                <form
                  class="space-y-3"
                  onsubmit={(e) => {
                    e.preventDefault();
                    subscribed = true;
                  }}
                >
                  <div class="space-y-1.5">
                    <Label for="subscribe-email">Email address</Label>
                    <Input id="subscribe-email" type="email" placeholder="you@example.com" bind:value={subscribeEmail} required />
                  </div>
                  <Button type="submit" class="w-full">Subscribe</Button>
                </form>
              {/if}
            </CardContent>
          </Card>
        </div>

        <p class="pt-4 text-center text-xs text-muted-foreground">
          End of demo — scrollbar visible on the right edge.
        </p>
      </div>

      <!-- ===== QuickContact (sticky inside <main> so it floats with the content scroll) ===== -->
      <QuickContact
        channels={[
          { type: 'email', label: 'Email', href: 'mailto:hi@hiai-ui.dev' },
          { type: 'telegram', label: 'Telegram', href: 'https://t.me/hiai' },
          { type: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/123456789' },
        ]}
      />
    </main>
  </div>
</div>

<!-- ===== ConfirmModal ===== -->
<ConfirmModal
  open={confirmOpen}
  title="Are you sure?"
  message="This action will be applied immediately. You can also cancel to back out."
  confirmLabel="Confirm"
  cancelLabel="Cancel"
  onConfirm={onConfirm}
  onCancel={onCancel}
/>

<!-- ===== ConfirmDialog ===== -->
<ConfirmDialog
  bind:open={confirmDialogOpen}
  title="Delete Project"
  description="Are you sure you want to delete this project? This action cannot be undone."
  variant="destructive"
  requireReason={true}
  reasonLabel="Reason for deletion"
  reasonPlaceholder="Please explain why..."
  onConfirm={(reason) => {
    confirmDialogOpen = false;
  }}
  onCancel={() => (confirmDialogOpen = false)}
/>

</ThemeProvider>