import fp from 'lodash/fp'
// 组合函数
export const compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]
// export const compose = (f, g) => x => f(g(x))
// curry
export const curry = (fn, n = fn.length, args = []) =>
    n === 0
        ? fn(...args)
        : (...args1) => curry(fn, n - args1.length, [...args, ...args1])
// 第三章
// ajax
const ajax = (url, data, callback) => {
    // console.log(url)
    // console.log(data)
    callback(data)
}
// 部分的 partial
const partial = (fn, ...currentArgs) => (...nextArgs) =>
    fn(...currentArgs, ...nextArgs)

const add = (x, y) => x + y
console.log(partial(add, 89)(9))
const result = [1, 23, 334, 543].map(partial(add, 78))
console.log(result)
// 反转函数参数
const reverseArgs = fn => (...nextArgs) => fn(...nextArgs.reverse())
// 只传一个参数
const unary = fn => arg => fn(arg)
// ID
const identity = v => v
// 恒定参数
const constant = v => () => v
// 数组实参解构赋值 apply()
const spreadArgs = fn => argsArr => fn(...argsArr)
// 聚散实参 转换成数组 unapply()
const gatherArgs = fn => (...argsArr) => fn(argsArr)
// 处理对象
const partialProps = (fn, presetArgsObj) => {
    return function partiallyApplied(laterArgsObj) {
        return fn(Object.assign({}, presetArgsObj, laterArgsObj))
    }
}
const curryProps = (fn, arity = 1) => {
    return (function nextCurried(prevArgsObj) {
        return function curried(nextArgObj = {}) {
            var [key] = Object.keys(nextArgObj)
            var allArgsObj = Object.assign({}, prevArgsObj, {
                [key]: nextArgObj[key]
            })
            if (Object.keys(allArgsObj).length >= arity) {
                return fn(allArgsObj)
            } else {
                return nextCurried(allArgsObj)
            }
        }
    })({})
}
const partialRight = (fn, ...presetArgs) => {
    return reverseArgs(partial(reverseArgs(fn), ...presetArgs.reverse()))
}

const not = predicate => (...args) => !predicate(...args)
// 逻辑语句  if
const when = (predicate, fn) => (...args) =>
    predicate(...args) ? fn(...args) : undefined
// 判断true false
const printIf = (predicate, msg, fn) => {
    if (predicate(msg)) {
        fn(msg)
    }
}

const prop = (name, obj) => obj[name]
const setProp = (name, obj, val) => {
    var o = Object.assign({}, obj)
    o[name] = val
    return o
}
const makeObjProp = (name, value) => setProp(name, {}, value)
const getOrder = partial(ajax, 'order')
const getPerson = partial(ajax, 'person', {
    personId: 66
})

const output = x => console.log(x)
// const personId = partial(prop, 'personId')

// const idObj = partial(makeObjProp, 'person')

// const lookUpObj = compose(idObj, personId)

// const outId = partial(prop, 'person')

// const outputId = compose(output, outId)

// const nextGetOrder = partialRight(getOrder, outputId)

// const res = compose(nextGetOrder, lookUpObj)

// // getPerson(res)
// const foo = {
//     id: { id: 78 }
// }
const personID = fp.prop('personId')

getPerson(function orderFound(order) {
    // getOrder({ id: order.personId }, function personFound(person) {
    //     output(person.id)
    // })
    // output(personID(order))
})

const handleConsole = fp.compose(output, personID)

const nextGetOrder = fp.partialRight(getOrder, handleConsole)

const idObj = fp.partial(makeObjProp, 'id')

getPerson(compose(nextGetOrder, idObj, fp.prop('personId')))

const currAjax = curry(ajax)
