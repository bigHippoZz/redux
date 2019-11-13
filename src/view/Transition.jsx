import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import {
    Transition,
    CSSTransition,
    SwitchTransition,
    TransitionGroup
} from 'react-transition-group'

import { Button } from 'antd'
const TransitionContainer = styled.div`
    li {
        transform: translate(0, 0, 0);
        height: 44px;
        line-height: 44px;
        text-align: center;
        transition: translate 1s ease;
    }
    div {
        font-size: 22px;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        opacity: 1;
        transition: opacity 0.3s;
    }
    .fade-exit {
        opacity: 1;
    }
    .fade-exit-active {
        opacity: 0;
        transition: opacity 0.3s;
    }
`
const data = [
    '万般皆是命，半点不由人',
    '我与杀戮之中绽放，亦如黎明中的花朵',
    '我用双手成就你的梦想',
    '你的见就是我的剑',
    '断剑重铸之日，骑士归来之时'
]
const TransitionComponent = () => {
    const history = useHistory()
    const location = useLocation()
    const param = useParams()
    const todos = useSelector(x => x.todos)
    const [list, setList] = useState(data)
    const [show, setShow] = useState(false)

    useEffect(() => {
        console.log(location, param)
        console.log(location.state)
        return () => {}
    })
    const handleEnter = (...args) => {
        console.log(args)
    }
    const handleTransform = x => {
        setList([
            '我与杀戮之中绽放，亦如黎明中的花朵',
            '我用双手成就你的梦想',
            '你的见就是我的剑',
            '断剑重铸之日，骑士归来之时',
            '万般皆是命，半点不由人'
        ])
    }
    const handleDelete = x => {
        setList(list.filter(item => item !== x))
    }
    const onEntering = el => {
        console.log(el)
    }
    const onExiting = el => {
        console.log(el)
    }
    const childFactory = el => {
        return el
    }
    const onEntered = el => {
        console.log(el)
    }
    const onEnter = el => {
        console.log(el)
    }
    const onExit = el => {
        console.log(el)
    }
    const onExited = el => {
        console.log(el)
    }
    return (
        <TransitionContainer>
            <CSSTransition
                unmountOnExit
                timeout={200}
                in={show}
                classNames="fade"
                onEnter={handleEnter}
            >
                <div>万般皆是命，半点不由人</div>
            </CSSTransition>
            <ul>
                <TransitionGroup childFactory={childFactory}>
                    {list.map(x => (
                        <CSSTransition
                            timeout={200}
                            unmountOnExit
                            classNames="fade"
                            key={x}
                            onEntering={onEntering}
                            onEntered={onEntered}
                            onExiting={onExiting}
                            onEnter={onEnter}
                            onExit={onExit}
                            onExited={onExited}
                        >
                            <li onClick={() => handleDelete(x)}>{x}</li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ul>
            <Button onClick={() => handleTransform()}>添加</Button>
            <Button onClick={() => setShow(!show)}>显示/隐藏</Button>
        </TransitionContainer>
    )
}
export default TransitionComponent
