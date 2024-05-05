<script>
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
</script>

<slot></slot>

<Toaster position="bottom-center" theme="dark" />
