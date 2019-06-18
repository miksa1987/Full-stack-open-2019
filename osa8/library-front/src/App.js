import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import queries from './util/queries'
import mutations from './util/mutations'

const App = () => {
  const [page, setPage] = useState('authors')

  const addBook = useMutation(mutations.ADD_BOOK, {
    onError: () => { console.log('Shit happens.')},
    refetchQueries: [ { query: queries.ALL_AUTHORS }, { query: queries.ALL_BOOKS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App
