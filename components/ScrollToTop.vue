<template>
	<transition name="fade" mode="out-in" appear>
		<div class="column is-four-fifths">
			<div id="scroll-top" @click="scrollTop" >
				<b-button pill class="scroller-button" variant="info">
					<b-icon icon="caret-up-fill" />
				</b-button>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'ScrollToTop',
	data() {
		return {
			visible: false,
			visibleOffset: 300
		};
	},
	mounted() {
		this.$nextTick(() => {
			const scroller = document.getElementById('scroll-top');
			let hideTimeout;
			let showTimeout;
			const showListener = () => {
				if ((window.pageYOffset || document.documentElement.scrollTop) > this.visibleOffset) {
					clearTimeout(hideTimeout);
					clearTimeout(showTimeout);
					scroller.style.display = 'block';
					showTimeout = setTimeout(() => { scroller.style.opacity = '1'; }, 20);
					window.removeEventListener('scroll', showListener);
					window.addEventListener('scroll', hideListener);
				}
			};
			const hideListener = () => {
				if ((window.pageYOffset || document.documentElement.scrollTop) < this.visibleOffset) {
					clearTimeout(hideTimeout);
					clearTimeout(showTimeout);
					scroller.style.opacity = '0';
					hideTimeout = setTimeout(() => { scroller.style.display = 'none'; }, 1000);
					window.removeEventListener('scroll', hideListener);
					window.addEventListener('scroll', showListener);
				}
			};
			window.addEventListener('scroll', showListener);
		});
	},
	methods: {
		toggle() {
			this.visible = !this.visible;
		},
		scrollTop() {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	}
};
</script>

<style>
#scroll-top {
	bottom: 20px;
	right: 20px;
	position: fixed;
	transition: opacity 0.5s, background 0.3s;
	opacity: 0;
	z-index: 1;
}
</style>