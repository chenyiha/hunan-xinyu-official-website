<template>
  <div class="quality-page">
    <div class="page-header">
      <h1>{{ $t('about.quality') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.about') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('about.quality') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-card class="intro-card">
        <h2>质量管理体系</h2>
        <p>公司建立了完善的质量管理体系，从原材料采购、生产过程控制到产品交付，实施全过程质量管理。我们严格执行国际标准和行业规范，确保产品质量稳定可靠。</p>
      </el-card>

      <div class="quality-process">
        <h2>质量控制流程</h2>
        <el-steps :active="4" align-center>
          <el-step title="原材料检验" description="严格的供应商审核和进料检验"></el-step>
          <el-step title="过程控制" description="生产过程实时监控和质量追溯"></el-step>
          <el-step title成品检验 description="完善的成品检验和测试流程"></el-step>
          <el-step title="持续改进" description="持续优化和质量提升计划"></el-step>
        </el-steps>
      </div>

      <div class="quality-standards">
        <h2>质量标准</h2>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(standard, index) in standards" :key="index">
            <div class="standard-item">
              <h3>{{ standard.name }}</h3>
              <p>{{ standard.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="quality-stats">
        <h2>质量指标</h2>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(stat, index) in stats" :key="index">
            <div class="stat-item">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup name="AboutQuality">
import { ref } from 'vue';

const standards = ref([
  {
    name: 'ISO 9001',
    description: '国际质量管理体系标准',
  },
  {
    name: 'AS 9100',
    description: '航空航天质量管理体系',
  },
  {
    name: 'IATF 16949',
    description: '汽车行业质量管理体系',
  },
  {
    name: 'UL认证',
    description: '美国安全认证标准',
  },
]);

const stats = ref([
  {
    value: '99.9%',
    label: '产品合格率',
  },
  {
    value: '0.3%',
    label: '客户投诉率',
  },
  {
    value: '100%',
    label: '体系符合率',
  },
  {
    value: '24H',
    label: '响应时间',
  },
]);
</script>

<style lang="scss" scoped>
.quality-page {
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

.quality-process {
  margin-bottom: 60px;

  h2 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #303133;
  }
}

.quality-standards,
.quality-stats {
  margin-bottom: 60px;

  h2 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #303133;
  }
}

.standard-item,
.stat-item {
  text-align: center;
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
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

  .stat-value {
    font-size: 36px;
    font-weight: bold;
    color: #0056b3;
    margin-bottom: 10px;
  }

  .stat-label {
    font-size: 14px;
    color: #606266;
  }
}

@media (max-width: 1024px) {
  .quality-standards,
  .quality-stats {
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

  .quality-process {
    :deep(.el-steps) {
      .el-step__title {
        font-size: 14px;
      }
    }
  }
}
</style>
