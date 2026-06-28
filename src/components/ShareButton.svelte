<script lang="ts">
	/**
	 * ShareButton — tokenized composite for hiai-ui
	 *
	 * Adapted from webs/svelte-app/src/lib/components/ShareButton.svelte.
	 * Differences:
	 *  - lucide-svelte icons (Share2, Copy, Check) only — no inline SVG for X/Facebook/etc
	 *    because lucide-svelte covers the common social icons via `lucide-svelte/icons`.
	 *    (Keeping the most common destinations: copy, X, Facebook, LinkedIn, Telegram, WhatsApp.)
	 *  - Uses Tailwind utility classes mapped to tokens.css variables — no hardcoded colors
	 *  - `url` and `title` are simple props; the caller owns page metadata
	 */
	import { Share2, Copy, Check, Facebook, Linkedin, Send, MessageCircle } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import type { Component } from 'svelte';
	import { cn } from '../lib/utils.js';

	/**
	 * Custom platform definition injected via the `extraPlatforms` prop.
	 * `icon` is a lucide-svelte component; `getUrl` builds the share URL
	 * from the share URL + text already resolved by the component.
	 */
	type SharePlatform = {
		id: string;
		label: string;
		icon: Component;
		getUrl: (opts: { url: string; text: string }) => string;
	};

	interface Props {
		url?: string;
		title?: string;
		text?: string;
		class?: string;
		/** Additional platform buttons rendered after the built-ins. */
		extraPlatforms?: SharePlatform[];
	}

	let {
		url,
		title,
		text,
		class: className,
		extraPlatforms = []
	}: Props = $props();

	let isOpen = $state(false);
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => {
		if (timer) clearTimeout(timer);
	});

	function getUrl(): string {
		if (url) return url;
		if (typeof window !== 'undefined') return window.location.href;
		return '';
	}

	function getTitle(): string {
		if (title) return title;
		if (typeof document !== 'undefined') return document.title;
		return '';
	}

	function getText(): string {
		const t = getTitle();
		return text ? (t ? `${t}\n\n${text}` : text) : t;
	}

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (!isOpen) return;
		if (!(event.target as Element).closest('.share-root')) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	async function handleMainClick() {
		// Prefer native share API when available AND when the browser is willing
		// to share the current payload (canShare returns false for unsupported
		// MIME types / data shapes on some platforms).
		if (
			typeof navigator !== 'undefined' &&
			typeof navigator.share === 'function' &&
			navigator.canShare?.({ url: getUrl() }) !== false
		) {
			try {
				await navigator.share({ title: getTitle(), text: getText(), url: getUrl() });
				return;
			} catch {
				// User cancelled or share failed — fall through to dropdown
			}
		}
		toggle();
	}

	async function copyLink() {
		const target = getUrl();
		try {
			if (typeof navigator !== 'undefined' && navigator.clipboard) {
				await navigator.clipboard.writeText(target);
			} else {
				// Legacy fallback for older browsers
				const ta = document.createElement('textarea');
				ta.value = target;
				ta.setAttribute('readonly', '');
				ta.style.position = 'fixed';
				ta.style.opacity = '0';
				document.body.appendChild(ta);
				ta.select();
				document.execCommand('copy');
				document.body.removeChild(ta);
			}
			copied = true;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			// Silent failure — surface nothing in production UI
		}
	}

	function shareTo(platform: 'twitter' | 'facebook' | 'linkedin' | 'telegram' | 'whatsapp') {
		const u = getUrl();
		const t = getText();
		const enc = encodeURIComponent;
		const destinations: Record<typeof platform, string> = {
			twitter: `https://twitter.com/intent/tweet?url=${enc(u)}&text=${enc(t)}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`,
			telegram: `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`,
			whatsapp: `https://wa.me/?text=${enc(t + '\n' + u)}`
		};
		if (typeof window !== 'undefined') {
			window.open(destinations[platform], '_blank', 'noopener,noreferrer');
		}
		close();
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class={cn('share-root relative inline-block', className)}>
	<button
		type="button"
		onclick={handleMainClick}
		aria-haspopup="menu"
		aria-expanded={isOpen}
		aria-label="Share"
		title="Share"
		class={cn(
			'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors',
			'hover:bg-accent hover:text-accent-foreground',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
			isOpen && 'bg-accent text-accent-foreground'
		)}
	>
		<Share2 class="h-4 w-4" />
	</button>

	{#if isOpen}
		<div
			role="menu"
			aria-label="Share options"
			class={cn(
				'absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg',
				'animate-in fade-in-0 zoom-in-95'
			)}
		>
			<button
				type="button"
				role="menuitem"
				onclick={copyLink}
				class={cn(
					'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
				)}
			>
				{#if copied}
					<Check class="h-4 w-4 flex-shrink-0 text-success" />
				{:else}
					<Copy class="h-4 w-4 flex-shrink-0" />
				{/if}
				<span>{copied ? 'Copied!' : 'Copy link'}</span>
			</button>

			<div class="my-1 h-px bg-border" role="separator"></div>

			<button
				type="button"
				role="menuitem"
				onclick={() => shareTo('twitter')}
				class={cn(
					'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
				)}
			>
				<svg
					class="h-4 w-4 flex-shrink-0"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
					/>
				</svg>
				<span>X (Twitter)</span>
			</button>

			<button
				type="button"
				role="menuitem"
				onclick={() => shareTo('facebook')}
				class={cn(
					'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
				)}
			>
				<Facebook class="h-4 w-4 flex-shrink-0" />
				<span>Facebook</span>
			</button>

			<button
				type="button"
				role="menuitem"
				onclick={() => shareTo('linkedin')}
				class={cn(
					'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
				)}
			>
				<Linkedin class="h-4 w-4 flex-shrink-0" />
				<span>LinkedIn</span>
			</button>

			<button
				type="button"
				role="menuitem"
				onclick={() => shareTo('telegram')}
				class={cn(
					'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
				)}
			>
				<Send class="h-4 w-4 flex-shrink-0" />
				<span>Telegram</span>
			</button>

			<button
				type="button"
				role="menuitem"
				onclick={() => shareTo('whatsapp')}
				class={cn(
					'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
					'hover:bg-accent hover:text-accent-foreground',
					'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
				)}
			>
				<MessageCircle class="h-4 w-4 flex-shrink-0" />
				<span>WhatsApp</span>
			</button>

			{#if extraPlatforms.length > 0}
				<div class="my-1 h-px bg-border" role="separator"></div>
				{#each extraPlatforms as platform (platform.id)}
					{@const Icon = platform.icon}
					<button
						type="button"
						role="menuitem"
						onclick={() => {
							const u = getUrl();
							const t = getText();
							if (typeof window !== 'undefined') {
								window.open(
									platform.getUrl({ url: u, text: t }),
									'_blank',
									'noopener,noreferrer'
								);
							}
							close();
						}}
						class={cn(
							'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
							'hover:bg-accent hover:text-accent-foreground',
							'focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground'
						)}
					>
						<Icon class="h-4 w-4 flex-shrink-0" />
						<span>{platform.label}</span>
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>
