<template>
  <div class="support-page">
    <div class="page-header">
      <h1>{{ $t('tech.support') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/tech' }">{{ $t('nav.tech') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('tech.support') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-card class="content-card">
        <h2>支持请求</h2>
        <p>我们提供专业的技术支持服务，随时准备解答您的疑问并提供帮助。</p>
      </el-card>
    </div>
  </div>
</template>

<script setup name="Support">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.support-page {
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
