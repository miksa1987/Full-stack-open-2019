import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import notifReducer from './reducers/notifReducer'

import App from './App'

const reducer = combineReducers({
  message: notifReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

const renderApp = () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
}

store.subscribe(renderApp)
renderApp()
