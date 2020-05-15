import { head, modules } from './config';
import glob from 'glob';
import path from 'path';

export default {
	// basic configs...
	mode: 'universal',
	css: ['@/assets/style/index'],
	plugins: [
		{ src: '@/plugins/disqus', mode: 'client' }
	],
	// Other configs...
	head,
	...modules,
	build: {
		extend (config) {
			// frontmatter-markdown-loader configuration
			config.module.rules.push({
				test: /\.md$/,
				include: path.resolve(__dirname, 'contents'),
				loader: 'frontmatter-markdown-loader',
				options: {
					mode: ['html', 'vue-component']
				}
			});
		}
	},
	generate: {
		routes: getRoutes()
	}
}

function getRoutes() {
	const articles = glob.sync('*.md', { cwd: 'contents' }).map((file) => `/articles/${path.basename(file, '.md')}`);
	const articlePages = [];
	const pages = Math.ceil(articles.length / 5);
	if (pages > 1) for (let i = 0; i < pages; i++) articlePages.push(`/articles/page/${i+1}`);
	return [].concat(articles, articlePages);
}