import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const AppBarContainer = styled.div`
    display: flex;
    height: 44px;
    width: 100%;
    align-items: center;
    font-size: 15px;
    h1 {
        font-size: 18px;
        flex: 1;
        text-align: center;
    }
    span {
        padding: 0 20px;
    }
`
const AppBar = props => {
    const { title, right, left } = props
    return (
        <AppBarContainer>
            <span className="app_bar_l">
                <i className={`fa fa-${left}`}></i>
            </span>
            <h1>{title}</h1>
            <span className="app_bar_r">
                <i className={`fa fa-${right}`}></i>
            </span>
        </AppBarContainer>
    )
}
AppBar.propTypes = {
    title: PropTypes.string
}
AppBar.defaultProps = {
    title: 'AppTodo',
    left: 'chevron-left',
    right: 'ellipsis-v'
}
export default AppBar
