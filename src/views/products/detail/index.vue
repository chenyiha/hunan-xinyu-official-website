<template>
  <div class="product-detail-page">
    <div class="page-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/products' }">{{ $t('nav.products') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <!-- Product Overview -->
      <div class="product-overview">
        <el-row :gutter="40">
          <el-col :span="12">
            <div class="product-gallery">
              <el-carousel height="400px" indicator-position="outside">
                <el-carousel-item v-for="(image, index) in product.images" :key="index">
                  <img :src="image" :alt="product.name" />
                </el-carousel-item>
              </el-carousel>
              <div class="image-thumbnails">
                <img
                  v-for="(image, index) in product.images"
                  :key="index"
                  :src="image"
                  :alt="product.name"
                  @click="currentImageIndex = index"
                  :class="{ active: currentImageIndex === index }"
                />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product-details">
              <h1>{{ product.name }}</h1>
              <p class="product-category">{{ product.category }}</p>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-tags">
                <el-tag v-for="tag in product.tags" :key="tag" type="info">{{ tag }}</el-tag>
              </div>
              <div class="product-actions">
                <el-button type="primary" size="large" @click="goToQuote">
                  {{ $t('products.quickQuote') }}
                </el-button>
                <el-button size="large" @click="downloadSpecs">
                  {{ $t('products.specsDownload') }}
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- Technical Specifications -->
      <el-card class="specs-card">
        <template #header>
          <h2>{{ $t('products.specs') }}</h2>
        </template>
        <el-table :data="product.specs" border stripe :row-class-name="tableRowClassName">
          <el-table-column prop="parameter" label="参数" width="200"></el-table-column>
          <el-table-column prop="value" label="数值">
            <template #default="{ row }">
              <span :class="{ 'highlight-value': row.highlight }">{{ row.value }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- Downloads -->
      <el-card class="downloads-card">
        <template #header>
          <div class="card-header">
            <h2>{{ $t('products.downloads') }}</h2>
            <p>获取完整的技术文档和资料</p>
          </div>
        </template>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="技术文档" name="specs">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(file, index) in specDocuments" :key="index">
                <div class="download-item">
                  <div class="file-icon pdf">
                    <el-icon :size="30"><Document /></el-icon>
                  </div>
                  <div class="file-info">
                    <p class="file-name">{{ file.name }}</p>
                    <p class="file-meta">{{ file.size }} | {{ file.date }}</p>
                  </div>
                  <el-button type="primary" link>{{ $t('common.download') }}</el-button>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="CAD图纸" name="cad">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(file, index) in cadDocuments" :key="index">
                <div class="download-item">
                  <div class="file-icon cad">
                    <el-icon :size="30"><Files /></el-icon>
                  </div>
                  <div class="file-info">
                    <p class="file-name">{{ file.name }}</p>
                    <p class="file-meta">{{ file.size }} | {{ file.format }}</p>
                  </div>
                  <el-button type="primary" link>{{ $t('common.download') }}</el-button>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="其他资料" name="other">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(file, index) in otherDocuments" :key="index">
                <div class="download-item">
                  <div class="file-icon other">
                    <el-icon :size="30"><FolderOpened /></el-icon>
                  </div>
                  <div class="file-info">
                    <p class="file-name">{{ file.name }}</p>
                    <p class="file-meta">{{ file.size }} | {{ file.type }}</p>
                  </div>
                  <el-button type="primary" link>{{ $t('common.download') }}</el-button>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- Related Products -->
      <div class="related-products">
        <h2>{{ $t('products.relatedProducts') }}</h2>
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in relatedProducts" :key="item.id">
            <div class="related-product-card" @click="viewProduct(item.id)">
              <div class="compatible-badge" v-if="item.compatible">兼容</div>
              <img :src="item.image" :alt="item.name" loading="lazy" />
              <h4>{{ item.name }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup name="ProductDetail">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Document, Files, FolderOpened } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const currentImageIndex = ref(0);
const activeTab = ref('specs');

const product = ref({
  id: 1,
  name: '航空连接器 A-100',
  category: '连接器',
  description: '高可靠性航空级连接器，符合MIL-Spec标准。适用于航空航天、国防等高可靠性要求的应用场景。具有优异的耐高温、抗振动和防腐蚀性能。',
  tags: ['航空', '高可靠', 'MIL-Spec'],
  images: ['/images/product1.jpg', '/images/product1-2.jpg', '/images/product1-3.jpg'],
  specs: [
    { parameter: '额定电流', value: '5A', highlight: true },
    { parameter: '额定电压', value: '250V AC/DC' },
    { parameter: '接触电阻', value: '≤10mΩ' },
    { parameter: '绝缘电阻', value: '≥5000MΩ' },
    { parameter: '耐电压', value: '1000V AC' },
    { parameter: '工作温度', value: '-55°C ~ +125°C', highlight: true },
    { parameter: '接触件材料', value: '铜合金镀金' },
    { parameter: '外壳材料', value: '铝合金' },
    { parameter: '防护等级', value: 'IP67' },
    { parameter: '标准', value: 'MIL-DTL-38999', highlight: true },
  ],
  specDocuments: [
    { name: '产品规格书', size: '2.5 MB', date: '2025-12-01' },
    { name: '安装指南', size: '1.8 MB', date: '2025-12-01' },
    { name: '维护手册', size: '1.2 MB', date: '2025-12-01' },
  ],
  cadDocuments: [
    { name: '2D图纸', size: '0.8 MB', format: 'DWG' },
    { name: '3D模型 (STEP)', size: '3.2 MB', format: 'STEP' },
    { name: '3D模型 (IGES)', size: '2.8 MB', format: 'IGES' },
  ],
  otherDocuments: [
    { name: '产品目录', size: '5.6 MB', type: 'PDF' },
    { name: '应用案例', size: '2.1 MB', type: 'PDF' },
  ],
});

const relatedProducts = ref([
  {
    id: 2,
    name: '工业连接器 I-200',
    description: '耐环境工业连接器',
    image: '/images/product2.jpg',
    compatible: true,
  },
  {
    id: 3,
    name: '电缆组件 C-300',
    description: '定制化电缆组件',
    image: '/images/product3.jpg',
    compatible: true,
  },
  {
    id: 4,
    name: '汽车连接器 A-300',
    description: '汽车级连接器',
    image: '/images/product4.jpg',
    compatible: false,
  },
]);

const specDocuments = computed(() => product.value.specDocuments);
const cadDocuments = computed(() => product.value.cadDocuments);
const otherDocuments = computed(() => product.value.otherDocuments);

const goToQuote = () => {
  router.push('/contact/quote');
};

const downloadSpecs = () => {
  // 实现下载功能
};

const viewProduct = (id) => {
  router.push(`/products/${id}`);
};

const tableRowClassName = ({ row }) => {
  if (row.highlight) {
    return 'highlight-row';
  }
  return '';
};
</script>

<style lang="scss" scoped>
.product-detail-page {
  padding: 40px 0 80px;
}

.page-header {
  max-width: 1400px;
  margin: 0 auto 30px;
  padding: 0 40px;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.product-overview {
  margin-bottom: 40px;
}

.product-gallery {
  .el-carousel {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image-thumbnails {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s;

      &.active {
        border-color: #0056b3;
      }

      &:hover {
        border-color: #0056b3;
      }
    }
  }
}

.product-details {
  h1 {
    font-size: 32px;
    margin-bottom: 10px;
    color: #303133;
  }

  .product-category {
    font-size: 16px;
    color: #909399;
    margin-bottom: 20px;
  }

  .product-description {
    font-size: 16px;
    color: #606266;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .product-tags {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }

  .product-actions {
    display: flex;
    gap: 15px;
  }
}

.specs-card,
.downloads-card {
  margin-bottom: 40px;

  :deep(.el-card__header) {
    padding: 20px;
    background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);

    .card-header {
      h2 {
        font-size: 24px;
        margin: 0 0 5px 0;
        color: #303133;
      }

      p {
        font-size: 14px;
        color: #606266;
        margin: 0;
      }
    }
  }
}

.download-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background: #e6f1fc;
    transform: translateX(5px);
  }

  .file-icon {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.pdf {
      background: #ffe6e6;
      color: #f56c6c;
    }

    &.cad {
      background: #e6f1fc;
      color: #0056b3;
    }

    &.other {
      background: #f0f0f0;
      color: #909399;
    }
  }

  .file-info {
    flex: 1;

    .file-name {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 5px;
    }

    .file-meta {
      font-size: 14px;
      color: #909399;
    }
  }
}

.related-products {
  h2 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #303133;
  }

.related-product-card {
  text-align: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .compatible-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #67c23a;
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #303133;
  }

  p {
    font-size: 14px;
    color: #606266;
  }
}
}

@media (max-width: 992px) {
  .product-overview {
    .el-col {
      margin-bottom: 30px;
    }
  }
}

@media (max-width: 768px) {
  .page-header,
  .content-container {
    padding: 0 20px;
  }

  .product-details {
    h1 {
      font-size: 24px;
    }

    .product-actions {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }

  .downloads-card {
    .el-col {
      margin-bottom: 15px;
    }
  }

  .related-products {
    .el-col {
      margin-bottom: 20px;
    }
  }
}
</style>
