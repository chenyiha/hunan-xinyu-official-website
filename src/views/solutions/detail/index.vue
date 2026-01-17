<template>
  <div class="solution-detail-page">
    <!-- Hero Section -->
    <div class="hero-section" :style="{ backgroundImage: `url(${solution.heroImage})` }">
      <div class="hero-overlay">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/solutions' }">解决方案</el-breadcrumb-item>
          <el-breadcrumb-item>{{ solution.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <h1 class="hero-title">{{ solution.title }}</h1>
        <p class="hero-subtitle">{{ solution.subtitle }}</p>
      </div>
    </div>

    <div class="content-container">
      <!-- Problem-Solution-Benefit Story Structure -->
      <section class="story-section">
        <div class="section-header">
          <h2>方案概述</h2>
          <p class="section-description">我们如何从挑战中创造价值</p>
        </div>

        <div class="story-container">
          <!-- Problem -->
          <div class="story-card problem-card">
            <div class="card-icon">
              <el-icon :size="60"><Warning /></el-icon>
            </div>
            <h3>面临的挑战</h3>
            <p class="card-description">{{ solution.problem }}</p>
            <ul class="problem-list">
              <li v-for="(item, index) in solution.problemPoints" :key="index">
                <el-icon><Close /></el-icon>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Arrow -->
          <div class="story-arrow">
            <el-icon :size="48"><ArrowRight /></el-icon>
          </div>

          <!-- Solution -->
          <div class="story-card solution-card">
            <div class="card-icon">
              <el-icon :size="60"><CircleCheck /></el-icon>
            </div>
            <h3>我们的解决方案</h3>
            <p class="card-description">{{ solution.solution }}</p>
            <ul class="solution-list">
              <li v-for="(item, index) in solution.solutionPoints" :key="index">
                <el-icon><Check /></el-icon>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Arrow -->
          <div class="story-arrow">
            <el-icon :size="48"><ArrowRight /></el-icon>
          </div>

          <!-- Benefit -->
          <div class="story-card benefit-card">
            <div class="card-icon">
              <el-icon :size="60"><Trophy /></el-icon>
            </div>
            <h3>取得的效益</h3>
            <p class="card-description">{{ solution.benefit }}</p>
            <div class="benefit-metrics">
              <div v-for="(metric, index) in solution.benefitMetrics" :key="index" class="metric-item">
                <div class="metric-value">{{ metric.value }}</div>
                <div class="metric-label">{{ metric.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Detailed Solution Process -->
      <section class="process-section">
        <div class="section-header">
          <h2>实施流程</h2>
          <p class="section-description">专业的实施步骤确保项目成功</p>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(step, index) in solution.processSteps"
            :key="index"
            :timestamp="step.phase"
            placement="top"
            :size="large"
          >
            <el-card class="process-card">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
              <div class="process-features">
                <el-tag v-for="(feature, idx) in step.features" :key="idx" type="info">
                  {{ feature }}
                </el-tag>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </section>

      <!-- Applied Products -->
      <section class="products-section">
        <div class="section-header">
          <h2>应用产品</h2>
          <p class="section-description">本方案中使用的核心产品</p>
        </div>
        <el-row :gutter="30">
          <el-col
            v-for="product in solution.appliedProducts"
            :key="product.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <div class="product-card" @click="viewProduct(product.id)">
              <div class="product-image">
                <img :src="product.image" :alt="product.name" loading="lazy" />
                <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
              </div>
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <p>{{ product.description }}</p>
                <el-button link type="primary">
                  查看详情
                  <el-icon><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>

      <!-- Technical Specifications -->
      <section class="specs-section">
        <div class="section-header">
          <h2>技术规格</h2>
          <p class="section-description">技术参数与标准</p>
        </div>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-card class="spec-card">
              <template #header>
                <div class="spec-header">
                  <el-icon><Setting /></el-icon>
                  <span>技术参数</span>
                </div>
              </template>
              <el-descriptions :column="1" border>
                <el-descriptions-item
                  v-for="(spec, index) in solution.techSpecs"
                  :key="index"
                  :label="spec.label"
                >
                  {{ spec.value }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="spec-card">
              <template #header>
                <div class="spec-header">
                  <el-icon><Document /></el-icon>
                  <span>认证标准</span>
                </div>
              </template>
              <div class="certifications-list">
                <div v-for="(cert, index) in solution.certifications" :key="index" class="cert-item">
                  <el-icon><CircleCheck /></el-icon>
                  <span>{{ cert }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <!-- Customer Testimonials -->
      <section class="testimonials-section">
        <div class="section-header">
          <h2>客户证言</h2>
          <p class="section-description">听听客户怎么说</p>
        </div>
        <el-row :gutter="30">
          <el-col
            v-for="(testimonial, index) in solution.testimonials"
            :key="index"
            :xs="24"
            :sm="12"
          >
            <el-card class="testimonial-card">
              <div class="testimonial-content">
                <el-icon class="quote-icon"><ChatDotRound /></el-icon>
                <p>{{ testimonial.content }}</p>
              </div>
              <div class="testimonial-author">
                <div class="author-avatar">{{ testimonial.author.charAt(0) }}</div>
                <div class="author-info">
                  <h4>{{ testimonial.author }}</h4>
                  <p>{{ testimonial.company }}</p>
                  <p class="author-role">{{ testimonial.role }}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <!-- Case Studies -->
      <section class="case-studies-section">
        <div class="section-header">
          <h2>成功案例</h2>
          <p class="section-description">类似项目的实施经验</p>
        </div>
        <el-row :gutter="30">
          <el-col
            v-for="(caseStudy, index) in solution.caseStudies"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
          >
            <el-card class="case-card">
              <div class="case-image">
                <img :src="caseStudy.image" :alt="caseStudy.title" loading="lazy" />
                <div class="case-badge">{{ caseStudy.industry }}</div>
              </div>
              <div class="case-content">
                <h4>{{ caseStudy.title }}</h4>
                <p>{{ caseStudy.summary }}</p>
                <div class="case-results">
                  <div class="result-item">
                    <span class="result-label">效率提升</span>
                    <span class="result-value">{{ caseStudy.efficiency }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">成本降低</span>
                    <span class="result-value">{{ caseStudy.cost }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <!-- Related Solutions -->
      <section class="related-solutions-section">
        <div class="section-header">
          <h2>相关方案</h2>
          <p class="section-description">探索更多解决方案</p>
        </div>
        <el-row :gutter="30">
          <el-col
            v-for="(related, index) in solution.relatedSolutions"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
          >
            <div class="related-solution-card" @click="viewSolution(related.id)">
              <img :src="related.image" :alt="related.title" loading="lazy" />
              <div class="related-content">
                <h4>{{ related.title }}</h4>
                <p>{{ related.brief }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>准备好开始您的项目了吗？</h2>
          <p>联系我们获取专业的解决方案咨询和定制服务</p>
          <div class="cta-buttons">
            <el-button type="primary" size="large" @click="contactUs">
              <el-icon><ChatDotRound /></el-icon>
              咨询方案
            </el-button>
            <el-button size="large" @click="downloadBrochure">
              <el-icon><Download /></el-icon>
              下载方案手册
            </el-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup name="SolutionDetail">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Warning,
  CircleCheck,
  Trophy,
  ChatDotRound,
  ArrowRight,
  Check,
  Close,
  Setting,
  Document,
  Download,
} from '@element-plus/icons-vue';
import productImage1 from '@/assets/image/products1.png';
import productImage2 from '@/assets/image/products2.png';
import productImage3 from '@/assets/image/products3.png';
import productImage4 from '@/assets/image/products4.png';

const route = useRoute();
const router = useRouter();

const solution = ref({
  id: 1,
  title: '线缆组件解决方案',
  subtitle: '为严苛工业环境提供高可靠性连接',
  heroImage: productImage4,
  problem: '在严苛的工业环境下，传统线缆组件容易因高温、振动、腐蚀等因素损坏，导致设备故障频发，维护成本高昂，严重影响生产效率。',
  problemPoints: [
    '高温环境下线缆老化快，寿命短',
    '强烈振动导致连接松动',
    '腐蚀性气体侵蚀连接器',
    '维护成本高，停机时间长',
  ],
  solution: '我们提供定制化的高可靠性线缆组件解决方案，采用特殊材料和先进工艺，确保在极端环境下稳定运行，大幅提升系统可靠性。',
  solutionPoints: [
    '使用耐高温特种材料',
    '加强密封与抗振动设计',
    '防腐涂层处理',
    '模块化设计便于维护',
  ],
  benefit: '通过采用我们的高可靠性线缆组件解决方案，帮助客户显著提升系统稳定性和生产效率，大幅降低维护成本。',
  benefitMetrics: [
    { value: '80%', label: '故障率降低' },
    { value: '60%', label: '维护成本减少' },
    { value: '35%', label: '生产效率提升' },
  ],
  processSteps: [
    {
      phase: '第一阶段：需求分析',
      title: '深入了解客户需求',
      description: '与客户技术团队深入沟通，全面了解应用环境、技术要求和预算限制。',
      features: ['现场调研', '技术评估', '方案设计'],
    },
    {
      phase: '第二阶段：方案设计',
      title: '定制化方案开发',
      description: '根据需求分析结果，设计定制化的解决方案，包括产品选型、工艺设计和测试方案。',
      features: ['产品设计', '工艺验证', '样品测试'],
    },
    {
      phase: '第三阶段：实施部署',
      title: '生产与交付',
      description: '严格按照设计方案进行生产，进行多道质量检测，确保产品符合要求。',
      features: ['批量生产', '质量检测', '按时交付'],
    },
    {
      phase: '第四阶段：售后支持',
      title: '持续服务保障',
      description: '提供完善的售后服务和技术支持，确保客户无后顾之忧。',
      features: ['技术培训', '定期维护', '应急响应'],
    },
  ],
  appliedProducts: [
    {
      id: 1,
      name: 'FD-17 圆形电连接器',
      description: '符合Q/MU20016-2003标准，工作温度-20℃~+65℃',
      image: productImage2,
      badge: '热销',
    },
    {
      id: 2,
      name: 'Y18 电缆组件',
      description: '工作温度-40℃~+100℃，密封段可承受0.1MPa气压',
      image: productImage4,
      badge: '推荐',
    },
    {
      id: 3,
      name: 'KWN 型钮子开关',
      description: '符合GJB2450-95标准，防爆等级Ex de II C T6',
      image: productImage1,
    },
    {
      id: 4,
      name: 'XK 限位开关',
      description: '防护等级IP67，电寿命100000次',
      image: productImage3,
    },
  ],
  techSpecs: [
    { label: '工作温度范围', value: '-55℃ ~ +125℃' },
    { label: '防护等级', value: 'IP67 / IP68' },
    { label: '额定电压', value: 'AC 250V / DC 400V' },
    { label: '额定电流', value: '5A - 20A' },
    { label: '接触电阻', value: '≤10mΩ' },
    { label: '绝缘电阻', value: '≥5000MΩ' },
  ],
  certifications: [
    'ISO 9001 质量管理体系',
    'IATF 16949 汽车行业质量体系',
    'GJB 军用标准认证',
    'UL 安全认证',
    'CE 欧洲认证',
  ],
  testimonials: [
    {
      author: '张经理',
      company: '某大型制造企业',
      role: '设备部经理',
      content: '自从采用了他们的线缆组件解决方案，我们的设备故障率大幅下降，生产效率显著提升，投资回报率超出预期。',
    },
    {
      author: '李总',
      company: '某自动化公司',
      role: '技术总监',
      content: '专业、可靠、高效，他们不仅提供了优质产品，更提供了全方位的技术支持，是我们值得信赖的合作伙伴。',
    },
    {
      author: '王工',
      company: '某轨道交通企业',
      role: '高级工程师',
      content: '产品质量稳定，技术参数达标，售后服务及时，完全满足我们对高可靠性连接的要求。',
    },
  ],
  caseStudies: [
    {
      title: '某智能制造升级项目',
      summary: '为大型制造企业提供完整的线缆组件解决方案',
      industry: '智能制造',
      efficiency: '+40%',
      cost: '-35%',
      image: productImage2,
    },
    {
      title: '新能源电池生产线',
      summary: '提供高可靠性连接方案确保生产线稳定运行',
      industry: '新能源',
      efficiency: '+35%',
      cost: '-30%',
      image: productImage4,
    },
    {
      title: '工业机器人配套',
      summary: '为工业机器人提供定制化线缆组件',
      industry: '机器人',
      efficiency: '+45%',
      cost: '-25%',
      image: productImage3,
    },
  ],
  relatedSolutions: [
    {
      id: 2,
      title: '航空航天解决方案',
      brief: '符合AS9100标准的航空级连接器',
      image: productImage1,
    },
    {
      id: 3,
      title: '定制加工解决方案',
      brief: '高精度CNC加工定制服务',
      image: productImage2,
    },
    {
      id: 4,
      title: '电镀处理解决方案',
      brief: '环保电镀工艺表面处理',
      image: productImage3,
    },
  ],
});

onMounted(() => {
  const solutionId = route.params.id;
  // 实际项目中，这里应该根据 solutionId 调用 API 获取解决方案详情
  console.log('Solution ID:', solutionId);
});

const viewProduct = (id) => {
  router.push(`/products/${id}`);
};

const viewSolution = (id) => {
  router.push(`/solutions/${id}`);
};

const contactUs = () => {
  router.push('/contact/inquiry');
};

const downloadBrochure = () => {
  // 实际项目中，这里应该下载方案手册
  console.log('Download brochure');
};
</script>

<style lang="scss" scoped>
.solution-detail-page {
  min-height: 100vh;
  background: #f5f7fa;
}

// Hero Section
.hero-section {
  position: relative;
  height: 500px;
  background-size: cover;
  background-position: center;
  margin-bottom: 60px;

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 86, 179, 0.9) 0%, rgba(74, 144, 226, 0.85) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;

    .el-breadcrumb {
      margin-bottom: 30px;

      :deep(.el-breadcrumb__inner) {
        color: rgba(255, 255, 255, 0.85);
        font-weight: 500;

        &:hover {
          color: #ffffff;
        }
      }

      :deep(.el-breadcrumb__separator) {
        color: rgba(255, 255, 255, 0.85);
      }
    }

    .hero-title {
      font-size: 56px;
      margin-bottom: 15px;
      font-weight: bold;
      text-align: center;
      max-width: 900px;
      padding: 0 20px;
    }

    .hero-subtitle {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.9);
      text-align: center;
      max-width: 800px;
      padding: 0 20px;
    }
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 80px;
}

// Section Header
.section-header {
  text-align: center;
  margin-bottom: 50px;

  h2 {
    font-size: 36px;
    margin-bottom: 10px;
    color: #303133;
  }

  .section-description {
    font-size: 16px;
    color: #909399;
  }
}

// Story Section
.story-section {
  margin-bottom: 80px;

  .story-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 20px;
    align-items: stretch;
  }

  .story-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 40px 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .card-icon {
      margin-bottom: 20px;
      color: var(--el-color-primary);
    }

    h3 {
      font-size: 24px;
      margin-bottom: 15px;
      color: #303133;
    }

    .card-description {
      font-size: 15px;
      color: #606266;
      line-height: 1.8;
      margin-bottom: 20px;
    }
  }

  .problem-card {
    .card-icon {
      color: #f56c6c;
    }

    .problem-list {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
      width: 100%;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        color: #606266;
        font-size: 14px;

        .el-icon {
          color: #f56c6c;
          flex-shrink: 0;
        }
      }
    }
  }

  .solution-card {
    .card-icon {
      color: #0056b3;
    }

    .solution-list {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
      width: 100%;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        color: #606266;
        font-size: 14px;

        .el-icon {
          color: #0056b3;
          flex-shrink: 0;
        }
      }
    }
  }

  .benefit-card {
    .card-icon {
      color: #67c23a;
    }

    .benefit-metrics {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      width: 100%;

      .metric-item {
        flex: 1;
        min-width: 100px;
        padding: 15px;
        background: #f0f9ff;
        border-radius: 8px;

        .metric-value {
          font-size: 28px;
          font-weight: bold;
          color: #0056b3;
          margin-bottom: 5px;
        }

        .metric-label {
          font-size: 13px;
          color: #606266;
        }
      }
    }
  }

  .story-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #909399;
  }
}

// Process Section
.process-section {
  margin-bottom: 80px;

  .el-timeline {
    padding-left: 20px;
  }

  :deep(.el-timeline-item__timestamp) {
    font-size: 16px;
    font-weight: 500;
    color: #0056b3;
  }

  .process-card {
    h4 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #303133;
    }

    p {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .process-features {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  }
}

// Products Section
.products-section {
  margin-bottom: 80px;

  .product-card {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

      .product-image img {
        transform: scale(1.05);
      }
    }

    .product-image {
      position: relative;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .product-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #f56c6c;
        color: #ffffff;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
      }
    }

    .product-info {
      padding: 20px;

      h4 {
        font-size: 16px;
        margin-bottom: 10px;
        color: #303133;
      }

      p {
        font-size: 13px;
        color: #606266;
        margin-bottom: 15px;
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

// Specs Section
.specs-section {
  margin-bottom: 80px;

  .spec-card {
    height: 100%;

    :deep(.el-card__header) {
      background: #f5f7fa;
      padding: 20px;
    }

    .spec-header {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 500;
      color: #303133;

      .el-icon {
        color: #0056b3;
      }
    }

    :deep(.el-descriptions__label) {
      background: #fafafa;
      width: 140px;
      font-weight: 500;
    }

    .certifications-list {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .cert-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: #f0f7ff;
        border-radius: 6px;
        color: #0056b3;

        .el-icon {
          font-size: 20px;
          flex-shrink: 0;
        }
      }
    }
  }
}

// Testimonials Section
.testimonials-section {
  margin-bottom: 80px;

  .testimonial-card {
    height: 100%;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .testimonial-content {
      margin-bottom: 25px;
      position: relative;

      .quote-icon {
        font-size: 40px;
        color: #e6f1fc;
        margin-bottom: 15px;
      }

      p {
        font-size: 15px;
        color: #606266;
        line-height: 1.8;
        margin: 0;
        font-style: italic;
      }
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 15px;
      padding-top: 20px;
      border-top: 1px solid #e4e7ed;

      .author-avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0056b3 0%, #4a90e2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .author-info {
        flex: 1;

        h4 {
          font-size: 16px;
          margin: 0 0 5px 0;
          color: #303133;
        }

        p {
          font-size: 14px;
          color: #909399;
          margin: 0;

          &.author-role {
            font-size: 13px;
            color: #c0c4cc;
            margin-top: 3px;
          }
        }
      }
    }
  }
}

// Case Studies Section
.case-studies-section {
  margin-bottom: 80px;

  .case-card {
    cursor: pointer;
    transition: all 0.3s;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

      .case-image img {
        transform: scale(1.05);
      }
    }

    .case-image {
      height: 200px;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .case-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #0056b3;
        color: #ffffff;
        padding: 6px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .case-content {
      padding: 20px;

      h4 {
        font-size: 18px;
        margin-bottom: 10px;
        color: #303133;
      }

      p {
        font-size: 14px;
        color: #606266;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      .case-results {
        display: flex;
        justify-content: space-around;
        padding-top: 15px;
        border-top: 1px solid #e4e7ed;

        .result-item {
          text-align: center;

          .result-label {
            display: block;
            font-size: 12px;
            color: #909399;
            margin-bottom: 5px;
          }

          .result-value {
            display: block;
            font-size: 20px;
            font-weight: bold;
            color: #0056b3;
          }
        }
      }
    }
  }
}

// Related Solutions Section
.related-solutions-section {
  margin-bottom: 80px;

  .related-solution-card {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

      img {
        transform: scale(1.05);
      }
    }

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .related-content {
      padding: 20px;

      h4 {
        font-size: 18px;
        margin-bottom: 10px;
        color: #303133;
      }

      p {
        font-size: 14px;
        color: #606266;
        margin: 0;
        line-height: 1.6;
      }
    }
  }
}

// CTA Section
.cta-section {
  background: linear-gradient(135deg, #0056b3 0%, #4a90e2 100%);
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  color: #ffffff;

  h2 {
    font-size: 36px;
    margin-bottom: 15px;
    color: #ffffff;
  }

  p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 30px;
  }

  .cta-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;

    .el-button {
      min-width: 180px;
      height: 48px;
      font-size: 16px;
    }

    .el-button--primary {
      background: #ffffff;
      color: #0056b3;
      border: none;

      &:hover {
        background: rgba(255, 255, 255, 0.9);
      }
    }

    .el-button--default {
      background: transparent;
      color: #ffffff;
      border: 2px solid #ffffff;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

// Responsive Design
@media (max-width: 1200px) {
  .content-container {
    padding: 0 30px 60px;
  }

  .story-section .story-container {
    gap: 15px;
  }
}

@media (max-width: 992px) {
  .hero-section {
    height: 400px;

    .hero-overlay {
      .hero-title {
        font-size: 42px;
      }

      .hero-subtitle {
        font-size: 18px;
      }
    }
  }

  .content-container {
    padding: 0 25px 60px;
  }

  .section-header h2 {
    font-size: 32px;
  }

  .story-section {
    .story-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .story-arrow {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 350px;

    .hero-overlay {
      .hero-title {
        font-size: 32px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .el-breadcrumb {
        display: none;
      }
    }
  }

  .content-container {
    padding: 0 20px 50px;
  }

  .section-header {
    h2 {
      font-size: 28px;
    }

    .section-description {
      font-size: 15px;
    }
  }

  .story-card {
    padding: 30px 20px;

    h3 {
      font-size: 20px;
    }

    .benefit-metrics .metric-item {
      min-width: 80px;

      .metric-value {
        font-size: 24px;
      }
    }
  }

  .cta-section {
    padding: 40px 20px;

    h2 {
      font-size: 28px;
    }

    p {
      font-size: 16px;
    }

    .cta-buttons {
      .el-button {
        width: 100%;
        max-width: 280px;
        min-width: auto;
      }
    }
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 300px;

    .hero-overlay {
      .hero-title {
        font-size: 26px;
      }

      .hero-subtitle {
        font-size: 14px;
      }
    }
  }

  .content-container {
    padding: 0 15px 40px;
  }

  .section-header h2 {
    font-size: 24px;
  }

  .story-card {
    padding: 25px 15px;

    .card-icon .el-icon {
      font-size: 48px;
    }

    h3 {
      font-size: 18px;
    }
  }
}
</style>
