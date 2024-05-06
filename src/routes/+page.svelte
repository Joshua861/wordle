<script lang="ts">
	import { board, reset, word, pos, state } from '$lib/state';
	import HighContrastButton from '$lib/HighContrastButton.svelte';
	import BackButton from '$lib/BackButton.svelte';
	import { highContrast } from '$lib/settings';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { input, guess, back } from '$lib/game';
	import { fly } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import GuessGraph from '$lib/GuessGraph.svelte';

	let wrapper;
	let listenerAdded = false;

	onMount(() => {
		if ($word === '') {
			reset();
		}

		if (!listenerAdded && browser) {
			window.addEventListener('keydown', handleInput);
		}
	});

	async function handleInput(event) {
		if ('qwertyuiopasdfghjklzxcvbnm'.split('').includes(event.key)) {
			input(event.key);
		} else if (['Backspace', 'Delete'].includes(event.key)) {
			back();
		} else if (event.key == 'Enter') {
			const response = await guess();

			console.log(response, typeof response);

			if (response) {
				toast(response);
				for (let i = 0; i < 5; i++) {
					const selector = `#id-${$pos[0]}-${i}`;
					console.log(selector);
					const element = wrapper.querySelector(selector);
					element.classList.add('shake');
					setTimeout(() => {
						element.classList.remove('shake');
					}, 500);
				}
			}
		} else {
			console.log('PRESSED: ', event.key);
		}
		listenerAdded = true;
	}

	onDestroy(() => {
		if (listenerAdded && browser) {
			window.removeEventListener('keydown', handleInput);
		}
	});
</script>

<div bind:this={wrapper} class="prose prose-invert mx-auto">
	<div class="absolute left-3 mt-3">
		<BackButton class="pr-3" />
		<HighContrastButton />
	</div>
	<br />
	<div class="mx-auto grid w-9/12 grid-cols-5">
		{#each $board as row, rowIndex}
			{#each row as piece, columnIndex}
				<div
					id={`id-${rowIndex}-${columnIndex}`}
					class="m-1 flex aspect-square justify-center
        rounded-xl border border-bg1 text-center align-middle text-4xl transition-all"
					class:bg-green={piece[1] == 'correct'}
					class:bg-yellow={piece[1] == 'present'}
					class:bg-bg1={piece[1] == 'wrong'}
					class:!bg-blue={piece[1] == 'present' && $highContrast == true}
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
</div>

<div class="shake h-0 w-0"></div>

{#if $state === 'won'}
	<div
		class="absolute left-0 top-0 z-10 flex h-screen w-screen justify-center border bg-bg/10 align-middle drop-shadow-2xl backdrop-blur"
	>
		<div
			in:fly={{ y: 100 }}
			out:fly={{ y: 100 }}
			class="prose prose-invert my-auto h-fit w-fit rounded-xl bg-bg1 p-10"
		>
			<h1>You win!</h1>

			<GuessGraph />

			<br />

			<button class="btn w-full" on:click={reset}>Play again</button>
		</div>
	</div>
{/if}
{#if $state === 'lost'}
	<div
		class="absolute left-0 top-0 z-10 flex h-screen w-screen justify-center border bg-bg/10 align-middle drop-shadow-2xl backdrop-blur"
	>
		<div
			in:fly={{ y: 100 }}
			out:fly={{ y: 100 }}
			class="prose prose-invert my-auto h-fit w-fit rounded-xl bg-bg1 p-10"
		>
			<h1>You lost.</h1>

			The word was {$word.toLowerCase()}.

			<br /><br />
			<button class="btn w-full" on:click={reset}>Play again</button>
		</div>
	</div>
{/if}

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
