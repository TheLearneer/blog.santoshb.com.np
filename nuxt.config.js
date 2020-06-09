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
