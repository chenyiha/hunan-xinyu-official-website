<template>
  <div class="partner-page">
    <div class="page-header">
      <h1>{{ $t('contact.partner') }}</h1>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('nav.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contact' }">{{ $t('nav.contact') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('contact.partner') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content-container">
      <el-card>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
          <el-divider>公司信息</el-divider>
          <el-form-item label="公司名称" prop="company">
            <el-input v-model="form.company" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="industry">
            <el-select v-model="form.industry" placeholder="请选择所属行业" style="width: 100%">
              <el-option label="航空航天" value="aerospace"></el-option>
              <el-option label="国防军工" value="defense"></el-option>
              <el-option label="轨道交通" value="rail"></el-option>
              <el-option label="工业自动化" value="industrial"></el-option>
              <el-option label="汽车" value="automotive"></el-option>
              <el-option label="医疗" value="medical"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择合作类型" style="width: 100%">
              <el-option label="经销商" value="distributor"></el-option>
              <el-option label="代理商" value="agent"></el-option>
              <el-option label="系统集成商" value="integrator"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>

          <el-divider>联系人信息</el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位" prop="position">
                <el-input v-model="form.position" placeholder="请输入职位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入公司地址"></el-input>
          </el-form-item>

          <el-divider>合作意向</el-divider>
          <el-form-item label="合作意向" prop="message">
            <el-input type="textarea" v-model="form.message" rows="6" placeholder="请描述您的合作意向和需求"></el-input>
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

<script setup name="ContactPartner">
import { ref } from 'vue';

const formRef = ref();

const form = ref({
  company: '',
  industry: '',
  type: '',
  name: '',
  position: '',
  email: '',
  phone: '',
  address: '',
  message: '',
});

const rules = {
  company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  industry: [{ required: true, message: '请选择所属行业', trigger: 'change' }],
  type: [{ required: true, message: '请选择合作类型', trigger: 'change' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  message: [{ required: true, message: '请描述合作意向', trigger: 'blur' }],
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
.partner-page {
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
