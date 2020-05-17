<template>
	<div class="rounded shadow pb-3 h-100 bg-gray-300">
		<b-row>
			<b-col sm="12" lg="7">
				<div class="image-top">
					<b-img-lazy fluid :src="bannerImg" width="640" :alt="data.title" class="rounded shadow" />
				</div>
			</b-col>
			<b-col>
				<b-container class="pt-lg-3">
					<p class="h2 text-center font-weight-bold">{{ data.title }}</p>
					<p class="text-center text-muted" v-if="data.subtitle">
						<span class="font-italic">{{ data.subtitle }}</span>
					</p>
					<div class="border-top-bottom">
						<b-icon icon="calendar" />
						<span class="small ml-1 font-weight-bold">{{ createDate }}</span>
					</div>
					<div class="my-3">
						<span v-html="data.summary" />
						<span class="ml-3 font-weight-bold">
							<n-link :to="`/articles/${data.id}`">Read more...</n-link>
						</span>
					</div>
					<div align="right" class="border-top-bottom">
						<b-badge class="mx-1 my-1 text-capitalize" pill variant="dark" v-for="badge in data.tags" :key="badge">
							{{ badge }}
						</b-badge>
					</div>
				</b-container>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { format } from 'date-fns';

export default {
	props: {
		data: Object
	},
	computed: {
		bannerImg() {
			return require(`@/assets/img/banner/${this.data.banner}`);
		},
		createDate() {
			return format(new Date(this.data.date.created), 'MMMM do, yyyy');
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
</style>