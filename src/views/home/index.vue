<template>
	<div class="home-page">
		<!-- Hero Section -->
		<div class="hero-section">
			<el-carousel :height="carouselHeight" :interval="5000" :autoplay="true">
				<el-carousel-item v-for="item in banners" :key="item.id">
					<div class="carousel-item" :style="{ backgroundImage: `url(${item.image})` }">
						<div class="carousel-content">
							<h1>{{ item.title }}</h1>
							<p class="slogan">{{ item.slogan }}</p>
							<p>{{ item.description }}</p>
							<div class="cta-buttons">
								<el-button type="primary" size="large" @click="handleClick(item.ctaLink)">
									{{ item.ctaText }}
								</el-button>
								<el-button size="large" @click="handleClick(item.secondaryLink)" v-if="item.secondaryLink">
									{{ item.secondaryText }}
								</el-button>
							</div>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>

		<!-- Quick Navigation -->
		<section class="quick-nav-section">
			<div class="section-container">
				<div class="quick-nav-grid">
					<div v-for="item in quickNavItems" :key="item.id" class="quick-nav-item" @click="$router.push(item.link)">
						<div class="nav-icon">
							<el-icon :size="40"><component :is="item.icon" /></el-icon>
						</div>
						<h3>{{ item.title }}</h3>
						<p>{{ item.description }}</p>
						<el-icon class="arrow-icon"><ArrowRight /></el-icon>
					</div>
				</div>
			</div>
		</section>

		<!-- Company Advantages -->
		<section class="advantages-section">
			<div class="section-container">
				<h2 class="section-title">核心优势</h2>
				<div class="advantages-grid">
					<div v-for="advantage in advantages" :key="advantage.id" class="advantage-card">
						<div class="advantage-icon">
							<el-icon :size="50"><component :is="advantage.icon" /></el-icon>
						</div>
						<h3>{{ advantage.title }}</h3>
						<p>{{ advantage.description }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Featured Products -->
		<section class="featured-products">
			<div class="section-container">
				<h2 class="section-title">明星产品</h2>
				<p class="section-subtitle">高品质连接器与电缆组件解决方案</p>
				<div class="product-grid">
					<div v-for="product in featuredProducts" :key="product.id" class="product-card">
						<div class="product-image">
							<img :src="product.image" :alt="product.name" loading="lazy" />
							<div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
						</div>
						<div class="product-info">
							<h3>{{ product.name }}</h3>
							<p>{{ product.description }}</p>
							<div class="product-tags">
								<el-tag v-for="tag in product.tags" :key="tag" size="small">{{ tag }}</el-tag>
							</div>
							<el-button link type="primary" @click="$router.push(`/products/${product.id}`)">
								{{ $t('products.details') }}
							</el-button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Solutions Preview -->
		<section class="solutions-preview">
			<div class="section-container">
				<h2 class="section-title">解决方案</h2>
				<p class="section-subtitle">为各行业提供专业、可靠的解决方案</p>
				<div class="solutions-grid">
					<div v-for="solution in featuredSolutions" :key="solution.id" class="solution-card">
						<img :src="solution.image" :alt="solution.title" loading="lazy" />
						<div class="solution-content">
							<h3>{{ solution.title }}</h3>
							<p>{{ solution.challenge }}</p>
							<div class="solution-benefit">
								<el-icon><CircleCheck /></el-icon>
								<span>{{ solution.benefit }}</span>
							</div>
							<el-button link type="primary" @click="$router.push(`/solutions/${solution.id}`)">
								{{ $t('common.learnMore') }}
							</el-button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Latest News & Resources -->
		<section class="news-resources-section">
			<div class="section-container">
				<h2 class="section-title">最新动态 & 资源中心</h2>
				<p class="section-subtitle">获取最新资讯与专业资源</p>
				<div class="combined-grid">
					<!-- News Items -->
					<div v-for="news in latestNews" :key="news.id" class="combined-card news-card" @click="$router.push(`/news/${news.id}`)">
						<div class="card-type-badge news-badge">
							<el-icon><Document /></el-icon>
							<span>新闻</span>
						</div>
						<div class="card-content">
							<div class="card-date">{{ news.date }}</div>
							<h3>{{ news.title }}</h3>
							<p>{{ news.summary }}</p>
						</div>
					</div>

					<!-- Resource Items -->
					<div v-for="resource in resources" :key="resource.id" class="combined-card resource-card">
						<div class="card-type-badge resource-badge">
							<el-icon><Download /></el-icon>
							<span>资源</span>
						</div>
						<div class="card-content">
							<h3>{{ resource.title }}</h3>
							<p>{{ resource.description }}</p>
							<el-button link type="primary" class="download-btn">
								{{ $t('common.download') }}
							</el-button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Call to Action -->
		<section class="cta-section">
			<div class="section-container">
				<h2>准备好开始了吗？</h2>
				<p class="cta-subtitle">联系我们获取专业解决方案和优质产品</p>
				<div class="cta-buttons">
					<el-button type="primary" size="large" @click="$router.push('/contact')">
						{{ $t('contact.title') }}
					</el-button>
					<el-button size="large" @click="$router.push('/products')">
						{{ $t('nav.products') }}
					</el-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup name="HomePage">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ArrowRight, ShoppingCart, Tools, Document, CircleCheck, Medal, OfficeBuilding, Star, Download } from '@element-plus/icons-vue';
import productImage1 from '@/assets/image/products1.png';
import productImage2 from '@/assets/image/products2.png';
import productImage3 from '@/assets/image/products3.png';
import productImage4 from '@/assets/image/products4.png';

const carouselHeight = ref('600px');

const updateCarouselHeight = () => {
	const width = window.innerWidth;
	if (width < 480) {
		carouselHeight.value = '300px';
	} else if (width < 640) {
		carouselHeight.value = '350px';
	} else if (width < 768) {
		carouselHeight.value = '400px';
	} else if (width < 992) {
		carouselHeight.value = '450px';
	} else {
		carouselHeight.value = '600px';
	}
};

onMounted(() => {
	updateCarouselHeight();
	window.addEventListener('resize', updateCarouselHeight);
});

onUnmounted(() => {
	window.removeEventListener('resize', updateCarouselHeight);
});

const banners = ref([
	{
		id: 1,
		title: '专业连接器解决方案',
		slogan: '连接世界，传递未来',
		description: '为航空航天、国防、工业领域提供高品质连接器产品',
		ctaText: '查看产品',
		ctaLink: '/products',
		secondaryText: '联系我们',
		secondaryLink: '/contact',
		image: productImage1,
	},
	{
		id: 2,
		title: '定制化电缆组件',
		slogan: '精准定制，品质保证',
		description: '满足各类应用场景的定制电缆组件解决方案',
		ctaText: '了解详情',
		ctaLink: '/solutions',
		image: productImage4,
	},
	{
		id: 3,
		title: '卓越的质量体系',
		slogan: '军工级品质，值得信赖',
		description: 'ISO认证，确保产品质量稳定可靠',
		ctaText: '质量体系',
		ctaLink: '/about/quality',
		image: productImage2,
	},
]);

const quickNavItems = ref([
	{
		id: 1,
		title: '产品中心',
		description: '查看全系列连接器产品',
		icon: 'ShoppingCart',
		link: '/products',
	},
	{
		id: 2,
		title: '解决方案',
		description: '行业定制化解决方案',
		icon: 'Tools',
		link: '/solutions',
	},
	{
		id: 3,
		title: '技术支持',
		description: '专业技术服务与支持',
		icon: 'Document',
		link: '/tech',
	},
	{
		id: 4,
		title: '关于我们',
		description: '了解公司发展历程',
		icon: 'OfficeBuilding',
		link: '/about/profile',
	},
]);

const advantages = ref([
	{
		id: 1,
		title: '五十年经验',
		description: '深耕连接器行业，积累丰富经验',
		icon: 'Medal',
	},
	{
		id: 2,
		title: '军工级品质',
		description: '通过AS9100等军品认证',
		icon: 'CircleCheck',
	},
	{
		id: 3,
		title: '定制化能力',
		description: '快速响应，按需定制',
		icon: 'Tools',
	},
	{
		id: 4,
		title: '全球支持',
		description: '服务网络覆盖全球',
		icon: 'Star',
	},
]);

const featuredProducts = ref([
	{
		id: 1,
		name: 'KWN 型钮子开关',
		description: '符合GJB2450-95标准，工作温度-55℃~+85℃，防爆等级Ex de II C T6 DIP A21 TA T6，电寿命10000次',
		image: productImage1,
		tags: ['钮子开关', '防爆', '军工标准'],
		badge: '热销',
	},
	{
		id: 2,
		name: 'FD-17 圆形电连接器',
		description: '符合Q/MU20016-2003标准，工作温度-20℃~+65℃，额定电流4A，介质耐压300V',
		image: productImage2,
		tags: ['电连接器', '圆形', '工业级'],
		badge: '推荐',
	},
	{
		id: 3,
		name: 'XK 限位开关',
		description: '符合GJB7676-2012标准，工作温度-40℃~+60℃，额定电流5A，防护等级IP67，电寿命100000次',
		image: productImage3,
		tags: ['限位开关', '高寿命', 'IP67防护'],
	},
	{
		id: 4,
		name: 'Y18 电缆组件',
		description: '工作温度-40℃~+100℃，额定电流3A，密封段可承受0.1MPa气压无泄漏',
		image: productImage4,
		tags: ['电缆组件', '密封', '耐高温'],
	},
]);

const featuredSolutions = ref([
	{
		id: 1,
		title: '线缆组件解决方案',
		challenge: '面对复杂环境，需要高可靠性的连接方案',
		benefit: '提升系统可靠性达99.9%',
		image: productImage4,
	},
	{
		id: 2,
		title: '航空航天解决方案',
		challenge: '航空航天领域对连接器要求极高',
		benefit: '完全符合航空工业标准',
		image: productImage1,
	},
	{
		id: 3,
		title: '工业连接解决方案',
		challenge: '工业环境中连接器需承受严苛条件',
		benefit: '提高设备稳定性，降低维护成本',
		image: productImage2,
	},
	{
		id: 4,
		title: '精密控制解决方案',
		challenge: '需要高精度、长寿命的开关控制',
		benefit: '确保操作安全，延长使用寿命',
		image: productImage3,
	},
]);

const latestNews = ref([
	{
		id: 1,
		title: '公司荣获年度创新企业奖',
		summary: '表彰在连接器技术领域的创新贡献',
		date: '2026-01-10',
		image: '/images/news1.jpg',
	},
	{
		id: 2,
		title: '新产品发布：第三代航空连接器',
		summary: '性能更优，可靠性更高',
		date: '2026-01-05',
		image: '/images/news2.jpg',
	},
	{
		id: 3,
		title: '参加国际航空航天展览会',
		summary: '展示最新产品和技术成果',
		date: '2025-12-28',
		image: '/images/news3.jpg',
	},
]);

const resources = ref([
	{
		id: 1,
		title: '2026年产品选型手册',
		description: '完整的产品目录和技术规格',
		type: 'PDF',
	},
	{
		id: 2,
		title: '航空连接器技术白皮书',
		description: '深入解析航空连接器技术',
		type: 'PDF',
	},
	{
		id: 3,
		title: '连接器选型指南',
		description: '如何选择合适的连接器',
		type: 'PDF',
	},
]);

const certifications = ref([
	{ id: 1, name: 'ISO 9001' },
	{ id: 2, name: 'AS 9100' },
	{ id: 3, name: 'IATF 16949' },
	{ id: 4, name: 'UL认证' },
]);

const handleClick = (link) => {
	if (link) {
		router.push(link);
	}
};
</script>

<style lang="scss" scoped>
.home-page {
	width: 100%;
}

.hero-section {
	width: 100%;

	.carousel-item {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.4);
		}

		.carousel-content {
			position: relative;
			z-index: 1;
			text-align: center;
			color: #ffffff;
			max-width: 900px;
			padding: 0 20px;

			h1 {
				font-size: 56px;
				margin-bottom: 10px;
				font-weight: bold;
			}

			.slogan {
				font-size: 24px;
				margin-bottom: 20px;
				font-style: italic;
				color: rgba(255, 255, 255, 0.95);
			}

			p {
				font-size: 20px;
				margin-bottom: 30px;
				line-height: 1.6;
			}

			.cta-buttons {
				display: flex;
				gap: 15px;
				justify-content: center;
				flex-wrap: wrap;
			}
		}
	}
}

.quick-nav-section {
	background: #f5f7fa;
	padding: 60px 0;
}

.quick-nav-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
}

.quick-nav-item {
	background: #ffffff;
	border-radius: 8px;
	padding: 40px 30px;
	text-align: center;
	cursor: pointer;
	transition: all 0.3s;
	position: relative;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

		.nav-icon {
			color: #0056b3;
			transform: scale(1.1);
		}

		.arrow-icon {
			opacity: 1;
		}
	}

	.nav-icon {
		margin-bottom: 20px;
		color: #909399;
		transition: all 0.3s;
	}

	h3 {
		font-size: 20px;
		margin-bottom: 10px;
		color: #303133;
	}

	p {
		font-size: 14px;
		color: #606266;
		line-height: 1.6;
	}

	.arrow-icon {
		position: absolute;
		top: 20px;
		right: 20px;
		color: #0056b3;
		opacity: 0;
		transition: opacity 0.3s;
	}
}

.advantages-section,
.featured-products,
.solutions-preview,
.news-resources-section,
.trust-section,
.cta-section {
	padding: 80px 0;
}

.section-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 40px;
}

.section-title {
	font-size: 36px;
	text-align: center;
	margin-bottom: 12px;
	color: #303133;
}

.section-subtitle {
	font-size: 16px;
	text-align: center;
	margin-bottom: 50px;
	color: #909399;
}

.advantages-grid,
.product-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
}

.advantage-card {
	text-align: center;
	padding: 40px 30px;
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
	transition: all 0.3s;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

		.advantage-icon {
			transform: scale(1.1);
		}
	}

	.advantage-icon {
		margin-bottom: 20px;
		color: var(--el-color-primary);
		transition: transform 0.3s;
	}

	h3 {
		font-size: 20px;
		margin-bottom: 10px;
		color: #303133;
	}

	p {
		font-size: 14px;
		color: #606266;
		line-height: 1.6;
	}
}

.product-card {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
	transition:
		transform 0.3s,
		box-shadow 0.3s;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.product-image {
		position: relative;
		height: 220px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s;
		}

		.product-badge {
			position: absolute;
			top: 15px;
			right: 15px;
			background: #f56c6c;
			color: #ffffff;
			padding: 4px 12px;
			border-radius: 4px;
			font-size: 12px;
			font-weight: bold;
		}
	}

	&:hover .product-image img {
		transform: scale(1.05);
	}

	.product-info {
		padding: 20px;

		h3 {
			font-size: 18px;
			margin-bottom: 10px;
			color: #303133;
		}

		p {
			font-size: 14px;
			color: #606266;
			margin-bottom: 15px;
			line-height: 1.6;
		}

		.product-tags {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
			margin-bottom: 15px;
		}
	}
}

.solutions-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
}

.solution-card {
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
	transition:
		transform 0.3s,
		box-shadow 0.3s;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	img {
		width: 100%;
		height: 300px;
		object-fit: cover;
	}

	.solution-content {
		padding: 30px;

		h3 {
			font-size: 24px;
			margin-bottom: 15px;
			color: #303133;
		}

		p {
			font-size: 16px;
			color: #606266;
			margin-bottom: 20px;
			line-height: 1.8;
		}

		.solution-benefit {
			display: flex;
			align-items: center;
			gap: 10px;
			margin-bottom: 20px;
			padding: 15px;
			background: #f0f7ff;
			border-radius: 4px;
			color: #0056b3;
			font-weight: 500;
		}
	}
}

.combined-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;
}

.combined-card {
	position: relative;
	padding: 24px;
	background: #ffffff;
	border-radius: 12px;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	border: 1px solid #e4e7ed;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	min-height: 200px;

	.card-type-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px;
		border-radius: 20px;
		font-size: 13px;
		font-weight: 600;
		margin-bottom: 16px;
		width: fit-content;

		.el-icon {
			font-size: 16px;
		}
	}

	&.news-card .card-type-badge {
		background: linear-gradient(135deg, #e6f1fc 0%, #d0e8ff 100%);
		color: #0056b3;
	}

	&.resource-card .card-type-badge {
		background: linear-gradient(135deg, #f0f9ff 0%, #e1f3d8 100%);
		color: #67c23a;
	}

	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;

		.card-date {
			font-size: 12px;
			color: #909399;
			margin-bottom: 12px;
			font-weight: 500;
		}

		h3 {
			font-size: 17px;
			margin-bottom: 10px;
			color: #303133;
			line-height: 1.5;
			font-weight: 600;
			flex-shrink: 0;
		}

		p {
			font-size: 14px;
			color: #606266;
			line-height: 1.7;
			margin: 0 0 16px 0;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			flex: 1;
		}

		.download-btn {
			margin-top: auto;
			align-self: flex-start;
			padding: 8px 0;
			font-weight: 600;
		}
	}

	&.news-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(0, 86, 179, 0.15);
		border-color: #b3d8ff;

		.card-type-badge {
			background: linear-gradient(135deg, #0056b3 0%, #4a90e2 100%);
			color: #ffffff;
		}
	}

	&.resource-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(103, 194, 58, 0.15);
		border-color: #c2e7b0;

		.card-type-badge {
			background: linear-gradient(135deg, #67c23a 0%, #95d475 100%);
			color: #ffffff;
		}
	}
}

.trust-section {
	background: #f5f7fa;
}

.certifications {
	display: flex;
	justify-content: center;
	gap: 60px;
	margin-bottom: 60px;
	flex-wrap: wrap;

	.cert-item {
		text-align: center;

		p {
			font-size: 16px;
			color: #303133;
			margin-top: 10px;
			font-weight: 500;
		}
	}
}

.client-logos {
	h3 {
		text-align: center;
		font-size: 24px;
		margin-bottom: 30px;
		color: #303133;
	}

	.logos-grid {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 20px;
	}

	.logo-placeholder {
		background: #ffffff;
		border-radius: 8px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #c0c4cc;
		transition: all 0.3s;

		&:hover {
			color: #0056b3;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		}
	}
}

.cta-section {
	background: linear-gradient(135deg, #0056b3 0%, #4a90e2 100%);
	color: #ffffff;
	text-align: center;

	.section-title {
		color: #ffffff;
	}

	.cta-subtitle {
		font-size: 18px;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 30px;
	}

	.cta-buttons {
		display: flex;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;

		.el-button {
			min-width: 180px;
		}

		.el-button--primary {
			background: #ffffff;
			color: #0056b3;
			border: none;

			&:hover {
				background: rgba(255, 255, 255, 0.9);
			}
		}

		.el-button--default {
			background: transparent;
			color: #ffffff;
			border: 2px solid #ffffff;

			&:hover {
				background: rgba(255, 255, 255, 0.1);
			}
		}
	}
}

@media (max-width: 1200px) {
	.section-container {
		padding: 0 30px;
	}

	.quick-nav-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 25px;
	}

	.advantages-grid,
	.product-grid {
		grid-template-columns: repeat(3, 1fr);
	}

	.client-logos .logos-grid {
		grid-template-columns: repeat(4, 1fr);
	}
}

@media (max-width: 992px) {
	.section-container {
		padding: 0 25px;
	}

	.quick-nav-section {
		padding: 50px 0;
	}

	.advantages-section,
	.featured-products,
	.solutions-preview,
	.news-resources-section,
	.cta-section {
		padding: 60px 0;
	}

	.solutions-grid {
		grid-template-columns: 1fr;
		gap: 30px;
	}

	.advantages-grid,
	.product-grid {
		grid-template-columns: repeat(2, 1fr);
	}

	.combined-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}
}

@media (max-width: 768px) {
	.section-container {
		padding: 0 20px;
	}

	.section-title {
		font-size: 32px;
	}

	.section-subtitle {
		font-size: 15px;
		margin-bottom: 40px;
	}

	.quick-nav-section,
	.advantages-section,
	.featured-products,
	.solutions-preview,
	.news-resources-section,
	.cta-section {
		padding: 50px 0;
	}

	.quick-nav-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.quick-nav-item {
		padding: 30px 20px;

		h3 {
			font-size: 18px;
		}

		p {
			font-size: 13px;
		}
	}

	.advantages-grid,
	.product-grid {
		grid-template-columns: 1fr;
		gap: 25px;
	}

	.advantage-card,
	.product-card {
		&:hover {
			transform: translateY(-3px);
		}
	}

	.product-card {
		.product-image {
			height: 200px;
		}

		.product-info {
			h3 {
				font-size: 16px;
			}

			p {
				font-size: 13px;
			}
		}
	}

	.solution-card {
		img {
			height: 250px;
		}

		.solution-content {
			padding: 25px 20px;

			h3 {
				font-size: 20px;
			}

			p {
				font-size: 15px;
			}
		}
	}

	.combined-grid {
		grid-template-columns: 1fr;
		gap: 16px;
	}

	.combined-card {
		min-height: auto;
		padding: 20px;

		.card-content {
			h3 {
				font-size: 16px;
			}

			p {
				font-size: 13px;
			}
		}
	}

	.cta-section {
		.section-title {
			font-size: 28px;
		}

		.cta-subtitle {
			font-size: 16px;
		}

		.cta-buttons {
			.el-button {
				min-width: 150px;
			}
		}
	}
}

@media (max-width: 640px) {
	.carousel-item {
		.carousel-content {
			h1 {
				font-size: 36px;
				margin-bottom: 8px;
			}

			.slogan {
				font-size: 18px;
				margin-bottom: 15px;
			}

			p {
				font-size: 16px;
				margin-bottom: 25px;
				line-height: 1.5;
			}
		}
	}

	.section-container {
		padding: 0 15px;
	}

	.section-title {
		font-size: 28px;
		margin-bottom: 10px;
	}

	.section-subtitle {
		font-size: 14px;
		margin-bottom: 35px;
	}

	.quick-nav-section,
	.advantages-section,
	.featured-products,
	.solutions-preview,
	.news-resources-section,
	.cta-section {
		padding: 40px 0;
	}

	.quick-nav-grid {
		grid-template-columns: 1fr;
		gap: 20px;
	}

	.quick-nav-item {
		padding: 30px 25px;
	}

	.advantage-card {
		padding: 35px 25px;

		h3 {
			font-size: 18px;
		}
	}

	.product-card {
		.product-image {
			height: 220px;
		}

		.product-info {
			padding: 18px;

			h3 {
				font-size: 17px;
			}
		}
	}

	.client-logos .logos-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;

		.logo-placeholder {
			height: 60px;
			font-size: 13px;
		}
	}

	.hero-section .carousel-item .carousel-content .cta-buttons {
		flex-direction: column;
		align-items: center;

		.el-button {
			width: 100%;
			max-width: 280px;
		}
	}

	.cta-section {
		.cta-buttons {
			.el-button {
				min-width: 140px;
			}
		}
	}
}

@media (max-width: 480px) {
	.carousel-item {
		.carousel-content {
			h1 {
				font-size: 28px;
				margin-bottom: 6px;
			}

			.slogan {
				font-size: 16px;
				margin-bottom: 12px;
			}

			p {
				font-size: 14px;
				margin-bottom: 20px;
				line-height: 1.4;
			}
		}
	}

	.section-container {
		padding: 0 12px;
	}

	.section-title {
		font-size: 24px;
	}

	.section-subtitle {
		font-size: 13px;
		margin-bottom: 30px;
	}

	.quick-nav-section,
	.advantages-section,
	.featured-products,
	.solutions-preview,
	.news-resources-section,
	.cta-section {
		padding: 35px 0;
	}

	.quick-nav-item {
		padding: 25px 20px;

		h3 {
			font-size: 16px;
		}

		p {
			font-size: 12px;
		}
	}

	.advantage-card {
		padding: 30px 20px;

		h3 {
			font-size: 16px;
		}

		p {
			font-size: 13px;
		}
	}

	.product-card {
		.product-image {
			height: 200px;
		}

		.product-info {
			padding: 15px;

			h3 {
				font-size: 16px;
			}

			p {
				font-size: 13px;
			}
		}
	}

	.solution-card {
		img {
			height: 200px;
		}

		.solution-content {
			padding: 20px 15px;

			h3 {
				font-size: 18px;
				margin-bottom: 12px;
			}

			p {
				font-size: 14px;
				margin-bottom: 15px;
			}
		}
	}

	.combined-card {
		padding: 16px;

		.card-content {
			h3 {
				font-size: 15px;
			}

			p {
				font-size: 13px;
			}
		}
	}

	.cta-section {
		.section-title {
			font-size: 24px;
		}

		.cta-subtitle {
			font-size: 15px;
		}

		.cta-buttons {
			gap: 12px;

			.el-button {
				min-width: 130px;
				padding: 12px 20px;
			}
		}
	}

	.client-logos .logos-grid {
		gap: 12px;

		.logo-placeholder {
			height: 50px;
			font-size: 12px;
		}
	}
}
</style>
