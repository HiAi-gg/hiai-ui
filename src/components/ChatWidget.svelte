<!--
  ChatWidget — Floating AI chatbot widget.
  Self-contained: optional FAB toggle + glassmorphic drawer with markdown parsing,
  typing indicator, localStorage persistence, click-outside + Escape-to-close.
  POSTs to `apiEndpoint` as `{ messages: [{ role, content }] }` and reads
  `{ reply: string }`.

  New props:
    - showFab  – when false the component renders only the drawer (no toggle button).
    - expanded – when true the drawer becomes an almost-full-screen centered panel.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { MessageCircle, Send, X, Bot, RefreshCw, Loader2, Maximize2, Minimize2 } from 'lucide-svelte';
	import { browser } from '$app/environment';

	type ChatMessage = { sender: 'bot' | 'user'; text: string; time: string };

	let {
		apiEndpoint = '/api/chat',
		botName = 'HiAi Support',
		greeting = 'Hi! How can I help you today?',
		placeholder = 'Type your message…',
		accentColor = 'var(--primary)',
		position = 'bottom-left',
		open = $bindable(false),
		expanded = $bindable(false),
		showFab = true,
		storageKey = 'hiai-ui-chat'
	}: {
		apiEndpoint?: string;
		botName?: string;
		greeting?: string;
		placeholder?: string;
		accentColor?: string;
		position?: 'bottom-right' | 'bottom-left';
		open?: boolean;
		expanded?: boolean;
		showFab?: boolean;
		storageKey?: string;
	} = $props();

	let chatMessages = $state<ChatMessage[]>([]);
	let chatInput = $state('');
	let isSubmitting = $state(false);
	let isTyping = $state(false);
	let messagesEl = $state<HTMLDivElement | undefined>(undefined);

	const isLeft = $derived(position === 'bottom-left');

	const fabPositionClass = $derived(
		isLeft ? 'bottom-6 left-6' : 'bottom-6 right-6'
	);

	function nowHHMM(): string {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function makeGreeting(): ChatMessage {
		return { sender: 'bot', text: greeting, time: nowHHMM() };
	}

	function pushBot(text: string) {
		chatMessages = [...chatMessages, { sender: 'bot', text, time: nowHHMM() }];
	}

	function pushUser(text: string) {
		chatMessages = [...chatMessages, { sender: 'user', text, time: nowHHMM() }];
	}

	function parseMarkdown(text: string): string {
		if (!text) return '';
		let html = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
		html = html.replace(/_(.*?)_/g, '<em>$1</em>');
		html = html.replace(
			/`(.*?)`/g,
			'<code class="bg-black/10 dark:bg-white/10 px-1 rounded font-mono text-xs">$1</code>'
		);
		html = html.replace(/\\n/g, '<br>');
		return html;
	}

	function toggleChat() {
		open = !open;
		if (open) {
			chatInput = '';
			isSubmitting = false;
			isTyping = false;
		}
	}

	function closeChat() {
		open = false;
	}

	function resetChat() {
		chatMessages = [makeGreeting()];
		chatInput = '';
		isSubmitting = false;
		isTyping = false;
		if (browser) {
			try {
				localStorage.removeItem(`${storageKey}-history`);
			} catch {
				/* ignore */
			}
		}
	}

	function toggleExpanded() {
		expanded = !expanded;
	}

	function handleClickOutside(e: MouseEvent) {
		if (!open) return;
		if (expanded) return; // expanded mode is modal-like, click outside does not close
		const target = e.target as Element | null;
		if (!target) return;
		if (target.closest('.chat-widget-drawer')) return;
		if (target.closest('.chat-widget-toggle')) return;
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			if (expanded) {
				expanded = false;
			} else {
				open = false;
			}
		}
	}

	async function sendMessage(text: string) {
		const trimmed = text.trim();
		if (!trimmed) return;

		pushUser(trimmed);
		chatInput = '';
		isTyping = true;

		try {
			const apiMessages = chatMessages.map((m) => ({
				role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
				content: m.text
			}));

			const res = await fetch(apiEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: apiMessages })
			});

			if (!res.ok) throw new Error(`Chat API error: ${res.status}`);

			const data = await res.json();
			const reply =
				typeof data?.reply === 'string' && data.reply.length > 0
					? data.reply
					: 'Sorry, I lost connection. Please try again.';

			isTyping = false;
			pushBot(reply);
		} catch (err) {
			console.error('Chat error:', err);
			isTyping = false;
			pushBot('Sorry, I lost connection. Please try again.');
		}
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (isSubmitting || isTyping || chatInput.trim() === '') return;
		void sendMessage(chatInput);
	}

	onMount(() => {
		if (!browser) return;

		try {
			const savedHistory = localStorage.getItem(`${storageKey}-history`);
			if (savedHistory) {
				const parsed = JSON.parse(savedHistory);
				if (Array.isArray(parsed) && parsed.length > 0) {
					chatMessages = parsed;
				}
			}
		} catch (e) {
			console.error('Failed to parse saved chat history:', e);
		}

		try {
			const savedOpen = localStorage.getItem(`${storageKey}-open`);
			if (savedOpen === 'true') {
				open = true;
			}
		} catch {
			/* ignore */
		}

		if (chatMessages.length === 0) {
			chatMessages = [makeGreeting()];
		}
	});

	$effect(() => {
		if (open && messagesEl) {
			chatMessages.length;
			isTyping;
			setTimeout(() => {
				if (messagesEl) {
					messagesEl.scrollTo({
						top: messagesEl.scrollHeight,
						behavior: 'smooth'
					});
				}
			}, 30);
		}
	});

	$effect(() => {
		if (!browser) return;
		try {
			localStorage.setItem(`${storageKey}-history`, JSON.stringify(chatMessages));
			localStorage.setItem(`${storageKey}-open`, String(open));
			localStorage.setItem(`${storageKey}-expanded`, String(expanded));
		} catch (e) {
			console.error('Failed to persist chat state:', e);
		}
	});
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

{#if showFab}
	<button
		type="button"
		onclick={toggleChat}
		class="chat-widget-toggle fixed {fabPositionClass} z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		aria-label="Open chat"
		title="Open chat"
	>
		<MessageCircle class="h-5 w-5" />
	</button>
{/if}

{#if open && expanded}
	<!-- Backdrop overlay with blur -->
	<div
		onclick={toggleExpanded}
		class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
		role="presentation"
	></div>
{/if}

{#if open}
	<div
		class="chat-widget-drawer z-50 flex flex-col rounded-3xl border border-border bg-card/90 shadow-2xl backdrop-blur-xl dark:border-border dark:bg-card/90"
		class:fixed={true}
		class:bottom-24={!expanded}
		class:left-6={!expanded && isLeft}
		class:right-6={!expanded && !isLeft}
		class:h-[480px]={!expanded}
		class:w-[350px]={!expanded}
		class:fixed-center-expanded={expanded}
		class:animate-fade-in={!expanded}
		class:animate-scale-in={expanded}
		role="dialog"
		aria-label="{botName} chat"
		aria-modal={expanded ? 'true' : 'false'}
	>
		<!-- Header -->
		<div
			class="flex items-center justify-between rounded-t-3xl border-b border-border px-5 py-4 dark:border-border"
			style="background: linear-gradient(to right, color-mix(in srgb, {accentColor} 10%, transparent), color-mix(in srgb, {accentColor} 10%, transparent))"
		>
			<div class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg"
					style="background-color: color-mix(in srgb, {accentColor} 10%, transparent); color: {accentColor}"
				>
					<Bot class="h-[18px] w-[18px]" />
				</div>
				<div>
					<div class="text-sm font-bold text-foreground dark:text-white">{botName}</div>
					<div class="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-emerald-500 uppercase">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
						Online
					</div>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={toggleExpanded}
					title={expanded ? 'Shrink chat' : 'Expand chat'}
					aria-label={expanded ? 'Shrink chat' : 'Expand chat'}
					class="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-accent"
				>
					{#if expanded}
						<Minimize2 class="h-4 w-4" />
					{:else}
						<Maximize2 class="h-4 w-4" />
					{/if}
				</button>
				<button
					type="button"
					onclick={resetChat}
					title="Start a new request"
					aria-label="Start a new request"
					class="flex h-7 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground"
				>
					<RefreshCw class="h-3 w-3" />
					<span>Reset</span>
				</button>
				<button
					type="button"
					onclick={closeChat}
					aria-label="Close chat"
					title="Close chat"
					class="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-accent"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		</div>

		<!-- Messages -->
		<div bind:this={messagesEl} class="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-4 md:p-6">
			{#each chatMessages as msg (msg.time + msg.sender + msg.text)}
				<div class="flex flex-col {msg.sender === 'user' ? 'items-end' : 'items-start'}">
					<div
						class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm {msg.sender === 'user'
							? 'rounded-tr-none text-white'
							: 'rounded-tl-none bg-muted text-foreground dark:bg-muted dark:text-foreground'}"
						style={msg.sender === 'user' ? `background-color: ${accentColor};` : ''}
					>
						{@html parseMarkdown(msg.text)}
					</div>
					<span class="mt-1 px-1 text-[9px] text-muted-foreground">{msg.time}</span>
				</div>
			{/each}
			{#if isTyping}
				<div class="flex w-24 items-center gap-1.5 rounded-2xl rounded-tl-none bg-muted px-3 py-2 text-muted-foreground dark:bg-muted">
					<Loader2 class="h-3 w-3 animate-spin" />
					<span class="text-xs">Sending…</span>
				</div>
			{/if}
		</div>

		<!-- Input area -->
		<form onsubmit={handleSubmit} class="flex gap-2 border-t border-border p-3 dark:border-border md:p-4">
			<input
				bind:value={chatInput}
				type="text"
				{placeholder}
				autocomplete="off"
				disabled={isSubmitting || isTyping}
				class="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-[var(--primary)] disabled:opacity-60 dark:border-border dark:bg-muted dark:text-white"
			/>
			<button
				type="submit"
				disabled={isSubmitting || isTyping || chatInput.trim() === ''}
				aria-label="Send message"
				title="Send message"
				class="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
				style="background-color: {accentColor};"
			>
				<Send class="h-4 w-4" />
			</button>
		</form>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fadeIn 220ms ease both;
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in {
			animation: none;
		}
	}

	/* Expanded centering and animations */
	.fixed-center-expanded {
		position: fixed;
		left: 16px;
		right: 16px;
		top: 16px;
		bottom: 16px;
		height: calc(100vh - 32px);
		width: calc(100vw - 32px);
	}
	@media (min-width: 768px) {
		.fixed-center-expanded {
			left: 50%;
			top: 50%;
			right: auto;
			bottom: auto;
			transform: translate(-50%, -50%);
			width: 85vw;
			max-width: 1024px;
			height: 80vh;
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	@media (max-width: 767px) {
		@keyframes scaleInMobile {
			from {
				opacity: 0;
				transform: scale(0.95);
			}
			to {
				opacity: 1;
				transform: scale(1);
			}
		}
		.animate-scale-in {
			animation: scaleInMobile 250ms cubic-bezier(0.16, 1, 0.3, 1) both;
		}
	}
	@media (min-width: 768px) {
		.animate-scale-in {
			animation: scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1) both;
		}
	}

	/* Custom thin scrollbar (theme-adaptive via CSS vars) */
	.scrollbar-thin {
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--foreground) 20%, transparent) transparent;
	}
	.scrollbar-thin::-webkit-scrollbar {
		width: 6px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background-color: color-mix(in srgb, var(--foreground) 20%, transparent);
		border-radius: 3px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background-color: color-mix(in srgb, var(--foreground) 35%, transparent);
	}
</style>
