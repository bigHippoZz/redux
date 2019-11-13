import React from 'react'

import AppBar from '../components/AppBar'
import Avatar from '../components/Avatar'
import Gradient from '../components/Gradient'
import TodoList from '../components/TodoList'
import TodoDetail from '../components/TodoDetail'
const Todo = () => {
    return (
        <div>
            <AppBar />
            <Avatar />
            <Gradient />
            <TodoList />
            <TodoDetail />
        </div>
    )
}

export default Todo
