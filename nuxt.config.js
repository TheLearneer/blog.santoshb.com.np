import { head, modules } from './config';
import glob from 'glob';
import path from 'path';

export default {
	mode: 'universal',
	css: [],
	plugins: [],
	modules: [],
	buildModules: [
		'@nuxtjs/netlify-files'
	],
	netlifyFiles: {
		existingFilesDirectory: './netlify'
	},
	build: {
		extend (config) { }
	},
}
