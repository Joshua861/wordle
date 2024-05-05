import { persisted } from 'svelte-persisted-store';

export const highContrast = persisted('high_contrast_mode', false);
