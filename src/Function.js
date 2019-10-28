// 组合函数
export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]
// export const compose = (f, g) => x => f(g(x))
// curry
export const curry = (fn, n = fn.length, args = []) => n === 0 ? fn(...args) : (...args1) => curry(fn, n - args1.length, [...args, ...args1])