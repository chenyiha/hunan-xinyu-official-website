<template>
  <el-form
      size="large"
      class="login-content-form"
      ref="formRef"
      :rules="loginRules"
      :model="form"
      @keyup.enter="handleRegister"
  >
    <!--账号-->
    <el-form-item class="login-animation2" prop="username" label="账号">
      <el-input text placeholder="请输入账号" v-model="form.username" clearable>
        <template #prefix>
          <el-icon class="el-input__icon">
            <ele-User/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!--手机号-->
    <el-form-item class="login-animation2" prop="username" label="手机号">
      <el-input text placeholder="请输入手机号" v-model="form.phone" clearable>
        <template #prefix>
          <el-icon class="el-input__icon">
            <ele-User/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!--密码-->
    <el-form-item class="login-animation2" prop="password" label="密码">
      <el-input type="password'" placeholder="请输入密码"
                v-model="form.password" clearable>
        <template #prefix>
          <el-icon class="el-input__icon">
            <ele-Unlock/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!--密码-->
    <el-form-item class="login-animation2" prop="password" label="确认密码">
      <el-input type="password'" placeholder="请再次输入密码"
                v-model="form.twoPassword" clearable>
        <template #prefix>
          <el-icon class="el-input__icon">
            <ele-Unlock/>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!--验证码-->
    <el-form-item class="login-animation2" prop="code">
      <div class="fr-ac-jb" style="width: 100%; margin-bottom: 5px">
        <div>
          <el-input text maxlength="4" placeholder="请输入验证码" v-model="form.code" clearable>
            <template #prefix>
              <el-icon class="el-input__icon">
                <ele-Position/>
              </el-icon>
            </template>
          </el-input>
        </div>
        <el-image :src="imgSrc" @click="getVerifyCode"/>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {defineEmits, reactive, ref} from 'vue';
import {generateUUID} from '/@/utils/other';
import {registerUser} from "/@/api/admin/register";
import {useMessage} from "/@/hooks/tool";

const emit = defineEmits(['success']); // 声明事件名称
//============================================================================定义变量内容
const props = defineProps({
  //租户
  tenantId: {
    type: String,
    default: '',
  },
});

//表单
const form = ref({})
const formRef = ref(); // 定义LoginForm表单引用
const loginRules = reactive({
  username: [{required: true, trigger: 'blur', message: '请输入账号'}], // 用户名校验规则
  password: [{required: true, trigger: 'blur', message: '请输入密码'}], // 密码校验规则
  code: [{required: true, trigger: 'blur', message: '请输入验证码'}], // 验证码校验规则
});

// 是否开启验证码
const imgSrc = ref('');

//============================方法===========================
//获取验证码图片
const getVerifyCode = () => {
  imgSrc.value = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_IS_MICRO == 'false' ? '/admin' : '/auth'}/code/image?randomStr=${generateUUID()}`;
};

// 注册账号
const handleRegister = async () => {
  await formRef.value.validate();
  try {
    form.value.tenantId = props.tenantId;
    await registerUser(form.value);
    useMessage().success("注册成功");
    form.value = {};
  } finally {
    getVerifyCode();
  }
};

//=======================================================================调用方法
getVerifyCode();

//======================================================================暴露变量
// 暴露变量
defineExpose({
  handleRegister,
});
</script>

<style lang="scss" scoped>
.login-animation2 {
  margin-bottom: 18px;
  height: 35px;
}
</style>
