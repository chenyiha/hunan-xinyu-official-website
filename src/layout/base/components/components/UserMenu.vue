<template>
	<div class="user-dropdown" ref="dropdownRef">
		<div class="dropdown-trigger" @click="toggleDropdown">
			<div class="user-avatar">
				<img v-if="userData.avatar" :src="userData.avatar" alt="avatar" />
				<span v-else>{{ userInitials }}</span>
			</div>
		</div>

		<transition name="dropdown-fade">
			<div v-if="isOpen" class="dropdown-content" @mouseleave="closeDropdown">
				<!-- 用户信息区域 -->
				<div class="user-header">
					<div class="header-avatar">
						<img v-if="userData.avatar" :src="userData.avatar" alt="avatar" />
						<span v-else>{{ userInitials }}</span>
					</div>
					<div class="header-info">
						<div class="user-name">{{ userName }}</div>
						<div class="user-email">{{ userEmail }}</div>
					</div>
				</div>

				<div class="divider"></div>

				<!-- 菜单项 -->
				<div class="menu-section">
					<div
						v-for="item in menuItems"
						:key="item.id"
						class="menu-item"
						@click="handleItemClick(item)"
						:class="{ 'menu-item-danger': item.action === 'logout' }"
					>
						<i :class="['item-icon', item.icon]"></i>
						<span class="item-text">{{ item.label }}</span>
						<span v-if="item.badge" class="item-badge">{{ item.badge }}</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

//===============================================================================================
const props = defineProps({
	userData: {
		type: Object,
		default: () => ({
			name: '张三',
			email: 'zhangsan@example.com',
			avatar: '',
			role: '管理员',
		}),
	},
	menuItems: {
		type: Array,
		default: () => [
			{ id: 1, label: '个人中心', icon: 'icon-user', action: 'profile' },
			{ id: 2, label: '账户设置', icon: 'icon-settings', action: 'settings' },
			{ id: 3, label: '消息通知', icon: 'icon-bell', action: 'notifications', badge: 3 },
			{ id: 4, label: '我的收藏', icon: 'icon-star', action: 'favorites' },
			{ id: 5, label: '退出登录', icon: 'icon-logout', action: 'logout' },
		],
	},
});

const emit = defineEmits(['menu-item-click', 'dropdown-toggle']);

const isOpen = ref(false);
const dropdownRef = ref(null);

const userName = computed(() => props.userData.name);
const userEmail = computed(() => props.userData.email);
const userInitials = computed(() => {
	return props.userData.name.split('').slice(0, 2).join('').toUpperCase();
});

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
	emit('dropdown-toggle', isOpen.value);
};

const closeDropdown = () => {
	isOpen.value = false;
	emit('dropdown-toggle', false);
};

const handleItemClick = (item) => {
	emit('menu-item-click', item.action);
	closeDropdown();
};

const handleClickOutside = (event) => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
		closeDropdown();
	}
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
.user-dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-trigger {
	cursor: pointer;
	padding: 8px;
	border-radius: 50%;
	transition: background-color 0.2s ease;
}

.dropdown-trigger:hover {
	background-color: #f5f5f5;
}

.user-avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 600;
	font-size: 14px;
	border: 2px solid #fff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

.dropdown-content {
	position: absolute;
	top: 100%;
	right: 0;
	width: 280px;
	background: white;
	border-radius: 6px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	margin-top: 8px;
	overflow: hidden;
	z-index: 1000;
	border: 1px solid #e0e0e0;
}

.user-header {
	display: flex;
	align-items: center;
	padding: 20px;
	background: white;
}

.header-avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 600;
	font-size: 16px;
	margin-right: 15px;
	flex-shrink: 0;
}

.header-avatar img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

.header-info {
	flex: 1;
	min-width: 0;
}

.user-name {
	font-size: 16px;
	font-weight: 600;
	color: #333;
	margin-bottom: 4px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.user-email {
	font-size: 13px;
	color: #666;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.divider {
	height: 1px;
	background: #f0f0f0;
	margin: 0;
}

.menu-section {
	padding: 8px 0;

	.menu-item {
		height: 46px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.menu-item:hover {
		background-color: #f8f9fa;
	}

	.item-icon {
		width: 20px;
		height: 20px;
		margin-right: 12px;
		color: #666;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-text {
		color: #333;
		font-size: 14px;
		font-weight: 500;
	}

	.item-badge {
		background: #ff4757;
		color: white;
		padding: 2px 8px;
		border-radius: 10px;
		font-size: 12px;
		font-weight: 500;
		min-width: 20px;
		text-align: center;
		margin-left: 10px;
	}

	.menu-item-danger .item-icon,
	.menu-item-danger .item-text {
		color: #ff4757;
	}

	.menu-item-danger:hover {
		background-color: #fff5f5;
	}

	/* 动画效果 */
	.dropdown-fade-enter-active,
	.dropdown-fade-leave-active {
		transition: all 0.3s ease;
	}

	.dropdown-fade-enter-from,
	.dropdown-fade-leave-to {
		opacity: 0;
		transform: translateY(-10px);
	}

	/* 图标样式 */
	.icon-user::before {
		content: '👤';
	}

	.icon-settings::before {
		content: '⚙️';
	}

	.icon-bell::before {
		content: '🔔';
	}

	.icon-star::before {
		content: '⭐';
	}

	.icon-logout::before {
		content: '🚪';
	}
}
</style>
