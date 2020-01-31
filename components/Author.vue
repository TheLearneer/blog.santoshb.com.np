<template>
	<div class="container pt-4 pb-3 text-center shadow bg-gray-200">
		<b-row>
			<b-col cols="4">
				<b-img fluid :src="authorImage" width="128" :alt="author.name" class="rounded-circle pb-3" />
				<div>
					<a :href="author.social.github" class="px-2">
						<GithubIcon :size="24" v-if="author.social.github" :title="`${author.name}'s Github Profile`" fillColor="black" />
					</a>
					<a :href="author.social.website" class="px-2">
						<WebsiteIcon :size="24" v-if="author.social.website" :title="`${author.name}'s Website`" fillColor="black" />
					</a>
				</div>
			</b-col>
			<b-col>
				<h3>{{ author.name }}</h3>
				<hr>
				{{ author.introduction }}
			</b-col>
		</b-row>
	</div>
</template>

<script>
import Author from '@/assets/js/author';
import GithubIcon from 'vue-material-design-icons/GithubFace.vue';
import WebsiteIcon from 'vue-material-design-icons/Web.vue';

export default {
	props: {
		id: String
	},
	components: {
		GithubIcon,
		WebsiteIcon
	},
	computed: {
		author() {
			return Author.getDetails(this.id);
		},
		authorImage() {
			return require(`@/assets/img/author/${this.author.img}`);
		}
	}
}
</script>