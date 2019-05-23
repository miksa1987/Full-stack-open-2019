import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const vote = (id, anecdote) => {
    console.log(props.store.getState())
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(newMessage(`You voted '${anecdote}'`))
    setTimeout(() => {
      props.store.dispatch(emptyMessage())
    }, 5000)
  }

  return ( <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
  </div> )
}

export default AnecdoteList