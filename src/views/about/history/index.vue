<template>
  <div class="history-page">
    <div class="page-header">
      <h1>{{ $t('about.history') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.about') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('about.history') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in milestones"
          :key="index"
          :timestamp="item.year"
          placement="top"
          size="large"
          color="#0056b3"
        >
          <el-card>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup name="AboutHistory">
import { ref } from 'vue';

const milestones = ref([
  {
    year: '1970',
    title: '建厂',
    description: '四机部批准创建国营华峰器材厂，代号：855厂',
  },
  {
    year: '1993',
    title: '集团公司成立',
    description: '湖南华峰电子集团公司正式成立',
  },
  {
    year: '1996',
    title: 'ISO9001认证',
    description: '通过ISO9001质量体系认证',
  },
  {
    year: '2000',
    title: '军标认证',
    description: '印制电路连接器的产品及生产线通过中国军用电子元器件质量认证委员会的质量认证',
  },
  {
    year: '2003',
    title: '军标认证',
    description: '圆形连接器的产品及生产线通过中国军用电子元器件质量认证委员会的质量认证',
  },
  {
    year: '2006',
    title: 'GJB9001认证',
    description: '通过GJB9001-2001质量体系认证',
  },
  {
    year: '2008',
    title: '公司改制',
    description: '公司改制，湖南华峰新宇电子有限公司成立',
  },
  {
    year: '2011',
    title: '检测试验室',
    description: '公司建立了国内第一家军用电磁断路器检测试验室',
  },
  {
    year: '2016',
    title: '高新技术企业',
    description: '获得国家高新技术企业认证证书',
  },
  {
    year: '2018',
    title: '供应商认证',
    description: '入选兵器工业集团合格供应商优选目录',
  },
]);
</script>

<style lang="scss" scoped>
.history-page {
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

.el-card {
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #303133;
  }

  p {
    font-size: 16px;
    color: #606266;
    line-height: 1.6;
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
}
</style>
