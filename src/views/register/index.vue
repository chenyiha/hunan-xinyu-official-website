<template>
  <base-layout>
    <!--登入页面-->
    <div class="login-area">
      <div class="login-form">
        <div class="login-title">注册</div>

        <div class="login-wrap">
          <!--租户-->
          <div v-if="enableTenant">
            <el-form-item class="login-animation2" prop="username" label="租户">
              <el-select v-model="tenantId" placeholder="请选择租户" size="large">
                <el-option v-for="item in tenantList" :key="item.id" :label="item.companyName"
                           :value="item.id"></el-option>
                <template #prefix>
                  <svg-icon name="local-tenant" color="#c9cbcf"></svg-icon>
                </template>
              </el-select>
            </el-form-item>
          </div>

          <!--注册用户-->
          <RegisterForm
              ref="registerFormRef"
              @success="registerSuccess"
              :tenant-id="tenantId"
          >
          </RegisterForm>

          <div class="fr-ac-jb password-register">
            <div @click="skipToLogin">
              我要登入
            </div>
            <div>忘记密码</div>
          </div>

          <!--按钮-->
          <div>
            <el-button type="primary" class="login-btn" @click="onRegister" :loading="loading">注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {Local} from '/@/utils/storage';
import {getAll as getAllTenant} from '/@/api/admin/tenant';
import {isEmpty} from '/@/utils/baseUtil';
import BaseLayout from '/@/layout/base/index.vue';
//组件
import RegisterForm from './component/RegisterForm.vue';

const registerFormRef = ref();

//========================================================================================数据
const router = useRouter();
const tenantList = ref([]);
const tenantId = ref('');
//是否启动租户
const enableTenant = ref(import.meta.env.VITE_TENANT_ENABLE == 'true');
//登入加载中
const loading = ref(false);

//===============================================================================================方法
//请求登入
const onRegister = () => {
  try {
    loading.value = true;
    registerFormRef.value.handleRegister();
  } finally {
    loading.value = false;
  }
};

// 登录成功后的跳转处理事件
const registerSuccess = async () => {
  // useInfoStore.setUserInfos();
  // loading.value = false;
  // router.push('/');
  // Local.setTenantId(tenantId.value);
  // // 登录成功提示
  // useMessage().success('成功登入');
};

//初始化
const init = async () => {
  const {data} = await getAllTenant();
  tenantList.value = data;
  //选择租户
  let tenantIdStorage = Local.getTenantId();
  if (isEmpty(tenantIdStorage)) {
    Local.setTenantId(import.meta.env.VITE_DEFAULT_TENANT_ID);
    tenantId.value = import.meta.env.VITE_DEFAULT_TENANT_ID;
  } else {
    tenantId.value = tenantIdStorage;
  }
};

//跳转到登入
const skipToLogin = () => {
  router.push('/login');
}

//===============================================================================================调用方法
init();
</script>

<style lang="scss" scoped>
.login-area {
  width: 100%;
  height: 100%;
  background: url('/@/assets/image/loadbg.jpg') no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.login-form {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);

  .login-title {
    line-height: 70px;
    font-size: 28px;
    color: #5a94b9;
    text-align: center;
  }

  .login-wrap {
    width: 380px;
    padding: 40px 40px 40px 40px;
    background: #ffffff;
    box-shadow: 1px 1px 10px 1px #ccc;
    border-radius: 6px;

    .password-register {
      font-size: 14px;
      line-height: 30px;
      cursor: pointer;
      color: #606266;
    }

    .login-btn {
      width: 100%;
      margin: 6px 0px 12px 0px;
      height: 35px;
    }

    .login-more {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

/* 或者使用 :deep() */
:deep(.el-select__wrapper) {
  margin-bottom: 18px;
}
</style>
