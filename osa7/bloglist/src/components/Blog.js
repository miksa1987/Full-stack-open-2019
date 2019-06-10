import React from 'react'
import { connect } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { Button, Input, Segment } from 'semantic-ui-react'

const Blog = ( props ) => {
  const like = () => {
    props.blog.likes += 1
    const blogToUpdate = props.blog

    props.updateBlog(blogToUpdate)
  }

  // Kommentointi tehty silleen että backendiä joutui muokkaamaan mahdollisimman vähän.
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
    <Segment><h2>{props.blog.title}
    {props.currentUser.id === props.blog.user ? 
    <Button onClick={remove}>REMOVE BLOG</Button> : null}</h2>
    <h3>By {props.blog.author}</h3>
    <a href={props.blog.url}>{props.blog.url}</a>
    <p>has {props.blog.likes} likes <Button onClick={like}>like</Button></p>
    <p>Added by {findUser(props.blog.user)}</p></Segment>
    <Segment>
    <h3>Comments</h3>
    {props.blog.comments.length === 0 ? <p>No comments</p>
    : props.blog.comments.map(c => <p key={Math.random() * 10000}>{c}</p>)}
    <form onSubmit={comment}><Input name='say' /><Button type='submit'>Comment</Button></form></Segment>
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    users: state.allUsers, 
    currentUser: state.user 
  }
}

export default connect(mapStateToProps, { updateBlog, removeBlog })(Blog)