<template>
	<div class="container pt-5 pb-5">
		<h1 :class="`text-center ${article.subtitle ? '' : 'pb-5'}`">
			{{ article.title }}
		</h1>
		<h4 v-if="article.subtitle" class="text-center text-muted pb-5">
			<small>{{ article.subtitle }}</small>
		</h4>
		<hr>
		<small>{{ updateDate }} ~{{ readTime }} read
			<div class="float-right">
				<socialShare link="https://twitter.com/intent/tweet?text=" id="twitter" name="Twitter" />
			</div>
		</small>
		<hr>
		<component :is="dynamicComponent" />
		<hr>
		<div>
			<small>Created on <b>{{ createDate }}</b></small>
			<b-badge class="float-right mr-2 text-capitalize" pill variant="secondary" v-for="badge in article.tags" :key="badge">
				<!--<n-link :to="getTopicLink(badge)" class="topic-badge mx-1">-->
					{{ badge }}
				<!--</n-link>-->
			</b-badge>
		</div>
		<hr>
	</div>
</template>

<script>
import { format } from 'date-fns';

export default {
	components: {
		SocialShare: () => import('@/components/SocialShare')
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
			return this.article.date.updated ? `Updated on ${format(new Date(this.article.date.updated), 'MMMM do, yyyy')} | ` : '';
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