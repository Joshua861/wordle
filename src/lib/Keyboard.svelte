<script lang="ts">
	import { CornerDownLeft, Delete } from 'lucide-svelte';
	import { back, guess, input } from './game';
	import { highContrast } from './settings';
	import { letters as letterStore } from './state';

	let keys = ['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')];
	let letters;

	export let handleGuess;

	letterStore.subscribe((data) => {
		letters = data;
		console.log(letters);
	});

	function getStyle(state, hc) {
		return state === 'correct'
			? 'bg-green'
			: state === 'wrong'
				? 'bg-bg1'
				: state !== 'present'
					? 'bg-bg'
					: hc
						? 'bg-blue'
						: 'bg-yellow';
	}
</script>

{#each keys as row, rowIndex}
	<div class="flex">
		{#if rowIndex === 2}
			<button
				on:click={back}
				class="m-1 flex flex-1 justify-center rounded border border-bg1 py-2 align-middle"
			>
				<Delete />
			</button>
		{/if}
		{#each row as key}
			<button
				class="m-1 flex-1 rounded border border-bg1 py-2 transition-all {getStyle(
					letters[key.toUpperCase()],
					$highContrast
				)}"
				on:click={() => input(key)}
			>
				{key}
			</button>
		{/each}
		{#if rowIndex === 2}
			<button
				on:click={handleGuess}
				class="m-1 flex flex-1 justify-center rounded border border-bg1 py-2 align-middle"
				><CornerDownLeft /></button
			>
		{/if}
	</div>
{/each}
