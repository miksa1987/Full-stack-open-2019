import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Loginform from './components/Loginform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
    if(window.localStorage.getItem('user') !== null) {
      setUser(JSON.parse(window.localStorage.getItem('user')))
    }
  }, [])

  useEffect(() => {
    if(user !== null && user.name && user.username && user.token) {
      console.log('LOGGED!')
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  if(user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={logout}>Log out</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Log in to applicationn</h2>
      <Loginform setuser={setUser} />
    </div>
  )
}

export default App