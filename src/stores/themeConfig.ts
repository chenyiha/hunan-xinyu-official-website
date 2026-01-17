import {defineStore} from 'pinia';

/**
 * 修改配置时：
 * 1、需要每次都清理 `window.localStorage` 浏览器永久缓存
 * 2、或者点击布局配置最底部 `一键恢复默认` 按钮即可看到效果
 */
export const useThemeConfig = defineStore('themeConfig', {
    state: (): ThemeConfigState => ({
        themeConfig: {
            "isDrawer": false,
            "primary": "#2E5CF6",
            "isIsDark": false,
            "topBar": "#ffffff",
            "topBarColor": "#606266",
            "isTopBarColorGradual": false,
            "menuBar": "#FFFFFF",
            "menuBarColor": "#505968",
            "menuBarActiveColor": "rgba(242, 243, 245, 1)",
            "isMenuBarColorGradual": false,
            "columnsMenuBar": "#000000",
            "columnsMenuBarColor": "#e6e6e6",
            "isColumnsMenuBarColorGradual": false,
            "isColumnsMenuHoverPreload": false,
            "isCollapse": false,
            "isUniqueOpened": false,
            "isFixedHeader": true,
            "isFixedHeaderChange": false,
            "isClassicSplitMenu": true,
            "isLockScreen": false,
            "lockScreenTime": 30,
            "isShowLogo": true,
            "isShowLogoChange": false,
            "isBreadcrumb": true,
            "isTagsview": true,
            "isBreadcrumbIcon": false,
            "isTagsviewIcon": true,
            "isCacheTagsView": true,
            "isSortableTagsView": true,
            "isShareTagsView": false,
            "isFooter": true,
            "isGrayscale": false,
            "isInvert": false,
            "isWartermark": false,
            "wartermarkText": "Pig",
            "tagsStyle": "tags-style-one",
            "animation": "slide-right",
            "columnsAsideStyle": "columns-card",
            "columnsAsideLayout": "columns-vertical",
            "layout": "classic",
            "isRequestRoutes": true,
            "globalTitle": "总公司",
            "globalViceTitle": "Pig 快速开发框架",
            "globalViceTitleMsg": "专注、免费、开源、维护、解疑",
            "globalI18n": "zh-cn",
            "globalComponentSize": "default",
            "footerAuthor": "©2024 pig4cloud.com"
        },

    }),
    actions: {
        /**
         * 设置主题配置
         * @param data 主题配置内容
         */
        setThemeConfig(data: ThemeConfigState) {
            this.themeConfig = data.themeConfig;
        },
        /**
         * 设置全部标题
         * @param title 全部标题
         */
        setGlobalTitle(title: string) {
            this.themeConfig.globalTitle = title || '';
        }
    },
});


