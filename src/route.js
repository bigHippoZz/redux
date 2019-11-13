import { lazy } from 'react'
const route = [
    {
        path: '/',
        component: lazy(() => import('./view/Todo'))
    },

    {
        path: '/transform',
        component: lazy(() => import('./view/Transform'))
    },

    {
        path: '/transtion',
        component: lazy(() => import('./view/Transition'))
    }
]

export default route
