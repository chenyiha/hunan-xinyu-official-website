<template>
	<div class="info">
		<el-scrollbar height="80vh">
			<div class="title">基本信息</div>
			<div class="form">
				<div class="form-item">
					<div class="item-left">用户头像</div>
					<div class="item-right">
						<el-avatar :size="50" />
					</div>
				</div>

				<div class="form-item">
					<div class="item-left">账号</div>
					<div class="item-right">
						<el-input v-model="userStore.userInfos.username" style="width: 500px; height: 40px" placeholder="请输入用户账号" />
					</div>
				</div>

				<div class="form-item">
					<div class="item-left">昵称</div>
					<div class="item-right">
						<el-input v-model="userStore.userInfos.username" style="width: 500px; height: 40px" placeholder="请输入用户账号" />
					</div>
				</div>

				<div class="form-item">
					<div class="item-left">用户性别</div>
					<div class="item-right">
						<el-select v-model="form.sex" style="width: 500px" size="large"  >
							<el-option label="男" value="1" key="1" />
							<el-option label="女" value="2" key="2" />
						</el-select>
					</div>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserInfo } from '/@/stores/userInfo';

const userStore = useUserInfo();
const form = ref({
	sex: '1',
});
</script>

<style scoped lang="scss">
.info {
	font-size: 14px;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.title {
	height: 48px;
	line-height: 48px;
	font-size: 20px;
	color: #2e2e2e;
	border-bottom: 1px solid #f0f0f2;
	padding: 5px 20px;
}

.form {
	.form-item {
		height: 70px;
		color: #555666;
		display: flex;
		align-items: center;
		padding: 0px 20px;
		font-size: 16px;

		.item-left {
			width: 120px;
			text-align: right;
			margin-right: 25px;
		}

		.item-right {
			display: flex;
			align-items: center;
			justify-content: center;
      position: relative;
		}
	}
}
</style>
