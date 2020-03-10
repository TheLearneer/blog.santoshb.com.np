export default {
	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/sitemap'
	],
	// Bootstrap-vue configuration
	bootstrapVue: {
		icons: true
	},
	// Sitemap configuration
	sitemap: {
		cacheTime: 1000 * 60 * 60 * 2,
		trailingSlash: true,
		gzip: true,
		hostname: 'https://blog.santoshb.com.np'
	}
}
