<template>
  <div class="news-page">
    <div class="page-header">
      <h1>{{ $t('news.title') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.news') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane :label="$t('news.companyNews')" name="news"></el-tab-pane>
        <el-tab-pane :label="$t('news.media')" name="media"></el-tab-pane>
      </el-tabs>

      <div class="news-grid">
        <el-card v-for="item in newsList" :key="item.id" class="news-card">
          <div class="news-image">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
          <div class="news-content">
            <div class="news-date">{{ item.date }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <el-button link type="primary" @click="viewDetail(item.id)">
              {{ $t('news.readMore') }}
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </div>
        </el-card>
      </div>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[6, 12, 18, 24]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup name="News">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';

const router = useRouter();

const activeTab = ref('news');
const pagination = ref({
  currentPage: 1,
  pageSize: 9,
  total: 30,
});

const newsList = ref([
  {
    id: 1,
    title: '公司荣获年度创新企业奖',
    summary: '表彰在连接器技术领域的创新贡献和卓越成就',
    date: '2026-01-10',
    image: '/images/news1.jpg',
  },
  {
    id: 2,
    title: '新产品发布：第三代航空连接器',
    summary: '性能更优，可靠性更高，满足更高要求',
    date: '2026-01-05',
    image: '/images/news2.jpg',
  },
  {
    id: 3,
    title: '参加国际航空航天展览会',
    summary: '展示最新产品和技术成果，获得广泛关注',
    date: '2025-12-28',
    image: '/images/news3.jpg',
  },
  {
    id: 4,
    title: '与知名高校签署战略合作协议',
    summary: '深化产学研合作，共促技术创新',
    date: '2025-12-15',
    image: '/images/news4.jpg',
  },
  {
    id: 5,
    title: '通过ISO 9001质量管理体系认证',
    summary: '产品质量得到国际认可',
    date: '2025-11-20',
    image: '/images/news5.jpg',
  },
  {
    id: 6,
    title: '扩建生产基地投产仪式',
    summary: '产能提升一倍，满足市场需求',
    date: '2025-11-08',
    image: '/images/news6.jpg',
  },
]);

const handleTabChange = () => {
  pagination.value.currentPage = 1;
};

const viewDetail = (id) => {
  router.push(`/news/${id}`);
};

const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
};

const handleCurrentChange = (page) => {
  pagination.value.currentPage = page;
};
</script>

<style lang="scss" scoped>
.news-page {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
}

.news-card {
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .news-image {
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
  }

  &:hover .news-image img {
    transform: scale(1.05);
  }

  .news-content {
    padding: 20px;

    .news-date {
      font-size: 14px;
      color: #909399;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #303133;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    p {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
