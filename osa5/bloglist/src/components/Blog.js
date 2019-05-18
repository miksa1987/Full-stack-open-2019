import React, {useState} from 'react'

const blogStyle = {
  padding: '7px',
  border: 'solid 1px black'
}

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  if(!expanded) {
    return ( <div style={blogStyle} onClick={toggleExpand}>
      {blog.title} {blog.author}
    </div> )
  }

  return ( <div style={blogStyle} onClick={toggleExpand}>
    {blog.title} {blog.author}<br/>
    <a href={blog.url}>{blog.url}</a><br/>
    {blog.likes} likes<button>like</button>
  </div> )
}

export default Blog