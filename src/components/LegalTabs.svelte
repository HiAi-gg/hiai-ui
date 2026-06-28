<!-- LegalTabs.svelte — Tabbed Privacy / Terms / Cookies view. -->
<!-- Three pill-style tabs, URL hash sync (#privacy / #terms / #cookies), -->
<!-- optional localStorage persistence, and renders LegalPage for the -->
<!-- currently-active tab. -->

<script lang="ts">
	import { replaceState } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { cn } from "../lib/utils.js";
	import type { LegalContentModel, LegalPageType } from "../lib/legal-types.js";
	import LegalPage from "./LegalPage.svelte";

	interface Props {
		appName: string;
		contactEmail: string;
		effectiveDate?: string;
		legalContent?: LegalContentModel | null;
		defaultTab?: LegalPageType;
		/** Optional localStorage key for persisting the active tab. */
		storageKey?: string;
		class?: string;
	}

	const {
		appName,
		contactEmail,
		effectiveDate,
		legalContent,
		defaultTab = "privacy",
		storageKey,
		class: className,
	}: Props = $props();

	const TAB_IDS: readonly LegalPageType[] = ["privacy", "terms", "cookies"] as const;

	const FALLBACK_LABELS: Record<LegalPageType, string> = {
		privacy: "Privacy",
		terms: "Terms of Service",
		cookies: "Cookie Policy",
	};

	function isLegalPageType(value: unknown): value is LegalPageType {
		return (
			typeof value === "string" &&
			(TAB_IDS as readonly string[]).includes(value)
		);
	}

	function tabLabel(id: LegalPageType): string {
		const anchor = legalContent?.anchors?.find((a) => a.id === id);
		return anchor?.label?.trim() || FALLBACK_LABELS[id];
	}

	const tabs: { id: LegalPageType; label: string }[] = $derived(
		TAB_IDS.map((id) => ({ id, label: tabLabel(id) }))
	);

	// svelte-ignore state_referenced_locally
	let activeTab: LegalPageType = $state(defaultTab);

	function setTab(id: LegalPageType): void {
		if (activeTab === id) return;
		activeTab = id;
		// Update the URL hash via SvelteKit's replaceState (avoids router conflict).
		const url = new URL($page.url);
		url.hash = id;
		try {
			replaceState(url, {});
		} catch (err) {
			console.warn("Failed to call replaceState, falling back to window.location.hash update:", err);
			if (typeof window !== "undefined") {
				window.location.hash = id;
			}
		}

		if (storageKey) {
			try {
				localStorage.setItem(storageKey, id);
			} catch {
				// ignore — private mode / quota errors
			}
		}
	}

	onMount(() => {
		if (typeof window === "undefined") return;

		// 1. URL hash takes priority.
		const hash = window.location.hash?.replace(/^#/, "");
		if (isLegalPageType(hash)) {
			activeTab = hash;
			return;
		}

		// 2. Persisted choice from localStorage.
		if (storageKey) {
			try {
				const stored = window.localStorage.getItem(storageKey);
				if (isLegalPageType(stored)) {
					activeTab = stored;
				}
			} catch {
				// ignore
			}
		}
	});
</script>

<div class={cn("legal-tabs w-full max-w-7xl mx-auto", className)}>
	<!-- Pill-style segmented control -->
	<div class="flex justify-center mb-6">
		<div
			class="inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1"
			role="tablist"
			aria-label="Legal documents"
		>
		{#each tabs as tab (tab.id)}
			{@const isActive = activeTab === tab.id}
			<button
				type="button"
				role="tab"
				id={`legal-tab-${tab.id}`}
				aria-selected={isActive}
				aria-controls={`legal-panel-${tab.id}`}
				onclick={() => setTab(tab.id)}
				class={cn(
					"rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					isActive
						? "bg-primary text-primary-foreground shadow-sm"
						: "text-muted-foreground hover:text-foreground"
				)}
			>
				{tab.label}
			</button>
		{/each}
		</div>
	</div>

	<!-- Content card -->
	<div
		class="rounded-[32px] border border-border bg-card p-6 sm:p-8"
		role="tabpanel"
		id={`legal-panel-${activeTab}`}
		aria-labelledby={`legal-tab-${activeTab}`}
	>
		{#key activeTab}
			<LegalPage
				{appName}
				{contactEmail}
				pageType={activeTab}
				{effectiveDate}
				{legalContent}
			/>
		{/key}
	</div>
</div>
