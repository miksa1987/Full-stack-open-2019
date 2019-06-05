import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'

import { setNotification } from './reducers/notifReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'

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
      setUser(JSON.parse(window.localStorage.getItem('user')))
    }
    console.log(props.blogs)
    //blogService.getAll().then(r => console.log(r))
  }, [props.blogs])

  useEffect(() => {
    if(user !== null && user.name && user.username && user.token) {
      console.log('LOGGED!')
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setNotification(`${user.name} logged on`, 5)
    }
  })

  

  const logout = () => {
    setUser(null)
    blogService.setToken('')
    window.localStorage.clear()
  }

  const removeBlog = (blogToRemove) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
    setBlogs(updatedBlogs)
  }

  if(user) {
    return (
      <div>
        <Message />
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
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
    blogs: state.blogs
  }
}

const mapDispatchToProps = () => {
  return { initBlogs, setNotification, createBlog }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)