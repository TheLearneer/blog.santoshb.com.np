const blogDescription = 'Blog featuring programming and Technology related stuffs to help you grow in an efficient way'

export default {
	titleTemplate: (title) => title ? `${title} - Santosh Bhandari Blog` : 'Blog - Santosh Bhandari | Technology and Programming related articles',
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: blogDescription },
		{ hid: 'keywords', name: 'keywords', content: 'programming, technology, blog' },
		{ hid: 'author', name: 'author', content: 'Santosh Bhandari' },
		{ hid: 'rating', name: 'rating', content: 'safe for kids' },
		// Open-graph
		{ hid: 'og:title', name: 'og:title', content: 'Santosh Blogs' },
		{ hid: 'og:type', name: 'og:type', content: 'website' },
		{ hid: 'og:url', name: 'og:url', content: 'https://blog.santoshb.com.np' },
		{ hid: 'og:site_name', name: 'og:site_name	', content: 'blog.santoshb.com.np' },
		{ hid: 'og:description', name: 'og:description', content: blogDescription },
		// Twitter
		{ hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
		{ hid: 'twitter:url', name: 'twitter:url', content: 'https://blog.santoshb.com.np' },
		{ hid: 'twitter:title', name: 'twitter:title', content: 'Santosh Blogs' },
		{ hid: 'twitter:description', name: 'twitter:description', content: blogDescription }
	]
}