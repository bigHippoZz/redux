import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './Function'
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
if (module.hot) {
    module.hot.accept()
}
