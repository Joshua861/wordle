<script lang="ts">
	import { board, reset, word, state, challenge, pos } from '$lib/state';
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
	import Challenge from '$lib/Challenge.svelte';
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
			toast.error(response);
		}
	}
</script>

<div bind:this={wrapper} class="prose prose-invert mx-auto p-3">
	<div class="mb-0 ml-3 mt-3">
		<!-- <BackButton /> -->
		<HighContrastButton />
	</div>

	{#if $challenge}
		<br />
		<h1>
			Challenge from {$challenge.username}.
		</h1>
		<p>They beat this in {$challenge.guesses} guesses. Can you beat them?</p>
	{:else}
		<br />
	{/if}

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
		<!-- 	{$keyboard ? 'Hide keyboard' : 'Show keyboard'}</button> -->
	</div>
</div>

<div class="shake h-0 w-0"></div>

{#if $state === 'won'}
	<div class="popup-container">
		<div in:fly={{ y: 100 }} out:fly={{ y: 100 }} class="popup">
			<div class="w-full text-right text-fg1/50">
				<button on:click={() => state.set('playing')}>
					<X />
				</button>
			</div>

			<h1>You win!</h1>

			<GuessGraph />

			{#if $challenge}
				<p>
					{#if $pos.y + 1 > $challenge.guesses}
						Aww man. {$challenge.username} beat you by {$pos.y + 1 - $challenge.guesses}
						guess{$challenge.guesses - ($pos.y + 1) !== -1 ? 'es' : ''}.
					{:else if $pos.y + 1 < $challenge.guesses}
						Yipee! You beat {$challenge.username} by {$challenge.guesses - ($pos.y + 1)} guess{$challenge.guesses -
							($pos.y + 1) !==
						1
							? 'es'
							: ''}!!!
					{:else}
						Tidy. You drew with {$challenge.username}.
					{/if}
				</p>
			{/if}

			<div class="my-3">
				<Share />
				<Challenge />
			</div>

			<button class="btn w-full" on:click={reset}>Play again</button>
		</div>
	</div>
{/if}
{#if $state === 'lost'}
	<div class="popup-container">
		<div in:fly={{ y: 100 }} out:fly={{ y: 100 }} class="popup">
			<h1>You lost.</h1>

			The word was {$word.toLowerCase()}.

			{#if $challenge}
				It looks like {$challenge.username} beat you.
			{/if}

			<br /><br />
			<button class="btn w-full" on:click={reset}>Play again</button>
		</div>
	</div>
{/if}
