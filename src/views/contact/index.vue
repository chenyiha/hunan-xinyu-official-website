<template>
	<div class="contact-page">
		<div class="page-header">
			<h1>{{ $t('contact.title') }}</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('nav.contact') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="content-container">
			<!-- Contact Info Cards -->
			<el-row :gutter="30" class="contact-cards">
				<el-col :xs="24" :sm="12" :md="8" v-for="(card, index) in contactCards" :key="index">
					<el-card class="contact-card">
						<div class="card-icon">
							<el-icon :size="50" color="#0056b3"><component :is="card.icon" /></el-icon>
						</div>
						<h3>{{ card.title }}</h3>
						<p>{{ card.description }}</p>
						<el-button type="primary" link @click="card.action">
							{{ $t('common.learnMore') }}
							<el-icon class="el-icon--right"><ArrowRight /></el-icon>
						</el-button>
					</el-card>
				</el-col>
			</el-row>

			<!-- Contact Information -->
			<el-card style="margin-bottom: 20px">
				<template #header>
					<h2>{{ $t('contact.headquarters') }}</h2>
				</template>
				<div class="contact-details">
					<div class="contact-item">
						<el-icon><Location /></el-icon>
						<div class="item-content">
							<strong>地址</strong>
							<p>湖南省怀化市高新技术产业开发区</p>
						</div>
					</div>
					<div class="contact-item">
						<el-icon><Phone /></el-icon>
						<div class="item-content">
							<strong>电话</strong>
							<p>86-745-2751867 2751865</p>
						</div>
					</div>
					<div class="contact-item">
						<el-icon><Printer /></el-icon>
						<div class="item-content">
							<strong>传真</strong>
							<p>86-745-2835157</p>
						</div>
					</div>
					<div class="contact-item">
						<el-icon><Message /></el-icon>
						<div class="item-content">
							<strong>邮箱</strong>
							<p>xsc1948@163.c0m</p>
						</div>
					</div>
					<div class="contact-item">
						<el-icon><Clock /></el-icon>
						<div class="item-content">
							<strong>工作时间</strong>
							<p>周一至周五 9:00-18:00</p>
						</div>
					</div>
				</div>
			</el-card>

			<!-- Sales Network Map -->
			<el-card class="map-section">
				<template #header>
					<h2>{{ $t('contact.salesNetwork') }}</h2>
				</template>
				<div ref="mapContainer" class="map-container"></div>
			</el-card>
		</div>
	</div>
</template>

<script setup name="Contact">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArrowRight, Phone, Message, Clock, Location, Printer } from '@element-plus/icons-vue';

const router = useRouter();
const { t } = useI18n();

// 地图相关
const mapContainer = ref(null);
let map = null;

// 配置经纬度（请在此处修改为实际坐标）
const locationConfig = {
	longitude: 109.939408, // 经度
	latitude: 27.39376, // 纬度
	zoom: 16, // 缩放级别
	title: '湖南华峰新宇电子有限公司', // 公司标题
	hotline: '', // 24小时服务热线
	phone: '86-745-2751867     2751865', // 电话
	fax: '86-745-2835157', // 传真
	email: 'xsc1948@163.c0m', // 邮箱
	address: '湖南省怀化市高新技术产业开发区', // 地址
};

const contactCards = ref([
	{
		title: t('contact.generalInquiry'),
		description: '一般问题咨询和建议',
		icon: 'Message',
		action: () => router.push('/contact/inquiry'),
	},
	{
		title: t('contact.productQuote'),
		description: '产品询价和样品申请',
		icon: 'ShoppingCart',
		action: () => router.push('/contact/quote'),
	},
	{
		title: t('contact.techSupport'),
		description: '技术支持和问题反馈',
		icon: 'Tools',
		action: () => router.push('/contact/support'),
	},
]);

// 初始化地图
const initMap = () => {
	if (typeof AMap === 'undefined') {
		return;
	}

	try {
		map = new AMap.Map(mapContainer.value, {
			zoom: locationConfig.zoom,
			center: [locationConfig.longitude, locationConfig.latitude],
			mapStyle: 'amap://styles/normal',
			viewMode: '2D',
		});

		// 添加标记
		const marker = new AMap.Marker({
			position: [locationConfig.longitude, locationConfig.latitude],
			title: locationConfig.title,
			animation: 'AMAP_ANIMATION_DROP',
		});

		map.add(marker);

		// 添加信息窗口
		const infoWindow = new AMap.InfoWindow({
			content: `
				<div style="padding: 15px; min-width: 280px;">
					<h3 style="margin: 0 0 12px 0; color: #0056b3; font-size: 18px; font-weight: bold;">${locationConfig.title}</h3>
					<p style="margin: 6px 0; color: #333; font-size: 14px;"><strong>24小时服务热线：</strong>${locationConfig.hotline}</p>
					<p style="margin: 6px 0; color: #333; font-size: 14px;"><strong>电话：</strong>${locationConfig.phone}</p>
					<p style="margin: 6px 0; color: #333; font-size: 14px;"><strong>地址：</strong>${locationConfig.address}</p>
				</div>
			`,
			offset: new AMap.Pixel(0, -30),
		});

		// 默认打开信息窗口
		infoWindow.open(map, marker.getPosition());

		marker.on('click', () => {
			infoWindow.open(map, marker.getPosition());
		});
	} catch (error) {
		// console.error('地图初始化失败:', error);
	}
};

onMounted(() => {
	// 等待高德地图API加载完成
	if (typeof AMap !== 'undefined') {
		initMap();
	} else {
		// 如果API还未加载，等待加载完成
		const checkAMap = setInterval(() => {
			if (typeof AMap !== 'undefined') {
				clearInterval(checkAMap);
				initMap();
			}
		}, 100);
	}
});

onUnmounted(() => {
	if (map) {
		map.destroy();
		map = null;
	}
});
</script>

<style lang="scss" scoped>
.contact-page {
	padding: 40px 0 80px;
}

.page-header {
	max-width: 1400px;
	margin: 0 auto 40px;
	padding: 0 40px;

	h1 {
		font-size: 36px;
		margin-bottom: 16px;
		color: #303133;
	}
}

.content-container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 40px;
}

.contact-cards {
	margin-bottom: 20px;
}

.contact-card {
	text-align: center;
	padding: 40px 30px;
	transition:
		transform 0.3s,
		box-shadow 0.3s;
	cursor: pointer;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.card-icon {
		margin-bottom: 20px;
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
		margin-bottom: 20px;
	}
}

.contact-info-section {
	margin-bottom: 60px;
}

.el-card {
	:deep(.el-card__header) {
		h2 {
			font-size: 24px;
			margin: 0;
			color: #303133;
		}
	}
}

.contact-details {
	.contact-item {
		display: flex;
		gap: 20px;
		margin-bottom: 30px;

		.el-icon {
			font-size: 24px;
			color: #0056b3;
			margin-top: 5px;
		}

		.item-content {
			flex: 1;

			strong {
				display: block;
				font-size: 16px;
				color: #303133;
				margin-bottom: 8px;
			}

			p {
				font-size: 14px;
				color: #606266;
				margin: 0;
			}
		}
	}
}

.map-section {
	.map-container {
		height: 400px;
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
	}
}

@media (max-width: 1200px) {
	.page-header,
	.content-container {
		padding: 0 30px;
	}

	.contact-cards {
		gap: 20px;
	}
}

@media (max-width: 992px) {
	.page-header {
		padding: 0 25px;
		margin-bottom: 30px;
	}

	.content-container {
		padding: 0 25px;
	}

	.contact-cards {
		margin-bottom: 30px;
	}
}

@media (max-width: 768px) {
	.page-header,
	.content-container {
		padding: 0 20px;
	}

	.page-header {
		margin-bottom: 25px;

		h1 {
			font-size: 28px;
			margin-bottom: 12px;
		}
	}

	.contact-page {
		padding: 30px 0 60px;
	}

	.contact-cards {
		margin-bottom: 25px;
	}

	.contact-card {
		padding: 30px 20px;

		.card-icon {
			margin-bottom: 15px;

			.el-icon {
				font-size: 40px !important;
			}
		}

		h3 {
			font-size: 18px;
			margin-bottom: 8px;
		}

		p {
			font-size: 13px;
			margin-bottom: 15px;
		}
	}

	.el-card {
		:deep(.el-card__header) {
			h2 {
				font-size: 20px;
			}
		}
	}

	.contact-details {
		.contact-item {
			gap: 15px;
			margin-bottom: 20px;

			.el-icon {
				font-size: 20px;
				margin-top: 3px;
			}

			.item-content {
				strong {
					font-size: 15px;
					margin-bottom: 6px;
				}

				p {
					font-size: 13px;
				}
			}
		}
	}

	.map-section {
		.map-container {
			height: 350px;
		}
	}
}

@media (max-width: 640px) {
	.page-header,
	.content-container {
		padding: 0 15px;
	}

	.page-header h1 {
		font-size: 24px;
	}

	.contact-card {
		padding: 25px 18px;

		h3 {
			font-size: 16px;
		}

		p {
			font-size: 12px;
		}
	}

	.el-card {
		:deep(.el-card__header) {
			h2 {
				font-size: 18px;
			}
		}
	}

	.contact-details {
		.contact-item {
			flex-direction: column;
			gap: 10px;

			.el-icon {
				font-size: 24px;
				color: #0056b3;
			}

			.item-content {
				strong {
					font-size: 14px;
					margin-bottom: 5px;
				}

				p {
					font-size: 13px;
				}
			}
		}
	}

	.map-section {
		.map-container {
			height: 300px;
		}
	}
}

@media (max-width: 480px) {
	.page-header,
	.content-container {
		padding: 0 12px;
	}

	.page-header h1 {
		font-size: 22px;
	}

	.contact-page {
		padding: 25px 0 50px;
	}

	.contact-cards {
		margin-bottom: 20px;
	}

	.contact-card {
		padding: 20px 15px;

		.card-icon {
			margin-bottom: 12px;

			.el-icon {
				font-size: 36px !important;
			}
		}

		h3 {
			font-size: 16px;
			margin-bottom: 8px;
		}

		p {
			font-size: 12px;
			margin-bottom: 12px;
		}
	}

	.el-card {
		:deep(.el-card__body) {
			padding: 18px;
		}

		:deep(.el-card__header) {
			padding: 15px;

			h2 {
				font-size: 16px;
			}
		}
	}

	.contact-details {
		.contact-item {
			margin-bottom: 18px;

			.el-icon {
				font-size: 22px;
			}

			.item-content {
				strong {
					font-size: 14px;
				}

				p {
					font-size: 12px;
				}
			}
		}
	}

	.map-section {
		.map-container {
			height: 250px;
		}
	}
}
</style>
