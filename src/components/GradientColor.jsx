import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import styled from 'styled-components'

const GradientColorContainer = styled.div`
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    transition: opacity 0.5s ease;
    &.gradient_color__active {
        opacity: 1;
    }
`

const GradientColor = props => {
    const { active, color } = props
    const gradientColor = useMemo(() => {
        const colorBottom = `color-stop(30%, ${color[0]})`
        const colorTop = `to(${color[1]})`
        return `-webkit-gradient(linear, left bottom, left top, ${colorBottom}, ${colorTop})`
    }, [color])
    return (
        <GradientColorContainer
            style={{ backgroundImage: gradientColor }}
            className={active ? 'gradient_color__active' : ''}
        ></GradientColorContainer>
    )
}

export default GradientColor

GradientColor.defaultProps = {
    color: ['#ff6262', '#ffa947']
}
