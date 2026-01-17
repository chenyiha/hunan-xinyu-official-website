import {getByIds} from '/@/api/oss/accessory';
import {isEmpty} from '/@/utils/baseUtil';

export function useAccessory() {
    /**
     * 拼接上传文件的主键,如果没有就返回空字符串
     * @param fileList 文件列表
     * @param id 拼接的字段
     * @returns "1,2,3"
     */
    const joinIds = (fileList: any[], id: String = 'id') => {
        if (!isEmpty(fileList)) {
            // @ts-ignore
            let list = [...fileList]
            return list.map((item) => item[id + ""]).join(',');
        }
        return '';
    };

    /**
     * 拼接上传文件的主键,如果没有就返回空数组
     * @param fileList 文件列表
     * @param id 拼接的字段
     * @returns  [1,2,3]
     */
    const joinIdArr = (fileList: any[], id: String = 'id') => {
        if (!isEmpty(fileList)) {
            // @ts-ignore
            let list = [...fileList]
            return list.map((item) => item[id + ""]);
        }
        return [];
    };

    //获取指定附件的信息
    const getList = (ids: any) => {
        return new Promise((resolve, reject) => {
            try {
                let idsTemp: any = [];
                if (isEmpty(ids)) {
                    return resolve([]);
                } else if (typeof ids === 'string') {
                    idsTemp = ids ? ids.split(',') : [];
                } else {
                    idsTemp = ids;
                }
                getByIds(idsTemp).then((result: any) => {
                    return resolve(result.data);
                });
            } catch (e) {
                return reject(e);
            }
        });
    };


    /**
     * 获取附件
     * @param ids 附件主键列表
     * @param fetchUrl 是否取中的附件地址
     */
    const getAccessoryOne = (ids: any, fetchUrl: boolean = true) => {
        return new Promise((resolve, reject) => {
            try {
                getList(ids).then((r: any) => {
                    if (isEmpty(r) && !fetchUrl) {
                        return resolve(null);
                    } else if (isEmpty(r) && fetchUrl) {
                        return resolve("");
                    }
                    if (fetchUrl) {
                        return resolve(r[0].url);
                    }
                    return resolve(r[0]);
                })
            } catch (e) {
                return reject(e);
            }
        })
    }

    return {
        joinIds,
        getList,
        getAccessoryOne,
        joinIdArr
    };
}
