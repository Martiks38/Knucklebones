/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
	theme: {
		clipPath: {
			buttonHome: 'clip-path: polygon(0 0, 100% 0, 84% 50%, 100% 100%, 0 100%, 16% 50%);'
		},
		extend: {
			colors: {
				redGame: '#fc0403'
			},
			rotate: {
				135: '135deg'
			}
		}
	},
	plugins: []
}
