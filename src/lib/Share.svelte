<script lang="ts">
	import { Clipboard, Share } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { encodeChallenge, copy } from '$lib';

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
	<div class="flex h-fit">
		<p class="flex-1 truncate rounded-lg bg-bg p-2">
			{url}
		</p>

		<button class="inline aspect-square bg-bg1 pl-2" on:click={() => copy(url)}>
			<Clipboard class="inline" />
		</button>
	</div>
{/if}
