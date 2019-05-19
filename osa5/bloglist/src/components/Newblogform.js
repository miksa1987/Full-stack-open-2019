import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Newblogform = ( { blogs, setBlogs, BlogFormRef, setMessage, setErrorOn, nullMessage } ) => {
  const sendNewBlog = (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
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
    Title <input name='title' /><br/>
    Author<input name='author' /><br/>
    URL <input name='url' /><br/>
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