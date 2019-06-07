import React from 'react'
import { connect } from 'react-redux'

// WTF
import { logout } from '../reducers/userReducer'
import { removeBlog } from '../reducers/blogReducer'

import Blog from './Blog'
import Togglabble from './Togglabble'
import Newblogform from './Newblogform'

const Bloglist = props => {
  return ( <div>
    <Togglabble buttonText='Add new blog' ref={props.blogFormRef}>
      <Newblogform BlogFormRef={props.blogFormRef} />
    </Togglabble>
    <button onClick={props.logout}>Log out</button><br/><br/>
    {props.blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={blog.user} />
    )}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { logout, removeBlog })(Bloglist)