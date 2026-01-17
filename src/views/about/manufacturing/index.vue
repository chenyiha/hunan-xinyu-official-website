<template>
	<div class="manufacturing-page">
		<div class="page-header">
			<h1>{{ $t('about.manufacturing') }}</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('nav.about') }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $t('about.manufacturing') }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="content-container">
			<el-card class="intro-card">
				<h2>制造能力</h2>
				<p>
					公司拥有先进的生产设备和完善的制造工艺，具备年产各类连接器1000万套的生产能力。我们采用现代化的生产管理模式，实现了从设计到生产的全流程数字化管理，确保产品的高质量和高效率交付。
				</p>
			</el-card>

			<div class="equipment-section">
				<h2>主要生产设备</h2>
				<el-row :gutter="20">
					<el-col :span="8" v-for="(equipment, index) in equipments" :key="index" style="margin-top: 8px">
						<el-card class="equipment-card">
							<div class="equipment-icon">
								<el-icon :size="40" color="#0056b3"><component :is="equipment.icon" /></el-icon>
							</div>
							<h3>{{ equipment.name }}</h3>
							<p>{{ equipment.description }}</p>
							<div class="equipment-specs">
								<div class="spec-item">
									<span class="spec-label">数量:</span>
									<span class="spec-value">{{ equipment.count }}</span>
								</div>
								<div class="spec-item">
									<span class="spec-label">精度:</span>
									<span class="spec-value">{{ equipment.precision }}</span>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>

			<div class="capabilities-section">
				<h2>生产能力</h2>
				<el-row :gutter="20">
					<el-col :span="6" v-for="(capability, index) in capabilities" :key="index">
						<div class="capability-item">
							<div class="capability-icon">
								<el-icon :size="50" color="#0056b3"><component :is="capability.icon" /></el-icon>
							</div>
							<h3>{{ capability.name }}</h3>
							<p class="capability-value">{{ capability.value }}</p>
							<p>{{ capability.description }}</p>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="video-section">
				<h2>生产车间视频</h2>
				<div class="video-container">
					<div class="video-placeholder">
						<el-icon :size="80" color="#0056b3"><VideoPlay /></el-icon>
						<p>点击观看生产车间介绍视频</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup name="AboutManufacturing">
import { ref } from 'vue';
// import { Cpu, Monitor, Tools, Setting, Box, VideoPlay } from '@element-plus/icons-vue';

const equipments = ref([
	{
		name: 'CNC加工中心',
		description: '精密零件加工设备',
		icon: 'Cpu',
		count: '50+',
		precision: '±0.005mm',
	},
	{
		name: '注塑成型机',
		description: '塑料零件成型设备',
		icon: 'Box',
		count: '30+',
		precision: '±0.01mm',
	},
	{
		name: '自动装配线',
		description: '自动化装配生产设备',
		icon: 'Setting',
		count: '20+',
		precision: '高精度',
	},
	{
		name: '检测设备',
		description: '精密检测仪器',
		icon: 'Monitor',
		count: '100+',
		precision: '高精度',
	},
	{
		name: '电镀生产线',
		description: '表面处理设备',
		icon: 'Tools',
		count: '5条',
		precision: '高标准',
	},
	{
		name: '测试设备',
		description: '产品测试设备',
		icon: 'Cpu',
		count: '80+',
		precision: '高精度',
	},
]);

const capabilities = ref([
	{
		name: '年产量',
		value: '1000万套',
		description: '各类连接器产品',
		icon: 'Box',
	},
	{
		name: '生产面积',
		value: '50000㎡',
		description: '现代化生产车间',
		icon: 'Monitor',
	},
	{
		name: '员工人数',
		value: '800+',
		description: '专业技术团队',
		icon: 'Setting',
	},
	{
		name: '交付周期',
		value: '3-7天',
		description: '标准订单交付',
		icon: 'Tools',
	},
]);
</script>

<style lang="scss" scoped>
.manufacturing-page {
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

.intro-card {
	margin-bottom: 40px;

	h2 {
		font-size: 24px;
		margin-bottom: 15px;
		color: #303133;
	}

	p {
		font-size: 16px;
		color: #606266;
		line-height: 1.8;
	}
}

.equipment-section,
.capabilities-section,
.video-section {
	margin-bottom: 60px;

	h2 {
		font-size: 24px;
		margin-bottom: 30px;
		color: #303133;
	}
}

.equipment-card {
	text-align: center;
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-5px);
	}

	.equipment-icon {
		margin-bottom: 15px;
	}

	h3 {
		font-size: 18px;
		margin-bottom: 10px;
		color: #303133;
	}

	p {
		font-size: 14px;
		color: #606266;
		margin-bottom: 15px;
	}

	.equipment-specs {
		display: flex;
		justify-content: center;
		gap: 20px;

		.spec-item {
			font-size: 14px;
			color: #909399;

			.spec-label {
				margin-right: 5px;
			}

			.spec-value {
				color: #0056b3;
				font-weight: 500;
			}
		}
	}
}

.capability-item {
	text-align: center;
	padding: 30px 20px;
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-5px);
	}

	.capability-icon {
		margin-bottom: 15px;
	}

	h3 {
		font-size: 18px;
		margin-bottom: 10px;
		color: #303133;
	}

	.capability-value {
		font-size: 24px;
		font-weight: bold;
		color: #0056b3;
		margin-bottom: 5px;
	}

	p {
		font-size: 14px;
		color: #606266;
	}
}

.video-container {
	background: #f5f7fa;
	border-radius: 8px;
	padding: 60px;
	text-align: center;

	.video-placeholder {
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			.el-icon {
				transform: scale(1.1);
			}
		}

		p {
			font-size: 16px;
			color: #606266;
			margin-top: 15px;
		}
	}
}

@media (max-width: 1024px) {
	.equipment-section,
	.capabilities-section {
		.el-col {
			margin-bottom: 20px;
		}
	}
}

@media (max-width: 768px) {
	.page-header,
	.content-container {
		padding: 0 20px;
	}

	.page-header h1 {
		font-size: 28px;
	}

	.video-container {
		padding: 40px 20px;
	}
}
</style>
