import React from 'react'
import blogService from '../services/blogs'

const Newblogform = (props) => {
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
      const newBlogs = props.blogs.concat(newBlog)
      props.setBlogs(newBlogs)
      props.setMessage(`blog ${newBlog.title} created`)
      props.nullMessage()
      try { 
        props.BlogFormRef.current.toggleVisible()
      } catch (error) {
        console.log(error)
      }
    } catch(error) {
      props.setMessage('Failed to create blog')
      props.setErrorOn()
      props.nullMessage()
    } 
  }

  return ( <div><h4>Submit new blog</h4><form onSubmit={sendNewBlog}>
    Title <input name='title' /><br/>
    Author<input name='author' /><br/>
    URL <input name='url' /><br/>
    <button type='submit'>Add</button>
  </form></div> )
}

export default Newblogform