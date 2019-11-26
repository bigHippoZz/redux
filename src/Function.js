import fp from 'lodash/fp'
// import {  fromEvent } from 'rxjs'

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

// 函数式编程的实践
const output = x => console.log(x)
// const personId = fp.prop('personId')
// const consoleLog = fp.compose(output, fp.prop('id'))
// const nextGetorder = partialRight(getOrder, consoleLog)
// const idObj = partial(makeObjProp, 'id')
// const Obj = fp.compose(idObj, personId)
// const res = fp.compose(nextGetorder, Obj)
//  添加name
const addStockName = stock => {
    return setProp('name', stock, stock.id)
}
// val 添加+
const formatSign = val => {
    if (Number(val) > 0) {
        return `+${val}`
    }
    return val
}
// val 添加$
const formatCurrency = val => {
    return `$${val}`
}
// 类似functor的map
function transformObservable(mapperFn, obsv) {
    return obsv.map(mapperFn)
}
// 独立适配方案 就是将原生方法转换成自己的函数
const unboundMethod = (methodName, argCount = 2) =>
    curry((...args) => {
        var obj = args.pop()
        return obj[methodName](...args)
    }, argCount)
// 保留小数点的后两位
const formatDecimal = unboundMethod('toFixed')(2)
// 先把价格添加添加$ 然后保留小数点后两位
const formatPrice = fp.pipe(formatDecimal, formatCurrency)
// 先把价格添加添加+ 然后保留小数点后两位
const formatChange = fp.pipe(formatDecimal, formatSign)
// 获取dom的属性
function getElemAttr(elem, prop) {
    return elem.getAttribute(prop)
}
// 更改dom的属性 dom 属性 val
function setElemAttr(elem, prop, val) {
    // 副作用!!!!!!!!!EFFECT
    return elem.setAttribute(prop, val)
}
// 更改dom元素
function setDOMContent(elem, html) {
    // 副作用!!!!!!!!!!!!
    elem.innerHTML = html
    return elem
}
// 在父元素的基础上添加元素
function appendDOMChild(parentNode, childNode) {
    // 副作用!!!!!!!!!!
    parentNode.appendChild(childNode)
    return parentNode
}

function matchingStockId(id) {
    return function isStock(node) {
        return getStockId(node) == id
    }
}
// 验证dom class是否正确
function isStockInfoChildElem(elem) {
    return /\bstock-/i.test(getClassName(elem))
}
// 替换字符串中的某些值
function stripPrefix(prefixRegex) {
    return function mapperFn(val) {
        return val.replace(prefixRegex, '')
    }
}
//来保证我们得到的是一个数组（即使里面只有一个元素）
function listify(listOrItem) {
    if (!Array.isArray(listOrItem)) {
        return [listOrItem]
    }
    return listOrItem
}
//获取dom 的子节点的所有 类型为数组
const getDOMChildren = pipe(
    listify,
    flatMap(pipe(curry(prop)('childNodes'), Array.from))
)

const createElement = document.createElement.bind(document)
const getElemAttrByName = curry(reverseArgs(getElemAttr), 2)
const getStockId = getElemAttrByName('data-stock-id')
const getClassName = getElemAttrByName('class')
function formatStockNumbers(stock) {
    const currentObj = Object.assign({}, stock)
    currentObj.price = formatPrice(currentObj.price)
    currentObj.change = formatChange(currentObj.change)
    return currentObj
    // var updateTuples = [
    //     ['price', formatPrice(stock  .price)],
    //     ['change', formatChange(stock.change)]
    // ]
    // console.log(updateTuples)
    // return fp.reduce(function formatter(stock, [propName, val]) {
    //     console.log(stock, propName, val)
    //     return setProp(propName, stock, val)
    // })(stock)(updateTuples)
}
const stock = { id: 'AAPL', price: 121.7, change: 0.01 }
console.log(formatStockNumbers(stock))
