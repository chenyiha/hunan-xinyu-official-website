<template>
  <div class="about-page">
    <div class="page-header">
      <h1>{{ $t('about.profile') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.about') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('about.profile') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <section class="about-intro">
        <h2>公司简介</h2>
        <p>湖南华峰新宇电子有限公司是原电子工业部直属的电子接插件三线军工企业，1970年建厂，代号855厂，位于湖南省怀化市高新技术产业开发区。</p>
        <p>公司主要从事电连接器、开关和军用装备部件的研制生产，有近50年电连接器和开关的研制开发、模具设计与制造的经验。产品广泛应用于航天、航空、兵器、船舶、通讯、医疗、家电、电子、计算机等领域，具有使用范围广、用量大、品种规格多等特点。多年来为我国的军工事业以及民用电器发展做出重大贡献，先后成功开发了"神舟"飞船系列配套产品、替代进口的军用电磁断路器系列产品、行程开关系列产品、军用电缆组件系列产品及模拟训练保障设备等。</p>
        <p>公司通过了ISO9001质量管理体系认证和GJB9001C质量管理体系认证，拥有印制电路连接器、圆形电路连接器两条贯军标生产线，为国家级高新技术企业。目前拥有专利14项，其中发明专利3项，实用新型设计11项。</p>
        <p>公司所处位置交通发达，有沪昆高铁，湘黔、枝柳、渝怀铁路，上瑞、包茂、沪昆、娄怀、杭瑞高速公路等，怀化芷江机场可直飞北京、上海、广州、昆明、成都、西安、长沙，能及时给客户提供优质快捷的服务。</p>
      </section>

      <section class="core-values">
        <h2>核心优势</h2>
        <div class="values-grid">
          <div class="value-card">
            <el-icon :size="50" color="#0056b3"><CircleCheck /></el-icon>
            <h3>质量保证</h3>
            <p>通过ISO9001和GJB9001C质量管理体系认证，拥有两条贯军标生产线</p>
          </div>
          <div class="value-card">
            <el-icon :size="50" color="#0056b3"><Star /></el-icon>
            <h3>技术创新</h3>
            <p>拥有14项专利（3项发明专利、11项实用新型），成功开发"神舟"飞船等高端产品</p>
          </div>
          <div class="value-card">
            <el-icon :size="50" color="#0056b3"><Medal /></el-icon>
            <h3>行业经验</h3>
            <p>近50年电连接器和开关研制开发经验，原电子工业部直属军工企业</p>
          </div>
          <div class="value-card">
            <el-icon :size="50" color="#0056b3"><Tools /></el-icon>
            <h3>服务能力</h3>
            <p>交通发达便捷，产品应用于航天、航空、兵器等多个重要领域，提供优质快捷服务</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup name="AboutProfile">
import { CircleCheck, Star, Medal, Tools } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.about-page {
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

.about-intro {
  margin-bottom: 60px;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #303133;
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    color: #606266;
    margin-bottom: 16px;
  }
}

.core-values {
  h2 {
    font-size: 28px;
    margin-bottom: 30px;
    color: #303133;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .value-card {
    text-align: center;
    padding: 40px 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      font-size: 20px;
      margin: 20px 0 10px;
      color: #303133;
    }

    p {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
    }
  }
}

@media (max-width: 1024px) {
  .values-grid {
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

  .about-intro h2,
  .core-values h2 {
    font-size: 24px;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
