<template>
	<div class="container pt-5 pb-5">
		<h1 :class="`text-center ${article.subtitle ? '' : 'pb-5'}`">
			{{ article.title }}
		</h1>
		<h4 v-if="article.subtitle" class="text-center text-muted pb-5">
			<small>{{ article.subtitle }}</small>
		</h4>
		<hr>
		<b-row>
			<b-col sm="12" lg="6">
				<small>
					<span v-if="!updateDate">
						Created on <b>{{ createDate }}</b>
					</span>
					<span v-if="updateDate">
						Last edited on <b>{{ updateDate }}</b>
					</span>
					<span>
						| ~{{ readTime }} read
					</span>
				</small>
			</b-col>
			<b-col class="text-sm-center">
				<div class="float-lg-right">
					<socialShare link="https://twitter.com/intent/tweet?text=" id="twitter" name="Twitter" />
				</div>
			</b-col>
		</b-row>
		<hr>
		<component :is="dynamicComponent" />
		<hr>
		<b-row>
			<b-col v-if="updateDate" sm="12" lg="6">
				<small>Originally created on <b>{{ createDate }}</b></small>
			</b-col>
			<b-col>
				<div class="float-right">
					<b-badge class="mr-2 text-capitalize" pill variant="secondary" v-for="badge in article.tags" :key="badge">
						<!--<n-link :to="getTopicLink(badge)" class="topic-badge mx-1">-->
							{{ badge }}
						<!--</n-link>-->
					</b-badge>
				</div>
			</b-col>
		</b-row>
		<hr>
		<div class="pt-5">
			<AuthorDetilas :id="article.author" />
		</div>
	</div>
</template>

<script>
import { format } from 'date-fns';

export default {
	components: {
		SocialShare: () => import('@/components/SocialShare'),
		AuthorDetilas: () => import('@/components/Author')
	},
	head() {
		return {
			title: this.completeTitle,
			meta: [				
				{ hid: 'description', name: 'description', content: this.articleDescription },
				// Open-graph
				{ hid: 'og:title', name: 'og:title', content: this.completeTitle },
				{ hid: 'og:description', name: 'og:description', content: this.articleDescription },
				{ hid: 'og:url', name: 'og:url', content: this.articleUrl },
				{ hid: 'og:image', name: 'og:image', content: `https://blog.santoshb.com.np${this.imageLink}` },
				// Twitter				
				{ hid: 'twitter:title', name: 'twitter:title', content: this.completeTitle },
				{ hid: 'twitter:description', name: 'twitter:description', content: this.articleDescription },
				{ hid: 'twitter:url', name: 'twitter:url', content: this.articleUrl },
				{ hid: 'twitter:image', name: 'twitter:image', content: `https://blog.santoshb.com.np${this.imageLink}` }
			]
		}
	},
    data () {
      return {
        dynamicComponent: null,
		article: null
      }
    },
	computed: {
		articleDescription() {
			return this.article.summary.replace(/<[^>]*>?/gm, '')
		},
		articleUrl() {
			return `https://blog.santoshb.com.np${this.$route.path}`
		},
		imageLink() {
			return require(`@/assets/img/banner/${this.article.banner}`);
		},
		completeTitle() {
			return `${this.article.title}${this.article.subtitle ? ` - ${this.article.subtitle}` : ''}`;
		},
		readTime() {
			return `${Math.ceil(this.article.html.replace( /[^\w ]/g, "" ).split( /\s+/ ).length / 228) + 1} min`;
		},
		updateDate() {
			return this.article.date.updated ? format(new Date(this.article.date.updated), 'MMMM do, yyyy') : null;
		},
		createDate() {
			return format(new Date(this.article.date.created), 'MMMM do, yyyy');
		}
	},
    created () {
		const post = require(`~/contents/articles/${this.$route.params.article}.md`)
		const newData = {};
		for (const attr of Object.keys(post.attributes)) newData[attr] = post.attributes[attr];
		newData.html = post.html;
		this.dynamicComponent = post.vue.component;
		this.article = newData;
    },
	methods: {
		getTopicLink(topic) {
			return `/topics/${topic.toLowerCase().split(' ').join('-')}`;
		}
	}
}
</script>

<style scoped>
.frontmatter-markdown {
	padding-top: 4rem;
	padding-bottom: 3rem;
}

.frontmatter-markdown >>> h1, .frontmatter-markdown >>> h2, .frontmatter-markdown >>> h3 {
	padding-top: 3rem;
	padding-bottom: 0.5rem;
}
</style>