import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';

interface MessageImplements {
	info(title: string): void;
	warning(title: string): void;
	success(title: string): void;
	error(title: string): void;
}

export function useMessage() {
	class MessageClass implements MessageImplements {
		// 普通提示
		info(title: string): void {
			ElMessage.info(title);
		}

		// 警告提示
		warning(title: string): void {
			ElMessage.warning(title);
		}

		// 成功提示
		success(title: string): void {
			ElMessage.success(title);
		}

		// 错误提示
		error(title: string): void {
			ElMessage.error(title);
		}
	}

	return new MessageClass();
}
const load = ref();
export function useMessageBox() {
	class MessageBoxClass implements MessageImplements {
		// 普通提示
		info(msg: string): void {
			ElMessageBox.alert(msg);
		}

		// 警告提示
		warning(msg: string): void {
			ElMessageBox.alert(msg, { type: 'warning' });
		}

		// 成功提示
		success(msg: string): void {
			ElMessageBox.alert(msg, { type: 'success' });
		}

		// 错误提示
		error(msg: string): void {
			ElMessageBox.alert(msg, { type: 'error' });
		}

		// 确认窗体
		confirm(msg: string) {
			return ElMessageBox.confirm(msg, {
				confirmButtonText: '确定',
				cancelButtonText:'取消',
				type: 'warning',
			});
		}
		// 提交内容
		prompt(msg: string) {
			return ElMessageBox.prompt(msg, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			});
		}
		loading(msg: string = 'Loading') {
			load.value = ElLoading.service({
				lock: true,
				text: msg,
				background: 'rgba(0, 0, 0, 0.7)',
			})
		}
		closeLoading() {
			load.value.close()
		}
	}

	return new MessageBoxClass();
}
