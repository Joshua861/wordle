<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
</script>

<slot></slot>

<Toaster position="top-center" theme="dark" />

<svelte:head>
	<title>Definitely not Wordle</title>
</svelte:head>
