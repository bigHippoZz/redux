import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import avatar from '../assets/WLOP+Aeolian3+by+Eliza+Final.00_00_54_13.静止001.png'

import { useHistory, useLocation, useParams } from 'react-router-dom'
const AvatarContainer = styled.div`
    display: flex;
    padding: 0 40px;
    height: 300px;
    justify-content: flex-end;
    flex-direction: column;
    transition: all 0.5s ease;
    &.avatar__selected {
        transform: translate3d(0, 20px, 0);
        opacity: 0;
    }
    .avatar_face {
        width: 44px;
        height: 44px;
        border-radius: 100%;
        overflow: hidden;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .avatar_name {
        margin-top: 32px;
        padding: 0 6px;
        font-size: 32px;
        letter-spacing: 1px;
        font-weight: 300;
    }
    .avatar_tips {
        margin-top: 16px;
        padding: 0 6px;
        font-size: 13px;
        font-weight: 100;
        opacity: 0.8;
        line-height: 1.6em;
    }
    .avatar_date {
        margin-top: 44px;
        margin-bottom: 16px;
        padding: 0 6px;
        font-size: 14px;
    }
`

const Avatar = props => {
    // const { title, right, left } = props
    const history = useHistory()
    const location = useLocation()
    const param = useParams()
    const [show, setShow] = useState(false)
    const handleClick = () => {
        console.log(props)
        console.log(location, param)
        history.push('/transtion', {
            id: {
                sid: 99
            }
        })
        // setShow(!show)
    }
    return (
        <AvatarContainer>
            <div onClick={handleClick} className="avatar_face">
                <img src={avatar} />
            </div>
            <h2 className="avatar_name">Hello, Jane.</h2>
            <p className="avatar_tips">
                Looks like feed good.
                <br />
                You have {} tasks to do today.
            </p>
            <p className="avatar_date">TODAY : {}</p>
        </AvatarContainer>
    )
}
Avatar.propTypes = {}
Avatar.defaultProps = {}
export default Avatar
