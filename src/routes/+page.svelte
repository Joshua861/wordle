<script lang="ts">
	import { board, reset, word, pos } from '$lib/state';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { input, guess, back } from '$lib/game';
	import { fly } from 'svelte/transition';
	import { toast } from 'svelte-sonner';

	let wrapper;

	onMount(() => {
		if ($word === '') {
			reset(); // Assuming reset is a function you've defined elsewhere
		}

		if (browser) {
			window.removeEventListener('keydown', input);
			window.addEventListener('keydown', (event) => {
				if ('qwertyuiopasdfghjklzxcvbnm'.split('').includes(event.key)) {
					input(event.key);
				} else if (['Backspace', 'Delete'].includes(event.key)) {
					back();
				} else if (event.key == 'Enter') {
					const response = guess();

					console.log(response);

					if (response) {
						toast(response);
						for (let i = 0; i < 5; i++) {
							const selector = `#id-${$pos[0]}-${i}`;
							console.log(selector);
							const element = wrapper.querySelector(selector);
							element.classList.add('shake');
							setTimeout(() => {
								element.classList.remove('shake');
							}, 500); // Duration of the shake animation
						}
					}
				} else {
					console.log('PRESSED: ', event.key);
				}
			});
		}
	});
</script>

<div bind:this={wrapper} class="prose prose-invert mx-auto">
	<br />
	<div class="mx-auto grid w-9/12 grid-cols-5">
		{#each $board as row, rowIndex}
			{#each row as piece, columnIndex}
				<div
					id={`id-${rowIndex}-${columnIndex}`}
					class="m-1 flex aspect-square justify-center
        rounded-xl border border-bg1 text-center align-middle text-4xl"
					class:bg-green={piece[1] == 'correct'}
					class:bg-yellow={piece[1] == 'present'}
				>
					{#if piece[0] !== ''}
						<span transition:fly={{ y: 30 }} class="my-auto font-mono font-bold leading-4">
							{piece[0]}
						</span>
					{/if}
				</div>
			{/each}
		{/each}
	</div>

	<br />
	<div class=" mx-auto w-[80%]">
		<button on:click={reset} class="btn w-full">Reset</button>
	</div>

	<pre class="mb-3">{$word}
{$pos}</pre>
</div>

<div class="shake h-0 w-0"></div>

<style>
	.shake {
		animation: shake 0.5s;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
