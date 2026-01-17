import Decimal from "decimal.js"

//todo 数值计算精度异常, 怎么处理
/**
 * 数值相加
 * @param x  第一数
 * @param y  第二个数
 */
export function add(x: string, y: string) {
    return Decimal.add(x, y).toString();
}

/**
 * 数值相减
 * @param x  第一数
 * @param y  第二个数
 */
export function sub(x: string, y: string) {
    return Decimal.sub(x, y).toString();
}


/**
 * 数值相乘
 * @param x  第一数
 * @param y  第二个数
 */
export function mul(x: string, y: string) {
    return Decimal.mul(x, y).toString();
}


/**
 * 数值相除
 * @param x  第一数
 * @param y  第二个数
 */
export function div(x: string, y: string) {
    return Decimal.div(x, y).toString();
}


/**
 * 数值比较
 * @param x  第一数
 * @param y  第二个数
 * 大于1，等于0，小于-1
 */
export function compare(x: string, y: string) {
    const a = new Decimal(x);
    const b = new Decimal(y);
    return a.comparedTo(b);
}


