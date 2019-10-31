import React from 'react'
import './App.css'
// import Axios from 'axios'
import Loading from './components/Loading'
import { Route, Switch, Link } from 'react-router-dom'
import RouteConfig from './route'
import { Suspense } from 'react'
console.log(RouteConfig)
const App = () => {
    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Switch>
                    {RouteConfig.map(x => (
                        <Route exact key={x.path} {...x} />
                    ))}
                </Switch>
            </Suspense>
        </div>
    )
}

export default App
