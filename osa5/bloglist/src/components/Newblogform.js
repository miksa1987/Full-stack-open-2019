import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

import useField from '../hooks/useField'

const Newblogform = ( { blogs, setBlogs, BlogFormRef, setMessage, setErrorOn, nullMessage } ) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  // Ei ehkä paras ratkaisu, mutta tunnin pähkäilyn jälkeen ei mieleen tule muuta
  const modtitle = { type: title.type, value: title.value, onChange: title.onChange}
  const modauthor = { type: author.type, value: author.value, onChange: author.onChange}
  const modurl = { type: url.type, value: url.value, onChange: url.onChange}

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
    title.reset()
    author.reset()
    url.reset()
  }

  return ( <div><h4>Submit new blog</h4><form onSubmit={sendNewBlog}>
    Title <input {...modtitle} /><br/>
    Author<input {...modauthor} /><br/>
    URL <input {...modurl} /><br/>
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