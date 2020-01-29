import path from 'path';

export default {
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
			// Handling shorloading of material-design-icons
			config.resolve.alias['icons'] = path.join(this.buildContext.options.rootDir, "node_modules/vue-material-design-icons");
		}
	}
}