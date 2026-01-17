import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router/index';
import other from '/@/utils/other';
import 'default-passive-events'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import i18n from '/@/locales/index';
import '/@/styles/theme.css';

const app = createApp(App);

// 导入通用自定义组件
import { ElementIcons, Pagination, DictTag,  SvgIcon } from '/@/components/index';
import { parseTime, parseDate, dateTimeStr, dateStr, timeStr } from '/@/utils/formatTime';

app.component('DictTag', DictTag);
app.component('Pagination', Pagination);
// 导入布局插件
app.component('SvgIcon', SvgIcon);
// 全局方法挂载
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.parseDate = parseDate;
app.config.globalProperties.dateTimeStr = dateTimeStr;
app.config.globalProperties.dateStr = dateStr;
app.config.globalProperties.timeStr = timeStr;
app.config.globalProperties.baseURL = import.meta.env.VITE_API_URL;
// @ts-ignore
import globalComponent from '/@/components/register.ts'
//图标
import { Icon } from '@iconify/vue'

other.elSvg(app);
app
	.use(pinia) // pinia 存储
	.use(router) // 路由
	.use(ElementPlus) // ElementPlus 全局引入
	.use(i18n) // i18n 国际化
	.use(ElementIcons) // elementIcons 图标全局引入
	.use(globalComponent)
	.mount('#app');
app.component('iconify', Icon)
