import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = (event) => {
    event.preventDefault()
    props.store.dispatch(addAnecdote(event.target.anecdote.value))

    props.store.dispatch(newMessage(`You added '${event.target.anecdote.value}'`))
    setTimeout(() => {
      props.store.dispatch(emptyMessage())
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

export default AnecdoteForm