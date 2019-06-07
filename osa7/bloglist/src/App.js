import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import blogService from './services/blogs'

import { setNotification } from './reducers/notifReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'

import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Newblogform from './components/Newblogform'
import Message from './components/Message'
import Togglabble from './components/Togglabble'
import Userlist from './components/Userlist'

const Main = (props) => {
  return (<div>
    <h2>blogs</h2>
      <p>{props.user.name} logged in</p>
      <Bloglist blogFormRef={props.blogFormRef} />
      <Togglabble buttonText='Add new blog' ref={props.blogFormRef}>
        <Newblogform BlogFormRef={props.blogFormRef} />
      </Togglabble>
      <button onClick={logout}>Log out</button><br/><br/>
      {props.blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={blog.user} removeBlog={props.removeBlog} />
    )}
  </div>)
}

const App = (props) => {
  const blogFormRef = React.createRef()

  useEffect(() => {
    if(window.localStorage.getItem('user') !== null) {
      props.setUser(JSON.parse(window.localStorage.getItem('user')))
    }
    console.log(props.blogs)
    //blogService.getAll().then(r => console.log(r))
  }, [])

  useEffect(() => {
    props.initBlogs()
    if(props.user !== null && props.user.name && props.user.username && props.user.token) {
      window.localStorage.setItem('user', JSON.stringify(props.user))
      blogService.setToken(props.user.token)
      props.setNotification(`${props.user.name} logged on`, 5)
    }
  }, [])

  const debug = () => {
    console.log(props.blogs)
    console.log(props.user)
    const savedUser = window.localStorage.getItem('user')
    console.log(savedUser)
  }

  const logout = () => {
    props.logout()
    blogService.setToken('')
    window.localStorage.clear()
  }

  if(props.user) {
    return (
      <div>
        <Message />
        <button onClick={debug}>DEBUG</button>
        <Router>
        <Link to='/'>MAIN</Link>
        <Link to='/users'>USERS</Link>
        <Route exact path='/' render={() => <Main user={props.user} blogFormRef={blogFormRef} blogs={props.blogs} /> }/>
        <Route path='/users' render={() => <Userlist />} />
        </Router>
      </div>
    )
  }

  return (
    <div>
      <Message />
      <h2>Log in to applicationn</h2>
      <Loginform />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    message: state.message,
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  initBlogs, setNotification, createBlog, setUser, logout
}
export default connect(mapStateToProps, mapDispatchToProps)(App)