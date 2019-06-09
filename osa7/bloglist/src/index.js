import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'

import blogService from './services/blogs'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'
import userReducer, { setUser } from './reducers/userReducer'
import { init } from './reducers/blogReducer'
import usersReducer, { initUsers } from './reducers/usersReducer'

import App from './App'

const reducer = combineReducers({
  message: notifReducer,
  blogs: blogReducer,
  user: userReducer,
  allUsers: usersReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

const renderApp = () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
}

const user = window.localStorage.getItem('user')
if(user !== undefined) {
  store.dispatch(setUser(JSON.parse(user)))
}

blogService.getAll().then(blogs => store.dispatch(init(blogs)))
axios.get('/api/users').then(res => store.dispatch(initUsers(res.data)))
store.subscribe(renderApp)
renderApp()
