import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'semantic-ui-react'
import { setNotification } from '../reducers/notifReducer'
import { createBlog } from '../reducers/blogReducer'

import useField from '../hooks/useField'

const Newblogform = ( props ) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  // Ei ehkä paras ratkaisu, mutta tunnin pähkäilyn jälkeen ei mieleen tule muuta
  const modtitle = { type: title.type, value: title.value, onChange: title.onChange}
  const modauthor = { type: author.type, value: author.value, onChange: author.onChange}
  const modurl = { type: url.type, value: url.value, onChange: url.onChange}

  const sendNewBlog = (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
        comments: [ 'first', 'wanha' ],
        id: Math.floor(Math.random() * 100000)
      }
      props.createBlog(newBlog)
      
      props.setNotification(`blog ${newBlog.title} created`, 5)
      
      try { 
        props.BlogFormRef.current.toggleVisible()
      } catch (error) {
        console.log(error)
      }
    } catch(error) {
      props.setNotification('Failed to create blog', 5, true)
    } 
    title.reset()
    author.reset()
    url.reset()
  }

  return ( <div><h4>Submit new blog</h4><form onSubmit={sendNewBlog}>
    Title <Input id='title'{...modtitle} /><br/>
    Author<Input id='author' {...modauthor} /><br/>
    URL <Input id='url' {...modurl} /><br/>
    <Button type='submit'>Add</Button>
  </form></div> )
}

export default connect(null, { setNotification, createBlog })(Newblogform)