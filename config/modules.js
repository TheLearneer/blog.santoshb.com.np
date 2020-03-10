import { scan } from 'fs-nextra';
import { basename, extname } from 'path';

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
		routes: async () => {
			const articles = await scan('contents/articles', { filter: (stats, path) => stats.isFile() && extname(path) === '.md' });
			const sitemapList = [...articles.keys()].map((file) => ({
				url: `/articles/${basename(file, '.md')}`,
				priority: 1,
				lastmod: articles.get(file).mtime
			}));
			// Returning the list...
			return [].concat(sitemapList);
		}
	}
}
