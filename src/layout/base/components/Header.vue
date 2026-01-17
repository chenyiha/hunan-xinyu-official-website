<template>
  <div>
    <div class="website-header" id="header">
      <!-- Logo -->
      <div class="logo" @click="handleLogoClick">
        <img src="/@/assets/icons/app.svg" alt="Logo" class="logo-img" />
        <span class="logo-text">{{ $t('nav.home') }}</span>
      </div>

      <!-- Desktop Navigation Menu -->
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        :ellipsis="false"
        class="nav-menu desktop-menu"
        @select="handleSelect"
      >
        <el-menu-item index="/">{{ $t('nav.home') }}</el-menu-item>
        <el-sub-menu index="about">
          <template #title>{{ $t('nav.about') }}</template>
          <el-menu-item index="/about/profile">{{ $t('about.profile') }}</el-menu-item>
          <el-menu-item index="/about/history">{{ $t('about.history') }}</el-menu-item>
          <el-menu-item index="/about/mission">{{ $t('about.mission') }}</el-menu-item>
          <el-menu-item index="/about/certification">{{ $t('about.certification') }}</el-menu-item>
          <el-menu-item index="/about/quality">{{ $t('about.quality') }}</el-menu-item>
          <el-menu-item index="/about/manufacturing">{{ $t('about.manufacturing') }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/products">{{ $t('nav.products') }}</el-menu-item>
        <el-menu-item index="/solutions">{{ $t('nav.solutions') }}</el-menu-item>
        <el-menu-item index="/tech">{{ $t('nav.tech') }}</el-menu-item>
        <el-menu-item index="/news">{{ $t('nav.news') }}</el-menu-item>
        <el-menu-item index="/contact">{{ $t('nav.contact') }}</el-menu-item>
      </el-menu>

      <!-- Mobile Menu Toggle -->
      <div class="header-actions">
        <div class="language-switcher">
          <el-dropdown @command="handleLanguageChange">
            <span class="language-btn">
              {{ currentLanguage }}
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
                <el-dropdown-item command="en-US">English</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-icon class="mobile-menu-toggle" @click="toggleMobileMenu">
          <component :is="mobileMenuOpen ? iconComponents.Close : iconComponents.Menu" />
        </el-icon>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <el-drawer v-model="mobileMenuOpen" direction="rtl" size="70%" class="mobile-drawer">
      <div class="mobile-menu-content">
        <el-menu :default-active="activeMenu" @select="handleMobileMenuSelect">
          <el-menu-item index="/">{{ $t('nav.home') }}</el-menu-item>
          <el-sub-menu index="about">
            <template #title>{{ $t('nav.about') }}</template>
            <el-menu-item index="/about/profile">{{ $t('about.profile') }}</el-menu-item>
            <el-menu-item index="/about/history">{{ $t('about.history') }}</el-menu-item>
            <el-menu-item index="/about/mission">{{ $t('about.mission') }}</el-menu-item>
            <el-menu-item index="/about/certification">{{ $t('about.certification') }}</el-menu-item>
            <el-menu-item index="/about/quality">{{ $t('about.quality') }}</el-menu-item>
            <el-menu-item index="/about/manufacturing">{{ $t('about.manufacturing') }}</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/products">{{ $t('nav.products') }}</el-menu-item>
          <el-menu-item index="/solutions">{{ $t('nav.solutions') }}</el-menu-item>
          <el-menu-item index="/tech">{{ $t('nav.tech') }}</el-menu-item>
          <el-menu-item index="/news">{{ $t('nav.news') }}</el-menu-item>
          <el-menu-item index="/contact">{{ $t('nav.contact') }}</el-menu-item>
        </el-menu>
      </div>
    </el-drawer>

    <!-- Spacer -->
    <div style="height: 60px"></div>
  </div>
</template>

<script setup name="WebsiteHeader">
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { ArrowDown, Menu, Close } from '@element-plus/icons-vue';

const { locale, t } = useI18n();
const router = useRouter();
const route = useRoute();

const activeMenu = ref(route.path);
const currentLanguage = computed(() => locale.value === 'zh-CN' ? '中文' : 'English');
const mobileMenuOpen = ref(false);

// 动态组件映射
const iconComponents = {
  Menu,
  Close
};

watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath;
  }
);

const handleSelect = (index) => {
  router.push(index);
};

const handleMobileMenuSelect = (index) => {
  mobileMenuOpen.value = false;
  router.push(index);
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleLogoClick = () => {
  router.push('/');
};

const handleLanguageChange = (lang) => {
  locale.value = lang;
  localStorage.setItem('language', lang);
};

onMounted(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    locale.value = savedLanguage;
  }
});
</script>

<style lang="scss" scoped>
.website-header {
  width: 100vw;
  height: 60px;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    min-width: 150px;

    .logo-img {
      height: 40px;
      width: 40px;
    }

    .logo-text {
      font-size: 20px;
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }

  .nav-menu {
    flex: 1;
    border-bottom: none;
    display: flex;
    justify-content: center;

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 60px;
      line-height: 60px;
      font-size: 15px;
      color: #606266;
      transition: all 0.3s;

      &:hover {
        color: var(--el-color-primary);
        background-color: #f5f7fa;
      }
    }

    :deep(.el-menu-item.is-active) {
      color: var(--el-color-primary);
      border-bottom-color: var(--el-color-primary);
      font-weight: 500;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .language-switcher {
    min-width: 100px;
    display: flex;
    justify-content: flex-end;

    .language-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-size: 14px;
      color: #606266;
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        color: var(--el-color-primary);
        background-color: #f5f7fa;
      }
    }
  }

  .mobile-menu-toggle {
    display: none;
    font-size: 24px;
    cursor: pointer;
    color: #606266;
    transition: all 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .desktop-menu {
    display: flex;
  }
}

.mobile-drawer {
  :deep(.el-drawer__body) {
    padding: 0;
  }

  .mobile-menu-content {
    padding: 20px 0;

    .el-menu {
      border-right: none;

      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
      }

      :deep(.el-sub-menu .el-menu-item) {
        padding-left: 40px;
        font-size: 15px;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .website-header {
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .website-header {
    padding: 0 15px;

    .logo {
      min-width: auto;

      .logo-text {
        font-size: 18px;
      }
    }

    .language-switcher {
      min-width: auto;

      .language-btn {
        padding: 6px 12px;
        font-size: 13px;
      }
    }
  }
}

@media (max-width: 768px) {
  .website-header {
    padding: 0 12px;

    .logo {
      .logo-img {
        height: 32px;
        width: 32px;
      }

      .logo-text {
        font-size: 16px;
      }
    }

    .desktop-menu {
      display: none;
    }

    .mobile-menu-toggle {
      display: flex;
      align-items: center;
    }

    .language-switcher {
      .language-btn {
        padding: 6px 10px;
      }
    }
  }
}

@media (max-width: 480px) {
  .website-header {
    padding: 0 10px;

    .logo {
      gap: 8px;

      .logo-img {
        height: 28px;
        width: 28px;
      }

      .logo-text {
        font-size: 14px;
      }
    }

    .mobile-menu-toggle {
      font-size: 22px;
    }

    .language-switcher {
      .language-btn {
        padding: 5px 8px;
        font-size: 12px;
      }
    }
  }
}
</style>
