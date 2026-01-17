<template>
  <div class="mission-page">
    <div class="page-header">
      <h1>{{ $t('about.mission') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.about') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('about.mission') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <div class="mission-section">
        <el-row :gutter="40">
          <el-col :span="12">
            <el-card class="mission-card">
              <template #header>
                <div class="card-header">
                  <el-icon :size="30" color="#0056b3"><Aim /></el-icon>
                  <h3>使命</h3>
                </div>
              </template>
              <p>通过持续创新和卓越品质，为全球客户提供安全可靠的连接解决方案，推动行业技术进步，创造社会价值。</p>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="mission-card">
              <template #header>
                <div class="card-header">
                  <el-icon :size="30" color="#0056b3"><View /></el-icon>
                  <h3>愿景</h3>
                </div>
              </template>
              <p>成为全球领先的连接器和电缆组件供应商，以技术创新引领行业发展，为客户创造持久价值。</p>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div class="values-section">
        <h2>价值观</h2>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(value, index) in values" :key="index">
            <div class="value-item">
              <el-icon :size="40" color="#0056b3"><component :is="value.icon" /></el-icon>
              <h4>{{ value.title }}</h4>
              <p>{{ value.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup name="AboutMission">
import { ref } from 'vue';
import { Aim, View, Star, Tools, Service, Trophy } from '@element-plus/icons-vue';

const values = ref([
  {
    title: '客户至上',
    description: '以客户需求为导向，提供优质产品和服务',
    icon: 'Service',
  },
  {
    title: '诚信为本',
    description: '坚守诚信原则，建立长期合作关系',
    icon: 'Star',
  },
  {
    title: '创新驱动',
    description: '持续创新，保持技术和产品领先优势',
    icon: 'Trophy',
  },
  {
    title: '精益求精',
    description: '追求卓越，不断提升产品质量和服务水平',
    icon: 'Tools',
  },
]);
</script>

<style lang="scss" scoped>
.mission-page {
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

.mission-section {
  margin-bottom: 60px;

  .mission-card {
    height: 100%;

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;

      h3 {
        font-size: 24px;
        margin: 0;
        color: #303133;
      }
    }

    p {
      font-size: 16px;
      color: #606266;
      line-height: 1.8;
    }
  }
}

.values-section {
  h2 {
    font-size: 28px;
    margin-bottom: 30px;
    color: #303133;
  }

  .value-item {
    text-align: center;
    padding: 30px 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    h4 {
      font-size: 18px;
      margin: 15px 0 10px;
      color: #303133;
    }

    p {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
    }
  }
}

@media (max-width: 1024px) {
  .values-section {
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

  .mission-section {
    .el-col {
      margin-bottom: 20px;
    }
  }

  .page-header h1,
  .values-section h2 {
    font-size: 24px;
  }
}
</style>
