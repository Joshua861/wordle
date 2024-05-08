<script>
	import { browser } from '$app/environment';

	let scrollTop = null;
	let scrollLeft = null;

	function disableScroll() {
		if (browser) {
			scrollTop = window.pageYOffset || window.document.documentElement.scrollTop;
			scrollLeft = window.pageXOffset || window.document.documentElement.scrollLeft;
			window.onscroll = function () {
				window.scrollTo(scrollLeft, scrollTop);
			};
		}
	}

	function enableScroll() {
		if (browser) {
			window.onscroll = function () {};
		}
	}

	export let enabled = false;

	$: if (enabled) disableScroll();
	else enableScroll();
</script>
