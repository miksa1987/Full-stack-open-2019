import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-client'
import { ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('library-token')
  return {
    headers: {
      ...headers,
      authorization: token ? token : null
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  , document.getElementById('root'))