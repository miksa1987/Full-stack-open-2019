import React, {useState} from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  padding: '7px',
  border: 'solid 1px black'
}

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
    console.log(blog)
  }

  const like = async () => {
    blog.likes += 1
    const blogToUpdate = blog

    try {
      blogService.update(blog.id, blogToUpdate)
    } catch(error) {
      console.log('shieeet')
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
  </div> )
}

export default Blog