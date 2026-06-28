<!--
  FloatingQuickActions — Floating action button (FAB) that expands to reveal quick actions.

  Default: a circular button pinned to the bottom-right corner showing a chat bubble icon.
  On click: scales + rotates and reveals a stacked column of action buttons above it.
  Each item can be a link (`href`) or a callback (`action`), with a tooltip label.

  All colors come from tokens.css (via Tailwind v4 utilities). The custom animation
  respects `prefers-reduced-motion`.

  Usage:
    <FloatingQuickActions />
    <FloatingQuickActions items={[
      { icon: MessageCircle, label: 'Chat', action: openChat },
      { icon: Mail,         label: 'Email', href: 'mailto:hi@example.com' },
      { icon: Phone,        label: 'Call',  href: 'tel:+15555550100' },
      { icon: ArrowUp,      label: 'Top',   action: scrollTop },
    ]} />
-->
<script lang="ts">
	// lucide-svelte icons are not compatible with Svelte 5 Component type; use any
import type { Component } from 'svelte';
	import { MessageCircle, Mail, Phone, ArrowUp, Plus } from 'lucide-svelte';
	import { cn } from '../lib/utils.js';

	export interface QuickAction {
		/** Lucide icon component (or any Svelte component that accepts `class`). */
		icon: any;
		/** Tooltip / accessible label. */
		label: string;
		/** When set, the item renders as an anchor that navigates to this URL. */
		href?: string;
		/** When set, the item renders as a button that fires this callback on click. */
		action?: () => void;
	}

	interface Props {
		/** Quick-action items. Defaults to Chat, Email, Call, Scroll-to-top. */
		items?: QuickAction[];
		/** Optional override for the resting FAB icon (defaults to MessageCircle). */
		triggerIcon?: Component;
		/** Optional class on the outer wrapper. */
		class?: string;
	}

	let { items, triggerIcon, class: className }: Props = $props();

	let open = $state(false);

	// Default actions. Stable references — no re-creation on render.
	const defaultItems: QuickAction[] = [
		{
			icon: MessageCircle,
			label: 'Chat',
			action: () => {
				if (typeof window !== 'undefined') {
					window.dispatchEvent(new CustomEvent('hiai:open-chat'));
				}
			}
		},
		{
			icon: Mail,
			label: 'Email',
			href: 'mailto:hello@example.com'
		},
		{
			icon: Phone,
			label: 'Call',
			href: 'tel:+10000000000'
		},
		{
			icon: ArrowUp,
			label: 'Scroll to top',
			action: () => {
				if (typeof window !== 'undefined') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			}
		}
	];

	const actions = $derived<QuickAction[]>(
		items && items.length > 0 ? items : defaultItems
	);
	const RestIcon = $derived<any>(triggerIcon ?? MessageCircle);

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (!open) return;
		const target = event.target as Element | null;
		if (!target) return;
		if (target.closest('.fqa-root')) return;
		open = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			open = false;
		}
	}

	function handleItem(item: QuickAction, event: MouseEvent) {
		// Fire the action callback if provided, even alongside an href.
		if (item.action) {
			// For anchor navigations we let the default link behavior run.
			if (item.href) {
				item.action();
				open = false;
				return;
			}
			event.preventDefault();
			item.action();
			open = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div
	class={cn(
		'fqa-root fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3',
		className
	)}
>
	<!-- Stacked action items (revealed when expanded) -->
	{#if open}
		<div
			class="flex flex-col items-end gap-3 fqa-actions"
			role="menu"
			aria-label="Quick actions"
		>
			{#each actions as item, index (item.label)}
				{#if item.href}
					<a
						href={item.href}
						role="menuitem"
						tabindex="0"
						aria-label={item.label}
						title={item.label}
						onclick={(e: MouseEvent) => handleItem(item, e)}
						class="fqa-item group flex items-center gap-3 outline-none"
						style="--fqa-delay: {index * 40}ms"
					>
						<!-- Tooltip pill (visible while expanded) -->
						<span
							class="pointer-events-none rounded-md border border-border bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground shadow-md"
						>
							{item.label}
						</span>
						<!-- Action button surface -->
						<span
							class="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-popover text-foreground shadow-lg transition-all group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:ring-2 group-focus-visible:ring-ring"
						>
							<item.icon class="h-5 w-5" strokeWidth={2} />
						</span>
					</a>
				{:else}
					<button
						type="button"
						role="menuitem"
						tabindex="0"
						aria-label={item.label}
						title={item.label}
						onclick={(e: MouseEvent) => handleItem(item, e)}
						class="fqa-item group flex items-center gap-3 outline-none"
						style="--fqa-delay: {index * 40}ms"
					>
						<!-- Tooltip pill (visible while expanded) -->
						<span
							class="pointer-events-none rounded-md border border-border bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground shadow-md"
						>
							{item.label}
						</span>
						<!-- Action button surface -->
						<span
							class="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-popover text-foreground shadow-lg transition-all group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:ring-2 group-focus-visible:ring-ring"
						>
							<item.icon class="h-5 w-5" strokeWidth={2} />
						</span>
					</button>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Main FAB trigger -->
	<button
		type="button"
		onclick={toggle}
		aria-label={open ? 'Close quick actions' : 'Open quick actions'}
		aria-expanded={open}
		title={open ? 'Close' : 'Quick actions'}
		class={cn(
			'fqa-trigger flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl',
			'transition-all duration-300 ease-out',
			'hover:scale-105 hover:shadow-2xl',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
			open && 'fqa-trigger-open'
		)}
	>
		<span class="fqa-icon-wrap inline-flex items-center justify-center">
			{#if open}
				<Plus class="h-6 w-6" strokeWidth={2.25} />
			{:else}
				<RestIcon class="h-6 w-6" strokeWidth={2} />
			{/if}
		</span>
	</button>
</div>

<style>
	/* Stagger each action's entrance when the menu expands. */
	@keyframes fqaItemIn {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.92);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	.fqa-item {
		opacity: 0;
		animation: fqaItemIn 240ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--fqa-delay, 0ms);
	}

	/* Smooth rotate + scale on the FAB trigger. */
	.fqa-icon-wrap {
		transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.fqa-trigger-open .fqa-icon-wrap {
		transform: rotate(45deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.fqa-item {
			animation: none;
			opacity: 1;
		}
		.fqa-icon-wrap {
			transition: none;
		}
		.fqa-trigger {
			transition: none;
		}
	}
</style>