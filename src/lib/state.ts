import { persisted } from 'svelte-persisted-store';

export const board = persisted('board', []);
export const guesses = persisted('guesses', []);
export const word = persisted('word', '');
export const pos = persisted('position', [0, 0]);

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
	guesses.set([]);

	const response = await fetch('/api/random_word');
	word.set(await response.json());
}
