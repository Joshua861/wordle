<script lang="ts">
	import { EyeOff } from 'lucide-svelte';
	import { toggleHighcontrast, highContrast } from './settings';
</script>

<button
	title="Toggle high-contrast mode."
	class="top-3 rounded-xl p-3 transition-all {$highContrast
		? 'hover:bg-fg bg-fg1 text-bg'
		: 'border border-bg1 hover:bg-bg1/50'}"
	on:click={toggleHighcontrast}
>
	<EyeOff />
</button>
