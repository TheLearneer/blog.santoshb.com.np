export default {
	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/google-adsense',
		'@nuxtjs/sitemap'
	],
	// Bootstrap-vue configuration
	bootstrapVue: {
		icons: true
	},
	// Adsense configuration
	'google-adsense': {
		id: 'ca-pub-4087610164584593',
		pageLevelAds: true
	},
	// Sitemap configuration
	sitemap: {
		cacheTime: 1000 * 60 * 60 * 2,
		gzip: true,
		hostname: 'https://blog.santoshb.com.np',
		exclude: [
			'/articles/page'
		]
	}
}
