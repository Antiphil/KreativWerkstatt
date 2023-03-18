import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
	  adapter: adapter(),
	  alias: {
		  $i18n: 'src/i18n',
		},
	},
	preprocess: vitePreprocess()
  };

export default config;
