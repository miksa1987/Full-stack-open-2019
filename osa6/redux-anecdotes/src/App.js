import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { initialize } from './reducers/anecdoteReducer'
import anecdoteService from './service/anecdotes'

const App = props => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      props.initialize(anecdotes))
  }, [])

  return (
    <div>
      <Notification store={props.store} />
      <Filter store={props.store} />
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default connect(null, { initialize })(App)
