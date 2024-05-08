<script lang="ts">
	import { copy, share } from '$lib';
	import { Clipboard, Share } from 'lucide-svelte';

	export let text: string;
	export let shareData: {
		title: string;
		text: string;
		url: string;
	};
</script>

<button class="inline aspect-square bg-bg1 pl-2" on:click={() => copy(text)}>
	<Clipboard class="inline" />
</button>
<button class="inline aspect-square bg-bg1 pl-2" on:click={() => share(shareData)}>
	<Share class="inline" />
</button>
