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
  }, [])

  useEffect(() => {
    
  }, [user])

  if(user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
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