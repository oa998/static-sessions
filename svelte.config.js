import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite'; // for tailwind

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			// this will match a file
			'$gameplay/*': 'src/gameplay',
			'$components/*': 'src/components'
		},
		paths: {
			base: '/fewer-pieces'
		}
	},
	preprocess: vitePreprocess()
};
