<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { decodeChallenge } from '$lib';
	import { word, challenge, reset } from '$lib/state';

	onMount(() => {
		const id = get(page).params.id;
		const data = decodeChallenge(id);

		reset(data.word);
		challenge.set({
			username: data.username,
			guesses: data.guesses
		});

		goto('/');
	});
</script>

<div class="prose prose-invert mx-auto">
	<br />
	<h1>Loading challenge...</h1>
</div>
