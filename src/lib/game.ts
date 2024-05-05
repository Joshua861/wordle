import { get } from 'svelte/store';
import { board, pos, word } from './state';

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

export function guess() {
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

	for (let i = 0; i < row.length; i++) {
		const letter = row[i];

		if (letters[i] === letter[0]) {
			console.log('Letter ', letter[0], ' in right place!');
			boardSnap[y][i] = [letter[0], 'correct'];
		} else if (letters.includes(letter[0])) {
			console.log('Letters ', letter[0], 'somewhere in word.');
			boardSnap[y][i] = [letter[0], 'present'];
		}
	}

	return null;
}
