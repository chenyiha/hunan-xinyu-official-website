/**
 * 判断是否为空
 * @param v 判断对象
 * @returns true为空,false不为空
 */
export function isEmpty(v: any) {
  switch (typeof v) {
    case "undefined":
      return true;
    case "string":
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!v) return true;
      break;
    case "number":
      if (isNaN(v)) return true;
      break;
    case "object":
      if (null === v || v.length === 0) return true;
      for (var i in v) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 判断是否不为空
 * @param v 判断对象
 * @returns true为不为空,false为空
 */
export function isNotEmpty(v: any) {
  return !isEmpty(v);
}

/**
 * 如果为空，则为默认值
 * @param v  判断值
 * @param defaultValue 默认值
 */
export function emptyToDefault(v:any,defaultValue:any){
  return isEmpty(v)?defaultValue:v;
}

