<template>
	<el-form size="large" class="login-content-form" ref="loginFormRef" :rules="loginRules" :model="loginForm" @keyup.enter="onSignIn">
		<el-form-item class="login-animation2" prop="email">
			<el-input text placeholder="请输入邮箱" v-model="loginForm.email" clearable autocomplete="off">
				<template #prefix>
					<svg-icon name="local-email" color="#a8abb2" size="16"></svg-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2" prop="code">
			<div class="fr-ac-jb" style="width: 100%">
				<el-input
					text
					maxlength="6"
					v-model="loginForm.code"
					clearable
					autocomplete="off"
					placeholder="请输入验证码"
					style="width: 80%; margin-right: 20px"
				>
					<template #prefix>
						<el-icon class="el-input__icon">
							<ele-Position />
						</el-icon>
					</template>
				</el-input>

				<el-button @click="handleSendCode" :loading="msg.msgKey">{{ msg.msgText }}</el-button>
			</div>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { sendEmailCode } from '/@/api/admin/login';
import { useMessage } from '/@/hooks/tool/message';
import { useUserInfo } from '/@/stores/userInfo';
import { rule } from '/@/utils/validate';
import { LOGIN_USER_TYPE } from '/@/constants/loginTypeConstant';

//============================数据===========================
const props = defineProps({
	//租户
	tenantId: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['signInSuccess']);
const loginFormRef = ref();
const loading = ref(false);

// 定义响应式对象
const loginForm = reactive({
	email: '',
	code: '',
	tenantId: '',
	userType: LOGIN_USER_TYPE.BACK,
});

// 定义校验规则
const loginRules = reactive({
	email: [
		{ required: true, trigger: 'blur', validator: rule.email },
		{
			required: true,
			trigger: 'blur',
			message: '请输入邮箱',
		},
	],
	code: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入验证码',
		},
	],
});

/**
 * 处理发送验证码事件。
 */
const handleSendCode = async () => {
	msg.msgKey = true;
	await loginFormRef.value.validateField('email');
	loginForm.tenantId = props.tenantId;
	await sendEmailCode(loginForm.email);
	useMessage().success('验证码发送成功');
	msg.msgKey = false;
	timeCacl();
};

/**
 * 处理登录事件。
 */
const onSignIn = async () => {
	await loginFormRef.value.validate();
	loginForm.tenantId = props.tenantId;
	try {
		loading.value = true;
		await useUserInfo().loginByEmail(loginForm);
		emit('signInSuccess');
	} finally {
		loading.value = false;
	}
};

// 定义响应式对象
const msg = reactive({
	msgText: '发送',
	msgTime: 60,
	msgKey: false,
});

/**
 * 计算并更新倒计时。
 */
const timeCacl = () => {
	msg.msgText = `${msg.msgTime}秒后重发`;
	msg.msgKey = true;
	const time = setInterval(() => {
		msg.msgTime--;
		msg.msgText = `${msg.msgTime}秒后重发`;
		if (msg.msgTime === 0) {
			msg.msgTime = 60;
			msg.msgText = '';
			msg.msgKey = false;
			clearInterval(time);
		}
	}, 1000);
};

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
