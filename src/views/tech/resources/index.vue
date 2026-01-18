<template>
  <div class="resources-page">
    <div class="page-header">
      <h1>{{ $t('tech.resourceCenter') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/tech' }">{{ $t('nav.tech') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('tech.resourceCenter') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-card class="content-card">
        <h2>丰富的技术资源和文档资料</h2>
        <p>我们提供丰富的技术资源和文档资料，帮助客户更好地了解和使用我们的产品。</p>
      </el-card>
    </div>
  </div>
</template>

<script setup name="Resources">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.resources-page {
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

.content-card {
  padding: 40px;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #303133;
  }

  p {
    font-size: 16px;
    color: #606266;
    line-height: 1.8;
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

  .content-card {
    padding: 20px;
  }
}
</style>
