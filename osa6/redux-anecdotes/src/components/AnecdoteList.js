import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newMessage, emptyMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id, anecdote) => {
    props.voteAnecdote(id)
    props.newMessage(`You voted '${anecdote}'`)
    setTimeout(() => {
      props.emptyMessage()
    }, 5000)
  }

  return ( <div>
    <h2>Anecdotes</h2>
    {props.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(props.filter.toLowerCase())).map(anecdote =>
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

const mapDispatchToProps = {
  voteAnecdote, newMessage, emptyMessage
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)