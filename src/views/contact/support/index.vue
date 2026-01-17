<template>
  <div class="support-page">
    <div class="page-header">
      <h1>{{ $t('contact.techSupport') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contact' }">{{ $t('nav.contact') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('contact.techSupport') }}</el-breadcrumb-item>
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
          <el-form-item label="产品型号" prop="model">
            <el-input v-model="form.model" placeholder="请输入产品型号"></el-input>
          </el-form-item>
          <el-form-item label="问题类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择问题类型" style="width: 100%">
              <el-option label="产品使用问题" value="usage"></el-option>
              <el-option label="技术参数咨询" value="spec"></el-option>
              <el-option label="安装调试" value="install"></el-option>
              <el-option label="其他问题" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题描述" prop="message">
            <el-input type="textarea" v-model="form.message" rows="6" placeholder="请详细描述您遇到的问题"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              action="/api/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button type="primary">上传附件</el-button>
              <template #tip>
                <div class="el-upload__tip">支持上传图片、PDF等文件，单个文件不超过10MB</div>
              </template>
            </el-upload>
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

<script setup name="ContactSupport">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const formRef = ref();
const fileList = ref([]);

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  model: '',
  type: '',
  message: '',
});

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  model: [{ required: true, message: '请输入产品型号', trigger: 'blur' }],
  type: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  message: [{ required: true, message: '请描述问题', trigger: 'blur' }],
};

const handlePreview = (file) => {
  console.log(file);
};

const handleRemove = (file, fileList) => {
  console.log(file, fileList);
};

const beforeRemove = (file) => {
  return confirm(`确定移除 ${file.name}？`);
};

const handleExceed = (files, fileList) => {
  ElMessage.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件`);
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
.support-page {
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
