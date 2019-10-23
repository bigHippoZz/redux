import $$observable from 'symbol-observable'
import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'

// 1.reducer 2.初始化state 3.创建插件的东西 增强器
function createStore(reducer, preloadedState, enhancer) {
    let currentReducer = reducer
    let currentState = preloadedState
    let currentListeners = [] //当前订阅者列表
    let nextListeners = currentListeners //新的订阅者列表
    let isDispatching = false // 其中变量isDispatching， 作为锁来用， 我们redux是一个统一管理状态容器， 它要保证数据的一致性， 所以同一个时间里， 只能做一次数据修改， 如果两个action同时触发reducer对同一数据的修改， 那么将会带来巨大的灾难。 所以变量isDispatching就是为了防止这一点而存在的。

    //判断nextListeners和currentListeners是否为同一个引用
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    function dispatch(action) {
        // 判断是否为简单对象
        if (!isPlainObject(action)) {
            throw new Error(
                'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            )
        }
        // 判断action.type是否存在
        if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            )
        }


        //判断当前是否有执行其他的reducer操作
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }


        try {
            // 触发dispath
            isDispatching = true
            // 更新currentState
            currentState = currentReducer(currentState, action)
        } finally {
            // 不管如何都会执行 进一步跟进dispath更新
            isDispatching = false
        }

        const listeners = (currentListeners = nextListeners)


        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }

        // 返回action
        return action
    }

    // 获取state
    function getState() {
        if (isDispatching) {
            throw new Error(
                'You may not call store.getState() while the reducer is executing. ' +
                'The reducer has already received the state as an argument. ' +
                'Pass it down from the top reducer instead of reading it from the store.'
            )
        }
        return currentState
    }

    // store的订阅模式
    function subscribe(listener) {
        // 判断监听者是否为函数
        if (typeof listener !== 'function') {
            throw new Error('Expected the listener to be a function.')
        }
        //是否有reducer正在进行数据修改（保证数据的一致性）
        if (isDispatching) {
            throw new Error(
                'You may not call store.subscribe() while the reducer is executing. ' +
                'If you would like to be notified after the store has been updated, subscribe from a ' +
                'component and invoke store.getState() in the callback to access the latest state. ' +
                'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
            )
        }
        let isSubscribed = true
        ensureCanMutateNextListeners()
        //将新的订阅者加入nextListeners中
        nextListeners.push(listener)
        return function unsubscribe() {
            //是否已经取消订阅（已取消的不必执行）
            if (!isSubscribed) {
                return
            }
            //是否有reducer正在进行数据修改（保证数据的一致性）
            if (isDispatching) {
                throw new Error(
                    'You may not unsubscribe from a store listener while the reducer is executing. ' +
                    'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
                )
            }
            isSubscribed = false
            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
        }
    }

    // 替换reducer
    function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function.')
        }
        currentReducer = nextReducer
        // 这个函数是用来替换reducer的， 平时项目里基本很难用到， replaceReducer函数执行前会做一个条件判断：
        // 判断所传reducer是否为函数
        // 通过条件判断之后， 将nextReducer赋值给currentReducer， 以达到替换reducer效果， 并触发state更新操作。
        dispatch({
            type: ActionTypes.REPLACE
        })
    }

    // 初始化数据
    dispatch({
        type: ActionTypes.INIT
    })


    
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
    }

}