<script lang="ts">
  import AdminSidebar from '$lib/components/AdminSidebar.svelte';
  import AdminHeader from '$lib/components/AdminHeader.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import StatsCard from '$lib/components/StatsCard.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import DataTable from '$lib/components/DataTable.svelte';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import SettingsForm from '$lib/components/SettingsForm.svelte';
  import type { NavGroup } from '$lib/types.js';

  // Primitives
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import Label from '$lib/components/ui/label/label.svelte';
  import { Switch } from '$lib/components/ui/switch/index.js';
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs/index.js';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';

  import { Activity, CreditCard, FileText, Inbox, Layers, Users, TrendingUp, Layout as LayoutIcon } from 'lucide-svelte';

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

  // Local state for primitives demo
  let inputValue = $state('');
  let textValue = $state('');
  let switchChecked = $state(false);
  let activeTab = $state('overview');

  // ConfirmModal state
  let confirmOpen = $state(false);

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

<div class="flex h-screen flex-col">
  <!-- ===== Top bar — AdminHeader with ThemeToggle + version badge ===== -->
  <AdminHeader title="hiai-ui Design System">
    {#snippet actions()}
      <Badge>v0.1.0</Badge>
      <ThemeToggle />
    {/snippet}
  </AdminHeader>

  <!-- ===== Scrollable layout: sidebar + main ===== -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Left sidebar — scrollable to demo elegant scrollbar -->
    <aside class="w-56 shrink-0 overflow-y-auto border-r bg-card">
      <nav class="space-y-0.5 p-3">
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
    </aside>

    <!-- Main content — tall enough to scroll -->
    <main class="flex-1 overflow-y-auto p-8">
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
                  <AdminSidebar groups={sidebarGroups} appName="hiai" version="0.1.0" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onclick={openConfirm}>Open confirm modal</Button>
            </CardFooter>
          </Card>
        </section>

        <p class="pt-4 text-center text-xs text-muted-foreground">
          End of demo — scrollbar visible on the right edge.
        </p>
      </div>
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