<template>
  <div class="inquiry-page">
    <div class="page-header">
      <h1>{{ $t('contact.generalInquiry') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contact' }">{{ $t('nav.contact') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('contact.generalInquiry') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-card>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="form.company" placeholder="请输入公司名称（可选）"></el-input>
          </el-form-item>
          <el-form-item label="主题" prop="subject">
            <el-input v-model="form.subject" placeholder="请输入主题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="message">
            <el-input type="textarea" v-model="form.message" rows="6" placeholder="请输入问询内容"></el-input>
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

<script setup name="ContactInquiry">
import { ref } from 'vue';

const formRef = ref();

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
});

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  subject: [{ required: true, message: '请输入主题', trigger: 'blur' }],
  message: [{ required: true, message: '请输入问询内容', trigger: 'blur' }],
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
.inquiry-page {
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
