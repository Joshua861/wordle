<script lang="ts">
	import { Clipboard, Swords } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { copy, encodeChallenge } from '$lib';
	import { username } from './settings';
	import { toast } from 'svelte-sonner';

	let showChallenge: boolean = false;
	let showUsername: boolean = false;
	let url: string, usernameInput: string;

	function share() {
		const usernameSnap = $username;
		if (!usernameSnap) {
			showUsername = !showUsername;
			return;
		}

		const data = encodeChallenge();
		if (data === 'err') {
			return;
		}
		url = `${$page.url.protocol}//${$page.url.host}/challenge/${data}`;
		showChallenge = !showChallenge;
	}

	function submit() {
		if (usernameInput.length < 3) {
			toast.error('Username too short!');
			return;
		} else if (usernameInput.length > 9) {
			toast.error('Username too long (max 9 characters).');
			return;
		}
		username.set(usernameInput);
		showUsername = !showUsername;
		share();
	}
</script>

<button on:click={share} class="inline-block text-fg1" title="Share game">
	<Swords class="inline" /> - Challenge
</button>

<br />

{#if showChallenge}
	<div class="flex">
		<p class="flex-1 truncate rounded-lg bg-bg p-2">
			{url}
		</p>
		<button class="ml-auto pl-3 text-left" on:click={() => copy(url)}>
			<Clipboard class="inline" />
		</button>
	</div>
{/if}

{#if showUsername}
	<div class="my-3 flex gap-3">
		<input
			placeholder="Username"
			class="ring-sky-500 flex-1 rounded-lg bg-bg p-2 active:ring-4"
			bind:value={usernameInput}
			type="text"
		/>
		<button on:click={submit} class="btn !px-3">Submit</button>
	</div>
{/if}
