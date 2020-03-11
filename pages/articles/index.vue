<template>
	<div class="container pb-lg-5">
		<b-row align-h="center" id="blog-list" class="mt-5 mb-5">
			<b-col>
				<div v-for="(post, index) of pageCollection" :key="post.id" class="pb-3 pt-5">
					<blogCard :data="post" />
				</div>
			</b-col>
		</b-row>
		<adsbygoogle />
	</div>
</template>

<script>
export default {
	async asyncData() {
		const resolve = require.context('@/contents/articles/', true, /\.md$/);
		let imports = resolve.keys().map(key => {
			const [, name] = key.match(/\/(.+)\.md$/);
			const file = resolve(key);
			const newData = {};
			for (const attr of Object.keys(file.attributes)) newData[attr] = file.attributes[attr];
			newData.html = file.html;
			return newData;
		});
		return { posts: imports }
	},
	head() {
		return {
			title: 'Blog articles'
		}
	},
	components: {
		BlogCard: () => import('@/components/BlogCard')
	},
	data() {
		return {
			currentPage: null,
			perPage: 10
		}
	},
	computed: {
		pageCount() {
			return Math.ceil(this.posts.length / this.perPage);
		},
		pageCollection() {
			// const posts = this.currentPage ? this.posts.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage) : this.posts;
			return this.posts.sort((a,b) => new Date(b.date.created) - new Date(a.date.created));
		}
	},
	methods: {
		linkGen(pageNum) {
			return pageNum === 1 ? '?' : `?page=${pageNum}`;
		}
	}
}
</script>