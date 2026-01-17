<template>
  <div class="tech-page">
    <div class="page-header">
      <h1>{{ $t('tech.title') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.tech') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <div class="tech-grid">
        <el-card v-for="item in techItems" :key="item.id" class="tech-card" @click="goToPage(item.path)">
          <div class="tech-icon">
            <el-icon :size="50" color="#0056b3"><component :is="item.icon" /></el-icon>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <el-button link type="primary">
            {{ $t('common.learnMore') }}
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup name="Tech">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArrowRight, Star, Tools, Document, School, QuestionFilled } from '@element-plus/icons-vue';

const router = useRouter();
const { t } = useI18n();

const techItems = ref([
  {
    id: 1,
    title: t('tech.rd'),
    description: '持续的技术创新和研发投入，引领行业发展',
    icon: 'Star',
    path: '/tech/rd',
  },
  {
    id: 2,
    title: t('tech.testing'),
    description: '先进的测试设备和完善的测试流程',
    icon: 'Tools',
    path: '/tech/testing',
  },
  {
    id: 3,
    title: t('tech.resourceCenter'),
    description: '丰富的技术资源和文档资料',
    icon: 'Document',
    path: '/tech/resources',
  },
  {
    id: 4,
    title: t('tech.whitepaper'),
    description: '专业技术白皮书和技术文档',
    icon: 'Document',
    path: '/tech/whitepaper',
  },
  {
    id: 5,
    title: t('tech.applications'),
    description: '实际应用案例和成功案例分享',
    icon: 'School',
    path: '/tech/applications',
  },
  {
    id: 6,
    title: t('tech.faq'),
    description: '常见问题解答和技术支持',
    icon: 'QuestionFilled',
    path: '/tech/faq',
  },
]);

const goToPage = (path) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.tech-page {
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

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.tech-card {
  text-align: center;
  padding: 40px 30px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .tech-icon {
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

@media (max-width: 1024px) {
  .tech-grid {
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

  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
