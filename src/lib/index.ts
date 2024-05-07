import { board, word, pos } from './state';
import { username } from './settings';
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';

export function getRandom(arr: Array<unknown>) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export async function copy(text) {
	console.log('copying');
	try {
		await navigator.clipboard.writeText(text);
		toast.success('Copied to clipboard');
	} catch (err) {
		console.error('Failed to copy: ', err);
		toast.error('Failed to copy to clipboard');
	}
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

export function encodeChallenge(): string {
	const wordSnap = get(word);
	const encodedWord = btoa(wordSnap);
	const guesses = get(pos).y + 1;
	const usernameSnap = get(username);

	if (usernameSnap === null) {
		toast.error('No username set.');
		return 'err';
	}

	return guesses.toString() + usernameSnap!.length.toString() + usernameSnap! + encodedWord;
}

export function decodeChallenge(
	encodedChallenge: string
): { guesses: number; username: string; word: string } | null {
	if (!encodedChallenge) {
		return null;
	}

	const guesses = parseInt(encodedChallenge.slice(0, 1), 10);
	const usernameLength = parseInt(encodedChallenge.slice(1, 2), 10);
	const username = encodedChallenge.slice(2, 2 + usernameLength);
	const encodedWord = encodedChallenge.slice(2 + usernameLength);

	return { guesses, username, word: atob(encodedWord) };
}
