import React from 'react'

const User = (props) => {
  if(props.user === undefined) {
    return null
  }
  
  return ( <div>
    <h2>{props.user.name}</h2>
    <h3>Blogs added by user</h3>
    {props.user.blogs.map(blog => <p key={blog.id}>{blog.title} by {blog.author}</p>)}
  </div> )
}

export default User