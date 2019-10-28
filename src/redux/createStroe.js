import ActionType from './utils/actionTypes';
export default function (reducer, preloadeState, enhancer) {
    // preloadeState 初始值  ,enhancer ///增强器
    // 架构思路 构建store
    // 发布订阅
    // 发送数据
    // 获取数据
    // 返回store 包含各种methods
    let currentReducer = reducer
    let currentState = preloadeState
    let currentListeners = []
    let nextListeners = currentListeners
    let isDispatching = false

    // 拷贝数据 防止发布订阅的时候 加进新的数据
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }
    // 获取数据
    function getState() {
        if (isDispatching) {
            throw new Error(
                '不要再dispath的时候调用getState，建议从发布订阅的api中调用'
            )
        }
        // 上一次的数据
        return currentState
    }
    // 发送数据
    function dispatch(action) {
        // 1.接收dispatch更改状态
        // 2.触发发布订阅
        // 3.更新数据
        try {
            isDispatching = true
            // 触发reducer // 返回新的currentState
            currentState = currentReducer(currentState, action)
            console.log(currentState, 'currentState')
        } finally {
            isDispatching = false
        }
        // 判断是否更换reducer 将reducer进行更新
        const listeners = (currentListeners = nextListeners)
        console.log(nextListeners, 'nextListeners')
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
        return action
    }
    //  发布订阅
    function subscribe(listener) {
        nextListeners.push(listener)
        // 取消订阅
        return function unsubscribe() {}
    }
    console.log(
        dispatch({
            type: ActionType.INIT
        })
    )
    return {
        getState,
        dispatch,
        subscribe
    }
}