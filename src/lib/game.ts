import { get } from 'svelte/store';
import { board, pos, state, word, history } from './state';

export function input(letter: string) {
	const boardSnap = get(board);
	const posSnap = get(pos);

	if (boardSnap[posSnap[0]][posSnap[1]][0] === '') {
		boardSnap[posSnap[0]][posSnap[1]] = [letter.toUpperCase(), 'none'];
		board.set(boardSnap);

		if (posSnap[1] < 4) {
			posSnap[1] += 1;
		}
		pos.set(posSnap);
	}
}

export function back() {
	const boardSnap = get(board);
	const posSnap = get(pos);

	const curr = boardSnap[posSnap[0]][posSnap[1]][0];
	if (curr == '' && posSnap[1] !== 0) {
		posSnap[1] -= 1;
	}

	boardSnap[posSnap[0]][posSnap[1]] = ['', 'none'];
	board.set(boardSnap);
}

export async function guess(): Promise<string | null> {
	const boardSnap = get(board);
	const posSnap = get(pos);
	const [y, x] = posSnap;
	console.log([x, y]);

	const row = boardSnap[y];
	const letters = get(word).split('');

	console.log('guessing!!');

	console.log(row);
	if (row.filter((letter) => letter[0] !== '').length !== 5) {
		return 'Too short!';
	}

	const guess = row.map((letter) => letter[0].toLowerCase()).join('');
	console.log('GUESS: ', guess);
	const response = await fetch(`/api/verify?word=${guess}`);
	const value = await response.json();

	if (!value) {
		return 'Word not in dictionary!';
	}

	let perfectLetters = 0;
	for (let i = 0; i < row.length; i++) {
		const letter = row[i];
		if (letters[i] === letter[0]) {
			console.log('Letter: ', letter[0], ' in right place!');
			boardSnap[y][i] = [letter[0], 'correct'];
			perfectLetters += 1;
		} else if (letters.includes(letter[0])) {
			console.log('Letter: ', letter[0], ' somewhere in word.');
			boardSnap[y][i] = [letter[0], 'present'];
		} else {
			console.log('Letter: ', letter[0], ' not in word.');
			boardSnap[y][i] = [letter[0], 'wrong'];
		}
	}

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
				guesses: posSnap[0] + 1
			}
		]);
		return null;
	}

	posSnap[0] += 1;
	posSnap[1] = 0;
	pos.set(posSnap);

	if (posSnap[0] === 6) {
		state.set('lost');
	}

	return null;
}
