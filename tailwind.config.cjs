/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
		extend: {
			colors: {
        primary: "rgb(249,115,22)",
				secondary: {
					"800": "#f92d73",
					"900": "#",
				}
      },
		},
	},
  plugins: []
};