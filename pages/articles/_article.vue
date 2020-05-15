<template>
	<div class="container py-5">
		<h1 :class="`text-center ${article.subtitle ? '' : 'pb-5'}`" class="font-weight-bold">
			{{ article.title }}
		</h1>
		<h4 v-if="article.subtitle" class="text-center text-muted pb-5">
			<small>{{ article.subtitle }}</small>
		</h4>
		<b-row no-gutters class="border-top-bottom py-1">
			<b-col cols="12" md="8">
				<b-icon icon="calendar" class="mr-1" />
				<span class="small" v-html="dateHeader" />
				<b-icon icon="clock" class="ml-4 mr-1" />
				<span class="small"><b>{{ readTime }}</b> read</span>
			</b-col>
			<b-col cols="12" md="4" align="right">
				<socialShare link="https://twitter.com/intent/tweet?text=" id="twitter" name="Twitter" />				
			</b-col>
		</b-row>
		<!-- --------------------------- -->
		<component :is="dynamicComponent" />
		<!-- --------------------------- -->
		<b-row no-gutters class="border-top-bottom py-1">
			<b-col v-if="article.date.updated" cols="12" lg="5">
				<b-icon icon="calendar" class="mr-1" />
				<span class="small">Originally created on</span>
				<span class="small font-weight-bold"> {{ formatDate(article.date.created) }}</span>
			</b-col>
			<b-col cols="12" :lg="article.date.updated ? 7 : 12" align="right">
				<b-badge v-for="(tag, i) of article.tags" :key="`article-tag-${i}`" class="m-1 text-capitalize" variant="dark" pill>{{ tag }}</b-badge>
			</b-col>
		</b-row>
		<div class="py-5">
			<AuthorDetilas :id="article.author" />
		</div>
		<vue-disqus shortname="blog-santoshb" :identifier="article.id" :url="articleUrl" :title="completeTitle" />
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
		article: null,
		html: null
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
			return `${Math.ceil(this.html.replace( /[^\w ]/g, "" ).split( /\s+/ ).length / 228) + 1} min`;
		},
		dateHeader() {
			let action,date;
			if (this.article.date.updated) {
				action = 'Last Updated on';
				date = this.article.date.updated;
			} else {
				action = 'Originally Created on';
				date = this.article.date.created;
			}
			return `${action} <b>${this.formatDate(date)}</b>`;
		}
	},
    created () {
		const post = require(`~/contents/${this.$route.params.article}.md`);
		this.html = post.html
		this.dynamicComponent = post.vue.component;
		this.article = post.attributes;
    },
	methods: {
		formatDate(date) {
			return format(new Date(date), 'MMMM do, yyyy');
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