<script>
	import { page } from '$app/stores';
	import { highContrast } from '$lib/settings';
	import { fly } from 'svelte/transition';
	import { decodeBoard } from '$lib';

	let id = $page.params.id;
	let board = decodeBoard(id);
</script>

<div class="prose prose-invert mx-auto mt-5 p-5">
	<a href="/" class="font-mono text-xl font-bold underline-offset-4">Back</a>
	<div class="mx-auto grid w-9/12 grid-cols-5">
		{#each board as row, rowIndex}
			{#each row as piece, columnIndex}
				<div
					id={`id-${rowIndex}-${columnIndex}`}
					class="m-1 flex aspect-square justify-center
        rounded-xl border border-bg1 text-center align-middle text-4xl transition-all"
					class:bg-green={piece.state == 'correct'}
					class:bg-yellow={piece.state == 'present'}
					class:bg-bg1={piece.state == 'wrong'}
					class:!bg-blue={piece.state == 'present' && $highContrast == true}
				>
					{#if piece.letter !== null}
						<span transition:fly={{ y: 30 }} class="my-auto font-mono font-bold leading-4">
							{piece.letter}
						</span>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
	<br /><br />
</div>
