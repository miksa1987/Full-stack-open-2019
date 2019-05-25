import anecdoteService from '../service/anecdotes'

const compare = (anecdote1, anecdote2) => {
  return anecdote2.votes - anecdote1.votes
}

const anecdoteReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'VOTE':
      const newAnecdotes = state.map(anecdote => anecdote.id === action.data.id ? action.data : anecdote)
      newAnecdotes.sort(compare)

      return newAnecdotes
    case 'ADD':
      //const newAnecdote = asObject(action.data.anecdote)
      console.log(action.data.anecdote)
      return [ ...state, action.data ]
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort(compare)
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes 
    })
  }
}

const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    console.log(anecdote)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log(changedAnecdote)
    const response = await anecdoteService.update(id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
  return { type: 'VOTE', data: { id: id }}
}

const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer
export { voteAnecdote, addAnecdote, initialize }