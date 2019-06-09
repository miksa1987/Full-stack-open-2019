import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/userReducer'
import { removeBlog } from '../reducers/blogReducer'

const Bloglist = props => {
  return ( <div>
    <ul>
    {props.blogs.map(blog =>
      <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
    )}
    </ul>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { logout, removeBlog })(Bloglist)