import { board } from './state';
import { format } from 'date-fns';
import { parse } from 'date-fns/parse';
import { get } from 'svelte/store';

export function getRandom(arr: Array<unknown>) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function encodeBoard(): string {
	const b = get(board);
	let data = '';

	let states = {
		none: 'n',
		wrong: 'w',
		present: 'p',
		correct: 'c'
	};

	for (const row of b) {
		for (const piece of row) {
			let s = states[piece.state];
			const letter = piece.letter ?? '+';
			data += letter.toLowerCase() + s;
		}
	}

	return data;
}

export function decodeBoard(encodedData: string): any[] {
	const states = {
		n: 'none',
		w: 'wrong',
		p: 'present',
		c: 'correct'
	};

	let decodedBoard: any[] = [];

	// Split the encoded data into individual pieces
	const pieces = encodedData.split('');

	for (let i = 0; i < pieces.length; i += 2) {
		// Extract the letter and state representation
		const letter = pieces[i].toLowerCase();
		const stateRepresentation = pieces[i + 1];

		// Determine the state from the representation
		const state = states[stateRepresentation];

		// Create a piece object
		const piece = {
			letter: letter == '+' ? null : letter.toUpperCase(),
			state: state
		};

		// Add the piece to the current row
		if (!decodedBoard[decodedBoard.length - 1]) {
			decodedBoard.push([piece]);
		} else {
			decodedBoard[decodedBoard.length - 1].push(piece);
		}
	}

	return decodedBoard;
}
