// @ts-nocheck

import { defineAsyncComponent } from "vue";

const registerList = [
    'FormSelect',
    'FormNumber',
    'FormRadio',
    'YesNo',
    'UploadExcel',
    'UploadFile',
    'UploadImg',
    'Popup',
    'LayoutCol',
    'DateSelect',
    'Editor',
    'ImagePreview',
    'DateSelect',
    'FormNumber',
    'DatePicker',
    'VideoPreview',
    'FoldTree',
    'FormCreate',
    //业务
    'GdMap',
    'StaffSelect',
]

const VueAutoRegister = {
    install: (app: any) => {
        // import.meta.glob是vite的新api
        const components = import.meta.glob("./**/**.vue");
        // 遍历组件模块实现自动注册
        for (const [path, component] of Object.entries(components)) {
            // 把文件名称当作组件注册的 name
            const componentName = path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
            if (!registerList.includes(componentName)) {
                continue
            }
            // 通过 defineAsyncComponent 异步导入指定路径下的组件
            app.component(componentName, defineAsyncComponent(component));
        }
    }
}
export default VueAutoRegister;
