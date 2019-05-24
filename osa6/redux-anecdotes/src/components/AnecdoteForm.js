import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = (event) => {
    event.preventDefault()
    props.addAnecdote(event.target.anecdote.value)

    props.newMessage(`You added '${event.target.anecdote.value}'`)
    setTimeout(() => {
      props.emptyMessage()
    }, 5000)

    event.target.anecdote.value = ''
  }

  return ( <div>
    <h2>create new</h2>
    <form onSubmit={add}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  </div> )}

const mapDispatchToProps = {
  addAnecdote, newMessage, emptyMessage
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)