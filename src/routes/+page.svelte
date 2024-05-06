<script lang="ts">
	import { board, reset, word, pos, state } from '$lib/state';
	import HighContrastButton from '$lib/HighContrastButton.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { input, guess, back } from '$lib/game';
	import { fly } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import GuessGraph from '$lib/GuessGraph.svelte';
	import Keyboard from '$lib/Keyboard.svelte';
	import Share from '$lib/Share.svelte';
	import Board from '$lib/Board.svelte';
	import { X } from 'lucide-svelte';

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
			handleGuess();
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

	async function handleGuess() {
		const response = await guess();

		console.log(response, typeof response);

		if (response) {
			toast(response);
		}
	}
</script>

<div bind:this={wrapper} class="prose prose-invert mx-auto p-3">
	<div class="mb-0 ml-3 mt-3">
		<!-- <BackButton /> -->
		<HighContrastButton />
	</div>
	<br />

	<Board board={$board} />

	<!-- {#if $keyboard} -->
	<div transition:fly={{ y: 100 }}>
		<Keyboard {handleGuess} />
	</div>
	<!-- {/if} -->
	<div class=" mx-auto mt-2 flex gap-2 sm:w-[80%]">
		<button on:click={reset} class="btn w-full">Reset</button>
		<button on:click={() => state.set('lost')} class="btn w-full">I give up</button>
		<!-- <button class="btn w-full" on:click={toggleKeyboard}> -->
		<!-- 	{$keyboard ? 'Hide keyboard' : 'Show keyboard'}</button -->
		<!-- > -->
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
			class="max-w-11/12 prose prose-invert my-auto h-fit w-fit rounded-xl bg-bg1 p-10"
		>
			<div class="w-full text-right text-fg1/50">
				<button on:click={() => state.set('playing')}>
					<X />
				</button>
			</div>

			<h1>You win!</h1>

			<GuessGraph />

			<div class="my-3">
				<Share />
			</div>

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
