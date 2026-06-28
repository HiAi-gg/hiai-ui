<!--
  QuickContact — Floating contact FAB that expands to show multiple contact channels,
  with an inline chat toggle that opens a ChatWidget drawer.

  Default FAB icon: PhoneCall. Click expands upward with staggered-animated channel buttons.
  Each channel is an <a> with the appropriate lucide icon and tooltip label.
  A Chat toggle button appears at the top of the expanded list that opens a floating
  ChatWidget drawer (bound to internal `chatOpen` state). The ChatWidget is rendered
  once at the top level of the component so its `position: fixed` FAB and drawer
  stack correctly without being trapped inside the expanded-menu container.

  All colours come from tokens.css (via Tailwind v4 utilities). The custom animation
  respects `prefers-reduced-motion`.

  Usage:
    <QuickContact channels={[
      { type: 'email',    label: 'Email',    href: 'mailto:hi@example.com' },
      { type: 'phone',    label: 'Call',     href: 'tel:+15555550100' },
      { type: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/15555550100' },
    ]} />
    <QuickContact channels={[...]} position="bottom-right" />
-->
<script lang="ts">
	import {
		PhoneCall,
		Mail,
		Phone,
		MessageSquare,
		Send,
		MapPin,
		Facebook,
		Instagram,
		Linkedin,
		Plus
	} from 'lucide-svelte';
	import { cn } from '../lib/utils.js';
	import ChatWidget from './ChatWidget.svelte';

	export interface QuickContactChannel {
		type:
			| 'email'
			| 'phone'
			| 'whatsapp'
			| 'telegram'
			| 'maps'
			| 'facebook'
			| 'instagram'
			| 'linkedin';
		label: string;
		href: string;
	}

	interface Props {
		/** Contact channel entries. */
		channels: QuickContactChannel[];
		/** Corner to pin the FAB. Default 'bottom-left' (opposite ScrollToTop). */
		position?: 'bottom-left' | 'bottom-right';
		/** Extra classes on the outer wrapper. */
		class?: string;
	}

	let { channels, position = 'bottom-left', class: className }: Props = $props();

	let open = $state(false);
	let chatOpen = $state(false);

	// Map each channel type to its lucide icon (brand icons verified in lucide-svelte v0.577).
	// Note: `whatsapp` is rendered with an inline brand SVG (lucide has no WhatsApp glyph),
	// so it is intentionally absent from this map — we narrow the key type to the
	// channels that DO have a lucide glyph.
	type IconableChannel = Exclude<QuickContactChannel['type'], 'whatsapp'>;
	const iconMap: Record<IconableChannel, any> = {
		email: Mail,
		phone: Phone,
		telegram: Send,
		maps: MapPin,
		facebook: Facebook,
		instagram: Instagram,
		linkedin: Linkedin
	};

	function toggle() {
		if (chatOpen) {
			chatOpen = false;
			open = false;
		} else {
			open = !open;
		}
	}

	function close() {
		open = false;
		chatOpen = false;
	}

	function toggleChat(event: MouseEvent) {
		event.stopPropagation();
		chatOpen = !chatOpen;
		if (chatOpen) {
			open = false; // close the expanded contact menu when opening chat
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (!open) return;
		const target = event.target as Element | null;
		if (!target) return;
		if (target.closest('.qc-root')) return;
		if (target.closest('.chat-widget-drawer')) return; // ignore clicks inside chat drawer
		close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && (open || chatOpen)) {
			close();
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div
	class={cn(
		'qc-root sticky bottom-6 z-50 flex flex-col gap-3',
		position === 'bottom-left' ? 'left-6 items-start' : 'right-6 items-end',
		className
	)}
>
	<!-- Expanded items (stack upward above the FAB) -->
	{#if open}
		<div
			class="flex flex-col gap-3"
			class:items-end={position === 'bottom-right'}
			class:items-start={position === 'bottom-left'}
			role="menu"
			aria-label="Contact channels"
		>
			<!-- Chat toggle button (opens ChatWidget drawer directly) -->
			<button
				type="button"
				role="menuitem"
				tabindex="0"
				aria-label="Open chat"
				title="Chat"
				onclick={toggleChat}
				class="qc-item group flex items-center gap-3 outline-none"
				class:flex-row-reverse={position === 'bottom-right'}
				style="--qc-delay: 0ms"
			>
				<span
					class="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-popover text-foreground shadow-lg transition-all group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:ring-2 group-focus-visible:ring-ring"
				>
					<MessageSquare class="h-5 w-5" strokeWidth={2} />
				</span>
			</button>

			<!-- Contact channel links -->
			{#each channels as channel, index (channel.type)}
				<a
					href={channel.href}
					role="menuitem"
					tabindex="0"
					aria-label={channel.label}
					title={channel.label}
					target="_blank"
					rel="noopener noreferrer"
					class="qc-item group flex items-center gap-3 outline-none"
					class:flex-row-reverse={position === 'bottom-right'}
					style="--qc-delay: {(index + 1) * 40}ms"
				>
					<!-- Icon-only button surface (label is exposed via aria-label + native title tooltip) -->
					<span
						class="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-popover text-foreground shadow-lg transition-all group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:ring-2 group-focus-visible:ring-ring"
					>
						{#if channel.type === 'whatsapp'}
							<!-- Brand WhatsApp glyph (lucide-svelte has no WhatsApp icon) -->
							<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
							</svg>
						{:else}
							{@const IconComponent = iconMap[channel.type]}
							<IconComponent class="h-5 w-5" strokeWidth={2} />
						{/if}
					</span>
				</a>
			{/each}
		</div>
	{/if}

	<!-- Main FAB trigger -->
	<button
		type="button"
		onclick={toggle}
		aria-label={open || chatOpen ? 'Close' : 'Contact us'}
		aria-expanded={open || chatOpen}
		title={open || chatOpen ? 'Close' : 'Contact us'}
		class={cn(
			'qc-trigger flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl',
			'transition-all duration-300 ease-out',
			'hover:scale-105 hover:shadow-2xl',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
			(open || chatOpen) && 'qc-trigger-open'
		)}
	>
		<span class="qc-icon-wrap inline-flex items-center justify-center">
			{#if open || chatOpen}
				<Plus class="h-6 w-6" strokeWidth={2.25} />
			{:else}
				<PhoneCall class="h-6 w-6" strokeWidth={2} />
			{/if}
		</span>
	</button>
</div>

<!-- ChatWidget rendered at root level (not inside the expanded menu container) -->
<ChatWidget bind:open={chatOpen} botName="Support" showFab={false} />

<style>
	/* Stagger each item's entrance when the menu expands. */
	@keyframes qcItemIn {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.92);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	.qc-item {
		opacity: 0;
		animation: qcItemIn 240ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--qc-delay, 0ms);
	}

	/* Smooth rotate + scale on the FAB trigger. */
	.qc-icon-wrap {
		transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.qc-trigger-open .qc-icon-wrap {
		transform: rotate(45deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.qc-item {
			animation: none;
			opacity: 1;
		}
		.qc-icon-wrap {
			transition: none;
		}
		.qc-trigger {
			transition: none;
		}
	}
</style>
