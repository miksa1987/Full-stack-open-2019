import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Loginform from './components/Loginform'
import Newblogform from './components/Newblogform'
import Message from './components/Message'
import Togglabble from './components/Togglabble'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')
  const [errorOn, setErrorOn] = useState(false)

  const blogFormRef = React.createRef()

  const nullMessage = () => {
    setTimeout(() => {
      setMessage('')
      setErrorOn(false)
    }, 5000)
  }
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compareBlogs)
      setBlogs( blogs )
    })
    
    if(window.localStorage.getItem('user') !== null) {
      setUser(JSON.parse(window.localStorage.getItem('user')))
    }
  }, [])

  useEffect(() => {
    if(user !== null && user.name && user.username && user.token) {
      console.log('LOGGED!')
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setMessage(`${user.name} logged on`)
      nullMessage()
    }
  }, [user])

  const compareBlogs = (blog1, blog2) => {
    if(blog1.likes !== blog2.likes) return blog2.likes - blog1.likes

    return blog1.title > blog2.title
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

  if(user) {
    return (
      <div>
        <Message message={message} errorOn={errorOn} />
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <Togglabble buttonText='Add new blog' ref={blogFormRef}>
          <Newblogform blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setErrorOn={setErrorOn} 
            nullMessage={nullMessage} BlogFormRef={blogFormRef} />
        </Togglabble>
        <button onClick={logout}>Log out</button><br/><br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user.id} removeBlog={removeBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Message message={message} errorOn={errorOn} 
        setMessage={setMessage} setErrorOn={setErrorOn} nullMessage={nullMessage} />
      <h2>Log in to applicationn</h2>
      <Loginform setUser={setUser} setMessage={setMessage} setErrorOn={setErrorOn} nullMessage={nullMessage} />
    </div>
  )
}

export default App