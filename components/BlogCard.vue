<template>
	<div :class="`container shadow rounded pb-3 h-100 ${featured ? 'bg-gold' : 'bg-gray-300'}`">
		<b-icon-award v-if="featured" class="pinned-icon" scale="3" variant="dark" />
		<b-row>
			<b-col sm="12" lg="7">
				<div class="image-top">
					<b-img fluid :src="bannerImg" width="640" :alt="data.title" class="rounded shadow" />
				</div>
			</b-col>
			<b-col>
				<div class="container pt-lg-3">
					<h2 class="text-center">
						<n-link :to="articleLink">{{ data.title }}</n-link>
					</h2>
					<p class="text-center text-muted" v-if="data.subtitle">
						<i>{{ data.subtitle }}</i>
					</p>
					<hr>
					<div class="text-center">
						<b-badge class="mr-2 text-capitalize" pill variant="secondary" v-for="badge in data.tags" :key="badge">
							<!--<n-link :to="getTopicLink(badge)" class="mx-1 topic-badge">-->
								{{ badge }}
							<!--</n-link>-->
						</b-badge>
					</div>
					<hr>
					<span v-html="data.summary" />
					<p>
						<n-link :to="articleLink">Read more...</n-link>
					</p>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { format } from 'date-fns';

export default {
	props: {
		data: Object,
		featured: Boolean
	},
	computed: {
		bannerImg() {
			return require(`@/assets/img/banner/${this.data.banner}`);
		},
		articleLink() {
			return `/articles/${this.data.id}`;
		},
		readTime() {
			return `${Math.floor(this.data.html.replace( /[^\w ]/g, "" ).split( /\s+/ ).length / 228) + 1} min`;
		}
	},
	methods: {
		getDate(date) {
			return format(new Date(date), 'MMMM do, yyyy');
		},
		getTopicLink(topic) {
			return `/topics/${topic.toLowerCase().split(' ').join('-')}`;
		}
	}
}
</script>

<style scoped>
.image-top {
	position: relative;
	top: -20px;
	width: 90%;
	left: 5%
}
a {
	text-decoration: none;
}
.bg-gold {
	background-color: #F0E68C;
}
.pinned-icon {
	position: absolute;
	right: 9px;
}
</style>