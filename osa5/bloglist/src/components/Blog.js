import React, {useState} from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  padding: '7px',
  border: 'solid 1px black'
}

const Blog = ({ blog, user, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
    console.log(blog)
  }

  const like = async () => {
    blog.likes += 1
    const blogToUpdate = blog

    try {
      await blogService.update(blog.id, blogToUpdate)
    } catch(error) {
      console.log('shieeet')
    }
  }

  const remove = async () => {
    if(window.confirm(`Poistetaanko ${blog.title}?`)) {
      removeBlog(blog)
      await blogService.remove(blog.id)
    }
  }

  if(!expanded) {
    return ( <div style={blogStyle} onClick={toggleExpand}>
      {blog.title} {blog.author}
    </div> )
  }

  return ( <div style={blogStyle} onClick={toggleExpand}>
    {blog.title} {blog.author}<br/>
    <a href={blog.url}>{blog.url}</a><br/>
    {blog.likes} likes<button onClick={like}>like</button>
    {blog.user === user ? <button onClick={remove}>Remove blog</button> : null}
  </div> )
}

export default Blog