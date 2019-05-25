import anecdoteService from '../service/anecdotes'

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
      //const newAnecdote = asObject(action.data.anecdote)
      console.log(action.data.anecdote)
      return [ ...state, action.data.anecdote ]
    case 'INITIALIZE':
      return action.data.anecdotes
    default:
      return state
  }
}

const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: { anecdotes }
    })
  }
}

const voteAnecdote = (id) => {
  return { type: 'VOTE', data: { id: id }}
}

const addAnecdote = (anecdote) => {
  return { type: 'ADD', data: { anecdote: anecdote }}
}

export default anecdoteReducer
export { voteAnecdote, addAnecdote, initialize }