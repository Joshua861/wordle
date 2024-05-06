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

	Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

	let canvas;
	let history;

	const gruvboxDark = {
		backgroundColor: '#3c3b37',
		borderColor: '#928374',
		textColor: '#ebdbb2'
	};

	historyStore.subscribe((data) => {
		history = data;
		console.log(history);
	});

	onMount(() => {
		new Chart(canvas, {
			type: 'line',
			data: {
				labels: history.map((row) => format(new Date(row.time), 'MMM dd, yyyy')),
				datasets: [
					{
						label: 'Guesses',
						data: history.map((row) => row.guesses),
						borderColor: gruvboxDark.borderColor,
						backgroundColor: gruvboxDark.backgroundColor
					}
				]
			},
			options: {
				scales: {
					x: {
						ticks: {
							color: gruvboxDark.textColor
						}
					},
					y: {
						ticks: {
							color: gruvboxDark.textColor
						}
					}
				},
				plugins: {
					legend: {
						labels: {
							color: gruvboxDark.textColor
						}
					}
				}
			}
		});
	});
</script>

<h3>Guesses over time</h3>
<canvas bind:this={canvas}></canvas>
