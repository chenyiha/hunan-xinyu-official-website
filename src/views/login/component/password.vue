<template>
	<el-form
		size="large"
		class="login-content-form"
		ref="loginFormRef"
		:rules="loginRules"
		:model="state.ruleForm"
		@keyup.enter="onSignIn"
		label-width="0"
	>
		<!--账号-->
		<el-form-item class="login-animation2" prop="username">
			<el-input text placeholder="请输入账号" v-model="state.ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon">
						<ele-User />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>

		<!--密码-->
		<el-form-item class="login-animation2" prop="password">
			<el-input :type="state.isShowPassword ? 'text' : 'password'" placeholder="请输入密码" v-model="state.ruleForm.password" autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon">
						<ele-Unlock />
					</el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2" prop="code" v-if="verifyEnable">
			<div class="fr-ac-jb" style="width: 100%; margin-bottom: 5px">
				<div>
					<el-input text maxlength="4" placeholder="请输入验证码" v-model="state.ruleForm.code" clearable autocomplete="off">
						<template #prefix>
							<el-icon class="el-input__icon">
								<ele-Position />
							</el-icon>
						</template>
					</el-input>
				</div>
				<el-image :src="imgSrc" @click="getVerifyCode" />
			</div>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue';
import { generateUUID } from '/@/utils/other';
import { useUserInfo } from '/@/stores/userInfo';
import { LOGIN_USER_TYPE } from '/@/constants/loginTypeConstant';

//=========================== 定义变量内容=====================
const props = defineProps({
	//租户
	tenantId: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['signInSuccess']); // 声明事件名称
const loginFormRef = ref(); // 定义LoginForm表单引用
const loading = ref(false); // 定义是否正在登录中
const state = reactive({
	isShowPassword: false, // 是否显示密码
	ruleForm: {
		// 表单数据
		username: '', // 用户名
		password: '', // 密码
		code: '', // 验证码
		randomStr: '', // 验证码随机数
		tenantId: '', //多租用户
		userType: LOGIN_USER_TYPE.BACK,
	},
	remember: false,
});

const loginRules = reactive({
	username: [{ required: true, trigger: 'blur', message: '请输入账号' }], // 用户名校验规则
	password: [{ required: true, trigger: 'blur', message: '请输入密码' }], // 密码校验规则
	code: [{ required: true, trigger: 'blur', message: '请输入验证码' }], // 验证码校验规则
});
// 是否开启验证码
const verifyEnable = ref(import.meta.env.VITE_VERIFY_ENABLE === 'true');
const imgSrc = ref('');

//============================方法===========================
//获取验证码图片
const getVerifyCode = () => {
	state.ruleForm.randomStr = generateUUID();
	imgSrc.value = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_IS_MICRO == 'false' ? '/admin' : '/auth'}/code/image?randomStr=${state.ruleForm.randomStr}`;
};

// 账号密码登录
const onSignIn = async () => {
	await loginFormRef.value.validate();
	loading.value = true; // 正在登录中
	try {
		state.ruleForm.tenantId = props.tenantId;
		await useUserInfo().login(state.ruleForm); // 调用登录方法
		emit('signInSuccess'); // 触发事件
	}finally {
		getVerifyCode();
		loading.value = false; // 登录结束
	}
};

//============================调用方法===========================

getVerifyCode();

// 暴露变量
defineExpose({
	onSignIn,
});
</script>

<style lang="scss" scoped>
.login-animation2 {
	margin-bottom: 18px;
	height: 35px;
}
</style>
