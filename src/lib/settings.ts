import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export const highContrast = persisted('high_contrast_mode', false);
export const keyboard = persisted('show_keyboard', true);

export function toggleHighcontrast() {
	highContrast.set(!get(highContrast));
}

export function toggleKeyboard() {
	keyboard.set(!get(keyboard));
}
