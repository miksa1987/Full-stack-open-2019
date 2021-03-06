import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id, anecdote) => {
    props.voteAnecdote(id)
    props.setMessage(`You voted '${anecdote}'`, 5)
  }

  return ( <div>
    <h2>Anecdotes</h2>
    {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
  </div> )
}

const visibleAnecdotes = ({anecdotes, filter}) => {
  console.log(anecdotes)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapDispatchToProps = {
  voteAnecdote, setMessage
}

const mapStateToProps = (state) => {
  return {
    anecdotes: visibleAnecdotes(state)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)