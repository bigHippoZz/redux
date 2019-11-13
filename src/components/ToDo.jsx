import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { today, tomorrow } from '../store'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
const ToDoContainer = styled.div`
    flex: 1;
    margin: 0 8px;
    overflow: hidden;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: #666;
    border-radius: 8px;
    background-color: white;
    /* visibility: hidden; */
    .todo_head {
        display: flex;
        padding: 20px;
        /* height: 44px; */
        justify-content: space-between;
        align-items: flex-start;
        /* 提高性能 */
        transform: translate3d(0, 0, 0);
        will-change: transform;
    }
    .todo_icon {
        display: flex;
        width: 44px;
        height: 44px;
        border: 1px solid #eee;
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }
    .todo_menu {
        color: #eee;
    }

    .todo_body {
        padding: 0 20px;
        transform: translate3d(0, 189px, 0);
        will-change: transform;
    }
    .todo_tips {
        opacity: 0.6;
        font-size: 13px;
        font-weight: 600;
    }
    .todo_title {
        margin-top: 6px;
        font-size: 32px;
    }

    .todo_progress {
        display: flex;
        align-items: center;
        margin-top: 30px;
    }

    .todo_progress_line {
        flex: 1;
        height: 3px;
        margin-right: 10px;
        background-color: #eee;
        margin-bottom: 20px;
        i {
            display: block;
            height: 100%;
            transition: all 0.3s ease;
        }
    }
`
const ToDo = props => {
    const { todo } = props
    const todoContainer = useRef()
    const dispatch = useDispatch()
    const handleClick = () => {
        console.log('999')
        console.log(todo)
        const appRect = document.querySelector('#root').getBoundingClientRect()
        const elRect = todoContainer.current.getBoundingClientRect()
        const rect = {}
        console.log(elRect, appRect)
        // 获取root元素的宽度和高度
        // 获取el相对于root的top 和  left 进行position
        rect.top = elRect.top - appRect.top
        rect.left = elRect.left - appRect.left
        rect.width = elRect.width
        rect.height = elRect.height
        rect.appWidth = appRect.width
        rect.appHeight = appRect.height
        console.log(rect)
        dispatch({
            type: 'SELECTED_TO_DO',
            payload: { rect, todo }
        })
    }
    return (
        <ToDoContainer ref={todoContainer}>
            <div className="todo_head" onClick={handleClick}>
                <div className="todo_icon">
                    <i></i>
                </div>
                <div className="todo_menu">
                    <i className="fa fa-ellipsis-v"></i>
                </div>
            </div>
            <div className="todo_body">
                <p className="todo_tips">{78} Tasks</p>
                <h3 className="todo_title">{'hahah'}</h3>
                <div className="todo_progress">
                    <span className="todo_progress_line">
                        <i></i>
                    </span>
                    <span className="todo_progress_num"></span>
                </div>
            </div>
        </ToDoContainer>
    )
}
export default ToDo
