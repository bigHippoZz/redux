import React from 'react'
import './App.css'
import Axios from 'axios'
import qs from 'qs'
import Loading from './components/Loading'
import { Route, Switch, Link } from 'react-router-dom'
import RouteConfig from './route'
import { Suspense } from 'react'

console.log(RouteConfig)
const App = () => {
    const Effect = fn => {
        console.log(fn)
        return {
            map: g => Effect(x => g(fn(x))),
            run: () => fn()
        }
    }
    Effect(() => window)
        .map(x => {
            console.log(x)
            return '90'
        })
        .map(x => {
            console.log(x)
            return x
        })
        .run()
    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Switch>
                    {RouteConfig.map((x, index) => (
                        <Route exact={index === 0} key={x.path} {...x} />
                    ))}
                </Switch>
            </Suspense>
        </div>
    )
}

export default App
