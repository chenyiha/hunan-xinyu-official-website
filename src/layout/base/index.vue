<template>
	<div class="website-container">
		<Header></Header>
		<div class="main-content">
			<slot></slot>
		</div>
		<Footer></Footer>
	</div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss" scoped>
.website-container {
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

@media (max-width: 768px) {
	.website-container {
		.main-content {
			min-height: calc(100vh - 70px);
		}
	}
}

@media (max-width: 480px) {
	.website-container {
		.main-content {
			min-height: calc(100vh - 70px);
		}
	}
}
</style>
