<template>
  <div class="news-detail-page">
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news' }">{{ $t('nav.news') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ news.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <!-- Article Header -->
      <div class="article-header">
        <h1 class="article-title">{{ news.title }}</h1>
        <div class="article-meta">
          <div class="meta-item">
            <el-icon><Calendar /></el-icon>
            <span>{{ news.date }}</span>
          </div>
          <div class="meta-item">
            <el-icon><View /></el-icon>
            <span>{{ news.views }} 阅读</span>
          </div>
          <div class="meta-item">
            <el-icon><User /></el-icon>
            <span>{{ news.author }}</span>
          </div>
        </div>
      </div>

      <!-- Article Image -->
      <div class="article-image" v-if="news.image">
        <img :src="news.image" :alt="news.title" loading="lazy" />
      </div>

      <!-- Article Content -->
      <div class="article-content">
        <div class="article-summary" v-if="news.summary">
          <p>{{ news.summary }}</p>
        </div>
        <div class="article-body" v-html="news.content"></div>
      </div>

      <!-- Article Actions -->
      <div class="article-actions">
        <div class="share-section">
          <span>分享：</span>
          <el-button link>
            <el-icon><Share /></el-icon>
          </el-button>
          <el-button link>
            <el-icon><ChatDotRound /></el-icon>
          </el-button>
        </div>
        <div class="action-buttons">
          <el-button @click="goBack">
            <el-icon><Back /></el-icon>
            返回列表
          </el-button>
          <el-button type="primary" @click="contactUs">
            <el-icon><Message /></el-icon>
            咨询详情
          </el-button>
        </div>
      </div>

      <!-- Related News -->
      <div class="related-news">
        <h2>相关新闻</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in relatedNews" :key="item.id">
            <div class="related-news-card" @click="viewNews(item.id)">
              <div class="news-image">
                <img :src="item.image" :alt="item.title" loading="lazy" />
              </div>
              <div class="news-content">
                <div class="news-date">{{ item.date }}</div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.summary }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup name="NewsDetail">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Calendar, View, User, Share, ChatDotRound, Back, Message } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

const news = ref({
  id: 1,
  title: '公司荣获年度创新企业奖',
  summary: '表彰在连接器技术领域的创新贡献和卓越成就',
  date: '2026-01-10',
  views: 1256,
  author: '市场部',
  image: '/images/news1.jpg',
  content: `
    <p>近日，在2026年度行业创新大会上，我公司凭借在连接器技术领域的杰出贡献和持续创新能力，荣获"年度创新企业奖"。这一殊荣充分体现了行业对我们技术实力和创新能力的高度认可。</p>
    <h3>创新突破，引领行业发展</h3>
    <p>作为连接器行业的领先企业，我们始终坚持技术创新驱动发展战略。过去一年，公司在多个关键技术领域取得重大突破：</p>
    <ul>
      <li><strong>新型材料研发</strong>：成功开发出具有更高耐温性能和更优导电性的新型合金材料，大幅提升产品在极端环境下的可靠性。</li>
      <li><strong>智能化设计</strong>：引入AI辅助设计系统，优化产品结构设计，使产品体积减小20%，性能提升15%。</li>
      <li><strong>绿色制造</strong>：研发环保型生产工艺，降低能耗30%，减少废料排放25%，践行可持续发展理念。</li>
    </ul>
    <h3>荣誉见证，砥砺前行</h3>
    <p>此次荣获"年度创新企业奖"，是对我们多年来坚持创新、追求卓越的肯定。公司将继续加大研发投入，在以下方向持续发力：</p>
    <p>• 加强与高校、科研院所的合作，建立产学研一体化创新体系<br>
    • 培养和引进高端技术人才，建设专业化研发团队<br>
    • 完善知识产权保护体系，保护创新成果<br>
    • 拓展国际市场，参与国际标准制定</p>
    <h3>展望未来，共创辉煌</h3>
    <p>站在新的起点，我们将以此次获奖为契机，进一步发挥创新优势，为客户提供更优质的产品和服务，为行业发展做出更大贡献。我们坚信，通过持续创新和不懈努力，必将在连接器领域创造更加辉煌的未来！</p>
  `,
});

const relatedNews = ref([
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
]);

const goBack = () => {
  router.back();
};

const contactUs = () => {
  router.push('/contact');
};

const viewNews = (id) => {
  router.push(`/news/${id}`);
};

onMounted(() => {
  // 根据 route.params.id 加载新闻数据
  // 实际项目中应该从 API 获取数据
  const newsId = route.params.id;
  console.log('加载新闻详情:', newsId);
});
</script>

<style lang="scss" scoped>
.news-detail-page {
  padding: 40px 0 80px;
  background: #f5f7fa;
  min-height: calc(100vh - 200px);
}

.page-header {
  max-width: 1000px;
  margin: 0 auto 30px;
  padding: 0 20px;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.article-header {
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  .article-title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #303133;
    line-height: 1.4;
    font-weight: 700;
  }

  .article-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #909399;
      font-size: 14px;

      .el-icon {
        font-size: 16px;
      }
    }
  }
}

.article-image {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
  }
}

.article-content {
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  .article-summary {
    padding: 24px;
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f1fc 100%);
    border-radius: 8px;
    margin-bottom: 30px;
    border-left: 4px solid #0056b3;

    p {
      font-size: 16px;
      color: #0056b3;
      line-height: 1.8;
      font-weight: 500;
      margin: 0;
    }
  }

  .article-body {
    line-height: 2;
    font-size: 16px;
    color: #606266;

    p {
      margin-bottom: 20px;
      line-height: 2;
    }

    h3 {
      font-size: 24px;
      margin: 30px 0 15px 0;
      color: #303133;
      font-weight: 600;
    }

    ul {
      margin: 20px 0;
      padding-left: 30px;

      li {
        margin-bottom: 12px;
        line-height: 1.8;
        position: relative;

        strong {
          color: #0056b3;
        }
      }
    }
  }
}

.article-actions {
  background: #ffffff;
  padding: 24px 40px;
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;

  .share-section {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #909399;
    font-size: 14px;

    .el-button {
      font-size: 20px;
      color: #909399;
      transition: all 0.3s;

      &:hover {
        color: #0056b3;
        transform: scale(1.1);
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 12px;
  }
}

.related-news {
  h2 {
    font-size: 28px;
    margin-bottom: 30px;
    color: #303133;
    font-weight: 600;
  }

  .related-news-card {
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .news-image {
      height: 200px;
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
        font-size: 13px;
        color: #0056b3;
        margin-bottom: 10px;
      }

      h4 {
        font-size: 16px;
        margin-bottom: 10px;
        color: #303133;
        line-height: 1.4;
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      p {
        font-size: 14px;
        color: #606266;
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

@media (max-width: 768px) {
  .news-detail-page {
    padding: 20px 0 60px;
  }

  .article-header {
    padding: 30px 20px;

    .article-title {
      font-size: 24px;
    }

    .article-meta {
      gap: 16px;
    }
  }

  .article-image {
    img {
      height: 300px;
    }
  }

  .article-content {
    padding: 30px 20px;

    .article-body {
      font-size: 15px;

      h3 {
        font-size: 20px;
      }
    }
  }

  .article-actions {
    padding: 20px;
    flex-direction: column;
    align-items: stretch;

    .share-section {
      justify-content: center;
    }

    .action-buttons {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }

  .related-news {
    h2 {
      font-size: 22px;
    }

    .el-col {
      margin-bottom: 20px;
    }
  }
}
</style>
