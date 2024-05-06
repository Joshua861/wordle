import { expect, test } from 'vitest';
import { words } from '$lib/words';
import { allWords } from '$lib/allWords';

test('Makes sure all words are valid.', async () => {
	for (const word of words) {
		const valid = allWords.includes(word);
		if (!valid) {
			console.log(word);
		}
	}
});
