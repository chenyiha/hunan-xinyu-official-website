import { defineStore } from 'pinia';

export const useMyTenant = defineStore('tenant', {
    state: () => ({
        tenantId: "",
        companyName:""
    }),
    actions: {
        /**
         *  设置租户信息
         * @param tenantId 租户组件
         * @param companyName 公司名称
         */
        setTenantIdInfo(tenantId: string,companyName:string) {
            this.tenantId = tenantId;
            this.companyName = companyName;
        },

    },
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [
            {
                // @ts-ignore
                key:  `${__NEXT_NAME__}:tenant`,
                storage: localStorage // 默认是sessionStorage
            }
        ],
    }
});
