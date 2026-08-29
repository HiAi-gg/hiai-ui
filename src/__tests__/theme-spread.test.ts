import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { runThemeSpread } from '../lib/theme-spread.js';

describe('runThemeSpread', () => {
	const originalMatchMedia = window.matchMedia;

	beforeEach(() => {
		document.documentElement.classList.remove('theme-spread-active');
		document.documentElement.style.removeProperty('--click-x');
		document.documentElement.style.removeProperty('--click-y');
	});

	afterEach(() => {
		window.matchMedia = originalMatchMedia;
	});

	it('applies immediately when View Transitions are unavailable', async () => {
		const apply = vi.fn();
		await runThemeSpread(apply, { x: 12, y: 34 });
		expect(apply).toHaveBeenCalledOnce();
		expect(document.documentElement.classList.contains('theme-spread-active')).toBe(false);
	});

	it('applies immediately when the user prefers reduced motion', async () => {
		window.matchMedia = ((query: string) =>
			({
				matches: query.includes('prefers-reduced-motion'),
				media: query,
				addEventListener() {},
				removeEventListener() {},
			})) as unknown as typeof window.matchMedia;
		const apply = vi.fn();
		await runThemeSpread(apply, { x: 1, y: 1 });
		expect(apply).toHaveBeenCalledOnce();
	});

	it('runs the apply callback inside startViewTransition from the click', async () => {
		const apply = vi.fn();
		(document as Document & { startViewTransition: unknown }).startViewTransition = ((
			update: () => void | Promise<void>,
		) => {
			const done = Promise.resolve(update());
			return { finished: done, ready: done, updateCallbackDone: done };
		}) as Document['startViewTransition'];
		await runThemeSpread(apply, { x: 80, y: 120 });
		expect(apply).toHaveBeenCalledOnce();
		expect(document.documentElement.classList.contains('theme-spread-active')).toBe(false);
	});
});
