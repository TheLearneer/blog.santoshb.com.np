<template>
	<div class="container pb-xl-5 pt-xl-5">
		<h1 class="text-center">Welcome to my blog</h1>
		<div v-if="featuredPosts.length" class="pt-2">
			<div class="separator">
				<h4>Featured Articles</h4>
			</div>
			<b-row align-h="center" class="mt-3 pb-3">
				<b-col>
					<div v-for="(post, index) of featuredPosts" :key="post.id" class="pb-3 pt-5">
						<blogCard :data="post" :featured="post.featured" />
					</div>
				</b-col>
			</b-row>
			<hr>
		</div>
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
			if (!newData.hasOwnProperty('featured')) newData.featured = false;
			newData.html = file.html;
			return newData;
		});
		return {
			featuredPosts: imports.filter(imp => imp.featured)
		}
	},
	components: {
		BlogCard: () => import('@/components/BlogCard')
	}
}
</script>

<style scoped>
h1, h2 {
	padding-top: 1.5rem;
	padding-bottom: 0.5rem;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 20px;
}
.separator::before, .separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d9d9d9;
}
.separator::before {
  margin-right: 1em;
}
.separator::after {
  margin-left: 1em;
}
</style>