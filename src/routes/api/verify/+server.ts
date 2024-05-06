import { allWords } from '$lib/allWords';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const word = url.searchParams.get('word').toLowerCase();

	const valid = allWords.includes(word);

	return new Response(JSON.stringify(valid));
}
