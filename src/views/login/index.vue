<template>
	<base-layout>
		<!--登入页面-->
		<div class="login-area">
			<div class="login-form">
				<div class="login-title" v-if="loginType == '0'">登入</div>
				<div class="login-title" v-if="loginType == '1'">邮箱登入</div>
				<div class="login-title" v-if="loginType == '2'">手机登入</div>

				<div class="login-wrap">
					<!--租户-->
					<div v-if="enableTenant">
						<el-select v-model="tenantId" placeholder="请选择租户" size="large">
							<el-option v-for="item in tenantList" :key="item.id" :label="item.companyName" :value="item.id"></el-option>
							<template #prefix>
								<svg-icon name="local-tenant" color="#c9cbcf"></svg-icon>
							</template>
						</el-select>
					</div>

					<!--账号密码-->
					<LoginPassword
						ref="passwordRef"
						@signInSuccess="signInSuccess"
						v-if="loginType == '0'"
						:tenant-id="tenantId"
						@loginFail="loginLoading = false"
					>
					</LoginPassword>

					<!--邮箱登入-->
					<LoginEmail
						ref="passwordRef"
						@signInSuccess="signInSuccess"
						v-if="loginType == '1'"
						:tenant-id="tenantId"
						@loginFail="loginLoading = false"
					>
					</LoginEmail>
					<!--手机登入-->
					<LoginMobile
						ref="passwordRef"
						@signInSuccess="signInSuccess"
						v-if="loginType == '2'"
						:tenant-id="tenantId"
						@loginFail="loginLoading = false"
					>
					</LoginMobile>

					<!--          <div class="fr-ac-jb password-register">-->
					<!--            <div>-->
					<!--              <div v-if="enableRegister" @click="skipRegister">我要注册</div>-->
					<!--            </div>-->
					<!--            <div>忘记密码</div>-->
					<!--          </div>-->

					<div>
						<el-button type="primary" class="login-btn" @click="onLogin" :loading="loginLoading">登入</el-button>
					</div>

					<!-- 更多登入 -->
					<div class="login-more">
						<el-button @click="loginType = 0" style="width: 100%" :disabled="loginType == 0">密码登入</el-button>
						<el-button @click="loginType = 1" style="width: 100%" :disabled="loginType == 1">邮箱登入</el-button>
<!--						<el-button @click="loginType = 2" style="width: 100%" :disabled="loginType == 2">手机登入</el-button>-->
					</div>
				</div>
			</div>
		</div>
	</base-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from '/@/hooks/tool/index';
import { Local } from '/@/utils/storage';
import { getAll as getAllTenant } from '/@/api/admin/tenant';
import { isEmpty } from '/@/utils/baseUtil';
//组件
import BaseLayout from '/@/layout/base/index.vue';
import LoginPassword from './component/password.vue';
import LoginEmail from './component/email.vue';
import LoginMobile from './component/mobile.vue';
import { useUserInfo } from '@/stores/userInfo';

//=====================================================================数据
const passwordRef = ref();
const loginType = ref(0);
const tenantList = ref([]);
const tenantId = ref('');
//是否启动租户
const enableTenant = ref(import.meta.env.VITE_TENANT_ENABLE == 'true');
//是否启动注册
const enableRegister = ref(import.meta.env.VITE_REGISTER_ENABLE == 'true');
//登入加载中
const loginLoading = ref(false);
//store 用户给
const useInfoStore = useUserInfo();
const router = useRouter();
//=====================================================================方法
//请求登入
const onLogin = async () => {
	try {
		loginLoading.value = true;
		await passwordRef.value.onSignIn(tenantId.value);
	} catch (error) {
		loginLoading.value = false;
	}
};

// 登录成功后的跳转处理事件
const signInSuccess = async () => {
	useInfoStore.setUserInfos();
	loginLoading.value = false;
	router.push('/');
	Local.setTenantId(tenantId.value);
	// 登录成功提示
	useMessage().success('成功登入');
};

//初始化
const init = async () => {
	const { data } = await getAllTenant();
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

//跳转到注册页面
const skipRegister = () => {
	router.push('/register');
};

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
		width: 390px;
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
	//line-height: 40px;
	//min-height: 40px;
	margin-bottom: 18px;
}
</style>
