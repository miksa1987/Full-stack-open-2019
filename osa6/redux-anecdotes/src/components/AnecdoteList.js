import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState()

  return ( <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => props.store.dispatch(voteAnecdote(anecdote.id))}>vote</button>
        </div>
      </div>
    )}
  </div> )
}

export default AnecdoteList