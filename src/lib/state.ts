import { persisted } from 'svelte-persisted-store';
import { get, type Writable } from 'svelte/store';

export const board: Writable<Board> = persisted('board', []);
export const word = persisted('word', '');
export const pos: Writable<Position> = persisted('position', { x: 0, y: 0 });
export const state = persisted('state', 'playing');
export const history = persisted('history', []);
export const letters = persisted('letters', {});
export const challenge: Writable<Challenge> = persisted('challenge', null);

export type Piece = {
	letter: string | null;
	state: PieceState;
};
export type PieceState = 'none' | 'wrong' | 'correct' | 'present';
export type Row = Array<Piece>;
export type Board = Array<Row>;
export type Position = {
	x: number;
	y: number;
};
type Challenge = null | {
	username: string;
	guesses: number;
};

export async function reset(newWord: string | null = null) {
	console.log('RESETTING');

	board.set(newBoard());
	pos.set({ x: 0, y: 0 });
	state.set('playing');
	letters.set({});
	challenge.set(null);

	if (!get(history)) {
		history.set([]);
	}

	if (typeof newWord === 'string') {
		console.log('NEWWORD IS STRING');
		word.set(newWord);
	} else {
		const response = await fetch('/api/random_word');
		console.log('RESPONSE', response);
		word.set(await response.json());
	}
}

function newBoard(): Board {
	const height = 6,
		width = 5;
	const board: Board = [];

	for (let y = 0; y < height; y++) {
		const row: Row = [];
		for (let x = 0; x < width; x++) {
			row.push({
				letter: null,
				state: 'none'
			});
		}
		board.push(row);
	}

	return board;
}
