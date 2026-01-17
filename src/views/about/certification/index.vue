<template>
	<div class="certification-page">
		<div class="page-header">
			<h1>{{ $t('about.certification') }}</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('nav.about') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('about.certification') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="content-container">
			<div class="cert-grid">
				<el-card v-for="cert in certifications" :key="cert.id" class="cert-card">
					<div class="cert-icon">
						<img v-if="cert.image" :src="cert.image" :alt="cert.name" class="cert-image" @click="handleImageClick(cert.image)" />
						<el-icon v-else :size="60" color="#0056b3"><Medal /></el-icon>
					</div>
					<h3 v-if="cert.name">{{ cert.name }}</h3>
					<p v-if="cert.number" class="cert-no">证书编号: {{ cert.number }}</p>
					<p v-if="cert.date" class="cert-date">{{ $t('common.learnMore') }}: {{ cert.date }}</p>
					<p v-if="cert.description" class="cert-desc">{{ cert.description }}</p>
				</el-card>
			</div>
			<el-image-viewer v-if="showViewer" :url-list="[viewerUrl]" @close="showViewer = false" />
		</div>
	</div>
</template>

<script setup name="AboutCertification">
import { ref } from 'vue';
import { Medal } from '@element-plus/icons-vue';

const showViewer = ref(false);
const viewerUrl = ref('');

const handleImageClick = (image) => {
	viewerUrl.value = image;
	showViewer.value = true;
};

const certifications = ref([
	{
		id: 1,
		name: 'ISO 9001质量管理体系认证',
		number: 'ISO9001:2015',
		date: '1996年首次认证',
		description: '国际标准化组织质量管理体系认证，为电连接器、开关和军用装备部件的研制生产提供质量保证，已持续认证近30年',
		image: '', // 预留图片位置
	},
	{
		id: 2,
		name: 'GJB 9001C质量管理体系认证',
		number: 'GJB9001C-2017',
		date: '2006年首次认证',
		description: '国军标质量管理体系认证，适用于军工产品研制生产，保障军用电子元器件的质量可靠性',
		image: '', // 预留图片位置
	},
	{
		id: 3,
		name: '军标生产线认证',
		number: '军标生产线',
		date: '2000-2003年',
		description: '拥有印制电路连接器、圆形电路连接器两条贯军标生产线，通过中国军用电子元器件质量认证委员会认证',
		image: '', // 预留图片位置
	},
	{
		id: 4,
		name: '国家高新技术企业',
		number: 'GR201643000067',
		date: '2016年',
		description: '国家级高新技术企业认证，体现了公司在电连接器、军用电磁断路器等领域的技术创新和研发能力',
		image: '', // 预留图片位置
	},
	{
		id: 5,
		name: '知识产权管理体系',
		number: '14项专利',
		date: '持续积累',
		description: '拥有14项专利技术（3项发明专利、11项实用新型专利），成功开发"神舟"飞船配套产品等多项创新成果',
		image: '', // 预留图片位置
	},
	{
		id: 6,
		name: '军工供应商认证',
		number: '合格供应商',
		date: '2018年',
		description: '入选兵器工业集团合格供应商优选目录，为航天、航空、兵器等国防工业提供优质电连接器产品',
		image: '', // 预留图片位置
	},
	// 空白图片预留位置 - 可以在这里添加资质图片
	{
		id: 7,
		image: new URL('@/assets/image/qualification1.png', import.meta.url).href,
	},
	{
		id: 8,
		image: new URL('@/assets/image/qualification2.png', import.meta.url).href,
	},
	{
		id: 9,
		image: new URL('@/assets/image/qualification3.png', import.meta.url).href,
	},
]);
</script>

<style lang="scss" scoped>
.certification-page {
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

.cert-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;
}

.cert-card {
	text-align: center;
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-5px);
	}

		.cert-icon {
		margin-bottom: 20px;
		min-height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;

		.cert-image {
			max-width: 100%;
			max-height: 100px;
			object-fit: contain;
			cursor: zoom-in;
		}
	}

	// 空白卡片样式
	&:has(.cert-image) {
		.cert-icon {
			min-height: 120px;
		}

		.cert-image {
			max-height: 150px;
			border-radius: 8px;
			cursor: zoom-in;
			transition: opacity 0.3s;

			&:hover {
				opacity: 0.85;
			}
		}
	}

	h3 {
		font-size: 18px;
		margin-bottom: 10px;
		color: #303133;
	}

	.cert-no,
	.cert-date {
		font-size: 14px;
		color: #909399;
		margin-bottom: 8px;
	}

	.cert-desc {
		font-size: 14px;
		color: #606266;
		line-height: 1.6;
		margin-top: 15px;
	}
}

@media (max-width: 1024px) {
	.cert-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (max-width: 640px) {
	.page-header,
	.content-container {
		padding: 0 20px;
	}

	.page-header h1 {
		font-size: 28px;
	}

	.cert-grid {
		grid-template-columns: 1fr;
	}
}
</style>
