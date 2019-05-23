import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    props.store.dispatch({ type: 'VOTE', data: { id: id }})
  }

  const add = (event) => {
    event.preventDefault()
    props.store.dispatch({ type: 'ADD', data: { anecdote: event.target.anecdote.value }})
    event.target.anecdote.value = ''
  }

  const compare = (anecdote1, anecdote2) => {
    return anecdote2.votes - anecdote1.votes
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ).sort(compare)}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
