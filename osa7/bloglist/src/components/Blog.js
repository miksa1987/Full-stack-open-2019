import React, {useState} from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { removeBlog } from '../reducers/blogReducer'

const blogStyle = {
  padding: '7px',
  border: 'solid 1px black'
}

const Blog = ( props ) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
    console.log(props.blog)
  }

  const like = async () => {
    props.blog.likes += 1
    const blogToUpdate = props.blog

    try {
      await blogService.update(props.blog.id, blogToUpdate)
    } catch(error) {
      console.log('shieeet')
    }
  }

  const remove = async () => {
    if(window.confirm(`Poistetaanko ${props.blog.title}?`)) {
      props.removeBlog(props.blog.id)
    }
  }

  if(!expanded) {
    return ( <div style={blogStyle} onClick={toggleExpand}>
      {props.blog.title} {props.blog.author}
    </div> )
  }

  return ( <div className='Blog' style={blogStyle} onClick={toggleExpand}>
    {props.blog.title} {props.blog.author}<br/>
    <a href={props.blog.url}>{props.blog.url}</a><br/>
    {props.blog.likes} likes<button onClick={like}>like</button>
    {props.blog.user === props.user ? <button onClick={remove}>Remove blog</button> : null}
  </div> )
}

export default connect(null, { removeBlog })(Blog)