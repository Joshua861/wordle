<script lang="ts">
	import { EyeOff } from 'lucide-svelte';
	import { toggleHighcontrast, highContrast } from './settings';
</script>

<button
	title="Toggle high-contrast mode."
	class="rounded-xl p-2 transition-all {$highContrast
		? 'hover:bg-fg bg-fg1 text-bg'
		: 'border border-bg1 hover:bg-bg1/50'}"
	on:click={toggleHighcontrast}
>
	<EyeOff size="24" /></button
>
