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
				class="key flex flex-1 justify-center !bg-red text-center align-middle text-bg"
			>
				<Delete class="my-auto" />
			</button>
		{/if}
		{#each row as key}
			<button
				class="key {getStyle(letters[key.toUpperCase()], $highContrast)}"
				on:click={() => input(key)}
			>
				{key}
			</button>
		{/each}
		{#if rowIndex === 2}
			<button
				on:click={handleGuess}
				class="key flex flex-1 justify-center !bg-purple align-middle text-bg"
				><CornerDownLeft class="my-auto" /></button
			>
		{/if}
	</div>
{/each}
