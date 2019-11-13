// import {
//     createStore,
//     // 合并多个redux
//     combineReducers,
// } from 'redux'
// const initState = {
//     count: 200
// }
// const reducer = (state = initState, actions) => {
//     const {
//         type,
//         payload
//     } = actions;
//     switch (type) {
//         case 'INCREMENT':
//             return Object.assign({}, state, {
//                 cash: state.count + payload
//             });
//         case 'DECREMENT':
//             return Object.assign({}, state, {
//                 cash: state.count - payload
//             });
//         default:
//             return state;
//     }
// }

// const reducers = combineReducers({
//     shoppingList: reducer
// })
// const store = createStore(reducers)
// store.subscribe(() => {
//     console.log(`余额：${store.getState().shoppingList.count}`);
// });
// store.dispatch({
//     type: 'DECREMENT',
//     payload: 100
// });

import { createStore } from 'redux'

const initState = {
    count: 200,
    cash: 0,
    todos: [
        {
            icon: 'user',
            name: 'Personal',
            tasks: [
                {
                    id: 1,
                    title: 'Dating',
                    date: new Date(),
                    done: false,
                    deleted: false
                }
            ],
            colors: ['#ff6262', '#ffa947']
        },
        {
            icon: 'suitcase',
            name: 'Work',
            tasks: [
                {
                    id: 3,
                    title: 'Design Sprint',
                    date: new Date(),
                    done: true,
                    deleted: false
                },
                {
                    id: 4,
                    title: 'Icon Set Design for Mobile App',
                    date: new Date(),
                    done: false,
                    deleted: false
                },
                {
                    id: 5,
                    title: 'HTML/CSS Study',
                    date: new Date(),
                    done: false,
                    deleted: false
                },
                {
                    id: 6,
                    title: 'Weekly Report',
                    date: new Date(),
                    done: false,
                    deleted: false
                },
                {
                    id: 7,
                    title: 'Design Meeting',
                    date: new Date(),
                    done: false,
                    deleted: false
                },
                {
                    title: 'Quick Prototyping',
                    date: new Date('2019-09-16'),
                    done: false,
                    deleted: false
                },
                {
                    id: 8,
                    title: 'UX Conference',
                    date: new Date('2019-09-16'),
                    done: false,
                    deleted: false
                }
            ],
            colors: ['#5b9df9', '#47bfff']
        },
        {
            icon: 'home',
            name: 'Home',
            tasks: [
                {
                    id: 2,
                    title: 'House Keeping',
                    date: new Date(),
                    done: true,
                    deleted: false
                }
            ],
            colors: ['#2c7d59', '#3ba776']
        }
    ],
    currentIndex: 0, //选中索引
    selected: null, // 当前是否选中
    unselect: null
}
const reducer = (state = initState, actions) => {
    const { type, payload } = actions
    const { currentIndex, todos, selected, unselect } = state
    switch (type) {
        case 'INCREMENT':
            return Object.assign({}, state, {
                cash: state.count + payload
            })
        case 'DECREMENT':
            return Object.assign({}, state, {
                cash: state.count - payload
            })
        case 'NEXT_TO_DO':
            if (currentIndex < todos.length - 1)
                state['currentIndex'] = currentIndex + 1
            return Object.assign({}, state)

        case 'PRE_TO_DO':
            if (currentIndex > 0) state['currentIndex'] = currentIndex - 1
            return Object.assign({}, state)
        // 选中todo
        case 'SELECTED_TO_DO':
            state.selected = payload
            state.unselect = null
            return Object.assign({}, state)
        default:
            return state
    }
}

const store = createStore(reducer)

export const now = new Date()
export const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
)
export const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
)

export default store
