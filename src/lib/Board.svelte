<script lang="ts">
	import { highContrast } from '$lib/settings';
	import { get } from 'svelte/store';
	import { pos } from '$lib/state';
	import { fly } from 'svelte/transition';

	export let board;
</script>

<div class="mx-auto grid w-11/12 grid-cols-5 sm:w-9/12">
	{#each board as row, rowIndex}
		{#each row as piece, columnIndex}
			<div
				id={`id-${rowIndex}-${columnIndex}`}
				class="m-[2px] flex aspect-square justify-center rounded-xl
        {JSON.stringify($pos) == JSON.stringify({ x: columnIndex, y: rowIndex })
					? 'border-2 border-fg1'
					: 'border border-bg1'}
        text-center align-middle text-3xl transition-all sm:m-1 sm:text-4xl"
				class:bg-green={piece.state == 'correct'}
				class:bg-yellow={piece.state == 'present'}
				class:bg-bg1={piece.state == 'wrong'}
				class:!bg-blue={piece.state == 'present' && $highContrast == true}
				on:click={() => pos.set({ x: columnIndex, y: get(pos).y })}
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
