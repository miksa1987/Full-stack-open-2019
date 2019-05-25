const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const compare = (anecdote1, anecdote2) => {
  return anecdote2.votes - anecdote1.votes
}

const anecdoteReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(anecdote => anecdote.id === action.data.id)

      const changedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }

      const newAnecdotes = state.map(anecdote => anecdote.id === action.data.id ? changedAnecdote : anecdote)
      newAnecdotes.sort(compare)

      return newAnecdotes
    case 'ADD':
      const newAnecdote = asObject(action.data.anecdote)
      return [ ...state, newAnecdote ]
    case 'INITIALIZE':
      return action.data.anecdotes
    default:
      return state
  }
}

const initialize = (anecdotes) => {
  return { type: 'INITIALIZE', data: { anecdotes }}
}

const voteAnecdote = (id) => {
  return { type: 'VOTE', data: { id: id }}
}

const addAnecdote = (anecdote) => {
  return { type: 'ADD', data: { anecdote: anecdote }}
}

export default anecdoteReducer
export { voteAnecdote, addAnecdote, initialize }