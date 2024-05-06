import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export const highContrast = persisted('high_contrast_mode', false);

export function toggleHighcontrast() {
	highContrast.set(!get(highContrast));
}
