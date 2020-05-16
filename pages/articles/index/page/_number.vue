<template>
	<div>
		<b-container v-for="(article, i) of articleList" :key="`article-${i}`" class="my-5">
			<BlogCard :data="article" />
		</b-container>
		<div class="my-5">
			<adsbygoogle />
		</div>
	</div>
</template>

<script>
export default {
	components: {
		BlogCard: () => import('@/components/BlogCard')
	},
	props: {
		count: Number,
		articles: Array
	},
	computed: {
		articleList() {
			const pageNum = this.$route.params.number
			const startNum = (pageNum - 1) * this.count;
			const endNum = pageNum * this.count;
			return this.articles.slice(startNum, endNum);
		}
	}
}
</script>