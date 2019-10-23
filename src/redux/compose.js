// const compose = (...fns) => (...args) => fns.reduce((res, fn) => [fn.call(null, res)], args)[0]
// export default compose

export default function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}