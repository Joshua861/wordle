import { get } from 'svelte/store';
import { board, pos, state, word, history, letters as letterStore, type Board } from './state';

export function input(letter: string) {
	const boardSnap = get(board);
	let { x, y } = get(pos);

	if (boardSnap[y][x].letter === null) {
		boardSnap[y][x] = { letter: letter.toUpperCase(), state: 'none' };
		board.set(boardSnap);

		if (x < 4) {
			x += 1;
		}
		pos.set({ x, y });
	}
}

export function back() {
	const boardSnap = get(board);
	let { x, y } = get(pos);

	const curr = boardSnap[y][x].letter;
	if (curr == null && x !== 0) {
		x -= 1;
	}

	boardSnap[y][x] = { letter: null, state: 'none' };
	board.set(boardSnap);
	pos.set({ x, y });
}

export async function guess(): Promise<string | null> {
	const boardSnap: Board = get(board);
	let { x, y } = get(pos);
	console.log([x, y]);

	const row = boardSnap[y];
	const correctLetters = get(word).split('');

	// check word length
	if (row.filter((piece) => piece.letter !== null).length !== 5) {
		return 'Too short!';
	}

	// check if word in dictionary
	const guess = row.map((piece) => piece.letter!.toLowerCase()).join('');
	console.log('GUESS: ', guess);
	const response = await fetch(`/api/verify?word=${guess}`);
	const value = await response.json();
	if (!value) {
		return 'Word not in dictionary!';
	}

	let perfectLetters = 0;
	const letterSnap = get(letterStore);

	for (let i = 0; i < row.length; i++) {
		const piece = row[i];
		const letter = piece.letter;

		const state =
			correctLetters[i] === letter
				? 'correct'
				: correctLetters.includes(letter)
					? 'present'
					: 'wrong';
		boardSnap[y][i] = { letter, state };

		letterSnap[letter] = state;

		if (state === 'correct') {
			perfectLetters += 1;
		}
	}

	letterStore.set(letterSnap);
	board.set(boardSnap);

	if (perfectLetters == 5) {
		state.set('won');
		if (get(history).length === 0) {
			history.set([]);
		}
		history.update((history) => [
			...history,
			{
				time: Date.now(),
				guesses: y + 1
			}
		]);
		return null;
	}

	y += 1;
	x = 0;
	pos.set({ x, y });

	if (y === 6) {
		state.set('lost');
	}

	return null;
}
