import request from '/@/utils/request';

export const registerUser = (obj: any) => {
	return request({
		url: `/admin/register/user`,
		method: 'post',
		data:obj,
		headers: {
			skipToken: true,
		},
	});
};