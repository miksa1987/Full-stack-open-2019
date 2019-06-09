import React from 'react'
import { connect } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ( props ) => {
  //const [usr, setUsr]
  const like = () => {
    props.blog.likes += 1
    const blogToUpdate = props.blog

    props.updateBlog(blogToUpdate)
  }

  const comment = (event) => {
    event.preventDefault()
    const newComments = [ ...props.blog.comments, event.target.say.value ]
    const blogToUpdate = { ...props.blog, comments: newComments }
    
    props.updateBlog(blogToUpdate)
  }

  const remove = async () => {
    if(window.confirm(`Poistetaanko ${props.blog.title}?`)) {
      props.removeBlog(props.blog.id)
    }
  }

  const findUser = (id) => {
    const user = props.users.find(u => u.id === id)
    return user.name
  }

  if(props.blog === undefined) {
    return null
  }

  return ( <div>
    <h2>{props.blog.title}</h2>
    <h3>By {props.blog.author}</h3>
    <a href={props.blog.url}>{props.blog.url}</a>
    <p>has {props.blog.likes} likes <button onClick={like}>like</button></p>
    <p>Added by {findUser(props.blog.user)}</p>
    {props.currentUser.id === props.blog.user ? 
    <button onClick={remove}>Remove blog</button> : null}
    <h3>Comments</h3>
    {props.blog.comments.length === 0 ? <p>No comments</p>
    : props.blog.comments.map(c => <p key={Math.random() * 10000}>{c}</p>)}
    <form onSubmit={comment}><input name='say' /><button type='submit'>Comment</button></form>
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    users: state.allUsers, 
    currentUser: state.user 
  }
}

export default connect(mapStateToProps, { updateBlog, removeBlog })(Blog)