import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

export const board = persisted('board', []);
export const word = persisted('word', '');
export const pos = persisted('position', [0, 0]);
export const state = persisted('state', 'playing');
export const history = persisted('history', []);
export const letters = persisted('letters', []);

export async function reset() {
	// shit code
	board.set([
		[
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none']
		],
		[
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none']
		],
		[
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none']
		],
		[
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none']
		],
		[
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none']
		],
		[
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none'],
			['', 'none']
		]
	]);
	pos.set([0, 0]);
	state.set('playing');
	letters.set([]);

	if (!get(history)) {
		history.set([]);
	}

	const response = await fetch('/api/random_word');
	word.set(await response.json());
}
