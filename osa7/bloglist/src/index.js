import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import blogService from './services/blogs'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { init } from './reducers/blogReducer'

import App from './App'

const reducer = combineReducers({
  message: notifReducer,
  blogs: blogReducer,
  user: userReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

const renderApp = () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
}

const loadBlogs = async () => {
  const blogs = await blogService.getAll()
  await store.dispatch(init(blogs))
}

loadBlogs()
console.log(store.getState())
store.subscribe(renderApp)
renderApp()
