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
			return this.articles.slice(0, this.count);
		}
	}
}
</script>