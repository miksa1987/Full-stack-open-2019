const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

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
    default:
      return state
  }
}

const voteAnecdote = (id) => {
  return { type: 'VOTE', data: { id: id }}
}

const addAnecdote = (anecdote) => {
  return { type: 'ADD', data: { anecdote: anecdote }}
}

export default reducer
export { voteAnecdote, addAnecdote }