import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useApolloClient } from 'react-apollo-hooks'
import { Subscription } from 'react-apollo'
import { gql } from 'apollo-boost'

import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import queries from './util/queries'
import mutations from './util/mutations'


const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    published
    author {
      name
    }
  }
}
`

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const result = useQuery(queries.ALL_BOOKS)
  const gresult = useQuery(queries.ALL_GENRES)

  const client = useApolloClient()

  const addBook = useMutation(mutations.ADD_BOOK, {
    onError: () => { console.log('Shit happens.')},
    refetchQueries: [ { query: queries.ALL_AUTHORS }, { query: queries.ALL_BOOKS }],
    update: (store, response) => {
      let booksInStore = store.readQuery({ query: queries.ALL_BOOKS })
      let genresInStore = store.readQuery({ query: queries.ALL_GENRES })
      console.log(booksInStore)

      if(!includedIn(booksInStore.allBooks, response.data.addBook)) {
        booksInStore.allBooks.push(response.data.addBook)
      
        response.data.addBook.genres.forEach(g => {
          if(genresInStore.allGenres.indexOf(g) < 0) {
            genresInStore.allGenres.push(g)
          }
        })

        client.writeQuery({ query: queries.ALL_BOOKS, data: booksInStore })
        client.writeQuery({ query: queries.ALL_GENRES, data: genresInStore})
      }
    }
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

  const includedIn = (set, object) => 
    set.map(p => p.id).includes(object.id)    

  useEffect(() => {
    setToken(window.localStorage.getItem('library-token'))
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ? null : <button onClick={() => setPage('add')}>add book</button>}
        {token === null ? null : <button onClick={() => setPage('recommended')}>recommended</button>}
        {token === null ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={logout}>log out</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        result={result}
        gresult={gresult}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <Recommended
        show={page === 'recommended'}
      />

      <Login 
        show={page === 'login'}
        login={login}
        setToken={setToken}
        setPage={setPage}
      />
      
      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({subscriptionData}) => {
          console.log(subscriptionData)
          const bookAdded = subscriptionData.data.bookAdded.title
          window.alert(`Book ${bookAdded} added!`)
          let booksInStore = client.readQuery({ query: queries.ALL_BOOKS })
          let genresInStore = client.readQuery({ query: queries.ALL_GENRES })
          console.log(booksInStore)

          if(!includedIn(booksInStore.allBooks, bookAdded)) {
            booksInStore.allBooks.push(bookAdded)
      
            bookAdded.genres.forEach(g => {
              if(genresInStore.allGenres.indexOf(g) < 0) {
                genresInStore.allGenres.push(g)
              }
            })

            client.writeQuery({ query: queries.ALL_BOOKS, data: booksInStore })
            client.writeQuery({ query: queries.ALL_GENRES, data: genresInStore})
          }
        }}
      /> 
    </div>
  )
}

export default App
