import {createRouter, createWebHashHistory} from 'vue-router';
import 'nprogress/nprogress.css';
import routerConstant from "/@/constants/routerConstant";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: Object.values(routerConstant),
});

// 导出路由
export default router;
