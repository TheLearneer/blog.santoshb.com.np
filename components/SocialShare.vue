<template>
	<a :href="finalLink"
		target="popup"
		:onClick="`window.open('${finalLink}', 'popup','width=600,height=400'); return false;`"
		:title="shareTitle">
		<div :class="`icon-${id}`" :style="styleObject" />
	</a>
</template>

<script>
export default {
	props: { link: String, name: String, id: String, size: { type: Number, default: 24 } },
	data() {
		return {
			styleObject: {
				'background-size': 'cover',
				height: `${this.size}px`,
				width: `${this.size}px`,
				'border-radius': `${this.size/2}px`,
				'margin-right': '5px',
			}
		}
	},
	computed: {
		shareTitle() {
			return `Share to ${this.name}`;
		},
		finalLink() {
			return `${this.link}I read an article at https://blog.santoshb.com.np${this.$route.path} and it is awesome. You should read it too!`;
		}
	}
}
</script>

<style scoped>
.icon-twitter {
	background-image: url("https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-64.png");
}
.icon-facebook {
	background-image: url("https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-64.png");
}

.icon-facebook:hover, .icon-twitter:hover {
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
}
</style>