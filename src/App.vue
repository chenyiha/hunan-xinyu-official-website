<template>
	<div class="website-app">
		<Header></Header>
		<div class="main-content">
			<router-view />
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup name="app">
import Header from '/@/layout/base/components/Header.vue';
import Footer from '/@/layout/base/components/Footer.vue';
</script>

<style lang="scss" scoped>
.website-app {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow-x: hidden;

	.main-content {
		flex: 1;
		min-height: calc(100vh - 60px);
	}
}
</style>
