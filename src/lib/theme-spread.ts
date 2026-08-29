export type ThemeSpreadOrigin = { x: number; y: number };

type ViewTransition = {
	finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
	startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
};

function prefersReducedMotion(): boolean {
	return (
		typeof window.matchMedia === 'function' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

function setClickOrigin(origin?: ThemeSpreadOrigin): void {
	const root = document.documentElement;
	if (!origin) {
		root.style.removeProperty('--click-x');
		root.style.removeProperty('--click-y');
		return;
	}
	root.style.setProperty('--click-x', `${Math.round(origin.x)}px`);
	root.style.setProperty('--click-y', `${Math.round(origin.y)}px`);
}

/**
 * Circular theme reveal from a click. Chrome/Edge use View Transitions;
 * Safari/Firefox and reduced-motion apply immediately. Callers pass the
 * actual class/token mutation in `apply` — this helper does not own
 * localStorage or light/dark/system policy.
 *
 * Do not clone the live DOM as a fallback: editors and large trees are
 * too expensive to snapshot.
 */
export async function runThemeSpread(
	apply: () => void | Promise<void>,
	origin?: ThemeSpreadOrigin,
): Promise<void> {
	if (typeof document === 'undefined') {
		await apply();
		return;
	}

	const startViewTransition = (document as DocumentWithViewTransition)
		.startViewTransition;
	if (!origin || !startViewTransition || prefersReducedMotion()) {
		await apply();
		return;
	}

	const root = document.documentElement;
	setClickOrigin(origin);
	root.classList.add('theme-spread-active');
	try {
		const transition = startViewTransition(async () => {
			await apply();
		});
		await transition.finished;
	} catch {
		await apply();
	} finally {
		root.classList.remove('theme-spread-active');
		setClickOrigin();
	}
}
