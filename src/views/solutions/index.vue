<template>
  <div class="solutions-page">
    <div class="page-header">
      <h1>{{ $t('solutions.title') }}</h1>
      <p class="page-subtitle">为各行业提供专业、可靠的解决方案</p>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.solutions') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <div class="solutions-list">
        <div v-for="solution in solutions" :key="solution.id" class="solution-item">
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="solution-image">
                <img :src="solution.image" :alt="solution.title" loading="lazy" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="solution-content">
                <h2>{{ solution.title }}</h2>
                <div class="solution-story">
                  <div class="story-section">
                    <h3>
                      <el-icon><Warning /></el-icon>
                      面临的挑战
                    </h3>
                    <p>{{ solution.challenge }}</p>
                  </div>
                  <div class="story-section">
                    <h3>
                      <el-icon><CircleCheck /></el-icon>
                      我们的解决方案
                    </h3>
                    <p>{{ solution.solution }}</p>
                    <div class="solution-features">
                      <el-tag v-for="(feature, index) in solution.features" :key="index" type="info">
                        {{ feature }}
                      </el-tag>
                    </div>
                  </div>
                  <div class="story-section benefit">
                    <h3>
                      <el-icon><Trophy /></el-icon>
                      取得的效益
                    </h3>
                    <p>{{ solution.benefit }}</p>
                  </div>
                </div>
                <div class="solution-products">
                  <h4>应用产品</h4>
                  <div class="products-preview">
                    <div v-for="product in solution.products" :key="product.id" class="product-mini" @click="viewProduct(product.id)">
                      <img :src="product.image" :alt="product.name" loading="lazy" />
                      <p>{{ product.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="solution-actions">
                  <el-button type="primary" size="large" @click="viewDetail(solution.id)">
                    {{ $t('common.learnMore') }}
                  </el-button>
                  <el-button size="large" @click="contactUs">
                    咨询方案
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- Client Testimonials -->
      <div class="testimonials-section">
        <h2>客户证言</h2>
        <el-row :gutter="30">
          <el-col :span="8" v-for="(testimonial, index) in testimonials" :key="index">
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
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- Case Studies -->
      <div class="case-studies-section">
        <h2>成功案例</h2>
        <el-row :gutter="30">
          <el-col :span="8" v-for="(caseStudy, index) in caseStudies" :key="index">
            <el-card class="case-card" @click="viewCaseStudy(caseStudy.id)">
              <div class="case-image">
                <img :src="caseStudy.image" :alt="caseStudy.title" loading="lazy" />
                <div class="case-badge">{{ caseStudy.industry }}</div>
              </div>
              <div class="case-content">
                <h3>{{ caseStudy.title }}</h3>
                <p>{{ caseStudy.summary }}</p>
                <div class="case-results">
                  <div class="result-item">
                    <span class="result-label">提升效率</span>
                    <span class="result-value">{{ caseStudy.efficiency }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-label">降低成本</span>
                    <span class="result-value">{{ caseStudy.cost }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup name="Solutions">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Warning, CircleCheck, Trophy, ChatDotRound } from '@element-plus/icons-vue';
import productImage1 from '@/assets/image/products1.png';
import productImage2 from '@/assets/image/products2.png';
import productImage3 from '@/assets/image/products3.png';
import productImage4 from '@/assets/image/products4.png';

const router = useRouter();

const solutions = ref([
  {
    id: 1,
    title: '线缆组件解决方案',
    challenge: '在严苛的工业环境下，传统线缆组件容易损坏，维护成本高，影响生产效率。',
    solution: '我们提供定制化的高可靠性线缆组件解决方案，采用特殊材料和工艺，确保在极端环境下稳定运行。',
    benefit: '设备故障率降低80%，维护成本减少60%，生产效率提升35%。',
    features: ['耐高温', '抗振动', '防水防尘', '长寿命'],
    image: productImage4,
    products: [
      { id: 2, name: 'FD-17 圆形电连接器', image: productImage2 },
      { id: 4, name: 'Y18 电缆组件', image: productImage4 },
    ],
  },
  {
    id: 2,
    title: '航空航天解决方案',
    challenge: '航空航天领域对连接器的要求极高，需要承受极端的温度、压力和振动环境。',
    solution: '提供符合AS9100标准的航空级连接器解决方案，经过严格测试和认证。',
    benefit: '产品可靠性达到99.99%，完全满足航空工业要求。',
    features: ['MIL-Spec标准', '轻量化设计', '高可靠', '经认证'],
    image: productImage1,
    products: [
      { id: 1, name: 'KWN 型钮子开关', image: productImage1 },
      { id: 4, name: 'Y18 电缆组件', image: productImage4 },
    ],
  },
  {
    id: 3,
    title: '定制加工解决方案',
    challenge: '客户需要高精度的定制零件，但传统加工方式精度不足，交期长。',
    solution: '采用先进的CNC加工设备和精密工艺，提供快速、高精度的定制加工服务。',
    benefit: '加工精度提升至±0.005mm，交期缩短50%。',
    features: ['高精度', '快速响应', '多种材料', '质量保证'],
    image: productImage2,
    products: [],
  },
  {
    id: 4,
    title: '电镀处理解决方案',
    challenge: '产品表面处理质量直接影响产品性能和寿命，传统工艺效果不稳定。',
    solution: '采用环保电镀工艺，提供稳定、高质量的表面处理服务。',
    benefit: '表面质量一致性提升90%，产品寿命延长30%。',
    features: ['环保工艺', '质量稳定', '多种镀层', '表面美观'],
    image: productImage3,
    products: [],
  },
]);

const testimonials = ref([
  {
    author: '张经理',
    company: '某航空航天企业',
    content: '他们的航空连接器产品完全符合我们的要求，质量稳定可靠，服务专业周到。',
  },
  {
    author: '李总',
    company: '某工业自动化企业',
    content: '定制化解决方案帮助我们解决了多年困扰的技术难题，效率提升明显。',
  },
  {
    author: '王工',
    company: '某轨道交通企业',
    content: '产品质量优秀，技术支持及时，值得信赖的合作伙伴。',
  },
]);

const caseStudies = ref([
  {
    id: 1,
    title: '某大型航空项目',
    summary: '为某大型航空项目提供连接器解决方案',
    industry: '航空航天',
    efficiency: '+40%',
    cost: '-30%',
    image: '/images/case1.jpg',
  },
  {
    id: 2,
    title: '智能制造升级项目',
    summary: '助力制造企业实现智能化升级',
    industry: '工业',
    efficiency: '+35%',
    cost: '-25%',
    image: '/images/case2.jpg',
  },
  {
    id: 3,
    title: '新能源项目',
    summary: '为新能源项目提供可靠连接方案',
    industry: '新能源',
    efficiency: '+50%',
    cost: '-35%',
    image: '/images/case3.jpg',
  },
]);

const viewDetail = (id) => {
  router.push(`/solutions/${id}`);
};

const viewProduct = (id) => {
  router.push(`/products/${id}`);
};

const contactUs = () => {
  router.push('/contact');
};

const viewCaseStudy = (id) => {
  // 跳转到案例详情页
  console.log('View case study:', id);
};
</script>

<style lang="scss" scoped>
.solutions-page {
  padding: 40px 0 80px;
}

.page-header {
  max-width: 1400px;
  margin: 0 auto 40px;
  padding: 0 40px;
  text-align: center;

  h1 {
    font-size: 48px;
    margin-bottom: 12px;
    color: #303133;
  }

  .page-subtitle {
    font-size: 18px;
    color: #606266;
    margin-bottom: 20px;
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.solutions-list {
  margin-bottom: 80px;
}

.solution-item {
  margin-bottom: 60px;
  padding-bottom: 60px;
  border-bottom: 1px solid #e4e7ed;

  &:last-child {
    border-bottom: none;
  }

  .solution-image {
    height: 400px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .solution-content {
    h2 {
      font-size: 32px;
      margin-bottom: 30px;
      color: #303133;
    }

    .solution-story {
      margin-bottom: 30px;

      .story-section {
        margin-bottom: 25px;
        padding: 20px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        h3 {
          font-size: 18px;
          margin-bottom: 12px;
          color: #303133;
          display: flex;
          align-items: center;
          gap: 8px;

          .el-icon {
            font-size: 22px;
          }
        }

        p {
          font-size: 16px;
          color: #606266;
          line-height: 1.8;
          margin: 0;
        }

        &.benefit {
          background: #f0f7ff;
          h3 {
            color: #0056b3;
          }
        }
      }

      .solution-features {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;
      }
    }

    .solution-products {
      margin-bottom: 30px;

      h4 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #303133;
      }

      .products-preview {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;

        .product-mini {
          width: 150px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s;

          &:hover {
            transform: translateY(-5px);

            img {
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            }
          }

          img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 8px;
            transition: all 0.3s;
          }

          p {
            font-size: 14px;
            color: #606266;
            margin: 0;
          }
        }
      }
    }

    .solution-actions {
      display: flex;
      gap: 15px;
    }
  }
}

.testimonials-section,
.case-studies-section {
  margin-bottom: 80px;

  h2 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 50px;
    color: #303133;
  }
}

.testimonial-card {
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

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
      font-size: 16px;
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
      text-align: left;

      h4 {
        font-size: 16px;
        margin: 0 0 5px 0;
        color: #303133;
      }

      p {
        font-size: 14px;
        color: #909399;
        margin: 0;
      }
    }
  }
}

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

    h3 {
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

@media (max-width: 992px) {
  .testimonials-section,
  .case-studies-section {
    .el-col {
      margin-bottom: 20px;
    }
  }

  .solution-item {
    .el-col {
      margin-bottom: 30px;
    }

    .solution-image {
      height: 300px;
    }
  }
}

@media (max-width: 768px) {
  .page-header,
  .content-container {
    padding: 0 20px;
  }

  .page-header h1 {
    font-size: 36px;
  }

  .testimonials-section,
  .case-studies-section {
    h2 {
      font-size: 28px;
    }
  }

  .solution-content {
    h2 {
      font-size: 24px;
    }

    .solution-actions {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
