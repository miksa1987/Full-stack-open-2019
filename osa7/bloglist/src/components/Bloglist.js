import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Segment } from 'semantic-ui-react'

import { logout } from '../reducers/userReducer'
import { removeBlog } from '../reducers/blogReducer'

const Bloglist = props => {
  return ( <div>
    <Segment><h2>BLOGS</h2>
    <List celled>
      {props.blogs.map(blog =>
        <List.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></List.Item>
      )}
    </List></Segment>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { logout, removeBlog })(Bloglist)