<template>
	<div>
		<b-navbar toggleable="lg" class="bg-gray-800" type="dark" sticky>
			<b-navbar-brand>
				<b-img src="@/assets/img/logo.png" height="28" alt="Santosh Blogs" class="mb-1 mr-1" />
				<span class="font-weight-bold">Santosh Blogs</span>
			</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse" />
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item v-for="(route, i) of navRoutes" :key="`nav-route-${i}`" :to="route.to">{{ route.title }}</b-nav-item>
					<b-nav-item href="https://santoshb.com.np" target="_blank">About ME</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		<nuxt />
		<ScrollToTop />
		<footer class="text-center">
			<div class="bg-gray-800 text-light py-3">
				<b-container>
					<span>&copy;2020 Santosh Bhandari</span>
				</b-container>
				<div class="mt-3 px-3 text-left">
					<a href="https://santoshb.com.np/privacy" target="_blank" class="text-decoration-none text-light">Privacy Policy</a>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			navRoutes: [
				{ title: 'Home', to: '/' },
				{ title: 'Articles', to: '/articles' }
			]
		}
	}
}
</script>