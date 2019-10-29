import React from 'react'
import logo from './logo.svg'
import './App.css'
import Axios from 'axios'
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState
} from 'react'
import { curry, compose } from './Function'
import createStroe from './redux/createStroe'
import Todo from './view/Todo'
const initState = {
    id: 2
}
const reducer = function(state = initState, action) {
    switch (action['type']) {
        case 'SET_STATE':
            return { id: 3 }
        default:
            return state
    }
}
const store = createStroe(reducer)
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch({ type: 'SFGBS' })

const App = () => {
    const log = x => {
        console.log(x)
        return x
    }
    const props = key => obj => {
        return obj[key]
    }
    const data = compose(
        log,
        props('code')
    )
    const asyncFn = async () => {
        const { data } = await Axios.get(
            'https://api.apiopen.top/getJoke?page=1&count=2&type=video'
        )
        return data
    }
    asyncFn().then(data)
    return (
        <div className="App">
            <Todo />
        </div>
    )
}

export default App
