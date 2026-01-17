import request from '/@/utils/request';

export function getByIds(accessoryIds: string[]) {
	return request({
		url: '/oss/accessory/ids',
		method: 'post',
		data: accessoryIds,
	});
}

/**
 * 文件上传
 * @param file  文件
 * @returns  上传结果
 */
export function upload(file: any, remove: boolean) {
	return request({
		url: '/oss/accessory/upload',
		method: 'post',
		data: {
			file: file
		},
		params: {
			isDelete: remove ? "1" : "0"
		},
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}
