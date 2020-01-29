<template>
	<div>
		<AppNavbar />
		<nuxt />
		<ScrollToTop />
		<AppFooter />
	</div>
</template>

<script>
export default {
	components: {
		AppNavbar: () => import('@/components/AppNavbar'),
		AppFooter: () => import('@/components/AppFooter'),
		ScrollToTop: () => import('@/components/ScrollToTop')
	}
}
</script>