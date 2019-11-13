import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import GradientColor from './GradientColor'
const GradientContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
`
const Gradient = () => {
    const todos = useSelector(state => state['todos'])
    const currentIndex = useSelector(state => state['currentIndex'])
    return (
        <GradientContainer>
            {todos.map((x, index) => (
                <GradientColor
                    active={index <= currentIndex}
                    key={x.name}
                    color={x.colors}
                ></GradientColor>
            ))}
        </GradientContainer>
    )
}
export default Gradient
