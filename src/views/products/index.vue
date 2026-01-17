<template>
  <div class="products-page">
    <div class="page-header">
      <h1>{{ $t('products.title') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.products') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <!-- Filters -->
      <div class="filters-section">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-select v-model="filters.category" placeholder="产品类别" clearable @change="handleFilterChange">
              <el-option label="连接器" value="connector"></el-option>
              <el-option label="电缆组件" value="cable"></el-option>
              <el-option label="解决方案" value="solution"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="filters.industry" placeholder="行业筛选" clearable @change="handleFilterChange">
              <el-option label="航空航天" value="aerospace"></el-option>
              <el-option label="国防" value="defense"></el-option>
              <el-option label="轨道交通" value="rail"></el-option>
              <el-option label="工业" value="industrial"></el-option>
              <el-option label="汽车" value="automotive"></el-option>
              <el-option label="医疗" value="medical"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="filters.keyword" placeholder="搜索产品..." clearable @input="handleFilterChange">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
        </el-row>
      </div>

      <!-- Product Grid -->
      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" loading="lazy" />
            <div class="product-overlay">
              <el-button type="primary" @click="viewDetail(product.id)">
                {{ $t('products.details') }}
              </el-button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-category">{{ product.category }}</span>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="product-tags">
              <el-tag v-for="tag in product.tags" :key="tag" size="small">{{ tag }}</el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[12, 24, 36, 48]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup name="Products">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';

const router = useRouter();

const filters = ref({
  category: '',
  industry: '',
  keyword: '',
});

const pagination = ref({
  currentPage: 1,
  pageSize: 12,
  total: 48,
});

const products = ref([
  {
    id: 1,
    name: '航空连接器 A-100',
    category: '连接器',
    description: '高可靠性航空级连接器，符合MIL-Spec标准',
    image: '/images/product1.jpg',
    tags: ['航空', '高可靠', 'MIL-Spec'],
    industry: 'aerospace',
  },
  {
    id: 2,
    name: '工业连接器 I-200',
    category: '连接器',
    description: '耐环境工业连接器，适用于严苛环境',
    image: '/images/product2.jpg',
    tags: ['工业', '耐环境', 'IP67'],
    industry: 'industrial',
  },
  {
    id: 3,
    name: '电缆组件 C-300',
    category: '电缆组件',
    description: '定制化电缆组件，满足多样化需求',
    image: '/images/product3.jpg',
    tags: ['定制', '灵活', '多规格'],
    industry: 'industrial',
  },
  {
    id: 4,
    name: '汽车连接器 A-300',
    category: '连接器',
    description: '汽车级连接器，满足汽车工业要求',
    image: '/images/product4.jpg',
    tags: ['汽车', 'IATF16949', '耐用'],
    industry: 'automotive',
  },
  {
    id: 5,
    name: '医疗连接器 M-100',
    category: '连接器',
    description: '医疗设备专用连接器，安全可靠',
    image: '/images/product5.jpg',
    tags: ['医疗', '安全', '无菌'],
    industry: 'medical',
  },
  {
    id: 6,
    name: '国防连接器 D-200',
    category: '连接器',
    description: '军用级连接器，满足国防工业标准',
    image: '/images/product6.jpg',
    tags: ['国防', '军用', '高可靠'],
    industry: 'defense',
  },
]);

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    let match = true;
    if (filters.value.category && !product.category.includes(filters.value.category)) {
      match = false;
    }
    if (filters.value.industry && product.industry !== filters.value.industry) {
      match = false;
    }
    if (filters.value.keyword && !product.name.includes(filters.value.keyword)) {
      match = false;
    }
    return match;
  });
});

const viewDetail = (id) => {
  router.push(`/products/${id}`);
};

const handleFilterChange = () => {
  pagination.value.currentPage = 1;
};

const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
};

const handleCurrentChange = (page) => {
  pagination.value.currentPage = page;
};
</script>

<style lang="scss" scoped>
.products-page {
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

.filters-section {
  margin-bottom: 40px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.product-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    .product-overlay {
      opacity: 1;
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

    .product-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 86, 179, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }

  .product-info {
    padding: 20px;

    .product-category {
      display: inline-block;
      font-size: 12px;
      color: #909399;
      margin-bottom: 8px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #303133;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      font-size: 14px;
      color: #606266;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .el-tag {
        font-size: 12px;
      }
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
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

  .products-grid {
    grid-template-columns: 1fr;
  }

  .filters-section {
    .el-col {
      margin-bottom: 15px;
    }
  }
}
</style>
