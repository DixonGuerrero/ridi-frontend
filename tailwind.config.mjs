/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/flowbite/**/*.js"
		
	],
	theme: {
		extend: {
/* 			colors: {
				'blue': '#0B66EE',
				'purple': '#7e5bef',
				'pink': '#E239DC',
				'orange': '#ff7849',
				'green': '#13ce66',
				'yellow': '#ffc82c',
				'gray-dark': '#273444',
				'gray': '#C2BABA',
				'gray-light': '#d3dce6',
			 }, */
			 borderRadius: {
				'4xl': '2rem',
			 },
			 fontFamily: {
				raleway: ['Raleway', 'sans-serif'],
			 },
		},
	},
	plugins: [
		require('flowbite/plugin')
  ]
}
