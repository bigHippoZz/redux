// 就是简单的判断是不是简单对象
// 自己的创建的就是复杂对象
export default function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false
    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(obj) === proto

}