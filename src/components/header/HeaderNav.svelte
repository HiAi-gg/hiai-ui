<script lang="ts">
	import { cn } from '../../lib/utils.js';

	export interface HeaderNavItem {
		label: string;
		href: string;
		active?: boolean;
	}

	interface Props {
		items: HeaderNavItem[];
		/** Called when a nav link is clicked. Receives the href; when provided,
		 * the default browser navigation is prevented so the parent can route. */
		onNavigate?: (href: string) => void;
		class?: string;
	}

	let { items, onNavigate, class: className }: Props = $props();

	function handleNav(href: string, e: MouseEvent) {
		if (onNavigate) {
			// Respect middle-click / cmd+click for "open in new tab" semantics.
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
			e.preventDefault();
			onNavigate(href);
		}
	}
</script>

<nav
	class={cn('hidden items-center gap-6 lg:flex', className)}
	aria-label="Primary"
>
	{#each items as item (item.href)}
		<a
			href={item.href}
			onclick={(e) => handleNav(item.href, e)}
			aria-current={item.active ? 'page' : undefined}
			class={cn(
				'text-sm font-medium transition-colors',
				item.active
					? 'text-foreground'
					: 'text-muted-foreground hover:text-foreground'
			)}
		>
			{item.label}
		</a>
	{/each}
</nav>