import React from 'react'
import blogService from '../services/blogs'

const Newblogform = (props) => {
  const blogs = props.blogs
  const setBlogs = props.setblogs

  const sendNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      id: Math.floor(Math.random() * 100000)
    }
    blogService.createNew(newBlog)
    const newBlogs = blogs.concat(newBlog)
    setBlogs(newBlogs)
  }

  return ( <div><form onSubmit={sendNewBlog}>
    <input name='title' /><br/>
    <input name='author' /><br/>
    <input name='url' /><br/>
    <button type='submit'>Submit</button>
  </form></div> )
}

export default Newblogform