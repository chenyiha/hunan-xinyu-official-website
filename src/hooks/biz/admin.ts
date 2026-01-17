import { getAll as getAllContract } from '/@/api/admin/contract';
import { getAll as getAllTenant } from '/@/api/admin/tenant';


/**
 * 套餐
 */
export function useContract() {
	const allContract = ref([]);

	/**
	 * 获取全部的套餐
	 */
	async function getAllContractApi() {
		const { data } = await getAllContract();
		allContract.value = data;
	}

	getAllContractApi();

	return {
		allContract,
		getAllContractApi,
	};
}


/**
 * 租户
 */
export function useTenant() {

	const allTenant = ref([]);

	/**
	 * 获取全部的租户
	 */
	function getAllTenantApi() {
		return new Promise((resolve) => {
			getAllTenant().then(result => {
				allTenant.value = result.data;
				resolve(result.data)
			});
		}
		);
	}

	return {
		allTenant,
		getAllTenantApi,
	};
}
