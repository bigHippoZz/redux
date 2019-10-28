import React from 'react'

import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState
} from 'react'
import { Input, Card, Button, Icon } from 'antd'
const { Search } = Input

const Todo = (...args) => {
    const [list, setList] = useState([
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.'
    ])
    const [value, setValue] = useState('')
    const inputRef = useRef()
    // 处理输入
    const handleInput = value => {
        setList(x => [...x, value])
        setValue(x => '')
    }
    // 处理删除
    const handleDelete = value => {
        return setList(x => x.filter(i => i !== value))
    }
    // 已完成
    const carryOut = x =>
        x.reduce((pre, cur) => (cur.length > 10 ? (pre = pre + 1) : pre), 0)
    // 未完成
    useEffect(() => {
        console.log(args)
        console.log('effect')
        console.log(inputRef)
        let flag = true
        console.log(flag)
        return () => {
            flag = false
        }
    }, [args, list])

    return (
        <div>
            <Search
                ref={inputRef}
                placeholder="input search text"
                onSearch={value => handleInput(value)}
                onChange={value => setValue(value.target.value)}
                enterButton
                value={value}
            />
            <Card style={{ width: 300 }}>
                {list.map((todo, index) => (
                    <p key={index}>
                        {todo}
                        <Icon
                            onClick={() => handleDelete(todo)}
                            style={{ fontSize: 20 }}
                            type="delete"
                            theme="twoTone"
                        />
                    </p>
                ))}
            </Card>
            <Button type="primary">全部{list.length}</Button>
            <Button type="primary">已完成{carryOut(list)}</Button>
            <Button type="primary">未完成</Button>
        </div>
    )
}

export default Todo
