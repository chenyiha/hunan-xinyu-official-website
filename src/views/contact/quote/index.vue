<template>
  <div class="quote-page">
    <div class="page-header">
      <h1>{{ $t('contact.productQuote') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contact' }">{{ $t('nav.contact') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('contact.productQuote') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-card>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
          <el-divider>基本信息</el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称" prop="company">
                <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider>产品信息</el-divider>
          <el-form-item label="产品类别" prop="category">
            <el-select v-model="form.category" placeholder="请选择产品类别" style="width: 100%">
              <el-option label="连接器" value="connector"></el-option>
              <el-option label="电缆组件" value="cable"></el-option>
              <el-option label="解决方案" value="solution"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号" prop="model">
            <el-input v-model="form.model" placeholder="请输入产品型号"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="数量" prop="quantity">
                <el-input-number v-model="form.quantity" :min="1" style="width: 100%"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用场景" prop="application">
                <el-input v-model="form.application" placeholder="请输入应用场景"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider>其他信息</el-divider>
          <el-form-item label="详细需求" prop="message">
            <el-input type="textarea" v-model="form.message" rows="5" placeholder="请描述您的详细需求"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" size="large">
              {{ $t('contact.submit') }}
            </el-button>
            <el-button @click="resetForm" size="large">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup name="ContactQuote">
import { ref } from 'vue';

const formRef = ref();

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  category: '',
  model: '',
  quantity: 1,
  application: '',
  message: '',
});

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  category: [{ required: true, message: '请选择产品类别', trigger: 'change' }],
  model: [{ required: true, message: '请输入产品型号', trigger: 'blur' }],
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 实现表单提交逻辑
    }
  });
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style lang="scss" scoped>
.quote-page {
  padding: 40px 0 80px;
}

.page-header {
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 0 40px;

  h1 {
    font-size: 36px;
    margin-bottom: 16px;
    color: #303133;
  }
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .page-header,
  .content-container {
    padding: 0 20px;
  }

  .page-header h1 {
    font-size: 28px;
  }
}
</style>
