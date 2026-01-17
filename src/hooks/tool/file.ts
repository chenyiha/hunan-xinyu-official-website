import { upload } from "/@/api/oss/accessory";
import { isEmpty } from "/@/utils/baseUtil";


/**
 * 文件
 */
export function useFile() {

  /**
   * base64转file
   */
  const base64ToFile = (base64: string, fileName: string) => {
    const arr = base64.split(",");
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: "image/png" });
  };

  /**
   * 文件上传
   * @param file 文件 
   */
  const uploadFile = (file: File, remove: boolean = true) => {
    return new Promise((resolve, reject) => {
      upload(file, remove).then(r => {
        resolve(isEmpty(r) ? null : r.data)
      });
    });
  };

  return {
    base64ToFile,
    uploadFile
  }
}