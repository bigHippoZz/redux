import React from 'react'
import './App.css'
import Axios from 'axios'
import qs from 'qs'
import Loading from './components/Loading'
import { Route, Switch, Link } from 'react-router-dom'
import RouteConfig from './route'
import { Suspense } from 'react'

// console.log(RouteConfig)
const App = () => {
    //
    const Effect = fn => {
        // console.log(fn)
        return {
            map: g => Effect(x => g(fn(x))),
            run: () => fn()
        }
    }
    Effect(() => window)
        .map(x => {
            // console.log(x)
            return '90'
        })
        .map(x => {
            // console.log(x)
            return x
        })
        .run()
    // 参数顺寻反转
    const reverseArgs = fn => (...args) => fn(args.reverse())
    // curry
    const curry = (fn, arity = fn.length, nextCurried) =>
        (nextCurried = prevArgs => nextArg => {
            const args = prevArgs.concat([nextArg])
            if (args.length >= arity) {
                return fn(...args)
            } else {
                return nextCurried(args)
            }
        })([])
    // 取反
    const not = predicate => (...args) => !predicate(...args)
    // if
    const when = (predicate, fn) => (...args) =>
        predicate(...args) ? fn(...args) : undefined
    function fib(n) {
        if (n <= 1) return n
        return fib(n - 2) + fib(n - 1)
    }
    console.log('1')
    // console.log(fib(6))
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
