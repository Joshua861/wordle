const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
			mono: ['Space Mono', 'monospace']
		},
		colors: {
			bg: '#282828',
			fg1: '#ebdbb2',
			fg0: '#fbf1c7',
			red: '#cc241d',
			green: '#98971a',
			yellow: '#d79921',
			bg1: '#3c3836',
			blue: '#458588'
		}
	},

	plugins: [typography]
};

module.exports = config;
