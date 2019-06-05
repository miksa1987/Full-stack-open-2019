import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'

import { setNotification } from './reducers/notifReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import Loginform from './components/Loginform'
import Newblogform from './components/Newblogform'
import Message from './components/Message'
import Togglabble from './components/Togglabble'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    if(window.localStorage.getItem('user') !== null) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setUser(JSON.parse(window.localStorage.getItem('user')))
      props.setUser(user)
    }
    console.log(props.blogs)
    //blogService.getAll().then(r => console.log(r))
  }, [props])

  useEffect(() => {
    if(props.user !== null && props.user.name && props.user.username && props.user.token) {
      window.localStorage.setItem('user', JSON.stringify(props.user))
      console.log(window.localStorage.getItem('user'))
      blogService.setToken(props.user.token)
      props.setNotification(`${props.user.name} logged on`, 5)
    }
  }, [props])

  const debug = () => {
    console.log(props.blogs)
    console.log(props.user)
  }

  const logout = () => {
    setUser(null)
    blogService.setToken('')
    window.localStorage.clear()
  }

  const removeBlog = (blogToRemove) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
    setBlogs(updatedBlogs)
  }

  if(props.user) {
    return (
      <div>
        <Message />
        <button onClick={debug}>DEBUG</button>
        <h2>blogs</h2>
        <p>{props.user.name} logged in</p>
        <Togglabble buttonText='Add new blog' ref={blogFormRef}>
          <Newblogform BlogFormRef={blogFormRef} />
        </Togglabble>
        <button onClick={logout}>Log out</button><br/><br/>
        {props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user.id} removeBlog={removeBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Message />
      <h2>Log in to applicationn</h2>
      <Loginform setUser={setUser} />
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

const mapDispatchToProps = () => {
  return { initBlogs, setNotification, createBlog, setUser }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)