import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

import useField from '../hooks/useField'

const Newblogform = ( { blogs, setBlogs, BlogFormRef, setMessage, setErrorOn, nullMessage } ) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const sendNewBlog = (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
        id: Math.floor(Math.random() * 100000)
      }
      blogService.createNew(newBlog)
      const newBlogs = blogs.concat(newBlog)
      setBlogs(newBlogs)
      setMessage(`blog ${newBlog.title} created`)
      nullMessage()
      try { 
        BlogFormRef.current.toggleVisible()
      } catch (error) {
        console.log(error)
      }
    } catch(error) {
      setMessage('Failed to create blog')
      setErrorOn()
      nullMessage()
    } 
  }

  return ( <div><h4>Submit new blog</h4><form onSubmit={sendNewBlog}>
    Title <input {...title} /><br/>
    Author<input {...author} /><br/>
    URL <input {...url} /><br/>
    <button type='submit'>Add</button>
  </form></div> )
}

Newblogform.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  BlogFormRef: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setErrorOn: PropTypes.func.isRequired,
  nullMessage: PropTypes.func.isRequired
}

export default Newblogform