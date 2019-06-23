import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from 'react-apollo-hooks'

import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import queries from './util/queries'
import mutations from './util/mutations'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const addBook = useMutation(mutations.ADD_BOOK, {
    onError: () => { console.log('Shit happens.')},
    refetchQueries: [ { query: queries.ALL_AUTHORS }, { query: queries.ALL_BOOKS }]
  })

  const login = useMutation(mutations.LOGIN, {
    onError: () => { console.log('THOU SHALL NOT PASS')},
    refetchQueries: []
  })

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.clearStore()
    setPage('authors')
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('library-token'))
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ? null : <button onClick={() => setPage('add')}>add book</button>}
        {token === null ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={logout}>log out</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Login 
        show={page === 'login'}
        login={login}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App
