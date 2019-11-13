import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import ToDo from './ToDo'
import AppBar from './AppBar'
import { Transition, CSSTransition } from 'react-transition-group'
const TodoDetailContainer = styled.div`
    position: fixed;
    background-color: white;
    color: #666;
    will-change: top, left, width, height;
`
const TodoDetail = () => {
    const selected = useSelector(x => x.selected)
    console.log(selected)

    const handleEntering = el => {
        Object.assign(el.style, {
            top: `${selected.rect.top}px`,
            left: `${selected.rect.left}px`,
            width: `${selected.rect.width}px`,
            height: `${selected.rect.height}px`,
            transition: 'all .3s'
        })
        setTimeout(() => {
            Object.assign(el.style, {
                top: 0,
                left: 0,
                width: `${selected.rect.appWidth}px`,
                height: `${selected.rect.appHeight}px`,
                transition: 'all .3s'
            })
        }, 0)
    }
    const handleExiting = el => {
        console.log(el)
    }
    return (
        <CSSTransition
            in={selected}
            timeout={2000}
            unmountOnExit
            onEntering={handleEntering}
            onExiting={handleExiting}
        >
            <TodoDetailContainer>
                <AppBar />
                <ToDo />
            </TodoDetailContainer>
        </CSSTransition>
    )
}
export default TodoDetail
