<script lang="ts">
	import { Share } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { encodeChallenge } from '$lib';
	import CopyButton from './CopyButton.svelte';
	import { slide } from 'svelte/transition';

	let showShare = false;
	let url: string;

	function share() {
		const data = encodeChallenge();
		url = `${$page.url.protocol}//${$page.url.host}/game/${data}`;
		showShare = !showShare;
	}
</script>

<button on:click={share} class="inline-block text-fg1" title="Share game">
	<Share class="inline" /> - Share game
</button>

<br />

{#if showShare}
	<div class="flex h-fit" transition:slide={{ axis: 'y' }}>
		<p class="flex-1 truncate rounded-lg bg-bg p-2">
			{url}
		</p>

		<CopyButton text={url} shareData={{ title: 'Wordle game!', text: "Aren't I so cool?", url }} />
	</div>
{/if}
