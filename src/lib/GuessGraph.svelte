<script lang="ts">
	import { history as historyStore } from './state';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale
	} from 'chart.js';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';
	import colors from './colors';

	Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

	let canvas;
	let history;

	historyStore.subscribe((data) => {
		history = data;
		console.log(history);
	});

	onMount(() => {
		new Chart(canvas, {
			type: 'line',
			data: {
				labels: history.map((row) => format(new Date(row.time), 'yy-mm-dd')),
				datasets: [
					{
						label: 'Guesses',
						data: history.map((row) => row.guesses),
						borderColor: colors.yellow,
						backgroundColor: colors.bg1,
						lineTension: 0.4
					}
				]
			},
			options: {
				scales: {
					x: {
						ticks: {
							color: colors.fg3
						}
					},
					y: {
						ticks: {
							color: colors.fg3
						}
					}
				},
				plugins: {
					legend: {
						labels: {
							color: colors.fg3,
							font: {
								family: "'JetBrains Mono', 'monospace'"
							}
						}
					}
				}
			}
		});
	});
</script>

<h3>Guesses over time</h3>
<canvas bind:this={canvas}></canvas>
