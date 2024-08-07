/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				Poppins: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: false,
		darkTheme: false,
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		logs: true,
		themeRoot: ':root',
	},
}
