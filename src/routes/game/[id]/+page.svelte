<script>
	import { page } from '$app/stores';
	import Board from '$lib/Board.svelte';
	import { decodeBoard } from '$lib';

	let id = $page.params.id;
	let board = decodeBoard(id);
</script>

<div class="prose prose-invert mx-auto mt-5 p-5">
	<a href="/" class="font-mono text-xl font-bold underline-offset-4">Back</a>
	<br /><br />
	<Board {board} />
	<br /><br />
</div>
