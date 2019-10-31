import React from 'react'
import styled from 'styled-components'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
const TransformContainer = styled.div`
    ul {
        display: flex;
        li {
            font-size: 18px;
            flex: 1;
            height: 100vh;
            transition: all 0.5s ease;
        }
    }
`
const dataList = [
    '万般皆是命，半点不由人',
    '我与杀戮之中绽放，亦如黎明中的花朵',
    '我用双手成就你的梦想',
    '你的见就是我的剑',
    '断剑重铸之日，骑士归来之时'
]
const Transform = props => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const count = useSelector(state => state)
    const dispatch = useDispatch()
    const touch = useRef({})
    useEffect(() => {
        console.log(count)
    })
    const nextTodo = () => {
        currentIndex < dataList.length - 1 && setCurrentIndex(currentIndex + 1)
    }
    const preTodo = () => {
        currentIndex > 0 && setCurrentIndex(currentIndex - 1)
    }

    const handleClick = () => {
        dispatch({
            type: 'INCREMENT',
            payload: 200
        })
    }
    const handleTouchStart = evt => {
        evt.persist()
        touch.current['startX'] = evt.touches[0]['clientX']
        touch.current['endX'] = 0
    }
    const handleTouchMove = evt => {
        evt.persist()
        touch.current['endX'] = evt.touches[0]['clientX']
    }
    const handleTouchEnd = evt => {
        evt.persist()
        const {
            current: { startX, endX }
        } = touch
        if (endX === 0 || Math.abs(startX - endX) < 10) return
        startX - endX > 0 ? nextTodo() : preTodo()
    }
    return (
        <TransformContainer
            onTouchStart={evt => handleTouchStart(evt)}
            onTouchMove={evt => handleTouchMove(evt)}
            onTouchEnd={evt => handleTouchEnd(evt)}
            onClick={handleClick}
        >
            <ul style={{ width: `${dataList.length}00%` }}>
                {dataList.map(x => (
                    <li
                        style={{
                            transform: `translate3d(-${currentIndex *
                                100}%, 0, 0)`
                        }}
                        key={x}
                    >
                        {x}-{count['cash']}
                    </li>
                ))}
            </ul>
        </TransformContainer>
    )
}

export default Transform
