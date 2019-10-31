import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import ToDo from './ToDo'

const TodoListContainer = styled.div`
    padding: 0 32px;
    height: 400px;
    transition: all 0.5s ease;
    & > ul,
    & > ul > li {
        display: flex;
        height: 100%;
    }
    > ul > li {
        flex: 1;
        transition: transform 0.5s ease;
    }
    .todo {
        border-radius: 8px;
        background-color: white;
    }
    .todo-list__selected {
        transform: scaleX(1.25);
    }
`
const TodoList = () => {
    const todos = useSelector(x => x.todos)
    const currentIndex = useSelector(x => x.currentIndex)
    const touch = useRef({
        startX: 0,
        endX: 0
    })
    const dispatch = useDispatch()
    const handleEvent = x => x.touches[0].clientX
    const handleTouchStart = event => {
        const clientX = handleEvent(event)
        const { current } = touch
        current.startX = clientX
        current.endX = 0
    }
    const handleTouchMove = event => {
        const clientX = handleEvent(event)
        const { current } = touch
        current.endX = clientX
    }
    const handleTouchEnd = event => {
        console.log(touch)
        const {
            current: { startX, endX }
        } = touch
        if (endX === 0 || Math.abs(startX - endX) < 10) return
        startX - endX > 0
            ? dispatch({ type: 'NEXT_TO_DO' })
            : dispatch({ type: 'PRE_TO_DO' })
    }
    return (
        <TodoListContainer
            onTouchMove={x => handleTouchMove(x)}
            onTouchEnd={x => handleTouchEnd(x)}
            onTouchStart={x => handleTouchStart(x)}
        >
            <ul style={{ width: `${todos.length}00%` }}>
                {todos.map(x => (
                    <li
                        key={x.name}
                        style={{
                            transform: `translate3d(-${currentIndex *
                                100}%, 0, 0)`
                        }}
                    >
                        <ToDo></ToDo>
                    </li>
                ))}
            </ul>
        </TodoListContainer>
    )
}
export default TodoList
