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
	<br />
	<p class="mt-1 inline w-max text-wrap rounded-lg bg-bg p-2">
		{url.substring(0, 30)}...

		<button on:click={() => copy(url)}>
			<Clipboard class="inline" />
		</button>
	</p>

	<br /><br />
{/if}
