<script lang="ts">
	import { CornerDownLeft, Delete } from 'lucide-svelte';
	import { back, guess, input } from './game';
	import { highContrast } from './settings';
	import { letters } from './state';

	let keys = ['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')];

	export let handleGuess;

	// Initialize the array mapping keys to styles
	let buttonStyles = {};

	// Reactive statement to update buttonStyles whenever $letters changes
	$: {
		buttonStyles = {};
		$letters.forEach(([key, status]) => {
			const style =
				status === 'correct'
					? 'bg-green'
					: status === 'wrong'
						? 'bg-bg1'
						: $highContrast
							? 'bg-blue'
							: 'bg-yellow';
			buttonStyles[key.toLowerCase()] = style;
		});
	}
</script>

{#each keys as row, rowIndex}
	<div class="flex">
		{#if rowIndex === 2}
			<button
				on:click={handleGuess}
				class="m-1 flex flex-1 justify-center rounded border border-bg1 py-2 align-middle"
				><CornerDownLeft /></button
			>
		{/if}
		{#each row as key}
			<button
				class="m-1 flex-1 rounded border border-bg1 py-2 {buttonStyles[key]}"
				on:click={() => input(key)}
			>
				{key}
			</button>
		{/each}
		{#if rowIndex === 2}
			<button
				on:click={back}
				class="m-1 flex flex-1 justify-center rounded border border-bg1 py-2 align-middle"
			>
				<Delete />
			</button>
		{/if}
	</div>
{/each}
