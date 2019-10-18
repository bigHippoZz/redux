import {
    createStore,
    // 合并多个redux
    combineReducers,
} from 'redux'
const initState = {
    count: 200
}
const reducer = (state = initState, actions) => {
    const {
        type,
        payload
    } = actions;
    switch (type) {
        case 'INCREMENT':
            return Object.assign({}, state, {
                cash: state.count + payload
            });
        case 'DECREMENT':
            return Object.assign({}, state, {
                cash: state.count - payload
            });
        default:
            return state;
    }
}

const reducers = combineReducers({
    shoppingList: reducer
})
const store = createStore(reducers)
store.subscribe(() => {
    console.log(`余额：${store.getState().shoppingList.count}`);
});
store.dispatch({
    type: 'DECREMENT',
    payload: 100
});