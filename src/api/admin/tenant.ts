import request from "/@/utils/request"

//获取全部租户
export function getAll() {
  return request({
    url: '/admin/tenant/all',
    method: 'get',
    headers: {
      skipTenant: true,
      skipToken: true,
    },
  })
}
