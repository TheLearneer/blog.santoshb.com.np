<template>
	<b-navbar toggleable="lg" type="dark" variant="info" sticky>
		<b-navbar-brand to="/">Santosh Blogs</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item to="/articles">
					Articles
				</b-nav-item>
				<!--
				<b-nav-item to="/topics">
					Topics
				</b-nav-item>
				-->
				<b-nav-item href="https://santoshb.com.np?ref=blog" target="_blank">
					About me
				</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>
