import { randomWord } from '$lib/words';

export function GET() {
	const word = randomWord();

	return new Response(JSON.stringify(word), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
