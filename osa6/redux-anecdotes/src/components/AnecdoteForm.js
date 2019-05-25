import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    props.addAnecdote(newAnecdote)
    props.setMessage(`You added '${newAnecdote}'`, 5)

  }

  return ( <div>
    <h2>create new</h2>
    <form onSubmit={add}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  </div> )}

const mapDispatchToProps = {
  addAnecdote, setMessage
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)