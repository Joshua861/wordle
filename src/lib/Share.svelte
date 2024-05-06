<script lang="ts">
	import { Clipboard, Share } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { encodeBoard } from '$lib';
	import { toast } from 'svelte-sonner';

	let showShare = false;
	let url: string;

	function share() {
		const data = encodeBoard();
		url = `${$page.url.protocol}//${$page.url.host}/game/${data}`;
		showShare = !showShare;
	}

	async function copyURL() {
		console.log('copying');
		try {
			await navigator.clipboard.writeText(url);
			toast.success('Copied to clipboard');
		} catch (err) {
			console.error('Failed to copy: ', err);
			toast.error('Failed to copy to clipboard');
		}
	}
</script>

<button on:click={share} class="text-fg1" title="Share game">
	<Share />
</button>

<br />

{#if showShare}
	<p class="mt-1 inline w-max text-wrap rounded-lg bg-bg p-2">
		{url.substring(0, 30)}...

		<button on:click={copyURL}>
			<Clipboard class="inline" />
		</button>
	</p>
{/if}
