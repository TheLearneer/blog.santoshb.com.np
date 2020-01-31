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
				<small>Created on <b>{{ createDate }}</b> | ~{{ readTime }} read</small>
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
			<b-col v-if="article.date.updated" sm="12" lg="6">
				<small>Updated on <b>{{ updateDate }}</b></small>
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
			title: this.article.title
		}
	},
    data () {
      return {
        dynamicComponent: null,
		article: null
      }
    },
	computed: {
		readTime() {
			return `${Math.floor(this.article.html.replace( /[^\w ]/g, "" ).split( /\s+/ ).length / 228) + 1} min`;
		},
		updateDate() {
			return this.article.date.updated ? format(new Date(this.article.date.updated), 'MMMM do, yyyy') : '';
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
.topic-badge, .topic-badge:hover {
	text-decoration: none;
	color: white;
}
</style>