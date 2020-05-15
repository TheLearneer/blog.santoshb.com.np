<template>
	<b-container class="py-3">
		<div class="text-center">
			<p class="h1 text-uppercase mt-3 text-center font-weight-bold">Articles</p>
			<div class="pt-2 pb-2 text-center">
				<span>These are some of the recent articles written for sharing knowledge and helping others out.</span>
				<p class="font-italic">Feedbacks are more than welcome!</p>
			</div>
		</div>
		<div class="py-4" v-if="pageCount > 1">
			<b-pagination-nav pills :link-gen="linkGen" :number-of-pages="pageCount" use-router align="center" />
		</div>
		<div>
			<nuxt-child :articles="posts" :count="perPage" />
		</div>
		<div class="pt-4" v-if="pageCount > 1">
			<b-pagination-nav pills :link-gen="linkGen" :number-of-pages="pageCount" use-router align="center" />
		</div>
	</b-container>
</template>

<script>
export default {
	async asyncData() {
		const resolve = require.context('@/contents/', true, /\.md$/);
		const posts = resolve.keys()
			.map(key => {
				const [, name] = key.match(/\/(.+)\.md$/);
				const file = resolve(key);
				return file.attributes;
			})
			.sort((a,b) => new Date(b.date.created) - new Date(a.date.created));
		return { posts }
	},
	head() {
		return {
			title: 'Blog articles'
		}
	},
	data() {
		return {
			perPage: 5
		}
	},
	computed: {
		pageCount() {
			return Math.ceil(this.posts.length / this.perPage);
		}
	},
	methods: {
		linkGen(pageNum) {
			return pageNum === 1 ? '/articles' : `/articles/page/${pageNum}`;
		}
	}
}
</script>