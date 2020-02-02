import { head, modules } from './config';
import glob from 'glob';
import path from 'path';

export default {
	// basic configs...
	mode: 'universal',
	css: [
		//'@/assets/style/index',
		'@/assets/style/scss/index'
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
	// Department routes
	const programs = glob.sync('articles/*.md', { cwd: 'contents' }).map((file) => {
		return `/articles/${path.basename(file, '.md')}`;
	});
	// Returning the list...
	return [].concat(programs).sort();
}